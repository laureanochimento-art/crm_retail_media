import type { Metadata } from "next";
import "./globals.css";
import ClientLayoutProvider from "./ClientLayoutProvider";

// Manejo de metadatos (SEO) desde el servidor
export const metadata: Metadata = {
  title: "Carrefour Media - Management Platform",
  description: "Plataforma de gestión y CRM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body 
        className="bg-[#0e1416] text-slate-100 min-h-screen flex overflow-hidden" 
        style={{ fontFamily: "'Geist', sans-serif" }}
      >
        {/* Envolvemos el contenido con el proveedor de cliente */}
        <ClientLayoutProvider>
          {children}
        </ClientLayoutProvider>
      </body>
    </html>
  );
}