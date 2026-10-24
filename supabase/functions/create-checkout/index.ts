import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

// Payment creation is deliberately disabled until the premium artifact,
// webhook signature verification, receipt-to-entitlement mapping, and
// delivery/recovery flows have all passed staging tests.
// Disabling only the React button does not protect a public Edge Function.
const TRUSTED_ORIGINS = new Set([
  "https://openclaw-skillshub.com",
  "https://www.openclaw-skillshub.com",
]);

function reply(message: string, status: number, origin?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
    "Vary": "Origin",
  };
  if (origin && TRUSTED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return new Response(JSON.stringify({ error: message }), { status, headers });
}

serve((request: Request) => {
  const origin = request.headers.get("origin") ?? undefined;
  if (origin && !TRUSTED_ORIGINS.has(origin)) {
    return reply("Origin not allowed.", 403);
  }

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin ?? "https://openclaw-skillshub.com",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
        "Cache-Control": "no-store",
        "Vary": "Origin",
      },
    });
  }

  if (request.method !== "POST") {
    return reply("Method not allowed.", 405, origin);
  }

  // Fail closed: a direct API call must not charge a customer while there
  // is no deployable, independently verified paid fulfillment system.
  return reply(
    "Pro Bundle checkout is temporarily unavailable while paid delivery is being verified.",
    503,
    origin,
  );
});
