import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Shield, Zap, Download, RefreshCw, Headphones, Lock, BadgeCheck, Crown, ArrowRight, Gift, Sparkles, Loader2, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NewsletterSection from "@/components/NewsletterSection";
import FreeToolsSection from "@/components/pro-bundle/FreeToolsSection";
import PremiumValueSection from "@/components/pro-bundle/PremiumValueSection";
import { breadcrumbJsonLd, faqJsonLd } from "@/utils/jsonLd";
import { supabase } from "@/integrations/supabase/client";
import { downloadProBundle, PRO_BUNDLE_PRICE_USD, PRO_BUNDLE_PRODUCT_NAME, PRO_BUNDLE_SKILL_COUNT } from "@/utils/proBundleExport";

const SITE_URL = "https://openclaw-skillshub.com";

const heroFeatures = [
  { icon: Download, text: `${PRO_BUNDLE_SKILL_COUNT} Documented Skills` },
  { icon: Zap, text: "Bulk Installers" },
  { icon: Shield, text: "Payment Verified Server-Side" },
  { icon: RefreshCw, text: "Regenerate From Current Dataset" },
  { icon: Headphones, text: "Receipt-Based Support" },
  { icon: Crown, text: "JSON Manifest Included" },
];

const faqs = [
  { question: "What exactly do I get with the Pro Bundle?", answer: `You receive a downloadable JSON manifest plus bulk installers for macOS/Linux and Windows covering the ${PRO_BUNDLE_SKILL_COUNT} skills currently documented by ClawSkills. The files are generated from the same dataset used by the directory.` },
  { question: "Is there a money-back guarantee?", answer: "Refunds are handled according to the published Terms and the payment provider flow. Keep your Stripe receipt so support can locate the purchase." },
  { question: "Do I need Node.js or ClawHub first?", answer: "The generated installers require Node.js 18+ and invoke the current clawhub package with npx. They stop with a clear error if Node.js is unavailable." },
  { question: "Can I use the included skills commercially?", answer: "Check the upstream license and source for each skill before commercial use. ClawSkills does not replace the upstream project license or security review." },
  { question: "How do updates work?", answer: "The manifest records the current documented versions and the installers use clawhub at runtime. Use npx clawhub@latest update for installed skills and revisit the bundle page to regenerate downloads from the current ClawSkills dataset." },
  { question: "What payment methods are accepted?", answer: "We accept all major credit and debit cards (Visa, Mastercard, Amex) through our secure Stripe checkout. Your payment information is never stored on our servers." },
  { question: "How is this different from installing skills for free?", answer: `The underlying directory remains free. The paid bundle is a convenience product: one manifest plus bulk installers covering all ${PRO_BUNDLE_SKILL_COUNT} currently documented skills, with Stripe-verified access after payment.` },
  { question: "Do you offer team licensing?", answer: "The current checkout is a one-time individual bundle purchase. Contact support before assuming team, redistribution, or SLA rights." },
];

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "ClawSkills Pro Bundle",
  description: `Convenience bundle containing a JSON manifest and bulk installers for the ${PRO_BUNDLE_SKILL_COUNT} skills currently documented by ClawSkills.`,
  brand: { "@type": "Brand", name: "OpenClaw" },
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/pro-bundle`,
    priceCurrency: "USD",
    price: "7.99",
    availability: "https://schema.org/InStock",
    priceValidUntil: "2027-12-31",
    seller: { "@type": "Organization", name: "ClawSkills" },
  },
};

const ProBundle = () => {
  const [checkoutState, setCheckoutState] = useState<"idle" | "starting" | "verifying" | "paid" | "error">("idle");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id") || localStorage.getItem("clawskills_pro_session");

    if (params.get("canceled") === "true") {
      setCheckoutMessage("Checkout was canceled. No charge was made.");
    }

    if (!sessionId) return;

    let active = true;
    setCheckoutState("verifying");
    setCheckoutMessage("Verifying your Stripe payment…");

    supabase.functions.invoke("verify-checkout", {
      method: "POST",
      body: { session_id: sessionId },
    }).then(({ data, error }) => {
      if (!active) return;

      if (error || !data?.verified) {
        localStorage.removeItem("clawskills_pro_session");
        setCheckoutState("error");
        setCheckoutMessage("We could not verify a completed payment. If you were charged, contact support with your Stripe receipt.");
        return;
      }

      localStorage.setItem("clawskills_pro_session", sessionId);
      setCustomerEmail(data.customerEmail ?? null);
      setCheckoutState("paid");
      setCheckoutMessage("Payment verified. Your Pro Bundle downloads are unlocked.");
      window.gtag?.("event", "purchase", {
        currency: "USD",
        value: PRO_BUNDLE_PRICE_USD,
        transaction_id: sessionId,
        items: [{ item_name: PRO_BUNDLE_PRODUCT_NAME, price: PRO_BUNDLE_PRICE_USD, quantity: 1 }],
      });
    }).catch(() => {
      if (!active) return;
      setCheckoutState("error");
      setCheckoutMessage("Payment verification failed. Please retry from this page.");
    });

    return () => {
      active = false;
    };
  }, []);

  const allJsonLd = [
    productJsonLd,
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Pro Bundle", url: "/pro-bundle" },
    ]),
    faqJsonLd(faqs),
  ].filter(Boolean);

  const handleCheckout = async () => {
    if (checkoutState === "starting" || checkoutState === "verifying") return;

    setCheckoutState("starting");
    setCheckoutMessage("Opening secure Stripe checkout…");

    try {
      window.gtag?.("event", "pro_bundle_checkout_start", {
        currency: "USD",
        value: PRO_BUNDLE_PRICE_USD,
        item_name: PRO_BUNDLE_PRODUCT_NAME,
      });

      const { data, error } = await supabase.functions.invoke("create-checkout", {
        method: "POST",
      });

      if (error) throw error;
      if (!data?.url || !String(data.url).startsWith("https://checkout.stripe.com/")) {
        throw new Error("Checkout did not return a valid Stripe URL");
      }

      window.gtag?.("event", "pro_bundle_checkout_redirect", {
        currency: "USD",
        value: PRO_BUNDLE_PRICE_USD,
        item_name: PRO_BUNDLE_PRODUCT_NAME,
      });

      window.location.assign(data.url);
    } catch (err) {
      setCheckoutState("error");
      setCheckoutMessage("Stripe checkout could not be started. Please try again.");
      window.gtag?.("event", "pro_bundle_checkout_error", {
        item_name: PRO_BUNDLE_PRODUCT_NAME,
      });
      console.error("Checkout error:", err);
    }
  };

  return (
    <>
      <SEOHead
        title={`ClawSkills Pro Bundle — ${PRO_BUNDLE_SKILL_COUNT} documented skills for $7.99`}
        description={`Get a Stripe-verified downloadable manifest and bulk installers for the ${PRO_BUNDLE_SKILL_COUNT} skills currently documented by ClawSkills.`}
        canonical={`${SITE_URL}/pro-bundle`}
        ogImage={`${SITE_URL}/og-image.png`}
        jsonLd={allJsonLd}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Badge className="text-sm px-4 py-1">🔥 Most Popular</Badge>
              <Badge variant="outline" className="text-sm px-4 py-1 border-primary/30 text-primary">
                <Gift className="h-3.5 w-3.5 mr-1" /> Free Tools Included
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              The Complete OpenClaw<br />
              <span className="text-primary">Developer Toolkit</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
              One verified purchase unlocks a current JSON manifest plus bulk installers for every skill documented in this directory.
            </p>
            <p className="text-sm text-muted-foreground mb-8 max-w-lg mx-auto">
              The free directory stays free. Pro packages the current documented set into downloadable bulk-install files.
            </p>

            {/* Hero feature pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {heroFeatures.map((f) => (
                <span key={f.text} className="flex items-center gap-1.5 text-sm bg-card border rounded-full px-3 py-1.5">
                  <f.icon className="h-3.5 w-3.5 text-primary" /> {f.text}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Button size="lg" className="text-lg px-8 py-6 rounded-xl shadow-lg shadow-primary/20" onClick={handleCheckout} disabled={checkoutState === "starting" || checkoutState === "verifying"}>
                {checkoutState === "starting" ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Lock className="mr-2 h-5 w-5" />}
                {checkoutState === "paid" ? "Bundle Unlocked" : "Get the Bundle — $7.99"}
              </Button>
              <a href="#free-tools">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl">
                  <Gift className="mr-2 h-5 w-5" /> Try Free Tools First
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><BadgeCheck className="h-4 w-4 text-primary" /> Server-verified payment</span>
              <span className="flex items-center gap-1"><Shield className="h-4 w-4" /> Secure Stripe Checkout</span>
              <span className="flex items-center gap-1"><Download className="h-4 w-4" /> Immediate verified downloads</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Strip */}
      <section className="py-6 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-sm">
            <span className="flex items-center gap-2 font-medium">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Free option:</span>
              <span>install skills individually</span>
            </span>
            <span className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-primary" />
              <span className="font-bold text-primary text-lg">$7.99 — one time</span>
            </span>
            <span className="text-muted-foreground">Paid option: bulk manifest + platform installers</span>
          </div>
        </div>
      </section>

      {/* Verified purchase fulfillment */}
      <section className="py-10 border-y bg-card/40">
        <div className="container mx-auto px-4 max-w-3xl">
          {checkoutMessage && (
            <div className={`mb-6 rounded-xl border p-4 flex items-start gap-3 ${
              checkoutState === "paid"
                ? "border-primary/30 bg-primary/5"
                : checkoutState === "error"
                  ? "border-destructive/30 bg-destructive/5"
                  : "bg-muted/40"
            }`}>
              {checkoutState === "verifying" || checkoutState === "starting" ? (
                <Loader2 className="h-5 w-5 animate-spin text-primary mt-0.5" />
              ) : checkoutState === "error" ? (
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              ) : checkoutState === "paid" ? (
                <BadgeCheck className="h-5 w-5 text-primary mt-0.5" />
              ) : (
                <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
              )}
              <div>
                <p className="font-medium">{checkoutMessage}</p>
                {customerEmail && <p className="text-sm text-muted-foreground mt-1">Receipt email: {customerEmail}</p>}
              </div>
            </div>
          )}

          {checkoutState === "paid" && (
            <div className="rounded-2xl border border-primary/30 bg-background p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <Crown className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Your Pro Bundle is ready</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Download the current documented-skill manifest and platform installers. These files are generated from the same live dataset used by this site.
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                <Button variant="outline" onClick={() => downloadProBundle("manifest")}>
                  <Download className="mr-2 h-4 w-4" /> Manifest
                </Button>
                <Button variant="outline" onClick={() => downloadProBundle("shell")}>
                  <Download className="mr-2 h-4 w-4" /> macOS / Linux
                </Button>
                <Button variant="outline" onClick={() => downloadProBundle("powershell")}>
                  <Download className="mr-2 h-4 w-4" /> Windows
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Keep your Stripe receipt. Returning on this browser re-verifies the saved Checkout Session before showing these downloads.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Free Tools Section */}
      <div id="free-tools">
        <FreeToolsSection />
      </div>

      {/* Premium Value + Comparison */}
      <PremiumValueSection onCheckout={handleCheckout} />

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Get Started in 3 Steps</h2>
          <div className="space-y-8">
            {[
              { step: "1", title: "Purchase", desc: "Click \"Get the Bundle\" and complete the secure Stripe checkout. Takes 30 seconds." },
              { step: "2", title: "Download", desc: "Receive an instant download link with your bundle files, install script, and enterprise configs." },
              { step: "3", title: "Install & Ship", desc: "Run one command to install all 60+ skills with production-ready configs. Start shipping immediately." },
            ].map((s) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl border bg-card"
              >
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-accent/10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.06),transparent_60%)]" />
        <div className="container mx-auto px-4 text-center max-w-2xl relative z-10">
          <Crown className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Want the whole documented set in one download flow?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Keep browsing free, or unlock the current manifest and bulk installers with a one-time Stripe payment.
          </p>
          <Button size="lg" className="text-lg px-8 py-6 rounded-xl shadow-lg shadow-primary/20" onClick={handleCheckout} disabled={checkoutState === "starting" || checkoutState === "verifying"}>
                {checkoutState === "starting" ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Lock className="mr-2 h-5 w-5" />}
                {checkoutState === "paid" ? "Bundle Unlocked" : "Get the Bundle — $7.99"}
              </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Secure payment via Stripe · Server-side verification · Download access after confirmed payment
          </p>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </>
  );
};

export default ProBundle;
