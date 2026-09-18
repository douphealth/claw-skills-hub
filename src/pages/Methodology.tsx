import { motion } from "framer-motion";
import { ShieldCheck, RefreshCw, Users, BookOpen, Lock, FileCode, Eye, ArrowRight, AlertTriangle, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import NewsletterSection from "@/components/NewsletterSection";
import { breadcrumbJsonLd, faqJsonLd } from "@/utils/jsonLd";

/**
 * Methodology page.
 *
 * Every number and rule on this page is copied from the live implementation in
 * src/components/TrustScore.tsx (computeTrustDimensions + computeTrustTotal).
 * If you change the scoring code, change this page in the same commit.
 *
 * This page exists because the score is otherwise a black box. Three of the six
 * dimensions are NOT independently measured — they are derived from the skill's
 * securityStatus field. Saying so plainly is the whole point of the page.
 */

const dimensions = [
  {
    icon: ShieldCheck,
    label: "Security Audit",
    expression: 'verified → 10 · community → 6 · unreviewed → 2',
    measured: true,
    description:
      "Read directly from the skill's securityStatus field. Skills marked \"verified\" score 10, \"community\" score 6, and \"unreviewed\" score 2.",
  },
  {
    icon: RefreshCw,
    label: "Update Recency",
    expression: "< 2 months → 10 · < 6 months → 7 · otherwise → 4",
    measured: true,
    description:
      "The only dimension that changes on its own over time. It is computed from the skill's lastUpdated date at the moment the page renders, so a score shown today may differ from the same score shown next month with no change to the skill.",
  },
  {
    icon: Users,
    label: "Community Trust",
    expression: "round(rating × 2)",
    measured: true,
    description:
      "Derived from the skill's rating value. A 4.8 rating produces 10 (4.8 × 2 = 9.6, rounded). Note that because the multiplier is 2 and the ceiling is 10, any rating at or above 5.0 saturates this dimension — the practical spread is narrow.",
  },
  {
    icon: BookOpen,
    label: "Documentation Quality",
    expression: "verified → 9 · otherwise → 6",
    measured: false,
    description:
      "Not independently assessed. This is a fixed value derived from securityStatus. There is no documentation review, no checklist, and no per-skill measurement behind this number.",
  },
  {
    icon: Lock,
    label: "Permission Scope",
    expression: "verified → 9 · community → 7 · unreviewed → 4",
    measured: false,
    description:
      "Not independently assessed. No permission manifest is inspected. This is a fixed value derived from securityStatus, the same as the two dimensions above it.",
  },
  {
    icon: FileCode,
    label: "Open Source",
    expression: "always → 10",
    measured: false,
    description:
      "Always 10 for every skill. Every OpenClaw skill is open-source by definition, so this dimension contributes an identical 10 points to every score and never distinguishes one skill from another.",
  },
];

const tiers = [
  { range: "80–100", label: "Excellent", color: "text-green-400 bg-green-400/10 border-green-500/20", desc: "Verified status plus a recent update. In practice this is what the score rewards." },
  { range: "60–79", label: "Good", color: "text-yellow-400 bg-yellow-400/10 border-yellow-500/20", desc: "Usually community status, or a verified skill that has not been updated recently." },
  { range: "0–59", label: "Caution", color: "text-red-400 bg-red-400/10 border-red-500/20", desc: "Unreviewed status, or a long gap since the last update." },
];

const faqs = [
  {
    question: "How is the Trust Score calculated?",
    answer:
      "Six dimensions are scored 0–10 each, summed, then divided by the 60-point maximum and multiplied by 100. The six are: security audit status, update recency, community trust (rating × 2), documentation quality, permission scope, and open-source status. The result is rounded to a whole number.",
  },
  {
    question: "Which dimensions are actually measured?",
    answer:
      "Three: security audit status, update recency, and community trust. The other three — documentation quality, permission scope, and open-source status — are fixed values derived from the skill's security status field. They are displayed for completeness but are not independent measurements.",
  },
  {
    question: "Why can a score change without the skill changing?",
    answer:
      "Update recency is computed from the current date each time the page renders. A skill updated six months ago scores 7 one day and 4 the next, with no change to the skill itself.",
  },
  {
    question: "Does a high Trust Score mean a skill is safe to install?",
    answer:
      "No. The score cannot assess what a skill actually does, what data it touches, or whether its code is correct. It reflects audit status, how recently the author pushed an update, and a rating figure. Read the skill's source before installing it, particularly if it requests credentials or network access.",
  },
  {
    question: "Who performs the security audits?",
    answer:
      "The security audit dimension reads a status field that ClawSkills assigns. The audit process itself is not documented on this site, and the score does not distinguish between different depths or scopes of audit within the \"verified\" label.",
  },
];

const Methodology = () => {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Methodology", url: "/methodology" },
  ]);
  const faq = faqJsonLd(faqs);
  const jsonLd = [breadcrumbs, ...(faq ? [faq] : [])];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Trust Score Methodology — How Every OpenClaw Skill Score Is Calculated"
        description="The six dimensions behind every ClawSkills Trust Score, the exact formula for each, and which three are derived from audit status rather than independently measured."
        canonical="https://openclaw-skillshub.com/methodology"
        jsonLd={jsonLd}
      />
      <Navbar />

      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative z-10 container mx-auto px-6 max-w-3xl">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Trust Score <span className="text-gradient">Methodology</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-muted-foreground leading-relaxed" data-speakable>
            Every skill on ClawSkills shows a Trust Score from 0 to 100. This page gives you the exact formula for each of the six dimensions, states which ones are genuinely measured and which are derived, and explains what the score cannot tell you.
          </motion.p>
        </div>
      </section>

      {/* Honest summary — stated up front rather than buried */}
      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-400/5 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="font-semibold text-foreground mb-2">What the score is, in one paragraph</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Three of the six dimensions — security audit status, update recency, and community trust — carry real information. The remaining three (documentation quality, permission scope, and open-source status) are fixed values derived from the skill's security status field and are the same for every skill sharing that status. Open-source status is always 10 for every skill. This means a Trust Score is primarily a restatement of audit status plus how recently the author updated the skill. It is a useful filter for spotting stale or unaudited skills. It is not an assessment of what a skill does or whether its code is safe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" /> The six dimensions
          </h2>
          <p className="text-sm text-muted-foreground mb-8">Each dimension contributes a maximum of 10 points, for 60 total.</p>
          <div className="space-y-4">
            {dimensions.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div key={d.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h3 className="font-semibold text-foreground">{d.label}</h3>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${d.measured ? "text-primary border-primary/30 bg-primary/10" : "text-muted-foreground border-border bg-secondary/50"}`}>
                          {d.measured ? "measured" : "derived"}
                        </span>
                      </div>
                      <code className="block text-xs font-mono text-primary bg-secondary/40 rounded px-2 py-1 mb-2 overflow-x-auto">{d.expression}</code>
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
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" /> The arithmetic
          </h2>
          <div className="glass rounded-xl p-6 space-y-4">
            <code className="block text-sm font-mono text-primary bg-secondary/40 rounded px-3 py-2 overflow-x-auto">
              score = round( (sum of six dimension scores) / 60 × 100 )
            </code>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A verified skill updated within the last two months with a 4.8 rating scores 10 + 10 + 10 + 9 + 9 + 10 = 58, giving round(58 / 60 × 100) = <strong className="text-foreground">97</strong>.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The same skill left 8 months without an update scores 10 + 4 + 10 + 9 + 9 + 10 = 52, giving round(52 / 60 × 100) = <strong className="text-foreground">87</strong>.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A community skill updated 3 months ago with a 4.5 rating scores 6 + 7 + 9 + 6 + 7 + 10 = 45, giving round(45 / 60 × 100) = <strong className="text-foreground">75</strong>.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">Score bands</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {tiers.map((tier) => (
              <div key={tier.range} className={`rounded-xl p-5 border ${tier.color}`}>
                <p className="text-2xl font-bold mb-1">{tier.range}</p>
                <p className="font-semibold mb-2">{tier.label}</p>
                <p className="text-xs opacity-80">{tier.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            The band boundaries are presentation only — the underlying calculation is continuous.
          </p>
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

export default Methodology;
