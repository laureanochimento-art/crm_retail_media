"use client";

import React, { useState } from "react";

interface SearchableSelectProps {
  options: { id: string | number; label: string }[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}

export default function SearchableSelect({ options, value, onChange, placeholder }: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedOption = options.find((o) => o.id.toString() === value.toString());
  const displayValue = isOpen ? search : (selectedOption ? selectedOption.label : "");

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={displayValue}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
            if (value) onChange(""); 
          }}
          onFocus={() => {
            setIsOpen(true);
            setSearch(""); 
          }}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)} 
          placeholder={placeholder}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
        />
        <span className="material-symbols-outlined absolute right-3 top-3 text-slate-500 pointer-events-none text-lg">
          expand_more
        </span>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <div
                key={opt.id}
                onMouseDown={(e) => {
                  e.preventDefault(); 
                  onChange(opt.id.toString());
                  setIsOpen(false);
                }}
                className="p-3 hover:bg-slate-700 cursor-pointer text-sm text-white border-b border-slate-700/50 last:border-0"
              >
                {opt.label}
              </div>
            ))
          ) : (
            <div className="p-3 text-sm text-slate-400 italic">No se encontraron resultados</div>
          )}
        </div>
      )}
    </div>
  );
}