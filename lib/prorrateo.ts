import { Deal } from './types';

export interface MesProrrateado {
  mesClave: string; // Formato YYYY-MM
  nombreMes: string; // Formato "Enero 2026"
  diasActivos: number;
  montoBase: number;
  tasaInflacionMes: number;
  factorInflacionAcumulado: number;
  montoConInflacion: number;
  montoTotal: number;
  montoFacturado: number;
  montoPendiente: number;
}

export const obtenerMesesRango = (desdeStr: string, hastaStr: string): string[] => {
  const meses: string[] = [];
  if (!desdeStr || !hastaStr) return meses;
  const rawInicio = new Date(`${desdeStr}T00:00:00`);
  const rawFin = new Date(`${hastaStr}T00:00:00`);
  if (isNaN(rawInicio.getTime()) || isNaN(rawFin.getTime())) return meses;

  const inicio = rawInicio <= rawFin ? rawInicio : rawFin;
  const fin = rawInicio <= rawFin ? rawFin : rawInicio;

  const curr = new Date(inicio.getFullYear(), inicio.getMonth(), 1);
  const finMes = new Date(fin.getFullYear(), fin.getMonth(), 1);

  while (curr <= finMes) {
    const key = `${curr.getFullYear()}-${String(curr.getMonth() + 1).padStart(2, '0')}`;
    meses.push(key);
    curr.setMonth(curr.getMonth() + 1);
  }
  return meses;
};

export const formatearNombreMes = (claveMes: string): string => {
  if (!claveMes) return "";
  const [anio, mes] = claveMes.split('-');
  const fechaObj = new Date(Number(anio), Number(mes) - 1, 1);
  const nombre = fechaObj.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });
  return nombre.charAt(0).toUpperCase() + nombre.slice(1);
};

export const calcularProrrateoDeal = (deal: Deal): MesProrrateado[] => {
  if (!deal) return [];

  const elementos = deal.elementos_json || [];
  if (elementos.length === 0) return [];

  const fechasTodas = elementos.flatMap((i: any) => [
    i.fechaDesde || deal.fecha_desde,
    i.fechaHasta || deal.fecha_hasta
  ]).filter((f): f is string => Boolean(f) && !isNaN(new Date(`${f}T00:00:00`).getTime()));

  if (fechasTodas.length === 0) return [];

  const fechaMin = fechasTodas.reduce((min, cur) => cur < min ? cur : min);
  const fechaMax = fechasTodas.reduce((max, cur) => cur > max ? cur : max);
  const mesesCronologicos = obtenerMesesRango(fechaMin, fechaMax);

  const inflacionConfig: Record<string, number> = {};
  const inflacionGuardada = (deal as any).inflacion_mensual || [];

  if (Array.isArray(inflacionGuardada) && inflacionGuardada.length > 0) {
    inflacionGuardada.forEach((inf: any) => {
      inflacionConfig[inf.mesClave] = Number(inf.tasa || 0);
    });
  }

  const factoresCompuestos: Record<string, { tasa: number; factor: number }> = {};
  let factorAcumulado = 1.0;

  mesesCronologicos.forEach((mesKey, index) => {
    if (index === 0) {
      factoresCompuestos[mesKey] = { tasa: 0, factor: 1.0 };
    } else {
      const tasaMes = inflacionConfig[mesKey] !== undefined ? inflacionConfig[mesKey] : (deal.tasa_inflacion || 0);
      factorAcumulado = factorAcumulado * (1 + (tasaMes / 100));
      factoresCompuestos[mesKey] = { tasa: tasaMes, factor: factorAcumulado };
    }
  });

  const desgloseMeses: Record<string, { diasSet: Set<string>; montoBase: number }> = {};
  mesesCronologicos.forEach(m => {
    desgloseMeses[m] = { diasSet: new Set<string>(), montoBase: 0 };
  });

  elementos.forEach((item: any) => {
    const fDesde = item.fechaDesde || deal.fecha_desde;
    const fHasta = item.fechaHasta || deal.fecha_hasta;
    if (!fDesde || !fHasta) return;

    const d1Raw = new Date(`${fDesde}T00:00:00`);
    const d2Raw = new Date(`${fHasta}T00:00:00`);
    if (isNaN(d1Raw.getTime()) || isNaN(d2Raw.getTime())) return;

    const inicio = d1Raw <= d2Raw ? d1Raw : d2Raw;
    const fin = d1Raw <= d2Raw ? d2Raw : d1Raw;
    const diffDias = Math.max(1, Math.ceil((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24)) + 1);

    // Se toma el subtotal neto del elemento
    const subtotalElemento = item.subtotal !== undefined 
      ? Number(item.subtotal) 
      : Number(item.precioLista || 0);

    const periodo = item.periodo || 'Mensual';

    if (periodo === 'Único' || periodo === 'único' || periodo === 'Unico') {
      const mesInicioKey = `${inicio.getFullYear()}-${String(inicio.getMonth() + 1).padStart(2, '0')}`;
      if (desgloseMeses[mesInicioKey]) {
        desgloseMeses[mesInicioKey].montoBase += subtotalElemento;
        desgloseMeses[mesInicioKey].diasSet.add(inicio.toISOString().split('T')[0]);
      }
    } else {
      // Se prorratea exactamente por los días de duración del acuerdo
      const tarifaDiaria = subtotalElemento / diffDias;

      const curr = new Date(inicio);
      while (curr <= fin) {
        const keyMes = `${curr.getFullYear()}-${String(curr.getMonth() + 1).padStart(2, '0')}`;
        const keyDia = curr.toISOString().split('T')[0];

        if (desgloseMeses[keyMes]) {
          desgloseMeses[keyMes].diasSet.add(keyDia);
          desgloseMeses[keyMes].montoBase += tarifaDiaria;
        }
        curr.setDate(curr.getDate() + 1);
      }
    }
  });

  const montoFacturadoTotal = Number(deal.monto_facturado) || 0;
  const montoTotalAcuerdo = Number(deal.amount) || 1;
  const ratioFacturado = Math.min(1, Math.max(0, montoFacturadoTotal / montoTotalAcuerdo));

  return mesesCronologicos.map(mesClave => {
    const data = desgloseMeses[mesClave] || { diasSet: new Set(), montoBase: 0 };
    const factorInfo = factoresCompuestos[mesClave] || { tasa: 0, factor: 1.0 };

    const montoBaseMes = Math.round(data.montoBase * 100) / 100;
    const montoConInflacionMes = Math.round((montoBaseMes * factorInfo.factor) * 100) / 100;

    const descuentoPrc = deal.descuento_porcentaje || 0;
    const totalMesFinal = Math.max(0, Math.round((montoConInflacionMes * (1 - (descuentoPrc / 100))) * 100) / 100);

    const facturadoMes = Math.round((totalMesFinal * ratioFacturado) * 100) / 100;
    const pendienteMes = Math.round((totalMesFinal - facturadoMes) * 100) / 100;

    return {
      mesClave,
      nombreMes: formatearNombreMes(mesClave),
      diasActivos: data.diasSet.size,
      montoBase: montoBaseMes,
      tasaInflacionMes: factorInfo.tasa,
      factorInflacionAcumulado: factorInfo.factor,
      montoConInflacion: montoConInflacionMes,
      montoTotal: totalMesFinal,
      montoFacturado: facturadoMes,
      montoPendiente: pendienteMes
    };
  });
};

export const calcularProrrateoPorDias = (
  fechaDesdeStr?: string | null,
  fechaHastaStr?: string | null,
  montoTotal: number = 0,
  montoFacturadoTotal: number = 0
): MesProrrateado[] => {
  return calcularProrrateoDeal({
    id: 0,
    cliente_id: 0,
    catalogo_id: 0,
    amount: montoTotal,
    channel: 'Digital',
    stage: 'OPORTUNIDAD',
    descuento_porcentaje: 0,
    monto_facturado: montoFacturadoTotal,
    fecha_desde: fechaDesdeStr,
    fecha_hasta: fechaHastaStr,
    elementos_json: [
      {
        nombre: 'Campaña',
        periodo: 'Mensual',
        precioLista: montoTotal,
        subtotal: montoTotal,
        fechaDesde: fechaDesdeStr,
        fechaHasta: fechaHastaStr
      }
    ]
  });
};