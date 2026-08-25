'use client';

import { useState } from 'react';
import { CATALOGO_RETAIL_MEDIA } from '../../data/catalogo';

interface ItemCotizacion {
  id: string;
  canal: string;
  categoria: string;
  elemento: string;
  especificaciones: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export default function CotizadorPage() {
  const [canal, setCanal] = useState<'ONLINE' | 'OFFLINE' | ''>('');
  const [categoriaId, setCategoriaId] = useState<string>('');
  const [elementoId, setElementoId] = useState<string>('');
  const [cantidad, setCantidad] = useState<number>(1);
  const [precioUnitario, setPrecioUnitario] = useState<number>(0);
  const [items, setItems] = useState<ItemCotizacion[]>([]);

  // Búsqueda del canal
  const canalActual = CATALOGO_RETAIL_MEDIA.find((c) => c.canal === canal);
  const categoriasDisponibles = canalActual ? canalActual.categorias : [];

  // Búsqueda de la categoría
  const categoriaActual = categoriasDisponibles.find((cat) => cat.id === categoriaId);
  const elementosDisponibles = categoriaActual ? categoriaActual.elementos : [];

  // Búsqueda del elemento
  const elementoActual = elementosDisponibles.find((el) => el.id === elementoId);

  const handleCanalChange = (val: string) => {
    setCanal(val as 'ONLINE' | 'OFFLINE' | '');
    setCategoriaId('');
    setElementoId('');
  };

  const handleCategoriaChange = (val: string) => {
    setCategoriaId(val);
    setElementoId('');
  };

  const agregarItem = () => {
    if (!canal || !categoriaActual || !elementoActual || cantidad <= 0) return;

    const nuevoItem: ItemCotizacion = {
      id: crypto.randomUUID(),
      canal,
      categoria: categoriaActual.nombre,
      elemento: elementoActual.nombre,
      especificaciones: elementoActual.especificaciones,
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
              value={canal}
              onChange={(e) => handleCanalChange(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            >
              <option value="">-- Seleccionar Canal --</option>
              <option value="ONLINE">Online (E-Commerce)</option>
              <option value="OFFLINE">Offline (In Store)</option>
            </select>
          </div>

          {/* PASO 2: CATEGORÍA */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>2. Categoría</label>
            <select
              value={categoriaId}
              onChange={(e) => handleCategoriaChange(e.target.value)}
              disabled={!canal}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: !canal ? '#e2e8f0' : '#fff' }}
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
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: !categoriaId ? '#e2e8f0' : '#fff' }}
            >
              <option value="">-- Seleccionar Elemento --</option>
              {elementosDisponibles.map((el) => (
                <option key={el.id} value={el.id}>{el.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        {elementoActual && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#334155' }}>
              <strong>Especificaciones:</strong> {elementoActual.especificaciones}
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
