import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Deal } from './types';

// Función para descargar y convertir la imagen de Supabase
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
  const idCliente = deal.cliente?.numero_cliente || deal.cliente_id;

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
  
  doc.text(`Razón Social / Nombre y Apellido: ${nombreCliente}`, 14, 54); 
  doc.text(`Número de Proveedor en INC S.A.: ${idCliente}`, 14, 60); 
  doc.text(`CUIT: ${deal.cliente?.cuit || 'S/D'}`, 14, 66); 
  doc.text(`Dirección: ${deal.cliente?.direccion || 'S/D'}`, 14, 72); 
  doc.text(`Teléfonos: ${deal.cliente?.telefono || 'S/D'}`, 14, 78); 
  doc.text(`Representante legal: ${deal.cliente?.rep_nombre || 'S/D'}`, 14, 84); 
  doc.text(`Documento: ${deal.cliente?.rep_dni || 'S/D'}`, 14, 90); 
  doc.text(`Cargo: ${deal.cliente?.rep_cargo || 'S/D'}`, 14, 96); 
  
  // --- VIGENCIA ---
  doc.text(`Período de Vigencia desde: ${deal.fecha_desde || ''} | Hasta: ${deal.fecha_hasta || ''}`, 14, 106); 

  // --- TEXTO INTRODUCTORIO ---
  // Modificado para referenciar el Anexo I
  const textoIntroduccion = `Por medio de la presente hacemos llegar a Ud. la siguiente propuesta de servicios con vigencia para el período previamente indicado, durante la cual INC S.A. cumplirá los servicios que se detallan en el Anexo I, y en contraprestación, ${nombreCliente} le reconocerá los montos en pesos o porcentajes allí descriptos:`; 
  const splitIntro = doc.splitTextToSize(textoIntroduccion, 180);
  doc.text(splitIntro, 14, 114);

  let currentY = 114 + (splitIntro.length * 5) + 5;

  // --- TEXTO REMARCADO (NUEVO) ---
  doc.setFont("helvetica", "bold");
  const textoRemarcado = "IMPORTANTE: En caso de que no se retire el material finalizado el plazo del acuerdo, se aplicarán cargos correspondientes al plazo excedido.";
  const splitRemarcado = doc.splitTextToSize(textoRemarcado, 180);
  doc.text(splitRemarcado, 14, currentY);
  doc.setFont("helvetica", "normal");

  currentY += (splitRemarcado.length * 5) + 10;

  // --- CIERRE Y FIRMAS (MOVIDO A LA PRIMERA PÁGINA) ---
  doc.setFontSize(9);
  const textoCierre = `Esta propuesta es irrevocable y se considerará aceptada con la recepción y posterior aceptación de la primera Factura o Nota de débito emitida por INC S.A. conforme a lo aquí dispuesto.`; 
  const splitCierre = doc.splitTextToSize(textoCierre, 180);
  doc.text(splitCierre, 14, currentY);

  currentY += (splitCierre.length * 5) + 20;
  doc.text(`Firma por parte de INC S.A.: ___________________________`, 14, currentY); 
  
  currentY += 15;
  const aceptacion = `Por la presente, acuso recibo de la propuesta de servicios de INC S.A. con fecha ${fechaActual}, aceptando la misma.`; 
  const splitAceptacion = doc.splitTextToSize(aceptacion, 180);
  doc.text(splitAceptacion, 14, currentY);
  
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
  
  let yPos = 30;
  
  const tableColumn = ["Elemento", "Cantidad", "Tiendas", "Precio base", "Precio c/ desc", "Ahorro"];
  const tableRows: any[] = [];
  
  let sumaBaseTotal = 0; 
  let sumaAhorroItems = 0;
  let sumaTotalConDescuentoItems = 0;

  const elementos = deal.elementos_json || [];
  const inflacion = deal.tasa_inflacion || 0;
  const descuentoGlobal = deal.descuento_porcentaje || 0;

  if (elementos.length > 0) {
    elementos.forEach((item: any) => {
      // Se absorbe la inflación en el precio base para mostrarlo como un todo
      const precioBase = item.subtotal * (1 + (inflacion / 100));
      sumaBaseTotal += precioBase;
      
      const descuentoPrc = item.descuento || 0;
      const montoDescuentoItem = precioBase * (descuentoPrc / 100);
      const precioConDescuento = precioBase - montoDescuentoItem;

      sumaTotalConDescuentoItems += precioConDescuento;
      sumaAhorroItems += montoDescuentoItem;

      const strDescuento = descuentoPrc === 100 
        ? 'BONIFICADO' 
        : `$${precioConDescuento.toLocaleString('es-AR', {maximumFractionDigits: 2})}`;
        
      const strAhorro = montoDescuentoItem > 0 
        ? `-$${montoDescuentoItem.toLocaleString('es-AR', {maximumFractionDigits: 2})}` 
        : '-';

      tableRows.push([
        item.nombre,
        item.cantidad || 1,
        item.tiendas?.length || '-',
        `$${precioBase.toLocaleString('es-AR', {maximumFractionDigits: 2})}`,
        strDescuento,
        strAhorro
      ]);
    });
  } else {
    // Fallback de seguridad calculando desde el monto final
    let precioBase = deal.amount;
    if (descuentoGlobal > 0) precioBase = precioBase / (1 - (descuentoGlobal / 100));
    // Ya no restamos la inflación visiblemente, asumimos que está en el precioBase
    sumaBaseTotal = precioBase;
    
    tableRows.push([
      deal.catalogo?.elemento || "Campaña Única", "1", deal.tiendas?.length || "-",
      `$${precioBase.toLocaleString('es-AR', {maximumFractionDigits: 2})}`,
      `$${precioBase.toLocaleString('es-AR', {maximumFractionDigits: 2})}`, "-"
    ]);
    
    sumaTotalConDescuentoItems = precioBase;
  }

  // Fila de Total de Items
  tableRows.push([
    { content: 'SUBTOTAL ITEMS', colSpan: 4, styles: { halign: 'right', fontStyle: 'bold' } },
    { content: `$${sumaTotalConDescuentoItems.toLocaleString('es-AR', {maximumFractionDigits: 2})}`, styles: { fontStyle: 'bold' } },
    { content: sumaAhorroItems > 0 ? `-$${sumaAhorroItems.toLocaleString('es-AR', {maximumFractionDigits: 2})}` : '-', styles: { fontStyle: 'bold' } }
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [tableColumn],
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [240, 240, 240], textColor: [0,0,0], fontStyle: 'bold' },
    styles: { fontSize: 8, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 15, halign: 'center' },
      2: { cellWidth: 15, halign: 'center' },
      3: { cellWidth: 40, halign: 'right' },
      4: { cellWidth: 40, halign: 'right' },
      5: { cellWidth: 30, halign: 'right' }
    }
  });

  // --- RESUMEN FINANCIERO FINAL ---
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  let resumenY = finalY;

  const montoDescuentoGlobal = sumaTotalConDescuentoItems * (descuentoGlobal / 100);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  
  doc.text(`Suma Base Total:`, 14, resumenY);
  doc.text(`$ ${sumaBaseTotal.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, 150, resumenY, { align: 'right' });
  
  // (Línea de inflación eliminada a pedido)

  if (sumaAhorroItems > 0) {
    resumenY += 6;
    doc.text(`Ahorro por Bonificaciones de Ítems:`, 14, resumenY);
    doc.text(`-$ ${sumaAhorroItems.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, 150, resumenY, { align: 'right' });
  }

  if (descuentoGlobal > 0) {
    resumenY += 6;
    doc.text(`Descuento General Aplicado - ${descuentoGlobal}%:`, 14, resumenY);
    doc.text(`-$ ${montoDescuentoGlobal.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, 150, resumenY, { align: 'right' });
  }

  resumenY += 8;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(`MONTO TOTAL FINAL (Sin IVA):`, 14, resumenY); 
  doc.text(`$ ${deal.amount.toLocaleString('es-AR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, 150, resumenY, { align: 'right' }); 
  
  // ==========================================
  // --- ANEXO II: HOJA DE ADJUNTOS / RENDERS ---
  // ==========================================
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

      if (adj.tipo.includes('image')) {
        try {
          const base64Data = await getBase64ImageFromUrl(adj.url);
          doc.setFont("helvetica", "bold");
          doc.text(`Adjunto ${i + 1} (${tipoLabel}): ${adj.nombre}`, 14, yAdj);
          doc.setFont("helvetica", "normal");
          yAdj += 6;
          doc.addImage(base64Data, 'JPEG', 14, yAdj, 120, 70, undefined, 'FAST');
          yAdj += 80; 
        } catch (e) {
          doc.setTextColor(255, 0, 0);
          doc.text(`Error al cargar la previsualización de la imagen.`, 14, yAdj);
          doc.setTextColor(0, 0, 0);
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

  const nombreArchivoFinal = `Acuerdo_${nombreCliente.replace(/\s+/g, '_')}_${deal.id}.pdf`;

  if (returnBase64) {
    return { pdfBase64: doc.output('datauristring'), nombreArchivo: nombreArchivoFinal };
  } else {
    doc.save(nombreArchivoFinal);
  }
}