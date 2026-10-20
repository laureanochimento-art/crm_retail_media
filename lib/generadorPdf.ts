import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Deal } from './types';
import { calcularProrrateoDeal } from './prorrateo';

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

export const generarAcuerdoPDF = async (deal: Deal, returnBase64: boolean = false) => {
  const doc = new jsPDF();
  const fechaActual = new Date().toLocaleDateString('es-AR');
  const nombreCliente = deal.cliente?.nombre || 'CLIENTE NO ASIGNADO';
  const idCliente = deal.cliente?.numero_cliente || deal.cliente_id || '-';

  // --- CABECERA ---
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Propuesta de servicios de INC S.A.", 14, 20);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Buenos Aires, ${fechaActual}`, 14, 28);
  doc.text("Condiciones Generales:", 14, 36);

  // --- DATOS DEL DESTINATARIO ---
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
  // --- ANEXO I: TABLA Y RESUMEN FINANCIERO ---
  // ==========================================
  doc.addPage();
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Anexo I: Detalle de Espacios y Resumen Financiero", 14, 20);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const yPos = 30;

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

      const precioFinalItem = item.precioFinalProrrateado !== undefined ? item.precioFinalProrrateado : (precioBaseVisible - ahorroTotalItem);
      sumaFinalTotal += precioFinalItem;

      const strDescuento = precioFinalItem === 0 ? 'BONIFICADO' : `$${precioFinalItem.toLocaleString('es-AR', {maximumFractionDigits: 0})}`;
      const strAhorro = ahorroTotalItem > 0 ? `-$${ahorroTotalItem.toLocaleString('es-AR', {maximumFractionDigits: 0})}` : '-';

      const vigenciaTexto = (item.fechaDesde && item.fechaHasta)
        ? `${item.fechaDesde} al ${item.fechaHasta}`
        : (deal.fecha_desde && deal.fecha_hasta ? `${deal.fecha_desde} al ${deal.fecha_hasta}` : '-');

      tableRows.push([
        item.nombre || 'Elemento',
        vigenciaTexto,
        item.cantidad || 1,
        item.tiendas?.length || (item.canal === 'InStore' ? '1' : '-'),
        `$${precioBaseVisible.toLocaleString('es-AR', {maximumFractionDigits: 0})}`,
        strDescuento,
        strAhorro
      ]);
    });
  }

  tableRows.push([
    { content: 'SUBTOTAL ESPACIOS', colSpan: 4, styles: { halign: 'right', fontStyle: 'bold' } },
    { content: `$${sumaBaseTotal.toLocaleString('es-AR', {maximumFractionDigits: 0})}`, styles: { fontStyle: 'bold' } },
    { content: `$${sumaFinalTotal.toLocaleString('es-AR', {maximumFractionDigits: 0})}`, styles: { fontStyle: 'bold' } },
    { content: sumaAhorroTotal > 0 ? `-$${sumaAhorroTotal.toLocaleString('es-AR', {maximumFractionDigits: 0})}` : '-', styles: { fontStyle: 'bold' } }
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [tableColumn],
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [240, 240, 240], textColor: [0,0,0], fontStyle: 'bold' },
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
  const sumaTotalConInflacion = prorrateo.reduce((acc, m) => acc + m.montoConInflacion, 0);
  const totalMontoInflacion = Math.max(0, sumaTotalConInflacion - sumaBaseTotal);

  let resumenY = (doc as any).lastAutoTable.finalY + 12;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Subtotal Espacios:`, 14, resumenY);
  doc.text(`$ ${sumaBaseTotal.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, 160, resumenY, { align: 'right' });

  if (totalMontoInflacion > 0) {
    resumenY += 6;
    doc.text(`Ajuste por Inflación Acumulada:`, 14, resumenY);
    doc.text(`+$ ${totalMontoInflacion.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, 160, resumenY, { align: 'right' });
  }

  if (sumaAhorroTotal > 0) {
    resumenY += 6;
    doc.text(`Ahorro Total por Descuentos / Bonificaciones:`, 14, resumenY);
    doc.text(`-$ ${sumaAhorroTotal.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, 160, resumenY, { align: 'right' });
  }

  resumenY += 8;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(`MONTO TOTAL A FACTURAR (Sin IVA):`, 14, resumenY);
  doc.text(`$ ${deal.amount.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, 160, resumenY, { align: 'right' });

  if (prorrateo.length > 1) {
    resumenY += 10;
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    const detalleMeses = prorrateo.map(m => `${m.nombreMes}: ${m.tasaInflacionMes}%`).join(' | ');
    doc.text(`Cronograma de Inflación mensual aplicada: ${detalleMeses}`, 14, resumenY);
  }

  // ANEXO II: ADJUNTOS
  if (deal.adjuntos && deal.adjuntos.length > 0) {
    doc.addPage();
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Anexo II: Renders y Documentos Adjuntos", 14, 20);
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
          doc.text(`Adjunto ${i + 1}: ${adj.nombre}`, 14, yAdj);
          yAdj += 10;
        }
      } else {
        doc.setFont("helvetica", "bold");
        doc.text(`Adjunto ${i + 1} (${tipoLabel}): ${adj.nombre}`, 14, yAdj);
        doc.setFont("helvetica", "normal");
        yAdj += 6;
        doc.text(`Enlace: ${adj.url}`, 14, yAdj);
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

  if (returnBase64) return { pdfBase64: doc.output('datauristring'), nombreArchivo: nombreArchivoFinal };
  else doc.save(nombreArchivoFinal);
};