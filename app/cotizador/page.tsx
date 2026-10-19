"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import FormularioAcuerdo from "../../components/FormularioAcuerdo"; // <-- IMPORTAMOS EL COMPONENTE MAESTRO

export default function CotizadorPage() {
  const router = useRouter();
  const [verificando, setVerificando] = useState(true);

  // Verificamos que el usuario no sea ADMINISTRATIVO (ellos no pueden cotizar)
  useEffect(() => {
    const checkAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        const { data } = await supabase.from('usuarios').select('rol').eq('email', session.user.email).single();
        if (data && data.rol === 'ADMINISTRATIVO') {
          router.push('/crm');
        } else {
          setVerificando(false);
        }
      } else {
        setVerificando(false);
      }
    };
    checkAccess();
  }, [router]);

  if (verificando) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <p className="text-cyan-400 font-semibold animate-pulse">Verificando accesos...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden rounded-xl border border-white/10 shadow-2xl">
      {/* 
        AQUÍ LLAMAMOS AL NUEVO COMPONENTE MAESTRO
        Le pasamos las reglas específicas del Cotizador: pantalla completa y redirección al guardar.
      */}
      <FormularioAcuerdo 
        origen="COTIZADOR"
        modo="CREATE"
        dealAEditar={null}
        onCerrar={() => router.push('/crm')} // Por si acaso (aunque no hay botón de cerrar en el Cotizador)
        onGuardadoExitoso={() => {
          // Cuando se guarde con éxito, enviamos al usuario al tablero CRM
          router.push('/crm');
        }}
      />
    </div>
  );
}