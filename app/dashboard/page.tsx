"use client";

import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "../../lib/supabase";
import { Deal, Tienda, Usuario, Adjunto } from "../../lib/types";
import MultiSelect, { MultiSelectOption } from "../../components/MultiSelect";
import * as XLSX from 'xlsx';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);
  const [activeTab, setActiveTab] = useState<'general' | 'operaciones' | 'gestion'>('general');

  const [deals, setDeals] = useState<any[]>([]);
  const [tiendas, setTiendas] = useState<Tienda[]>([]);
  const [dealTiendas, setDealTiendas] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // ==========================================
  // FILTROS GLOBALES (TRANSVERSALES)
  // ==========================================
  const [filtroTemporal, setFiltroTemporal] = useState<'HISTORICO' | 'ESTE_MES' | 'MES_ANTERIOR' | 'ESTE_ANIO' | 'PERSONALIZADO'>('HISTORICO');
  const [fechaDesdeFiltro, setFechaDesdeFiltro] = useState<string>("");
  const [fechaHastaFiltro, setFechaHastaFiltro] = useState<string>("");
  const [canalesSeleccionadosGlobal, setCanalesSeleccionadosGlobal] = useState<(string | number)[]>([]);
  const [filtroRegimenGlobal, setFiltroRegimenGlobal] = useState<string>("REGULARES"); // 'REGULARES' | 'RECLASIFICADOS' | 'TODOS'

  // ==========================================
  // FILTROS PESTAÑA 1 (VISIÓN GENERAL & VENTAS)
  // ==========================================
  const [clientesSeleccionadosP1, setClientesSeleccionadosP1] = useState<(string | number)[]>([]);
  const [vendedoresSeleccionadosP1, setVendedoresSeleccionadosP1] = useState<(string | number)[]>([]);
  const [filtroTipoCuentaP1, setFiltroTipoCuentaP1] = useState<string>("TODAS"); // 'TODAS' | 'DIRECTO' | 'AGENCIA'
  const [filtroMontoMinimoP1, setFiltroMontoMinimoP1] = useState<number>(0);

  // ==========================================
  // FILTROS PESTAÑA 2 (OPERACIONES & TIENDAS)
  // ==========================================
  const [busquedaTienda, setBusquedaTienda] = useState("");
  const [tiendasSeleccionadasP2, setTiendasSeleccionadasP2] = useState<(string | number)[]>([]);
  const [formatosSeleccionadosP2, setFormatosSeleccionadosP2] = useState<(string | number)[]>([]);
  const [filtroVigenciaOperativa, setFiltroVigenciaOperativa] = useState<string>("TODAS"); // 'TODAS' | 'VIGENTES_HOY' | 'PROXIMAS' | 'FINALIZADAS'

  // ==========================================
  // FILTROS PESTAÑA 3 (GESTIÓN COMERCIAL)
  // ==========================================
  const [vendedoresSeleccionadosP3, setVendedoresSeleccionadosP3] = useState<(string | number)[]>([]);
  const [etapasSeleccionadasP3, setEtapasSeleccionadasP3] = useState<(string | number)[]>([]);
  const [umbralAgingDias, setUmbralAgingDias] = useState<number>(20);

  // Modal para ver imagen o render ampliado
  const [imagenModal, setImagenModal] = useState<{ url: string; titulo: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const [
        { data: dataUsuarios },
        { data: dataDeals },
        { data: dataTiendas },
        { data: dataDealTiendas }
      ] = await Promise.all([
        supabase.from('usuarios').select('*'),
        supabase.from('deals').select(`
          *,
          cliente:clientes!cliente_id(*),
          vendedor:usuarios!vendedor_id(*)
        `).order('created_at', { ascending: false }),
        supabase.from('tiendas').select('*').order('numero', { ascending: true }),
        supabase.from('deal_tiendas').select('*')
      ]);

      const listaUsuarios = (dataUsuarios as Usuario[]) || [];
      setUsuarios(listaUsuarios);

      if (user?.email && listaUsuarios.length > 0) {
        const emailNorm = user.email.trim().toLowerCase();
        const found = listaUsuarios.find(u => u.email?.trim().toLowerCase() === emailNorm);
        if (found) setCurrentUser(found);
      }

      if (dataDeals) setDeals(dataDeals);
      if (dataTiendas) setTiendas(dataTiendas as Tienda[]);
      if (dataDealTiendas) setDealTiendas(dataDealTiendas);

    } catch (err) {
      console.error("Error cargando datos de dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const esGestion = useMemo(() => {
    const rol = (currentUser?.rol || '').toUpperCase().trim();
    return ['JEFE_VENTAS', 'JEFE DE VENTAS', 'ADMIN', 'ADMINISTRADOR', 'GERENTE', 'DIRECTOR'].includes(rol);
  }, [currentUser]);

  useEffect(() => {
    if (!loading && !esGestion && activeTab === 'gestion') {
      setActiveTab('general');
    }
  }, [esGestion, activeTab, loading]);

  // ==========================================
  // LISTAS DE OPCIONES PARA LOS MULTISELECTS
  // ==========================================
  const opcionesCanales: MultiSelectOption[] = [
    { id: 'Digital', label: 'Digital' },
    { id: 'InStore', label: 'InStore' },
    { id: 'Omnicanal', label: 'Omnicanal' }
  ];

  const opcionesClientes: MultiSelectOption[] = useMemo(() => {
    const mapa = new Map<string, string>();
    deals.forEach(d => {
      if (d.cliente_id && d.cliente?.nombre) {
        mapa.set(d.cliente_id.toString(), d.cliente.nombre);
      }
    });
    return Array.from(mapa.entries())
      .map(([id, label]) => ({ id, label }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [deals]);

  const opcionesVendedores: MultiSelectOption[] = useMemo(() => {
    return usuarios.map(u => ({
      id: u.id,
      label: u.nombre,
      sublabel: u.rol || 'Ventas'
    }));
  }, [usuarios]);

  const opcionesTiendas: MultiSelectOption[] = useMemo(() => {
    return tiendas.map(t => ({
      id: t.id,
      label: `N° ${t.numero} - ${t.nombre}`,
      sublabel: t.formato || 'Hipermercado'
    }));
  }, [tiendas]);

  const opcionesFormatosTienda: MultiSelectOption[] = [
    { id: 'Hipermercado', label: 'Hipermercado' },
    { id: 'Market', label: 'Market' },
    { id: 'Express', label: 'Express' },
    { id: 'Maxi', label: 'Maxi' }
  ];

  const opcionesEtapasPipeline: MultiSelectOption[] = [
    { id: 'COTIZADO', label: 'Cotizado' },
    { id: 'OPORTUNIDAD', label: 'Oportunidad' },
    { id: 'POR_FACTURAR', label: 'Por Facturar' },
    { id: 'FACTURADO', label: 'Facturado' },
    { id: 'PERDIDO', label: 'Perdido' }
  ];

  // ==========================================
  // LÓGICA DE FILTRADO TEMPORAL
  // ==========================================
  const calcularLimitesTemporales = useMemo(() => {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = hoy.getMonth();

    if (filtroTemporal === 'ESTE_MES') {
      const d1 = new Date(anio, mes, 1).toISOString().split('T')[0];
      const d2 = new Date(anio, mes + 1, 0).toISOString().split('T')[0];
      return { desde: d1, hasta: d2 };
    }
    if (filtroTemporal === 'MES_ANTERIOR') {
      const d1 = new Date(anio, mes - 1, 1).toISOString().split('T')[0];
      const d2 = new Date(anio, mes, 0).toISOString().split('T')[0];
      return { desde: d1, hasta: d2 };
    }
    if (filtroTemporal === 'ESTE_ANIO') {
      const d1 = `${anio}-01-01`;
      const d2 = `${anio}-12-31`;
      return { desde: d1, hasta: d2 };
    }
    if (filtroTemporal === 'PERSONALIZADO') {
      return { desde: fechaDesdeFiltro, hasta: fechaHastaFiltro };
    }
    return { desde: '', hasta: '' };
  }, [filtroTemporal, fechaDesdeFiltro, fechaHastaFiltro]);

  // FILTRADO GLOBAL
  const dealsFiltradosGlobal = useMemo(() => {
    return deals.filter(deal => {
      if (deal.stage === 'PERDIDO') return false;

      // Régimen contable
      if (filtroRegimenGlobal === 'REGULARES' && deal.es_reclasificado) return false;
      if (filtroRegimenGlobal === 'RECLASIFICADOS' && !deal.es_reclasificado) return false;

      // Selección múltiple de canales
      if (canalesSeleccionadosGlobal.length > 0) {
        const canal = deal.channel || 'Digital';
        if (!canalesSeleccionadosGlobal.some(c => c.toString() === canal)) return false;
      }

      // Rango temporal
      const { desde, hasta } = calcularLimitesTemporales;
      if (desde && deal.fecha_hasta && deal.fecha_hasta < desde) return false;
      if (hasta && deal.fecha_desde && deal.fecha_desde > hasta) return false;

      return true;
    });
  }, [deals, filtroRegimenGlobal, canalesSeleccionadosGlobal, calcularLimitesTemporales]);

  // =========================================================================
  // CÁLCULOS PESTAÑA 1: VISIÓN GENERAL & VENTAS
  // =========================================================================
  const dealsPestaña1 = useMemo(() => {
    return dealsFiltradosGlobal.filter(deal => {
      // MultiSelect Clientes / Empresas
      if (clientesSeleccionadosP1.length > 0) {
        const cId = deal.cliente_id?.toString() || "";
        if (!clientesSeleccionadosP1.some(c => c.toString() === cId)) return false;
      }

      // MultiSelect Vendedores
      if (vendedoresSeleccionadosP1.length > 0) {
        const vId = deal.vendedor_id?.toString() || "";
        if (!vendedoresSeleccionadosP1.some(v => v.toString() === vId)) return false;
      }

      // Tipo de Cuenta (Directo vs Agencia)
      const esAgencia = deal.cliente?.es_agencia;
      if (filtroTipoCuentaP1 === 'DIRECTO' && esAgencia) return false;
      if (filtroTipoCuentaP1 === 'AGENCIA' && !esAgencia) return false;

      // Monto Mínimo (Ticket Size)
      if (filtroMontoMinimoP1 > 0 && Number(deal.amount || 0) < filtroMontoMinimoP1) return false;

      return true;
    });
  }, [dealsFiltradosGlobal, clientesSeleccionadosP1, vendedoresSeleccionadosP1, filtroTipoCuentaP1, filtroMontoMinimoP1]);

  const kpisGlobales = useMemo(() => {
    const totalContratado = dealsPestaña1.reduce((acc, d) => acc + Number(d.amount || 0), 0);
    const totalFacturado = dealsPestaña1.reduce((acc, d) => acc + Number(d.monto_facturado || (d.stage === 'FACTURADO' ? d.amount : 0)), 0);
    const totalDeuda = Math.max(0, totalContratado - totalFacturado);
    const totalReclasificados = deals.filter(d => d.es_reclasificado && d.stage !== 'PERDIDO').reduce((acc, d) => acc + Number(d.amount || 0), 0);
    const totalDealsActivos = dealsPestaña1.filter(d => d.stage !== 'FACTURADO').length;

    return {
      totalContratado,
      totalFacturado,
      totalDeuda,
      totalReclasificados,
      totalDealsActivos,
      cantidadTotalDeals: dealsPestaña1.length
    };
  }, [dealsPestaña1, deals]);

  const topEmpresas = useMemo(() => {
    const mapa: Record<string, { clienteId: number; nombre: string; totalContratado: number; totalFacturado: number; saldo: number; cantidad: number }> = {};

    dealsPestaña1.forEach(d => {
      const clienteNombre = d.cliente?.nombre || 'Sin Cliente Asignado';
      const cId = d.cliente_id || 0;
      if (!mapa[clienteNombre]) {
        mapa[clienteNombre] = {
          clienteId: cId,
          nombre: clienteNombre,
          totalContratado: 0,
          totalFacturado: 0,
          saldo: 0,
          cantidad: 0
        };
      }

      const fact = Number(d.monto_facturado || (d.stage === 'FACTURADO' ? d.amount : 0));
      mapa[clienteNombre].totalContratado += Number(d.amount || 0);
      mapa[clienteNombre].totalFacturado += fact;
      mapa[clienteNombre].saldo += Math.max(0, Number(d.amount || 0) - fact);
      mapa[clienteNombre].cantidad += 1;
    });

    return Object.values(mapa).sort((a, b) => b.totalContratado - a.totalContratado);
  }, [dealsPestaña1]);

  const ingresosPorCanal = useMemo(() => {
    const mapa: Record<string, { canal: string; total: number; cantidad: number }> = {
      'Digital': { canal: 'Digital', total: 0, cantidad: 0 },
      'InStore': { canal: 'InStore', total: 0, cantidad: 0 },
      'Omnicanal': { canal: 'Omnicanal', total: 0, cantidad: 0 }
    };

    dealsPestaña1.forEach(d => {
      const canal = d.channel || 'Digital';
      if (!mapa[canal]) {
        mapa[canal] = { canal, total: 0, cantidad: 0 };
      }
      mapa[canal].total += Number(d.amount || 0);
      mapa[canal].cantidad += 1;
    });

    return Object.values(mapa);
  }, [dealsPestaña1]);

  const metricasPorTienda = useMemo(() => {
    const conteoDealsTienda: Record<number, { cantidadDeals: number; montoAsignado: number; dealsNombres: Set<string> }> = {};

    dealsPestaña1.forEach(deal => {
      const dealAmount = Number(deal.amount || 0);
      const items = deal.elementos_json || [];
      const dealTiendasIds = new Set<number>();

      items.forEach((item: any) => {
        if (Array.isArray(item.tiendas)) {
          item.tiendas.forEach((tId: number) => dealTiendasIds.add(tId));
        }
      });

      dealTiendas.filter(dt => dt.deal_id === deal.id).forEach(dt => dealTiendasIds.add(dt.tienda_id));

      const cantTiendas = dealTiendasIds.size || 1;
      const cuotaPorTienda = (deal.channel === 'InStore' || deal.channel === 'Omnicanal') ? (dealAmount / cantTiendas) : 0;

      dealTiendasIds.forEach(tId => {
        if (!conteoDealsTienda[tId]) {
          conteoDealsTienda[tId] = { cantidadDeals: 0, montoAsignado: 0, dealsNombres: new Set() };
        }
        conteoDealsTienda[tId].cantidadDeals += 1;
        conteoDealsTienda[tId].montoAsignado += cuotaPorTienda;
        conteoDealsTienda[tId].dealsNombres.add(deal.titulo || 'Campaña');
      });
    });

    return tiendas.map(t => ({
      ...t,
      cantidadDeals: conteoDealsTienda[t.id]?.cantidadDeals || 0,
      montoAsignado: conteoDealsTienda[t.id]?.montoAsignado || 0,
      campañas: Array.from(conteoDealsTienda[t.id]?.dealsNombres || [])
    })).sort((a, b) => b.montoAsignado - a.montoAsignado);
  }, [tiendas, dealsPestaña1, dealTiendas]);

  // =========================================================================
  // CÁLCULOS PESTAÑA 2: OPERACIONES & RENDERS
  // =========================================================================
  const hoyStr = new Date().toISOString().split('T')[0];
  const en15Dias = new Date();
  en15Dias.setDate(en15Dias.getDate() + 15);
  const en15DiasStr = en15Dias.toISOString().split('T')[0];

  const operacionesPorTienda = useMemo(() => {
    let tiendasFiltradas = metricasPorTienda;

    // MultiSelect Formatos de Tienda
    if (formatosSeleccionadosP2.length > 0) {
      tiendasFiltradas = tiendasFiltradas.filter(t => 
        formatosSeleccionadosP2.some(f => f.toString() === (t.formato || 'Hipermercado'))
      );
    }

    // Búsqueda por texto libre
    if (busquedaTienda.trim()) {
      const q = busquedaTienda.toLowerCase();
      tiendasFiltradas = tiendasFiltradas.filter(t => 
        t.nombre.toLowerCase().includes(q) || String(t.numero).includes(q) || (t.formato && t.formato.toLowerCase().includes(q))
      );
    }

    // MultiSelect Sucursales / Tiendas
    if (tiendasSeleccionadasP2.length > 0) {
      tiendasFiltradas = tiendasFiltradas.filter(t => 
        tiendasSeleccionadasP2.some(id => id.toString() === t.id.toString())
      );
    }

    return tiendasFiltradas.map(t => {
      const elementosDeLaTienda: any[] = [];
      const rendersDeLaTienda: { id: string; url: string; nombre: string; campana: string; elemento: string }[] = [];

      dealsFiltradosGlobal.forEach(deal => {
        const esDeEstaTienda = dealTiendas.some(dt => dt.deal_id === deal.id && dt.tienda_id === t.id) ||
          (deal.elementos_json || []).some((el: any) => Array.isArray(el.tiendas) && el.tiendas.includes(t.id));

        if (esDeEstaTienda) {
          const items = deal.elementos_json || [];
          items.forEach((item: any) => {
            const aplicaItem = !item.tiendas || item.tiendas.length === 0 || item.tiendas.includes(t.id);
            if (aplicaItem && (item.canal === 'InStore' || deal.channel === 'InStore' || deal.channel === 'Omnicanal')) {
              const fDesde = item.fechaDesde || deal.fecha_desde;
              const fHasta = item.fechaHasta || deal.fecha_hasta;

              let cumpleVigencia = true;
              if (filtroVigenciaOperativa === 'VIGENTES_HOY') {
                cumpleVigencia = !!(fDesde && fHasta && fDesde <= hoyStr && fHasta >= hoyStr);
              } else if (filtroVigenciaOperativa === 'PROXIMAS') {
                cumpleVigencia = !!(fDesde && fDesde > hoyStr && fDesde <= en15DiasStr);
              } else if (filtroVigenciaOperativa === 'FINALIZADAS') {
                cumpleVigencia = !!(fHasta && fHasta < hoyStr);
              }

              if (cumpleVigencia) {
                elementosDeLaTienda.push({
                  dealTitulo: deal.titulo,
                  clienteNombre: deal.cliente?.nombre || 'Sin cliente',
                  elementoNombre: item.nombre,
                  fechaDesde: fDesde,
                  fechaHasta: fHasta,
                  cantidad: item.cantidad || 1,
                  periodo: item.periodo || 'Mensual'
                });

                (item.adjuntos || []).forEach((adj: Adjunto) => {
                  if (adj.categoria === 'RENDER' || adj.tipo?.startsWith('image/')) {
                    rendersDeLaTienda.push({
                      id: adj.id,
                      url: adj.url,
                      nombre: adj.nombre,
                      campana: deal.titulo,
                      elemento: item.nombre
                    });
                  }
                });
              }
            }
          });
        }
      });

      return {
        ...t,
        elementosOperativos: elementosDeLaTienda,
        rendersOperativos: rendersDeLaTienda
      };
    });
  }, [metricasPorTienda, formatosSeleccionadosP2, busquedaTienda, tiendasSeleccionadasP2, dealsFiltradosGlobal, dealTiendas, filtroVigenciaOperativa, hoyStr, en15DiasStr]);

  // =========================================================================
  // CÁLCULOS PESTAÑA 3: GESTIÓN COMERCIAL & RENDIMIENTO
  // =========================================================================
  const analisisVendedores = useMemo(() => {
    const etapas = ['COTIZADO', 'OPORTUNIDAD', 'POR_FACTURAR', 'FACTURADO', 'PERDIDO'];

    let listaVendedoresObjetivo = usuarios.filter(u => 
      u.rol === 'VENDEDOR' || deals.some(d => d.vendedor_id === u.id)
    );

    // MultiSelect de Vendedores a supervisar
    if (vendedoresSeleccionadosP3.length > 0) {
      listaVendedoresObjetivo = listaVendedoresObjetivo.filter(u => 
        vendedoresSeleccionadosP3.some(id => id.toString() === u.id.toString())
      );
    }

    return listaVendedoresObjetivo.map(vend => {
      let dealsDelVendedor = deals.filter(d => {
        if (d.vendedor_id !== vend.id) return false;

        // Canales globales
        if (canalesSeleccionadosGlobal.length > 0) {
          const canal = d.channel || 'Digital';
          if (!canalesSeleccionadosGlobal.some(c => c.toString() === canal)) return false;
        }

        // Régimen contable
        if (filtroRegimenGlobal === 'REGULARES' && d.es_reclasificado) return false;
        if (filtroRegimenGlobal === 'RECLASIFICADOS' && !d.es_reclasificado) return false;

        // Rango temporal
        const { desde, hasta } = calcularLimitesTemporales;
        if (desde && d.fecha_hasta && d.fecha_hasta < desde) return false;
        if (hasta && d.fecha_desde && d.fecha_desde > hasta) return false;
        return true;
      });

      // MultiSelect de Etapas del Pipeline
      if (etapasSeleccionadasP3.length > 0) {
        dealsDelVendedor = dealsDelVendedor.filter(d => 
          etapasSeleccionadasP3.some(st => st.toString() === (d.stage || 'COTIZADO'))
        );
      }

      const pipelineEtapas: Record<string, { monto: number; cantidad: number }> = {};
      etapas.forEach(st => { pipelineEtapas[st] = { monto: 0, cantidad: 0 }; });

      let sumaDiasCierre = 0;
      let cantidadCerrados = 0;
      let sumaDescuentos = 0;
      let cantidadConDescuento = 0;

      dealsDelVendedor.forEach(d => {
        const stage = d.stage || 'COTIZADO';
        const monto = Number(d.amount || 0);
        if (pipelineEtapas[stage]) {
          pipelineEtapas[stage].monto += monto;
          pipelineEtapas[stage].cantidad += 1;
        }

        if ((stage === 'FACTURADO' || stage === 'PERDIDO') && d.created_at) {
          const tCreacion = new Date(d.created_at).getTime();
          const tCierre = d.updated_at ? new Date(d.updated_at).getTime() : new Date().getTime();
          const diffDias = Math.max(1, Math.round((tCierre - tCreacion) / (1000 * 60 * 60 * 24)));
          sumaDiasCierre += diffDias;
          cantidadCerrados += 1;
        }

        if (d.descuento_porcentaje !== undefined && d.descuento_porcentaje !== null) {
          sumaDescuentos += Number(d.descuento_porcentaje);
          cantidadConDescuento += 1;
        }
      });

      const totalFacturadoVend = pipelineEtapas['FACTURADO'].monto;
      const totalPerdidoVend = pipelineEtapas['PERDIDO'].monto;
      const totalCotizadoVend = pipelineEtapas['COTIZADO'].monto;
      const totalOportunidadVend = pipelineEtapas['OPORTUNIDAD'].monto;
      const totalPorFacturarVend = pipelineEtapas['POR_FACTURAR'].monto;

      const totalProcesado = totalFacturadoVend + totalPerdidoVend + totalCotizadoVend + totalOportunidadVend + totalPorFacturarVend;
      const totalMontoCerrable = totalFacturadoVend + totalPerdidoVend;
      const winRate = totalMontoCerrable > 0 ? (totalFacturadoVend / totalMontoCerrable) * 100 : 0;

      const ticketPromedio = pipelineEtapas['FACTURADO'].cantidad > 0 
        ? totalFacturadoVend / pipelineEtapas['FACTURADO'].cantidad 
        : 0;

      const tiempoPromedioDias = cantidadCerrados > 0 
        ? Math.round(sumaDiasCierre / cantidadCerrados) 
        : 0;

      const descuentoPromedio = cantidadConDescuento > 0 
        ? Math.round((sumaDescuentos / cantidadConDescuento) * 10) / 10 
        : 0;

      const forecastPonderado = (totalCotizadoVend * 0.25) + (totalOportunidadVend * 0.50) + (totalPorFacturarVend * 0.90) + totalFacturadoVend;

      return {
        vendedorId: vend.id,
        nombre: vend.nombre,
        rol: vend.rol || 'Vendedor',
        totalDeals: dealsDelVendedor.length,
        totalMonto: totalProcesado,
        pipelineEtapas,
        winRate,
        ticketPromedio,
        tiempoPromedioDias,
        descuentoPromedio,
        forecastPonderado
      };
    }).sort((a, b) => b.pipelineEtapas['FACTURADO'].monto - a.pipelineEtapas['FACTURADO'].monto);
  }, [usuarios, deals, canalesSeleccionadosGlobal, filtroRegimenGlobal, calcularLimitesTemporales, vendedoresSeleccionadosP3, etapasSeleccionadasP3]);

  // SEMÁFORO DE AGING CON UMBRAL DINÁMICO
  const acuerdosEstancados = useMemo(() => {
    const hoyMillis = new Date().getTime();
    return deals
      .filter(d => (d.stage === 'COTIZADO' || d.stage === 'OPORTUNIDAD') && d.created_at)
      .filter(d => {
        if (vendedoresSeleccionadosP3.length > 0) {
          const vId = d.vendedor_id?.toString() || "";
          if (!vendedoresSeleccionadosP3.some(id => id.toString() === vId)) return false;
        }
        if (etapasSeleccionadasP3.length > 0) {
          if (!etapasSeleccionadasP3.some(st => st.toString() === d.stage)) return false;
        }
        return true;
      })
      .map(d => {
        const diasAntiguedad = Math.round((hoyMillis - new Date(d.created_at).getTime()) / (1000 * 60 * 60 * 24));
        return {
          id: d.id,
          titulo: d.titulo,
          clienteNombre: d.cliente?.nombre || 'Sin cliente',
          vendedorNombre: d.vendedor?.nombre || 'Sin asignar',
          monto: Number(d.amount || 0),
          stage: d.stage,
          diasAntiguedad,
          esCritico: diasAntiguedad >= umbralAgingDias * 1.5
        };
      })
      .filter(d => d.diasAntiguedad >= umbralAgingDias)
      .sort((a, b) => b.diasAntiguedad - a.diasAntiguedad);
  }, [deals, vendedoresSeleccionadosP3, etapasSeleccionadasP3, umbralAgingDias]);

  // EXPORTADOR INTEGRAL A EXCEL (PESTAÑA 1)
  const handleExportarExcelIntegral = () => {
    const wb = XLSX.utils.book_new();
    const fechaDescarga = new Date().toLocaleDateString('es-AR');

    const hoja1Data: any[][] = [
      ['DASHBOARD COMERCIAL - RESUMEN EJECUTIVO', 'CARREFOUR MEDIA'],
      ['Fecha de Emisión:', fechaDescarga],
      ['Filtro Temporal:', filtroTemporal],
      [],
      ['INDICADOR GLOBAL', 'VALOR ARS / CANTIDAD'],
      ['Total Contratado Histórico', kpisGlobales.totalContratado],
      ['Total Facturado Real', kpisGlobales.totalFacturado],
      ['Deuda Pendiente de Facturar', kpisGlobales.totalDeuda],
      ['Total en Régimen Reclasificado', kpisGlobales.totalReclasificados],
      ['Cantidad de Campañas Activas', kpisGlobales.totalDealsActivos],
      ['Cantidad Total de Acuerdos', kpisGlobales.cantidadTotalDeals],
      [],
      ['DISTRIBUCIÓN POR CANAL', 'MONTO CONTRATADO', 'CANTIDAD CAMPAÑAS', '% SHARE']
    ];

    ingresosPorCanal.forEach(c => {
      const share = kpisGlobales.totalContratado > 0 ? (c.total / kpisGlobales.totalContratado) * 100 : 0;
      hoja1Data.push([c.canal, c.total, c.cantidad, `${share.toFixed(1)}%`]);
    });

    const ws1 = XLSX.utils.aoa_to_sheet(hoja1Data);
    ws1['!cols'] = [{ wch: 32 }, { wch: 22 }, { wch: 20 }, { wch: 15 }];
    XLSX.utils.book_append_sheet(wb, ws1, 'Resumen_Ejecutivo');

    const hoja2Data: any[][] = [
      ['RANKING TOP EMPRESAS Y ANUNCIANTES', `Actualizado al: ${fechaDescarga}`],
      [],
      ['Posición', 'Empresa / Cliente', 'Campañas', 'Monto Contratado ($)', 'Monto Facturado ($)', 'Saldo Pendiente ($)', '% Share Inversión']
    ];

    topEmpresas.forEach((emp, index) => {
      const share = kpisGlobales.totalContratado > 0 ? (emp.totalContratado / kpisGlobales.totalContratado) * 100 : 0;
      hoja2Data.push([
        index + 1,
        emp.nombre,
        emp.cantidad,
        emp.totalContratado,
        emp.totalFacturado,
        emp.saldo,
        `${share.toFixed(1)}%`
      ]);
    });

    const ws2 = XLSX.utils.aoa_to_sheet(hoja2Data);
    ws2['!cols'] = [{ wch: 10 }, { wch: 36 }, { wch: 12 }, { wch: 22 }, { wch: 22 }, { wch: 20 }, { wch: 16 }];
    XLSX.utils.book_append_sheet(wb, ws2, 'Top_Empresas');

    const hoja3Data: any[][] = [
      ['INGRESOS ASIGNADOS POR TIENDA INSTORE', `Actualizado al: ${fechaDescarga}`],
      [],
      ['N° Tienda', 'Nombre Sucursal', 'Formato', 'Campañas Activas', 'Ingreso Asignado Estimado ($)', 'Campañas']
    ];

    metricasPorTienda.forEach(t => {
      hoja3Data.push([
        t.numero,
        t.nombre,
        t.formato || 'Hipermercado',
        t.cantidadDeals,
        t.montoAsignado,
        t.campañas.join(', ') || 'Sin campañas'
      ]);
    });

    const ws3 = XLSX.utils.aoa_to_sheet(hoja3Data);
    ws3['!cols'] = [{ wch: 12 }, { wch: 30 }, { wch: 18 }, { wch: 18 }, { wch: 25 }, { wch: 45 }];
    XLSX.utils.book_append_sheet(wb, ws3, 'Ingresos_Por_Tienda');

    XLSX.writeFile(wb, `Reporte_Consolidado_Retail_Media_${new Date().toISOString().substring(0, 10)}.xlsx`);
  };

  // EXPORTADOR OPERATIVO DE INSTALACIONES (PESTAÑA 2)
  const handleExportarExcelOperativo = () => {
    const dataPlanilla: any[][] = [
      ['PLANILLA OPERATIVA DE INSTALACIONES INSTORE - CARREFOUR MEDIA'],
      ['Fecha de Emisión:', new Date().toLocaleDateString('es-AR')],
      ['Filtro Vigencia:', filtroVigenciaOperativa],
      [],
      ['N° Tienda', 'Sucursal', 'Cliente / Marca', 'Campaña', 'Elemento a Instalar', 'Vigencia Desde', 'Vigencia Hasta', 'Cantidad por Tienda', 'Renders Disponibles']
    ];

    operacionesPorTienda.forEach(t => {
      if (t.elementosOperativos.length === 0) {
        dataPlanilla.push([t.numero, t.nombre, 'Sin elementos vigentes', '-', '-', '-', '-', 0, 0]);
      } else {
        t.elementosOperativos.forEach((el: any) => {
          dataPlanilla.push([
            t.numero,
            t.nombre,
            el.clienteNombre,
            el.dealTitulo,
            el.elementoNombre,
            el.fechaDesde,
            el.fechaHasta,
            el.cantidad,
            t.rendersOperativos.length
          ]);
        });
      }
    });

    const ws = XLSX.utils.aoa_to_sheet(dataPlanilla);
    ws['!cols'] = [
      { wch: 12 }, { wch: 28 }, { wch: 28 }, { wch: 30 },
      { wch: 30 }, { wch: 15 }, { wch: 15 }, { wch: 18 }, { wch: 18 }
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Instalaciones_InStore');
    XLSX.writeFile(wb, `Planilla_Instalaciones_InStore_${new Date().toISOString().substring(0, 10)}.xlsx`);
  };

  // EXPORTADOR GESTIÓN COMERCIAL (PESTAÑA 3)
  const handleExportarExcelGestion = () => {
    const wb = XLSX.utils.book_new();
    const fechaDescarga = new Date().toLocaleDateString('es-AR');

    const dataRendimiento: any[][] = [
      ['ANÁLISIS DE RENDIMIENTO COMERCIAL Y PIPELINE', `Fecha: ${fechaDescarga}`],
      [],
      [
        'Vendedor', 'Rol', 'Total Campañas', 'Cotizado ($)', 'Oportunidad ($)', 
        'Por Facturar ($)', 'Facturado ($)', 'Perdido ($)', 'Forecast Ponderado ($)',
        'Win Rate (%)', 'Ticket Promedio ($)', 'Ciclo Cierre (Días)', 'Desc. Promedio (%)'
      ]
    ];

    analisisVendedores.forEach(v => {
      dataRendimiento.push([
        v.nombre,
        v.rol,
        v.totalDeals,
        v.pipelineEtapas['COTIZADO'].monto,
        v.pipelineEtapas['OPORTUNIDAD'].monto,
        v.pipelineEtapas['POR_FACTURAR'].monto,
        v.pipelineEtapas['FACTURADO'].monto,
        v.pipelineEtapas['PERDIDO'].monto,
        v.forecastPonderado,
        `${v.winRate.toFixed(1)}%`,
        v.ticketPromedio,
        v.tiempoPromedioDias,
        `${v.descuentoPromedio.toFixed(1)}%`
      ]);
    });

    const ws1 = XLSX.utils.aoa_to_sheet(dataRendimiento);
    ws1['!cols'] = [
      { wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 18 }, { wch: 18 },
      { wch: 18 }, { wch: 18 }, { wch: 18 }, { wch: 22 }, { wch: 14 },
      { wch: 18 }, { wch: 16 }, { wch: 16 }
    ];
    XLSX.utils.book_append_sheet(wb, ws1, 'Rendimiento_Vendedores');

    const dataAging: any[][] = [
      [`ALERTAS DE ACUERDOS ESTANCADOS (AGING >= ${umbralAgingDias} DÍAS)`, `Fecha: ${fechaDescarga}`],
      [],
      ['Campaña', 'Cliente', 'Responsable', 'Etapa Actual', 'Monto ($)', 'Días Estancado', 'Severidad']
    ];

    acuerdosEstancados.forEach(a => {
      dataAging.push([
        a.titulo,
        a.clienteNombre,
        a.vendedorNombre,
        a.stage,
        a.monto,
        a.diasAntiguedad,
        a.esCritico ? 'CRÍTICO' : 'ATENCIÓN'
      ]);
    });

    const ws2 = XLSX.utils.aoa_to_sheet(dataAging);
    ws2['!cols'] = [{ wch: 30 }, { wch: 25 }, { wch: 22 }, { wch: 15 }, { wch: 18 }, { wch: 16 }, { wch: 22 }];
    XLSX.utils.book_append_sheet(wb, ws2, 'Acuerdos_Estancados');

    XLSX.writeFile(wb, `Reporte_Gestion_Comercial_${new Date().toISOString().substring(0, 10)}.xlsx`);
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-8 text-white overflow-y-auto">
      {/* CABECERA PRINCIPAL */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Centro de Inteligencia y Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">
            Indicadores ejecutivos, operaciones de tienda y gestión del equipo comercial.
          </p>
        </div>

        {/* NAVEGACIÓN POR PESTAÑAS */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shadow-md">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'general'
                ? 'bg-cyan-500 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-sm">insights</span>
            Visión General & Ventas
          </button>

          <button
            onClick={() => setActiveTab('operaciones')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'operaciones'
                ? 'bg-amber-500 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-sm">storefront</span>
            Operaciones & Tiendas
          </button>

          {esGestion && (
            <button
              onClick={() => setActiveTab('gestion')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'gestion'
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                  : 'text-purple-400 hover:text-purple-300 hover:bg-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-sm">supervisor_account</span>
              Gestión Comercial
              <span className="text-[9px] bg-purple-950 px-1.5 py-0.5 rounded border border-purple-500/40 text-purple-300 font-mono">
                Admin
              </span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BARRA DE FILTROS GLOBALES (TRANSVERSAL) */}
      {/* ========================================================================= */}
      <div className="bg-slate-900/80 border border-white/10 p-4 rounded-xl backdrop-blur-md space-y-3 shadow-lg">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <span className="material-symbols-outlined text-cyan-400 text-base">tune</span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Filtros Transversales Globales</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Presets de Fecha */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Período Temporal</label>
            <select
              value={filtroTemporal}
              onChange={(e) => setFiltroTemporal(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-700 text-white text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-400"
            >
              <option value="HISTORICO">Histórico Completo</option>
              <option value="ESTE_MES">Este Mes</option>
              <option value="MES_ANTERIOR">Mes Anterior</option>
              <option value="ESTE_ANIO">Año en Curso</option>
              <option value="PERSONALIZADO">Rango Personalizado</option>
            </select>
          </div>

          {/* Rango Personalizado condicional */}
          {filtroTemporal === 'PERSONALIZADO' ? (
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Desde</label>
                <input
                  type="date"
                  value={fechaDesdeFiltro}
                  onChange={(e) => setFechaDesdeFiltro(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-2 py-2 focus:border-cyan-400"
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Hasta</label>
                <input
                  type="date"
                  value={fechaHastaFiltro}
                  onChange={(e) => setFechaHastaFiltro(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-2 py-2 focus:border-cyan-400"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Régimen Contable</label>
              <select
                value={filtroRegimenGlobal}
                onChange={(e) => setFiltroRegimenGlobal(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-400"
              >
                <option value="REGULARES">Solo Regulares (Excluye Reclasif.)</option>
                <option value="RECLASIFICADOS">Solo Reclasificados</option>
                <option value="TODOS">Todos los Acuerdos</option>
              </select>
            </div>
          )}

          {/* MultiSelect: Canales Globales */}
          <MultiSelect
            label="Canal / Vertical"
            placeholder="Todos los canales"
            options={opcionesCanales}
            selectedValues={canalesSeleccionadosGlobal}
            onChange={setCanalesSeleccionadosGlobal}
          />

          {/* Reset Global */}
          <div className="flex items-end">
            <button
              onClick={() => {
                setFiltroTemporal('HISTORICO');
                setFechaDesdeFiltro('');
                setFechaHastaFiltro('');
                setCanalesSeleccionadosGlobal([]);
                setFiltroRegimenGlobal('REGULARES');
                setClientesSeleccionadosP1([]);
                setVendedoresSeleccionadosP1([]);
                setFiltroTipoCuentaP1('TODAS');
                setFiltroMontoMinimoP1(0);
                setFormatosSeleccionadosP2([]);
                setTiendasSeleccionadasP2([]);
                setFiltroVigenciaOperativa('TODAS');
                setVendedoresSeleccionadosP3([]);
                setEtapasSeleccionadasP3([]);
                setUmbralAgingDias(20);
                setBusquedaTienda('');
              }}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-xs">restart_alt</span>
              Limpiar Todos los Filtros
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center py-24">
          <p className="text-cyan-400 font-semibold animate-pulse flex items-center gap-2">
            <span className="material-symbols-outlined animate-spin text-lg">sync</span>
            Cargando analíticas comerciales y operativas...
          </p>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">

          {/* ========================================================================= */}
          {/* PESTAÑA 1: VISIÓN GENERAL & VENTAS */}
          {/* ========================================================================= */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              {/* SUB-FILTROS DE PESTAÑA 1 (MULTISELECT EMPRESAS Y VENDEDORES) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                {/* 1. MultiSelect: Empresas / Anunciantes */}
                <MultiSelect
                  label="Empresas / Anunciantes"
                  placeholder="Todas las empresas"
                  options={opcionesClientes}
                  selectedValues={clientesSeleccionadosP1}
                  onChange={setClientesSeleccionadosP1}
                />

                {/* 2. MultiSelect: Vendedores */}
                <MultiSelect
                  label="Vendedor / Responsable"
                  placeholder="Todos los vendedores"
                  options={opcionesVendedores}
                  selectedValues={vendedoresSeleccionadosP1}
                  onChange={setVendedoresSeleccionadosP1}
                />

                {/* 3. Tipo de Cuenta */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Tipo de Cuenta</label>
                  <select
                    value={filtroTipoCuentaP1}
                    onChange={(e) => setFiltroTipoCuentaP1(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="TODAS">Todas las Cuentas</option>
                    <option value="DIRECTO">Solo Directas (Anunciantes)</option>
                    <option value="AGENCIA">Solo Agencias de Medios</option>
                  </select>
                </div>

                {/* 4. Ticket Mínimo */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Ticket Mínimo (ARS)</label>
                  <input
                    type="number"
                    min="0"
                    step="500000"
                    value={filtroMontoMinimoP1 || ""}
                    onChange={(e) => setFiltroMontoMinimoP1(parseFloat(e.target.value) || 0)}
                    placeholder="Ej: 5000000"
                    className="w-full bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-mono font-bold rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* 5. Botón Exportar */}
                <div className="flex items-end">
                  <button
                    onClick={handleExportarExcelIntegral}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    Exportar Reporte (Excel)
                  </button>
                </div>
              </div>

              {/* TARJETAS DE KPIS */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-900/60 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Monto Total Contratado</p>
                  <h3 className="text-3xl font-extrabold text-white">${kpisGlobales.totalContratado.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
                  <span className="text-[10px] text-slate-500 mt-1 block">{kpisGlobales.cantidadTotalDeals} acuerdos comerciales</span>
                </div>
                <div className="bg-slate-900/60 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Facturado Histórico Real</p>
                  <h3 className="text-3xl font-extrabold text-emerald-400">${kpisGlobales.totalFacturado.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
                  <span className="text-[10px] text-emerald-500/80 mt-1 block">
                    {kpisGlobales.totalContratado > 0 ? ((kpisGlobales.totalFacturado / kpisGlobales.totalContratado) * 100).toFixed(1) : 0}% de ejecución
                  </span>
                </div>
                <div className="bg-slate-900/60 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Deuda Pendiente de Facturar</p>
                  <h3 className="text-3xl font-extrabold text-amber-400">${kpisGlobales.totalDeuda.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
                  <span className="text-[10px] text-amber-500/80 mt-1 block">Saldo devengable activo</span>
                </div>
                <div className="bg-slate-900/60 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Régimen Reclasificado</p>
                  <h3 className="text-3xl font-extrabold text-purple-400">${kpisGlobales.totalReclasificados.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
                  <span className="text-[10px] text-purple-400/80 mt-1 block">Facturación especial aislada</span>
                </div>
              </div>

              {/* DISTRIBUCIÓN POR CANAL */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ingresosPorCanal.map(c => {
                  const share = kpisGlobales.totalContratado > 0 ? (c.total / kpisGlobales.totalContratado) * 100 : 0;
                  return (
                    <div key={c.canal} className="bg-slate-900/60 border border-white/10 p-5 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Canal {c.canal}</span>
                        <h4 className="text-2xl font-bold text-cyan-400 font-mono">${c.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h4>
                        <span className="text-[10px] text-slate-500">{c.cantidad} campañas contratadas</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-extrabold text-white font-mono">{share.toFixed(1)}%</span>
                        <span className="text-[10px] text-slate-400 block">del total</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* TABLA 1: TOP ANUNCIANTES / EMPRESAS */}
              <section className="bg-slate-900/60 border border-white/10 rounded-xl p-6 backdrop-blur-md space-y-4">
                <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                  <div>
                    <h3 className="font-bold text-lg text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-400">leaderboard</span>
                      Top Anunciantes y Empresas por Inversión
                    </h3>
                    <p className="text-xs text-slate-400">Ranking de clientes ordenado por volumen contratado acumulado.</p>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{topEmpresas.length} empresas reflejadas</span>
                </div>

                <div className="overflow-x-auto max-h-96">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="text-[11px] text-slate-400 uppercase bg-slate-950/80 sticky top-0 z-10">
                      <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">Empresa / Anunciante</th>
                        <th className="p-3 text-center">Campañas</th>
                        <th className="p-3 text-right">Contratado ($)</th>
                        <th className="p-3 text-right">Facturado ($)</th>
                        <th className="p-3 text-right">Saldo Pendiente ($)</th>
                        <th className="p-3 text-right">Share Inversión</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {topEmpresas.map((emp, idx) => {
                        const share = kpisGlobales.totalContratado > 0 ? (emp.totalContratado / kpisGlobales.totalContratado) * 100 : 0;
                        return (
                          <tr key={emp.nombre} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-3 font-mono text-xs text-slate-500">{idx + 1}</td>
                            <td className="p-3 font-bold text-white text-xs">{emp.nombre}</td>
                            <td className="p-3 text-center font-mono text-xs">{emp.cantidad}</td>
                            <td className="p-3 text-right font-mono text-xs font-bold text-white">${emp.totalContratado.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                            <td className="p-3 text-right font-mono text-xs font-bold text-emerald-400">${emp.totalFacturado.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                            <td className="p-3 text-right font-mono text-xs font-bold text-amber-400">${emp.saldo.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                            <td className="p-3 text-right font-mono text-xs font-bold text-cyan-400">{share.toFixed(1)}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* TABLA 2: TOP TIENDAS POR INGRESO ASIGNADO */}
              <section className="bg-slate-900/60 border border-white/10 rounded-xl p-6 backdrop-blur-md space-y-4">
                <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                  <div>
                    <h3 className="font-bold text-lg text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-amber-400">store</span>
                      Top Tiendas por Ingreso Asignado (InStore)
                    </h3>
                    <p className="text-xs text-slate-400">Ranking de sucursales con mayor facturación/ingreso asignado por campañas InStore y Omnicanal.</p>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {metricasPorTienda.filter(t => t.montoAsignado > 0).length} tiendas con ingresos asignados
                  </span>
                </div>

                <div className="overflow-x-auto max-h-96">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="text-[11px] text-slate-400 uppercase bg-slate-950/80 sticky top-0 z-10">
                      <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">N°</th>
                        <th className="p-3">Sucursal / Tienda</th>
                        <th className="p-3">Formato</th>
                        <th className="p-3 text-center">Campañas</th>
                        <th className="p-3 text-right">Ingreso Asignado ($)</th>
                        <th className="p-3 text-right">% Share InStore</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {metricasPorTienda.map((t, idx) => {
                        const totalInStore = ingresosPorCanal.find(c => c.canal === 'InStore')?.total || 1;
                        const share = totalInStore > 0 ? (t.montoAsignado / totalInStore) * 100 : 0;
                        return (
                          <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-3 font-mono text-xs text-slate-500">{idx + 1}</td>
                            <td className="p-3 font-mono text-xs text-amber-400 font-bold">{t.numero}</td>
                            <td className="p-3 font-bold text-white text-xs">{t.nombre}</td>
                            <td className="p-3 text-xs text-slate-400">{t.formato || 'Hipermercado'}</td>
                            <td className="p-3 text-center font-mono text-xs">{t.cantidadDeals}</td>
                            <td className="p-3 text-right font-mono text-xs font-bold text-emerald-400">
                              ${t.montoAsignado.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </td>
                            <td className="p-3 text-right font-mono text-xs font-bold text-cyan-400">
                              {t.montoAsignado > 0 ? `${share.toFixed(1)}%` : '0%'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PESTAÑA 2: OPERACIONES & RENDERS POR TIENDA */}
          {/* ========================================================================= */}
          {activeTab === 'operaciones' && (
            <div className="space-y-6">
              {/* SUB-FILTROS DE PESTAÑA 2 (MULTISELECT SUCURSALES Y FORMATOS) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                {/* 1. MultiSelect de Tiendas Específicas */}
                <MultiSelect
                  label="Sucursales / Tiendas"
                  placeholder="Todas las sucursales"
                  options={opcionesTiendas}
                  selectedValues={tiendasSeleccionadasP2}
                  onChange={setTiendasSeleccionadasP2}
                />

                {/* 2. MultiSelect Formatos de Tienda */}
                <MultiSelect
                  label="Formatos de Tienda"
                  placeholder="Todos los formatos"
                  options={opcionesFormatosTienda}
                  selectedValues={formatosSeleccionadosP2}
                  onChange={setFormatosSeleccionadosP2}
                />

                {/* 3. Buscador por texto libre */}
                <div className="relative">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Buscar por Texto</label>
                  <input
                    type="text"
                    value={busquedaTienda}
                    onChange={(e) => setBusquedaTienda(e.target.value)}
                    placeholder="Nombre o N°..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 pl-8"
                  />
                  <span className="material-symbols-outlined text-slate-500 text-sm absolute left-2.5 top-7">search</span>
                </div>

                {/* 4. Estado de Vigencia */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Estado de Vigencia</label>
                  <select
                    value={filtroVigenciaOperativa}
                    onChange={(e) => setFiltroVigenciaOperativa(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-amber-400 text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="TODAS">Todas las Campañas</option>
                    <option value="VIGENTES_HOY">Vigentes Hoy (En Exhibición)</option>
                    <option value="PROXIMAS">Próximas a Montar (15 días)</option>
                    <option value="FINALIZADAS">Finalizadas</option>
                  </select>
                </div>
              </div>

              {/* BARRA DE EXPORTACIÓN */}
              <div className="flex justify-between items-center bg-slate-900/60 p-4 rounded-xl border border-white/10">
                <span className="text-xs text-slate-400">
                  Mostrando elementos y renders asociados a sucursales físicas activas.
                </span>
                <button
                  onClick={handleExportarExcelOperativo}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">assignment</span>
                  Descargar Planilla Operativa de Instalaciones
                </button>
              </div>

              {/* LISTADO DE TIENDAS Y DESGLOSE OPERATIVO */}
              <div className="grid grid-cols-1 gap-6">
                {operacionesPorTienda.map(t => (
                  <div key={t.id} className="bg-slate-900/60 border border-white/10 rounded-xl p-5 backdrop-blur-md space-y-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-sm">
                          {t.numero}
                        </span>
                        <div>
                          <h4 className="font-bold text-base text-white">{t.nombre}</h4>
                          <span className="text-xs text-slate-400">
                            {t.formato || 'Hipermercado'} • {t.elementosOperativos.length} elementos filtrados
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400">Ingreso Asignado:</span>
                        <span className="font-mono font-bold text-emerald-400 text-sm">
                          ${t.montoAsignado.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Espacios e Instalaciones Vigentes</p>
                        {t.elementosOperativos.length === 0 ? (
                          <p className="text-xs text-slate-500 italic py-2">No hay elementos que coincidan con los filtros en esta sucursal.</p>
                        ) : (
                          <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                            {t.elementosOperativos.map((el: any, index: number) => (
                              <div key={index} className="p-2.5 bg-slate-950/70 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                                <div>
                                  <span className="font-bold text-white block">{el.elementoNombre}</span>
                                  <span className="text-[10px] text-cyan-400">{el.clienteNombre} — {el.dealTitulo}</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-[10px] text-slate-400 block font-mono">{el.fechaDesde} al {el.fechaHasta}</span>
                                  <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-bold font-mono">
                                    Cant: {el.cantidad} ({el.periodo})
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Renders e Imágenes</p>
                          <span className="text-[10px] text-slate-400 font-mono">{t.rendersOperativos.length} archivos</span>
                        </div>

                        {t.rendersOperativos.length === 0 ? (
                          <div className="p-4 bg-slate-950/50 rounded-lg border border-dashed border-slate-800 text-center">
                            <span className="material-symbols-outlined text-slate-600 text-2xl block mb-1">image_not_supported</span>
                            <span className="text-[10px] text-slate-500">Sin renders adjuntados</span>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                            {t.rendersOperativos.map((r, i) => (
                              <div
                                key={r.id || i}
                                onClick={() => setImagenModal({ url: r.url, titulo: `${r.elemento} (${r.campana})` })}
                                className="group relative bg-slate-950 border border-slate-800 hover:border-amber-400 rounded-lg p-1.5 cursor-pointer transition-all overflow-hidden"
                              >
                                <img src={r.url} alt={r.nombre} className="w-full h-16 object-cover rounded group-hover:scale-105 transition-transform" />
                                <div className="mt-1">
                                  <p className="text-[9px] text-slate-300 font-mono truncate">{r.nombre}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PESTAÑA 3: GESTIÓN COMERCIAL & RENDIMIENTO (SOLO ADMIN & JEFE DE VENTAS) */}
          {/* ========================================================================= */}
          {activeTab === 'gestion' && esGestion && (
            <div className="space-y-6">
              {/* SUB-FILTROS DE PESTAÑA 3 CON MULTISELECT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-purple-950/20 p-4 rounded-xl border border-purple-500/30">
                {/* 1. MultiSelect de Ejecutivos */}
                <MultiSelect
                  label="Ejecutivos a Supervisar"
                  placeholder="Todo el equipo comercial"
                  options={opcionesVendedores}
                  selectedValues={vendedoresSeleccionadosP3}
                  onChange={setVendedoresSeleccionadosP3}
                />

                {/* 2. MultiSelect de Etapas del Pipeline */}
                <MultiSelect
                  label="Etapas del Pipeline"
                  placeholder="Todas las etapas"
                  options={opcionesEtapasPipeline}
                  selectedValues={etapasSeleccionadasP3}
                  onChange={setEtapasSeleccionadasP3}
                />

                {/* 3. Umbral de Aging */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Umbral Semáforo Aging</label>
                  <select
                    value={umbralAgingDias}
                    onChange={(e) => setUmbralAgingDias(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 text-amber-400 text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-purple-400"
                  >
                    <option value={15}>Mayor a 15 días sin avance</option>
                    <option value={20}>Mayor a 20 días sin avance</option>
                    <option value={30}>Mayor a 30 días sin avance</option>
                    <option value={45}>Mayor a 45 días sin avance</option>
                  </select>
                </div>

                {/* 4. Descargar Reporte */}
                <div className="flex items-end">
                  <button
                    onClick={handleExportarExcelGestion}
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-lg text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    Descargar Reporte Comercial
                  </button>
                </div>
              </div>

              {/* MATRIZ DE PIPELINE POR VENDEDOR */}
              <section className="bg-slate-900/60 border border-white/10 rounded-xl p-6 backdrop-blur-md space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-3">
                  <span className="material-symbols-outlined text-purple-400">stacked_line_chart</span>
                  Matriz de Pipeline por Vendedor y Etapa
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="text-[10px] text-slate-400 uppercase bg-slate-950/80 sticky top-0 z-10">
                      <tr>
                        <th className="p-3">Ejecutivo / Vendedor</th>
                        <th className="p-3 text-right">Cotizado</th>
                        <th className="p-3 text-right">Oportunidad</th>
                        <th className="p-3 text-right">Por Facturar</th>
                        <th className="p-3 text-right text-emerald-400">Facturado (Cerrado)</th>
                        <th className="p-3 text-right text-rose-400">Perdido</th>
                        <th className="p-3 text-right text-cyan-400 font-bold">Total Pipeline</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {analisisVendedores.map(vend => (
                        <tr key={vend.vendedorId} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-3">
                            <span className="font-bold text-white block text-xs">{vend.nombre}</span>
                            <span className="text-[10px] text-slate-500">{vend.rol} • {vend.totalDeals} acuerdos</span>
                          </td>
                          <td className="p-3 text-right font-mono text-xs text-slate-400">
                            ${vend.pipelineEtapas['COTIZADO'].monto.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            <span className="text-[10px] text-slate-600 block">({vend.pipelineEtapas['COTIZADO'].cantidad})</span>
                          </td>
                          <td className="p-3 text-right font-mono text-xs text-slate-300">
                            ${vend.pipelineEtapas['OPORTUNIDAD'].monto.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            <span className="text-[10px] text-slate-600 block">({vend.pipelineEtapas['OPORTUNIDAD'].cantidad})</span>
                          </td>
                          <td className="p-3 text-right font-mono text-xs text-amber-300">
                            ${vend.pipelineEtapas['POR_FACTURAR'].monto.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            <span className="text-[10px] text-slate-600 block">({vend.pipelineEtapas['POR_FACTURAR'].cantidad})</span>
                          </td>
                          <td className="p-3 text-right font-mono text-xs font-bold text-emerald-400 bg-emerald-950/10">
                            ${vend.pipelineEtapas['FACTURADO'].monto.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            <span className="text-[10px] text-emerald-500/60 block">({vend.pipelineEtapas['FACTURADO'].cantidad})</span>
                          </td>
                          <td className="p-3 text-right font-mono text-xs text-rose-400">
                            ${vend.pipelineEtapas['PERDIDO'].monto.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            <span className="text-[10px] text-slate-600 block">({vend.pipelineEtapas['PERDIDO'].cantidad})</span>
                          </td>
                          <td className="p-3 text-right font-mono text-xs font-extrabold text-cyan-400 bg-cyan-950/20">
                            ${vend.totalMonto.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* INDICADORES DE GESTIÓN Y EFICACIA */}
              <section className="bg-slate-900/60 border border-white/10 rounded-xl p-6 backdrop-blur-md space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-3">
                  <span className="material-symbols-outlined text-purple-400">speed</span>
                  Indicadores de Eficacia, Velocidad de Cierre y Disciplina Comercial
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="text-[10px] text-slate-400 uppercase bg-slate-950/80 sticky top-0 z-10">
                      <tr>
                        <th className="p-3">Ejecutivo</th>
                        <th className="p-3 text-center">Tasa Conversión (Win Rate)</th>
                        <th className="p-3 text-right">Ticket Promedio</th>
                        <th className="p-3 text-center">Ciclo de Venta Promedio</th>
                        <th className="p-3 text-center">Descuento Promedio Otorgado</th>
                        <th className="p-3 text-right text-purple-400">Forecast Ponderado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {analisisVendedores.map(v => (
                        <tr key={v.vendedorId} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-3 font-bold text-white text-xs">{v.nombre}</td>
                          <td className="p-3 text-center">
                            <span className="font-mono font-bold text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              {v.winRate.toFixed(1)}%
                            </span>
                          </td>
                          <td className="p-3 text-right font-mono text-xs text-white">
                            ${v.ticketPromedio.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </td>
                          <td className="p-3 text-center font-mono text-xs text-slate-300">
                            {v.tiempoPromedioDias > 0 ? `${v.tiempoPromedioDias} días` : 'N/D'}
                          </td>
                          <td className="p-3 text-center font-mono text-xs">
                            <span className={`px-2 py-0.5 rounded font-bold ${v.descuentoPromedio > 15 ? 'text-rose-400 bg-rose-500/10 border border-rose-500/20' : 'text-slate-300'}`}>
                              {v.descuentoPromedio}%
                            </span>
                          </td>
                          <td className="p-3 text-right font-mono text-xs font-bold text-purple-400">
                            ${v.forecastPonderado.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* SEMÁFORO DE ACUERDOS ESTANCADOS */}
              <section className="bg-slate-900/60 border border-white/10 rounded-xl p-6 backdrop-blur-md space-y-4">
                <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-amber-400">timer</span>
                      Semáforo de Acuerdos Estancados (Aging &gt;= {umbralAgingDias} Días)
                    </h4>
                    <p className="text-xs text-slate-400">Cotizaciones u oportunidades abiertas que llevan semanas sin avance ni cambio de etapa.</p>
                  </div>
                  <span className="text-xs font-mono bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded border border-amber-500/30">
                    {acuerdosEstancados.length} acuerdos en alerta
                  </span>
                </div>

                {acuerdosEstancados.length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-3 text-center">
                    No hay acuerdos que superen los {umbralAgingDias} días de estancamiento con los filtros seleccionados.
                  </p>
                ) : (
                  <div className="overflow-x-auto max-h-72">
                    <table className="w-full text-left text-sm text-slate-300">
                      <thead className="text-[10px] text-slate-400 uppercase bg-slate-950/80 sticky top-0 z-10">
                        <tr>
                          <th className="p-3">Campaña / Acuerdo</th>
                          <th className="p-3">Cliente</th>
                          <th className="p-3">Responsable</th>
                          <th className="p-3 text-center">Etapa</th>
                          <th className="p-3 text-right">Monto</th>
                          <th className="p-3 text-center">Días sin Cierre</th>
                          <th className="p-3 text-center">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {acuerdosEstancados.map(a => (
                          <tr key={a.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-3 font-bold text-white text-xs">{a.titulo}</td>
                            <td className="p-3 text-xs text-slate-300">{a.clienteNombre}</td>
                            <td className="p-3 text-xs text-slate-400">{a.vendedorNombre}</td>
                            <td className="p-3 text-center font-mono text-[10px]">
                              <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 border border-slate-700">
                                {a.stage}
                              </span>
                            </td>
                            <td className="p-3 text-right font-mono text-xs font-bold text-white">
                              ${a.monto.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </td>
                            <td className="p-3 text-center font-mono text-xs font-bold text-amber-400">
                              {a.diasAntiguedad} días
                            </td>
                            <td className="p-3 text-center">
                              {a.esCritico ? (
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                                  Crítico
                                </span>
                              ) : (
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                  Atención
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      )}

      {/* MODAL DE VISUALIZACIÓN DE RENDERS */}
      {imagenModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setImagenModal(null)}></div>
          <div className="bg-slate-900 border border-white/20 rounded-2xl shadow-2xl relative z-10 max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-950">
              <h4 className="font-bold text-sm text-white truncate pr-4">{imagenModal.titulo}</h4>
              <button onClick={() => setImagenModal(null)} className="text-slate-400 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-4 flex items-center justify-center bg-black/60 overflow-auto">
              <img src={imagenModal.url} alt={imagenModal.titulo} className="max-h-[70vh] object-contain rounded" />
            </div>
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-end gap-3">
              <a
                href={imagenModal.url}
                target="_blank"
                rel="noreferrer"
                download
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-1.5 rounded text-xs flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                Abrir en tamaño original
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}