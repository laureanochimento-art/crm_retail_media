export interface Cliente {
  id: number;
  nombre: string;
  cuit: string;
  es_agencia: boolean;
  numero_cliente?: string;
  contacto_email?: string;
  
  // NUEVOS CAMPOS PARA EL CONTRATO PDF
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
  canal: 'Digital' | 'InStore';
  elemento: string;
  precio_base: number;
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

// NUEVO: INTERFAZ PARA ADJUNTOS
export interface Adjunto {
  id: string;
  nombre: string;
  url: string;
  tipo: string; 
  tamaño?: number;
  categoria?: 'DISEÑO' | 'EAN' | 'RENDER' | 'GENERAL'; // <-- ESTA ES LA LÍNEA NUEVA
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
  descuento_porcentaje: number;
  fecha_desde?: string | null;
  fecha_hasta?: string | null;
  created_at?: string;
  es_reclasificado?: boolean;
  monto_facturado?: number;
  
  // NUEVO CAMPO DE ADJUNTOS
  adjuntos?: Adjunto[];
  
  cliente?: Cliente;
  marca_auspiciante?: Cliente;
  catalogo?: CatalogoItem;
  tiendas?: Tienda[];
  vendedor?: Usuario; 
}