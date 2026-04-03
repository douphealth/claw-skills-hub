import { motion } from "framer-motion";
import { Check, Shield, Zap, Clock, Download, Star, RefreshCw, Headphones, ChevronRight, Lock, BadgeCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NewsletterSection from "@/components/NewsletterSection";
import { breadcrumbJsonLd, faqJsonLd } from "@/utils/jsonLd";

const SITE_URL = "https://openclaw-skillshub.com";

const features = [
  { icon: Download, title: "60+ Premium Skills", desc: "Every verified skill, pre-configured and ready to use" },
  { icon: Zap, title: "60-Second Setup", desc: "One command installs everything — no manual configuration" },
  { icon: Shield, title: "Security Audited", desc: "Every skill verified by the OpenClaw security team" },
  { icon: RefreshCw, title: "1 Year of Updates", desc: "Automatic updates as new skills and patches are released" },
  { icon: Headphones, title: "Priority Support", desc: "Direct email support from the ClawSkills team" },
  { icon: Star, title: "Optimized Configs", desc: "Production-ready configurations tuned for performance" },
];

const comparison = [
  { feature: "Skills included", free: "Install one at a time", pro: "All 60+ premium skills" },
  { feature: "Setup time", free: "2–4 hours manual work", pro: "60 seconds, one command" },
  { feature: "Configuration", free: "Manual per-skill setup", pro: "Pre-optimized for production" },
  { feature: "Security review", free: "Community-reviewed", pro: "Fully verified & audited" },
  { feature: "Support", free: "Community forums", pro: "Priority email support" },
  { feature: "Updates", free: "Manual per-skill", pro: "Automatic for 1 year" },
];

const faqs = [
  { question: "What exactly do I get with the Pro Bundle?", answer: "You receive a complete installation bundle containing 60+ premium OpenClaw skills, pre-configured for production use. This includes a one-command install script for macOS/Linux and Windows, optimized configuration files, and 1 year of automatic updates." },
  { question: "Is there a money-back guarantee?", answer: "Yes — we offer a 30-day no-questions-asked refund policy. If the bundle doesn't meet your expectations, contact us for a full refund." },
  { question: "Do I need to install OpenClaw first?", answer: "The bundle installer handles everything. If OpenClaw isn't installed, the script will install it automatically before setting up the skills." },
  { question: "Can I use this for commercial projects?", answer: "Absolutely. All skills in the bundle are MIT-licensed and can be used in personal, open-source, or commercial projects without restrictions." },
  { question: "How do updates work?", answer: "After purchase, you receive automatic update notifications for 1 year. Run the bundled update command to pull the latest versions of all included skills." },
  { question: "What payment methods are accepted?", answer: "We accept all major credit and debit cards (Visa, Mastercard, Amex) through our secure Stripe checkout. Your payment information is never stored on our servers." },
];

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "OpenClaw Complete Installation Bundle",
  description: "Full installation bundle with 60+ premium OpenClaw skills, pre-configured for production use. Includes security-audited skills, one-command setup, and 1 year of updates.",
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
    ratingValue: "4.8",
    bestRating: "5",
    reviewCount: "142",
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
      const res = await fetch(
        `https://npdfzpaglqgnhfphmpwo.supabase.co/functions/v1/create-checkout`,
        { method: "POST", headers: { "Content-Type": "application/json" } }
      );
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <>
      <SEOHead
        title="OpenClaw Pro Bundle — All 60+ Premium Skills for $7.99"
        description="Get the complete OpenClaw installation bundle: 60+ security-audited skills, one-command setup, pre-optimized configs, and 1 year of updates for just $7.99."
        canonical={`${SITE_URL}/pro-bundle`}
        ogImage={`${SITE_URL}/og-image.png`}
        jsonLd={allJsonLd}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="mb-4 text-sm px-4 py-1">🔥 Most Popular</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              OpenClaw Complete<br />
              <span className="text-primary">Installation Bundle</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the full OpenClaw stack in 60 seconds. 60+ premium skills, security-audited and pre-configured for production — saves 40+ hours of manual setup.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button size="lg" className="text-lg px-8 py-6 rounded-xl shadow-lg" onClick={handleCheckout}>
                <Lock className="mr-2 h-5 w-5" /> Get the Bundle — $7.99
              </Button>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <BadgeCheck className="h-4 w-4 text-primary" /> 30-day money-back guarantee
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Shield className="h-4 w-4" /> Secure Stripe Checkout</span>
              <span className="flex items-center gap-1"><Download className="h-4 w-4" /> Instant Download</span>
              <span className="flex items-center gap-1"><RefreshCw className="h-4 w-4" /> 1 Year Updates</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow"
              >
                <f.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Free vs Pro Bundle</h2>
          <div className="rounded-xl border overflow-hidden bg-card">
            <div className="grid grid-cols-3 gap-0 text-sm font-semibold border-b bg-muted/50 p-4">
              <span>Feature</span>
              <span className="text-center">Free (DIY)</span>
              <span className="text-center text-primary">Pro Bundle ($7.99)</span>
            </div>
            {comparison.map((row, i) => (
              <div key={i} className="grid grid-cols-3 gap-0 text-sm border-b last:border-b-0 p-4 items-center">
                <span className="font-medium">{row.feature}</span>
                <span className="text-center text-muted-foreground">{row.free}</span>
                <span className="text-center font-medium text-primary flex items-center justify-center gap-1">
                  <Check className="h-4 w-4 flex-shrink-0" /> {row.pro}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button size="lg" className="px-8" onClick={handleCheckout}>
              <Lock className="mr-2 h-4 w-4" /> Get the Pro Bundle
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-8">
            {[
              { step: "1", title: "Purchase", desc: "Click \"Get the Bundle\" and complete the secure Stripe checkout." },
              { step: "2", title: "Download", desc: "Receive an instant download link with your bundle files and install script." },
              { step: "3", title: "Install", desc: "Run one command to install all 60+ skills with production-ready configs." },
            ].map((s) => (
              <div key={s.step} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl border bg-card"
              >
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Save 40+ Hours?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join 142+ developers who've already set up their complete OpenClaw stack in under a minute.
          </p>
          <Button size="lg" className="text-lg px-8 py-6 rounded-xl shadow-lg" onClick={handleCheckout}>
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
