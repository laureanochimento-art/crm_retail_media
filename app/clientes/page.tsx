"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Cliente } from "../../lib/types";

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  
  // Estados del Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'CREATE' | 'EDIT'>('CREATE');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [guardando, setGuardando] = useState(false);

  // Estado del Formulario
  const [formData, setFormData] = useState<Partial<Cliente>>({
    nombre: "", cuit: "", es_agencia: false, numero_cliente: "", 
    contacto_email: "", direccion: "", telefono: "", 
    rep_nombre: "", rep_dni: "", rep_cargo: "", sector: "", secciones: ""
  });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    setCargando(true);
    const { data, error } = await supabase.from('clientes').select('*').order('nombre', { ascending: true });
    if (error) console.error("Error cargando clientes:", error);
    else setClientes(data as Cliente[]);
    setCargando(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const openCreateModal = () => {
    setFormData({ nombre: "", cuit: "", es_agencia: false, numero_cliente: "", contacto_email: "", direccion: "", telefono: "", rep_nombre: "", rep_dni: "", rep_cargo: "", sector: "", secciones: "" });
    setModalMode('CREATE');
    setIsModalOpen(true);
  };

  const openEditModal = (cliente: Cliente) => {
    setFormData(cliente);
    setEditingId(cliente.id);
    setModalMode('EDIT');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.cuit) {
      alert("El nombre y el CUIT son obligatorios.");
      return;
    }
    
    setGuardando(true);
    try {
      if (modalMode === 'CREATE') {
        const { error } = await supabase.from('clientes').insert([formData]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('clientes').update(formData).eq('id', editingId);
        if (error) throw error;
      }
      await fetchClientes();
      setIsModalOpen(false);
    } catch (error: any) {
      alert("Error al guardar: " + error.message);
    } finally {
      setGuardando(false);
    }
  };

  const handleDelete = async (id: number, nombre: string) => {
    if (!window.confirm(`¿Estás seguro de eliminar a ${nombre}? Esto podría afectar los acuerdos asociados.`)) return;
    const { error } = await supabase.from('clientes').delete().eq('id', id);
    if (error) alert("Error al eliminar: " + error.message);
    else fetchClientes();
  };

  const clientesFiltrados = clientes.filter(c => 
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    c.cuit.includes(busqueda)
  );

  return (
    <div className="w-full h-full flex flex-col gap-6 p-8 overflow-y-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Directorio de Clientes</h1>
          <p className="text-slate-400 text-sm">Gestión de agencias, anunciantes y datos de facturación.</p>
        </div>
        <button onClick={openCreateModal} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          <span className="material-symbols-outlined text-sm">add</span> Nuevo Cliente
        </button>
      </div>

      {/* BUSCADOR */}
      <div className="bg-slate-900/60 border border-white/10 p-4 rounded-xl backdrop-blur-md flex items-center gap-3">
        <span className="material-symbols-outlined text-slate-500">search</span>
        <input 
          type="text" 
          placeholder="Buscar por nombre o CUIT..." 
          value={busqueda} 
          onChange={(e) => setBusqueda(e.target.value)} 
          className="bg-transparent border-none outline-none text-white w-full text-sm placeholder:text-slate-500"
        />
      </div>

      {/* TABLA DE CLIENTES */}
      <div className="bg-slate-900/60 border border-white/10 rounded-xl backdrop-blur-md overflow-hidden flex-1">
        <div className="overflow-x-auto h-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-700/50">
                <th className="p-4 font-semibold">Cliente</th>
                <th className="p-4 font-semibold">CUIT</th>
                <th className="p-4 font-semibold">Tipo</th>
                <th className="p-4 font-semibold">Contacto</th>
                <th className="p-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-sm">
              {cargando ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Cargando clientes...</td></tr>
              ) : clientesFiltrados.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">No se encontraron clientes.</td></tr>
              ) : (
                clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-white">{cliente.nombre}</div>
                      <div className="text-xs text-slate-500">{cliente.numero_cliente ? `Nº ${cliente.numero_cliente}` : 'Sin Nº asignado'}</div>
                    </td>
                    <td className="p-4 text-slate-300 font-mono text-xs">{cliente.cuit}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${cliente.es_agencia ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                        {cliente.es_agencia ? 'Agencia' : 'Directo'}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 text-xs">{cliente.contacto_email || '—'}</td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => openEditModal(cliente)} className="text-slate-400 hover:text-cyan-400 transition-colors p-1" title="Editar">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button onClick={() => handleDelete(cliente.id, cliente.nombre)} className="text-slate-400 hover:text-rose-400 transition-colors p-1" title="Eliminar">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL CREAR/EDITAR */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-slate-900 border border-white/20 rounded-xl shadow-2xl w-full max-w-4xl relative max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-slate-900/80">
              <h3 className="font-semibold text-xl text-white">{modalMode === 'CREATE' ? 'Nuevo Cliente' : 'Editar Cliente'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><span className="material-symbols-outlined">close</span></button>
            </div>
            
            <div className="overflow-y-auto p-6">
              <form id="clienteForm" onSubmit={handleSave} className="space-y-6">
                
                {/* BLOQUE 1: Datos Principales */}
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-4 border-b border-white/10 pb-2 text-sm uppercase">1. Datos Principales</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Razón Social / Nombre *</label>
                      <input required type="text" name="nombre" value={formData.nombre || ''} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400 outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">CUIT *</label>
                      <input required type="text" name="cuit" value={formData.cuit || ''} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400 outline-none font-mono" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Nº Cliente (SAP/Interno)</label>
                      <input type="text" name="numero_cliente" value={formData.numero_cliente || ''} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400 outline-none font-mono" />
                    </div>
                    <div className="flex items-end pb-2">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" name="es_agencia" checked={formData.es_agencia || false} onChange={handleInputChange} className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500" />
                        <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">Este cliente es una Agencia</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* BLOQUE 2: Contacto y Dirección */}
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-4 border-b border-white/10 pb-2 text-sm uppercase">2. Contacto y Facturación</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Dirección Fiscal Completa</label>
                      <input type="text" name="direccion" value={formData.direccion || ''} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400 outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Email de Contacto</label>
                      <input type="email" name="contacto_email" value={formData.contacto_email || ''} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400 outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Teléfono</label>
                      <input type="text" name="telefono" value={formData.telefono || ''} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400 outline-none" />
                    </div>
                  </div>
                </div>

                {/* BLOQUE 3: Representante Legal (Contrato) */}
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-4 border-b border-white/10 pb-2 text-sm uppercase">3. Representante (Para Contratos)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Nombre Representante Legal</label>
                      <input type="text" name="rep_nombre" value={formData.rep_nombre || ''} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400 outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">DNI Representante</label>
                      <input type="text" name="rep_dni" value={formData.rep_dni || ''} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400 outline-none" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-1">Cargo Representante</label>
                      <input type="text" name="rep_cargo" value={formData.rep_cargo || ''} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400 outline-none" placeholder="Ej: Apoderado, Gerente General..." />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-semibold text-slate-400 block mb-1">Sector</label>
                        <input type="text" name="sector" value={formData.sector || ''} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400 outline-none" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-400 block mb-1">Secciones</label>
                        <input type="text" name="secciones" value={formData.secciones || ''} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:border-cyan-400 outline-none" />
                      </div>
                    </div>
                  </div>
                </div>

              </form>
            </div>
            
            <div className="p-4 border-t border-white/10 bg-slate-900/80 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded font-semibold text-sm text-slate-400 hover:bg-slate-800 transition-colors">Cancelar</button>
              <button form="clienteForm" type="submit" disabled={guardando} className="px-6 py-2 rounded font-bold text-sm bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors disabled:opacity-50">
                {guardando ? 'Guardando...' : 'Guardar Cliente'}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}