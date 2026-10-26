"use client";

import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "../lib/supabase";
import SearchableSelect from "./SearchableSelect";
import { Deal, Adjunto, Usuario, Tienda } from "../lib/types";
import { generarAcuerdoPDF } from "../lib/generadorPdf";
import { obtenerMesesRango, formatearNombreMes } from "../lib/prorrateo";

interface FormularioAcuerdoProps {
  origen: 'CRM' | 'COTIZADOR';
  modo: 'CREATE' | 'EDIT';
  dealAEditar?: Deal | null;
  onCerrar: () => void;
  onGuardadoExitoso: () => void;
}

interface InflacionMesItem {
  mesClave: string;
  nombre: string;
  tasa: number;
}

export default function FormularioAcuerdo({ origen, modo, dealAEditar, onCerrar, onGuardadoExitoso }: FormularioAcuerdoProps) {
  const [clientes, setClientes] = useState<any[]>([]);
  const [catalogo, setCatalogo] = useState<any[]>([]);
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);

  // Estados Generales
  const [titulo, setTitulo] = useState("");
  const [vendedorSeleccionado, setVendedorSeleccionado] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [esAgencia, setEsAgencia] = useState(false);
  const [auspicianteSeleccionado, setAuspicianteSeleccionado] = useState("");
  const [esReclasificado, setEsReclasificado] = useState(false);
  const [elementosAcuerdo, setElementosAcuerdo] = useState<any[]>([]);

  // Descuento Global
  const [descuentoGlobalTipo, setDescuentoGlobalTipo] = useState<'%' | '$'>('%');
  const [descuentoGlobalValor, setDescuentoGlobalValor] = useState(0);

  // Inflación Mensual Compuesta
  const [inflacionGlobalPromedio, setInflacionGlobalPromedio] = useState<number>(0);
  const [multiplesValoresInflacion, setMultiplesValoresInflacion] = useState<boolean>(false);
  const [tasasPorMes, setTasasPorMes] = useState<Record<string, number>>({});

  // Control de Edición de Ítem Individual
  const [idItemEnEdicion, setIdItemEnEdicion] = useState<number | null>(null);

  // Estados del Ítem Individual
  const [canal, setCanal] = useState("Digital");
  const [elementoSeleccionado, setElementoSeleccionado] = useState("");
  const [itemFechaDesde, setItemFechaDesde] = useState("");
  const [itemFechaHasta, setItemFechaHasta] = useState("");
  const [tiendasSeleccionadas, setTiendasSeleccionadas] = useState<number[]>([]);
  const [busquedaTienda, setBusquedaTienda] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [sobreprecioTipo, setSobreprecioTipo] = useState<'%' | '$'>('%');
  const [sobreprecioValor, setSobreprecioValor] = useState(0);
  const [descuentoItemTipo, setDescuentoItemTipo] = useState<'%' | '$'>('%');
  const [descuentoItemValor, setDescuentoItemValor] = useState(0);

  // Archivos Adjuntos del Ítem Actual
  const [adjuntosItemActual, setAdjuntosItemActual] = useState<Adjunto[]>([]);

  // Procesos
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
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user?.email) {
      const { data } = await supabase.from('usuarios').select('*').eq('email', session.user.email).single();
      if (data) {
        setCurrentUser(data as Usuario);
        if (modo === 'CREATE') setVendedorSeleccionado(data.id.toString());
      }
    }

    const { data: dataClientes } = await supabase.from('clientes').select('*');
    if (dataClientes) setClientes(dataClientes);

    const { data: dataCatalogo } = await supabase.from('catalogo').select('*');
    if (dataCatalogo) setCatalogo(dataCatalogo);

    const { data: dataTiendas } = await supabase.from('tiendas').select('*').order('numero', { ascending: true });
    if (dataTiendas) setTiendas(dataTiendas as Tienda[]);

    const { data: dataUsuarios } = await supabase.from('usuarios').select('*');
    if (dataUsuarios) setUsuarios(dataUsuarios);
  };

  const cargarDatosEdicion = (deal: Deal) => {
    setTitulo(deal.titulo || "");
    setVendedorSeleccionado(deal.vendedor_id ? deal.vendedor_id.toString() : "");
    setClienteSeleccionado(deal.cliente_id ? deal.cliente_id.toString() : "");

    const clienteObj = clientes.find(c => c.id === deal.cliente_id);
    setEsAgencia(clienteObj?.es_agencia || false);
    setAuspicianteSeleccionado(deal.auspiciante_id ? deal.auspiciante_id.toString() : "");
    setEsReclasificado(deal.es_reclasificado || false);

    setDescuentoGlobalTipo(deal.descuento_global_tipo || '%');
    setDescuentoGlobalValor(deal.descuento_global_valor ?? (deal.descuento_porcentaje || 0));
    setInflacionGlobalPromedio(deal.tasa_inflacion || 0);

    const infGuardada = (deal as any).inflacion_mensual || [];
    if (Array.isArray(infGuardada) && infGuardada.length > 0) {
      const mapa: Record<string, number> = {};
      infGuardada.forEach((i: any) => { mapa[i.mesClave] = i.tasa; });
      setTasasPorMes(mapa);
      setMultiplesValoresInflacion(true);
    }

    if (deal.elementos_json && deal.elementos_json.length > 0) {
      const elementosNormalizados = deal.elementos_json.map((el: any) => ({
        ...el,
        fechaDesde: el.fechaDesde || deal.fecha_desde || new Date().toISOString().split('T')[0],
        fechaHasta: el.fechaHasta || deal.fecha_hasta || new Date().toISOString().split('T')[0]
      }));
      setElementosAcuerdo(elementosNormalizados);
    }
  };

  const handleSubirArchivo = async (
    e: React.ChangeEvent<HTMLInputElement>,
    categoria: Adjunto['categoria'],
    esMultiple: boolean = false
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setSubiendoArchivo(true);
    try {
      const nuevos: Adjunto[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filePath = `deals/${Date.now()}_${cleanName}`;

        const { error: uploadError } = await supabase.storage
          .from('adjuntos')
          .upload(filePath, file, { cacheControl: '3600', upsert: false });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('adjuntos')
          .getPublicUrl(filePath);

        nuevos.push({
          id: `${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
          nombre: file.name,
          url: publicUrl,
          tipo: file.type || 'application/octet-stream',
          tamaño: file.size,
          categoria
        });
      }

      if (esMultiple) {
        setAdjuntosItemActual(prev => [...prev, ...nuevos]);
      } else {
        setAdjuntosItemActual(prev => [
          ...prev.filter(a => a.categoria !== categoria),
          ...nuevos
        ]);
      }
    } catch (err: any) {
      console.error("Error al subir archivo:", err);
      alert(`Error al subir: ${err.message || err}`);
    } finally {
      setSubiendoArchivo(false);
      e.target.value = '';
    }
  };

  const handleEliminarAdjunto = (idAdjunto: string) => {
    setAdjuntosItemActual(prev => prev.filter(a => a.id !== idAdjunto));
  };

  const adjuntoDesktop = adjuntosItemActual.find(a => a.categoria === 'DISEÑO_DESKTOP' || (a.categoria as string) === 'DISE O_DESKTOP');
  const adjuntoMobile = adjuntosItemActual.find(a => a.categoria === 'DISEÑO_MOBILE' || (a.categoria as string) === 'DISE O_MOBILE');
  const adjuntoEAN = adjuntosItemActual.find(a => a.categoria === 'EAN');
  const adjuntosRenders = adjuntosItemActual.filter(a => a.categoria === 'RENDER');

  const obtenerListaElementosConsolidada = () => {
    let lista = [...elementosAcuerdo];
    if (idItemEnEdicion && elementoSeleccionado) {
      const itemCat = catalogo.find(c => c.id.toString() === elementoSeleccionado);
      if (itemCat && itemFechaDesde && itemFechaHasta) {
        const rawD1 = new Date(`${itemFechaDesde}T00:00:00`);
        const rawD2 = new Date(`${itemFechaHasta}T00:00:00`);
        const d1 = rawD1 <= rawD2 ? rawD1 : rawD2;
        const d2 = rawD1 <= rawD2 ? rawD2 : rawD1;
        const diffDays = Math.max(1, Math.ceil(Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)) + 1);

        const periodo = itemCat.periodo || 'Mensual';
        let multiplicadorTiempo = 1;
        if (periodo === 'Semanal') {
          multiplicadorTiempo = diffDays / 7;
        } else if (periodo === 'Mensual') {
          multiplicadorTiempo = diffDays / 30;
        }

        const cantTiendas = canal === 'InStore' ? (tiendasSeleccionadas.length || 1) : 1;
        const cantUnidades = canal === 'InStore' ? (cantidad || 1) : 1;

        const subtotalOriginal = itemCat.precio_base * multiplicadorTiempo * cantTiendas * cantUnidades;
        const montoSobreprecio = sobreprecioTipo === '%' ? subtotalOriginal * (sobreprecioValor / 100) : sobreprecioValor;
        const precioLista = subtotalOriginal + montoSobreprecio;
        const montoDescuento = descuentoItemTipo === '%' ? precioLista * (descuentoItemValor / 100) : descuentoItemValor;
        const subtotal = Math.max(0, precioLista - montoDescuento);

        const itemActualizado = {
          idUnico: idItemEnEdicion,
          catalogoId: itemCat.id,
          nombre: itemCat.elemento,
          canal,
          periodo,
          fechaDesde: itemFechaDesde <= itemFechaHasta ? itemFechaDesde : itemFechaHasta,
          fechaHasta: itemFechaDesde <= itemFechaHasta ? itemFechaHasta : itemFechaDesde,
          diasActivos: diffDays,
          tiendas: tiendasSeleccionadas,
          cantidad: cantUnidades,
          precioUnitarioCatalogo: itemCat.precio_base,
          sobreprecioTipo,
          sobreprecioValor,
          descuentoItemTipo,
          descuentoItemValor,
          precioLista,
          montoDescuentoItem: montoDescuento,
          subtotal,
          adjuntos: adjuntosItemActual
        };

        lista = lista.map(i => i.idUnico === idItemEnEdicion ? itemActualizado : i);
      }
    }
    return lista;
  };

  const listaMesesCampana = useMemo((): InflacionMesItem[] => {
    const listaActual = obtenerListaElementosConsolidada();
    const fechas = listaActual.flatMap(i => [i.fechaDesde, i.fechaHasta]).filter(Boolean);
    if (fechas.length === 0) return [];

    const fMin = fechas.reduce((min, cur) => cur < min ? cur : min);
    const fMax = fechas.reduce((max, cur) => cur > max ? cur : max);
    const claves = obtenerMesesRango(fMin, fMax);

    return claves.map((mesClave, idx) => ({
      mesClave,
      nombre: formatearNombreMes(mesClave),
      tasa: idx === 0 ? 0 : (tasasPorMes[mesClave] !== undefined ? tasasPorMes[mesClave] : inflacionGlobalPromedio)
    }));
  }, [elementosAcuerdo, idItemEnEdicion, itemFechaDesde, itemFechaHasta, elementoSeleccionado, tasasPorMes, inflacionGlobalPromedio]);

  const handleInflacionGlobalChange = (valor: number) => {
    setInflacionGlobalPromedio(valor);
    if (!multiplesValoresInflacion) {
      const nuevoMapa: Record<string, number> = {};
      listaMesesCampana.forEach((m, idx) => {
        nuevoMapa[m.mesClave] = idx === 0 ? 0 : valor;
      });
      setTasasPorMes(nuevoMapa);
    }
  };

  const handleTasaMesChange = (mesClave: string, valor: number) => {
    const nuevoMapa = { ...tasasPorMes, [mesClave]: valor };
    setTasasPorMes(nuevoMapa);

    const mesesConTasa = listaMesesCampana.filter((_, idx) => idx > 0);
    if (mesesConTasa.length > 0) {
      const suma = mesesConTasa.reduce((acc, m) => acc + (m.mesClave === mesClave ? valor : (nuevoMapa[m.mesClave] ?? inflacionGlobalPromedio)), 0);
      setInflacionGlobalPromedio(Math.round((suma / mesesConTasa.length) * 10) / 10);
    }
  };

  const handleCanalChange = (nuevoCanal: string) => {
    setCanal(nuevoCanal);
    setElementoSeleccionado("");
    setTiendasSeleccionadas([]);
    setAdjuntosItemActual([]);
    setCantidad(1);
    setSobreprecioValor(0);
    setDescuentoItemValor(0);
    setIdItemEnEdicion(null);
  };

  const limpiarFormularioItem = () => {
    setElementoSeleccionado("");
    setItemFechaDesde("");
    setItemFechaHasta("");
    setTiendasSeleccionadas([]);
    setAdjuntosItemActual([]);
    setCantidad(1);
    setSobreprecioValor(0);
    setDescuentoItemValor(0);
    setIdItemEnEdicion(null);
  };

  const handleEditarElemento = (item: any) => {
    setIdItemEnEdicion(item.idUnico);
    setCanal(item.canal || 'Digital');
    setElementoSeleccionado(item.catalogoId ? item.catalogoId.toString() : "");
    setItemFechaDesde(item.fechaDesde || "");
    setItemFechaHasta(item.fechaHasta || "");
    setCantidad(item.cantidad || 1);
    setTiendasSeleccionadas(item.tiendas || []);
    setSobreprecioTipo(item.sobreprecioTipo || '%');
    setSobreprecioValor(item.sobreprecioValor || 0);
    setDescuentoItemTipo(item.descuentoItemTipo || '%');
    setDescuentoItemValor(item.descuentoItemValor || 0);
    setAdjuntosItemActual(item.adjuntos || []);
  };

  const handleGuardarElemento = () => {
    if (!elementoSeleccionado) return;
    if (!itemFechaDesde || !itemFechaHasta) {
      alert("Debes establecer la Vigencia (Desde/Hasta) específica para este elemento.");
      return;
    }
    if (canal === 'InStore' && tiendasSeleccionadas.length === 0) {
      alert("Selecciona al menos una tienda para InStore.");
      return;
    }

    const itemCatalogo = catalogo.find(c => c.id.toString() === elementoSeleccionado);
    if (!itemCatalogo) return;

    const rawD1 = new Date(`${itemFechaDesde}T00:00:00`);
    const rawD2 = new Date(`${itemFechaHasta}T00:00:00`);
    const d1 = rawD1 <= rawD2 ? rawD1 : rawD2;
    const d2 = rawD1 <= rawD2 ? rawD2 : rawD1;
    const diffDays = Math.max(1, Math.ceil(Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)) + 1);

    const periodo = itemCatalogo.periodo || 'Mensual';
    let multiplicadorTiempo = 1;
    if (periodo === 'Semanal') {
      multiplicadorTiempo = diffDays / 7;
    } else if (periodo === 'Mensual') {
      multiplicadorTiempo = diffDays / 30;
    } else {
      multiplicadorTiempo = 1;
    }

    const multiplicadorTiendas = canal === 'InStore' ? tiendasSeleccionadas.length : 1;
    const multiplicadorCantidad = canal === 'InStore' ? cantidad : 1;
    const multiplicadorVolumen = multiplicadorTiendas * multiplicadorCantidad;

    const subtotalOriginal = itemCatalogo.precio_base * multiplicadorTiempo * multiplicadorVolumen;
    const montoSobreprecio = sobreprecioTipo === '%'
      ? subtotalOriginal * (sobreprecioValor / 100)
      : sobreprecioValor;

    const precioLista = subtotalOriginal + montoSobreprecio;
    const montoDescuento = descuentoItemTipo === '%'
      ? precioLista * (descuentoItemValor / 100)
      : descuentoItemValor;

    const subtotal = Math.max(0, precioLista - montoDescuento);

    const fFinalDesde = itemFechaDesde <= itemFechaHasta ? itemFechaDesde : itemFechaHasta;
    const fFinalHasta = itemFechaDesde <= itemFechaHasta ? itemFechaHasta : itemFechaDesde;

    const itemDatos = {
      idUnico: idItemEnEdicion || Date.now(),
      catalogoId: itemCatalogo.id,
      nombre: itemCatalogo.elemento,
      canal: canal,
      periodo: periodo,
      fechaDesde: fFinalDesde,
      fechaHasta: fFinalHasta,
      diasActivos: diffDays,
      tiendas: tiendasSeleccionadas,
      cantidad: multiplicadorCantidad,
      precioUnitarioCatalogo: itemCatalogo.precio_base,
      sobreprecioTipo,
      sobreprecioValor,
      descuentoItemTipo,
      descuentoItemValor,
      precioLista,
      montoDescuentoItem: montoDescuento,
      subtotal,
      adjuntos: adjuntosItemActual
    };

    if (idItemEnEdicion) {
      setElementosAcuerdo(elementosAcuerdo.map(i => i.idUnico === idItemEnEdicion ? itemDatos : i));
    } else {
      setElementosAcuerdo([...elementosAcuerdo, itemDatos]);
    }

    limpiarFormularioItem();
  };

  const eliminarElemento = (idUnico: number) => {
    setElementosAcuerdo(elementosAcuerdo.filter(item => item.idUnico !== idUnico));
    if (idItemEnEdicion === idUnico) limpiarFormularioItem();
  };

  const factoresCompuestosGlobales = useMemo(() => {
    const mapa: Record<string, number> = {};
    let factor = 1.0;
    listaMesesCampana.forEach((m, idx) => {
      if (idx === 0) {
        mapa[m.mesClave] = 1.0;
      } else {
        const tasa = tasasPorMes[m.mesClave] !== undefined ? tasasPorMes[m.mesClave] : inflacionGlobalPromedio;
        factor = factor * (1 + (tasa / 100));
        mapa[m.mesClave] = factor;
      }
    });
    return mapa;
  }, [listaMesesCampana, tasasPorMes, inflacionGlobalPromedio]);

  const listaConsolidada = useMemo(() => {
    return obtenerListaElementosConsolidada();
  }, [elementosAcuerdo, idItemEnEdicion, elementoSeleccionado, itemFechaDesde, itemFechaHasta, cantidad, tiendasSeleccionadas, sobreprecioTipo, sobreprecioValor, descuentoItemTipo, descuentoItemValor]);

  const totalConInflacion = useMemo(() => {
    if (listaConsolidada.length === 0) return 0;
    let suma = 0;
    listaConsolidada.forEach(item => {
      const periodo = item.periodo || 'Mensual';
      const fDesde = item.fechaDesde;
      const fHasta = item.fechaHasta;
      if (!fDesde || !fHasta) {
        suma += item.subtotal;
        return;
      }

      const rawD1 = new Date(`${fDesde}T00:00:00`);
      const rawD2 = new Date(`${fHasta}T00:00:00`);
      const inicio = rawD1 <= rawD2 ? rawD1 : rawD2;
      const fin = rawD1 <= rawD2 ? rawD2 : rawD1;

      if (periodo === 'Único' || periodo === 'unico' || periodo === 'Unico' || periodo === ' nico') {
        const mesInicio = `${inicio.getFullYear()}-${String(inicio.getMonth() + 1).padStart(2, '0')}`;
        const fact = factoresCompuestosGlobales[mesInicio] || 1.0;
        suma += item.subtotal * fact;
      } else {
        const dias = item.diasActivos || 1;
        const tarifaDiaria = item.subtotal / dias;
        const curr = new Date(inicio);
        while (curr <= fin) {
          const keyMes = `${curr.getFullYear()}-${String(curr.getMonth() + 1).padStart(2, '0')}`;
          const fact = factoresCompuestosGlobales[keyMes] || 1.0;
          suma += tarifaDiaria * fact;
          curr.setDate(curr.getDate() + 1);
        }
      }
    });
    return suma;
  }, [listaConsolidada, factoresCompuestosGlobales]);

  const subtotalPuroSinInflacion = listaConsolidada.reduce((acc, i) => acc + i.subtotal, 0);
  const montoImpactoInflacion = Math.max(0, totalConInflacion - subtotalPuroSinInflacion);

  const montoDescuentoGlobal = descuentoGlobalTipo === '%'
    ? totalConInflacion * (descuentoGlobalValor / 100)
    : descuentoGlobalValor;

  const totalFinal = Math.max(0, totalConInflacion - montoDescuentoGlobal);

  const armarObjetoDealPreliminar = (listaFinal: any[]) => {
    const clienteObj = clientes.find(c => c.id.toString() === clienteSeleccionado) || dealAEditar?.cliente;

    const todasFechasMillis = listaFinal.flatMap(i => [
      i.fechaDesde ? new Date(`${i.fechaDesde}T12:00:00Z`).getTime() : null,
      i.fechaHasta ? new Date(`${i.fechaHasta}T12:00:00Z`).getTime() : null
    ]).filter((t): t is number => t !== null && !isNaN(t));

    const fechaMinima = todasFechasMillis.length > 0
      ? new Date(Math.min(...todasFechasMillis)).toISOString().split('T')[0]
      : (dealAEditar?.fecha_desde || new Date().toISOString().split('T')[0]);

    const fechaMaxima = todasFechasMillis.length > 0
      ? new Date(Math.max(...todasFechasMillis)).toISOString().split('T')[0]
      : (dealAEditar?.fecha_hasta || new Date().toISOString().split('T')[0]);

    const elementosProcesados = listaFinal.map(item => {
      const peso = totalConInflacion > 0 ? (item.subtotal / totalConInflacion) : 0;
      const porcionDescuentoGlobal = montoDescuentoGlobal * peso;
      const precioFinalProrrateado = Math.max(0, item.subtotal - porcionDescuentoGlobal);
      return {
        ...item,
        porcionDescuentoGlobal,
        precioFinalProrrateado
      };
    });

    const arrayInflacionMensual = listaMesesCampana.map(m => ({
      mesClave: m.mesClave,
      nombre: m.nombre,
      tasa: m.tasa
    }));

    const dealPreliminar: Deal = {
      id: dealAEditar?.id || 0,
      titulo: titulo || dealAEditar?.titulo || "Propuesta Comercial",
      amount: Math.round(totalFinal),
      channel: listaFinal.some(i => i.canal === 'Digital') && listaFinal.some(i => i.canal === 'InStore') ? 'Omnicanal' : listaFinal[0].canal,
      cliente_id: Number(clienteSeleccionado) || dealAEditar?.cliente_id || 0,
      cliente: clienteObj,
      catalogo_id: Number(elementosProcesados[0].catalogoId),
      descuento_global_tipo: descuentoGlobalTipo,
      descuento_global_valor: descuentoGlobalValor,
      descuento_porcentaje: totalConInflacion > 0 ? Math.round((montoDescuentoGlobal / totalConInflacion) * 100) : 0,
      tasa_inflacion: inflacionGlobalPromedio,
      inflacion_mensual: arrayInflacionMensual,
      fecha_desde: fechaMinima,
      fecha_hasta: fechaMaxima,
      tiendas: tiendas,
      adjuntos: elementosProcesados.flatMap(i => i.adjuntos || []),
      elementos_json: elementosProcesados,
      es_reclasificado: esReclasificado,
      stage: dealAEditar?.stage || 'COTIZADO'
    };

    return { dealPreliminar, clienteObj };
  };

  const handleDescargarPdfPreliminar = async () => {
    const listaFinal = obtenerListaElementosConsolidada();
    if (listaFinal.length === 0) {
      alert("Agrega al menos un elemento para descargar el borrador en PDF.");
      return;
    }
    setGenerandoPdf(true);
    try {
      const { dealPreliminar } = armarObjetoDealPreliminar(listaFinal);
      await generarAcuerdoPDF(dealPreliminar);
    } catch (error: any) {
      console.error("Error al generar PDF:", error);
      alert(`Hubo un error al generar el PDF borrador: ${error?.message || error}`);
    } finally {
      setGenerandoPdf(false);
    }
  };

  const handleEnviarCorreo = async () => {
    const listaFinal = obtenerListaElementosConsolidada();
    if (listaFinal.length === 0) {
      alert("Agrega al menos un elemento para enviar la propuesta.");
      return;
    }

    const { dealPreliminar, clienteObj } = armarObjetoDealPreliminar(listaFinal);
    const emailSugerido = clienteObj?.contacto_email || dealAEditar?.cliente?.contacto_email || "";
    const emailDestino = window.prompt("Ingresa el correo del destinatario:", emailSugerido);
    if (!emailDestino || emailDestino.trim() === "") return;

    setEnviandoCorreo(true);
    try {
      const resultadoPdf = await generarAcuerdoPDF(dealPreliminar, true);
      if (!resultadoPdf) throw new Error("No se pudo generar el PDF para el envío.");

      const { pdfBase64, nombreArchivo } = resultadoPdf;
      const nombreVendedor = currentUser?.nombre || 'Equipo Comercial';
      const emailVendedor = currentUser?.email || 'ar_carrefourmedia@carrefour.com';
      const tituloAcuerdo = dealPreliminar.titulo || 'Propuesta Comercial';

      const res = await fetch('/api/enviar-acuerdo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinatario: emailDestino.trim(),
          asunto: `Propuesta de Servicios Carrefour Media - ${tituloAcuerdo}`,
          mensaje: `Hola ${clienteObj?.nombre || ''},\n\nAdjunto a este correo enviamos la propuesta de servicios para la campaña "${tituloAcuerdo}".\n\nQuedamos a disposición por cualquier consulta.\n\nSaludos cordiales,\n${nombreVendedor}\nEquipo de Carrefour Media.`,
          pdfBase64: pdfBase64,
          nombreArchivo: nombreArchivo,
          remitenteNombre: nombreVendedor,
          remitenteEmail: emailVendedor
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Error al enviar el correo.");
      }

      alert("¡Acuerdo enviado exitosamente por correo electrónico!");
    } catch (error: any) {
      console.error("Error al enviar acuerdo:", error);
      alert(`Hubo un error al enviar el correo: ${error?.message || error}`);
    } finally {
      setEnviandoCorreo(false);
    }
  };

  const handleSaveDeal = async () => {
    const listaFinal = obtenerListaElementosConsolidada();
    if (!titulo.trim() || !clienteSeleccionado || listaFinal.length === 0) {
      alert("Faltan datos obligatorios o elementos para guardar el acuerdo.");
      return;
    }

    setGuardando(true);
    try {
      const todasFechasMillis = listaFinal.flatMap(i => [
        i.fechaDesde ? new Date(`${i.fechaDesde}T12:00:00Z`).getTime() : null,
        i.fechaHasta ? new Date(`${i.fechaHasta}T12:00:00Z`).getTime() : null
      ]).filter((t): t is number => t !== null && !isNaN(t));

      const fechaMinima = todasFechasMillis.length > 0
        ? new Date(Math.min(...todasFechasMillis)).toISOString().split('T')[0]
        : (dealAEditar?.fecha_desde || new Date().toISOString().split('T')[0]);

      const fechaMaxima = todasFechasMillis.length > 0
        ? new Date(Math.max(...todasFechasMillis)).toISOString().split('T')[0]
        : (dealAEditar?.fecha_hasta || new Date().toISOString().split('T')[0]);

      const tieneDigital = listaFinal.some(i => i.canal === 'Digital');
      const tieneInStore = listaFinal.some(i => i.canal === 'InStore');
      const canalPrincipal = (tieneDigital && tieneInStore) ? 'Omnicanal' : (tieneDigital ? 'Digital' : 'InStore');

      const elementosProcesados = listaFinal.map(item => {
        const peso = totalConInflacion > 0 ? (item.subtotal / totalConInflacion) : 0;
        const porcionDescuentoGlobal = montoDescuentoGlobal * peso;
        const precioFinalProrrateado = Math.max(0, item.subtotal - porcionDescuentoGlobal);
        return {
          ...item,
          porcionDescuentoGlobal,
          precioFinalProrrateado
        };
      });

      const todosLosAdjuntos = elementosProcesados.flatMap(item =>
        (item.adjuntos || []).map((adj: Adjunto) => ({
          ...adj,
          catalogo_id: item.catalogoId,
          elemento_nombre: item.nombre
        }))
      );

      const arrayInflacionMensual = listaMesesCampana.map(m => ({
        mesClave: m.mesClave,
        nombre: m.nombre,
        tasa: m.tasa
      }));

      const stageToSave = modo === 'EDIT'
        ? (dealAEditar?.stage || 'OPORTUNIDAD')
        : (origen === 'CRM' ? 'OPORTUNIDAD' : 'COTIZADO');

      const dealData = {
        titulo: titulo,
        amount: Math.round(totalFinal),
        channel: canalPrincipal,
        cliente_id: Number(clienteSeleccionado),
        auspiciante_id: auspicianteSeleccionado ? Number(auspicianteSeleccionado) : null,
        catalogo_id: Number(elementosProcesados[0].catalogoId),
        descuento_global_tipo: descuentoGlobalTipo,
        descuento_global_valor: descuentoGlobalValor,
        descuento_porcentaje: totalConInflacion > 0 ? Math.round((montoDescuentoGlobal / totalConInflacion) * 100) : 0,
        tasa_inflacion: inflacionGlobalPromedio,
        inflacion_mensual: arrayInflacionMensual,
        fecha_desde: fechaMinima,
        fecha_hasta: fechaMaxima,
        adjuntos: todosLosAdjuntos,
        elementos_json: elementosProcesados,
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
      elementosProcesados.forEach(item => {
        if (item.tiendas) item.tiendas.forEach((tId: number) => tiendasUnicas.add(tId));
      });

      if (dealIdToUse && tiendasUnicas.size > 0) {
        const registrosTiendas = Array.from(tiendasUnicas).map(tId => ({
          deal_id: dealIdToUse,
          tienda_id: tId
        }));
        await supabase.from('deal_tiendas').insert(registrosTiendas);
      }

      onGuardadoExitoso();
    } catch (error: any) {
      console.error("Error al guardar acuerdo:", error);
      alert(`Error al guardar: ${error?.message || "Error al conectar con la base de datos"}`);
    } finally {
      setGuardando(false);
    }
  };

  const opcionesClientes = clientes.map(c => ({ id: c.id, label: c.nombre }));
  const opcionesCatalogo = catalogo.filter(c => c.canal === canal).map(c => ({
    id: c.id,
    label: `${c.elemento} ($${c.precio_base.toLocaleString()}) - ${c.periodo || 'Mensual'}`
  }));

  const FormularioContent = (
    <div className={`bg-slate-900 ${origen === 'CRM' ? 'border border-white/20 rounded-xl shadow-2xl w-full max-w-6xl relative max-h-[95vh]' : 'w-full h-full'} overflow-hidden flex flex-col`}>
      <div className="flex justify-between items-center p-6 border-b border-white/10 bg-slate-900/80">
        <h3 className="font-semibold text-xl text-white">{modo === 'CREATE' ? 'Nueva Cotización' : 'Editar Acuerdo'}</h3>
        {origen === 'CRM' && <button onClick={onCerrar} className="text-slate-400 hover:text-white"><span className="material-symbols-outlined">close</span></button>}
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 border-r border-white/10 space-y-6">
          {/* Bloque 1: Datos */}
          <div>
            <h4 className="text-cyan-400 font-semibold mb-4 border-b border-white/10 pb-2">1. Datos del Cliente</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Título del Acuerdo *</label>
                  <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400" />
                </div>
                {currentUser?.rol === 'JEFE_VENTAS' && (
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">Responsable / Vendedor</label>
                    <select value={vendedorSeleccionado} onChange={(e) => setVendedorSeleccionado(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400">
                      {usuarios.map(u => <option key={u.id} value={u.id}>{u.nombre}</option>)}
                    </select>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Cliente / Agencia *</label>
                  <SearchableSelect options={opcionesClientes} value={clienteSeleccionado} onChange={(id) => { setClienteSeleccionado(id); const c = clientes.find(x => x.id.toString() === id); setEsAgencia(c?.es_agencia || false); }} placeholder="Buscar..." />
                </div>
                {esAgencia && (
                  <div>
                    <label className="text-xs font-semibold text-cyan-400 block mb-1">Anunciante Final</label>
                    <SearchableSelect options={clientes.filter(c => !c.es_agencia).map(c => ({ id: c.id, label: c.nombre }))} value={auspicianteSeleccionado} onChange={setAuspicianteSeleccionado} placeholder="Marca..." />
                  </div>
                )}
              </div>

              {/* OPCIÓN DE RECLASIFICACIÓN */}
              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer group w-fit p-2.5 bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 rounded-xl transition-all">
                  <input
                    type="checkbox"
                    checked={esReclasificado}
                    onChange={(e) => setEsReclasificado(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-amber-500 cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition-colors block">
                      Marcar este acuerdo como Reclasificación
                    </span>
                    <p className="text-[10px] text-slate-500">
                      Excluye el monto de facturación regular y lo etiqueta en CRM y Dashboard.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Bloque 2: Configuración de Espacios */}
          <div>
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
              <h4 className="text-cyan-400 font-semibold">2. Configurar Espacios y Precios</h4>
              {idItemEnEdicion && (
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded animate-pulse">
                  Modificando elemento en edición
                </span>
              )}
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-700 space-y-4">
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                  <input type="radio" checked={canal === 'Digital'} onChange={() => handleCanalChange('Digital')} className="text-cyan-500 bg-slate-900 border-slate-700" /> Digital
                </label>
                <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                  <input type="radio" checked={canal === 'InStore'} onChange={() => handleCanalChange('InStore')} className="text-amber-500 bg-slate-900 border-slate-700" /> InStore
                </label>
              </div>

              <SearchableSelect options={opcionesCatalogo} value={elementoSeleccionado} onChange={setElementoSeleccionado} placeholder={`Buscar espacio ${canal}...`} />

              {elementoSeleccionado && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Desde *</label>
                      <input type="date" value={itemFechaDesde} onChange={(e) => setItemFechaDesde(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Hasta *</label>
                      <input type="date" value={itemFechaHasta} onChange={(e) => setItemFechaHasta(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400" />
                    </div>
                  </div>

                  {canal === 'InStore' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-400 block mb-1">Cant. por Tienda</label>
                        <input type="number" min="1" value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm focus:border-amber-400" />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 p-3 bg-slate-900 border border-slate-700 rounded-lg">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Sobreprecio Base (Oculto)</label>
                      <div className="flex">
                        <select value={sobreprecioTipo} onChange={(e) => setSobreprecioTipo(e.target.value as '%' | '$')} className="bg-slate-800 border border-slate-700 rounded-l p-2 text-white text-sm focus:outline-none">
                          <option value="%">%</option>
                          <option value="$">$</option>
                        </select>
                        <input type="number" value={sobreprecioValor} onChange={(e) => setSobreprecioValor(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-700 border-l-0 rounded-r p-2 text-white text-sm focus:border-cyan-400" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Descuento al Ítem</label>
                      <div className="flex">
                        <select value={descuentoItemTipo} onChange={(e) => setDescuentoItemTipo(e.target.value as '%' | '$')} className="bg-slate-800 border border-slate-700 rounded-l p-2 text-white text-sm focus:outline-none">
                          <option value="%">%</option>
                          <option value="$">$</option>
                        </select>
                        <input type="number" value={descuentoItemValor} onChange={(e) => setDescuentoItemValor(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-700 border-l-0 rounded-r p-2 text-white text-sm focus:border-cyan-400" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {canal === 'InStore' && elementoSeleccionado && (
                <div className="p-3 bg-slate-800/50 rounded border border-slate-700 mt-2">
                  <input type="text" value={busquedaTienda} onChange={(e) => setBusquedaTienda(e.target.value)} placeholder="Buscar tienda InStore..." className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white mb-2" />
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {tiendas.filter(t => t.nombre.toLowerCase().includes(busquedaTienda.toLowerCase())).map((t) => (
                      <label key={t.id} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                        <input type="checkbox" checked={tiendasSeleccionadas.includes(t.id)} onChange={() => setTiendasSeleccionadas(prev => prev.includes(t.id) ? prev.filter(x => x !== t.id) : [...prev, t.id])} className="rounded bg-slate-900" />
                        <span className="font-mono text-amber-400">{t.numero}</span> {t.nombre}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* SECCIÓN ADJUNTOS DIGITAL */}
              {canal === 'Digital' && elementoSeleccionado && (
                <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg space-y-3 mt-3">
                  <label className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">attachment</span>
                    Archivos de Campaña Digital (Opcionales)
                  </label>
                  <div className="space-y-2">
                    {/* 1. Pieza Desktop */}
                    <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className="material-symbols-outlined text-cyan-400 text-base">desktop_windows</span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-200">Pieza Desktop</p>
                          {adjuntoDesktop ? (
                            <p className="text-[10px] text-slate-400 truncate font-mono">{adjuntoDesktop.nombre}</p>
                          ) : (
                            <p className="text-[10px] text-slate-500 italic">No adjuntada</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {adjuntoDesktop && (
                          <>
                            <a href={adjuntoDesktop.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 p-1" title="Ver archivo">
                              <span className="material-symbols-outlined text-sm">visibility</span>
                            </a>
                            <button type="button" onClick={() => handleEliminarAdjunto(adjuntoDesktop.id)} className="text-slate-400 hover:text-rose-400 p-1" title="Quitar">
                              <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                          </>
                        )}
                        <label className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded text-xs cursor-pointer border border-slate-700 transition-colors">
                          <span>{adjuntoDesktop ? "Reemplazar" : "Subir"}</span>
                          <input type="file" accept="image/*" disabled={subiendoArchivo} onChange={(e) => handleSubirArchivo(e, (adjuntoDesktop?.categoria || 'DISE O_DESKTOP') as any)} className="hidden" />
                        </label>
                      </div>
                    </div>

                    {/* 2. Pieza Mobile */}
                    <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className="material-symbols-outlined text-cyan-400 text-base">smartphone</span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-200">Pieza Mobile</p>
                          {adjuntoMobile ? (
                            <p className="text-[10px] text-slate-400 truncate font-mono">{adjuntoMobile.nombre}</p>
                          ) : (
                            <p className="text-[10px] text-slate-500 italic">No adjuntada</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {adjuntoMobile && (
                          <>
                            <a href={adjuntoMobile.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 p-1" title="Ver archivo">
                              <span className="material-symbols-outlined text-sm">visibility</span>
                            </a>
                            <button type="button" onClick={() => handleEliminarAdjunto(adjuntoMobile.id)} className="text-slate-400 hover:text-rose-400 p-1" title="Quitar">
                              <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                          </>
                        )}
                        <label className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded text-xs cursor-pointer border border-slate-700 transition-colors">
                          <span>{adjuntoMobile ? "Reemplazar" : "Subir"}</span>
                          <input type="file" accept="image/*" disabled={subiendoArchivo} onChange={(e) => handleSubirArchivo(e, (adjuntoMobile?.categoria || 'DISE O_MOBILE') as any)} className="hidden" />
                        </label>
                      </div>
                    </div>

                    {/* 3. Lista de EANs */}
                    <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className="material-symbols-outlined text-emerald-400 text-base">barcode_scanner</span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-200">Lista de EANs (Productos)</p>
                          {adjuntoEAN ? (
                            <p className="text-[10px] text-slate-400 truncate font-mono">{adjuntoEAN.nombre}</p>
                          ) : (
                            <p className="text-[10px] text-slate-500 italic">No adjuntada</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {adjuntoEAN && (
                          <>
                            <a href={adjuntoEAN.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 p-1" title="Ver archivo">
                              <span className="material-symbols-outlined text-sm">visibility</span>
                            </a>
                            <button type="button" onClick={() => handleEliminarAdjunto(adjuntoEAN.id)} className="text-slate-400 hover:text-rose-400 p-1" title="Quitar">
                              <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                          </>
                        )}
                        <label className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded text-xs cursor-pointer border border-slate-700 transition-colors">
                          <span>{adjuntoEAN ? "Reemplazar" : "Subir"}</span>
                          <input type="file" accept=".xlsx,.xls,.csv,.pdf,image/*" disabled={subiendoArchivo} onChange={(e) => handleSubirArchivo(e, 'EAN')} className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECCIÓN ADJUNTOS INSTORE */}
              {canal === 'InStore' && elementoSeleccionado && (
                <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg space-y-3 mt-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">view_in_ar</span>
                      Renders de Instalación (Opcionales - Múltiples)
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">{adjuntosRenders.length} render(s)</span>
                  </div>
                  <label className="flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 border border-dashed border-slate-600 hover:border-amber-400 p-2.5 rounded-lg cursor-pointer transition-all text-xs text-slate-300">
                    <span className="material-symbols-outlined text-base text-amber-400">add_photo_alternate</span>
                    <span>{subiendoArchivo ? "Subiendo render..." : "Seleccionar una o más imágenes de renders"}</span>
                    <input type="file" multiple accept="image/*" disabled={subiendoArchivo} onChange={(e) => handleSubirArchivo(e, 'RENDER', true)} className="hidden" />
                  </label>

                  {adjuntosRenders.length > 0 && (
                    <div className="space-y-1.5 pt-1 max-h-36 overflow-y-auto">
                      {adjuntosRenders.map((adj) => (
                        <div key={adj.id} className="flex items-center justify-between p-2 bg-slate-950/70 border border-slate-800 rounded text-xs">
                          <div className="flex items-center gap-2 truncate pr-2">
                            <span className="material-symbols-outlined text-xs text-amber-400">image</span>
                            <span className="text-slate-200 truncate font-mono text-[11px]">{adj.nombre}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <a href={adj.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 p-1" title="Ver render">
                              <span className="material-symbols-outlined text-xs">visibility</span>
                            </a>
                            <button type="button" onClick={() => handleEliminarAdjunto(adj.id)} className="text-slate-400 hover:text-rose-400 p-1" title="Quitar">
                              <span className="material-symbols-outlined text-xs">close</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2 mt-4">
                {idItemEnEdicion && (
                  <button type="button" onClick={limpiarFormularioItem} className="px-4 bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 rounded py-2 text-sm font-semibold">
                    Cancelar
                  </button>
                )}
                <button type="button" onClick={handleGuardarElemento} disabled={!elementoSeleccionado} className="flex-1 bg-cyan-600/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-600/40 rounded py-2 text-sm font-bold disabled:opacity-40">
                  {idItemEnEdicion ? "✓ Actualizar Elemento" : "+ Agregar Elemento a la Cotización"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen Derecho */}
        <div className="w-full lg:w-[400px] bg-slate-950 p-6 flex flex-col justify-between border-l border-white/10 overflow-y-auto">
          <div>
            <h3 className="font-semibold text-white mb-4 border-b border-white/10 pb-2">Resumen Cotización</h3>

            <div className="max-h-48 overflow-y-auto space-y-2 mb-4">
              {listaConsolidada.map((item) => (
                <div key={item.idUnico} className={`p-3 rounded border text-sm relative group transition-colors ${idItemEnEdicion === item.idUnico ? 'bg-amber-950/30 border-amber-500/50' : 'bg-slate-800 border-slate-700'}`}>
                  <div className="flex justify-between items-start pr-12">
                    <span className="font-bold text-white text-xs leading-tight">{item.nombre}</span>
                    <span className="text-cyan-400 font-bold text-xs">${item.subtotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">{item.fechaDesde} al {item.fechaHasta} ({item.periodo})</p>

                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <button type="button" onClick={() => handleEditarElemento(item)} title="Editar este elemento" className="p-1 text-slate-400 hover:text-cyan-400 transition-colors">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button type="button" onClick={() => eliminarElemento(item.idUnico)} title="Eliminar elemento" className="p-1 text-slate-400 hover:text-rose-400 transition-colors">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {listaMesesCampana.length > 0 && (
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 mb-4 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-amber-400 uppercase">Inflación Compuesta</label>
                  <span className="text-[10px] text-slate-400 font-mono">{listaMesesCampana.length} meses</span>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-slate-300">Promedio Mensual (%):</span>
                    <input
                      type="number"
                      step="0.1"
                      value={inflacionGlobalPromedio}
                      onChange={(e) => handleInflacionGlobalChange(Number(e.target.value))}
                      className="w-20 bg-slate-950 border border-slate-700 rounded p-1 text-right text-xs text-white focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={multiplesValoresInflacion}
                      onChange={(e) => setMultiplesValoresInflacion(e.target.checked)}
                      className="rounded border-slate-600 bg-slate-950 text-amber-500"
                    />
                    <span>Ingresar múltiples valores de inflación</span>
                  </label>
                </div>

                {multiplesValoresInflacion && (
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    {listaMesesCampana.map((mes, idx) => (
                      <div key={mes.mesClave} className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">
                          {mes.nombre} {idx === 0 ? '(Mes Base)' : ''}:
                        </span>
                        {idx === 0 ? (
                          <span className="text-slate-500 font-mono font-bold">0% (Base)</span>
                        ) : (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              step="0.1"
                              value={tasasPorMes[mes.mesClave] !== undefined ? tasasPorMes[mes.mesClave] : inflacionGlobalPromedio}
                              onChange={(e) => handleTasaMesChange(mes.mesClave, Number(e.target.value))}
                              className="w-16 bg-slate-950 border border-slate-700 rounded p-1 text-right text-xs text-amber-300 focus:border-amber-400 font-mono"
                            />
                            <span className="text-slate-500 text-[10px]">%</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-3 pt-3 border-t border-white/10">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Subtotal Espacios:</span>
              <span className="text-white font-mono">${subtotalPuroSinInflacion.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>

            {montoImpactoInflacion > 0 && (
              <div className="flex justify-between items-center text-xs text-amber-400">
                <span>Impacto Inflación Acumulada:</span>
                <span className="font-mono">+${montoImpactoInflacion.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            )}

            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-700">
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Descuento Global</label>
              <div className="flex">
                <select value={descuentoGlobalTipo} onChange={(e) => setDescuentoGlobalTipo(e.target.value as '%' | '$')} className="bg-slate-800 border border-slate-700 rounded-l p-1.5 text-white text-xs focus:outline-none">
                  <option value="%">%</option>
                  <option value="$">$</option>
                </select>
                <input type="number" value={descuentoGlobalValor} onChange={(e) => setDescuentoGlobalValor(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-700 border-l-0 rounded-r p-1.5 text-white text-xs focus:border-cyan-400 text-right font-mono" />
              </div>
            </div>

            <div className="flex justify-between items-end bg-cyan-950/30 p-3 rounded-xl border border-cyan-500/50 shadow-lg">
              <span className="text-white font-semibold text-sm">Total Final</span>
              <span className="text-2xl font-extrabold text-cyan-400">${totalFinal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>

            {/* BOTÓN DESCARGA PRELIMINAR */}
            <button
              type="button"
              disabled={generandoPdf || listaConsolidada.length === 0}
              onClick={handleDescargarPdfPreliminar}
              className="w-full bg-slate-800 border border-cyan-500/40 text-cyan-400 hover:bg-slate-700 font-bold rounded-lg py-2.5 text-sm flex items-center justify-center gap-2 mt-2 transition-colors disabled:opacity-40 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">{generandoPdf ? 'hourglass_empty' : 'picture_as_pdf'}</span>
              {generandoPdf ? 'Generando borrador...' : 'Descargar Contrato PDF (Vista Previa)'}
            </button>

            {/* BOTÓN ENVÍO AUTOMÁTICO POR CORREO */}
            <button
              type="button"
              disabled={enviandoCorreo || generandoPdf || listaConsolidada.length === 0}
              onClick={handleEnviarCorreo}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg py-2.5 text-sm flex items-center justify-center gap-2 mt-1 transition-colors disabled:opacity-40 shadow-[0_0_15px_rgba(99,102,241,0.2)] cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">{enviandoCorreo ? 'hourglass_empty' : 'send'}</span>
              {enviandoCorreo ? 'Enviando acuerdo...' : 'Enviar Acuerdo por Correo'}
            </button>

            <button
              type="button"
              onClick={handleSaveDeal}
              disabled={guardando}
              className="w-full bg-cyan-500 text-slate-900 hover:bg-cyan-400 font-bold rounded-lg py-3 text-sm mt-1 transition-colors disabled:opacity-40 cursor-pointer"
            >
              {guardando ? "Guardando..." : "Guardar Cotización"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (origen === 'CRM') return <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onCerrar}></div>{FormularioContent}</div>;
  return FormularioContent;
}
