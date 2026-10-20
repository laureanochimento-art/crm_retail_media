"use client";

import { Deal, Usuario } from '../../lib/types';
import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import FormularioAcuerdo from "../../components/FormularioAcuerdo";

const STAGES = ["OPORTUNIDAD", "COTIZADO", "POR_FACTURAR", "FACTURADO", "PERDIDO"];

export default function CRMPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);

  const [filtroCanal, setFiltroCanal] = useState<string>("TODOS");
  const [filtroTipoCliente, setFiltroTipoCliente] = useState<string>("TODOS");
  const [filtroClienteId, setFiltroClienteId] = useState<string>("TODOS");
  const [busquedaGeneral, setBusquedaGeneral] = useState<string>("");
  const [draggedDealId, setDraggedDealId] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'CREATE' | 'EDIT'>('CREATE');
  const [editingDealId, setEditingDealId] = useState<number | null>(null);

  useEffect(() => {
    fetchDeals();
    fetchClientes();
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user?.email) {
      const { data } = await supabase.from('usuarios').select('*').eq('email', session.user.email).single();
      if (data) setCurrentUser(data as Usuario);
    }
  };

  const fetchDeals = async () => {
    const { data } = await supabase.from('deals').select(`
      *,
      cliente:clientes!cliente_id(*),
      marca_auspiciante:clientes!auspiciante_id(*),
      catalogo:catalogo(*),
      deal_tiendas(tiendas(*)),
      vendedor:usuarios!vendedor_id(*)
    `);
    
    if (data) {
      const formattedDeals: Deal[] = data.map((d: any) => ({
        ...d,
        tiendas: d.deal_tiendas ? d.deal_tiendas.map((dt: any) => dt.tiendas) : [],
        adjuntos: d.adjuntos || []
      }));
      setDeals(formattedDeals);
    }
  };

  const fetchClientes = async () => {
    const { data: dataClientes } = await supabase.from('clientes').select('*');
    if (dataClientes) setClientes(dataClientes);
  };

  const isJefe = currentUser?.rol === 'JEFE_VENTAS';
  const isVendedor = currentUser?.rol === 'VENDEDOR';
  const isAdministrativo = currentUser?.rol === 'ADMINISTRATIVO';
  const canCreate = !isAdministrativo;

  const canEditDeal = (deal: Deal) => {
    if (isJefe) return true;
    const etapasBloqueadas = ["POR_FACTURAR", "FACTURADO", "PERDIDO"];
    if (etapasBloqueadas.includes(deal.stage)) return false;
    if (isAdministrativo) return true;
    if (isVendedor) {
      if (!deal.vendedor_id || deal.vendedor_id === currentUser?.id) return true;
    }
    return false;
  };

  const dealsFiltrados = deals.filter((deal) => {
    if (filtroCanal !== "TODOS" && deal.channel !== filtroCanal) return false;
    if (filtroClienteId !== "TODOS" && deal.cliente_id?.toString() !== filtroClienteId) return false;
    if (filtroTipoCliente !== "TODOS") {
      const clienteObj = clientes.find((c) => c.id === deal.cliente_id);
      if (filtroTipoCliente === "AGENCIA" && !clienteObj?.es_agencia) return false;
      if (filtroTipoCliente === "DIRECTO" && clienteObj?.es_agencia) return false;
    }
    if (busquedaGeneral.trim() !== "") {
      const termino = busquedaGeneral.toLowerCase();
      const matchTitulo = deal.titulo?.toLowerCase().includes(termino);
      const matchCliente = deal.cliente?.nombre.toLowerCase().includes(termino);
      const matchMarca = deal.marca_auspiciante?.nombre?.toLowerCase().includes(termino);
      const matchElemento = deal.catalogo?.elemento.toLowerCase().includes(termino);
      const matchVendedor = deal.vendedor?.nombre.toLowerCase().includes(termino);
      if (!matchTitulo && !matchCliente && !matchMarca && !matchElemento && !matchVendedor) {
        return false;
      }
    }
    return true;
  });

  const totalPipeline = dealsFiltrados.filter((d) => d.stage !== "PERDIDO" && !d.es_reclasificado).reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const totalPerdido = dealsFiltrados.filter((d) => d.stage === "PERDIDO" && !d.es_reclasificado).reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const totalCerrado = dealsFiltrados.filter((d) => d.stage === "FACTURADO" && !d.es_reclasificado).reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const totalConcluidos = totalCerrado + totalPerdido;
  const ratioPerdida = totalConcluidos > 0 ? ((totalPerdido / totalConcluidos) * 100).toFixed(1) : "0.0";

  const handleDragStart = (e: React.DragEvent, deal: Deal) => {
    if (!canEditDeal(deal)) { e.preventDefault(); return; }
    setDraggedDealId(deal.id);
    e.dataTransfer.setData("text/plain", deal.id.toString());
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = async (e: React.DragEvent, targetStage: Deal['stage']) => {
    e.preventDefault();
    if (!draggedDealId) return;
    setDeals((prevDeals) => prevDeals.map((deal) => (deal.id === draggedDealId ? { ...deal, stage: targetStage } : deal)));
    const { error } = await supabase.from('deals').update({ stage: targetStage }).eq('id', draggedDealId);
    if (error) { console.error(error); fetchDeals(); }
    setDraggedDealId(null);
  };

  const handleDeleteDeal = async (dealId: number) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este acuerdo?")) return;
    setDeals((prevDeals) => prevDeals.filter((d) => d.id !== dealId));
    const { error } = await supabase.from('deals').delete().eq('id', dealId);
    if (error) { console.error(error); fetchDeals(); }
  };

  const openCreateModal = () => {
    setModalMode('CREATE');
    setEditingDealId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (deal: Deal) => {
    setModalMode('EDIT');
    setEditingDealId(deal.id);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Pipeline CRM</h1>
          <p className="text-slate-400 text-sm">Monitoreo de oportunidades y tasa de conversión.</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-900/80 border border-white/10 p-3 rounded-xl backdrop-blur-md">
          <div className="px-3 border-r border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Pipeline</span>
            <span className="text-lg font-bold text-cyan-400">${totalPipeline.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
          </div>
          <div className="px-3 border-r border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Facturado</span>
            <span className="text-lg font-bold text-emerald-400">${totalCerrado.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
          </div>
          <div className="px-3">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Ratio de Pérdida</span>
            <span className="text-lg font-bold text-rose-400">{ratioPerdida}%</span>
          </div>
          {canCreate && (
            <button onClick={openCreateModal} className="ml-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-2.5 rounded-lg transition-all flex items-center gap-1 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <span className="material-symbols-outlined text-sm">add</span> Nueva Oportunidad
            </button>
          )}
        </div>
      </div>

      <div className="bg-slate-900/60 border border-white/10 p-4 rounded-xl backdrop-blur-md flex flex-wrap gap-4 items-end justify-between">
        <div className="flex flex-wrap items-end gap-4 flex-1">
          <div className="flex-1 min-w-[200px] max-w-sm">
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Buscar</label>
            <div className="relative">
              <input type="text" placeholder="Ej: Samsung, Banner..." value={busquedaGeneral} onChange={(e) => setBusquedaGeneral(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg py-1.5 pl-8 pr-3 text-sm text-white focus:outline-none focus:border-cyan-400" />
              <span className="material-symbols-outlined text-slate-500 absolute left-2 top-1.5 text-sm">search</span>
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Canal</label>
            <select value={filtroCanal} onChange={(e) => setFiltroCanal(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400">
              <option value="TODOS">Todos</option>
              <option value="Digital">Digital</option>
              <option value="InStore">InStore</option>
            </select>
          </div>
        </div>
        <span className="text-xs text-slate-400">Mostrando <strong className="text-white">{dealsFiltrados.length}</strong> oportunidades</span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 flex-1">
        {STAGES.map((stage) => {
          const dealsEtapa = dealsFiltrados.filter((d) => d.stage === stage);
          const montoEtapa = dealsEtapa.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
          return (
            <div key={stage} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, stage as Deal['stage'])} className={`flex-1 min-w-[280px] bg-slate-900/60 border rounded-xl flex flex-col max-h-[70vh] backdrop-blur-md transition-all ${stage === "PERDIDO" ? 'border-rose-500/30 bg-rose-950/10' : 'border-slate-800'}`}>
              <div className="p-4 border-b border-slate-800 bg-slate-900/80 rounded-t-xl">
                <div className="flex justify-between items-center mb-1">
                  <h2 className={`font-bold text-xs tracking-wider uppercase ${stage === "PERDIDO" ? 'text-rose-400' : 'text-slate-300'}`}>{stage}</h2>
                  <span className="bg-slate-800 text-[10px] font-mono px-2 py-0.5 rounded-full text-slate-400">{dealsEtapa.length}</span>
                </div>
                <div className="text-sm font-extrabold text-cyan-400 mt-1">${montoEtapa.toLocaleString(undefined, {maximumFractionDigits:0})}</div>
              </div>
              <div className="p-3 flex-1 overflow-y-auto space-y-3">
                {dealsEtapa.map((deal) => {
                  const hasPermission = canEditDeal(deal);
                  return (
                    <div 
                      key={deal.id} 
                      draggable={hasPermission} 
                      onDragStart={(e) => handleDragStart(e, deal)} 
                      onClick={() => { if (hasPermission) openEditModal(deal); }}
                      className={`bg-slate-800/80 border border-slate-700/80 p-4 rounded-xl shadow-md transition-all relative group ${hasPermission ? 'cursor-pointer hover:border-cyan-500/50 hover:scale-[1.01]' : 'opacity-80 cursor-not-allowed'}`}
                    >
                      {hasPermission && (
                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); openEditModal(deal); }} 
                            className="text-slate-500 hover:text-cyan-400"
                            title="Editar acuerdo"
                          >
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); handleDeleteDeal(deal.id); }} 
                            className="text-slate-500 hover:text-rose-400"
                            title="Eliminar acuerdo"
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-start mb-1 pr-10">
                        <h3 className="font-semibold text-sm text-white">{deal.titulo}</h3>
                      </div>
                      
                      {deal.es_reclasificado && (
                        <span className="inline-block bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[9px] font-bold px-1.5 py-0.5 rounded mb-1">
                          Reclasificado
                        </span>
                      )}
                      
                      <p className="text-xs text-slate-400 mb-1">{deal.cliente?.nombre}</p>
                      <p className="text-[10px] text-slate-500 mb-2 flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-[12px]">person</span>
                        {deal.vendedor?.nombre || 'Sin asignar'}
                      </p>
                      
                      {deal.adjuntos && deal.adjuntos.length > 0 && (
                        <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-semibold mb-2">
                          <span className="material-symbols-outlined text-[12px]">attachment</span>
                          {deal.adjuntos.length} Archivos
                        </div>
                      )}
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-700/50">
                        <span className="font-bold text-cyan-400 text-sm">${Number(deal.amount).toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                        <span className="text-[9px] font-extrabold px-2 py-0.5 rounded uppercase bg-slate-800 text-slate-300">{deal.channel}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <FormularioAcuerdo 
          origen="CRM"
          modo={modalMode}
          dealAEditar={editingDealId ? deals.find(d => d.id === editingDealId) : null}
          onCerrar={() => {
            setIsModalOpen(false);
            setEditingDealId(null);
          }}
          onGuardadoExitoso={() => {
            setIsModalOpen(false);
            setEditingDealId(null);
            fetchDeals();
          }}
        />
      )}
    </div>
  );
}