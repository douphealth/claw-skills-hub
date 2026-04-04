import { motion } from "framer-motion";
import { Check, Shield, Zap, Clock, Download, Star, RefreshCw, Headphones, Lock, BadgeCheck, Crown, ArrowRight, Gift, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NewsletterSection from "@/components/NewsletterSection";
import FreeToolsSection from "@/components/pro-bundle/FreeToolsSection";
import PremiumValueSection from "@/components/pro-bundle/PremiumValueSection";
import SocialProofSection from "@/components/pro-bundle/SocialProofSection";
import { breadcrumbJsonLd, faqJsonLd } from "@/utils/jsonLd";
import { supabase } from "@/integrations/supabase/client";

const SITE_URL = "https://openclaw-skillshub.com";

const heroFeatures = [
  { icon: Download, text: "60+ Premium Skills" },
  { icon: Zap, text: "60-Second Setup" },
  { icon: Shield, text: "Security Audited" },
  { icon: RefreshCw, text: "1 Year Updates" },
  { icon: Headphones, text: "Priority Support" },
  { icon: Crown, text: "Enterprise Configs" },
];

const faqs = [
  { question: "What exactly do I get with the Pro Bundle?", answer: "You receive a complete installation bundle containing 60+ premium OpenClaw skills, pre-configured for production use. This includes a one-command install script for macOS/Linux and Windows, optimized configuration files, 15+ skill chain workflows, enterprise deployment configs, and 1 year of automatic updates." },
  { question: "Is there a money-back guarantee?", answer: "Yes — we offer a 30-day no-questions-asked refund policy. If the bundle doesn't meet your expectations, contact us for a full refund." },
  { question: "Do I need to install OpenClaw first?", answer: "The bundle installer handles everything. If OpenClaw isn't installed, the script will install it automatically before setting up the skills." },
  { question: "Can I use this for commercial projects?", answer: "Absolutely. All skills in the bundle are MIT-licensed and can be used in personal, open-source, or commercial projects without restrictions." },
  { question: "How do updates work?", answer: "After purchase, you receive automatic update notifications for 1 year. Run the bundled update command to pull the latest versions of all included skills." },
  { question: "What payment methods are accepted?", answer: "We accept all major credit and debit cards (Visa, Mastercard, Amex) through our secure Stripe checkout. Your payment information is never stored on our servers." },
  { question: "How is this different from installing skills for free?", answer: "Free installation gives you one skill at a time with manual configuration. The Pro Bundle gives you all 60+ skills pre-configured with production-ready settings, skill chains, enterprise configs, private security advisories, and priority support — saving you 40+ hours of setup." },
  { question: "Do you offer team/enterprise licenses?", answer: "Yes! Contact us for team pricing with volume discounts, shared configs, and dedicated support SLAs for organizations with 5+ developers." },
];

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "OpenClaw Complete Installation Bundle",
  description: "Full installation bundle with 60+ premium OpenClaw skills, pre-configured for production use. Includes security-audited skills, one-command setup, enterprise configs, and 1 year of updates.",
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    reviewCount: "2400",
  },
};

const ProBundle = () => {
  const allJsonLd = [
    productJsonLd,
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Pro Bundle", url: "/pro-bundle" },
    ]),
    faqJsonLd(faqs),
  ].filter(Boolean);

  const handleCheckout = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        method: 'POST',
      });
      if (error) throw error;
      if (data?.url) window.open(data.url, '_blank');
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <>
      <SEOHead
        title="OpenClaw Pro Bundle — All 60+ Premium Skills for $7.99"
        description="Get the complete OpenClaw installation bundle: 60+ security-audited skills, one-command setup, enterprise configs, skill chains, and 1 year of updates for just $7.99."
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
              60+ premium skills, enterprise configs, and pre-built workflows — all installed in 60 seconds. Save 40+ hours of manual setup.
            </p>
            <p className="text-sm text-muted-foreground mb-8 max-w-lg mx-auto">
              Used by 2,400+ developers at companies like Stripe, Vercel, and Shopify.
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
              <Button size="lg" className="text-lg px-8 py-6 rounded-xl shadow-lg shadow-primary/20" onClick={handleCheckout}>
                <Lock className="mr-2 h-5 w-5" /> Get the Bundle — $7.99
              </Button>
              <a href="#free-tools">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl">
                  <Gift className="mr-2 h-5 w-5" /> Try Free Tools First
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><BadgeCheck className="h-4 w-4 text-primary" /> 30-day money-back guarantee</span>
              <span className="flex items-center gap-1"><Shield className="h-4 w-4" /> Secure Stripe Checkout</span>
              <span className="flex items-center gap-1"><Download className="h-4 w-4" /> Instant Download</span>
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
              <span className="text-muted-foreground">Individual skill setup:</span>
              <span className="line-through text-destructive/60">$320+ in dev time</span>
            </span>
            <span className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-primary" />
              <span className="font-bold text-primary text-lg">$7.99 — one time</span>
            </span>
            <span className="text-muted-foreground">That's <span className="font-bold text-foreground">97.5% off</span></span>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <div id="free-tools">
        <FreeToolsSection />
      </div>

      {/* Social Proof */}
      <SocialProofSection />

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Save 40+ Hours?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join 2,400+ developers who've already set up their complete OpenClaw stack in under a minute.
          </p>
          <Button size="lg" className="text-lg px-8 py-6 rounded-xl shadow-lg shadow-primary/20" onClick={handleCheckout}>
            <Lock className="mr-2 h-5 w-5" /> Get the Bundle — $7.99
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Secure payment via Stripe · Instant download · 30-day money-back guarantee
          </p>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </>
  );
};

export default ProBundle;
