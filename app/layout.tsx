"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const isLoginPage = pathname === "/login";

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      setIsAuthenticated(!!session);
      
      if (session?.user?.email) {
        const { data } = await supabase.from('usuarios').select('rol, nombre').eq('email', session.user.email).single();
        if (data) {
          setUserRole(data.rol);
          setUserName(data.nombre);
        }
      }

      setLoading(false);
      if (!session && !isLoginPage) router.push("/login");
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      checkUser();
      if (!session && !isLoginPage) {
        router.push("/login");
      } else if (session && isLoginPage) {
        router.push("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router, isLoginPage]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <html lang="es" className="dark">
        <body className="bg-[#0e1416] min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
            <p className="text-cyan-400 font-semibold animate-pulse">Cargando plataforma...</p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="es" className="dark">
      <body className="bg-[#0e1416] text-slate-100 min-h-screen flex overflow-hidden">
        <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-[#0e1416] via-[#1a0b2e] to-[#0a192f] opacity-80"></div>

        {isLoginPage ? (
          <main className="w-full h-screen flex items-center justify-center z-50 relative">
            {children}
          </main>
        ) : (
          <>
            <nav className="bg-slate-900/60 h-screen w-64 fixed left-0 top-0 backdrop-blur-md border-r border-white/10 shadow-xl flex flex-col py-6 z-50">
              <div className="px-6 mb-8">
                <h1 className="font-bold text-cyan-400 tracking-tighter text-3xl">Carrefour Media</h1>
                <p className="text-slate-400 text-sm mt-1">Management Platform</p>
              </div>
              
              <ul className="flex-1 flex flex-col gap-2">
                <li>
                  <Link href="/" className={`px-4 py-3 flex items-center gap-3 transition-all hover:bg-white/5 ${pathname === '/' ? 'text-cyan-400 font-bold bg-white/5 border-r-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}>
                    <span className="material-symbols-outlined">home</span>
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/crm" className={`px-4 py-3 flex items-center gap-3 transition-all hover:bg-white/5 ${pathname === '/crm' ? 'text-cyan-400 font-bold bg-white/5 border-r-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}>
                    <span className="material-symbols-outlined">view_kanban</span>
                    CRM
                  </Link>
                </li>
                
                {userRole !== 'ADMINISTRATIVO' && (
                  <li>
                    <Link href="/cotizador" className={`px-4 py-3 flex items-center gap-3 transition-all hover:bg-white/5 ${pathname === '/cotizador' ? 'text-cyan-400 font-bold bg-white/5 border-r-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}>
                      <span className="material-symbols-outlined">payments</span>
                      Cotizador
                    </Link>
                  </li>
                )}

                <li>
                  <Link href="/facturacion" className={`px-4 py-3 flex items-center gap-3 transition-all hover:bg-white/5 ${pathname === '/facturacion' ? 'text-cyan-400 font-bold bg-white/5 border-r-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}>
                    <span className="material-symbols-outlined">receipt_long</span>
                    Facturación
                  </Link>
                </li>

                <li>
                  <Link href="/dashboard" className={`px-4 py-3 flex items-center gap-3 transition-all hover:bg-white/5 ${pathname === '/dashboard' ? 'text-cyan-400 font-bold bg-white/5 border-r-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}>
                    <span className="material-symbols-outlined">monitoring</span>
                    Dashboard
                  </Link>
                </li>
                
                {userRole === 'JEFE_VENTAS' && (
                  <li>
                    <Link href="/usuarios" className={`px-4 py-3 flex items-center gap-3 transition-all hover:bg-white/5 ${pathname === '/usuarios' ? 'text-cyan-400 font-bold bg-white/5 border-r-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}>
                      <span className="material-symbols-outlined">manage_accounts</span>
                      Usuarios
                    </Link>
                  </li>
                )}
              </ul>
              
              <div className="mt-auto px-4">
                <button onClick={handleLogout} className="w-full text-slate-400 hover:text-rose-400 px-4 py-3 flex items-center gap-3 transition-all hover:bg-rose-500/10 rounded-lg">
                  <span className="material-symbols-outlined">logout</span>
                  Cerrar Sesión
                </button>
              </div>
            </nav>

            <header className="bg-slate-900/40 fixed top-0 right-0 left-64 h-16 backdrop-blur-lg border-b border-white/10 shadow-sm flex justify-between items-center px-6 z-40">
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Carrefour Media Platform
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Link 
                  href="/perfil" 
                  className="flex items-center gap-3 p-1.5 pr-3 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer group"
                  title="Mi Perfil / Configuración"
                >
                  <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-400 font-bold flex items-center justify-center text-xs group-hover:scale-105 transition-transform">
                    {userRole === 'JEFE_VENTAS' ? 'JV' : userRole === 'VENDEDOR' ? 'VE' : userRole === 'ADMINISTRATIVO' ? 'AD' : '?'}
                  </div>
                  <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                    {userName || 'Mi Perfil'}
                  </span>
                </Link>
              </div>
            </header>

            <main className="ml-64 mt-16 p-8 w-full h-[calc(100vh-4rem)] flex flex-col overflow-y-auto">
              {children}
            </main>
          </>
        )}
      </body>
    </html>
  );
}