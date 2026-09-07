"use client";

import { Usuario } from '../../lib/types';
import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'CREATE' | 'EDIT'>('CREATE');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [rol, setRol] = useState<'JEFE_VENTAS' | 'VENDEDOR' | 'ADMINISTRATIVO'>('VENDEDOR');
  const [estado, setEstado] = useState<'ACTIVO' | 'INACTIVO'>('ACTIVO');
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('usuarios').select('*').order('created_at', { ascending: false });
    if (data) setUsuarios(data as Usuario[]);
    if (error) console.error(error);
    setLoading(false);
  };

  const openCreateModal = () => {
    setNombre("");
    setEmail("");
    setPassword("");
    setRol('VENDEDOR');
    setEstado('ACTIVO');
    setModalMode('CREATE');
    setIsModalOpen(true);
  };

  const openEditModal = (user: Usuario) => {
    setNombre(user.nombre);
    setEmail(user.email);
    setRol(user.rol);
    setEstado(user.estado);
    setEditingUserId(user.id);
    setModalMode('EDIT');
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!nombre.trim() || !email.trim()) {
      alert("El nombre y el email son obligatorios.");
      return;
    }

    if (modalMode === 'CREATE' && password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setGuardando(true);
    try {
      if (modalMode === 'CREATE') {
        const res = await fetch('/api/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, email, password, rol, estado })
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Error al crear usuario");
        }
      } else {
        const { error } = await supabase.from('usuarios').update({ nombre, email, rol, estado }).eq('id', editingUserId);
        if (error) throw error;
      }
      
      await fetchUsuarios();
      setIsModalOpen(false);
    } catch (error: any) {
      console.error(error);
      alert(`Hubo un error: ${error.message}`);
    } finally {
      setGuardando(false);
    }
  };

  // --- NUEVA FUNCIÓN DE ELIMINADO TOTAL ---
  const handleDelete = async (id: string, userEmail: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario DEFINITIVAMENTE del sistema?")) return;
    
    // Lo ocultamos visualmente rápido para que se sienta ágil
    const previousUsers = [...usuarios];
    setUsuarios(prev => prev.filter(u => u.id !== id));
    
    try {
      // Llamamos a la API para destruir credenciales y perfil
      const res = await fetch(`/api/usuarios?id=${id}&email=${userEmail}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }
    } catch (error: any) {
      console.error(error);
      alert(`Hubo un error al eliminar: ${error.message}`);
      setUsuarios(previousUsers); // Si falla, lo volvemos a mostrar
    }
  };

  const formatRolName = (rolKey: string) => {
    if (rolKey === 'JEFE_VENTAS') return 'Jefe de Ventas';
    if (rolKey === 'ADMINISTRATIVO') return 'Administrativo Comercial';
    return 'Vendedor';
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-8 overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Gestión de Usuarios</h1>
          <p className="text-slate-400 text-sm">Administra el acceso y los roles del equipo.</p>
        </div>
        <button 
          onClick={openCreateModal} 
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
        >
          <span className="material-symbols-outlined text-sm">person_add</span> Nuevo Usuario
        </button>
      </div>

      <div className="bg-slate-900/60 border border-white/10 rounded-xl backdrop-blur-md overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/80 border-b border-white/10 text-xs uppercase text-slate-400 font-semibold">
            <tr>
              <th className="px-6 py-4">Usuario</th>
              <th className="px-6 py-4">Rol</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center italic text-slate-500">Cargando usuarios...</td></tr>
            ) : usuarios.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-8 text-center italic text-slate-500">No hay usuarios registrados.</td></tr>
            ) : (
              usuarios.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                        {user.nombre.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.nombre}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                      user.rol === 'JEFE_VENTAS' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                      user.rol === 'VENDEDOR' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                      'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                      {formatRolName(user.rol)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-semibold ${user.estado === 'ACTIVO' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      <span className={`w-2 h-2 rounded-full ${user.estado === 'ACTIVO' ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
                      {user.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEditModal(user)} className="p-2 text-slate-400 hover:text-cyan-400 transition-colors bg-slate-800 rounded">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button onClick={() => handleDelete(user.id, user.email)} className="p-2 text-slate-400 hover:text-rose-400 transition-colors bg-slate-800 rounded">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-slate-900 border border-white/20 rounded-xl shadow-2xl w-full max-w-md relative z-10 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-xl text-white">
                {modalMode === 'CREATE' ? 'Nuevo Usuario' : 'Editar Usuario'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Nombre Completo *</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-cyan-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Correo Electrónico *</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={modalMode === 'EDIT'} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-cyan-400 disabled:opacity-50" />
              </div>
              
              {modalMode === 'CREATE' && (
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Contraseña *</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-cyan-400" />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Rol</label>
                  <select value={rol} onChange={(e) => setRol(e.target.value as any)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-cyan-400">
                    <option value="JEFE_VENTAS">Jefe de Ventas</option>
                    <option value="VENDEDOR">Vendedor</option>
                    <option value="ADMINISTRATIVO">Administrativo Comercial</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Estado</label>
                  <select value={estado} onChange={(e) => setEstado(e.target.value as any)} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-cyan-400">
                    <option value="ACTIVO">Activo</option>
                    <option value="INACTIVO">Inactivo</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-slate-300 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">Cancelar</button>
              <button onClick={handleSave} disabled={guardando} className="px-4 py-2 text-sm font-bold bg-cyan-500 text-slate-900 rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                {guardando ? "Guardando..." : "Guardar Usuario"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}