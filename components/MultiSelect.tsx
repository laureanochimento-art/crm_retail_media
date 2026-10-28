"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";

export interface MultiSelectOption {
  id: string | number;
  label: string;
  sublabel?: string;
}

interface MultiSelectProps {
  label: string;
  placeholder: string;
  options: MultiSelectOption[];
  selectedValues: (string | number)[];
  onChange: (newValues: (string | number)[]) => void;
  accentColor?: 'cyan' | 'amber' | 'purple' | 'emerald';
}

export default function MultiSelect({
  label,
  placeholder,
  options,
  selectedValues,
  onChange,
  accentColor = 'cyan'
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer clic fuera del componente
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return options;
    const term = searchTerm.toLowerCase();
    return options.filter(opt => 
      opt.label.toLowerCase().includes(term) || 
      (opt.sublabel && opt.sublabel.toLowerCase().includes(term))
    );
  }, [options, searchTerm]);

  const toggleOption = (id: string | number) => {
    const stringId = id.toString();
    const isSelected = selectedValues.some(val => val.toString() === stringId);
    if (isSelected) {
      onChange(selectedValues.filter(val => val.toString() !== stringId));
    } else {
      onChange([...selectedValues, id]);
    }
  };

  const handleSelectAll = () => {
    const allFilteredIds = filteredOptions.map(opt => opt.id);
    const setIds = new Set([...selectedValues.map(v => v.toString()), ...allFilteredIds.map(v => v.toString())]);
    onChange(options.filter(o => setIds.has(o.id.toString())).map(o => o.id));
  };

  const handleClear = () => {
    if (!searchTerm.trim()) {
      onChange([]);
    } else {
      const filteredSet = new Set(filteredOptions.map(o => o.id.toString()));
      onChange(selectedValues.filter(v => !filteredSet.has(v.toString())));
    }
  };

  // Texto que se muestra en el botón cuando está cerrado
  const buttonDisplayLabel = useMemo(() => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) {
      const match = options.find(o => o.id.toString() === selectedValues[0].toString());
      return match ? match.label : "1 seleccionado";
    }
    if (selectedValues.length === options.length && options.length > 0) {
      return `Todos (${options.length})`;
    }
    return `${selectedValues.length} seleccionados`;
  }, [selectedValues, options, placeholder]);

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
        {label}
        {selectedValues.length > 0 && (
          <span className="ml-1.5 text-cyan-400 font-mono">({selectedValues.length})</span>
        )}
      </label>

      {/* Botón trigger del selector */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-slate-950 border ${
          selectedValues.length > 0 ? 'border-cyan-500/60 bg-slate-900/80' : 'border-slate-700'
        } rounded-lg px-3 py-2 text-xs text-left text-white flex items-center justify-between focus:outline-none focus:border-cyan-400 transition-all`}
      >
        <span className={`truncate ${selectedValues.length === 0 ? 'text-slate-400' : 'font-semibold text-slate-100'}`}>
          {buttonDisplayLabel}
        </span>
        <span className="material-symbols-outlined text-slate-400 text-sm ml-2 flex-shrink-0">
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-72 animate-in fade-in zoom-in-95">
          {/* Buscador interno */}
          <div className="p-2 border-b border-slate-800 bg-slate-950/80">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filtrar opciones..."
                className="w-full bg-slate-900 border border-slate-700 rounded-md py-1.5 pl-7 pr-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                autoFocus
              />
              <span className="material-symbols-outlined absolute left-2 top-2 text-slate-500 text-xs pointer-events-none">
                search
              </span>
            </div>
            {/* Acciones de marcado rápido */}
            <div className="flex justify-between items-center text-[10px] mt-2 px-1">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-cyan-400 hover:underline font-semibold"
              >
                Seleccionar todos
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="text-slate-400 hover:text-white transition-colors"
              >
                Limpiar
              </button>
            </div>
          </div>

          {/* Lista de opciones con checkboxes */}
          <div className="overflow-y-auto p-1.5 space-y-0.5 divide-y divide-slate-800/40">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-center text-xs text-slate-500 italic">
                Sin coincidencias
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = selectedValues.some(v => v.toString() === opt.id.toString());
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleOption(opt.id)}
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs cursor-pointer select-none transition-colors ${
                      isSelected ? 'bg-cyan-950/40 text-cyan-200' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="rounded border-slate-600 bg-slate-950 text-cyan-500 focus:ring-0 cursor-pointer pointer-events-none"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="truncate block font-medium">{opt.label}</span>
                      {opt.sublabel && (
                        <span className="text-[10px] text-slate-500 block truncate font-mono">{opt.sublabel}</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}