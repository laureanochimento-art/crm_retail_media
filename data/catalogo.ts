export interface ElementoCatalogo {
  id: string;
  nombre: string;
  especificaciones: string;
}

export interface CategoriaCatalogo {
  id: string;
  nombre: string;
  elementos: ElementoCatalogo[];
}

export interface CanalCatalogo {
  canal: 'ONLINE' | 'OFFLINE';
  categorias: CategoriaCatalogo[];
}

export const CATALOGO_RETAIL_MEDIA: CanalCatalogo[] = [
  {
    canal: 'ONLINE',
    categorias: [
      {
        id: 'cat-atf',
        nombre: 'Banner Nativo Superior (ATF)',
        elementos: [
          { id: 'on-atf-cat', nombre: 'Category Native ATF', especificaciones: '1240x140 px (Desktop) / 400x150 px (Mobile)' },
          { id: 'on-atf-src', nombre: 'Search Native ATF', especificaciones: '1240x140 px (Desktop) / 400x150 px (Mobile)' },
          { id: 'on-atf-home', nombre: 'Home Native', especificaciones: '1240x140 px (Desktop) / 400x150 px (Mobile)' },
        ],
      },
      {
        id: 'cat-side',
        nombre: 'Banner Nativo Lateral (Side)',
        elementos: [
          { id: 'on-side-cat', nombre: 'Category Native Side', especificaciones: '232x400 px (Desktop) / 330x116 px (Mobile)' },
          { id: 'on-side-src', nombre: 'Search Native Side', especificaciones: '232x400 px (Desktop) / 330x116 px (Mobile)' },
        ],
      },
      {
        id: 'cat-sponsored',
        nombre: 'Productos Patrocinados',
        elementos: [
          { id: 'on-sp-cat', nombre: 'Sponsored Product Category', especificaciones: 'Grilla de productos (pos. 2 y 12 / 2 y 8)' },
          { id: 'on-sp-src', nombre: 'Sponsored Product Search', especificaciones: 'Match exacto/frase en motor de búsqueda' },
        ],
      },
      {
        id: 'cat-home-spec',
        nombre: 'Banners Especiales Home',
        elementos: [
          { id: 'on-maxi', nombre: 'Home Maxi Pedido', especificaciones: '1920x325 px (Desktop) / 718x318 px (Mobile)' },
          { id: 'on-serv', nombre: 'Home Servicios Carrefour', especificaciones: '1920x420 px (Desktop) / 720x672 px (Mobile)' },
          { id: 'on-set-home', nombre: 'Banner X Set Home', especificaciones: '232x400 px / 610x315 px' },
        ],
      },
      {
        id: 'cat-nav',
        nombre: 'Navegación y Directo',
        elementos: [
          { id: 'on-menu', nombre: 'Menu Native', especificaciones: '2100x261 px (Desktop) / 1125x408 px (Mobile)' },
          { id: 'on-email', nombre: 'Email MKT', especificaciones: '1000x450 px (Max 50kb)' },
        ],
      },
    ],
  },
  {
    canal: 'OFFLINE',
    categorias: [
      {
        id: 'cat-dooh',
        nombre: 'Digital & DOOH',
        elementos: [
          { id: 'off-led-ext', nombre: 'Pantalla LED Exterior', especificaciones: '960x576 px, video 10 seg' },
          { id: 'off-led-int', nombre: 'Pantalla LED Interior', especificaciones: '576x384 px, video 10 seg' },
          { id: 'off-cubo-led', nombre: 'Cubo LED Interior', especificaciones: '384x384 px por cara (Tienda 2)' },
          { id: 'off-gondola-dig', nombre: 'Tematización Digital de Góndola', especificaciones: 'Video mp4 en módulos de góndola' },
        ],
      },
      {
        id: 'cat-stoppers',
        nombre: 'Stoppers & Góndola',
        elementos: [
          { id: 'off-stop-std', nombre: 'Stopper Estándar', especificaciones: '20x40 cm / 15x70 cm' },
          { id: 'off-stop-xl', nombre: 'Stopper XL', especificaciones: '0.2x1.0 mt' },
          { id: 'off-stop-led', nombre: 'Stopper LED', especificaciones: '0.2x1.0 mt con marco ilumando' },
          { id: 'off-stop-hel', nombre: 'Stopper de Heladera', especificaciones: '18x36 cm' },
          { id: 'off-flejes', nombre: 'Flejes de Góndola', especificaciones: '65x3.5 cm / 77x7.5 cm (Mayorista)' },
          { id: 'off-movies', nombre: 'Movies / Saltarines', especificaciones: 'Formato dinámico sobre góndola' },
        ],
      },
      {
        id: 'cat-arcos',
        nombre: 'Estructuras & Arcos',
        elementos: [
          { id: 'off-arco-min', nombre: 'Arco en Minorista', especificaciones: 'MDF 10mm + Vinilo Blackout (0.3x2.6x0.4 mt)' },
          { id: 'off-arco-may', nombre: 'Arco en Mayorista', especificaciones: 'MDF 10mm + Vinilo Blackout (0.3x3.0x0.4 mt)' },
          { id: 'off-top-banner', nombre: 'Top Banner LED', especificaciones: 'Cabecera 1.3x0.4 mt + 2 Stoppers LED' },
          { id: 'off-cat-win', nombre: 'Category Window', especificaciones: 'Marco corrugado plástico 1.3x2.8 mt' },
          { id: 'off-cat-med', nombre: 'Category Media', especificaciones: 'Marco de góndola >2.5 m² comunicación' },
        ],
      },
      {
        id: 'cat-transito',
        nombre: 'Tránsito & Accesos',
        elementos: [
          { id: 'off-floor', nombre: 'Floor Media', especificaciones: '1 m² ó 2 m² con reserva blanca de 1cm' },
          { id: 'off-pasarela', nombre: 'Pasarela Espectacular', especificaciones: '10x1.25 mt en vinilo de alto tránsito' },
          { id: 'off-alarm', nombre: 'Alarm Media', especificaciones: 'Fundas de lona sobre alarmas de ingreso' },
          { id: 'off-door', nombre: 'Door Media', especificaciones: 'Vinilo microperforado en puertas de acceso (8 m²)' },
          { id: 'off-escaleras', nombre: 'Escaleras Mecánicas', especificaciones: 'Vinilo lateral + Bastidor 7.18x2.04 mt' },
          { id: 'off-rampas', nombre: 'Rampas', especificaciones: 'Adhesivo gran formato en accesos a sala' },
          { id: 'off-changuera', nombre: 'Changuera', especificaciones: 'Lona vinílica / Vinilo blackout en changueras' },
          { id: 'off-cart-med', nombre: 'Cart Media', especificaciones: 'Pai troquelado en frente/lateral de changuitos' },
        ],
      },
      {
        id: 'cat-exterior',
        nombre: 'Exteriores & Vía Pública',
        elementos: [
          { id: 'off-chupete', nombre: 'Chupete', especificaciones: '1.10x1.48 mt transiluminado' },
          { id: 'off-chupete-xl', nombre: 'Chupete XL', especificaciones: '1.20x1.75 mt transiluminado' },
          { id: 'off-arco-ext', nombre: 'Arco Exterior', especificaciones: 'Estructura en ingreso vehicular (9x6 mt)' },
          { id: 'off-cartel-front', nombre: 'Cartel Front', especificaciones: '2.90x1.60 mt (Valla) / 7.18x2.04 mt (Parking)' },
        ],
      },
      {
        id: 'cat-exhibicion',
        nombre: 'Exhibición & Branding',
        elementos: [
          { id: 'off-islas', nombre: 'Islas / Revestimiento Pallets', especificaciones: 'Desarrollo a medida en salón de ventas' },
          { id: 'off-botaderos', nombre: 'Botaderos', especificaciones: 'Exhibidor de alto tráfico a medida' },
          { id: 'off-wow', nombre: 'Espacios WOW', especificaciones: 'Estructuras de gran impacto en tiendas especiales' },
          { id: 'off-punteras', nombre: 'Punteras de Góndola', especificaciones: 'Carga de mercadería en pasillos principales' },
          { id: 'off-columnas', nombre: 'Columnas', especificaciones: 'Tematización de columnas con carga de producto' },
          { id: 'off-exhibidores', nombre: 'Exhibidores', especificaciones: 'Muebles de exhibición personalizados' },
          { id: 'off-banners', nombre: 'Banners In Store', especificaciones: 'Lona con soporte metálico (90x190 cm)' },
        ],
      },
      {
        id: 'cat-activaciones',
        nombre: 'Activaciones, Checkout & Audio',
        elementos: [
          { id: 'off-acciones-esp', nombre: 'Acciones Especiales (Parking/Tienda)', especificaciones: 'Sampling, juegos o unidades móviles' },
          { id: 'off-eventos', nombre: 'Eventos Especiales / Degustaciones', especificaciones: 'Stand promocional con personal' },
          { id: 'off-checkout', nombre: 'Separadores de Checkout', especificaciones: 'Branding en línea de cajas' },
          { id: 'off-cupones', nombre: 'Cupones Promocionales', especificaciones: 'Segmentables por ticket, horario o tienda' },
          { id: 'off-audio', nombre: 'Audio en Tienda', especificaciones: 'Spot de audio rotativo cada 30 minutos' },
        ],
      },
    ],
  },
];
