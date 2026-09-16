"use client";

import { Cliente, Tienda, CatalogoItem, Deal, Usuario, Adjunto } from '../../lib/types';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { supabase } from "../../lib/supabase";
import SearchableSelect from "../../components/SearchableSelect";

export default function CotizadorPage() {
  const router = useRouter();

  const [clientes, setClientes] = useState<any[]>([]);
  const [catalogo, setCatalogo] = useState<any[]>([]);
  const [tiendas, setTiendas] = useState<any[]>([]);

  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);

  const [titulo, setTitulo] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [esAgencia, setEsAgencia] = useState(false);
  const [auspicianteSeleccionado, setAuspicianteSeleccionado] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  const [canal, setCanal] = useState("Digital");
  const [elementoSeleccionado, setElementoSeleccionado] = useState("");
  const [tiendasSeleccionadas, setTiendasSeleccionadas] = useState<number[]>([]);
  const [busquedaTienda, setBusquedaTienda] = useState("");
  const [esReclasificado, setEsReclasificado] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [descuentoItem, setDescuentoItem] = useState(0); 
  
  const [tasaInflacion, setTasaInflacion] = useState(0);
  const [descuentoGlobal, setDescuentoGlobal] = useState(0); // NUEVO: Descuento General

  const [adjuntosItemActual, setAdjuntosItemActual] = useState<Adjunto[]>([]);
  const [elementosAcuerdo, setElementosAcuerdo] = useState<any[]>([]);

  const [subiendoArchivo, setSubiendoArchivo] = useState(false);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        const { data } = await supabase.from('usuarios').select('*').eq('email', session.user.email).single();
        if (data) {
          const user = data as Usuario;
          if (user.rol === 'ADMINISTRATIVO') {
            router.push('/crm');
            return;
          }
          setCurrentUser(user);
        }
      }

      const { data: dataClientes } = await supabase.from('clientes').select('*');
      if (dataClientes) setClientes(dataClientes);

      const { data: dataCatalogo } = await supabase.from('catalogo').select('*');
      if (dataCatalogo) setCatalogo(dataCatalogo);

      const { data: dataTiendas } = await supabase.from('tiendas').select('*').order('numero', { ascending: true });
      if (dataTiendas) setTiendas(dataTiendas);
    }
    fetchData();
  }, [router]);

  const handleClienteChange = (id: string) => {
    setClienteSeleccionado(id);
    const cliente = clientes.find(c => c.id.toString() === id);
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
    setTiendasSeleccionadas(prev => 
      prev.includes(idTienda) ? prev.filter(id => id !== idTienda) : [...prev, idTienda]
    );
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
      alert("Debes seleccionar al menos una tienda para campañas InStore.");
      return;
    }

    const itemCatalogo = catalogo.find(c => c.id.toString() === elementoSeleccionado);
    if (!itemCatalogo) return;

    let multiplicadorTiempo = 1;
    let labelPeriodo = 'Campaña única';
    
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

  const tiendasFiltradas = tiendas.filter(t => {
    const termino = busquedaTienda.toLowerCase();
    return t.numero.includes(termino) || t.nombre.toLowerCase().includes(termino) || t.formato.toLowerCase().includes(termino);
  });
  
  // MATEMÁTICA ACTUALIZADA (Suma Base -> Inflación -> Descuento Item -> Descuento Global)
  const subtotalBaseGlobal = elementosAcuerdo.reduce((acc, item) => acc + item.subtotal, 0);
  
  const sumaItemsFinal = elementosAcuerdo.reduce((acc, item) => {
    const baseInflada = item.subtotal * (1 + (tasaInflacion / 100));
    const montoDesc = baseInflada * ((item.descuento || 0) / 100);
    return acc + (baseInflada - montoDesc);
  }, 0);

  const montoDescuentoGlobal = sumaItemsFinal * (descuentoGlobal / 100);
  const totalFinal = sumaItemsFinal - montoDescuentoGlobal;

  const handleGuardarCotizacion = async () => {
    if (!titulo.trim() || !clienteSeleccionado || elementosAcuerdo.length === 0 || !fechaDesde || !fechaHasta) {
      alert("Faltan datos obligatorios para guardar la cotización."); return; 
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

      const { data: dealCreated, error: dealError } = await supabase.from('deals').insert([{
        titulo: titulo, amount: totalFinal, channel: canalPrincipal, stage: 'COTIZADO',
        cliente_id: Number(clienteSeleccionado),
        auspiciante_id: auspicianteSeleccionado ? Number(auspicianteSeleccionado) : null,
        catalogo_id: Number(catalogoIdPrincipal),
        descuento_porcentaje: descuentoGlobal, // SE GUARDA EL DESCUENTO GLOBAL
        tasa_inflacion: tasaInflacion,
        fecha_desde: fechaDesde, fecha_hasta: fechaHasta,
        es_reclasificado: esReclasificado,
        adjuntos: todosLosAdjuntos,
        elementos_json: elementosAcuerdo, 
        vendedor_id: currentUser?.id || null 
      }]).select().single();

      if (dealError) throw dealError;

      const tiendasUnicas = new Set<number>();
      elementosAcuerdo.forEach(item => { if (item.tiendas) item.tiendas.forEach((tId: number) => tiendasUnicas.add(tId)); });

      if (dealCreated && tiendasUnicas.size > 0) {
        const registrosTiendas = Array.from(tiendasUnicas).map(tId => ({ deal_id: dealCreated.id, tienda_id: tId }));
        const { error: tiendasError } = await supabase.from('deal_tiendas').insert(registrosTiendas);
        if (tiendasError) throw tiendasError;
      }

      router.push('/crm');
    } catch (error) {
      alert("Hubo un error al guardar la cotización.");
    } finally {
      setGuardando(false);
    }
  };

  const opcionesClientes = clientes.map(c => ({ id: c.id, label: c.nombre }));
  const opcionesAnunciantes = clientes.filter(c => !c.es_agencia).map(c => ({ id: c.id, label: c.nombre }));
  const opcionesCatalogo = catalogo.filter(c => c.canal === canal).map(c => ({ id: c.id, label: `${c.elemento} ($${c.precio_base.toLocaleString()}) - ${c.periodo || 'Único'}` }));

  return (
    <div className="flex flex-col gap-8 h-full p-8 overflow-y-auto">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Cotizador de Campañas</h2>
        <p className="text-slate-400 text-sm">Arma tu acuerdo agregando elementos y sus renders correspondientes.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl items-start">
        <div className="flex flex-col gap-6 flex-1 w-full">
          
          {/* 1. DATOS DEL ACUERDO */}
          <div className="bg-slate-900/60 border border-white/10 rounded-xl p-6 backdrop-blur-md">
            <h3 className="text-cyan-400 font-semibold mb-4 border-b border-white/10 pb-2">1. Datos y Fechas (Obligatorio)</h3>
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-400 block mb-2">Título del Acuerdo *</label>
              <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-cyan-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-2">Cliente / Agencia *</label>
                <SearchableSelect options={opcionesClientes} value={clienteSeleccionado} onChange={handleClienteChange} placeholder="Buscar..." />
              </div>
              {esAgencia && (
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <label className="text-xs font-semibold text-cyan-400 block mb-2">Anunciante Final</label>
                  <SearchableSelect options={opcionesAnunciantes} value={auspicianteSeleccionado} onChange={setAuspicianteSeleccionado} placeholder="Buscar..." />
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-2">Vigencia Desde *</label>
                <input type="date" value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-2">Vigencia Hasta *</label>
                <input type="date" value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-cyan-400" />
              </div>
            </div>
          </div>

          {/* 2. CONFIGURADOR */}
          <div className="bg-slate-900/60 border border-white/10 rounded-xl p-6 backdrop-blur-md space-y-4">
            <h3 className="text-cyan-400 font-semibold border-b border-white/10 pb-2">2. Configurar Elemento</h3>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={canal === 'Digital'} onChange={() => handleCanalChange('Digital')} className="text-cyan-500 bg-slate-900 border-slate-700 w-4 h-4" />
                <span className="text-sm text-white">Digital</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={canal === 'InStore'} onChange={() => handleCanalChange('InStore')} className="text-amber-500 bg-slate-900 border-slate-700 w-4 h-4" />
                <span className="text-sm text-white">InStore (Físico)</span>
              </label>
            </div>
            
            <div className="mt-1 mb-3">
              <label className="flex items-center gap-2 text-sm text-slate-300 hover:text-white cursor-pointer w-fit p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 transition-colors">
                <input type="checkbox" checked={esReclasificado} onChange={(e) => setEsReclasificado(e.target.checked)} className="rounded border-slate-600 bg-slate-900 text-amber-500 focus:ring-amber-500" />
                <span>⚠️ Espacio Reclasificado</span>
              </label>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-2">Elemento ({canal}) *</label>
              <SearchableSelect options={opcionesCatalogo} value={elementoSeleccionado} onChange={setElementoSeleccionado} placeholder="Escribe el nombre..." />
            </div>

            {/* SECCIÓN CANTIDAD Y DESCUENTO INDIVIDUAL */}
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
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <label className="text-xs font-semibold text-slate-300 block mb-2">Selecciona tiendas ({tiendasSeleccionadas.length}):</label>
                <div className="relative mb-3">
                  <input type="text" value={busquedaTienda} onChange={(e) => setBusquedaTienda(e.target.value)} placeholder="Buscar tienda..." className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-amber-400" />
                  <span className="material-symbols-outlined text-slate-500 absolute left-2.5 top-2.5 text-sm">search</span>
                </div>
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2">
                  {tiendasFiltradas.map(t => (
                    <label key={t.id} className="flex items-center justify-between p-2 rounded bg-slate-900/60 hover:bg-slate-800 border border-slate-700/50 cursor-pointer text-sm text-slate-300 hover:text-white">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={tiendasSeleccionadas.includes(t.id)} onChange={() => handleTiendaToggle(t.id)} className="rounded border-slate-600 bg-slate-900 text-amber-500 focus:ring-amber-500" />
                        <span className="font-mono text-amber-400 text-xs bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">{t.numero}</span>
                        <span>{t.formato} {t.nombre}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

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
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                            adj.categoria?.includes('DISEÑO') ? 'bg-purple-500/20 text-purple-400' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {adj.categoria?.replace('DISEÑO_', '') || 'DOC'}
                          </span>
                          <span className="text-cyan-300 truncate max-w-[150px]">{adj.nombre}</span>
                        </div>
                        <button type="button" onClick={() => removeAdjuntoItemActual(adj.id)} className="text-slate-500 hover:text-rose-400">✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <button type="button" onClick={handleAgregarElemento} disabled={!elementoSeleccionado} className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-lg py-3 transition-colors disabled:opacity-50">
              + Agregar Elemento
            </button>
          </div>
        </div>

        {/* 3. RESUMEN / CARRITO */}
        <div className="w-full lg:w-[400px] bg-slate-900/80 border border-white/10 rounded-xl p-6 sticky top-24 shadow-2xl border-t-cyan-500/30">
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
            <span className="material-symbols-outlined text-cyan-400">receipt_long</span>
            <h3 className="font-semibold text-lg text-white">Resumen del Acuerdo</h3>
          </div>

          <div className="space-y-3 mb-6 min-h-[150px] max-h-[300px] overflow-y-auto pr-2">
            {elementosAcuerdo.map((item) => {
              const baseInflada = item.subtotal * (1 + (tasaInflacion / 100));
              const mDesc = baseInflada * ((item.descuento || 0) / 100);
              const precioItemFinal = baseInflada - mDesc;

              return (
                <div key={item.idUnico} className="bg-slate-800/80 p-3 rounded border border-slate-700 relative group">
                  <div className="flex justify-between items-start mb-1 pr-6">
                    <span className="font-medium text-white text-sm">{item.nombre}</span>
                    <span className="text-cyan-400 font-semibold text-sm">${precioItemFinal.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-1">
                    {item.canal} • {item.canal === 'InStore' ? `${item.cantidad}x ${item.tiendas.length} Tiendas` : '1'} • {item.labelPeriodo}
                  </p>
                  {item.descuento > 0 && (
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                      -{item.descuento}% OFF
                    </span>
                  )}
                  <button type="button" onClick={() => eliminarElemento(item.idUnico)} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100"><span className="material-symbols-outlined text-sm">delete</span></button>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Suma Base (Sin ajustes)</span>
              <span className="text-white">${subtotalBaseGlobal.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
            </div>
            
            <div className="flex justify-between items-center bg-slate-800/50 p-2 rounded-lg border border-slate-700">
              <span className="text-xs text-slate-300 font-semibold">Inflación General (%)</span>
              <input type="number" min="0" step="0.1" value={tasaInflacion} onChange={(e) => setTasaInflacion(Number(e.target.value))} className="w-20 bg-slate-900 border border-slate-600 rounded p-1 text-white text-right focus:border-cyan-400 outline-none text-sm" />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Descuento General (%)</span>
              <input type="number" min="0" max="100" value={descuentoGlobal} onChange={(e) => setDescuentoGlobal(Number(e.target.value))} className="w-20 bg-slate-800 border border-slate-700 rounded p-1 text-white text-right focus:border-cyan-400 outline-none text-sm" />
            </div>
          </div>

          <div className="flex justify-between items-end mb-6 bg-slate-950 p-4 rounded-lg border border-cyan-500/20">
            <span className="text-white font-semibold text-sm">Total Final</span>
            <span className="text-2xl font-bold text-cyan-400 tracking-tight">${totalFinal.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
          </div>

          <button type="button" onClick={handleGuardarCotizacion} disabled={elementosAcuerdo.length === 0 || !clienteSeleccionado || guardando} className="w-full bg-cyan-500 text-slate-900 hover:bg-cyan-400 font-bold rounded-lg py-3 transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">save</span> {guardando ? "Guardando..." : "Guardar Cotización"}
          </button>
        </div>
      </div>
    </div>
  );
}