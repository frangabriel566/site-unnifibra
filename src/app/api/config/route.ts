import { NextRequest, NextResponse } from "next/server";
import { getMergedSiteConfig, saveConfigOverrides } from "@/lib/configStore";
import { getTokenFromRequest, isValidAdminToken, unauthorizedResponse } from "@/lib/adminAuth";
import { SiteConfig } from "@/types";

function stripSecrets(config: SiteConfig): SiteConfig {
  return {
    ...config,
    github: {
      repositoryUrl: config.github.repositoryUrl,
      mainBranch: config.github.mainBranch,
      deployStatus: config.github.deployStatus,
      vercelUrl: config.github.vercelUrl,
      lastUpdate: config.github.lastUpdate,
      // githubApiToken and vercelApiToken never sent to client
    },
  };
}

export async function GET(request: NextRequest) {
  if (!isValidAdminToken(getTokenFromRequest(request) ?? "")) {
    return unauthorizedResponse();
  }
  try {
    const config = await getMergedSiteConfig();
    return NextResponse.json(stripSecrets(config));
  } catch {
    return NextResponse.json({ error: "Erro ao carregar configuração." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!isValidAdminToken(getTokenFromRequest(request) ?? "")) {
    return unauthorizedResponse();
  }
  try {
    const config = await request.json();
    await saveConfigOverrides(config);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro ao salvar configuração." }, { status: 500 });
  }
}
