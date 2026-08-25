export const metadata = {
  title: 'Retail Media CRM & Cotizador',
  description: 'Plataforma para gestión de pautas Online u Offline',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
