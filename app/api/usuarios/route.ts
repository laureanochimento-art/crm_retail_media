import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// --- CREAR USUARIO (Auth + Tabla) ---
export async function POST(request: Request) {
  try {
    const { nombre, email, password, rol, estado } = await request.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
    });

    if (authError) throw authError;

    const { error: dbError } = await supabaseAdmin.from('usuarios').insert([{
      nombre,
      email,
      rol,
      estado
    }]);

    if (dbError) throw dbError;

    return NextResponse.json({ success: true, message: "Usuario creado" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// --- ELIMINAR USUARIO (Auth + Tabla) ---
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const id = searchParams.get('id');

    if (!email || !id) {
      return NextResponse.json({ error: "Faltan datos para eliminar" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    // 1. Borramos el perfil visual de la tabla 'usuarios'
    const { error: dbError } = await supabaseAdmin.from('usuarios').delete().eq('id', id);
    if (dbError) throw dbError;

  // Busca las líneas 60-65 en app/api/usuarios/route.ts y reemplázalas por esto:
  const { data: { users } } = await supabaseAdmin.auth.admin.listUsers();
  if (users) {
    const authUser = (users as any[]).find((u: any) => u.email === email);
    if (authUser) {
      await supabaseAdmin.auth.admin.deleteUser(authUser.id);
    }
  }

    return NextResponse.json({ success: true, message: "Usuario eliminado completamente" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}