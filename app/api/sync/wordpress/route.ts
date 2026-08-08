import { NextResponse } from "next/server";

function isAuthorized(request: Request): boolean {
  const syncSecret = process.env.SYNC_SECRET;
  const cronSecret = process.env.CRON_SECRET;
  const allowed = new Set([syncSecret, cronSecret].filter(Boolean) as string[]);
  if (!allowed.size) return false;

  const headerSecret = request.headers.get("x-sync-secret");
  const authHeader = request.headers.get("authorization");
  const bearer = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  return Boolean(
    (headerSecret && allowed.has(headerSecret)) || (bearer && allowed.has(bearer))
  );
}

async function triggerDeploy(): Promise<{ ok: boolean; error?: string }> {
  const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!deployHookUrl) {
    return { ok: false, error: "VERCEL_DEPLOY_HOOK_URL is not configured" };
  }

  const res = await fetch(deployHookUrl, { method: "POST" });
  if (!res.ok) {
    return { ok: false, error: `Deploy hook returned ${res.status}` };
  }

  return { ok: true };
}

export async function GET(request: Request) {
  return handleSync(request);
}

export async function POST(request: Request) {
  return handleSync(request);
}

async function handleSync(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const deploy = await triggerDeploy();
  if (!deploy.ok) {
    return NextResponse.json({ ok: false, error: deploy.error }, { status: 503 });
  }

  return NextResponse.json({ ok: true, triggered: true });
}
