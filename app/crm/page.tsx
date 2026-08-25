'use client';

import { useState } from 'react';

type EtapaCRM = 'OPORTUNIDAD' | 'COTIZADO' | 'POR_FACTURAR' | 'FACTURADO' | 'RECLASIFICADO';

interface Oportunidad {
  id: string;
  cliente: string;
  canal: 'ONLINE' | 'OFFLINE';
  monto: number;
  etapa: EtapaCRM;
}

const ETAPAS: EtapaCRM[] = ['OPORTUNIDAD', 'COTIZADO', 'POR_FACTURAR', 'FACTURADO', 'RECLASIFICADO'];

export default function CrmPage() {
  const [oportunidades, setOportunidades] = useState<Oportunidad[]>([
    { id: '1', cliente: 'Coca-Cola', canal: 'ONLINE', monto: 450000, etapa: 'COTIZADO' },
    { id: '2', cliente: 'Unilever', canal: 'OFFLINE', monto: 1200000, etapa: 'POR_FACTURAR' },
    { id: '3', cliente: 'Nestlé', canal: 'ONLINE', monto: 300000, etapa: 'FACTURADO' },
  ]);

  const [cliente, setCliente] = useState('');
  const [canal, setCanal] = useState<'ONLINE' | 'OFFLINE'>('ONLINE');
  const [monto, setMonto] = useState(0);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const crearOportunidad = () => {
    if (!cliente || monto <= 0) return;

    const nueva: Oportunidad = {
      id: crypto.randomUUID(),
      cliente,
      canal,
      monto,
      etapa: 'OPORTUNIDAD',
    };

    setOportunidades([...oportunidades, nueva]);
    setCliente('');
    setMonto(0);
  };

  const moverEtapa = (id: string, nuevaEtapa: EtapaCRM) => {
    setOportunidades((prev) =>
      prev.map((op) => (op.id === id ? { ...op, etapa: nuevaEtapa } : op))
    );
  };

  const moverPaso = (id: string, direccion: 'IZQ' | 'DER') => {
    const op = oportunidades.find((o) => o.id === id);
    if (!op) return;
    const index = ETAPAS.indexOf(op.etapa);
    const nuevoIndex = direccion === 'DER' ? index + 1 : index - 1;
    if (nuevoIndex >= 0 && nuevoIndex < ETAPAS.length) {
      moverEtapa(id, ETAPAS[nuevoIndex]);
    }
  };

  const handleDrop = (e: React.DragEvent, etapaDestino: EtapaCRM) => {
    e.preventDefault();
    if (draggedId) {
      moverEtapa(draggedId, etapaDestino);
      setDraggedId(null);
    }
  };

  const calcularTotalEtapa = (etapa: EtapaCRM) =>
    oportunidades
      .filter((op) => op.etapa === etapa)
      .reduce((sum, op) => sum + op.monto, 0);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Pipeline CRM - Retail Media
      </h1>

      <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Nueva Oportunidad</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600' }}>Cliente</label>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              style={{ padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600' }}>Canal</label>
            <select
              value={canal}
              onChange={(e) => setCanal(e.target.value as 'ONLINE' | 'OFFLINE')}
              style={{ padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
            >
              <option value="ONLINE">Online</option>
              <option value="OFFLINE">Offline</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600' }}>Monto ($)</label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(Number(e.target.value))}
              style={{ padding: '0.4rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
            />
          </div>
          <button
            onClick={crearOportunidad}
            style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Guardar Oportunidad
          </button>
        </div>
      </div>

      {/* TABLERO DRAG & DROP */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {ETAPAS.map((etapa) => (
          <div
            key={etapa}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, etapa)}
            style={{
              border: '2px dashed #cbd5e1',
              borderRadius: '8px',
              backgroundColor: '#fafafa',
              padding: '1rem',
              minHeight: '350px',
            }}
          >
            <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', borderBottom: '2px solid #cbd5e1', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
              {etapa.replace('_', ' ')}
            </h3>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '1rem' }}>
              ${calcularTotalEtapa(etapa).toLocaleString()}
            </div>

            {oportunidades
              .filter((op) => op.etapa === etapa)
              .map((op) => {
                const index = ETAPAS.indexOf(op.etapa);
                return (
                  <div
                    key={op.id}
                    draggable
                    onDragStart={() => setDraggedId(op.id)}
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid #cbd5e1',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      marginBottom: '0.75rem',
                      cursor: 'grab',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    }}
                  >
                    <div style={{ fontWeight: 'bold' }}>{op.cliente}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Canal: {op.canal}</div>
                    <div style={{ fontWeight: '600', marginTop: '0.25rem', color: '#0f172a' }}>${op.monto.toLocaleString()}</div>
                    
                    {/* BOTONES DE MOVIMIENTO RÁPIDO */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                      <button
                        onClick={() => moverPaso(op.id, 'IZQ')}
                        disabled={index === 0}
                        style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', cursor: index === 0 ? 'not-allowed' : 'pointer' }}
                      >
                        ←
                      </button>
                      <button
                        onClick={() => moverPaso(op.id, 'DER')}
                        disabled={index === ETAPAS.length - 1}
                        style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', cursor: index === ETAPAS.length - 1 ? 'not-allowed' : 'pointer' }}
                      >
                        →
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}
