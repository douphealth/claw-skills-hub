import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Download, Loader2, RotateCcw, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { PRICE, PRODUCT_NAME } from "./ProBundle";

const SITE_URL = "https://openclaw-skillshub.com";
const downloadHref = (sid: string) => `/api/pro-bundle/download?session_id=${encodeURIComponent(sid)}`;

type State =
  | { kind: "checking" }
  | { kind: "ready"; sid: string; email: string | null; test: boolean }
  | { kind: "error"; reason: string };

const Ready = ({ sid, email, test }: { sid: string; email: string | null; test: boolean }) => (
  <div className="rounded-xl border bg-card p-6 md:p-8 text-center">
    <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
    <h2 className="text-2xl font-bold mb-2">Your kit is ready</h2>
    <p className="text-muted-foreground mb-6">
      Paid{email ? <> with <strong>{email}</strong></> : null}. {test && <strong>(Stripe test mode)</strong>}
    </p>
    <Button asChild size="lg" className="text-lg px-8 py-6 h-auto rounded-xl">
      <a href={downloadHref(sid)} onClick={() => window.gtag?.("event", "pro_bundle_download")}><Download className="mr-2 h-5 w-5" /> Download the kit (.zip)</a>
    </Button>
    <div className="text-left text-sm text-muted-foreground mt-8 space-y-2 max-w-md mx-auto">
      <p className="font-semibold text-foreground">Start here</p>
      <ol className="list-decimal pl-5 space-y-1">
        <li>Unzip it and open <code>README.md</code>.</li>
        <li>Check a skill: <code>node tools/clawkit.mjs vet @owner/slug</code></li>
        <li>Check what you already installed: <code>node tools/clawkit.mjs audit</code></li>
        <li>Open <code>catalog/catalog.html</code> in your browser.</li>
      </ol>
      <p>Not what you needed? Reply to your Stripe receipt within 14 days for a full refund.</p>
      <p>Bookmark this page to download again, or use <Link className="text-primary underline" to="/pro-bundle/restore">restore</Link> with your email and card's last 4 digits.</p>
    </div>
  </div>
);

const RestoreForm = ({ onFound }: { onFound: (sid: string) => void }) => {
  const [email, setEmail] = useState("");
  const [last4, setLast4] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr(null);
    try {
      const r = await fetch("/api/pro-bundle/restore", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, last4 }) });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.session_id) onFound(j.session_id);
      else setErr(j.reason || "No matching order found.");
    } catch {
      setErr("Could not reach the server. Try again in a minute.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <form onSubmit={submit} className="rounded-xl border bg-card p-6 md:p-8 space-y-4" aria-labelledby="restore-h">
      <h2 id="restore-h" className="text-2xl font-bold flex items-center gap-2"><RotateCcw className="h-6 w-6 text-primary" /> Restore your download</h2>
      <p className="text-sm text-muted-foreground">Enter the email you paid with and the last 4 digits of the card. We look the order up with Stripe; nothing is stored.</p>
      <label className="block text-sm font-medium">Email
        <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border bg-background px-3 py-2" />
      </label>
      <label className="block text-sm font-medium">Card's last 4 digits
        <input inputMode="numeric" pattern="\d{4}" maxLength={4} required autoComplete="off" value={last4} onChange={(e) => setLast4(e.target.value.replace(/\D/g, "").slice(0, 4))} className="mt-1 w-32 rounded-md border bg-background px-3 py-2" />
      </label>
      {err && <p role="alert" className="text-sm text-destructive">{err}</p>}
      <Button type="submit" disabled={busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Find my order</Button>
      <p className="text-xs text-muted-foreground">Still stuck? Reply to your Stripe receipt email and we'll send the kit.</p>
    </form>
  );
};

const ProBundleAccess = ({ mode }: { mode: "success" | "restore" }) => {
  const [state, setState] = useState<State>({ kind: "checking" });
  const [sid, setSid] = useState<string | null>(() =>
    typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("session_id") : null,
  );

  useEffect(() => {
    if (!sid) { setState({ kind: "error", reason: mode === "success" ? "This link has no order reference." : "" }); return; }
    let alive = true;
    setState({ kind: "checking" });
    fetch(`/api/pro-bundle/verify?session_id=${encodeURIComponent(sid)}`)
      .then(async (r) => ({ ok: r.ok, j: await r.json().catch(() => ({})) }))
      .then(({ ok, j }) => {
        if (!alive) return;
        if (ok && j.ok) {
          setState({ kind: "ready", sid, email: j.email ?? null, test: !!j.test });
          window.history.replaceState(null, "", `/pro-bundle/success/?session_id=${encodeURIComponent(sid)}`);
        } else setState({ kind: "error", reason: j.reason || "We couldn't confirm this order." });
      })
      .catch(() => alive && setState({ kind: "error", reason: "Could not reach the server. Refresh in a minute." }));
    return () => { alive = false; };
  }, [sid, mode]);

  return (
    <>
      <SEOHead
        title={mode === "success" ? `Download your ${PRODUCT_NAME}` : `Restore your ${PRODUCT_NAME} download`}
        description={`Download page for buyers of the ${PRODUCT_NAME}.`}
        canonical={`${SITE_URL}/pro-bundle/${mode}`}
        noindex
      />
      <Navbar />
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-xl space-y-6">
          {state.kind === "checking" && sid && (
            <p role="status" className="text-center text-muted-foreground"><Loader2 className="inline h-5 w-5 animate-spin mr-2" /> Confirming your payment with Stripe…</p>
          )}
          {state.kind === "ready" && <Ready sid={state.sid} email={state.email} test={state.test} />}
          {state.kind === "error" && state.reason && (
            <p role="alert" className="flex gap-2 justify-center text-destructive"><XCircle className="h-5 w-5 shrink-0" /> {state.reason}</p>
          )}
          {state.kind !== "ready" && (state.kind === "error" || mode === "restore") && <RestoreForm onFound={setSid} />}
          <p className="text-center text-sm text-muted-foreground">
            Not bought it yet? <Link className="text-primary underline" to="/pro-bundle">The {PRODUCT_NAME} is ${PRICE}</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProBundleAccess;
