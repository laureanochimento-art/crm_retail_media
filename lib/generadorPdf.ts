import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Deal, Tienda } from './types';
import { calcularProrrateoDeal, obtenerMesesRango } from './prorrateo';
import { supabase } from './supabase';

const getBase64ImageFromUrl = async (imageUrl: string): Promise<string> => {
  const res = await fetch(imageUrl);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const formatearMesHeader = (claveMes: string): string => {
  if (!claveMes) return "";
  const [anio, mes] = claveMes.split('-');
  const fechaObj = new Date(Number(anio), Number(mes) - 1, 1);
  const nombre = fechaObj.toLocaleDateString('es-AR', { month: 'short', year: 'numeric' });
  return nombre.charAt(0).toUpperCase() + nombre.slice(1);
};

const resolverNombreTienda = (tiendaRef: any, catalogoTiendas: Tienda[]): string => {
  if (!tiendaRef) return 'Sucursal no asignada';
  
  if (typeof tiendaRef === 'object' && tiendaRef.nombre) {
    return tiendaRef.numero ? `[${tiendaRef.numero}] ${tiendaRef.nombre}` : tiendaRef.nombre;
  }

  const strRef = String(tiendaRef).trim();
  const numRef = Number(tiendaRef);

  const encontrada = catalogoTiendas.find(t => 
    String(t.id) === strRef || 
    String(t.numero) === strRef ||
    t.id === numRef ||
    (!isNaN(numRef) && Number(t.numero) === numRef)
  );

  if (encontrada) {
    return encontrada.numero ? `[${encontrada.numero}] ${encontrada.nombre}` : encontrada.nombre;
  }

  return `Sucursal ${strRef}`;
};

export const generarAcuerdoPDF = async (deal: Deal, returnBase64: boolean = false) => {
  const doc = new jsPDF();
  const fechaActual = new Date().toLocaleDateString('es-AR');
  const nombreCliente = deal.cliente?.nombre || 'CLIENTE NO ASIGNADO';
  const idCliente = deal.cliente?.numero_cliente || deal.cliente_id || '-';

  // Obtener catálogo completo de tiendas desde Supabase si faltan datos
  let catalogoTiendas: Tienda[] = (deal.tiendas && deal.tiendas.length > 0) ? deal.tiendas : [];
  if (catalogoTiendas.length === 0 || !catalogoTiendas[0]?.nombre) {
    try {
      const { data } = await supabase.from('tiendas').select('*').order('numero', { ascending: true });
      if (data && data.length > 0) {
        catalogoTiendas = data as Tienda[];
      }
    } catch (e) {
      console.error("Error al recuperar tiendas en PDF:", e);
    }
  }

  // ==========================================
  // --- CARÁTULA Y CONDICIONES GENERALES ---
  // ==========================================
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Propuesta de servicios de INC S.A.", 14, 20);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Buenos Aires, ${fechaActual}`, 14, 28);
  doc.text("Condiciones Generales:", 14, 36);

  doc.setFont("helvetica", "bold");
  doc.text("Destinatario:", 14, 46);
  doc.setFont("helvetica", "normal");
  doc.text(`Razón Social: ${nombreCliente}`, 14, 54);
  doc.text(`Número de Proveedor: ${idCliente}`, 14, 60);
  doc.text(`CUIT: ${deal.cliente?.cuit || 'S/D'}`, 14, 66);
  doc.text(`Dirección: ${deal.cliente?.direccion || 'S/D'}`, 14, 72);
  doc.text(`Representante legal: ${deal.cliente?.rep_nombre || 'S/D'}`, 14, 78);

  const textoIntroduccion = `Por medio de la presente hacemos llegar a Ud. la siguiente propuesta de servicios, durante la cual INC S.A. cumplirá los servicios que se detallan en el Anexo I, y en contraprestación, ${nombreCliente} le reconocerá los montos allí descriptos:`;
  const splitIntro = doc.splitTextToSize(textoIntroduccion, 180);
  doc.text(splitIntro, 14, 95);

  let currentY = 95 + (splitIntro.length * 5) + 5;
  doc.setFont("helvetica", "bold");
  const textoRemarcado = "IMPORTANTE: En caso de que no se retire el material finalizado el plazo del acuerdo, se aplicarán cargos correspondientes al plazo excedido.";
  const splitRemarcado = doc.splitTextToSize(textoRemarcado, 180);
  doc.text(splitRemarcado, 14, currentY);

  doc.setFont("helvetica", "normal");
  currentY += (splitRemarcado.length * 5) + 15;
  doc.setFontSize(9);
  const textoCierre = `Esta propuesta es irrevocable y se considerará aceptada con la recepción de la primera Factura.`;
  doc.text(doc.splitTextToSize(textoCierre, 180), 14, currentY);

  currentY += 15;
  doc.text(`Firma por parte de INC S.A.: ___________________________`, 14, currentY);
  currentY += 15;
  doc.text(`Firma ${nombreCliente}: ___________________________`, 14, currentY);

  // ==========================================
  // --- ANEXO I: DETALLE DE ESPACIOS ---
  // ==========================================
  doc.addPage();
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Anexo I: Detalle de Espacios y Resumen Financiero", 14, 20);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const tableColumn = ["Elemento", "Vigencia", "Cant.", "Bocas", "Precio Base", "Precio Final", "Ahorro"];
  const tableRows: any[] = [];
  let sumaBaseTotal = 0;
  let sumaAhorroTotal = 0;
  let sumaFinalTotal = 0;

  const elementos = deal.elementos_json || [];

  if (elementos.length > 0) {
    elementos.forEach((item: any) => {
      const precioBaseVisible = item.precioLista || item.subtotal || 0;
      sumaBaseTotal += precioBaseVisible;

      const ahorroTotalItem = (item.montoDescuentoItem || 0) + (item.porcionDescuentoGlobal || 0);
      sumaAhorroTotal += ahorroTotalItem;

      const precioFinalItem = item.precioFinalProrrateado !== undefined
        ? item.precioFinalProrrateado
        : (precioBaseVisible - ahorroTotalItem);
      sumaFinalTotal += precioFinalItem;

      const strDescuento = precioFinalItem === 0 ? 'BONIFICADO' : `$${precioFinalItem.toLocaleString('es-AR', { maximumFractionDigits: 0 })}`;
      const strAhorro = ahorroTotalItem > 0 ? `-$${ahorroTotalItem.toLocaleString('es-AR', { maximumFractionDigits: 0 })}` : '-';

      const f1Str = item.fechaDesde || deal.fecha_desde || '';
      const f2Str = item.fechaHasta || deal.fecha_hasta || '';
      const vigenciaTexto = (f1Str && f2Str)
        ? (f1Str <= f2Str ? `${f1Str} al ${f2Str}` : `${f2Str} al ${f1Str}`)
        : '-';

      tableRows.push([
        item.nombre || 'Elemento',
        vigenciaTexto,
        item.cantidad || 1,
        item.tiendas?.length || (item.canal === 'InStore' ? '1' : '-'),
        `$${precioBaseVisible.toLocaleString('es-AR', { maximumFractionDigits: 0 })}`,
        strDescuento,
        strAhorro
      ]);
    });
  }

  tableRows.push([
    { content: 'SUBTOTAL ESPACIOS', colSpan: 4, styles: { halign: 'right', fontStyle: 'bold' } },
    { content: `$${sumaBaseTotal.toLocaleString('es-AR', { maximumFractionDigits: 0 })}`, styles: { fontStyle: 'bold' } },
    { content: `$${sumaFinalTotal.toLocaleString('es-AR', { maximumFractionDigits: 0 })}`, styles: { fontStyle: 'bold' } },
    { content: sumaAhorroTotal > 0 ? `-$${sumaAhorroTotal.toLocaleString('es-AR', { maximumFractionDigits: 0 })}` : '-', styles: { fontStyle: 'bold' } }
  ]);

  autoTable(doc, {
    startY: 30,
    head: [tableColumn],
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' },
    styles: { fontSize: 8, cellPadding: 2 },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 35 },
      2: { cellWidth: 12, halign: 'center' },
      3: { cellWidth: 12, halign: 'center' },
      4: { cellWidth: 30, halign: 'right' },
      5: { cellWidth: 30, halign: 'right' },
      6: { cellWidth: 25, halign: 'right' }
    }
  });

  const prorrateo = calcularProrrateoDeal(deal);
  
  // Cálculo exacto del impacto de la inflación
  const sumaBasePura = prorrateo.reduce((acc, m) => acc + m.montoBase, 0);
  const sumaTotalConInflacion = prorrateo.reduce((acc, m) => acc + m.montoConInflacion, 0);
  const totalMontoInflacion = Math.max(0, Math.round((sumaTotalConInflacion - sumaBasePura) * 100) / 100);

  const montoTotalDealReal = Number(deal.amount) > 0 
    ? Number(deal.amount) 
    : (sumaFinalTotal + totalMontoInflacion);

  let resumenY = (doc as any).lastAutoTable.finalY + 12;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Subtotal Espacios:`, 14, resumenY);
  doc.text(`$ ${sumaBaseTotal.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 160, resumenY, { align: 'right' });

  if (totalMontoInflacion > 0) {
    resumenY += 6;
    doc.text(`Ajuste por Inflación Acumulada:`, 14, resumenY);
    doc.text(`+$ ${totalMontoInflacion.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 160, resumenY, { align: 'right' });
  }

  if (sumaAhorroTotal > 0) {
    resumenY += 6;
    doc.text(`Ahorro Total por Descuentos / Bonificaciones:`, 14, resumenY);
    doc.text(`-$ ${sumaAhorroTotal.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 160, resumenY, { align: 'right' });
  }

  resumenY += 8;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(`MONTO TOTAL A FACTURAR (Sin IVA):`, 14, resumenY);
  doc.text(`$ ${montoTotalDealReal.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 160, resumenY, { align: 'right' });

  if (prorrateo.length > 1 && totalMontoInflacion > 0) {
    resumenY += 10;
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    const detalleMeses = prorrateo.map(m => `${m.nombreMes}: ${m.tasaInflacionMes}%`).join(' | ');
    doc.text(`Cronograma de Inflación mensual aplicada: ${detalleMeses}`, 14, resumenY);
  }

  // =========================================================================
  // --- ANEXO II: TABLA DINÁMICA DE PROYECCIÓN MENSUAL POR ELEMENTO/TIENDA ---
  // =========================================================================
  doc.addPage();
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Anexo II: Detalle del Acuerdo y Proyección Mensual", 14, 20);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Proyección económica mensualizada por elemento y sucursal (valores netos ajustados por inflación y bonificación):", 14, 27);

  let mesesCronologicos = prorrateo.map(m => m.mesClave);
  if (mesesCronologicos.length === 0) {
    const todasFechas = elementos.flatMap((el: any) => [el.fechaDesde, el.fechaHasta]).filter(Boolean);
    const fMin = todasFechas.length > 0 ? todasFechas.reduce((a: string, b: string) => a < b ? a : b) : (deal.fecha_desde || new Date().toISOString().split('T')[0]);
    const fMax = todasFechas.length > 0 ? todasFechas.reduce((a: string, b: string) => a > b ? a : b) : (deal.fecha_hasta || fMin);
    mesesCronologicos = obtenerMesesRango(fMin, fMax);
  }

  const mapaFactores: Record<string, number> = {};
  prorrateo.forEach(m => {
    mapaFactores[m.mesClave] = m.factorInflacionAcumulado || 1.0;
  });

  const anexo2Headers = [
    "Elemento",
    "Sucursal / Canal",
    ...mesesCronologicos.map(m => formatearMesHeader(m)),
    "Total"
  ];

  const anexo2Rows: any[] = [];
  const totalesPorColumnaMes: number[] = new Array(mesesCronologicos.length).fill(0);
  let totalGeneralAnexo2 = 0;

  elementos.forEach((item: any) => {
    const esInStore = item.canal === 'InStore';
    const tiendasItem = (esInStore && item.tiendas && item.tiendas.length > 0) ? item.tiendas : [null];
    const cantTiendas = tiendasItem.length;

    const fDesdeStr = item.fechaDesde || deal.fecha_desde || new Date().toISOString().split('T')[0];
    const fHastaStr = item.fechaHasta || deal.fecha_hasta || fDesdeStr;
    
    const rawD1 = new Date(`${fDesdeStr}T00:00:00`);
    const rawD2 = new Date(`${fHastaStr}T00:00:00`);
    const dInicio = rawD1 <= rawD2 ? rawD1 : rawD2;
    const dFin = rawD1 <= rawD2 ? rawD2 : rawD1;

    const diffDias = Math.max(1, Math.ceil(Math.abs(dFin.getTime() - dInicio.getTime()) / (1000 * 60 * 60 * 24)) + 1);

    // Base neta real del elemento (con descuento de ítem y global ya prorrateados)
    const baseFinalItem = item.precioFinalProrrateado !== undefined 
      ? Number(item.precioFinalProrrateado) 
      : Math.max(0, Number(item.subtotal ?? item.precioLista ?? 0) - (item.montoDescuentoItem || 0));

    const basePorFila = cantTiendas > 0 ? (baseFinalItem / cantTiendas) : baseFinalItem;
    const esPeriodoUnico = item.periodo === 'Único' || item.periodo === 'unico' || item.periodo === 'Unico';

    tiendasItem.forEach((tRef: any) => {
      const nombreTienda = esInStore ? resolverNombreTienda(tRef, catalogoTiendas) : 'Canal Digital';
      const filaMeses: string[] = [];
      let totalFila = 0;

      mesesCronologicos.forEach((mesKey, idx) => {
        const [anioStr, mesStr] = mesKey.split('-');
        const primerDiaMes = new Date(Number(anioStr), Number(mesStr) - 1, 1);
        const ultimoDiaMes = new Date(Number(anioStr), Number(mesStr), 0);

        const solapamientoInicio = dInicio > primerDiaMes ? dInicio : primerDiaMes;
        const solapamientoFin = dFin < ultimoDiaMes ? dFin : ultimoDiaMes;

        let diasEnMes = 0;
        if (solapamientoFin >= solapamientoInicio) {
          diasEnMes = Math.ceil((solapamientoFin.getTime() - solapamientoInicio.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        }

        let proporcionMes = 0;
        if (esPeriodoUnico) {
          proporcionMes = (mesKey === fDesdeStr.substring(0, 7)) ? basePorFila : 0;
        } else {
          proporcionMes = diffDias > 0 ? (basePorFila * (diasEnMes / diffDias)) : 0;
        }

        const factorInflacion = mapaFactores[mesKey] || 1.0;
        const montoNetoMes = proporcionMes * factorInflacion;

        totalFila += montoNetoMes;
        totalesPorColumnaMes[idx] += montoNetoMes;

        filaMeses.push(montoNetoMes > 0 ? `$${Math.round(montoNetoMes).toLocaleString('es-AR')}` : '-');
      });

      totalGeneralAnexo2 += totalFila;

      anexo2Rows.push([
        item.nombre || 'Elemento',
        nombreTienda,
        ...filaMeses,
        `$${Math.round(totalFila).toLocaleString('es-AR')}`
      ]);
    });
  });

  anexo2Rows.push([
    { content: 'TOTAL MENSUAL', colSpan: 2, styles: { halign: 'right', fontStyle: 'bold', fillColor: [240, 240, 240] } },
    ...totalesPorColumnaMes.map(tot => ({
      content: `$${Math.round(tot).toLocaleString('es-AR')}`,
      styles: { halign: 'right', fontStyle: 'bold', fillColor: [240, 240, 240] }
    })),
    {
      content: `$${Math.round(totalGeneralAnexo2).toLocaleString('es-AR')}`,
      styles: { halign: 'right', fontStyle: 'bold', fillColor: [240, 240, 240] }
    }
  ]);

  autoTable(doc, {
    startY: 33,
    head: [anexo2Headers],
    body: anexo2Rows,
    theme: 'grid',
    headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' },
    styles: { fontSize: 6.5, cellPadding: 1.5, overflow: 'linebreak' },
    columnStyles: {
      0: { cellWidth: 32 },
      1: { cellWidth: 42 }
    }
  });

  // =========================================================================
  // --- ANEXO III: RENDERS, DISEÑOS Y MATERIALES ADJUNTOS ---
  // =========================================================================
  if (deal.adjuntos && deal.adjuntos.length > 0) {
    doc.addPage();
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Anexo III: Renders y Documentos Adjuntos", 14, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    let yAdj = 30;

    for (let i = 0; i < deal.adjuntos.length; i++) {
      const adj = deal.adjuntos[i];
      const tipoLabel = adj.categoria ? adj.categoria.replace('_', ' ') : 'General';

      if (adj.tipo && adj.tipo.includes('image')) {
        try {
          const base64Data = await getBase64ImageFromUrl(adj.url);
          doc.setFont("helvetica", "bold");
          doc.text(`Adjunto ${i + 1} (${tipoLabel}): ${adj.nombre}`, 14, yAdj);
          doc.setFont("helvetica", "normal");
          yAdj += 6;
          doc.addImage(base64Data, 'JPEG', 14, yAdj, 120, 70, undefined, 'FAST');
          yAdj += 80;
        } catch {
          doc.text(`Adjunto ${i + 1} (${tipoLabel}): ${adj.nombre}`, 14, yAdj);
          yAdj += 10;
        }
      } else {
        doc.setFont("helvetica", "bold");
        doc.text(`Adjunto ${i + 1} (${tipoLabel}): ${adj.nombre}`, 14, yAdj);
        doc.setFont("helvetica", "normal");
        yAdj += 6;
        doc.text(`Enlace / Documento: ${adj.url}`, 14, yAdj);
        yAdj += 12;
      }

      if (yAdj > 250 && i < deal.adjuntos.length - 1) {
        doc.addPage();
        yAdj = 20;
      }
    }
  }

  const nombreLimpio = nombreCliente.replace(/\s+/g, '_');
  const sufijoId = deal.id ? deal.id : 'Borrador';
  const nombreArchivoFinal = `Propuesta_${nombreLimpio}_${sufijoId}.pdf`;

  if (returnBase64) {
    return { pdfBase64: doc.output('datauristring'), nombreArchivo: nombreArchivoFinal };
  } else {
    doc.save(nombreArchivoFinal);
  }
};