"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function PerfilPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error', texto: string } | null>(null);

  useEffect(() => {
    cargarDatosUsuario();
  }, []);

  const cargarDatosUsuario = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user?.email) {
      setEmail(session.user.email);
      const { data } = await supabase.from('usuarios').select('*').eq('email', session.user.email).single();
      if (data) {
        setNombre(data.nombre || "");
        setRol(data.rol || "");
      }
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje(null);

    if (newPassword.length < 6) {
      setMensaje({ tipo: 'error', texto: "La contraseña debe tener al menos 6 caracteres." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMensaje({ tipo: 'error', texto: "Las contraseñas no coinciden." });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      setMensaje({ tipo: 'exito', texto: "¡Contraseña actualizada con éxito!" });
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setMensaje({ tipo: 'error', texto: err.message || "Error al actualizar la contraseña." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-8 text-white overflow-y-auto max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Perfil de Usuario</h1>
        <p className="text-slate-400 text-sm mt-1">Administra tus datos personales y credenciales de acceso.</p>
      </div>

      {mensaje && (
        <div className={`p-4 rounded-xl border text-sm font-semibold ${
          mensaje.tipo === 'exito' 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
            : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
        }`}>
          {mensaje.texto}
        </div>
      )}

      {/* INFORMACIÓN DEL USUARIO */}
      <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md space-y-4">
        <h2 className="text-lg font-bold text-cyan-400 border-b border-white/10 pb-2">Información Personal</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Nombre</label>
            <input type="text" value={nombre} disabled className="w-full bg-slate-950/50 border border-slate-800 rounded-lg p-2.5 text-slate-300 text-sm cursor-not-allowed" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Correo Electrónico</label>
            <input type="text" value={email} disabled className="w-full bg-slate-950/50 border border-slate-800 rounded-lg p-2.5 text-slate-300 text-sm cursor-not-allowed" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Rol en Sistema</label>
            <input type="text" value={rol} disabled className="w-full bg-slate-950/50 border border-slate-800 rounded-lg p-2.5 text-slate-300 text-sm cursor-not-allowed font-semibold text-amber-400" />
          </div>
        </div>
      </div>

      {/* CAMBIO DE CONTRASEÑA */}
      <div className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
        <h2 className="text-lg font-bold text-cyan-400 border-b border-white/10 pb-2 mb-4">Seguridad y Acceso</h2>
        
        <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Nueva Contraseña</label>
            <input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Confirmar Nueva Contraseña</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-5 py-2.5 rounded-lg transition-all text-sm disabled:opacity-50"
          >
            {loading ? "Actualizando..." : "Actualizar Contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
}