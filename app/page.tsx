"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function HomePage() {
  const [usuario, setUsuario] = useState<{ nombre: string; rol: string; email: string } | null>(null);
  const [cargando, setCargando] = useState(true);

  const fechaHoy = new Date().toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        const { data } = await supabase.from('usuarios').select('*').eq('email', session.user.email).single();
        if (data) {
          setUsuario({
            nombre: data.nombre || 'Usuario',
            rol: data.rol || 'Sin Rol Asignado',
            email: data.email
          });
        }
      }
      setCargando(false);
    };
    fetchUser();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 relative">
      
      {/* Círculos decorativos de fondo */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-3xl w-full flex flex-col items-center text-center z-10">
        
        {/* Saludo */}
        <div className="mb-8">
          <span className="bg-slate-800 border border-slate-700 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
            Plataforma Activa
          </span>
          <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
            Bienvenido, <span className="text-cyan-400">{cargando ? '...' : usuario?.nombre}</span>
          </h1>
          <p className="text-lg text-slate-400">
            Hoy es <span className="capitalize">{fechaHoy}</span>. ¿Qué vamos a gestionar hoy?
          </p>
        </div>

        {/* Tarjeta de Rol Real */}
        <div className="bg-slate-900/60 border border-white/10 backdrop-blur-md rounded-2xl p-6 mb-12 w-full max-w-md flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-white">shield_person</span>
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-400 font-semibold uppercase">Rol Activo</p>
              <p className="text-white font-bold">{cargando ? 'Cargando...' : usuario?.rol}</p>
            </div>
          </div>
          <Link 
            href="/perfil" 
            className="text-[10px] font-bold bg-cyan-500/20 text-cyan-400 px-3 py-1.5 rounded-lg border border-cyan-500/30 uppercase hover:bg-cyan-500/30 transition-all"
          >
            Mi Perfil
          </Link>
        </div>

        {/* Accesos Rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          
          <Link href="/crm" className="group bg-slate-800/50 hover:bg-cyan-900/20 border border-slate-700 hover:border-cyan-500/50 rounded-2xl p-6 transition-all flex flex-col items-center text-center cursor-pointer shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1">
            <div className="w-14 h-14 bg-slate-900 group-hover:bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4 transition-colors">
              <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-cyan-400">view_kanban</span>
            </div>
            <h3 className="text-white font-bold mb-2">Pipeline CRM</h3>
            <p className="text-xs text-slate-400">Gestiona tus oportunidades, mueve tarjetas y revisa tus negocios activos.</p>
          </Link>

          {usuario?.rol !== 'ADMINISTRATIVO' && (
            <Link href="/cotizador" className="group bg-slate-800/50 hover:bg-emerald-900/20 border border-slate-700 hover:border-emerald-500/50 rounded-2xl p-6 transition-all flex flex-col items-center text-center cursor-pointer shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1">
              <div className="w-14 h-14 bg-slate-900 group-hover:bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-emerald-400">payments</span>
              </div>
              <h3 className="text-white font-bold mb-2">Nuevo Acuerdo</h3>
              <p className="text-xs text-slate-400">Arma cotizaciones digitales o InStore seleccionando tiendas y presupuestos.</p>
            </Link>
          )}

          <Link href="/dashboard" className="group bg-slate-800/50 hover:bg-purple-900/20 border border-slate-700 hover:border-purple-500/50 rounded-2xl p-6 transition-all flex flex-col items-center text-center cursor-pointer shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1">
            <div className="w-14 h-14 bg-slate-900 group-hover:bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 transition-colors">
              <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-purple-400">monitoring</span>
            </div>
            <h3 className="text-white font-bold mb-2">Dashboard</h3>
            <p className="text-xs text-slate-400">Revisa las métricas, el embudo de ventas y los clientes principales.</p>
          </Link>

        </div>
      </div>
    </div>
  );
}