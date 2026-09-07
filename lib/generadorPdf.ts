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
  doc.text(`Dirección: ${deal.cliente?.direccion || 'S/D'}`, 14, 66); 
  doc.text(`Teléfonos: ${deal.cliente?.telefono || 'S/D'}`, 14, 72); 
  doc.text(`Nombre y Apellido del Representante legal: ${deal.cliente?.rep_nombre || 'S/D'}`, 14, 78); 
  doc.text(`Tipo y Número de Documento: ${deal.cliente?.rep_dni || 'S/D'}`, 14, 84); 
  doc.text(`Cargo: ${deal.cliente?.rep_cargo || 'S/D'}`, 14, 90); 
  
  // --- VIGENCIA Y LEGALES ---
  doc.text(`Período de Vigencia desde: ${deal.fecha_desde || ''} | Hasta: ${deal.fecha_hasta || ''}`, 14, 100); 

  const textoIntroduccion = `Por medio de la presente hacemos llegar a Ud. la siguiente propuesta de servicios con vigencia para el período previamente indicado, durante la cual INC S.A. cumplirá los servicios que se detallan, y en contraprestación. ${nombreCliente} le reconocerá los montos en pesos o porcentajes descriptos seguidamente:`; 
  
  const splitIntro = doc.splitTextToSize(textoIntroduccion, 180);
  doc.text(splitIntro, 14, 108);

  // --- TABLA DE ESPACIOS ---
  let yPos = 110 + (splitIntro.length * 5);
  doc.setFont("helvetica", "bold");
  doc.text(`Item / Descripción concepto: ${deal.catalogo?.elemento || 'ESPACIOS DE PUBLICIDAD'}`, 14, yPos); 
  
  const tableColumn = ["ID", "Formato", "Nro de Boca", "Nombre de Boca", "Precio Unitario"];
  const tableRows: any[] = [];

  if (deal.tiendas && deal.tiendas.length > 0) {
    deal.tiendas.forEach((t) => {
      tableRows.push([
        t.id,
        t.formato,
        t.numero,
        t.nombre,
        `$${deal.catalogo?.precio_base.toLocaleString()}`
      ]);
    });
  } else {
    tableRows.push(["-", "Campaña Digital / Única", "-", "-", `$${deal.amount.toLocaleString()}`]);
  }

  yPos += 6;
  autoTable(doc, {
    startY: yPos,
    head: [tableColumn],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [4, 150, 255] }, 
    styles: { fontSize: 8 }
  });

  // --- TOTALES Y CIERRE ---
  const finalY = (doc as any).lastAutoTable.finalY || yPos + 20;
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(`Monto Total: $ ${deal.amount.toLocaleString()}`, 14, finalY + 10); 
  
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const textoCierre = `Esta propuesta es irrevocable y se considerará aceptada con la recepción y posterior aceptación de la primera Factura o Nota de débito emitida por INC S.A. conforme a lo aquí dispuesto.`; 
  const splitCierre = doc.splitTextToSize(textoCierre, 180);
  doc.text(splitCierre, 14, finalY + 20);

  doc.text(`Firma por parte de INC S.A.: ___________________________`, 14, finalY + 40); 
  
  const aceptacion = `Por la presente, acuso recibo de la propuesta de servicios de INC S.A. con fecha ${fechaActual}, aceptando la misma.`; 
  const splitAceptacion = doc.splitTextToSize(aceptacion, 180);
  doc.text(splitAceptacion, 14, finalY + 55);
  doc.text(`Firma ${nombreCliente}: ___________________________`, 14, finalY + 70);

  // --- HOJA DE ADJUNTOS (IMÁGENES Y ARCHIVOS) ---
  if (deal.adjuntos && deal.adjuntos.length > 0) {
    doc.addPage();
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Anexo: Renders y Documentos Adjuntos", 14, 20);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    let yAdj = 30;
    
    for (let i = 0; i < deal.adjuntos.length; i++) {
      const adj = deal.adjuntos[i];
      
      if (adj.tipo.includes('image')) {
        try {
          const base64Data = await getBase64ImageFromUrl(adj.url);
          // Dibujamos la imagen limpia, sin texto encima
          doc.addImage(base64Data, 'JPEG', 14, yAdj, 120, 70, undefined, 'FAST');
          yAdj += 75; // Espacio para la siguiente foto
        } catch (e) {
          doc.setTextColor(255, 0, 0);
          doc.text(`Error al cargar la previsualización de la imagen.`, 14, yAdj);
          doc.setTextColor(0, 0, 0);
          yAdj += 10;
        }
      } else {
        // Para CSV, Excel o PDF, dejamos un texto limpio
        doc.setFont("helvetica", "bold");
        doc.text(`Documento Adjunto (${i + 1}):`, 14, yAdj);
        doc.setFont("helvetica", "normal");
        yAdj += 6;
        doc.text(`${adj.url}`, 14, yAdj);
        yAdj += 12;
      }

      // Si nos quedamos sin espacio en la hoja, pasamos a la siguiente
      if (yAdj > 250 && i < deal.adjuntos.length - 1) {
        doc.addPage();
        yAdj = 20;
      }
    }
  }

  const nombreArchivoFinal = `Acuerdo_${nombreCliente.replace(/\s+/g, '_')}_${deal.id}.pdf`;

  // --- EXPORTACIÓN DINÁMICA ---
  if (returnBase64) {
    // Si pedimos Base64, devolvemos el string para mandarlo a la API de correos
    return {
      pdfBase64: doc.output('datauristring'),
      nombreArchivo: nombreArchivoFinal
    };
  } else {
    // Comportamiento normal: descargar en la computadora
    doc.save(nombreArchivoFinal);
  }
}