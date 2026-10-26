"use client";

import { Deal } from '../../lib/types';
import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "../../lib/supabase";
import { calcularProrrateoPorDias } from "../../lib/prorrateo";
import * as XLSX from 'xlsx';

interface MovimientoFactura {
  id: string;
  numero_factura_interna: string;
  id_factura_arca: string | null;
  deal_id: number;
  deal_titulo: string;
  periodo_mes: string;
  monto: number;
  fecha_facturacion: string;
  estado: string; // 'EMITIDA' | 'ANULADA'
  observaciones: string | null;
}

interface ItemCierreMes {
  dealId: number;
  clienteNombre: string;
  dealTitulo: string;
  canal: string;
  montoTotalAcuerdo: number;
  montoFacturadoActual: number;
  montoPendienteGlobal: number;
  montoProrrateadoMes: number;      // El teórico (100% de la porción del mes)
  montoYaFacturadoEnMes: number;    // Lo que ya se facturó previamente en ese mes
  saldoSugeridoMes: number;         // Saldo pendiente por cubrir del período
  montoAFacturarEditado: number;    // Monto a emitir ahora
  leyendaEditada: string;           // Leyenda SAP editable
  seleccionado: boolean;
  esVencido: boolean;
}

export default function FacturacionPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [movimientos, setMovimientos] = useState<MovimientoFactura[]>([]);
  const [loading, setLoading] = useState(true);

  const [mesCierreSeleccionado, setMesCierreSeleccionado] = useState<string>("");

  // Filtros Avanzados
  const [filtroBusqueda, setFiltroBusqueda] = useState<string>("");
  const [filtroEmpresa, setFiltroEmpresa] = useState<string>("TODAS");
  const [filtroCanal, setFiltroCanal] = useState<string>("TODOS");
  const [filtroReclasificado, setFiltroReclasificado] = useState<string>("REGULARES"); // 'REGULARES' | 'RECLASIFICADOS' | 'TODOS'
  const [soloActivasEnMes, setSoloActivasEnMes] = useState<boolean>(true);
  const [ordenSeleccionado, setOrdenSeleccionado] = useState<string>("DEFECTO"); // 'DEFECTO' | 'MONTO_DESC' | 'MONTO_ASC' | 'SALDO_MES_DESC' | 'SALDO_MES_ASC'

  // Estados Modal Cierre de Mes (Lote)
  const [itemsCierre, setItemsCierre] = useState<ItemCierreMes[]>([]);
  const [isModalCierreOpen, setIsModalCierreOpen] = useState(false);
  const [guardandoCierre, setGuardandoCierre] = useState(false);

  // Estados Modal Auditoría de Comprobantes Emitidos
  const [isModalComprobantesOpen, setIsModalComprobantesOpen] = useState(false);
  const [comprobanteAEditar, setComprobanteAEditar] = useState<MovimientoFactura | null>(null);
  const [editMontoComprobante, setEditMontoComprobante] = useState<number>(0);
  const [editLeyendaComprobante, setEditLeyendaComprobante] = useState<string>("");
  const [editArcaComprobante, setEditArcaComprobante] = useState<string>("");
  const [guardandoEdicionComprobante, setGuardandoEdicionComprobante] = useState(false);

  // Estados Modal Nota de Crédito (NC)
  const [facturaParaNC, setFacturaParaNC] = useState<MovimientoFactura | null>(null);
  const [montoNC, setMontoNC] = useState<number>(0);
  const [motivoNC, setMotivoNC] = useState<string>("");
  const [arcaNC, setArcaNC] = useState<string>("");
  const [guardandoNC, setGuardandoNC] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    const { data: dataDeals, error: errDeals } = await supabase.from('deals').select(`
      *,
      cliente:clientes!cliente_id(*),
      catalogo:catalogo(*),
      vendedor:usuarios!vendedor_id(*)
    `).order('created_at', { ascending: false });

    const { data: dataMovs, error: errMovs } = await supabase
      .from('facturas_movimientos')
      .select('*')
      .order('fecha_facturacion', { ascending: false });

    if (dataDeals) {
      const formattedDeals: Deal[] = dataDeals.map((d: any) => ({
        ...d,
        monto_facturado: d.monto_facturado || (d.stage === 'FACTURADO' ? d.amount : 0)
      }));
      setDeals(formattedDeals);

      if (!mesCierreSeleccionado) {
        const hoy = new Date();
        const keyMesActual = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}`;
        setMesCierreSeleccionado(keyMesActual);
      }
    } else if (errDeals) {
      console.error(errDeals);
    }

    if (dataMovs) {
      setMovimientos(dataMovs as MovimientoFactura[]);
    } else if (errMovs) {
      console.error("Error cargando movimientos:", errMovs);
    }

    setLoading(false);
  };

  const handleAjustarMontoFacturadoDirecto = async (deal: Deal) => {
    const actual = deal.monto_facturado || 0;
    const nuevoMontoStr = window.prompt(
      `Reajustar acumulado facturado histórico para "${deal.titulo}"\n(Contrato Total: $${deal.amount.toLocaleString()}):\n\nIngresa el nuevo acumulado total facturado:`,
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
      fetchData();
    } catch (err: any) {
      console.error("Error al reajustar facturación:", err);
      alert(`Error al guardar el ajuste: ${err.message}`);
    }
  };

  // Cálculo del prorrateo proyectado
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

  // Lista única de empresas para el desplegable de clientes
  const listaEmpresasUnicas = useMemo(() => {
    const nombres = deals
      .map(d => d.cliente?.nombre)
      .filter((nombre): nombre is string => !!nombre && nombre.trim().length > 0);
    return Array.from(new Set(nombres)).sort((a, b) => a.localeCompare(b));
  }, [deals]);

  // KPIs GLOBALES (Regulares excluyen reclasificados por defecto contable)
  const totalContratado = deals.filter(d => d.stage !== 'PERDIDO' && !d.es_reclasificado).reduce((sum, d) => sum + Number(d.amount), 0);
  const totalFacturadoReal = deals.filter(d => d.stage !== 'PERDIDO' && !d.es_reclasificado).reduce((sum, d) => sum + Number(d.monto_facturado || 0), 0);
  const totalPendienteFacturar = Math.max(0, totalContratado - totalFacturadoReal);

  // KPIs DEL MES SELECCIONADO
  const movimientosDelMesSeleccionado = movimientos.filter(m => m.periodo_mes === mesCierreSeleccionado);
  const movimientosActivosMes = movimientosDelMesSeleccionado.filter(m => m.estado === 'EMITIDA');
  
  const facturadoEnMes = movimientosActivosMes.reduce((sum, m) => sum + Number(m.monto), 0);
  const cantidadFacturasMes = movimientosActivosMes.filter(m => m.monto > 0).length;

  const obtenerNombreMesFormateado = (claveMes: string) => {
    const item = listaProyeccionMensual.find(m => m.clave === claveMes);
    if (item) return item.nombreMes;
    if (!claveMes) return "";
    const [anio, mes] = claveMes.split('-');
    const fechaObj = new Date(Number(anio), Number(mes) - 1, 1);
    const nombre = fechaObj.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });
    return nombre.charAt(0).toUpperCase() + nombre.slice(1);
  };

  const hoyStr = new Date().toISOString().split('T')[0];
  const mesActualKey = hoyStr.substring(0, 7);

  // Deals procesados con cálculo por mes
  const dealsConProrrateoDelMes = useMemo(() => {
    return deals
      .filter(d => d.stage !== 'PERDIDO')
      .map(deal => {
        const mFacturado = deal.monto_facturado || 0;
        const mPendiente = Math.max(0, deal.amount - mFacturado);

        const desglose = calcularProrrateoPorDias(deal.fecha_desde, deal.fecha_hasta, deal.amount, 0);
        const itemMes = desglose.find(m => m.mesClave === mesCierreSeleccionado);
        
        const montoProrrateadoMes = itemMes ? itemMes.montoTotal : 0;
        
        const facturasDelDealEnMes = movimientos.filter(
          m => m.deal_id === deal.id && m.periodo_mes === mesCierreSeleccionado && m.estado === 'EMITIDA'
        );
        const montoYaFacturadoEnMes = facturasDelDealEnMes.reduce((sum, m) => sum + Number(m.monto), 0);
        
        const saldoSugeridoMes = Math.max(0, montoProrrateadoMes - montoYaFacturadoEnMes);

        const esVencidoGlobal = !!(deal.fecha_hasta && deal.fecha_hasta < hoyStr && mPendiente > 0);
        const esMesVencido = mesCierreSeleccionado < mesActualKey && montoProrrateadoMes > 0 && (montoYaFacturadoEnMes < montoProrrateadoMes);
        const esVencido = esVencidoGlobal || esMesVencido;

        return {
          ...deal,
          mFacturado,
          mPendiente,
          montoProrrateadoMes,
          montoYaFacturadoEnMes,
          saldoSugeridoMes,
          facturasDelDealEnMes,
          esVencido,
          activaEnMesSeleccionado: montoProrrateadoMes > 0
        };
      });
  }, [deals, movimientos, mesCierreSeleccionado, mesActualKey, hoyStr]);

  // FILTRADO DINÁMICO Y ORDENAMIENTO DE LA TABLA
  const dealsTablaFiltrados = useMemo(() => {
    let filtrados = dealsConProrrateoDelMes.filter(deal => {
      // 1. Filtro de Reclasificación
      if (filtroReclasificado === 'REGULARES' && deal.es_reclasificado) return false;
      if (filtroReclasificado === 'RECLASIFICADOS' && !deal.es_reclasificado) return false;

      // 2. Filtro solo activas o con deuda en el mes
      if (soloActivasEnMes && !deal.activaEnMesSeleccionado && !deal.esVencido) return false;

      // 3. Filtro por Empresa
      if (filtroEmpresa !== 'TODAS' && deal.cliente?.nombre !== filtroEmpresa) return false;

      // 4. Filtro por Canal / Vertical
      if (filtroCanal !== 'TODOS' && deal.channel !== filtroCanal) return false;

      // 5. Buscador predictivo por texto
      if (filtroBusqueda.trim()) {
        const textoBusqueda = filtroBusqueda.toLowerCase();
        const coincideCliente = deal.cliente?.nombre?.toLowerCase().includes(textoBusqueda);
        const coincideTitulo = deal.titulo?.toLowerCase().includes(textoBusqueda);
        if (!coincideCliente && !coincideTitulo) return false;
      }

      return true;
    });

    // Aplicar ordenamiento
    switch (ordenSeleccionado) {
      case 'MONTO_DESC':
        filtrados.sort((a, b) => Number(b.amount) - Number(a.amount));
        break;
      case 'MONTO_ASC':
        filtrados.sort((a, b) => Number(a.amount) - Number(b.amount));
        break;
      case 'SALDO_MES_DESC':
        filtrados.sort((a, b) => Number(b.saldoSugeridoMes) - Number(a.saldoSugeridoMes));
        break;
      case 'SALDO_MES_ASC':
        filtrados.sort((a, b) => Number(a.saldoSugeridoMes) - Number(b.saldoSugeridoMes));
        break;
      default:
        // 'DEFECTO' mantiene el orden recibido de la consulta Supabase
        break;
    }

    return filtrados;
  }, [dealsConProrrateoDelMes, filtroReclasificado, soloActivasEnMes, filtroEmpresa, filtroCanal, filtroBusqueda, ordenSeleccionado]);

  // TOTALES DINÁMICOS DE LA TABLA FILTRADA
  const totalesFiltrados = useMemo(() => {
    return dealsTablaFiltrados.reduce(
      (acc, d) => ({
        totalContratado: acc.totalContratado + Number(d.amount || 0),
        totalTeoricoMes: acc.totalTeoricoMes + Number(d.montoProrrateadoMes || 0),
        totalYaEmitidoMes: acc.totalYaEmitidoMes + Number(d.montoYaFacturadoEnMes || 0),
        totalSaldoMes: acc.totalSaldoMes + Number(d.saldoSugeridoMes || 0),
        totalPendienteGral: acc.totalPendienteGral + Number(d.mPendiente || 0),
      }),
      { totalContratado: 0, totalTeoricoMes: 0, totalYaEmitidoMes: 0, totalSaldoMes: 0, totalPendienteGral: 0 }
    );
  }, [dealsTablaFiltrados]);

  const handlePrepararCierreMes = () => {
    if (!mesCierreSeleccionado) return;

    const itemsProcesados: ItemCierreMes[] = [];
    const [year, month] = mesCierreSeleccionado.split('-');
    const shortYear = year.slice(-2);

    dealsConProrrateoDelMes.forEach(deal => {
      if (!deal.es_reclasificado && deal.mPendiente > 0 && (deal.montoProrrateadoMes > 0 || deal.esVencido)) {
        
        const sugMontoMes = Math.min(deal.mPendiente, deal.saldoSugeridoMes > 0 ? deal.saldoSugeridoMes : deal.mPendiente);

        // Enumeración automática de la leyenda SAP
        const facturasPreviasFC = deal.facturasDelDealEnMes.filter(m => m.monto > 0);
        const prevCount = facturasPreviasFC.length;
        const leyendaBase = `RM-${deal.channel || 'Digital'}-${month}-${shortYear}`;
        const leyendaSugerida = prevCount === 0 ? leyendaBase : `${leyendaBase} (${prevCount + 1})`;

        itemsProcesados.push({
          dealId: deal.id,
          clienteNombre: deal.cliente?.nombre || 'Sin Cliente',
          dealTitulo: deal.titulo || 'Sin Título',
          canal: deal.channel || 'Digital',
          montoTotalAcuerdo: deal.amount,
          montoFacturadoActual: deal.mFacturado,
          montoPendienteGlobal: deal.mPendiente,
          montoProrrateadoMes: deal.montoProrrateadoMes,
          montoYaFacturadoEnMes: deal.montoYaFacturadoEnMes,
          saldoSugeridoMes: deal.saldoSugeridoMes,
          montoAFacturarEditado: sugMontoMes,
          leyendaEditada: leyendaSugerida,
          seleccionado: sugMontoMes > 0,
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

  const handleEditLeyendaFacturar = (dealId: number, nuevaLeyenda: string) => {
    setItemsCierre(prev => prev.map(item => 
      item.dealId === dealId ? { ...item, leyendaEditada: nuevaLeyenda } : item
    ));
  };

  const handleToggleSeleccionarTodos = (marcar: boolean) => {
    setItemsCierre(prev => prev.map(item => ({ ...item, seleccionado: marcar })));
  };

  const generarExcel = (movimientosGenerados: (ItemCierreMes & { nroFacturaInterna: string })[]) => {
    const [year, month] = mesCierreSeleccionado.split('-');
    const shortYear = year.slice(-2);
    const nombreMesYAnio = obtenerNombreMesFormateado(mesCierreSeleccionado);
    const fechaDeHoy = new Date().toLocaleDateString('es-AR');
    
    const asignacionCounter: Record<string, number> = {};

    const excelData: any[][] = [
      ['', `FACTURAS ${nombreMesYAnio} (v.1)`], 
      [], 
      [
        '', 
        'Cliente', 
        'Nro de Proveedor', 
        'Leyenda', 
        'Importe', 
        'Asignacion', 
        'Material', 
        'centro de costo', 
        '', 
        'FECHA DE FACTURACIÓN', 
        'FACTURA', 
        'ORDEN DE COMPRA', 
        'OC', 
        'FACTURACION TOTAL', 
        'IIBB'
      ]
    ];

    movimientosGenerados.forEach(item => {
      if (!asignacionCounter[item.clienteNombre]) {
        asignacionCounter[item.clienteNombre] = 1;
      } else {
        asignacionCounter[item.clienteNombre]++;
      }
      const asignacion = asignacionCounter[item.clienteNombre];
      
      const esDigital = item.canal === 'Digital' || item.canal === 'Omnicanal';
      const material = esDigital ? 703 : '';
      const cdc = esDigital ? 9940 : '';

      excelData.push([
        '',
        item.clienteNombre,
        '',
        item.leyendaEditada,
        item.montoAFacturarEditado,
        asignacion,
        material,
        cdc,
        '', 
        fechaDeHoy,
        item.nroFacturaInterna,
        '',
        '',
        '',
        ''
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(excelData);
    
    ws['!cols'] = [
      { wch: 3 },
      { wch: 35 },
      { wch: 18 },
      { wch: 30 },
      { wch: 15 },
      { wch: 12 },
      { wch: 10 },
      { wch: 18 },
      { wch: 5 },
      { wch: 22 },
      { wch: 18 },
      { wch: 22 },
      { wch: 10 },
      { wch: 22 },
      { wch: 10 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Cierre_${month}_${shortYear}`);
    XLSX.writeFile(wb, `Lote_Facturacion_${month}_${year}.xlsx`);
  };

  const handleConfirmarCierreMes = async () => {
    const seleccionados = itemsCierre.filter(i => i.seleccionado && i.montoAFacturarEditado > 0);
    if (seleccionados.length === 0) {
      alert("Selecciona al menos un acuerdo con un monto mayor a 0 para facturar.");
      return;
    }

    setGuardandoCierre(true);
    try {
      const movimientosAInsertar = seleccionados.map(item => ({
        deal_id: item.dealId,
        deal_titulo: item.dealTitulo,
        periodo_mes: mesCierreSeleccionado,
        monto: item.montoAFacturarEditado,
        observaciones: item.leyendaEditada,
        estado: 'EMITIDA'
      }));

      const { data: movimientosInsertados, error: errInsert } = await supabase
        .from('facturas_movimientos')
        .insert(movimientosAInsertar)
        .select();

      if (errInsert) {
        throw new Error(errInsert.message || errInsert.details || "Error al insertar en facturas_movimientos");
      }

      // Actualizar el acumulado global en la tabla `deals`
      for (const item of seleccionados) {
        const nuevoMontoFacturado = item.montoFacturadoActual + item.montoAFacturarEditado;
        let nuevaEtapa = 'POR_FACTURAR';
        
        if (nuevoMontoFacturado >= item.montoTotalAcuerdo) {
          nuevaEtapa = 'FACTURADO';
        }

        const { error: errUpdate } = await supabase
          .from('deals')
          .update({
            monto_facturado: nuevoMontoFacturado,
            stage: nuevaEtapa
          })
          .eq('id', item.dealId);

        if (errUpdate) console.error(`Error actualizando deal ${item.dealId}`, errUpdate);
      }

      const listaParaExcel = seleccionados.map(item => {
        const movGuardado = movimientosInsertados?.find((m: any) => m.deal_id === item.dealId && m.monto === item.montoAFacturarEditado);
        return {
          ...item,
          nroFacturaInterna: movGuardado?.numero_factura_interna || 'S/N'
        };
      });

      generarExcel(listaParaExcel);

      alert(`¡Cierre de mes procesado exitosamente! Se generaron ${seleccionados.length} facturas y se descargó el Excel.`);
      setIsModalCierreOpen(false);
      fetchData();
    } catch (error: any) {
      console.error("Error al procesar cierre masivo:", error);
      const detalleError = error?.message || error?.error_description || (typeof error === 'object' ? JSON.stringify(error) : String(error));
      alert(`Hubo un error al guardar el cierre de mes: ${detalleError}`);
    } finally {
      setGuardandoCierre(false);
    }
  };

  // Abrir popup de edición de comprobante
  const handleAbrirEdicionComprobante = (mov: MovimientoFactura) => {
    setComprobanteAEditar(mov);
    setEditMontoComprobante(mov.monto);
    setEditLeyendaComprobante(mov.observaciones || "");
    setEditArcaComprobante(mov.id_factura_arca || "");
  };

  const handleGuardarEdicionComprobante = async () => {
    if (!comprobanteAEditar) return;
    if (isNaN(editMontoComprobante) || editMontoComprobante === 0) {
      alert("Por favor ingresa un monto válido diferente de 0.");
      return;
    }

    setGuardandoEdicionComprobante(true);
    try {
      const diferenciaMonto = editMontoComprobante - comprobanteAEditar.monto;

      const { error: errUpdateMov } = await supabase
        .from('facturas_movimientos')
        .update({
          monto: editMontoComprobante,
          observaciones: editLeyendaComprobante,
          id_factura_arca: editArcaComprobante.trim() || null
        })
        .eq('id', comprobanteAEditar.id);

      if (errUpdateMov) throw new Error(errUpdateMov.message || "Error al actualizar comprobante");

      const dealAsociado = deals.find(d => d.id === comprobanteAEditar.deal_id);
      if (dealAsociado && comprobanteAEditar.estado === 'EMITIDA') {
        const nuevoAcumulado = Math.max(0, (dealAsociado.monto_facturado || 0) + diferenciaMonto);
        let nuevaEtapa = 'POR_FACTURAR';
        if (nuevoAcumulado >= dealAsociado.amount) {
          nuevaEtapa = 'FACTURADO';
        }

        const { error: errUpdateDeal } = await supabase
          .from('deals')
          .update({
            monto_facturado: nuevoAcumulado,
            stage: nuevaEtapa
          })
          .eq('id', dealAsociado.id);

        if (errUpdateDeal) console.error("Error al actualizar deal acumulado:", errUpdateDeal);
      }

      alert("¡Comprobante actualizado exitosamente!");
      setComprobanteAEditar(null);
      fetchData();
    } catch (err: any) {
      console.error("Error al actualizar comprobante:", err);
      const detalleError = err?.message || (typeof err === 'object' ? JSON.stringify(err) : String(err));
      alert(`Error al guardar los cambios: ${detalleError}`);
    } finally {
      setGuardandoEdicionComprobante(false);
    }
  };

  // Anulación Directa
  const handleAnularComprobante = async (mov: MovimientoFactura) => {
    const confirmacion = window.confirm(
      `¿Estás seguro de anular el comprobante ${mov.numero_factura_interna}?\n\nEsta acción revertirá su impacto económico ($${Math.abs(mov.monto).toLocaleString()}) y lo marcará como ANULADO en el historial.`
    );
    if (!confirmacion) return;

    try {
      const { error: errUpdateMov } = await supabase
        .from('facturas_movimientos')
        .update({ estado: 'ANULADA' })
        .eq('id', mov.id);

      if (errUpdateMov) throw errUpdateMov;

      const dealAsociado = deals.find(d => d.id === mov.deal_id);
      if (dealAsociado) {
        const nuevoAcumulado = Math.max(0, (dealAsociado.monto_facturado || 0) - Number(mov.monto));
        let nuevaEtapa = 'POR_FACTURAR';
        if (nuevoAcumulado >= dealAsociado.amount) {
          nuevaEtapa = 'FACTURADO';
        }

        const { error: errUpdateDeal } = await supabase
          .from('deals')
          .update({
            monto_facturado: nuevoAcumulado,
            stage: nuevaEtapa
          })
          .eq('id', dealAsociado.id);

        if (errUpdateDeal) console.error("Error al revertir saldo en deal:", errUpdateDeal);
      }

      alert(`¡Comprobante ${mov.numero_factura_interna} anulado con éxito!`);
      fetchData();
    } catch (err: any) {
      console.error("Error al anular comprobante:", err);
      alert(`Hubo un error al anular: ${err.message || err}`);
    }
  };

  // Emisión de Nota de Crédito (NC)
  const handleAbrirModalNC = (factura: MovimientoFactura) => {
    setFacturaParaNC(factura);
    setMontoNC(factura.monto);
    setMotivoNC(`NC s/ ${factura.numero_factura_interna} - ${factura.observaciones || 'Ajuste comercial'}`);
    setArcaNC("");
  };

  const handleGuardarNC = async () => {
    if (!facturaParaNC) return;
    if (isNaN(montoNC) || montoNC <= 0) {
      alert("Por favor ingresa un monto a acreditar válido y mayor a 0.");
      return;
    }
    if (montoNC > facturaParaNC.monto) {
      alert(`El monto de la Nota de Crédito no puede superar el total de la factura ($${facturaParaNC.monto.toLocaleString()}).`);
      return;
    }

    setGuardandoNC(true);
    try {
      const { error: errInsertNC } = await supabase
        .from('facturas_movimientos')
        .insert([{
          deal_id: facturaParaNC.deal_id,
          deal_titulo: facturaParaNC.deal_titulo,
          periodo_mes: mesCierreSeleccionado,
          monto: -Math.abs(montoNC),
          observaciones: motivoNC,
          id_factura_arca: arcaNC.trim() || null,
          estado: 'EMITIDA'
        }]);

      if (errInsertNC) throw errInsertNC;

      const dealAsociado = deals.find(d => d.id === facturaParaNC.deal_id);
      if (dealAsociado) {
        const nuevoAcumulado = Math.max(0, (dealAsociado.monto_facturado || 0) - Math.abs(montoNC));
        let nuevaEtapa = 'POR_FACTURAR';
        if (nuevoAcumulado >= dealAsociado.amount) {
          nuevaEtapa = 'FACTURADO';
        }

        const { error: errUpdateDeal } = await supabase
          .from('deals')
          .update({
            monto_facturado: nuevoAcumulado,
            stage: nuevaEtapa
          })
          .eq('id', dealAsociado.id);

        if (errUpdateDeal) console.error("Error al aplicar NC a deal:", errUpdateDeal);
      }

      alert("¡Nota de Crédito emitida y asentada exitosamente!");
      setFacturaParaNC(null);
      fetchData();
    } catch (err: any) {
      console.error("Error al emitir NC:", err);
      alert(`Hubo un error al emitir la Nota de Crédito: ${err.message || err}`);
    } finally {
      setGuardandoNC(false);
    }
  };

  // Exportar reporte Excel de Comprobantes emitidos del período
  const handleExportarExcelComprobantes = () => {
    if (movimientosDelMesSeleccionado.length === 0) {
      alert("No hay comprobantes para exportar en el período seleccionado.");
      return;
    }

    const dataExcel: any[][] = [
      ['Reporte de Comprobantes Emitidos', `Período: ${obtenerNombreMesFormateado(mesCierreSeleccionado)}`],
      ['Fecha de Descarga:', new Date().toLocaleDateString('es-AR')],
      [],
      ['N° Comprobante', 'Tipo', 'Estado', 'ID ARCA', 'Acuerdo / Campaña', 'Leyenda / Motivo', 'Monto Neto (ARS)', 'Fecha Emisión']
    ];

    movimientosDelMesSeleccionado.forEach(m => {
      const esNC = Number(m.monto) < 0;
      dataExcel.push([
        m.numero_factura_interna,
        esNC ? 'Nota de Crédito' : 'Factura',
        m.estado,
        m.id_factura_arca || '-',
        m.deal_titulo,
        m.observaciones || '-',
        Number(m.monto),
        m.fecha_facturacion ? new Date(m.fecha_facturacion).toLocaleDateString('es-AR') : '-'
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(dataExcel);
    ws['!cols'] = [
      { wch: 18 }, // N° Comprobante
      { wch: 16 }, // Tipo
      { wch: 12 }, // Estado
      { wch: 18 }, // ID ARCA
      { wch: 30 }, // Campaña
      { wch: 30 }, // Leyenda
      { wch: 18 }, // Monto
      { wch: 15 }  // Fecha
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Comprobantes_${mesCierreSeleccionado}`);
    XLSX.writeFile(wb, `Reporte_Comprobantes_${mesCierreSeleccionado}.xlsx`);
  };

  const totalProcesandoEnModal = itemsCierre
    .filter(i => i.seleccionado)
    .reduce((acc, i) => acc + (Number(i.montoAFacturarEditado) || 0), 0);

  return (
    <div className="w-full h-full flex flex-col gap-6 p-8 text-white overflow-y-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Módulo de Facturación</h1>
        <p className="text-slate-400 text-sm mt-1">Cierre de mes loteado, imputaciones contables, filtros avanzados y control de deuda.</p>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-cyan-400 font-semibold animate-pulse">Sincronizando estado financiero...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 animate-fade-in">
          
          {/* ROW 1: KPIs GLOBALES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Monto Total Contratado (Histórico)</p>
              <h3 className="text-3xl font-extrabold text-white">${totalContratado.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
            </div>
            <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Facturado Histórico</p>
              <h3 className="text-3xl font-extrabold text-emerald-400">${totalFacturadoReal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
            </div>
            <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Deuda Histórica Pendiente</p>
              <h3 className="text-3xl font-extrabold text-amber-400">${totalPendienteFacturar.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
            </div>
          </div>

          {/* ROW 2: KPIs DEL PERÍODO ACTUAL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-950/30 border border-indigo-500/20 p-5 rounded-2xl backdrop-blur-md flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                <span className="material-symbols-outlined text-indigo-400 text-2xl">receipt_long</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-0.5">Emisiones Activas en {obtenerNombreMesFormateado(mesCierreSeleccionado)}</p>
                <h3 className="text-2xl font-extrabold text-indigo-400">{cantidadFacturasMes} comprobantes</h3>
              </div>
            </div>
            <div className="bg-emerald-950/20 border border-emerald-500/20 p-5 rounded-2xl backdrop-blur-md flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                <span className="material-symbols-outlined text-emerald-400 text-2xl">account_balance_wallet</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-0.5">Ingreso Neto Facturado en {obtenerNombreMesFormateado(mesCierreSeleccionado)}</p>
                <h3 className="text-2xl font-extrabold text-emerald-400">${facturadoEnMes.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
              </div>
            </div>
          </div>

          <section className="bg-slate-900/60 border border-white/10 rounded-xl p-6 backdrop-blur-md space-y-5">
            {/* CABECERA PRINCIPAL Y SELECTOR DE PERÍODO */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-700/60 pb-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-400 text-3xl">fact_check</span>
                <div>
                  <h2 className="text-xl font-bold text-white">Auditoría y Cierre de Mes</h2>
                  <p className="text-xs text-slate-400">Filtra por empresa, canal o monto y liquida acuerdos por lote.</p>
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
                      {m.nombreMes} (Proyectado: ${m.total.toLocaleString(undefined, { maximumFractionDigits: 0 })})
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setIsModalComprobantesOpen(true)}
                  className="bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 font-bold px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 text-sm cursor-pointer shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  Ver Comprobantes del Mes ({movimientosDelMesSeleccionado.length})
                </button>

                <button
                  onClick={handlePrepararCierreMes}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(52,211,153,0.2)] text-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">payments</span>
                  Ejecutar Cierre de Mes
                </button>
              </div>
            </div>

            {/* BARRA DE FILTROS AVANZADOS Y ORDEN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {/* 1. Buscador */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Buscar Campaña / Cliente</label>
                <div className="relative">
                  <input
                    type="text"
                    value={filtroBusqueda}
                    onChange={(e) => setFiltroBusqueda(e.target.value)}
                    placeholder="Escribe para filtrar..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 pl-8"
                  />
                  <span className="material-symbols-outlined text-slate-500 text-sm absolute left-2.5 top-2.5">search</span>
                </div>
              </div>

              {/* 2. Filtro por Empresa */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Empresa / Cliente</label>
                <select
                  value={filtroEmpresa}
                  onChange={(e) => setFiltroEmpresa(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-400"
                >
                  <option value="TODAS">Todas las Empresas ({listaEmpresasUnicas.length})</option>
                  {listaEmpresasUnicas.map(emp => (
                    <option key={emp} value={emp}>{emp}</option>
                  ))}
                </select>
              </div>

              {/* 3. Filtro por Canal / Vertical */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Canal / Vertical</label>
                <select
                  value={filtroCanal}
                  onChange={(e) => setFiltroCanal(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-400"
                >
                  <option value="TODOS">Todos los Canales</option>
                  <option value="Digital">Digital</option>
                  <option value="InStore">InStore</option>
                  <option value="Omnicanal">Omnicanal</option>
                </select>
              </div>

              {/* 4. Filtro de Reclasificación */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Régimen Contable</label>
                <select
                  value={filtroReclasificado}
                  onChange={(e) => setFiltroReclasificado(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-400"
                >
                  <option value="REGULARES">Solo Regulares (Excluye Reclasif.)</option>
                  <option value="RECLASIFICADOS">Solo Reclasificados</option>
                  <option value="TODOS">Todos los Acuerdos</option>
                </select>
              </div>

              {/* 5. Ordenamiento */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Ordenar Por</label>
                <select
                  value={ordenSeleccionado}
                  onChange={(e) => setOrdenSeleccionado(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-semibold rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-400"
                >
                  <option value="DEFECTO">Por defecto (Cronológico)</option>
                  <option value="MONTO_DESC">Mayor Monto Contratado ($)</option>
                  <option value="MONTO_ASC">Menor Monto Contratado ($)</option>
                  <option value="SALDO_MES_DESC">Mayor Deuda / Saldo en Mes ($)</option>
                  <option value="SALDO_MES_ASC">Menor Deuda / Saldo en Mes ($)</option>
                </select>
              </div>
            </div>

            {/* FILTRO VIGENCIA Y RESUMEN DINÁMICO */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs bg-slate-800/40 px-4 py-2.5 rounded-lg border border-slate-800">
              <label className="flex items-center gap-2 text-slate-300 hover:text-white cursor-pointer font-medium">
                <input 
                  type="checkbox" 
                  checked={soloActivasEnMes} 
                  onChange={(e) => setSoloActivasEnMes(e.target.checked)}
                  className="rounded border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-400"
                />
                <span>Ver solo campañas con vigencia o deuda en <strong className="text-cyan-400">{obtenerNombreMesFormateado(mesCierreSeleccionado)}</strong></span>
              </label>

              {/* BARRA DE TOTALES DINÁMICOS FILTRADOS */}
              <div className="flex flex-wrap items-center gap-3 font-mono text-slate-300">
                <span>Acuerdos: <strong className="text-white">{dealsTablaFiltrados.length}</strong></span>
                <span className="text-slate-600">|</span>
                <span>Contratado: <strong className="text-white">${totalesFiltrados.totalContratado.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong></span>
                <span className="text-slate-600">|</span>
                <span>Saldo Mes: <strong className="text-cyan-400">${totalesFiltrados.totalSaldoMes.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong></span>
              </div>
            </div>

            {/* CONTENEDOR CON SCROLL Y ENCABEZADOS FIJOS (STICKY HEADER) */}
            <div className="max-h-[580px] overflow-y-auto relative rounded-lg border border-slate-700/60 shadow-inner">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-[11px] text-slate-300 uppercase tracking-wider bg-slate-950 sticky top-0 z-20 shadow-md">
                  <tr>
                    <th className="px-4 py-3.5 bg-slate-950">Cliente / Campaña</th>
                    <th className="px-4 py-3.5 bg-slate-950">Vigencia</th>
                    <th className="px-4 py-3.5 bg-slate-950 text-center">Canal</th>
                    <th className="px-4 py-3.5 bg-slate-950 text-right">Contrato Total</th>
                    <th className="px-4 py-3.5 bg-slate-950 text-right text-indigo-300">Porción Teórica Mes</th>
                    <th className="px-4 py-3.5 bg-slate-950 text-right text-emerald-400">Ya emitido Mes</th>
                    <th className="px-4 py-3.5 bg-slate-950 text-right text-cyan-400">Deuda / Saldo Mes</th>
                    <th className="px-4 py-3.5 bg-slate-950 text-right">Saldo Gral</th>
                    <th className="px-4 py-3.5 bg-slate-950 text-center">Estado Gral</th>
                    <th className="px-4 py-3.5 bg-slate-950 text-center">Ajuste</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {dealsTablaFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="px-4 py-10 text-center text-slate-500 text-xs italic bg-slate-900/40">
                        No se encontraron acuerdos con los filtros aplicados para {obtenerNombreMesFormateado(mesCierreSeleccionado)}.
                      </td>
                    </tr>
                  ) : (
                    dealsTablaFiltrados.map(deal => {
                      const pct = deal.amount > 0 ? Math.min(100, Math.round((deal.mFacturado / deal.amount) * 100)) : 0;
                      return (
                        <tr 
                          key={deal.id} 
                          className={`transition-colors ${
                            deal.esVencido 
                              ? 'bg-rose-950/20 border-l-4 border-l-rose-500 hover:bg-rose-900/30' 
                              : deal.es_reclasificado 
                                ? 'bg-amber-950/20 border-l-4 border-l-amber-500 hover:bg-amber-900/30' 
                                : 'hover:bg-slate-800/40'
                          }`}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white block">{deal.cliente?.nombre}</span>
                              {deal.es_reclasificado && (
                                <span className="bg-amber-500/20 text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30">
                                  Reclasificado
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 truncate max-w-[220px] block">{deal.titulo}</span>
                          </td>
                          <td className="px-4 py-3 text-[10px] text-slate-400 whitespace-nowrap">{deal.fecha_desde} al {deal.fecha_hasta}</td>
                          <td className="px-4 py-3 text-center">
                            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-semibold border border-slate-700">
                              {deal.channel || 'Digital'}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-mono text-right text-white font-semibold">${deal.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                          
                          <td className="px-4 py-3 font-mono text-right font-medium text-indigo-300 bg-indigo-950/10">
                            ${deal.montoProrrateadoMes.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </td>

                          <td className="px-4 py-3 font-mono text-right font-bold text-emerald-400 bg-emerald-950/10">
                            ${deal.montoYaFacturadoEnMes.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </td>

                          <td className="px-4 py-3 font-mono text-right font-bold text-cyan-400 bg-cyan-950/20">
                            ${deal.saldoSugeridoMes.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </td>
                          
                          <td className={`px-4 py-3 font-mono text-right font-semibold ${deal.esVencido ? 'text-rose-400 font-extrabold' : 'text-amber-400'}`}>
                            ${deal.mPendiente.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </td>
                          
                          <td className="px-4 py-3 text-center">
                            {deal.esVencido ? (
                              <span className="inline-block bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                                  En Mora / Vencido
                              </span>
                            ) : (
                              <div className="flex flex-col items-center justify-center gap-1 w-full">
                                <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                  <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${pct}%` }}></div>
                                </div>
                                <span className="text-[9px] font-bold text-slate-300">{pct}%</span>
                              </div>
                            )}
                          </td>
                          
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => handleAjustarMontoFacturadoDirecto(deal)}
                              className="bg-slate-800 hover:bg-cyan-500 hover:text-slate-900 border border-slate-600 text-cyan-400 text-[10px] font-bold px-2 py-1 rounded transition-all flex items-center gap-1 mx-auto"
                              title="Ajustar manualmente el acumulado histórico global"
                            >
                              <span className="material-symbols-outlined text-[12px]">edit_note</span>
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

      {/* MODAL 1: CONFIRMACIÓN Y CIERRE DE MES (LOTE) */}
      {isModalCierreOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalCierreOpen(false)}></div>
          
          <div className="bg-slate-900 border border-white/20 rounded-xl shadow-2xl w-full max-w-6xl relative max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-slate-950">
              <div>
                <h3 className="font-bold text-xl text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400">task</span>
                  Confirmación de Lote a Emitir: {obtenerNombreMesFormateado(mesCierreSeleccionado)}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Revisa o edita los montos y la leyenda de SAP. Se creará una factura con número correlativo único por cada fila marcada.
                </p>
              </div>
              <button onClick={() => setIsModalCierreOpen(false)} className="text-slate-400 hover:text-white"><span className="material-symbols-outlined">close</span></button>
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
                <thead className="text-[10px] text-slate-400 uppercase bg-slate-950/80 sticky top-0 z-10 shadow-md">
                  <tr>
                    <th className="p-3 w-10 text-center">Incluir</th>
                    <th className="p-3">Cliente / Acuerdo</th>
                    <th className="p-3 text-right">Contrato Total</th>
                    <th className="p-3 text-right text-indigo-300">Ya facturado Mes</th>
                    <th className="p-3 text-right text-emerald-400">Saldo/Sugerido Mes</th>
                    <th className="p-3 text-center w-48">Leyenda SAP (Editable)</th>
                    <th className="p-3 text-center w-48 bg-slate-950">Monto a Facturar Hoy ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {itemsCierre.map(item => (
                    <tr 
                      key={item.dealId} 
                      className={`transition-colors ${
                        !item.seleccionado 
                          ? 'opacity-40 bg-slate-950' 
                          : item.esVencido 
                            ? 'bg-rose-950/20 border-l-4 border-l-rose-500' 
                            : 'bg-slate-800/30 hover:bg-slate-800/60'
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
                            <span className="text-[9px] bg-rose-500/20 text-rose-400 font-bold px-1.5 py-0.5 rounded border border-rose-500/30">
                              En Mora
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 truncate max-w-[200px] block">{item.dealTitulo}</span>
                      </td>
                      <td className="p-3 text-right font-mono text-slate-400 text-xs">${item.montoTotalAcuerdo.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                      <td className="p-3 text-right font-mono text-indigo-400 text-xs">${item.montoYaFacturadoEnMes.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                      <td className="p-3 text-right font-mono text-emerald-400 text-xs">${item.saldoSugeridoMes.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                      
                      <td className="p-3 text-center">
                        <input 
                          type="text"
                          disabled={!item.seleccionado}
                          value={item.leyendaEditada}
                          onChange={(e) => handleEditLeyendaFacturar(item.dealId, e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-xs text-white focus:outline-none focus:border-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed font-mono"
                          placeholder="Ej: RM-Digital-10-26"
                        />
                      </td>

                      <td className="p-3 text-center bg-slate-950/50">
                        <input 
                          type="number"
                          min="0"
                          step="0.01"
                          disabled={!item.seleccionado}
                          value={item.montoAFacturarEditado}
                          onChange={(e) => handleEditMontoFacturar(item.dealId, parseFloat(e.target.value) || 0)}
                          className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-right font-bold text-emerald-400 text-sm focus:outline-none focus:border-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed shadow-inner"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t border-white/10 bg-slate-950 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase font-bold text-slate-400">Total Lote A Emitir:</span>
                <span className="text-3xl font-extrabold text-emerald-400 font-mono tracking-tight">
                  ${totalProcesandoEnModal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setIsModalCierreOpen(false)}
                  className="flex-1 md:flex-none px-5 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={guardandoCierre || totalProcesandoEnModal === 0}
                  onClick={handleConfirmarCierreMes}
                  className="flex-1 md:flex-none bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-6 py-2.5 rounded-lg text-sm transition-all shadow-[0_0_15px_rgba(52,211,153,0.3)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  {guardandoCierre ? "Procesando Emisión..." : "Confirmar Emisión y Descargar Excel"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: AUDITORÍA DE COMPROBANTES DEL MES */}
      {isModalComprobantesOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalComprobantesOpen(false)}></div>
          
          <div className="bg-slate-900 border border-white/20 rounded-xl shadow-2xl w-full max-w-6xl relative max-h-[85vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-slate-950">
              <div>
                <h3 className="font-bold text-xl text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-cyan-400">receipt_long</span>
                  Comprobantes del Período: {obtenerNombreMesFormateado(mesCierreSeleccionado)}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Gestiona facturas, genera Notas de Crédito compensatorias o anula comprobantes erróneos.
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* BOTÓN EXPORTAR REPORTE EXCEL DE COMPROBANTES */}
                <button
                  onClick={handleExportarExcelComprobantes}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 shadow-sm"
                  title="Exportar todos los comprobantes de este mes a Excel"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  Descargar Reporte Excel
                </button>
                <button onClick={() => setIsModalComprobantesOpen(false)} className="text-slate-400 hover:text-white">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {movimientosDelMesSeleccionado.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <span className="material-symbols-outlined text-4xl mb-2 opacity-50 block">inbox</span>
                  <p className="text-sm">No se han registrado movimientos en este mes todavía.</p>
                </div>
              ) : (
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="text-[10px] text-slate-400 uppercase bg-slate-950/80 sticky top-0 z-10">
                    <tr>
                      <th className="p-3">N° Comprobante</th>
                      <th className="p-3">Tipo / Estado</th>
                      <th className="p-3">ID ARCA</th>
                      <th className="p-3">Acuerdo / Campaña</th>
                      <th className="p-3">Leyenda / Motivo</th>
                      <th className="p-3 text-right">Monto (ARS)</th>
                      <th className="p-3 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {movimientosDelMesSeleccionado.map(mov => {
                      const esNC = Number(mov.monto) < 0;
                      const esAnulada = mov.estado === 'ANULADA';

                      return (
                        <tr 
                          key={mov.id} 
                          className={`transition-colors ${
                            esAnulada 
                              ? 'opacity-40 bg-slate-950 line-through' 
                              : esNC 
                                ? 'bg-purple-950/20 hover:bg-purple-900/30' 
                                : 'hover:bg-slate-800/30'
                          }`}
                        >
                          <td className="p-3 font-mono font-bold text-xs">
                            <span className={esNC ? 'text-purple-400' : 'text-cyan-400'}>
                              {mov.numero_factura_interna}
                            </span>
                          </td>
                          <td className="p-3">
                            {esAnulada ? (
                              <span className="bg-rose-500/20 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded border border-rose-500/30">
                                ANULADA
                              </span>
                            ) : esNC ? (
                              <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-500/30">
                                NOTA CRÉDITO
                              </span>
                            ) : (
                              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                                FACTURA
                              </span>
                            )}
                          </td>
                          <td className="p-3 font-mono text-xs text-slate-400">{mov.id_factura_arca || '-'}</td>
                          <td className="p-3 text-xs text-white font-medium">{mov.deal_titulo}</td>
                          <td className="p-3 font-mono text-xs text-slate-300 max-w-[200px] truncate">{mov.observaciones || '-'}</td>
                          
                          <td className={`p-3 text-right font-mono font-bold text-sm ${esNC ? 'text-purple-400' : 'text-emerald-400'}`}>
                            {esNC ? '-' : ''}${Math.abs(Number(mov.monto)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </td>

                          <td className="p-3 text-center">
                            {!esAnulada ? (
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => handleAbrirEdicionComprobante(mov)}
                                  className="bg-slate-800 hover:bg-cyan-500 hover:text-slate-900 text-cyan-400 p-1.5 rounded transition-all border border-slate-700"
                                  title="Editar comprobante"
                                >
                                  <span className="material-symbols-outlined text-[13px] block">edit</span>
                                </button>

                                {!esNC && (
                                  <button
                                    onClick={() => handleAbrirModalNC(mov)}
                                    className="bg-slate-800 hover:bg-purple-600 hover:text-white text-purple-400 p-1.5 rounded transition-all border border-slate-700"
                                    title="Emitir Nota de Crédito sobre esta factura"
                                  >
                                    <span className="material-symbols-outlined text-[13px] block">assignment_return</span>
                                  </button>
                                )}

                                <button
                                  onClick={() => handleAnularComprobante(mov)}
                                  className="bg-slate-800 hover:bg-rose-600 hover:text-white text-rose-400 p-1.5 rounded transition-all border border-slate-700"
                                  title="Anular comprobante"
                                >
                                  <span className="material-symbols-outlined text-[13px] block">cancel</span>
                                </button>
                              </div>
                            ) : (
                              <span className="text-[10px] text-slate-500 italic">Sin acciones</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-slate-950 flex justify-between items-center text-xs text-slate-400">
              <span>Total Comprobantes Activos: <strong>{cantidadFacturasMes}</strong></span>
              <span>Total Facturado Neto del Mes: <strong className="text-emerald-400 font-mono text-sm">${facturadoEnMes.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* POPUP SUB-MODAL 1: EDITAR COMPROBANTE INDIVIDUAL */}
      {comprobanteAEditar && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setComprobanteAEditar(null)}></div>
          
          <div className="bg-slate-900 border border-white/20 rounded-2xl shadow-2xl w-full max-w-md relative z-10 p-6 space-y-5">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <div>
                <h4 className="font-bold text-lg text-white">Editar Comprobante</h4>
                <p className="text-xs text-cyan-400 font-mono font-bold">{comprobanteAEditar.numero_factura_interna}</p>
              </div>
              <button onClick={() => setComprobanteAEditar(null)} className="text-slate-400 hover:text-white"><span className="material-symbols-outlined">close</span></button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 font-bold uppercase block mb-1">Acuerdo Asociado</label>
                <input 
                  type="text" 
                  value={comprobanteAEditar.deal_titulo} 
                  disabled 
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-slate-400 cursor-not-allowed" 
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold uppercase block mb-1">Monto ($) *</label>
                <input 
                  type="number" 
                  step="0.01" 
                  value={editMontoComprobante} 
                  onChange={(e) => setEditMontoComprobante(parseFloat(e.target.value) || 0)} 
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-emerald-400 font-mono font-bold text-base focus:outline-none focus:border-cyan-400" 
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  El acumulado del acuerdo se ajustará automáticamente por la diferencia.
                </span>
              </div>

              <div>
                <label className="text-slate-400 font-bold uppercase block mb-1">Leyenda / Motivo</label>
                <input 
                  type="text" 
                  value={editLeyendaComprobante} 
                  onChange={(e) => setEditLeyendaComprobante(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-white font-mono focus:outline-none focus:border-cyan-400" 
                  placeholder="Ej: RM-Digital-10-26"
                />
              </div>

              <div>
                <label className="text-slate-400 font-bold uppercase block mb-1">ID Factura ARCA / Oficial (Opcional)</label>
                <input 
                  type="text" 
                  value={editArcaComprobante} 
                  onChange={(e) => setEditArcaComprobante(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-white font-mono focus:outline-none focus:border-cyan-400" 
                  placeholder="Ej: 0001-00045812"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button 
                type="button" 
                onClick={() => setComprobanteAEditar(null)} 
                className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold"
              >
                Cancelar
              </button>
              <button 
                type="button" 
                disabled={guardandoEdicionComprobante} 
                onClick={handleGuardarEdicionComprobante} 
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-5 py-2 rounded-lg text-xs transition-colors disabled:opacity-50"
              >
                {guardandoEdicionComprobante ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP SUB-MODAL 2: EMITIR NOTA DE CRÉDITO (TOTAL O PARCIAL) */}
      {facturaParaNC && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setFacturaParaNC(null)}></div>
          
          <div className="bg-slate-900 border border-purple-500/40 rounded-2xl shadow-2xl w-full max-w-md relative z-10 p-6 space-y-5">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <div>
                <h4 className="font-bold text-lg text-purple-400 flex items-center gap-2">
                  <span className="material-symbols-outlined text-purple-400">assignment_return</span>
                  Emitir Nota de Crédito
                </h4>
                <p className="text-xs text-slate-400">
                  Aplicada sobre factura: <strong className="text-cyan-400 font-mono">{facturaParaNC.numero_factura_interna}</strong>
                </p>
              </div>
              <button onClick={() => setFacturaParaNC(null)} className="text-slate-400 hover:text-white"><span className="material-symbols-outlined">close</span></button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400 font-semibold">Total Factura Original:</span>
                <span className="font-mono font-bold text-white">${Number(facturaParaNC.monto).toLocaleString()}</span>
              </div>

              <div>
                <label className="text-slate-300 font-bold uppercase block mb-1">Monto a Acreditar (ARS) *</label>
                <input 
                  type="number" 
                  min="0.01"
                  max={facturaParaNC.monto}
                  step="0.01" 
                  value={montoNC} 
                  onChange={(e) => setMontoNC(parseFloat(e.target.value) || 0)} 
                  className="w-full bg-slate-950 border border-purple-500/50 rounded p-2.5 text-purple-300 font-mono font-bold text-base focus:outline-none focus:border-purple-400" 
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Puedes emitir una NC por el total o por un valor parcial.
                </span>
              </div>

              <div>
                <label className="text-slate-300 font-bold uppercase block mb-1">Motivo / Leyenda de la NC *</label>
                <input 
                  type="text" 
                  value={motivoNC} 
                  onChange={(e) => setMotivoNC(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-white font-mono focus:outline-none focus:border-purple-400" 
                  placeholder="Ej: Bonificación comercial sobre FC-..."
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold uppercase block mb-1">ID Nota de Crédito ARCA / Oficial (Opcional)</label>
                <input 
                  type="text" 
                  value={arcaNC} 
                  onChange={(e) => setArcaNC(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-white font-mono focus:outline-none focus:border-purple-400" 
                  placeholder="Ej: 0001-00000045"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button 
                type="button" 
                onClick={() => setFacturaParaNC(null)} 
                className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold"
              >
                Cancelar
              </button>
              <button 
                type="button" 
                disabled={guardandoNC || montoNC <= 0} 
                onClick={handleGuardarNC} 
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-5 py-2 rounded-lg text-xs transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              >
                {guardandoNC ? "Emitiendo NC..." : "Confirmar Nota de Crédito"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}