import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const validEmail = process.env.ADMIN_EMAIL;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (!validEmail || !validPassword) {
    return NextResponse.json(
      { error: "Credenciais de administrador não configuradas no servidor." },
      { status: 500 }
    );
  }

  if (email !== validEmail || password !== validPassword) {
    return NextResponse.json({ error: "E-mail ou senha inválidos." }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
