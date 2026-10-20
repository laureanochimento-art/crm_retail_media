export interface Cliente {
  id: number;
  nombre: string;
  cuit: string;
  es_agencia: boolean;
  numero_cliente?: string;
  contacto_email?: string;
  direccion?: string;
  telefono?: string;
  rep_nombre?: string;
  rep_dni?: string;
  rep_cargo?: string;
  sector?: string;
  secciones?: string;
  created_at?: string;
}

export interface Tienda {
  id: number;
  numero: string;
  nombre: string;
  formato: 'Hiper' | 'Market' | 'Maxi' | 'Express';
  contacto_email?: string;
  created_at?: string;
}

export interface CatalogoItem {
  id: number;
  elemento: string;
  canal: 'Digital' | 'InStore' | 'Omnicanal';
  precio_base: number;
  periodo?: string;
  created_at?: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'JEFE_VENTAS' | 'VENDEDOR' | 'ADMINISTRATIVO';
  estado: 'ACTIVO' | 'INACTIVO';
  created_at?: string;
}

export interface Adjunto {
  id: string;
  nombre: string;
  url: string;
  tipo: string;
  tamaño?: number;
  categoria?: 'DISEÑO' | 'DISEÑO_DESKTOP' | 'DISEÑO_MOBILE' | 'EAN' | 'RENDER' | 'GENERAL';
  elemento_nombre?: string;
  catalogo_id?: number;
}

export interface Deal {
  id: number;
  titulo?: string;
  cliente_id: number;
  auspiciante_id?: number | null;
  catalogo_id: number;
  vendedor_id?: string | null;
  amount: number;
  channel: 'Digital' | 'InStore' | 'Omnicanal';
  stage: 'OPORTUNIDAD' | 'COTIZADO' | 'POR_FACTURAR' | 'FACTURADO' | 'PERDIDO';
  
  // Descuentos y sobreprecios
  descuento_global_tipo?: '%' | '$';
  descuento_global_valor?: number;
  descuento_porcentaje?: number;
  
  // Inflación mensual
  tasa_inflacion?: number;
  inflacion_mensual?: any[];

  fecha_desde?: string | null;
  fecha_hasta?: string | null;
  created_at?: string;
  es_reclasificado?: boolean;
  monto_facturado?: number;
  adjuntos?: Adjunto[];
  cliente?: Cliente;
  marca_auspiciante?: Cliente;
  catalogo?: CatalogoItem;
  tiendas?: Tienda[];
  vendedor?: Usuario;
  elementos_json?: any[];
}