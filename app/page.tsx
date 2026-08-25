import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: '3rem', fontFamily: 'system-ui, sans-serif', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Plataforma Retail Media</h1>
      <p style={{ color: '#475569', marginBottom: '2rem' }}>Gestión unificada de pautas Online & Offline</p>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link 
          href="/cotizador" 
          style={{ backgroundColor: '#2563eb', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '6px', textDecoration: 'none', fontWeight: '600' }}
        >
          Ir al Cotizador
        </Link>
        <Link 
          href="/crm" 
          style={{ backgroundColor: '#0d9488', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '6px', textDecoration: 'none', fontWeight: '600' }}
        >
          Ver Pipeline CRM
        </Link>
      </div>
    </div>
  );
}
