import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Check, Download, FileCode2, Lock, RotateCcw, ShieldCheck, Table2, Terminal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { breadcrumbJsonLd, faqJsonLd } from "@/utils/jsonLd";
import stats from "@/data/proBundleStats.json";

const SITE_URL = "https://openclaw-skillshub.com";
export const PRODUCT_NAME = "OpenClaw Skill Safety Kit";
export const PRICE = "7.99";
const fmt = (n: number) => n.toLocaleString("en-US");

const inside = [
  {
    icon: Terminal,
    title: "clawkit: a skill checker for your terminal",
    body: "One file, no dependencies, Node 18+. Reads ClawHub's public API live, so it is current every time you run it.",
    points: [
      "vet @owner/slug: publisher, every scanner's result, copycat publishers, and a plain verdict with the reasons",
      "audit: checks every skill you already installed (reads your clawhub lockfile), flags outdated and risky ones",
      "find <words> --safe: search ClawHub and hide skills that fail the checks",
      "lint <folder>: catches the metadata mistakes ClawHub's review flags before you publish",
    ],
  },
  {
    icon: Table2,
    title: `Catalogue of the ${fmt(stats.skills)} most-downloaded skills`,
    body: `Snapshot of ${stats.snapshot}. Every skill with its owner-qualified install command, ClawHub's scan results and a verdict.`,
    points: [
      "Searchable offline page (catalog.html) plus the full table as CSV for Excel or Sheets",
      `${fmt(stats.copycatSlugs)} copycat slugs: which publisher is which, and the install command that can't pick the wrong one`,
      `Clean picks: the most-installed skills in each of ${stats.categories} categories that pass every check`,
    ],
  },
  {
    icon: BookOpen,
    title: "Three short playbooks",
    body: "Written from ClawHub's own CLI and security documentation, with links to the source for every command.",
    points: [
      "Safe install playbook: inspect, install pinned, audit monthly, remove cleanly",
      "Reading ClawHub scans: what each status, scanner and warning actually means",
      "Publish your first skill and pass review the first time",
    ],
  },
  {
    icon: FileCode2,
    title: "Three SKILL.md templates",
    body: "Minimal, command-line tool, and API-key skill. Each one passes clawkit lint and declares what it needs.",
    points: ["Correct frontmatter for name, description and required environment variables", "Example scripts that read secrets the declared way"],
  },
];

const vetSample = `$ node clawkit.mjs vet weather

@steipete/weather  [Review first]
  Weather — Get current weather and forecasts (no API key required).
  downloads 174,658 · installs 6,529 · stars 432
  ClawHub scan: clean (with warnings) · scanned v1.0.0
    - skillspector: clean · LOW · SAFE
    - llm: clean
  same slug, other publishers: @thcjp, @tongguanghai, @lfengwa2 … (8 more)
  why: Slug shared by 9 publishers: always install as @steipete/weather
  next: clawhub inspect @steipete/weather   then   clawhub install @steipete/weather`;

const faqs = [
  {
    question: "What exactly do I download?",
    answer: `A zip file with four folders: tools (clawkit.mjs), catalog (the ${fmt(stats.skills)}-skill catalogue as an offline web page and CSV files), guides (three Markdown playbooks) and templates (three SKILL.md starter skills). You download it straight after paying.`,
  },
  {
    question: "Does it include skills?",
    answer: "No. Skills are free on ClawHub and you should install them from there with the owner-qualified command. The kit helps you choose and check them; it does not repackage other people's skills.",
  },
  {
    question: "Does a good verdict mean a skill is safe?",
    answer: "No. The verdict summarises ClawHub's scanners, moderation, copycat publishers and install counts, and lists the reasons. It tells you where to look, not that there is nothing to find. The playbook shows how to read a skill before you install it.",
  },
  {
    question: "What do I need to run clawkit?",
    answer: "Node.js 18 or newer on macOS, Linux or Windows, and an internet connection to reach ClawHub's public API. No account, API key or install step.",
  },
  {
    question: "Will it go out of date?",
    answer: `clawkit reads ClawHub live, so its results are always current. The catalogue is a dated snapshot (${stats.snapshot}); re-check any skill with clawkit vet before installing.`,
  },
  {
    question: "Is this made by OpenClaw or ClawHub?",
    answer: "No. ClawSkills is an independent site. The kit uses ClawHub's public API and documentation and links to them as sources.",
  },
  {
    question: "I lost my download. Can I get it again?",
    answer: "Yes. Use the restore page with the email you paid with and the last 4 digits of the card. You can also reply to your Stripe receipt.",
  },
  {
    question: "How do I pay?",
    answer: "By card through Stripe Checkout. ClawSkills never sees or stores your card details, and Stripe emails you a receipt.",
  },
];

const productJsonLd = (inStock: boolean) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: PRODUCT_NAME,
  description: `Downloadable kit for checking OpenClaw skills before installing them: the clawkit command-line checker, a catalogue of the ${stats.skills} most-downloaded ClawHub skills with scan results, three playbooks and three SKILL.md templates.`,
  brand: { "@type": "Brand", name: "ClawSkills" },
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/pro-bundle/`,
    priceCurrency: "USD",
    price: PRICE,
    availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    seller: { "@type": "Organization", name: "ClawSkills" },
  },
});

/** Checkout is live only when the server has Stripe and the kit key configured. */
export function useCheckoutAvailable(): boolean | null {
  const [available, setAvailable] = useState<boolean | null>(null);
  useEffect(() => {
    let alive = true;
    fetch("/api/pro-bundle/status", { headers: { Accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : { available: false }))
      .then((j) => alive && setAvailable(!!j?.available))
      .catch(() => alive && setAvailable(false));
    return () => { alive = false; };
  }, []);
  return available;
}

const BuyButton = ({ available, placement }: { available: boolean | null; placement: string }) => {
  if (available === false) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Button type="button" size="lg" className="text-lg px-8 py-6 h-auto rounded-xl" disabled>
          <Lock className="mr-2 h-5 w-5" /> Checkout opens soon
        </Button>
        <p role="status" className="text-sm text-muted-foreground">Payments are not switched on yet. The free tools below work now.</p>
      </div>
    );
  }
  return (
    <a
      href="/api/pro-bundle/buy"
      onClick={() => window.gtag?.("event", "begin_checkout", { currency: "USD", value: Number(PRICE), items: [{ item_name: PRODUCT_NAME, price: Number(PRICE) }], placement })}
    >
      <Button size="lg" className="text-lg px-8 py-6 h-auto rounded-xl">
        <Download className="mr-2 h-5 w-5" /> Get the kit for ${PRICE}
      </Button>
    </a>
  );
};

const ProBundle = () => {
  const available = useCheckoutAvailable();
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const bounced = params?.get("checkout") === "unavailable";

  return (
    <>
      <SEOHead
        title={`${PRODUCT_NAME}: check ClawHub skills before you install ($${PRICE})`}
        description={`clawkit checks any ClawHub skill's publisher, scanners and copycats in seconds. Plus a catalogue of the ${stats.skills} most-downloaded skills with scan results, playbooks and SKILL.md templates. $${PRICE} one-time download.`}
        canonical={`${SITE_URL}/pro-bundle`}
        ogImage={`${SITE_URL}/og-image.png`}
        jsonLd={[
          productJsonLd(available === true),
          breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: PRODUCT_NAME, url: "/pro-bundle" }]),
          faqJsonLd(faqs),
        ]}
      />
      <Navbar />
      <main>
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Badge variant="outline" className="mb-5 border-primary/30 text-primary">ClawSkills Pro · one-time ${PRICE}</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Check every OpenClaw skill <span className="text-primary">before your agent runs it</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The {PRODUCT_NAME}: a command-line checker, a scanned catalogue of the {fmt(stats.skills)} most-downloaded ClawHub skills, and the playbooks to install and publish skills safely.
            </p>
            {bounced && available !== true && (
              <p role="alert" className="mb-4 text-sm text-destructive">Checkout isn't available right now. Nothing was charged.</p>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
              <BuyButton available={available} placement="hero" />
              <a href="#inside"><Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto rounded-xl">See what's inside</Button></a>
            </div>
            <p className="text-sm text-muted-foreground">Instant download · pay with Stripe · re-download any time</p>
          </div>
        </section>

        <section className="py-12 border-y bg-muted/30" aria-labelledby="why">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="why" className="text-2xl md:text-3xl font-bold text-center mb-8">Why check first? ClawHub's own data, {stats.snapshot}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="rounded-xl border bg-card p-6">
                <p className="text-4xl font-bold text-primary">{fmt(stats.sharedSlugSkills)}</p>
                <p className="text-sm text-muted-foreground mt-2">of the {fmt(stats.skills)} most-downloaded skills share their name with other publishers. The slug <code>{stats.mostPublishersSlug}</code> has {stats.mostPublishers}. A bare install can pick the wrong one.</p>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <p className="text-4xl font-bold text-primary">{fmt(stats.scannerDoNotInstall)}</p>
                <p className="text-sm text-muted-foreground mt-2">had at least one ClawHub scanner rate the latest version CRITICAL or "do not install", even where another scanner said clean.</p>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <p className="text-4xl font-bold text-primary">{fmt(stats.okToEvaluate)}</p>
                <p className="text-sm text-muted-foreground mt-2">passed every check in the kit: clean scan, no critical scanner finding, a unique name and real installs. Those are listed by category.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="inside" className="py-16 md:py-24" aria-labelledby="inside-h">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="inside-h" className="text-3xl md:text-4xl font-bold text-center mb-12">What's in the kit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inside.map((x) => (
                <div key={x.title} className="rounded-xl border bg-card p-6">
                  <x.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-xl font-semibold mb-2">{x.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{x.body}</p>
                  <ul className="space-y-2">
                    {x.points.map((p) => (
                      <li key={p} className="flex gap-2 text-sm"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span>{p}</span></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30" aria-labelledby="sample">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 id="sample" className="text-3xl font-bold text-center mb-3">A real check, start to finish</h2>
            <p className="text-center text-muted-foreground mb-8">Output of <code>clawkit vet</code> for one of ClawHub's most-installed skills, trimmed for width.</p>
            <pre className="rounded-xl border bg-card p-4 md:p-6 text-xs md:text-sm overflow-x-auto whitespace-pre"><code>{vetSample}</code></pre>
          </div>
        </section>

        <section className="py-16" aria-labelledby="how">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 id="how" className="text-3xl font-bold text-center mb-10">How buying works</h2>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Lock, t: "Pay with Stripe", d: `$${PRICE} once, no subscription. Stripe handles the card; we never see it.` },
                { icon: Download, t: "Download straight away", d: "You land on a download page as soon as the payment goes through." },
                { icon: RotateCcw, t: "Re-download any time", d: "Lost it? Restore with your email and the card's last 4 digits." },
              ].map((s, i) => (
                <li key={s.t} className="rounded-xl border bg-card p-6 text-center">
                  <s.icon className="h-7 w-7 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">{i + 1}. {s.t}</h3>
                  <p className="text-sm text-muted-foreground">{s.d}</p>
                </li>
              ))}
            </ol>
            <p className="text-center text-sm text-muted-foreground mt-6">Already bought it? <Link className="text-primary underline" to="/pro-bundle/restore">Restore your download</Link>.</p>
          </div>
        </section>

        <section className="py-16 bg-muted/30" aria-labelledby="faq">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 id="faq" className="text-3xl font-bold text-center mb-10">Questions</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.question} className="rounded-xl border bg-card p-5">
                  <h3 className="font-semibold mb-2">{f.question}</h3>
                  <p className="text-sm text-muted-foreground">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 text-center" aria-labelledby="cta">
          <div className="container mx-auto px-4 max-w-2xl">
            <ShieldCheck className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 id="cta" className="text-3xl font-bold mb-4">Know what you're installing</h2>
            <p className="text-muted-foreground mb-8">Checker, catalogue, playbooks and templates. ${PRICE}, once.</p>
            <BuyButton available={available} placement="footer" />
            <p className="text-sm text-muted-foreground mt-6">
              Prefer free? <Link className="text-primary underline" to="/install">Install skills free</Link> or browse <Link className="text-primary underline" to="/skills">documented skills</Link> <ArrowRight className="inline h-3 w-3" />
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProBundle;
