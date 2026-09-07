"use client";

import { Deal } from '../../lib/types';
import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { calcularProrrateoPorDias } from "../../lib/prorrateo";

interface ItemCierreMes {
  dealId: number;
  clienteNombre: string;
  dealTitulo: string;
  montoTotalAcuerdo: number;
  montoFacturadoActual: number;
  montoPendienteGlobal: number;
  montoProrrateadoMes: number;
  montoAFacturarEditado: number;
  seleccionado: boolean;
  esVencido: boolean;
}

export default function FacturacionPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  const [mesCierreSeleccionado, setMesCierreSeleccionado] = useState<string>("");
  const [soloActivasEnMes, setSoloActivasEnMes] = useState<boolean>(true);
  const [itemsCierre, setItemsCierre] = useState<ItemCierreMes[]>([]);
  const [isModalCierreOpen, setIsModalCierreOpen] = useState(false);
  const [guardandoCierre, setGuardandoCierre] = useState(false);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('deals').select(`
      *,
      cliente:clientes!cliente_id(*),
      catalogo:catalogo(*),
      vendedor:usuarios!vendedor_id(*)
    `).order('created_at', { ascending: false });
    
    if (data) {
      const formattedDeals: Deal[] = data.map((d: any) => ({
        ...d,
        monto_facturado: d.monto_facturado || (d.stage === 'FACTURADO' ? d.amount : 0)
      }));
      setDeals(formattedDeals);

      if (!mesCierreSeleccionado) {
        const hoy = new Date();
        const keyMesActual = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}`;
        setMesCierreSeleccionado(keyMesActual);
      }
    } else if (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleAjustarMontoFacturadoDirecto = async (deal: Deal) => {
    const actual = deal.monto_facturado || 0;
    const nuevoMontoStr = window.prompt(
      `Reajustar acumulado facturado para "${deal.titulo}"\n(Contrato Total: $${deal.amount.toLocaleString()}):\n\nIngresa el nuevo acumulado total facturado:`,
      actual.toString()
    );

    if (nuevoMontoStr === null) return;
    const nuevoMonto = parseFloat(nuevoMontoStr);

    if (isNaN(nuevoMonto) || nuevoMonto < 0) {
      alert("Por favor ingresa un monto numérico válido.");
      return;
    }

    let nuevaEtapa = deal.stage;
    if (nuevoMonto >= deal.amount) {
      nuevaEtapa = 'FACTURADO';
    } else if (nuevoMonto > 0) {
      nuevaEtapa = 'POR_FACTURAR';
    } else if (nuevoMonto === 0 && deal.stage === 'FACTURADO') {
      nuevaEtapa = 'POR_FACTURAR';
    }

    try {
      const { error } = await supabase
        .from('deals')
        .update({
          monto_facturado: nuevoMonto,
          stage: nuevaEtapa
        })
        .eq('id', deal.id);

      if (error) throw error;

      alert(`Acumulado facturado ajustado a $${nuevoMonto.toLocaleString()}`);
      fetchDeals();
    } catch (err: any) {
      console.error("Error al reajustar facturación:", err);
      alert(`Error al guardar el ajuste: ${err.message}`);
    }
  };

  const prorrateoMensualGlobal: Record<string, { nombreMes: string; total: number; facturado: number; pendiente: number }> = {};

  deals.filter(d => d.stage !== 'PERDIDO').forEach(deal => {
    const mFacturado = deal.monto_facturado || 0;
    const desglose = calcularProrrateoPorDias(deal.fecha_desde, deal.fecha_hasta, deal.amount, mFacturado);
    
    desglose.forEach(item => {
      if (!prorrateoMensualGlobal[item.mesClave]) {
        prorrateoMensualGlobal[item.mesClave] = { 
          nombreMes: item.nombreMes, 
          total: 0, 
          facturado: 0, 
          pendiente: 0 
        };
      }
      prorrateoMensualGlobal[item.mesClave].total += item.montoTotal;
      prorrateoMensualGlobal[item.mesClave].facturado += item.montoFacturado;
      prorrateoMensualGlobal[item.mesClave].pendiente += item.montoPendiente;
    });
  });

  const listaProyeccionMensual = Object.entries(prorrateoMensualGlobal)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([clave, data]) => ({ clave, ...data }));

  const totalContratado = deals.filter(d => d.stage !== 'PERDIDO').reduce((sum, d) => sum + Number(d.amount), 0);
  const totalFacturadoReal = deals.filter(d => d.stage !== 'PERDIDO').reduce((sum, d) => sum + Number(d.monto_facturado || 0), 0);
  const totalPendienteFacturar = Math.max(0, totalContratado - totalFacturadoReal);

  const obtenerNombreMesFormateado = (claveMes: string) => {
    const item = listaProyeccionMensual.find(m => m.clave === claveMes);
    if (item) return item.nombreMes;
    if (!claveMes) return "";
    const [anio, mes] = claveMes.split('-');
    const fechaObj = new Date(Number(anio), Number(mes) - 1, 1);
    const nombre = fechaObj.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
  };

  // REGLA DE VENCIMIENTO DUPLA: CAMPAÑA GENERAL O MES HISTÓRICO SIN LIQUIDAR
  const hoyStr = new Date().toISOString().split('T')[0];
  const mesActualKey = hoyStr.substring(0, 7);

  const dealsConProrrateoDelMes = deals
    .filter(d => d.stage !== 'PERDIDO')
    .map(deal => {
      const mFacturado = deal.monto_facturado || 0;
      const mPendiente = Math.max(0, deal.amount - mFacturado);
      const desglose = calcularProrrateoPorDias(deal.fecha_desde, deal.fecha_hasta, deal.amount, mFacturado);
      const itemMes = desglose.find(m => m.mesClave === mesCierreSeleccionado);
      
      const montoProrrateadoMes = itemMes ? itemMes.montoTotal : 0;
      const montoFacturadoMes = itemMes ? itemMes.montoFacturado : 0;
      
      // Vencimiento 1: Contrato finalizado en el tiempo con saldo global
      const esVencidoGlobal = !!(deal.fecha_hasta && deal.fecha_hasta < hoyStr && mPendiente > 0);

      // Vencimiento 2: Mes seleccionado histórico que quedó impago o parcialmente pagado
      const esMesVencido = mesCierreSeleccionado < mesActualKey && montoProrrateadoMes > 0 && (montoFacturadoMes < montoProrrateadoMes);

      const esVencido = esVencidoGlobal || esMesVencido;

      return {
        ...deal,
        mFacturado,
        mPendiente,
        montoProrrateadoMes,
        esVencido,
        activaEnMesSeleccionado: montoProrrateadoMes > 0
      };
    });

  const dealsTablaFiltrados = dealsConProrrateoDelMes.filter(deal => {
    if (soloActivasEnMes && !deal.activaEnMesSeleccionado && !deal.esVencido) return false;
    return true;
  });

  const handlePrepararCierreMes = () => {
    if (!mesCierreSeleccionado) return;

    const itemsProcesados: ItemCierreMes[] = [];

    dealsConProrrateoDelMes.forEach(deal => {
      if (deal.mPendiente > 0 && (deal.montoProrrateadoMes > 0 || deal.esVencido)) {
        const sugMontoMes = Math.min(deal.mPendiente, deal.montoProrrateadoMes > 0 ? deal.montoProrrateadoMes : deal.mPendiente);

        itemsProcesados.push({
          dealId: deal.id,
          clienteNombre: deal.cliente?.nombre || 'Sin Cliente',
          dealTitulo: deal.titulo,
          montoTotalAcuerdo: deal.amount,
          montoFacturadoActual: deal.mFacturado,
          montoPendienteGlobal: deal.mPendiente,
          montoProrrateadoMes: deal.montoProrrateadoMes,
          montoAFacturarEditado: sugMontoMes,
          seleccionado: true,
          esVencido: deal.esVencido
        });
      }
    });

    if (itemsProcesados.length === 0) {
      alert(`No hay acuerdos pendientes para liquidar en ${obtenerNombreMesFormateado(mesCierreSeleccionado)}.`);
      return;
    }

    setItemsCierre(itemsProcesados);
    setIsModalCierreOpen(true);
  };

  const handleToggleSeleccion = (dealId: number) => {
    setItemsCierre(prev => prev.map(item => 
      item.dealId === dealId ? { ...item, seleccionado: !item.seleccionado } : item
    ));
  };

  const handleEditMontoFacturar = (dealId: number, nuevoValor: number) => {
    setItemsCierre(prev => prev.map(item => 
      item.dealId === dealId ? { ...item, montoAFacturarEditado: Math.max(0, nuevoValor) } : item
    ));
  };

  const handleToggleSeleccionarTodos = (marcar: boolean) => {
    setItemsCierre(prev => prev.map(item => ({ ...item, seleccionado: marcar })));
  };

  const handleConfirmarCierreMes = async () => {
    const seleccionados = itemsCierre.filter(i => i.seleccionado && i.montoAFacturarEditado > 0);

    if (seleccionados.length === 0) {
      alert("Selecciona al menos un acuerdo con un monto mayor a 0 para facturar.");
      return;
    }

    setGuardandoCierre(true);
    try {
      for (const item of seleccionados) {
        const nuevoMontoFacturado = item.montoFacturadoActual + item.montoAFacturarEditado;
        let nuevaEtapa = 'POR_FACTURAR';

        if (nuevoMontoFacturado >= item.montoTotalAcuerdo) {
          nuevaEtapa = 'FACTURADO';
        }

        const { error } = await supabase
          .from('deals')
          .update({
            monto_facturado: nuevoMontoFacturado,
            stage: nuevaEtapa
          })
          .eq('id', item.dealId);

        if (error) throw error;
      }

      alert(`¡Cierre de mes procesado exitosamente! Se actualizaron ${seleccionados.length} acuerdos.`);
      setIsModalCierreOpen(false);
      fetchDeals();
    } catch (error: any) {
      console.error("Error al procesar cierre masivo:", error);
      alert(`Hubo un error al guardar el cierre de mes: ${error.message}`);
    } finally {
      setGuardandoCierre(false);
    }
  };

  const totalProcesandoEnModal = itemsCierre
    .filter(i => i.seleccionado)
    .reduce((acc, i) => acc + (Number(i.montoAFacturarEditado) || 0), 0);

  return (
    <div className="w-full h-full flex flex-col gap-6 p-8 text-white overflow-y-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Módulo de Facturación</h1>
        <p className="text-slate-400 text-sm mt-1">Cierre de mes loteado, prorrateos y control de mora/vencimientos.</p>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-cyan-400 font-semibold animate-pulse">Sincronizando estado financiero...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 animate-fade-in">
          {/* CARDS KPIS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Monto Total Contratado</p>
              <h3 className="text-3xl font-extrabold text-white">${totalContratado.toLocaleString()}</h3>
            </div>

            <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Facturado Emitido</p>
              <h3 className="text-3xl font-extrabold text-emerald-400">${totalFacturadoReal.toLocaleString()}</h3>
            </div>

            <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Pendiente General por Facturar</p>
              <h3 className="text-3xl font-extrabold text-amber-400">${totalPendienteFacturar.toLocaleString()}</h3>
            </div>
          </div>

          {/* HERRAMIENTA DE CIERRE */}
          <section className="bg-slate-900/60 border border-white/10 rounded-xl p-6 backdrop-blur-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-slate-700 pb-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-400 text-3xl">fact_check</span>
                <div>
                  <h2 className="text-xl font-bold text-white">Liquidación de Cierre de Mes</h2>
                  <p className="text-xs text-slate-400">Selecciona el período contable para liquidar por lote.</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={mesCierreSeleccionado}
                  onChange={(e) => setMesCierreSeleccionado(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-white text-sm font-semibold rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-400"
                >
                  {listaProyeccionMensual.map(m => (
                    <option key={m.clave} value={m.clave}>
                      {m.nombreMes} (Pendiente: ${m.pendiente.toLocaleString()})
                    </option>
                  ))}
                </select>

                <button
                  onClick={handlePrepararCierreMes}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(52,211,153,0.2)] text-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">receipt_long</span>
                  Ejecutar Cierre de Mes
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4 text-xs">
              <label className="flex items-center gap-2 text-slate-300 hover:text-white cursor-pointer font-medium">
                <input 
                  type="checkbox" 
                  checked={soloActivasEnMes} 
                  onChange={(e) => setSoloActivasEnMes(e.target.checked)}
                  className="rounded border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-400"
                />
                <span>Ver solo campañas activas/vencidas en <strong className="text-cyan-400">{obtenerNombreMesFormateado(mesCierreSeleccionado)}</strong></span>
              </label>
              <span className="text-slate-400 font-mono">
                Mostrando {dealsTablaFiltrados.length} acuerdos
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Cliente / Campaña</th>
                    <th className="px-4 py-3">Vigencia</th>
                    <th className="px-4 py-3 text-right">Contrato Total</th>
                    <th className="px-4 py-3 text-right text-cyan-400 bg-cyan-950/30">Prorrateo {obtenerNombreMesFormateado(mesCierreSeleccionado)}</th>
                    <th className="px-4 py-3 text-right">Acumulado Facturado</th>
                    <th className="px-4 py-3 text-right">Pendiente Global</th>
                    <th className="px-4 py-3 text-center">Estado / Avance</th>
                    <th className="px-4 py-3 text-center rounded-tr-lg">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {dealsTablaFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-6 text-center text-slate-500 text-xs italic">
                        No hay campañas registradas con días activos o pendientes para {obtenerNombreMesFormateado(mesCierreSeleccionado)}.
                      </td>
                    </tr>
                  ) : (
                    dealsTablaFiltrados.map(deal => {
                      const pct = deal.amount > 0 ? Math.min(100, Math.round((deal.mFacturado / deal.amount) * 100)) : 0;

                      return (
                        <tr 
                          key={deal.id} 
                          className={`border-b border-slate-700 transition-colors ${
                            deal.esVencido 
                              ? 'bg-rose-950/20 border-l-4 border-l-rose-500 hover:bg-rose-900/30' 
                              : 'hover:bg-slate-800/50'
                          }`}
                        >
                          <td className="px-4 py-3">
                            <span className="font-bold text-white block">{deal.cliente?.nombre}</span>
                            <span className="text-xs text-slate-400">{deal.titulo}</span>
                          </td>
                          <td className="px-4 py-3 text-xs">{deal.fecha_desde} al {deal.fecha_hasta}</td>
                          <td className="px-4 py-3 font-mono text-right text-white">${deal.amount.toLocaleString()}</td>
                          <td className="px-4 py-3 font-mono text-right font-bold text-cyan-400 bg-cyan-950/20">
                            ${deal.montoProrrateadoMes.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 font-mono text-right text-emerald-400 font-semibold">${deal.mFacturado.toLocaleString()}</td>
                          
                          <td className={`px-4 py-3 font-mono text-right font-semibold ${deal.esVencido ? 'text-rose-400 font-extrabold' : 'text-amber-400'}`}>
                            ${deal.mPendiente.toLocaleString()}
                          </td>

                          <td className="px-4 py-3 text-center">
                            {deal.esVencido ? (
                              <span className="inline-block bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                                ⚠️ Pendiente Vencido
                              </span>
                            ) : (
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-16 bg-slate-800 rounded-full h-2 overflow-hidden">
                                  <div className="bg-emerald-400 h-2 rounded-full" style={{ width: `${pct}%` }}></div>
                                </div>
                                <span className="text-xs font-bold text-slate-300">{pct}%</span>
                              </div>
                            )}
                          </td>

                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => handleAjustarMontoFacturadoDirecto(deal)}
                              className="bg-slate-800 hover:bg-cyan-500 hover:text-slate-900 border border-slate-600 text-cyan-400 text-xs font-bold px-2.5 py-1 rounded transition-all flex items-center gap-1 mx-auto"
                              title="Ajustar manualmente el acumulado facturado"
                            >
                              <span className="material-symbols-outlined text-xs">edit_note</span>
                              Ajustar
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN */}
      {isModalCierreOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalCierreOpen(false)}></div>
          
          <div className="bg-slate-900 border border-white/20 rounded-xl shadow-2xl w-full max-w-5xl relative max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-slate-950">
              <div>
                <h3 className="font-bold text-xl text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400">task</span>
                  Confirmación de Cierre: {obtenerNombreMesFormateado(mesCierreSeleccionado)}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Revisa, edita o desmarca los montos a facturar para este período.
                </p>
              </div>

              <button onClick={() => setIsModalCierreOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="bg-slate-800/80 px-6 py-2.5 border-b border-slate-700 flex justify-between items-center text-xs">
              <div className="flex gap-3">
                <button 
                  onClick={() => handleToggleSeleccionarTodos(true)}
                  className="text-cyan-400 hover:underline font-bold"
                >
                  Seleccionar Todos
                </button>
                <span className="text-slate-600">|</span>
                <button 
                  onClick={() => handleToggleSeleccionarTodos(false)}
                  className="text-slate-400 hover:underline"
                >
                  Desmarcar Todos
                </button>
              </div>
              <span className="text-slate-400 font-mono">
                {itemsCierre.filter(i => i.seleccionado).length} de {itemsCierre.length} acuerdos seleccionados
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-xs text-slate-400 uppercase bg-slate-950/80 sticky top-0 z-10">
                  <tr>
                    <th className="p-3 w-10 text-center">Incluir</th>
                    <th className="p-3">Cliente / Acuerdo</th>
                    <th className="p-3 text-right">Contrato Total</th>
                    <th className="p-3 text-right">Facturado Previo</th>
                    <th className="p-3 text-right">Sugerido Prorrateo</th>
                    <th className="p-3 text-center w-48">Monto a Facturar hoy ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsCierre.map(item => (
                    <tr 
                      key={item.dealId} 
                      className={`border-b border-slate-800 transition-colors ${
                        !item.seleccionado 
                          ? 'opacity-40 bg-slate-950' 
                          : item.esVencido 
                            ? 'bg-rose-950/30 border-l-4 border-l-rose-500' 
                            : 'bg-slate-800/40 hover:bg-slate-800/70'
                      }`}
                    >
                      <td className="p-3 text-center">
                        <input 
                          type="checkbox"
                          checked={item.seleccionado}
                          onChange={() => handleToggleSeleccion(item.dealId)}
                          className="w-4 h-4 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                        />
                      </td>

                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white block">{item.clienteNombre}</span>
                          {item.esVencido && (
                            <span className="text-[9px] bg-rose-500/20 text-rose-400 font-bold px-1.5 py-0.2 rounded border border-rose-500/30">
                              Vencido
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400">{item.dealTitulo}</span>
                      </td>

                      <td className="p-3 text-right font-mono text-slate-400">${item.montoTotalAcuerdo.toLocaleString()}</td>
                      <td className="p-3 text-right font-mono text-emerald-400">${item.montoFacturadoActual.toLocaleString()}</td>
                      <td className="p-3 text-right font-mono text-cyan-400">${item.montoProrrateadoMes.toLocaleString()}</td>

                      <td className="p-3 text-center">
                        <input 
                          type="number"
                          min="0"
                          step="0.01"
                          disabled={!item.seleccionado}
                          value={item.montoAFacturarEditado}
                          onChange={(e) => handleEditMontoFacturar(item.dealId, parseFloat(e.target.value) || 0)}
                          className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-right font-bold text-emerald-400 text-sm focus:outline-none focus:border-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-white/10 bg-slate-950 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase font-bold text-slate-400">Total Lote A Facturar:</span>
                <span className="text-2xl font-bold text-emerald-400 font-mono">
                  ${totalProcesandoEnModal.toLocaleString()}
                </span>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setIsModalCierreOpen(false)}
                  className="flex-1 md:flex-none px-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-semibold"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  disabled={guardandoCierre || totalProcesandoEnModal === 0}
                  onClick={handleConfirmarCierreMes}
                  className="flex-1 md:flex-none bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-6 py-2.5 rounded-lg text-sm transition-all shadow-[0_0_15px_rgba(52,211,153,0.3)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  {guardandoCierre ? "Procesando Lote..." : "Confirmar y Facturar Lote"}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}