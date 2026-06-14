import { NextRequest, NextResponse } from "next/server";
import { getMergedSiteConfig, saveConfigOverrides } from "@/lib/configStore";

export async function GET() {
  try {
    const config = await getMergedSiteConfig();
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao carregar configuração." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const config = await request.json();
    await saveConfigOverrides(config);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao salvar configuração." },
      { status: 500 }
    );
  }
}
