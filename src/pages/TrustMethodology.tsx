import { motion } from "framer-motion";
import { ShieldCheck, RefreshCw, Users, BookOpen, Lock, FileCode, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import NewsletterSection from "@/components/NewsletterSection";
import { breadcrumbJsonLd, faqJsonLd } from "@/utils/jsonLd";

const dimensions = [
  { icon: ShieldCheck, label: "Security Audit", weight: "10 pts", description: "Has the skill passed a formal security audit? Verified skills score 10/10, community-reviewed score 6/10, and unreviewed skills score 2/10." },
  { icon: RefreshCw, label: "Update Recency", weight: "10 pts", description: "How recently was the skill updated? Skills updated within 2 months score 10/10. Over 6 months scores 4/10." },
  { icon: Users, label: "Community Trust", weight: "10 pts", description: "Based on aggregate user ratings. A 5-star skill scores 10/10." },
  { icon: BookOpen, label: "Documentation Quality", weight: "10 pts", description: "Does the skill have comprehensive docs, examples, and usage guides?" },
  { icon: Lock, label: "Permission Scope", weight: "10 pts", description: "Does the skill use minimal permissions? Skills requesting only what they need score higher." },
  { icon: FileCode, label: "Open Source", weight: "10 pts", description: "Is the skill's source code publicly auditable? All OpenClaw skills are open-source by default." },
];

const faqs = [
  { question: "How is the Trust Score calculated?", answer: "The Trust Score is a weighted average of six dimensions: security audit status, update recency, community trust (user ratings), documentation quality, permission scope, and open-source status. Each dimension is scored 0-10, totaling a maximum of 60 points, normalized to a 0-100 scale." },
  { question: "Can a skill's Trust Score change?", answer: "Yes. Trust Scores are dynamic. They update when a skill receives a new security audit, gets updated by its author, receives new user ratings, or changes its permission requirements." },
  { question: "What is a good Trust Score?", answer: "Scores 80+ are excellent — typically verified skills with recent updates. Scores 60-79 are acceptable for most use cases. Below 60 warrants extra caution and manual review before production use." },
  { question: "Who performs security audits?", answer: "The ClawSkills team performs audits for verified skills. Community reviews come from experienced OpenClaw contributors. The methodology is transparent and documented." },
];

const TrustMethodology = () => {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Trust Score Methodology", url: "/trust-methodology" },
  ]);
  const faq = faqJsonLd(faqs);
  const jsonLd = [breadcrumbs, ...(faq ? [faq] : [])];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Skill Trust Score Methodology — How We Rate OpenClaw Skills"
        description="Learn how ClawSkills calculates Trust Scores for OpenClaw skills. Six dimensions covering security, recency, community trust, documentation, permissions, and open-source status."
        canonical="https://openclaw-skillshub.com/trust-methodology"
        jsonLd={jsonLd}
      />
      <Navbar />

      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative z-10 container mx-auto px-6 max-w-3xl">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Skill Trust Score <span className="text-gradient">Methodology</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-muted-foreground leading-relaxed" data-speakable>
            Every OpenClaw skill on ClawSkills receives a Trust Score from 0 to 100. The score is calculated from six transparent, reproducible dimensions — giving you a clear picture of each skill's reliability before you install.
          </motion.p>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" /> Scoring Dimensions
          </h2>
          <div className="space-y-4">
            {dimensions.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div key={d.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{d.label}</h3>
                        <span className="text-xs text-primary font-mono">{d.weight}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{d.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">Score Interpretation</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { range: "80–100", label: "Excellent", color: "text-green-400 bg-green-400/10 border-green-500/20", desc: "Verified, well-maintained, safe for production" },
              { range: "60–79", label: "Good", color: "text-yellow-400 bg-yellow-400/10 border-yellow-500/20", desc: "Community-reviewed, generally reliable" },
              { range: "0–59", label: "Caution", color: "text-red-400 bg-red-400/10 border-red-500/20", desc: "Unreviewed or outdated — manual audit recommended" },
            ].map((tier) => (
              <div key={tier.range} className={`rounded-xl p-5 border ${tier.color}`}>
                <p className="text-2xl font-bold mb-1">{tier.range}</p>
                <p className="font-semibold mb-2">{tier.label}</p>
                <p className="text-xs opacity-80">{tier.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="glass rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-2">{f.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-3xl pb-16">
        <Link to="/skills" className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium">
          Browse skills with Trust Scores <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default TrustMethodology;
