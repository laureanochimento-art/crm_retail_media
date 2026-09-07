"use client";

import { Deal } from '../../lib/types';
import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { calcularProrrateoPorDias } from "../../lib/prorrateo";

export default function DashboardPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  // ESTADOS DE FILTROS GLOBALES
  const [filtroMes, setFiltroMes] = useState<string>("TODOS");
  const [filtroElemento, setFiltroElemento] = useState<string>("TODOS");
  const [filtroTienda, setFiltroTienda] = useState<string>("TODAS");

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('deals').select(`
      *,
      cliente:clientes!cliente_id(*),
      catalogo:catalogo(*),
      deal_tiendas(tiendas(*)),
      vendedor:usuarios!vendedor_id(*)
    `).order('created_at', { ascending: false });
    
    if (data) {
      const formattedDeals: Deal[] = data.map((d: any) => ({
        ...d,
        tiendas: d.deal_tiendas ? d.deal_tiendas.map((dt: any) => dt.tiendas) : [],
        adjuntos: d.adjuntos || []
      }));
      setDeals(formattedDeals);
    } else if (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // 1. EXTRAER OPCIONES ÚNICAS PARA LOS DESPLEGABLES
  const listaMesesUnicos = Array.from(new Set(
    deals.flatMap(d => {
      const desglose = calcularProrrateoPorDias(d.fecha_desde, d.fecha_hasta, d.amount, 0);
      return desglose.map(m => JSON.stringify({ clave: m.mesClave, nombre: m.nombreMes }));
    })
  )).map(str => JSON.parse(str)).sort((a, b) => a.clave.localeCompare(b.clave));

  const listaElementosUnicos = Array.from(new Set(
    deals.map(d => d.catalogo?.elemento).filter(Boolean) as string[]
  )).sort();

  const listaTiendasUnicas = Array.from(new Set(
    deals.flatMap(d => d.tiendas?.map(t => JSON.stringify({ id: t.id.toString(), numero: t.numero, nombre: t.nombre })) || [])
  )).map(str => JSON.parse(str)).sort((a, b) => Number(a.numero) - Number(b.numero));

  // 2. FILTRAR ACUERDOS SEGÚN LOS TRES CRITERIOS SELECCIONADOS
  const dealsFiltrados = deals.filter(deal => {
    // Filtro por Mes (Verifica si el acuerdo tiene vigencia en el mes seleccionado)
    if (filtroMes !== "TODOS") {
      const desglose = calcularProrrateoPorDias(deal.fecha_desde, deal.fecha_hasta, deal.amount, 0);
      const tieneDiasEnMes = desglose.some(m => m.mesClave === filtroMes && m.diasActivos > 0);
      if (!tieneDiasEnMes) return false;
    }

    // Filtro por Elemento
    if (filtroElemento !== "TODOS" && deal.catalogo?.elemento !== filtroElemento) {
      return false;
    }

    // Filtro por Tienda / Boca
    if (filtroTienda !== "TODAS") {
      const tieneTienda = deal.tiendas?.some(t => t.id.toString() === filtroTienda);
      if (!tieneTienda) return false;
    }

    return true;
  });

  // 3. RECALCULAR MÉTRICAS E INGRESOS EN BASE A DEALS FILTRADOS
  const totalFacturado = dealsFiltrados.filter(d => d.stage === 'FACTURADO').reduce((sum, d) => sum + Number(d.amount), 0);
  const totalPipeline = dealsFiltrados.filter(d => d.stage !== 'PERDIDO' && d.stage !== 'FACTURADO').reduce((sum, d) => sum + Number(d.amount), 0);
  
  const dealsGanados = dealsFiltrados.filter(d => d.stage === 'FACTURADO').length;
  const dealsPerdidos = dealsFiltrados.filter(d => d.stage === 'PERDIDO').length;
  const totalCerrados = dealsGanados + dealsPerdidos;
  const winRate = totalCerrados > 0 ? Math.round((dealsGanados / totalCerrados) * 100) : 0;

  const revDigital = dealsFiltrados.filter(d => d.channel === 'Digital' && d.stage !== 'PERDIDO').reduce((sum, d) => sum + Number(d.amount), 0);
  const revInStore = dealsFiltrados.filter(d => d.channel === 'InStore' && d.stage !== 'PERDIDO').reduce((sum, d) => sum + Number(d.amount), 0);
  const revOmnicanal = dealsFiltrados.filter(d => d.channel === 'Omnicanal' && d.stage !== 'PERDIDO').reduce((sum, d) => sum + Number(d.amount), 0);
  const totalVentasActivas = revDigital + revInStore + revOmnicanal;

  const pctDigital = totalVentasActivas > 0 ? (revDigital / totalVentasActivas) * 100 : 0;
  const pctInStore = totalVentasActivas > 0 ? (revInStore / totalVentasActivas) * 100 : 0;
  const pctOmnicanal = totalVentasActivas > 0 ? (revOmnicanal / totalVentasActivas) * 100 : 0;

  const clientesRevenue: Record<string, number> = {};
  dealsFiltrados.filter(d => d.stage !== 'PERDIDO').forEach(d => {
    const nombre = d.cliente?.nombre || 'Cliente Desconocido';
    if (!clientesRevenue[nombre]) clientesRevenue[nombre] = 0;
    clientesRevenue[nombre] += Number(d.amount);
  });
  
  const topClientes = Object.entries(clientesRevenue)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); 

  // 4. TABLA DE MAPA INSTORE FILTRADA
  const implementacionesInStore = dealsFiltrados
    .filter(d => d.channel === 'InStore' || d.channel === 'Omnicanal')
    .filter(d => d.stage !== 'PERDIDO' && d.stage !== 'OPORTUNIDAD') 
    .flatMap(deal => {
      // Filtrar tiendas específicas si hay un filtro aplicado
      const tiendasAMapear = filtroTienda !== "TODAS" 
        ? deal.tiendas?.filter(t => t.id.toString() === filtroTienda)
        : deal.tiendas;

      return tiendasAMapear?.map(tienda => {
        const adjuntosEspecificos = (deal.adjuntos || []).filter(a => 
          !a.catalogo_id || 
          a.catalogo_id === deal.catalogo_id || 
          a.elemento_nombre === deal.catalogo?.elemento
        );

        return {
          idFila: `${deal.id}-${tienda.id}`,
          tiendaNumero: tienda.numero,
          tiendaNombre: tienda.nombre,
          tiendaFormato: tienda.formato,
          dealTitulo: deal.titulo,
          cliente: deal.cliente?.nombre,
          elemento: deal.catalogo?.elemento,
          estado: deal.stage,
          fechaDesde: deal.fecha_desde,
          fechaHasta: deal.fecha_hasta,
          todosAdjuntos: adjuntosEspecificos
        };
      }) || [];
    });

  const resetFiltros = () => {
    setFiltroMes("TODOS");
    setFiltroElemento("TODOS");
    setFiltroTienda("TODAS");
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-8 text-white overflow-y-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard General</h1>
        <p className="text-slate-400 text-sm mt-1">Métricas de negocio BI e implementaciones físicas InStore.</p>
      </div>

      {/* BARRA DE FILTROS AVANZADA */}
      <div className="bg-slate-900/80 border border-white/10 p-5 rounded-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 flex-1">
          {/* FILTRO MES / FECHA */}
          <div className="flex flex-col gap-1 min-w-[180px]">
            <label className="text-[10px] uppercase font-bold text-slate-400">Período / Mes</label>
            <select
              value={filtroMes}
              onChange={(e) => setFiltroMes(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="TODOS">Todos los Meses</option>
              {listaMesesUnicos.map(m => (
                <option key={m.clave} value={m.clave}>{m.nombre}</option>
              ))}
            </select>
          </div>

          {/* FILTRO ELEMENTO / ESPACIO */}
          <div className="flex flex-col gap-1 min-w-[200px]">
            <label className="text-[10px] uppercase font-bold text-slate-400">Elemento / Espacio</label>
            <select
              value={filtroElemento}
              onChange={(e) => setFiltroElemento(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="TODOS">Todos los Elementos</option>
              {listaElementosUnicos.map(elem => (
                <option key={elem} value={elem}>{elem}</option>
              ))}
            </select>
          </div>

          {/* FILTRO TIENDA / BOCA */}
          <div className="flex flex-col gap-1 min-w-[200px]">
            <label className="text-[10px] uppercase font-bold text-slate-400">Sucursal / Boca InStore</label>
            <select
              value={filtroTienda}
              onChange={(e) => setFiltroTienda(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="TODAS">Todas las Bocas</option>
              {listaTiendasUnicas.map(t => (
                <option key={t.id} value={t.id}>[Boca {t.numero}] {t.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        {/* BOTÓN RESTABLECER Y CONTADOR */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400 font-mono">
            <strong>{dealsFiltrados.length}</strong> de {deals.length} acuerdos
          </span>

          {(filtroMes !== "TODOS" || filtroElemento !== "TODOS" || filtroTienda !== "TODAS") && (
            <button
              onClick={resetFiltros}
              className="bg-slate-800 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold px-3 py-2 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xs">restart_alt</span>
              Limpiar Filtros
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-cyan-400 font-semibold animate-pulse">Sincronizando base de datos...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 animate-fade-in">
          {/* ROW 1: KPIS PRINCIPALES */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20"><span className="material-symbols-outlined text-5xl text-emerald-400">payments</span></div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Facturado</p>
              <h3 className="text-3xl font-extrabold text-emerald-400">${totalFacturado.toLocaleString()}</h3>
            </div>

            <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20"><span className="material-symbols-outlined text-5xl text-cyan-400">monitoring</span></div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Pipeline Activo</p>
              <h3 className="text-3xl font-extrabold text-cyan-400">${totalPipeline.toLocaleString()}</h3>
            </div>

            <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20"><span className="material-symbols-outlined text-5xl text-purple-400">emoji_events</span></div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Win Rate</p>
              <h3 className="text-3xl font-extrabold text-purple-400">{winRate}%</h3>
            </div>

            <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20"><span className="material-symbols-outlined text-5xl text-amber-400">assignment</span></div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Acuerdos</p>
              <h3 className="text-3xl font-extrabold text-amber-400">{dealsFiltrados.length}</h3>
            </div>
          </div>

          {/* ROW 2: GRÁFICOS Y TOP CLIENTES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-cyan-400">pie_chart</span>Ingresos por Canal</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="font-semibold text-blue-400">Digital</span><span className="text-white">${revDigital.toLocaleString()} <span className="text-slate-500 text-xs">({pctDigital.toFixed(1)}%)</span></span></div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5"><div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${pctDigital}%` }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="font-semibold text-amber-400">InStore</span><span className="text-white">${revInStore.toLocaleString()} <span className="text-slate-500 text-xs">({pctInStore.toFixed(1)}%)</span></span></div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5"><div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${pctInStore}%` }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="font-semibold text-purple-400">Omnicanal</span><span className="text-white">${revOmnicanal.toLocaleString()} <span className="text-slate-500 text-xs">({pctOmnicanal.toFixed(1)}%)</span></span></div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5"><div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${pctOmnicanal}%` }}></div></div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-cyan-400">star</span>Top 5 Clientes (Ingresos)</h3>
              {topClientes.length === 0 ? <p className="text-slate-500 text-sm italic text-center py-8">No hay datos suficientes para este filtro.</p> : (
                <div className="space-y-4">
                  {topClientes.map(([nombre, monto], index) => (
                    <div key={nombre} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? 'bg-amber-500/20 text-amber-400' : index === 1 ? 'bg-slate-400/20 text-slate-300' : index === 2 ? 'bg-orange-600/20 text-orange-400' : 'bg-slate-700 text-slate-400'}`}>{index + 1}</div>
                        <span className="font-medium text-sm text-slate-200">{nombre}</span>
                      </div>
                      <span className="font-bold text-cyan-400 text-sm">${monto.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* MAPA INSTORE POR BOCA */}
          <section className="bg-slate-900/60 border border-white/10 rounded-xl p-6 backdrop-blur-md mb-6">
            <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-amber-400 text-3xl">storefront</span>
                <div>
                  <h2 className="text-xl font-bold text-white">Mapa de Implementaciones InStore</h2>
                  <p className="text-xs text-slate-400">Filtrado activo por combinación de tienda, elemento y fecha.</p>
                </div>
              </div>

              <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full">
                {implementacionesInStore.length} Instalaciones
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Boca / Sucursal</th>
                    <th className="px-4 py-3">Elemento</th>
                    <th className="px-4 py-3">Cliente / Campaña</th>
                    <th className="px-4 py-3">Estado</th>
                    <th className="px-4 py-3 rounded-tr-lg">Renders / Fotos</th>
                  </tr>
                </thead>
                <tbody>
                  {implementacionesInStore.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-slate-500 text-xs italic">
                        No hay implementaciones InStore activas para los filtros seleccionados.
                      </td>
                    </tr>
                  ) : (
                    implementacionesInStore.map(item => (
                      <tr key={item.idFila} className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded">{item.tiendaNumero}</span>
                            <div className="flex flex-col">
                              <span className="font-semibold text-white text-xs">{item.tiendaNombre}</span>
                              <span className="text-[9px] text-slate-500">{item.tiendaFormato}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-cyan-300 font-medium">{item.elemento}</span>
                          <div className="text-[10px] text-slate-500 mt-0.5">{item.fechaDesde} ➔ {item.fechaHasta}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-white text-xs">{item.cliente}</div>
                          <div className="text-slate-400 text-xs truncate max-w-[150px]">{item.dealTitulo}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            item.estado === 'COTIZADO' ? 'bg-blue-500/20 text-blue-400' :
                            item.estado === 'POR_FACTURAR' ? 'bg-emerald-500/20 text-emerald-400' :
                            item.estado === 'FACTURADO' ? 'bg-purple-500/20 text-purple-400' :
                            'bg-slate-700 text-slate-300'
                          }`}>
                            {item.estado.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {item.todosAdjuntos.length > 0 ? (
                            <div className="flex flex-wrap gap-2 items-center">
                              {item.todosAdjuntos.map((foto, idx) => (
                                <a
                                  key={idx}
                                  href={foto.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-cyan-400 text-cyan-400 px-2 py-1 rounded text-xs transition-all shadow-sm"
                                >
                                  <span className="material-symbols-outlined text-xs">attach_file</span>
                                  <span>Foto {idx + 1}</span>
                                </a>
                              ))}
                            </div>
                          ) : (
                            <span className="text-[10px] text-slate-500 italic">Sin render</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}