export interface MesProrrateado {
  mesClave: string; // Formato YYYY-MM
  nombreMes: string; // Formato "Septiembre 2026"
  diasActivos: number;
  montoTotal: number;
  montoFacturado: number;
  montoPendiente: number;
}

export const calcularProrrateoPorDias = (
  fechaDesdeStr?: string | null,
  fechaHastaStr?: string | null,
  montoTotal: number = 0,
  montoFacturadoTotal: number = 0
): MesProrrateado[] => {
  if (!fechaDesdeStr || !fechaHastaStr || montoTotal <= 0) return [];

  const inicio = new Date(fechaDesdeStr + "T00:00:00");
  const fin = new Date(fechaHastaStr + "T00:00:00");

  if (fin < inicio) return [];

  const diffTiempo = Math.abs(fin.getTime() - inicio.getTime());
  const diasTotales = Math.ceil(diffTiempo / (1000 * 60 * 60 * 24)) + 1;
  const tarifaDiaria = montoTotal / diasTotales;
  
  // Porcentaje de ejecución del acuerdo
  const ratioFacturado = Math.min(1, Math.max(0, montoFacturadoTotal / montoTotal));

  const desgloseMeses: Record<string, { dias: number; monto: number }> = {};

  const curr = new Date(inicio);
  while (curr <= fin) {
    const key = `${curr.getFullYear()}-${String(curr.getMonth() + 1).padStart(2, '0')}`;
    if (!desgloseMeses[key]) {
      desgloseMeses[key] = { dias: 0, monto: 0 };
    }
    desgloseMeses[key].dias += 1;
    desgloseMeses[key].monto += tarifaDiaria;

    curr.setDate(curr.getDate() + 1);
  }

  return Object.entries(desgloseMeses).map(([mesClave, data]) => {
    const [anio, mes] = mesClave.split('-');
    const fechaObj = new Date(Number(anio), Number(mes) - 1, 1);
    const nombreMes = fechaObj.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });

    const totalMes = Math.round(data.monto * 100) / 100;
    const facturadoMes = Math.round((totalMes * ratioFacturado) * 100) / 100;
    const pendienteMes = Math.round((totalMes - facturadoMes) * 100) / 100;

    return {
      mesClave,
      nombreMes: nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1),
      diasActivos: data.dias,
      montoTotal: totalMes,
      montoFacturado: facturadoMes,
      montoPendiente: pendienteMes
    };
  });
};