"use client";

import { Cliente, Tienda, CatalogoItem, Deal, Usuario, Adjunto } from '../../lib/types';
import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import SearchableSelect from "../../components/SearchableSelect";
import { generarAcuerdoPDF } from "../../lib/generadorPdf"; 

const STAGES = ["OPORTUNIDAD", "COTIZADO", "POR_FACTURAR", "FACTURADO", "PERDIDO"];

export default function CRMPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [catalogo, setCatalogo] = useState<any[]>([]);
  const [tiendas, setTiendas] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);

  const [filtroCanal, setFiltroCanal] = useState<string>("TODOS");
  const [filtroTipoCliente, setFiltroTipoCliente] = useState<string>("TODOS");
  const [filtroClienteId, setFiltroClienteId] = useState<string>("TODOS");
  const [busquedaGeneral, setBusquedaGeneral] = useState<string>("");

  const [draggedDealId, setDraggedDealId] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'CREATE' | 'EDIT'>('CREATE');
  const [editingDealId, setEditingDealId] = useState<number | null>(null);

  const [titulo, setTitulo] = useState("");
  const [vendedorSeleccionado, setVendedorSeleccionado] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [esAgencia, setEsAgencia] = useState(false);
  const [auspicianteSeleccionado, setAuspicianteSeleccionado] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  
  const [canal, setCanal] = useState("Digital");
  const [elementoSeleccionado, setElementoSeleccionado] = useState("");
  const [tiendasSeleccionadas, setTiendasSeleccionadas] = useState<number[]>([]);
  const [busquedaTienda, setBusquedaTienda] = useState("");
  
  const [elementosAcuerdo, setElementosAcuerdo] = useState<any[]>([]);
  const [descuento, setDescuento] = useState(0);
  
  const [adjuntos, setAdjuntos] = useState<Adjunto[]>([]);
  const [subiendoArchivo, setSubiendoArchivo] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [generandoPdf, setGenerandoPdf] = useState(false);
  const [esReclasificado, setEsReclasificado] = useState(false);
  
  const [enviandoCorreo, setEnviandoCorreo] = useState(false);

  useEffect(() => {
    fetchDeals();
    fetchTablasApoyo();
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

  const fetchTablasApoyo = async () => {
    const { data: dataUsuarios } = await supabase.from('usuarios').select('*');
    if (dataUsuarios) setUsuarios(dataUsuarios);

    const { data: dataClientes } = await supabase.from('clientes').select('*');
    if (dataClientes) setClientes(dataClientes);

    const { data: dataCatalogo } = await supabase.from('catalogo').select('*');
    if (dataCatalogo) setCatalogo(dataCatalogo);

    const { data: dataTiendas } = await supabase.from('tiendas').select('*').order('numero', { ascending: true });
    if (dataTiendas) setTiendas(dataTiendas);
  };

  const isJefe = currentUser?.rol === 'JEFE_VENTAS';
  const isVendedor = currentUser?.rol === 'VENDEDOR';
  const isAdministrativo = currentUser?.rol === 'ADMINISTRATIVO';
  const canCreate = !isAdministrativo;

  const canEditDeal = (deal: Deal) => {
    if (isJefe) return true;
    if (isVendedor && deal.vendedor_id === currentUser?.id) return true;
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

  const totalPipeline = dealsFiltrados.filter((d) => d.stage !== "PERDIDO").reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const totalPerdido = dealsFiltrados.filter((d) => d.stage === "PERDIDO").reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const totalCerrado = dealsFiltrados.filter((d) => d.stage === "FACTURADO").reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
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

  const handleClienteChange = (id: string) => {
    setClienteSeleccionado(id);
    const cliente = clientes.find((c) => c.id.toString() === id);
    if (cliente) {
      setEsAgencia(cliente.es_agencia);
      if (!cliente.es_agencia) setAuspicianteSeleccionado("");
    } else {
      setEsAgencia(false);
    }
  };

  const handleTiendaToggle = (idTienda: number) => {
    setTiendasSeleccionadas((prev) => prev.includes(idTienda) ? prev.filter((id) => id !== idTienda) : [...prev, idTienda]);
  };

  const handleAgregarElemento = () => {
    if (!elementoSeleccionado) return;
    if (canal === 'InStore' && tiendasSeleccionadas.length === 0) { alert("Selecciona al menos una tienda para InStore."); return; }
    const itemCatalogo = catalogo.find(c => c.id.toString() === elementoSeleccionado);
    if (!itemCatalogo) return;
    const multiplicador = canal === 'InStore' ? tiendasSeleccionadas.length : 1;
    const subtotalItem = itemCatalogo.precio_base * multiplicador;
    const nuevoItem = {
      idUnico: Date.now(),
      catalogoId: itemCatalogo.id,
      nombre: itemCatalogo.elemento,
      canal: canal,
      precioUnitario: itemCatalogo.precio_base,
      tiendas: tiendasSeleccionadas,
      subtotal: subtotalItem
    };
    setElementosAcuerdo([...elementosAcuerdo, nuevoItem]);
    setElementoSeleccionado("");
    setTiendasSeleccionadas([]);
    setBusquedaTienda("");
  };

  const eliminarElemento = (idUnico: number) => setElementosAcuerdo(elementosAcuerdo.filter(item => item.idUnico !== idUnico));

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, categoria: 'DISEÑO' | 'EAN' | 'RENDER') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSubiendoArchivo(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage.from('adjuntos').upload(filePath, file);
      
      if (uploadError) {
        console.error("Error detallado de Supabase:", uploadError);
        throw new Error(uploadError.message || "Error desconocido al subir a Supabase");
      }

      const { data } = supabase.storage.from('adjuntos').getPublicUrl(filePath);

      const nuevoAdjunto: Adjunto = {
        id: filePath,
        nombre: file.name,
        url: data.publicUrl,
        tipo: file.type,
        tamaño: file.size,
        categoria: categoria 
      };

      setAdjuntos([...adjuntos, nuevoAdjunto]);
    } catch (error: any) {
      console.error("Error subiendo archivo:", error);
      alert(`Error exacto de Supabase: ${error.message}`);
    } finally {
      setSubiendoArchivo(false);
    }
  };

  const removeAdjunto = (id: string) => {
    setAdjuntos(adjuntos.filter(a => a.id !== id));
  };

  const subtotalGlobal = elementosAcuerdo.reduce((acc, item) => acc + item.subtotal, 0);
  const montoDescuento = (subtotalGlobal * descuento) / 100;
  const totalFinal = subtotalGlobal - montoDescuento;

  const openCreateModal = () => {
    resetForm();
    setModalMode('CREATE');
    setIsModalOpen(true);
  };

  const openEditModal = (deal: Deal) => {
    resetForm();
    setModalMode('EDIT');
    setEditingDealId(deal.id);
    
    setTitulo(deal.titulo || "");
    setVendedorSeleccionado(deal.vendedor_id ? deal.vendedor_id.toString() : "");
    setClienteSeleccionado(deal.cliente_id ? deal.cliente_id.toString() : "");
    const clienteObj = clientes.find(c => c.id === deal.cliente_id);
    setEsAgencia(clienteObj?.es_agencia || false);
    setAuspicianteSeleccionado(deal.auspiciante_id ? deal.auspiciante_id.toString() : "");
    setFechaDesde(deal.fecha_desde || "");
    setFechaHasta(deal.fecha_hasta || "");
    setDescuento(deal.descuento_porcentaje || 0);
    setEsReclasificado(deal.es_reclasificado || false);
    
    setAdjuntos(deal.adjuntos || []);

    if (deal.catalogo) {
      const tiendasIds = deal.tiendas ? deal.tiendas.map(t => t.id) : [];
      const multiplicador = (deal.channel === 'InStore' || deal.channel === 'Omnicanal') && tiendasIds.length > 0 ? tiendasIds.length : 1;
      const itemReconstruido = {
        idUnico: Date.now(),
        catalogoId: deal.catalogo_id,
        nombre: deal.catalogo.elemento,
        canal: deal.catalogo.canal,
        precioUnitario: deal.catalogo.precio_base,
        tiendas: tiendasIds,
        subtotal: deal.catalogo.precio_base * multiplicador
      };
      setElementosAcuerdo([itemReconstruido]);
    }
    
    setIsModalOpen(true);
  };

  const handleSaveDeal = async () => {
    if (!titulo.trim()) { alert("Por favor ingresa un Título."); return; }
    if (!clienteSeleccionado || elementosAcuerdo.length === 0) { alert("Selecciona un cliente y agrega al menos un elemento."); return; }
    if (!fechaDesde || !fechaHasta) { alert("Selecciona las fechas de vigencia."); return; }

    setGuardando(true);
    try {
      const tieneDigital = elementosAcuerdo.some(i => i.canal === 'Digital');
      const tieneInStore = elementosAcuerdo.some(i => i.canal === 'InStore');
      const canalPrincipal = (tieneDigital && tieneInStore) ? 'Omnicanal' : (tieneDigital ? 'Digital' : 'InStore');
      const catalogoIdPrincipal = elementosAcuerdo[0].catalogoId;

      const todosLosAdjuntos = [
        ...elementosAcuerdo.flatMap(item => 
          (item.adjuntos || []).map((adj: Adjunto) => ({
            ...adj,
            catalogo_id: item.catalogoId,
            elemento_nombre: item.nombre
          }))
        ),
        ...(adjuntos || [])
      ];

      const dealData = {
        titulo: titulo,
        amount: totalFinal,
        channel: canalPrincipal,
        cliente_id: Number(clienteSeleccionado),
        auspiciante_id: auspicianteSeleccionado ? Number(auspicianteSeleccionado) : null,
        catalogo_id: Number(catalogoIdPrincipal),
        descuento_porcentaje: descuento,
        fecha_desde: fechaDesde,
        fecha_hasta: fechaHasta,
        adjuntos: todosLosAdjuntos,
        es_reclasificado: esReclasificado,
        vendedor_id: vendedorSeleccionado ? Number(vendedorSeleccionado) : null
      };

      let dealIdToUse = editingDealId;

      if (modalMode === 'CREATE') {
        const { data, error } = await supabase.from('deals').insert([{ 
          ...dealData, 
          stage: 'OPORTUNIDAD'
        }]).select().single();
        if (error) throw error;
        dealIdToUse = data.id;
      } else {
        const { error } = await supabase.from('deals').update(dealData).eq('id', editingDealId);
        if (error) throw error;
        await supabase.from('deal_tiendas').delete().eq('deal_id', editingDealId);
      }

      const tiendasUnicas = new Set<number>();
      elementosAcuerdo.forEach(item => {
        if (item.tiendas) item.tiendas.forEach((tId: number) => tiendasUnicas.add(tId));
      });

      if (dealIdToUse && tiendasUnicas.size > 0) {
        const registrosTiendas = Array.from(tiendasUnicas).map(tId => ({ deal_id: dealIdToUse, tienda_id: tId }));
        await supabase.from('deal_tiendas').insert(registrosTiendas);
      }

      await fetchDeals();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar el acuerdo.");
    } finally {
      setGuardando(false);
    }
  };

  const handleEnviarCorreo = async () => {
    const currentDeal = deals.find(d => d.id === editingDealId);
    if (!currentDeal) return;

    const emailDestino = window.prompt(
      "Ingresa el correo del destinatario (puedes poner tu correo para probar):", 
      currentDeal.cliente?.contacto_email || ""
    );

    if (!emailDestino || emailDestino.trim() === "") return; 

    setEnviandoCorreo(true);
    try {
      const dealParaPDF = { ...currentDeal, adjuntos: adjuntos };
      const resultadoPdf = await generarAcuerdoPDF(dealParaPDF, true);
      
      if (!resultadoPdf) throw new Error("No se pudo generar el PDF.");
      const { pdfBase64, nombreArchivo } = resultadoPdf;

      const nombreVendedor = currentUser?.nombre || 'Equipo Comercial';
      const emailVendedor = currentUser?.email || 'ar_carrefourmedia@carrefour.com';

      const res = await fetch('/api/enviar-acuerdo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinatario: emailDestino,
          asunto: `Propuesta de Servicios Carrefour Media - ${currentDeal.titulo}`,
          mensaje: `Hola ${currentDeal.cliente?.nombre || ''},\n\nAdjunto a este correo enviamos la propuesta de servicios para la campaña "${currentDeal.titulo}".\n\nQuedamos a disposición por cualquier consulta.\n\nSaludos cordiales,\n${nombreVendedor}\nEquipo de Carrefour Media.`,
          pdfBase64: pdfBase64,
          nombreArchivo: nombreArchivo,
          remitenteNombre: nombreVendedor,
          remitenteEmail: emailVendedor 
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error desconocido al enviar.");
      }

      alert("¡Acuerdo enviado exitosamente por correo electrónico!");
    } catch (error: any) {
      console.error("Error en envío:", error);
      alert(`Hubo un error al enviar el correo: ${error.message}`);
    } finally {
      setEnviandoCorreo(false);
    }
  };

  const resetForm = () => {
    setTitulo("");
    setVendedorSeleccionado(currentUser?.id?.toString() || "");
    setClienteSeleccionado("");
    setEsAgencia(false);
    setAuspicianteSeleccionado("");
    setFechaDesde("");
    setFechaHasta("");
    setCanal("Digital");
    setElementoSeleccionado("");
    setTiendasSeleccionadas([]);
    setBusquedaTienda("");
    setElementosAcuerdo([]);
    setDescuento(0);
    setAdjuntos([]);
    setEsReclasificado(false);
    setEditingDealId(null);
  };

  const tiendasFiltradas = tiendas.filter((t) => {
    const termino = busquedaTienda.toLowerCase();
    return (t.numero.includes(termino) || t.nombre.toLowerCase().includes(termino) || t.formato.toLowerCase().includes(termino));
  });

  const opcionesClientes = clientes.map(c => ({ id: c.id, label: c.nombre }));
  const opcionesAnunciantes = clientes.filter(c => !c.es_agencia).map(c => ({ id: c.id, label: c.nombre }));
  const opcionesCatalogo = catalogo.filter(c => c.canal === canal).map(c => ({ id: c.id, label: `${c.elemento} ($${c.precio_base.toLocaleString()})` }));

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
            <span className="text-lg font-bold text-cyan-400">${totalPipeline.toLocaleString()}</span>
          </div>
          <div className="px-3 border-r border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Facturado</span>
            <span className="text-lg font-bold text-emerald-400">${totalCerrado.toLocaleString()}</span>
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
                <div className="text-sm font-extrabold text-cyan-400 mt-1">${montoEtapa.toLocaleString()}</div>
              </div>
              <div className="p-3 flex-1 overflow-y-auto space-y-3">
                {dealsEtapa.map((deal) => {
                  const hasPermission = canEditDeal(deal);
                  return (
                    <div key={deal.id} draggable={hasPermission} onDragStart={(e) => handleDragStart(e, deal)} className={`bg-slate-800/80 border border-slate-700/80 p-4 rounded-xl shadow-md transition-all relative group ${hasPermission ? 'cursor-grab hover:border-cyan-500/50 hover:scale-[1.01]' : 'opacity-80 cursor-not-allowed'}`}>
                      {hasPermission && (
                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={(e) => { e.stopPropagation(); openEditModal(deal); }} className="text-slate-500 hover:text-cyan-400"><span className="material-symbols-outlined text-sm">edit</span></button>
                          <button onClick={(e) => { e.stopPropagation(); handleDeleteDeal(deal.id); }} className="text-slate-500 hover:text-rose-400"><span className="material-symbols-outlined text-sm">delete</span></button>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-start mb-1 pr-10">
                        <h3 className="font-semibold text-sm text-white">{deal.titulo}</h3>
                      </div>
                      
                      {deal.es_reclasificado && (
                        <span className="inline-block bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[9px] font-bold px-1.5 py-0.5 rounded mb-1">
                          ⚠️ Reclasificado
                        </span>
                      )}
                      
                      <p className="text-xs text-slate-400 mb-1">🏢 {deal.cliente?.nombre}</p>

                      {/* MOSTRAR NOMBRE DEL VENDEDOR RESPONSABLE EN LA TARJETA */}
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
                        <span className="font-bold text-cyan-400 text-sm">${Number(deal.amount).toLocaleString()}</span>
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-slate-900 border border-white/20 rounded-xl shadow-2xl w-full max-w-6xl relative max-h-[95vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-slate-900/80">
              <h3 className="font-semibold text-xl text-white">{modalMode === 'CREATE' ? 'Nueva Oportunidad' : 'Editar Acuerdo'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 border-r border-white/10 space-y-6">
                
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-4 border-b border-white/10 pb-2">1. Datos y Vigencia</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-400 block mb-1">Título del Acuerdo *</label>
                        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:outline-none focus:border-cyan-400" />
                      </div>
                      
                      <div>
                        <label className="text-xs font-semibold text-slate-400 block mb-1">Responsable / Vendedor *</label>
                        <select 
                          value={vendedorSeleccionado} 
                          onChange={(e) => setVendedorSeleccionado(e.target.value)} 
                          disabled={!isJefe}
                          className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:outline-none focus:border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
                        >
                          {usuarios.map(u => (
                            <option key={u.id} value={u.id}>{u.nombre} - {u.rol}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-400 block mb-1">Cliente / Agencia *</label>
                        <SearchableSelect options={opcionesClientes} value={clienteSeleccionado} onChange={handleClienteChange} placeholder="Buscar cliente..." />
                      </div>
                      {esAgencia && (
                        <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
                          <label className="text-xs font-semibold text-cyan-400 block mb-1">Anunciante Final</label>
                          <SearchableSelect options={opcionesAnunciantes} value={auspicianteSeleccionado} onChange={setAuspicianteSeleccionado} placeholder="Buscar marca..." />
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-xs font-semibold text-slate-400 block mb-1">Desde *</label><input type="date" value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400" /></div>
                      <div><label className="text-xs font-semibold text-slate-400 block mb-1">Hasta *</label><input type="date" value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400" /></div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-cyan-400 font-semibold mb-4 border-b border-white/10 pb-2">2. Elementos</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex gap-4 mb-2">
                        <label className="flex items-center gap-2 text-sm text-white cursor-pointer"><input type="radio" checked={canal === 'Digital'} onChange={() => { setCanal('Digital'); setElementoSeleccionado(""); }} className="text-cyan-500 bg-slate-900 border-slate-700" /> Digital</label>
                        <label className="flex items-center gap-2 text-sm text-white cursor-pointer"><input type="radio" checked={canal === 'InStore'} onChange={() => { setCanal('InStore'); setElementoSeleccionado(""); }} className="text-amber-500 bg-slate-900 border-slate-700" /> InStore</label>
                      </div>

                      {canal === 'InStore' && (
                        <div className="mt-1 mb-3">
                          <label className="flex items-center gap-2 text-sm text-slate-300 hover:text-white cursor-pointer w-fit p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 transition-colors">
                            <input 
                              type="checkbox" 
                              checked={esReclasificado} 
                              onChange={(e) => setEsReclasificado(e.target.checked)} 
                              className="rounded border-slate-600 bg-slate-900 text-amber-500 focus:ring-amber-500" 
                            />
                            <span>⚠️ Espacio Reclasificado</span>
                          </label>
                        </div>
                      )}
                    </div>
                    <div>
                      <SearchableSelect options={opcionesCatalogo} value={elementoSeleccionado} onChange={setElementoSeleccionado} placeholder={`Buscar espacio ${canal}...`} />
                    </div>
                    {canal === 'InStore' && elementoSeleccionado && (
                      <div className="p-3 bg-slate-800/50 rounded border border-slate-700">
                        <input type="text" value={busquedaTienda} onChange={(e) => setBusquedaTienda(e.target.value)} placeholder="Buscar tienda..." className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white mb-2" />
                        <div className="max-h-32 overflow-y-auto space-y-1">
                          {tiendasFiltradas.map((t) => (
                            <label key={t.id} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                              <input type="checkbox" checked={tiendasSeleccionadas.includes(t.id)} onChange={() => handleTiendaToggle(t.id)} className="rounded bg-slate-900" />
                              <span className="font-mono text-amber-400">{t.numero}</span> {t.nombre}
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                    <button type="button" onClick={handleAgregarElemento} disabled={!elementoSeleccionado} className="w-full bg-slate-800 text-cyan-400 border border-cyan-500/30 rounded py-2 text-sm font-semibold disabled:opacity-50">+ Agregar Elemento</button>
                  </div>
                </div>

                <div>
                  <h4 className="text-cyan-400 font-semibold mb-4 border-b border-white/10 pb-2">
                    3. {canal === 'Digital' ? 'Diseños y EANs' : 'Renders InStore'}
                  </h4>
                  
                  {canal === 'Digital' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border-2 border-dashed border-slate-700 bg-slate-900/50 rounded-lg p-4 flex flex-col items-center justify-center text-center relative hover:border-cyan-500/50 transition-colors">
                        <span className="material-symbols-outlined text-3xl text-slate-500 mb-1">imagesmode</span>
                        <p className="text-sm text-slate-300 font-bold mb-1">Diseños a subir</p>
                        <p className="text-[10px] text-slate-500">JPG, PNG, GIF</p>
                        <input type="file" onChange={(e) => handleFileUpload(e, 'DISEÑO')} disabled={subiendoArchivo} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
                      </div>
                      
                      <div className="border-2 border-dashed border-slate-700 bg-slate-900/50 rounded-lg p-4 flex flex-col items-center justify-center text-center relative hover:border-cyan-500/50 transition-colors">
                        <span className="material-symbols-outlined text-3xl text-slate-500 mb-1">list_alt</span>
                        <p className="text-sm text-slate-300 font-bold mb-1">EANs de la Campaña</p>
                        <p className="text-[10px] text-slate-500">CSV, Excel</p>
                        <input type="file" onChange={(e) => handleFileUpload(e, 'EAN')} disabled={subiendoArchivo} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-700 bg-slate-900/50 rounded-lg p-6 flex flex-col items-center justify-center text-center relative hover:border-cyan-500/50 transition-colors">
                      <span className="material-symbols-outlined text-4xl text-slate-500 mb-2">view_in_ar</span>
                      <p className="text-sm text-slate-300 mb-1 font-bold">Renders InStore</p>
                      <p className="text-xs text-slate-500">Fotos o mockups físicos (JPG, PNG).</p>
                      <input type="file" onChange={(e) => handleFileUpload(e, 'RENDER')} disabled={subiendoArchivo} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
                    </div>
                  )}

                  {subiendoArchivo && (
                    <div className="mt-3 bg-slate-900/80 rounded-lg p-2 border border-cyan-500/30 flex justify-center">
                      <span className="text-cyan-400 font-bold animate-pulse text-sm">Subiendo archivo...</span>
                    </div>
                  )}

                  {adjuntos.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {adjuntos.map(adj => (
                        <div key={adj.id} className="flex items-center justify-between bg-slate-800 border border-slate-700 p-2 rounded text-sm">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <span className="material-symbols-outlined text-slate-400">
                              {adj.tipo.includes('image') ? 'image' : adj.tipo.includes('pdf') ? 'picture_as_pdf' : 'description'}
                            </span>
                            
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                              adj.categoria === 'DISEÑO' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                              adj.categoria === 'EAN' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                              'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}>
                              {adj.categoria || 'ADJUNTO'}
                            </span>

                            <a href={adj.url} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline truncate max-w-[150px]">
                              {adj.nombre}
                            </a>
                          </div>
                          <button onClick={() => removeAdjunto(adj.id)} className="text-slate-500 hover:text-rose-400">
                            <span className="material-symbols-outlined text-sm">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
              
              <div className="w-full lg:w-[350px] bg-slate-950 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                    <span className="material-symbols-outlined text-cyan-400 text-lg">shopping_cart</span>
                    <h3 className="font-semibold text-white">Resumen</h3>
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-2 mb-4">
                    {elementosAcuerdo.map((item) => (
                      <div key={item.idUnico} className="bg-slate-800/80 p-2 rounded border border-slate-700 relative group text-sm">
                        <div className="flex justify-between items-start mb-1 pr-6"><span className="font-medium text-white text-xs leading-tight">{item.nombre}</span></div>
                        <div className="flex justify-between items-end mt-2">
                          <p className="text-[10px] text-slate-400">{item.canal}</p>
                          <span className="text-cyan-400 font-semibold text-xs">${item.subtotal.toLocaleString()}</span>
                        </div>
                        <button onClick={() => eliminarElemento(item.idUnico)} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100"><span className="material-symbols-outlined text-sm">close</span></button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center text-sm"><span className="text-slate-400">Subtotal</span><span className="text-white">${subtotalGlobal.toLocaleString()}</span></div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Desc. (%)</span>
                    <input type="number" value={descuento} onChange={(e) => setDescuento(Number(e.target.value))} className="w-16 bg-slate-800 border border-slate-700 rounded p-1 text-white text-right focus:outline-none focus:border-cyan-400" />
                  </div>
                  <div className="flex justify-between items-end bg-slate-900 p-3 rounded border border-cyan-500/20 mt-2">
                    <span className="text-white font-semibold text-xs">Total</span>
                    <span className="text-lg font-bold text-cyan-400">${totalFinal.toLocaleString()}</span>
                  </div>

                  <button type="button" onClick={handleSaveDeal} disabled={guardando} className="w-full bg-cyan-500 text-slate-900 hover:bg-cyan-400 font-bold rounded py-2 text-sm mt-2">
                    {guardando ? "Guardando..." : "Guardar Cambios"}
                  </button>

                  {modalMode === 'EDIT' && (
                    <>
                      <button 
                        type="button" 
                        disabled={generandoPdf}
                        onClick={async () => {
                          const currentDeal = deals.find(d => d.id === editingDealId);
                          if (currentDeal) {
                            setGenerandoPdf(true); 
                            try {
                              const dealParaPDF = { ...currentDeal, adjuntos: adjuntos };
                              await generarAcuerdoPDF(dealParaPDF);
                            } catch (error) {
                              alert("Hubo un error al generar el PDF.");
                            } finally {
                              setGenerandoPdf(false);
                            }
                          }
                        }}
                        className="w-full bg-slate-800 border border-slate-600 text-white hover:bg-slate-700 font-bold rounded py-2 text-sm flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {generandoPdf ? 'hourglass_empty' : 'picture_as_pdf'}
                        </span>
                        {generandoPdf ? 'Procesando...' : 'Descargar Acuerdo PDF'}
                      </button>

                      <button 
                        type="button" 
                        disabled={enviandoCorreo || guardando}
                        onClick={handleEnviarCorreo}
                        className="w-full bg-indigo-600 border border-indigo-500 text-white hover:bg-indigo-500 font-bold rounded py-2 text-sm flex items-center justify-center gap-2 mt-2 disabled:opacity-50 shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {enviandoCorreo ? 'hourglass_empty' : 'send'}
                        </span>
                        {enviandoCorreo ? 'Enviando...' : 'Enviar por Correo'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}