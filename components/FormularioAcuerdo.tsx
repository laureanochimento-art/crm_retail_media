"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import SearchableSelect from "./SearchableSelect";
import { Deal, Adjunto, Usuario } from '../lib/types';
import { generarAcuerdoPDF } from "../lib/generadorPdf";

interface FormularioAcuerdoProps {
  origen: 'CRM' | 'COTIZADOR';
  modo: 'CREATE' | 'EDIT';
  dealAEditar?: Deal | null;
  onCerrar: () => void;
  onGuardadoExitoso: () => void;
}

export default function FormularioAcuerdo({ origen, modo, dealAEditar, onCerrar, onGuardadoExitoso }: FormularioAcuerdoProps) {
  // Estados de datos base
  const [clientes, setClientes] = useState<any[]>([]);
  const [catalogo, setCatalogo] = useState<any[]>([]);
  const [tiendas, setTiendas] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);

  // Estados del Formulario
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
  const [cantidad, setCantidad] = useState(1);
  const [descuentoItem, setDescuentoItem] = useState(0);
  const [elementosAcuerdo, setElementosAcuerdo] = useState<any[]>([]);
  const [tasaInflacion, setTasaInflacion] = useState(0);
  const [descuentoGlobal, setDescuentoGlobal] = useState(0);
  const [adjuntosItemActual, setAdjuntosItemActual] = useState<Adjunto[]>([]);
  const [esReclasificado, setEsReclasificado] = useState(false);

  // Estados de carga y procesos
  const [subiendoArchivo, setSubiendoArchivo] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [generandoPdf, setGenerandoPdf] = useState(false);
  const [enviandoCorreo, setEnviandoCorreo] = useState(false);

  useEffect(() => {
    fetchTablasApoyo();
  }, []);

  useEffect(() => {
    if (modo === 'EDIT' && dealAEditar) {
      cargarDatosEdicion(dealAEditar);
    }
  }, [modo, dealAEditar]);

  const fetchTablasApoyo = async () => {
    // Usuario Actual
    const { data: { session } } = await supabase.auth.getSession();
    let userLogged: Usuario | null = null;
    if (session?.user?.email) {
      const { data } = await supabase.from('usuarios').select('*').eq('email', session.user.email).single();
      if (data) {
        userLogged = data as Usuario;
        setCurrentUser(userLogged);
        // Por defecto, asignar al usuario actual
        if (modo === 'CREATE') {
          setVendedorSeleccionado(data.id.toString());
        }
      }
    }

    // Listas
    const { data: dataClientes } = await supabase.from('clientes').select('*');
    if (dataClientes) setClientes(dataClientes);

    const { data: dataCatalogo } = await supabase.from('catalogo').select('*');
    if (dataCatalogo) setCatalogo(dataCatalogo);

    const { data: dataTiendas } = await supabase.from('tiendas').select('*').order('numero', { ascending: true });
    if (dataTiendas) setTiendas(dataTiendas);

    // Solo cargamos usuarios si es Jefe de Ventas para poder asignarlos
    if (userLogged?.rol === 'JEFE_VENTAS') {
      const { data: dataUsuarios } = await supabase.from('usuarios').select('*');
      if (dataUsuarios) setUsuarios(dataUsuarios);
    }
  };

  const cargarDatosEdicion = (deal: Deal) => {
    setTitulo(deal.titulo || "");
    setVendedorSeleccionado(deal.vendedor_id ? deal.vendedor_id.toString() : "");
    setClienteSeleccionado(deal.cliente_id ? deal.cliente_id.toString() : "");
    const clienteObj = clientes.find(c => c.id === deal.cliente_id);
    setEsAgencia(clienteObj?.es_agencia || false);
    setAuspicianteSeleccionado(deal.auspiciante_id ? deal.auspiciante_id.toString() : "");
    setFechaDesde(deal.fecha_desde || "");
    setFechaHasta(deal.fecha_hasta || "");
    setDescuentoGlobal(deal.descuento_porcentaje || 0);
    setTasaInflacion(deal.tasa_inflacion || 0);
    setEsReclasificado(deal.es_reclasificado || false);
    
    if (deal.elementos_json && deal.elementos_json.length > 0) {
      setElementosAcuerdo(deal.elementos_json);
    } else if (deal.catalogo) {
      // Reconstrucción por compatibilidad hacia atrás
      const tiendasIds = deal.tiendas ? deal.tiendas.map(t => t.id) : [];
      let subtotalEstimado = deal.amount;
      if (deal.descuento_porcentaje > 0) subtotalEstimado = subtotalEstimado / (1 - (deal.descuento_porcentaje / 100));
      if (deal.tasa_inflacion > 0) subtotalEstimado = subtotalEstimado / (1 + (deal.tasa_inflacion / 100));
      
      setElementosAcuerdo([{
        idUnico: Date.now(),
        catalogoId: deal.catalogo_id,
        nombre: deal.catalogo.elemento,
        canal: deal.catalogo.canal,
        precioUnitario: deal.catalogo.precio_base,
        tiendas: tiendasIds,
        cantidad: 1,
        labelPeriodo: "Periodo Original",
        descuento: 0,
        subtotal: subtotalEstimado,
        adjuntos: deal.adjuntos || []
      }]);
    }
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

  const handleCanalChange = (nuevoCanal: string) => {
    setCanal(nuevoCanal);
    setElementoSeleccionado("");
    setTiendasSeleccionadas([]);
    setBusquedaTienda("");
    setAdjuntosItemActual([]);
    setCantidad(1);
    setDescuentoItem(0);
  };

  const handleTiendaToggle = (idTienda: number) => {
    setTiendasSeleccionadas((prev) => prev.includes(idTienda) ? prev.filter((id) => id !== idTienda) : [...prev, idTienda]);
  };

  const handleFileUploadItem = async (e: React.ChangeEvent<HTMLInputElement>, categoria: 'DISEÑO_DESKTOP' | 'DISEÑO_MOBILE' | 'EAN' | 'RENDER') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSubiendoArchivo(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('adjuntos').upload(fileName, file);
      if (uploadError) throw new Error(uploadError.message);
      
      const { data } = supabase.storage.from('adjuntos').getPublicUrl(fileName);
      const nuevoAdjunto: Adjunto = {
        id: fileName,
        nombre: file.name,
        url: data.publicUrl,
        tipo: file.type,
        tamaño: file.size,
        categoria: categoria
      };
      setAdjuntosItemActual(prev => [...prev, nuevoAdjunto]);
    } catch (error: any) {
      alert(`Error subiendo archivo: ${error.message}`);
    } finally {
      setSubiendoArchivo(false);
    }
  };

  const removeAdjuntoItemActual = (id: string) => setAdjuntosItemActual(prev => prev.filter(a => a.id !== id));

  const handleAgregarElemento = () => {
    if (!elementoSeleccionado) return;
    if (!fechaDesde || !fechaHasta) {
      alert("Debes establecer la 'Vigencia Desde' y 'Vigencia Hasta' antes de agregar elementos para calcular los periodos.");
      return;
    }
    if (canal === 'InStore' && tiendasSeleccionadas.length === 0) {
      alert("Selecciona al menos una tienda para InStore.");
      return;
    }
    
    const itemCatalogo = catalogo.find(c => c.id.toString() === elementoSeleccionado);
    if (!itemCatalogo) return;
    
    let multiplicadorTiempo = 1;
    let labelPeriodo = 'Campaña Única';
    const d1 = new Date(`${fechaDesde}T12:00:00Z`);
    const d2 = new Date(`${fechaHasta}T12:00:00Z`);
    
    if (d2 >= d1) {
      if (itemCatalogo.periodo === 'Semanal') {
        const diffTime = d2.getTime() - d1.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        multiplicadorTiempo = Math.ceil(diffDays / 7);
        labelPeriodo = `${multiplicadorTiempo} Semana(s)`;
      } else if (itemCatalogo.periodo === 'Mensual') {
        const m1 = d1.getUTCFullYear() * 12 + d1.getUTCMonth();
        const m2 = d2.getUTCFullYear() * 12 + d2.getUTCMonth();
        multiplicadorTiempo = (m2 - m1) + 1;
        labelPeriodo = `${multiplicadorTiempo} Mes(es)`;
      }
    }
    
    const multiplicadorTiendas = canal === 'InStore' ? tiendasSeleccionadas.length : 1;
    const multiplicadorCantidad = canal === 'InStore' ? cantidad : 1;
    const subtotalItem = itemCatalogo.precio_base * multiplicadorTiendas * multiplicadorTiempo * multiplicadorCantidad;
    
    const nuevoItem = {
      idUnico: Date.now(),
      catalogoId: itemCatalogo.id,
      nombre: itemCatalogo.elemento,
      canal: canal,
      precioUnitario: itemCatalogo.precio_base,
      tiendas: tiendasSeleccionadas,
      cantidad: multiplicadorCantidad,
      multiplicadorTiempo,
      labelPeriodo,
      descuento: descuentoItem,
      subtotal: subtotalItem,
      adjuntos: adjuntosItemActual
    };
    
    setElementosAcuerdo([...elementosAcuerdo, nuevoItem]);
    setElementoSeleccionado("");
    setTiendasSeleccionadas([]);
    setBusquedaTienda("");
    setAdjuntosItemActual([]);
    setCantidad(1);
    setDescuentoItem(0);
  };

  const eliminarElemento = (idUnico: number) => setElementosAcuerdo(elementosAcuerdo.filter(item => item.idUnico !== idUnico));

  // Matemáticas Generales
  const subtotalBaseGlobal = elementosAcuerdo.reduce((acc, item) => acc + item.subtotal, 0);
  const sumaItemsFinal = elementosAcuerdo.reduce((acc, item) => {
    const baseInflada = item.subtotal * (1 + (tasaInflacion / 100));
    const montoDesc = baseInflada * ((item.descuento || 0) / 100);
    return acc + (baseInflada - montoDesc);
  }, 0);
  const montoDescuentoGlobal = sumaItemsFinal * (descuentoGlobal / 100);
  const totalFinal = sumaItemsFinal - montoDescuentoGlobal;

  const handleSaveDeal = async () => {
    if (!titulo.trim() || !clienteSeleccionado || elementosAcuerdo.length === 0 || !fechaDesde || !fechaHasta) {
      alert("Faltan datos obligatorios para guardar el acuerdo.");
      return;
    }

    setGuardando(true);
    try {
      const tieneDigital = elementosAcuerdo.some(i => i.canal === 'Digital');
      const tieneInStore = elementosAcuerdo.some(i => i.canal === 'InStore');
      const canalPrincipal = (tieneDigital && tieneInStore) ? 'Omnicanal' : (tieneDigital ? 'Digital' : 'InStore');
      const catalogoIdPrincipal = elementosAcuerdo[0].catalogoId;
      
      const todosLosAdjuntos = elementosAcuerdo.flatMap(item => 
        (item.adjuntos || []).map((adj: Adjunto) => ({
          ...adj, catalogo_id: item.catalogoId, elemento_nombre: item.nombre
        }))
      );

      // Regla de Etapas (Oportunidad para CRM, Cotizado para Cotizador)
      const stageToSave = modo === 'EDIT' 
        ? (dealAEditar?.stage || 'OPORTUNIDAD') 
        : (origen === 'CRM' ? 'OPORTUNIDAD' : 'COTIZADO');

      const dealData = {
        titulo: titulo,
        amount: totalFinal,
        channel: canalPrincipal,
        cliente_id: Number(clienteSeleccionado),
        auspiciante_id: auspicianteSeleccionado ? Number(auspicianteSeleccionado) : null,
        catalogo_id: Number(catalogoIdPrincipal),
        descuento_porcentaje: descuentoGlobal,
        tasa_inflacion: tasaInflacion,
        fecha_desde: fechaDesde,
        fecha_hasta: fechaHasta,
        adjuntos: todosLosAdjuntos,
        elementos_json: elementosAcuerdo,
        es_reclasificado: esReclasificado,
        vendedor_id: vendedorSeleccionado ? Number(vendedorSeleccionado) : (currentUser?.id || null),
        stage: stageToSave
      };

      let dealIdToUse = modo === 'EDIT' ? dealAEditar?.id : null;

      if (modo === 'CREATE') {
        const { data, error } = await supabase.from('deals').insert([dealData]).select().single();
        if (error) throw error;
        dealIdToUse = data.id;
      } else {
        const { error } = await supabase.from('deals').update(dealData).eq('id', dealIdToUse);
        if (error) throw error;
        await supabase.from('deal_tiendas').delete().eq('deal_id', dealIdToUse);
      }

      const tiendasUnicas = new Set<number>();
      elementosAcuerdo.forEach(item => { if (item.tiendas) item.tiendas.forEach((tId: number) => tiendasUnicas.add(tId)); });
      
      if (dealIdToUse && tiendasUnicas.size > 0) {
        const registrosTiendas = Array.from(tiendasUnicas).map(tId => ({ deal_id: dealIdToUse, tienda_id: tId }));
        await supabase.from('deal_tiendas').insert(registrosTiendas);
      }

      onGuardadoExitoso();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar el acuerdo.");
    } finally {
      setGuardando(false);
    }
  };

  const handleEnviarCorreo = async () => {
    if (!dealAEditar) return;
    const emailDestino = window.prompt("Ingresa el correo del destinatario:", dealAEditar.cliente?.contacto_email || "");
    if (!emailDestino || emailDestino.trim() === "") return;
    
    setEnviandoCorreo(true);
    try {
      const dealParaPDF = { ...dealAEditar, adjuntos: elementosAcuerdo.flatMap(i => i.adjuntos || []), elementos_json: elementosAcuerdo };
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
          asunto: `Propuesta de Servicios Carrefour Media - ${dealAEditar.titulo}`,
          mensaje: `Hola ${dealAEditar.cliente?.nombre || ''},\n\nAdjunto a este correo enviamos la propuesta de servicios para la campaña "${dealAEditar.titulo}".\n\nQuedamos a disposición por cualquier consulta.\n\nSaludos cordiales,\n${nombreVendedor}\nEquipo de Carrefour Media.`,
          pdfBase64: pdfBase64,
          nombreArchivo: nombreArchivo,
          remitenteNombre: nombreVendedor,
          remitenteEmail: emailVendedor 
        })
      });
      if (!res.ok) throw new Error("Error desconocido al enviar.");
      alert("¡Acuerdo enviado exitosamente por correo electrónico!");
    } catch (error: any) {
      alert(`Hubo un error al enviar el correo: ${error.message}`);
    } finally {
      setEnviandoCorreo(false);
    }
  };

  const opcionesClientes = clientes.map(c => ({ id: c.id, label: c.nombre }));
  const opcionesAnunciantes = clientes.filter(c => !c.es_agencia).map(c => ({ id: c.id, label: c.nombre }));
  const opcionesCatalogo = catalogo.filter(c => c.canal === canal).map(c => ({ id: c.id, label: `${c.elemento} ($${c.precio_base.toLocaleString()}) - ${c.periodo || 'Único'}` }));
  const tiendasFiltradas = tiendas.filter(t => t.numero.includes(busquedaTienda) || t.nombre.toLowerCase().includes(busquedaTienda.toLowerCase()) || t.formato.toLowerCase().includes(busquedaTienda.toLowerCase()));

  // CONTENIDO VISUAL DEL FORMULARIO
  const FormularioContent = (
    <div className={`bg-slate-900 ${origen === 'CRM' ? 'border border-white/20 rounded-xl shadow-2xl w-full max-w-6xl relative max-h-[95vh]' : 'w-full h-full'} overflow-hidden flex flex-col`}>
      {/* Cabecera */}
      <div className="flex justify-between items-center p-6 border-b border-white/10 bg-slate-900/80">
        <h3 className="font-semibold text-xl text-white">
          {modo === 'CREATE' ? (origen === 'CRM' ? 'Nueva Oportunidad' : 'Nueva Cotización') : 'Editar Acuerdo'}
        </h3>
        {origen === 'CRM' && (
          <button onClick={onCerrar} className="text-slate-400 hover:text-white"><span className="material-symbols-outlined">close</span></button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Lado Izquierdo (Datos) */}
        <div className="flex-1 overflow-y-auto p-6 border-r border-white/10 space-y-6">
          {/* Bloque 1: Datos y Fechas */}
          <div>
            <h4 className="text-cyan-400 font-semibold mb-4 border-b border-white/10 pb-2">1. Datos y Vigencia</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Título del Acuerdo *</label>
                  <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:outline-none focus:border-cyan-400" />
                </div>
                {/* CAMPO VENDEDOR: SOLO VISIBLE PARA JEFE DE VENTAS */}
                {currentUser?.rol === 'JEFE_VENTAS' && (
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">Responsable / Vendedor *</label>
                    <select value={vendedorSeleccionado} onChange={(e) => setVendedorSeleccionado(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:outline-none focus:border-cyan-400 appearance-none">
                      {usuarios.map(u => <option key={u.id} value={u.id}>{u.nombre} - {u.rol}</option>)}
                    </select>
                  </div>
                )}
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

          {/* Bloque 2: Elementos */}
          <div>
            <h4 className="text-cyan-400 font-semibold mb-4 border-b border-white/10 pb-2">2. Configurar Elementos</h4>
            <div className="space-y-4">
              <div>
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center gap-2 text-sm text-white cursor-pointer"><input type="radio" checked={canal === 'Digital'} onChange={() => handleCanalChange('Digital')} className="text-cyan-500 bg-slate-900 border-slate-700" /> Digital</label>
                  <label className="flex items-center gap-2 text-sm text-white cursor-pointer"><input type="radio" checked={canal === 'InStore'} onChange={() => handleCanalChange('InStore')} className="text-amber-500 bg-slate-900 border-slate-700" /> InStore</label>
                </div>
                <div className="mt-1 mb-3">
                  <label className="flex items-center gap-2 text-sm text-slate-300 hover:text-white cursor-pointer w-fit p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 transition-colors">
                    <input type="checkbox" checked={esReclasificado} onChange={(e) => setEsReclasificado(e.target.checked)} className="rounded border-slate-600 bg-slate-900 text-amber-500 focus:ring-amber-500" />
                    <span> Espacio Reclasificado</span>
                  </label>
                </div>
              </div>
              
              <div>
                <SearchableSelect options={opcionesCatalogo} value={elementoSeleccionado} onChange={setElementoSeleccionado} placeholder={`Buscar espacio ${canal}...`} />
              </div>
              
              {elementoSeleccionado && (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {canal === 'InStore' && (
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-2">Unidades por tienda *</label>
                      <input type="number" min="1" value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:outline-none focus:border-amber-400" />
                    </div>
                  )}
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-2">Descuento aplicado al ítem (%)</label>
                    <input type="number" min="0" max="100" value={descuentoItem} onChange={(e) => setDescuentoItem(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:outline-none focus:border-cyan-400" />
                  </div>
                </div>
              )}
              
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

              {/* Subida de Adjuntos individual por elemento */}
              {elementoSeleccionado && (
                <div className="p-4 bg-slate-950/80 border border-cyan-500/30 rounded-lg space-y-3">
                  <label className="text-xs font-bold text-cyan-400 uppercase block">Adjuntos para este Elemento</label>
                  {canal === 'Digital' ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="border border-dashed border-slate-700 bg-slate-900/50 rounded-lg p-3 text-center relative hover:border-cyan-500/50 transition-colors">
                        <span className="material-symbols-outlined text-xl text-slate-400">desktop_windows</span>
                        <p className="text-xs text-slate-300 font-bold mt-1">Diseño Desktop</p>
                        <input type="file" onChange={(e) => handleFileUploadItem(e, 'DISEÑO_DESKTOP')} disabled={subiendoArchivo} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                      <div className="border border-dashed border-slate-700 bg-slate-900/50 rounded-lg p-3 text-center relative hover:border-cyan-500/50 transition-colors">
                        <span className="material-symbols-outlined text-xl text-slate-400">smartphone</span>
                        <p className="text-xs text-slate-300 font-bold mt-1">Diseño Mobile</p>
                        <input type="file" onChange={(e) => handleFileUploadItem(e, 'DISEÑO_MOBILE')} disabled={subiendoArchivo} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                      <div className="border border-dashed border-slate-700 bg-slate-900/50 rounded-lg p-3 text-center relative hover:border-cyan-500/50 transition-colors">
                        <span className="material-symbols-outlined text-xl text-slate-400">list_alt</span>
                        <p className="text-xs text-slate-300 font-bold mt-1">EANs (CSV)</p>
                        <input type="file" onChange={(e) => handleFileUploadItem(e, 'EAN')} disabled={subiendoArchivo} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                    </div>
                  ) : (
                    <div className="border border-dashed border-slate-700 bg-slate-900/50 rounded-lg p-4 text-center relative hover:border-amber-500/50 transition-colors">
                      <span className="material-symbols-outlined text-2xl text-amber-400">view_in_ar</span>
                      <p className="text-xs text-slate-300 font-bold mt-1">Subir Render / Foto InStore</p>
                      <input type="file" onChange={(e) => handleFileUploadItem(e, 'RENDER')} disabled={subiendoArchivo} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                  )}
                  {subiendoArchivo && <p className="text-xs text-cyan-400 animate-pulse text-center">Subiendo...</p>}
                  
                  {adjuntosItemActual.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {adjuntosItemActual.map(adj => (
                        <div key={adj.id} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-2 rounded text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-cyan-300 truncate max-w-[150px]">{adj.nombre}</span>
                          </div>
                          <button type="button" onClick={() => removeAdjuntoItemActual(adj.id)} className="text-slate-500 hover:text-rose-400"><span className="material-symbols-outlined text-sm">close</span></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <button type="button" onClick={handleAgregarElemento} disabled={!elementoSeleccionado} className="w-full bg-slate-800 text-cyan-400 border border-cyan-500/30 rounded py-2 text-sm font-semibold disabled:opacity-50">+ Agregar Elemento</button>
            </div>
          </div>
        </div>

        {/* Lado Derecho (Resumen) */}
        <div className="w-full lg:w-[350px] bg-slate-950 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
              <span className="material-symbols-outlined text-cyan-400 text-lg">shopping_cart</span>
              <h3 className="font-semibold text-white">Resumen</h3>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2 mb-4">
              {elementosAcuerdo.map((item) => {
                const baseInflada = item.subtotal * (1 + (tasaInflacion / 100));
                const mDesc = baseInflada * ((item.descuento || 0) / 100);
                const precioItemFinal = baseInflada - mDesc;
                return (
                  <div key={item.idUnico} className="bg-slate-800/80 p-2 rounded border border-slate-700 relative group text-sm">
                    <div className="flex justify-between items-start mb-1 pr-6">
                      <span className="font-medium text-white text-xs leading-tight">{item.nombre}</span>
                      <span className="text-cyan-400 font-semibold text-xs">${precioItemFinal.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                      <p className="text-[10px] text-slate-400">{item.canal} | {item.canal === 'InStore' ? `${item.cantidad}x ${item.tiendas.length} tiendas` : '1x'}</p>
                      {item.descuento > 0 && <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">-{item.descuento}% OFF</span>}
                    </div>
                    <button onClick={() => eliminarElemento(item.idUnico)} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100"><span className="material-symbols-outlined text-sm">close</span></button>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Suma Base</span>
              <span className="text-white">${subtotalBaseGlobal.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
            </div>
            <div className="flex justify-between items-center bg-slate-800 p-2 rounded">
              <span className="text-xs text-slate-300">Inflación General (%)</span>
              <input type="number" step="0.1" value={tasaInflacion} onChange={e => setTasaInflacion(Number(e.target.value))} className="w-16 bg-slate-900 text-white border border-slate-700 rounded p-1 text-right focus:outline-none focus:border-cyan-400" />
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Descuento Global (%)</span>
              <input type="number" value={descuentoGlobal} onChange={(e) => setDescuentoGlobal(Number(e.target.value))} className="w-16 bg-slate-800 border border-slate-700 rounded p-1 text-white text-right focus:outline-none focus:border-cyan-400" />
            </div>
            <div className="flex justify-between items-end bg-slate-900 p-3 rounded border border-cyan-500/20 mt-2">
              <span className="text-white font-semibold text-xs">Total Final</span>
              <span className="text-lg font-bold text-cyan-400">${totalFinal.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
            </div>
            
            <button type="button" onClick={handleSaveDeal} disabled={guardando} className="w-full bg-cyan-500 text-slate-900 hover:bg-cyan-400 font-bold rounded py-2 text-sm mt-2">
              {guardando ? "Guardando..." : "Guardar Acuerdo"}
            </button>
            
            {modo === 'EDIT' && (
              <>
                <button type="button" disabled={generandoPdf} onClick={async () => {
                  if (dealAEditar) {
                    setGenerandoPdf(true);
                    try {
                      const dealParaPDF = { ...dealAEditar, adjuntos: elementosAcuerdo.flatMap(i => i.adjuntos || []), elementos_json: elementosAcuerdo };
                      await generarAcuerdoPDF(dealParaPDF);
                    } catch (error) {
                      alert("Error al generar PDF.");
                    } finally {
                      setGenerandoPdf(false);
                    }
                  }
                }} className="w-full bg-slate-800 border border-slate-600 text-white hover:bg-slate-700 font-bold rounded py-2 text-sm flex items-center justify-center gap-2 mt-2">
                  <span className="material-symbols-outlined text-sm">{generandoPdf ? 'hourglass_empty' : 'picture_as_pdf'}</span>
                  {generandoPdf ? 'Procesando...' : 'Descargar Acuerdo PDF'}
                </button>
                <button type="button" disabled={enviandoCorreo || guardando} onClick={handleEnviarCorreo} className="w-full bg-indigo-600 border border-indigo-500 text-white hover:bg-indigo-500 font-bold rounded py-2 text-sm flex items-center justify-center gap-2 mt-2">
                  <span className="material-symbols-outlined text-sm">{enviandoCorreo ? 'hourglass_empty' : 'send'}</span>
                  {enviandoCorreo ? 'Enviando...' : 'Enviar por Correo'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Lógica del contenedor: Modal si es CRM, Bloque normal si es Cotizador
  if (origen === 'CRM') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCerrar}></div>
        {FormularioContent}
      </div>
    );
  }

  return FormularioContent;
}