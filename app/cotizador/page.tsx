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

  // ADJUNTOS ASOCIADOS AL ELEMENTO ACTUAL EN CONFIGURACIÓN
  const [adjuntosItemActual, setAdjuntosItemActual] = useState<Adjunto[]>([]);
  
  const [elementosAcuerdo, setElementosAcuerdo] = useState<any[]>([]);
  const [descuento, setDescuento] = useState(0);

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
  };

  const handleTiendaToggle = (idTienda: number) => {
    setTiendasSeleccionadas(prev => 
      prev.includes(idTienda) 
        ? prev.filter(id => id !== idTienda) 
        : [...prev, idTienda]
    );
  };

  const handleFileUploadItem = async (e: React.ChangeEvent<HTMLInputElement>, categoria: 'DISEÑO' | 'EAN' | 'RENDER') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSubiendoArchivo(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from('adjuntos').upload(filePath, file);
      
      if (uploadError) {
        throw new Error(uploadError.message || "Error al subir a Supabase");
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

      setAdjuntosItemActual(prev => [...prev, nuevoAdjunto]);
    } catch (error: any) {
      console.error("Error subiendo archivo:", error);
      alert(`Error subiendo archivo: ${error.message}`);
    } finally {
      setSubiendoArchivo(false);
    }
  };

  const removeAdjuntoItemActual = (id: string) => {
    setAdjuntosItemActual(prev => prev.filter(a => a.id !== id));
  };

  const handleAgregarElemento = () => {
    if (!elementoSeleccionado) return;
    if (canal === 'InStore' && tiendasSeleccionadas.length === 0) {
      alert("Debes seleccionar al menos una tienda para campañas InStore.");
      return;
    }

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
      subtotal: subtotalItem,
      adjuntos: adjuntosItemActual // <--- ADJUNTOS VINCULADOS DIRECTAMENTE A ESTE ELEMENTO
    };

    setElementosAcuerdo([...elementosAcuerdo, nuevoItem]);
    
    // Resetear formulario de elemento
    setElementoSeleccionado("");
    setTiendasSeleccionadas([]);
    setBusquedaTienda("");
    setAdjuntosItemActual([]);
  };

  const eliminarElemento = (idUnico: number) => {
    setElementosAcuerdo(elementosAcuerdo.filter(item => item.idUnico !== idUnico));
  };

  const tiendasFiltradas = tiendas.filter(t => {
    const termino = busquedaTienda.toLowerCase();
    return (
      t.numero.includes(termino) ||
      t.nombre.toLowerCase().includes(termino) ||
      t.formato.toLowerCase().includes(termino)
    );
  });
  
  const subtotalGlobal = elementosAcuerdo.reduce((acc, item) => acc + item.subtotal, 0);
  const montoDescuento = (subtotalGlobal * descuento) / 100;
  const totalFinal = subtotalGlobal - montoDescuento;

  const handleGuardarCotizacion = async () => {
    if (!titulo.trim()) { alert("Por favor ingresa un Título para el acuerdo."); return; }
    if (!clienteSeleccionado || elementosAcuerdo.length === 0) { alert("Selecciona un cliente y agrega al menos un elemento."); return; }
    if (!fechaDesde || !fechaHasta) { alert("Selecciona las fechas de vigencia (Desde / Hasta)."); return; }
    if (new Date(fechaHasta) < new Date(fechaDesde)) { alert("La Fecha Hasta no puede ser menor a la Fecha Desde."); return; }

    setGuardando(true);

    try {
      const tieneDigital = elementosAcuerdo.some(i => i.canal === 'Digital');
      const tieneInStore = elementosAcuerdo.some(i => i.canal === 'InStore');
      const canalPrincipal = (tieneDigital && tieneInStore) ? 'Omnicanal' : (tieneDigital ? 'Digital' : 'InStore');
      const catalogoIdPrincipal = elementosAcuerdo[0].catalogoId;

      // CONSOLIDAR ADJUNTOS ETIQUETADOS POR ELEMENTO
      const todosLosAdjuntos = elementosAcuerdo.flatMap(item => 
        (item.adjuntos || []).map((adj: Adjunto) => ({
          ...adj,
          catalogo_id: item.catalogoId,
          elemento_nombre: item.nombre
        }))
      );

      const { data: dealCreated, error: dealError } = await supabase.from('deals').insert([
        {
          titulo: titulo,
          amount: totalFinal,
          channel: canalPrincipal,
          stage: 'COTIZADO',
          cliente_id: Number(clienteSeleccionado),
          auspiciante_id: auspicianteSeleccionado ? Number(auspicianteSeleccionado) : null,
          catalogo_id: Number(catalogoIdPrincipal),
          descuento_porcentaje: descuento,
          fecha_desde: fechaDesde,
          fecha_hasta: fechaHasta,
          es_reclasificado: esReclasificado,
          adjuntos: todosLosAdjuntos,
          vendedor_id: currentUser?.id || null 
        }
      ]).select().single();

      if (dealError) throw dealError;

      const tiendasUnicas = new Set<number>();
      elementosAcuerdo.forEach(item => {
        if (item.tiendas) item.tiendas.forEach((tId: number) => tiendasUnicas.add(tId));
      });

      if (dealCreated && tiendasUnicas.size > 0) {
        const registrosTiendas = Array.from(tiendasUnicas).map(tId => ({ deal_id: dealCreated.id, tienda_id: tId }));
        const { error: tiendasError } = await supabase.from('deal_tiendas').insert(registrosTiendas);
        if (tiendasError) throw tiendasError;
      }

      router.push('/crm');

    } catch (error) {
      console.error("Error al guardar cotización:", error);
      alert("Hubo un error al guardar la cotización.");
    } finally {
      setGuardando(false);
    }
  };

  const opcionesClientes = clientes.map(c => ({ id: c.id, label: c.nombre }));
  const opcionesAnunciantes = clientes.filter(c => !c.es_agencia).map(c => ({ id: c.id, label: c.nombre }));
  const opcionesCatalogo = catalogo.filter(c => c.canal === canal).map(c => ({ id: c.id, label: `${c.elemento} ($${c.precio_base.toLocaleString()})` }));

  return (
    <div className="flex flex-col gap-8 h-full p-8 overflow-y-auto">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Cotizador de Campañas</h2>
        <p className="text-slate-400 text-sm">Arma tu acuerdo agregando elementos y sus renders correspondientes.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl items-start">
        
        {/* COLUMNA IZQ: CONFIGURADOR */}
        <div className="flex flex-col gap-6 flex-1 w-full">
          
          <div className="bg-slate-900/60 border border-white/10 rounded-xl p-6 backdrop-blur-md">
            <h3 className="text-cyan-400 font-semibold mb-4 border-b border-white/10 pb-2">1. Datos del Acuerdo</h3>
            
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-400 block mb-2">Título del Acuerdo *</label>
              <input 
                type="text" 
                placeholder="Ej: Campaña Verano 2024"
                value={titulo} 
                onChange={(e) => setTitulo(e.target.value)} 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-2">Cliente / Agencia *</label>
                <SearchableSelect 
                  options={opcionesClientes}
                  value={clienteSeleccionado}
                  onChange={handleClienteChange}
                  placeholder="Escribe para buscar..."
                />
              </div>

              {esAgencia && (
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <label className="text-xs font-semibold text-cyan-400 block mb-2">Anunciante Final</label>
                  <SearchableSelect 
                    options={opcionesAnunciantes}
                    value={auspicianteSeleccionado}
                    onChange={setAuspicianteSeleccionado}
                    placeholder="Escribe para buscar..."
                  />
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

            {canal === 'InStore' && (
              <div>
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

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-2">Elemento ({canal}) *</label>
              <SearchableSelect 
                options={opcionesCatalogo}
                value={elementoSeleccionado}
                onChange={setElementoSeleccionado}
                placeholder="Escribe el nombre del espacio..."
              />
            </div>

            {canal === 'InStore' && elementoSeleccionado && (
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Selecciona las tiendas a aplicar ({tiendasSeleccionadas.length} seleccionadas):
                </label>

                <div className="relative mb-3">
                  <input 
                    type="text"
                    value={busquedaTienda}
                    onChange={(e) => setBusquedaTienda(e.target.value)}
                    placeholder="Buscar tienda por nro (0101), nombre o formato..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                  <span className="material-symbols-outlined text-slate-500 absolute left-2.5 top-2.5 text-sm">
                    search
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2">
                  {tiendasFiltradas.length === 0 ? (
                    <p className="text-slate-500 text-xs text-center py-2">No se encontraron tiendas.</p>
                  ) : (
                    tiendasFiltradas.map(tienda => (
                      <label key={tienda.id} className="flex items-center justify-between p-2 rounded bg-slate-900/60 hover:bg-slate-800 border border-slate-700/50 cursor-pointer text-sm text-slate-300 hover:text-white transition-colors">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            checked={tiendasSeleccionadas.includes(tienda.id)}
                            onChange={() => handleTiendaToggle(tienda.id)}
                            className="rounded border-slate-600 bg-slate-900 text-amber-500 focus:ring-amber-500"
                          />
                          <span className="font-mono text-amber-400 text-xs bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">{tienda.numero}</span>
                          <span>{tienda.formato} {tienda.nombre}</span>
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* SECCIÓN DE SUBIDA DE ARCHIVOS VINCULADA AL ELEMENTO ACTUAL */}
            {elementoSeleccionado && (
              <div className="p-4 bg-slate-950/80 border border-cyan-500/30 rounded-lg space-y-3">
                <label className="text-xs font-bold text-cyan-400 uppercase block">
                  Adjuntos para este Elemento ({canal === 'Digital' ? 'Diseños / EANs' : 'Renders / Fotos'})
                </label>

                {canal === 'Digital' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="border border-dashed border-slate-700 bg-slate-900/50 rounded-lg p-3 text-center relative hover:border-cyan-500/50">
                      <span className="material-symbols-outlined text-xl text-slate-400">imagesmode</span>
                      <p className="text-xs text-slate-300 font-bold">Subir Diseño</p>
                      <input type="file" onChange={(e) => handleFileUploadItem(e, 'DISEÑO')} disabled={subiendoArchivo} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                    <div className="border border-dashed border-slate-700 bg-slate-900/50 rounded-lg p-3 text-center relative hover:border-cyan-500/50">
                      <span className="material-symbols-outlined text-xl text-slate-400">list_alt</span>
                      <p className="text-xs text-slate-300 font-bold">Subir EANs (CSV)</p>
                      <input type="file" onChange={(e) => handleFileUploadItem(e, 'EAN')} disabled={subiendoArchivo} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                  </div>
                ) : (
                  <div className="border border-dashed border-slate-700 bg-slate-900/50 rounded-lg p-4 text-center relative hover:border-amber-500/50">
                    <span className="material-symbols-outlined text-2xl text-amber-400">view_in_ar</span>
                    <p className="text-xs text-slate-300 font-bold">Subir Render / Foto del Espacio InStore</p>
                    <input type="file" onChange={(e) => handleFileUploadItem(e, 'RENDER')} disabled={subiendoArchivo} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                )}

                {subiendoArchivo && <p className="text-xs text-cyan-400 animate-pulse text-center">Subiendo archivo...</p>}

                {adjuntosItemActual.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    {adjuntosItemActual.map(adj => (
                      <div key={adj.id} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-2 rounded text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <span className="material-symbols-outlined text-slate-400 text-sm">attach_file</span>
                          <span className="text-cyan-300 truncate">{adj.nombre}</span>
                        </div>
                        <button type="button" onClick={() => removeAdjuntoItemActual(adj.id)} className="text-slate-500 hover:text-rose-400">
                          <span className="material-symbols-outlined text-xs">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button 
              type="button"
              onClick={handleAgregarElemento}
              disabled={!elementoSeleccionado}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-lg py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              + Agregar Elemento al Acuerdo ({adjuntosItemActual.length} adjuntos)
            </button>
          </div>

        </div>

        {/* COLUMNA DER: RESUMEN / CARRITO */}
        <div className="w-full lg:w-[400px] bg-slate-900/80 border border-white/10 rounded-xl p-6 sticky top-24 shadow-2xl border-t-cyan-500/30">
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
            <span className="material-symbols-outlined text-cyan-400">receipt_long</span>
            <h3 className="font-semibold text-lg text-white">Resumen del Acuerdo</h3>
          </div>

          <div className="space-y-3 mb-6 min-h-[150px] max-h-[300px] overflow-y-auto pr-2">
            {elementosAcuerdo.length === 0 ? (
              <p className="text-slate-500 text-sm text-center italic mt-10">No hay elementos agregados.</p>
            ) : (
              elementosAcuerdo.map((item) => (
                <div key={item.idUnico} className="bg-slate-800/80 p-3 rounded border border-slate-700 relative group">
                  <div className="flex justify-between items-start mb-1 pr-6">
                    <span className="font-medium text-white text-sm">{item.nombre}</span>
                    <span className="text-cyan-400 font-semibold text-sm">${item.subtotal.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">
                    {item.canal} • {item.canal === 'InStore' ? `${item.tiendas.length} Tiendas` : 'Campaña única'}
                  </p>

                  {/* VISUALIZACIÓN DE ARCHIVOS ADJUNTOS DEL ITEM */}
                  {item.adjuntos && item.adjuntos.length > 0 && (
                    <div className="flex flex-wrap gap-1 border-t border-slate-700/50 pt-2 mt-1">
                      {item.adjuntos.map((adj: Adjunto, idx: number) => (
                        <a 
                          key={idx} 
                          href={adj.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="bg-slate-900 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 hover:border-cyan-400"
                        >
                          <span className="material-symbols-outlined text-[10px]">attachment</span>
                          {adj.categoria || 'Adjunto'} {idx + 1}
                        </a>
                      ))}
                    </div>
                  )}

                  <button 
                    type="button"
                    onClick={() => eliminarElemento(item.idUnico)}
                    className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="w-full h-px bg-white/10 mb-4"></div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Subtotal</span>
              <span className="text-white font-medium">${subtotalGlobal.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Descuento del Acuerdo (%)</span>
              <input 
                type="number" min="0" max="100" value={descuento} onChange={(e) => setDescuento(Number(e.target.value))}
                className="w-20 bg-slate-800 border border-slate-700 rounded p-1 text-white text-right focus:outline-none focus:border-cyan-400"
              />
            </div>

            {descuento > 0 && (
              <div className="flex justify-between items-center text-red-400">
                <span className="text-sm">Ahorro</span>
                <span className="font-medium">- ${montoDescuento.toLocaleString()}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-end mb-6 bg-slate-950 p-4 rounded-lg border border-cyan-500/20">
            <span className="text-white font-semibold text-sm">Total Final</span>
            <span className="text-2xl font-bold text-cyan-400 tracking-tight">
              ${totalFinal.toLocaleString()}
            </span>
          </div>

          <button 
            type="button"
            onClick={handleGuardarCotizacion}
            disabled={elementosAcuerdo.length === 0 || !clienteSeleccionado || guardando}
            className="w-full bg-cyan-500 text-slate-900 hover:bg-cyan-400 font-bold rounded-lg py-3 transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.3)] disabled:opacity-50 disabled:shadow-none cursor-pointer"
          >
            <span className="material-symbols-outlined">save</span>
            {guardando ? "Guardando..." : "Guardar Cotización"}
          </button>
        </div>

      </div>
    </div>
  );
}