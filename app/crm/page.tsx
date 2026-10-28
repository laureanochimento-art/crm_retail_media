"use client";

import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "../../lib/supabase";
import { Deal, Usuario } from "../../lib/types";
import FormularioAcuerdo from "../../components/FormularioAcuerdo";
import MultiSelect, { MultiSelectOption } from "../../components/MultiSelect";

const ETAPAS_PIPELINE = [
  { key: 'COTIZADO', label: 'COTIZADO', border: 'border-cyan-500/40', text: 'text-cyan-400', bg: 'bg-cyan-950/10' },
  { key: 'OPORTUNIDAD', label: 'OPORTUNIDAD', border: 'border-blue-500/40', text: 'text-blue-400', bg: 'bg-blue-950/10' },
  { key: 'POR_FACTURAR', label: 'POR FACTURAR', border: 'border-amber-500/40', text: 'text-amber-400', bg: 'bg-amber-950/10' },
  { key: 'FACTURADO', label: 'FACTURADO', border: 'border-emerald-500/40', text: 'text-emerald-400', bg: 'bg-emerald-950/10' },
  { key: 'PERDIDO', label: 'PERDIDO', border: 'border-rose-500/40', text: 'text-rose-400', bg: 'bg-rose-950/10' },
];

export default function CRMPage() {
  const [deals, setDeals] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  // Estados de Modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dealAEditar, setDealAEditar] = useState<Deal | null>(null);

  // ====================================================
  // FILTROS DEL CRM
  // ====================================================
  const [filtroTexto, setFiltroTexto] = useState("");
  
  // Selección múltiple
  const [vendedoresSeleccionados, setVendedoresSeleccionados] = useState<(string | number)[]>([]);
  const [clientesSeleccionados, setClientesSeleccionados] = useState<(string | number)[]>([]);
  const [canalesSeleccionados, setCanalesSeleccionados] = useState<(string | number)[]>([]);

  // Filtros de control
  const [filtroMisNegocios, setFiltroMisNegocios] = useState(false);
  const [filtroRegimen, setFiltroRegimen] = useState<string>("REGULARES"); // 'REGULARES' | 'RECLASIFICADOS' | 'TODOS'
  const [filtroAging, setFiltroAging] = useState<string>("TODOS"); // 'TODOS' | 'ESTANCADOS_15' | 'ESTANCADOS_30'
  const [filtroTipoCuenta, setFiltroTipoCuenta] = useState<string>("TODAS"); // 'TODAS' | 'DIRECTO' | 'AGENCIA'
  const [ticketMinimo, setTicketMinimo] = useState<number>(0);
  const [ordenSeleccionado, setOrdenSeleccionado] = useState<string>("RECENT"); // 'RECENT' | 'MONTO_DESC' | 'MONTO_ASC' | 'OLDEST'

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const [
        { data: dataDeals, error: errDeals },
        { data: dataUsuarios }
      ] = await Promise.all([
        supabase.from('deals').select(`
          *,
          cliente:clientes!cliente_id(*),
          vendedor:usuarios!vendedor_id(*)
        `).order('created_at', { ascending: false }),
        supabase.from('usuarios').select('*')
      ]);

      if (errDeals) throw errDeals;

      const listaUsuarios = (dataUsuarios as Usuario[]) || [];
      setUsuarios(listaUsuarios);

      if (user?.email && listaUsuarios.length > 0) {
        const emailNorm = user.email.trim().toLowerCase();
        const found = listaUsuarios.find(u => u.email?.trim().toLowerCase() === emailNorm);
        if (found) setCurrentUser(found);
      }

      if (dataDeals) setDeals(dataDeals);
    } catch (err) {
      console.error("Error al cargar pipeline:", err);
    } finally {
      setLoading(false);
    }
  };

  // Opciones para los selectores múltiples
  const opcionesVendedores: MultiSelectOption[] = useMemo(() => {
    return usuarios.map(u => ({
      id: u.id,
      label: u.nombre,
      sublabel: u.rol || 'Ventas'
    }));
  }, [usuarios]);

  const opcionesClientes: MultiSelectOption[] = useMemo(() => {
    const nombresVistos = new Set<string>();
    const lista: MultiSelectOption[] = [];

    deals.forEach(d => {
      const nombre = d.cliente?.nombre;
      const id = d.cliente_id;
      if (nombre && id && !nombresVistos.has(nombre)) {
        nombresVistos.add(nombre);
        lista.push({
          id: id,
          label: nombre,
          sublabel: d.cliente?.es_agencia ? 'Agencia' : 'Directo'
        });
      }
    });

    return lista.sort((a, b) => a.label.localeCompare(b.label));
  }, [deals]);

  const opcionesCanales: MultiSelectOption[] = [
    { id: 'Digital', label: 'Digital' },
    { id: 'InStore', label: 'InStore' },
    { id: 'Omnicanal', label: 'Omnicanal' }
  ];

  // Drag and Drop para cambio de etapa
  const handleDragStart = (e: React.DragEvent, dealId: number) => {
    e.dataTransfer.setData("dealId", dealId.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, nuevaEtapa: string) => {
    e.preventDefault();
    const dealIdStr = e.dataTransfer.getData("dealId");
    if (!dealIdStr) return;
    const dealId = Number(dealIdStr);

    const dealActual = deals.find(d => d.id === dealId);
    if (!dealActual || dealActual.stage === nuevaEtapa) return;

    // Actualización optimista
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, stage: nuevaEtapa } : d));

    try {
      const { error } = await supabase
        .from('deals')
        .update({ stage: nuevaEtapa, updated_at: new Date().toISOString() })
        .eq('id', dealId);

      if (error) throw error;
    } catch (err: any) {
      console.error("Error al mover etapa:", err);
      alert(`No se pudo actualizar la etapa: ${err.message}`);
      fetchData();
    }
  };

  // Filtrado de acuerdos
  const hoyMillis = new Date().getTime();

  const dealsFiltrados = useMemo(() => {
    return deals.filter(deal => {
      // 1. Buscador predictivo por texto
      if (filtroTexto.trim()) {
        const q = filtroTexto.toLowerCase();
        const coincideTitulo = deal.titulo?.toLowerCase().includes(q);
        const coincideCliente = deal.cliente?.nombre?.toLowerCase().includes(q);
        const coincideVendedor = deal.vendedor?.nombre?.toLowerCase().includes(q);
        if (!coincideTitulo && !coincideCliente && !coincideVendedor) return false;
      }

      // 2. Filtro rápido "Mis Negocios"
      if (filtroMisNegocios && currentUser?.id) {
        if (deal.vendedor_id !== currentUser.id) return false;
      }

      // 3. Selección múltiple de Vendedores
      if (vendedoresSeleccionados.length > 0) {
        const idVendDeal = deal.vendedor_id ? deal.vendedor_id.toString() : "";
        const coincide = vendedoresSeleccionados.some(v => v.toString() === idVendDeal);
        if (!coincide) return false;
      }

      // 4. Selección múltiple de Clientes
      if (clientesSeleccionados.length > 0) {
        const idCliDeal = deal.cliente_id ? deal.cliente_id.toString() : "";
        const coincide = clientesSeleccionados.some(c => c.toString() === idCliDeal);
        if (!coincide) return false;
      }

      // 5. Selección múltiple de Canales
      if (canalesSeleccionados.length > 0) {
        const canalDeal = deal.channel || 'Digital';
        const coincide = canalesSeleccionados.some(c => c.toString() === canalDeal);
        if (!coincide) return false;
      }

      // 6. Régimen Contable (Reclasificación)
      if (filtroRegimen === 'REGULARES' && deal.es_reclasificado) return false;
      if (filtroRegimen === 'RECLASIFICADOS' && !deal.es_reclasificado) return false;

      // 7. Tipo de Cuenta (Directo vs Agencia)
      const esAgencia = deal.cliente?.es_agencia;
      if (filtroTipoCuenta === 'DIRECTO' && esAgencia) return false;
      if (filtroTipoCuenta === 'AGENCIA' && !esAgencia) return false;

      // 8. Ticket Mínimo
      if (ticketMinimo > 0 && Number(deal.amount || 0) < ticketMinimo) return false;

      // 9. Semáforo de Aging
      if (filtroAging !== 'TODOS' && deal.created_at) {
        const dias = Math.round((hoyMillis - new Date(deal.created_at).getTime()) / (1000 * 60 * 60 * 24));
        const enNegociacion = deal.stage === 'COTIZADO' || deal.stage === 'OPORTUNIDAD';
        if (!enNegociacion) return false;
        if (filtroAging === 'ESTANCADOS_15' && dias < 15) return false;
        if (filtroAging === 'ESTANCADOS_30' && dias < 30) return false;
      }

      return true;
    }).sort((a, b) => {
      if (ordenSeleccionado === 'MONTO_DESC') return Number(b.amount || 0) - Number(a.amount || 0);
      if (ordenSeleccionado === 'MONTO_ASC') return Number(a.amount || 0) - Number(b.amount || 0);
      if (ordenSeleccionado === 'OLDEST') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [
    deals,
    filtroTexto,
    filtroMisNegocios,
    currentUser,
    vendedoresSeleccionados,
    clientesSeleccionados,
    canalesSeleccionados,
    filtroRegimen,
    filtroTipoCuenta,
    ticketMinimo,
    filtroAging,
    ordenSeleccionado,
    hoyMillis
  ]);

  const totalMontoVisible = dealsFiltrados.reduce((acc, d) => acc + Number(d.amount || 0), 0);
  const totalCantidadVisible = dealsFiltrados.length;

  const handleAbrirNuevo = () => {
    setDealAEditar(null);
    setIsModalOpen(true);
  };

  const handleAbrirEdicion = (deal: Deal) => {
    setDealAEditar(deal);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-full flex flex-col p-8 text-white gap-6 overflow-hidden">
      {/* CABECERA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pipeline CRM</h1>
          <p className="text-slate-400 text-sm mt-1">
            Monitoreo comercial, seguimiento de etapas y control de conversión.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setFiltroMisNegocios(!filtroMisNegocios)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
              filtroMisNegocios 
                ? 'bg-cyan-500 text-slate-900 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]' 
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500'
            }`}
          >
            <span className="material-symbols-outlined text-sm">person</span>
            {filtroMisNegocios ? 'Viendo: Mis Negocios' : 'Filtrar Mis Negocios'}
          </button>

          <button
            onClick={handleAbrirNuevo}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
          >
            <span className="material-symbols-outlined text-sm font-bold">add</span>
            Nueva Cotización
          </button>
        </div>
      </div>

      {/* BARRA DE FILTROS Y CONTROLES AVANZADOS */}
      <div className="bg-slate-900/80 border border-white/10 p-4 rounded-xl backdrop-blur-md space-y-3 flex-shrink-0 shadow-lg">
        {/* FILA 1: SELECTORES MÚLTIPLES Y BUSCADOR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Buscador de texto */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Buscar Campaña</label>
            <div className="relative">
              <input
                type="text"
                value={filtroTexto}
                onChange={(e) => setFiltroTexto(e.target.value)}
                placeholder="Título, cliente o vendedor..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 pl-8"
              />
              <span className="material-symbols-outlined text-slate-500 text-sm absolute left-2.5 top-2.5">search</span>
            </div>
          </div>

          {/* Selector Múltiple: Vendedores */}
          <MultiSelect
            label="Vendedor / Responsable"
            placeholder="Todos los vendedores"
            options={opcionesVendedores}
            selectedValues={vendedoresSeleccionados}
            onChange={setVendedoresSeleccionados}
          />

          {/* Selector Múltiple: Clientes / Empresas */}
          <MultiSelect
            label="Cliente / Empresa"
            placeholder="Todos los clientes"
            options={opcionesClientes}
            selectedValues={clientesSeleccionados}
            onChange={setClientesSeleccionados}
          />

          {/* Selector Múltiple: Canales */}
          <MultiSelect
            label="Canal / Vertical"
            placeholder="Todos los canales"
            options={opcionesCanales}
            selectedValues={canalesSeleccionados}
            onChange={setCanalesSeleccionados}
          />
        </div>

        {/* FILA 2: FILTROS DE CALIDAD, REGIMEN Y ORDEN */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 border-t border-slate-800 text-xs">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Régimen</label>
            <select
              value={filtroRegimen}
              onChange={(e) => setFiltroRegimen(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:border-cyan-400"
            >
              <option value="REGULARES">Solo Regulares</option>
              <option value="RECLASIFICADOS">Solo Reclasificados</option>
              <option value="TODOS">Todos</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Tipo Cuenta</label>
            <select
              value={filtroTipoCuenta}
              onChange={(e) => setFiltroTipoCuenta(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:border-cyan-400"
            >
              <option value="TODAS">Todas</option>
              <option value="DIRECTO">Solo Directo</option>
              <option value="AGENCIA">Solo Agencia</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Aging (Estancados)</label>
            <select
              value={filtroAging}
              onChange={(e) => setFiltroAging(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-amber-400 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:border-cyan-400"
            >
              <option value="TODOS">Cualquier Antigüedad</option>
              <option value="ESTANCADOS_15">&gt; 15 días sin avance</option>
              <option value="ESTANCADOS_30">&gt; 30 días sin avance</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Ticket Mínimo ($)</label>
            <input
              type="number"
              min="0"
              step="500000"
              value={ticketMinimo || ""}
              onChange={(e) => setTicketMinimo(parseFloat(e.target.value) || 0)}
              placeholder="0"
              className="w-full bg-slate-950 border border-slate-700 text-cyan-400 font-mono text-xs rounded-lg px-2.5 py-1.5 focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Ordenar Por</label>
            <select
              value={ordenSeleccionado}
              onChange={(e) => setOrdenSeleccionado(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:border-cyan-400"
            >
              <option value="RECENT">Más Recientes</option>
              <option value="MONTO_DESC">Mayor Monto ($)</option>
              <option value="MONTO_ASC">Menor Monto ($)</option>
              <option value="OLDEST">Más Antiguos</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setFiltroTexto("");
                setVendedoresSeleccionados([]);
                setClientesSeleccionados([]);
                setCanalesSeleccionados([]);
                setFiltroMisNegocios(false);
                setFiltroRegimen("REGULARES");
                setFiltroTipoCuenta("TODAS");
                setFiltroAging("TODOS");
                setTicketMinimo(0);
                setOrdenSeleccionado("RECENT");
              }}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg py-1.5 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-xs">restart_alt</span>
              Reset
            </button>
          </div>
        </div>

        {/* BARRA DE TOTALES DINÁMICOS */}
        <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-slate-800/80 font-mono">
          <span>Acuerdos Visibles: <strong className="text-white">{totalCantidadVisible}</strong></span>
          <span>Volumen Total Filtrado: <strong className="text-cyan-400 text-sm">${totalMontoVisible.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong></span>
        </div>
      </div>

      {/* TABLERO KANBAN DE ETAPAS */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-cyan-400 font-semibold animate-pulse flex items-center gap-2">
            <span className="material-symbols-outlined animate-spin text-sm">sync</span>
            Cargando pipeline comercial...
          </p>
        </div>
      ) : (
        <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
          {ETAPAS_PIPELINE.map(etapa => {
            const dealsEtapa = dealsFiltrados.filter(d => (d.stage || 'COTIZADO') === etapa.key);
            const totalEtapa = dealsEtapa.reduce((sum, d) => sum + Number(d.amount || 0), 0);

            return (
              <div
                key={etapa.key}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, etapa.key)}
                className="w-72 sm:w-80 flex-shrink-0 bg-slate-900/60 border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-lg backdrop-blur-md"
              >
                {/* Cabecera de Columna */}
                <div className={`p-4 border-b border-white/10 ${etapa.bg} flex justify-between items-center`}>
                  <div>
                    <h3 className={`text-xs font-bold uppercase tracking-wider ${etapa.text}`}>
                      {etapa.label}
                    </h3>
                    <p className="text-lg font-extrabold text-white font-mono mt-0.5">
                      ${totalEtapa.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs font-mono font-bold flex items-center justify-center">
                    {dealsEtapa.length}
                  </span>
                </div>

                {/* Lista de Tarjetas de la Etapa */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {dealsEtapa.length === 0 ? (
                    <div className="h-32 border-2 border-dashed border-slate-800/80 rounded-xl flex items-center justify-center text-xs text-slate-500 italic">
                      Arrastra acuerdos aquí
                    </div>
                  ) : (
                    dealsEtapa.map(deal => {
                      const diasAntiguedad = deal.created_at 
                        ? Math.round((hoyMillis - new Date(deal.created_at).getTime()) / (1000 * 60 * 60 * 24)) 
                        : 0;
                      const esEstancado = (deal.stage === 'COTIZADO' || deal.stage === 'OPORTUNIDAD') && diasAntiguedad >= 20;

                      return (
                        <div
                          key={deal.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, deal.id)}
                          onClick={() => handleAbrirEdicion(deal)}
                          className={`p-4 rounded-xl bg-slate-950 border transition-all cursor-grab active:cursor-grabbing hover:border-cyan-400/80 hover:shadow-lg group relative ${
                            deal.es_reclasificado 
                              ? 'border-purple-500/40 bg-purple-950/10' 
                              : esEstancado 
                                ? 'border-amber-500/50 bg-amber-950/10' 
                                : 'border-slate-800 hover:bg-slate-900/60'
                          }`}
                        >
                          {/* Insignia de Reclasificación o Aging */}
                          <div className="flex items-center gap-1.5 mb-1.5">
                            {deal.es_reclasificado && (
                              <span className="text-[9px] bg-purple-500/20 text-purple-300 font-bold px-1.5 py-0.5 rounded border border-purple-500/30">
                                Reclasificado
                              </span>
                            )}
                            {esEstancado && (
                              <span className="text-[9px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded border border-amber-500/30 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[10px]">timer</span>
                                {diasAntiguedad}d sin cierre
                              </span>
                            )}
                          </div>

                          {/* Título y Cliente */}
                          <h4 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors line-clamp-1">
                            {deal.titulo}
                          </h4>
                          <p className="text-xs text-slate-400 truncate mt-0.5">
                            {deal.cliente?.nombre || 'Sin Cliente'}
                          </p>

                          {/* Responsable */}
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-2.5">
                            <span className="material-symbols-outlined text-xs text-slate-500">person</span>
                            <span className="truncate">
                              {deal.vendedor?.nombre || <span className="text-amber-400/80 italic">Sin asignar</span>}
                            </span>
                          </div>

                          {/* Footer de Tarjeta: Monto y Canal */}
                          <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-800/80">
                            <span className="font-mono font-extrabold text-cyan-400 text-sm">
                              ${Number(deal.amount || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </span>
                            <span className="text-[9px] bg-slate-800 text-slate-300 font-semibold px-2 py-0.5 rounded border border-slate-700 uppercase font-mono">
                              {deal.channel || 'Digital'}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL DE CREACIÓN / EDICIÓN */}
      {isModalOpen && (
        <FormularioAcuerdo
          origen="CRM"
          modo={dealAEditar ? "EDIT" : "CREATE"}
          dealAEditar={dealAEditar}
          onCerrar={() => setIsModalOpen(false)}
          onGuardadoExitoso={() => {
            setIsModalOpen(false);
            fetchData();
          }}
        />
      )}
    </div>
  );
}