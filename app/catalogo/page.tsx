"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { CatalogoItem } from "../../lib/types";

export default function CatalogoPage() {
  const [items, setItems] = useState<CatalogoItem[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  
  // Estados del Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'CREATE' | 'EDIT'>('CREATE');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [guardando, setGuardando] = useState(false);

  // Estado del Formulario (AÑADIDO EL PERIODO)
  const [formData, setFormData] = useState<Partial<CatalogoItem>>({
    elemento: "",
    canal: "InStore",
    precio_base: 0,
    periodo: "Mensual" // Por defecto
  });

  useEffect(() => {
    fetchCatalogo();
  }, []);

  const fetchCatalogo = async () => {
    setCargando(true);
    const { data, error } = await supabase.from('catalogo').select('*').order('canal', { ascending: true }).order('elemento', { ascending: true });
    if (error) console.error("Error cargando catálogo:", error);
    else setItems(data as CatalogoItem[]);
    setCargando(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? Number(value) : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const openCreateModal = () => {
    setFormData({ elemento: "", canal: "InStore", precio_base: 0, periodo: "Mensual" });
    setModalMode('CREATE');
    setIsModalOpen(true);
  };

  const openEditModal = (item: CatalogoItem) => {
    setFormData({
      ...item,
      periodo: item.periodo || 'Único' // Manejo por si hay elementos viejos sin periodo
    });
    setEditingId(item.id);
    setModalMode('EDIT');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.elemento || formData.precio_base === undefined) {
      alert("El nombre del elemento y el precio son obligatorios.");
      return;
    }
    
    // Si eligen 'Único', lo mandamos como string limpio
    const dataToSave = { ...formData, periodo: formData.periodo === 'Único' ? 'Único' : formData.periodo };

    setGuardando(true);
    try {
      if (modalMode === 'CREATE') {
        const { error } = await supabase.from('catalogo').insert([dataToSave]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('catalogo').update(dataToSave).eq('id', editingId);
        if (error) throw error;
      }
      await fetchCatalogo();
      setIsModalOpen(false);
    } catch (error: any) {
      alert("Error al guardar: " + error.message);
    } finally {
      setGuardando(false);
    }
  };

  const handleDelete = async (id: number, elemento: string) => {
    if (!window.confirm(`¿Estás seguro de eliminar el elemento "${elemento}"? Esto podría afectar acuerdos existentes.`)) return;
    const { error } = await supabase.from('catalogo').delete().eq('id', id);
    if (error) alert("Error al eliminar: " + error.message);
    else fetchCatalogo();
  };

  const itemsFiltrados = items.filter(item => 
    item.elemento.toLowerCase().includes(busqueda.toLowerCase()) || 
    item.canal.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col gap-6 p-8 overflow-y-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Catálogo y Precios</h1>
          <p className="text-slate-400 text-sm">Gestiona los espacios InStore y Digitales con sus valores base.</p>
        </div>
        <button onClick={openCreateModal} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          <span className="material-symbols-outlined text-sm">add</span> Nuevo Elemento
        </button>
      </div>

      {/* BUSCADOR */}
      <div className="bg-slate-900/60 border border-white/10 p-4 rounded-xl backdrop-blur-md flex items-center gap-3">
        <span className="material-symbols-outlined text-slate-500">search</span>
        <input 
          type="text" 
          placeholder="Buscar por nombre o canal..." 
          value={busqueda} 
          onChange={(e) => setBusqueda(e.target.value)} 
          className="bg-transparent border-none outline-none text-white w-full text-sm placeholder:text-slate-500"
        />
      </div>

      {/* TABLA DE CATÁLOGO */}
      <div className="bg-slate-900/60 border border-white/10 rounded-xl backdrop-blur-md overflow-hidden flex-1">
        <div className="overflow-x-auto h-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-700/50">
                <th className="p-4 font-semibold">Elemento Publicitario</th>
                <th className="p-4 font-semibold">Canal</th>
                <th className="p-4 font-semibold">Periodo</th>
                <th className="p-4 font-semibold">Precio Base (ARS)</th>
                <th className="p-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-sm">
              {cargando ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Cargando catálogo...</td></tr>
              ) : itemsFiltrados.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">No se encontraron elementos.</td></tr>
              ) : (
                itemsFiltrados.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-white">{item.elemento}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${item.canal === 'Digital' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                        {item.canal}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-slate-300 text-xs font-semibold bg-slate-800 px-2 py-1 rounded">
                        {item.periodo || 'Único'}
                      </span>
                    </td>
                    <td className="p-4 text-emerald-400 font-mono font-semibold">
                      ${item.precio_base.toLocaleString('es-AR')}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => openEditModal(item)} className="text-slate-400 hover:text-cyan-400 transition-colors p-1" title="Editar">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button onClick={() => handleDelete(item.id, item.elemento)} className="text-slate-400 hover:text-rose-400 transition-colors p-1" title="Eliminar">
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
          <div className="bg-slate-900 border border-white/20 rounded-xl shadow-2xl w-full max-w-md relative flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h3 className="font-semibold text-xl text-white">{modalMode === 'CREATE' ? 'Nuevo Elemento' : 'Editar Elemento'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><span className="material-symbols-outlined">close</span></button>
            </div>
            
            <div className="p-6">
              <form id="catalogoForm" onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Nombre del Elemento *</label>
                  <input required type="text" name="elemento" value={formData.elemento || ''} onChange={handleInputChange} placeholder="Ej: Puntera de Góndola, Banner Home..." className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-white text-sm focus:border-cyan-400 outline-none" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">Canal *</label>
                    <select required name="canal" value={formData.canal || 'InStore'} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-white text-sm focus:border-cyan-400 outline-none appearance-none">
                      <option value="InStore">InStore (Físico)</option>
                      <option value="Digital">Digital</option>
                    </select>
                  </div>
                  
                  {/* SELECTOR DE PERIODO AGREGADO */}
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">Periodo (Cobro) *</label>
                    <select required name="periodo" value={formData.periodo || 'Mensual'} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-white text-sm focus:border-cyan-400 outline-none appearance-none">
                      <option value="Semanal">Semanal</option>
                      <option value="Mensual">Mensual</option>
                      <option value="Único">Único (Campaña completa)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Precio Base (ARS) *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <input required type="number" name="precio_base" min="0" step="0.01" value={formData.precio_base || 0} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 pl-7 text-white text-sm focus:border-cyan-400 outline-none font-mono" />
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-4 border-t border-white/10 bg-slate-900/80 flex justify-end gap-3 rounded-b-xl">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded font-semibold text-sm text-slate-400 hover:bg-slate-800 transition-colors">Cancelar</button>
              <button form="catalogoForm" type="submit" disabled={guardando} className="px-6 py-2 rounded font-bold text-sm bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors disabled:opacity-50">
                {guardando ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}