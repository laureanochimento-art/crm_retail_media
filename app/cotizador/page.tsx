'use client';

import { useState } from 'react';

// CATÁLOGO INTEGRADO AUTÓNOMO (Sin dependencias externas)
const CATALOGO = [
  {
    canal: 'ONLINE',
    nombreCanal: 'Online (E-Commerce)',
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
    nombreCanal: 'Offline (In Store)',
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

export default function CotizadorPage() {
  const [canalKey, setCanalKey] = useState<string>('');
  const [categoriaId, setCategoriaId] = useState<string>('');
  const [elementoId, setElementoId] = useState<string>('');
  const [cantidad, setCantidad] = useState<number>(1);
  const [precioUnitario, setPrecioUnitario] = useState<number>(0);
  const [items, setItems] = useState<any[]>([]);

  // Búsqueda en objeto local
  const canalSeleccionado = CATALOGO.find((c) => c.canal === canalKey);
  const categoriasDisponibles = canalSeleccionado ? canalSeleccionado.categorias : [];

  const categoriaSeleccionada = categoriasDisponibles.find((cat) => cat.id === categoriaId);
  const elementosDisponibles = categoriaSeleccionada ? categoriaSeleccionada.elementos : [];

  const elementoSeleccionado = elementosDisponibles.find((el) => el.id === elementoId);

  const agregarItem = () => {
    if (!canalSeleccionado || !categoriaSeleccionada || !elementoSeleccionado) return;

    const nuevoItem = {
      id: crypto.randomUUID(),
      canal: canalSeleccionado.canal,
      categoria: categoriaSeleccionada.nombre,
      elemento: elementoSeleccionado.nombre,
      especificaciones: elementoSeleccionado.especificaciones,
      cantidad,
      precioUnitario,
      subtotal: cantidad * precioUnitario,
    };

    setItems([...items, nuevoItem]);
    setElementoId('');
    setCantidad(1);
    setPrecioUnitario(0);
  };

  const eliminarItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const totalCotizacion = items.reduce((acc, curr) => acc + curr.subtotal, 0);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>Cotizador Retail Media</h1>

      <div style={{ border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', backgroundColor: '#f8fafc' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>1. Seleccionar Espacio</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {/* PASO 1: CANAL */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>1. Canal</label>
            <select
              value={canalKey}
              onChange={(e) => {
                setCanalKey(e.target.value);
                setCategoriaId('');
                setElementoId('');
              }}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: '0.9rem' }}
            >
              <option value="">-- Seleccionar Canal --</option>
              {CATALOGO.map((c) => (
                <option key={c.canal} value={c.canal}>{c.nombreCanal}</option>
              ))}
            </select>
          </div>

          {/* PASO 2: CATEGORÍA */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>2. Categoría</label>
            <select
              value={categoriaId}
              onChange={(e) => {
                setCategoriaId(e.target.value);
                setElementoId('');
              }}
              disabled={!canalKey}
              style={{ 
                width: '100%', 
                padding: '0.6rem', 
                borderRadius: '4px', 
                border: '1px solid #cbd5e1', 
                backgroundColor: !canalKey ? '#f1f5f9' : '#fff',
                fontSize: '0.9rem'
              }}
            >
              <option value="">-- Seleccionar Categoría --</option>
              {categoriasDisponibles.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))}
            </select>
          </div>

          {/* PASO 3: ELEMENTO */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>3. Elemento</label>
            <select
              value={elementoId}
              onChange={(e) => setElementoId(e.target.value)}
              disabled={!categoriaId}
              style={{ 
                width: '100%', 
                padding: '0.6rem', 
                borderRadius: '4px', 
                border: '1px solid #cbd5e1', 
                backgroundColor: !categoriaId ? '#f1f5f9' : '#fff',
                fontSize: '0.9rem'
              }}
            >
              <option value="">-- Seleccionar Elemento --</option>
              {elementosDisponibles.map((el) => (
                <option key={el.id} value={el.id}>{el.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        {elementoSeleccionado && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#334155' }}>
              <strong>Especificaciones:</strong> {elementoSeleccionado.especificaciones}
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600' }}>Cantidad</label>
                <input
                  type="number"
                  min="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
                  style={{ width: '80px', padding: '0.4rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600' }}>Precio Unitario ($)</label>
                <input
                  type="number"
                  min="0"
                  value={precioUnitario}
                  onChange={(e) => setPrecioUnitario(Number(e.target.value))}
                  style={{ width: '130px', padding: '0.4rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                />
              </div>
              <button
                onClick={agregarItem}
                style={{ backgroundColor: '#2563eb', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: '600' }}
              >
                + Agregar ítem
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RESUMEN DE LA PROPUESTA */}
      <div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>2. Resumen de la Propuesta</h2>
        {items.length === 0 ? (
          <p style={{ color: '#64748b', fontStyle: 'italic' }}>No hay ítems agregados a la propuesta.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                <th style={{ padding: '0.75rem' }}>Canal</th>
                <th style={{ padding: '0.75rem' }}>Espacio</th>
                <th style={{ padding: '0.75rem' }}>Especificaciones</th>
                <th style={{ padding: '0.75rem' }}>Cant.</th>
                <th style={{ padding: '0.75rem' }}>Precio U.</th>
                <th style={{ padding: '0.75rem' }}>Subtotal</th>
                <th style={{ padding: '0.75rem' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.75rem', fontWeight: '600' }}>{item.canal}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <div><strong>{item.elemento}</strong></div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.categoria}</div>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#475569' }}>{item.especificaciones}</td>
                  <td style={{ padding: '0.75rem' }}>{item.cantidad}</td>
                  <td style={{ padding: '0.75rem' }}>${item.precioUnitario.toLocaleString()}</td>
                  <td style={{ padding: '0.75rem', fontWeight: '600' }}>${item.subtotal.toLocaleString()}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <button
                      onClick={() => eliminarItem(item.id)}
                      style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Quitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: '2px solid #cbd5e1', backgroundColor: '#f8fafc' }}>
                <td colSpan={5} style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold', fontSize: '1rem' }}>Monto Total Neto:</td>
                <td colSpan={2} style={{ padding: '0.75rem', fontWeight: 'bold', fontSize: '1rem', color: '#16a34a' }}>
                  ${totalCotizacion.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </div>
  );
}
