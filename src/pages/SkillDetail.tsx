import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Terminal, Shield, ShieldCheck, ShieldAlert, Star, Clock, User, ArrowRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { getSkillBySlug, getRelatedSkills, getCategoryBySlug } from "@/data/skills";

const securityConfig = {
  verified: { icon: ShieldCheck, label: "Verified", color: "text-green-400", bg: "bg-green-400/10" },
  community: { icon: Shield, label: "Community", color: "text-yellow-400", bg: "bg-yellow-400/10" },
  unreviewed: { icon: ShieldAlert, label: "Unreviewed", color: "text-red-400", bg: "bg-red-400/10" },
};

const SkillDetail = () => {
  const { skillSlug } = useParams<{ skillSlug: string }>();
  const [copied, setCopied] = useState(false);
  const skill = getSkillBySlug(skillSlug || "");
  const category = skill ? getCategoryBySlug(skill.categorySlug) : undefined;
  const related = skill ? getRelatedSkills(skill) : [];

  if (!skill) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-32 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Skill Not Found</h1>
          <p className="text-muted-foreground mb-8">The skill you're looking for doesn't exist or has been removed.</p>
          <Link to="/skills">
            <Button>Browse All Skills</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const sec = securityConfig[skill.securityStatus];
  const SecIcon = sec.icon;

  const handleCopy = () => {
    navigator.clipboard.writeText(skill.installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqJsonLd = skill.faqs?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: skill.faqs.map((faq: { question: string; answer: string }) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  } : undefined;

  const skillJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: skill.name,
    description: skill.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cross-platform",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: skill.rating,
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${skill.name} for OpenClaw — Full Guide`}
        description={`${skill.description} Install with: ${skill.installCmd}. Rating: ${skill.rating}/5.`}
        jsonLd={faqJsonLd ? [skillJsonLd, faqJsonLd] : skillJsonLd}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-glow opacity-[0.04] blur-[100px]" />

        <div className="relative z-10 container mx-auto px-6">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/skills" className="hover:text-primary transition-colors">Skills</Link>
            <span>/</span>
            {category && (
              <>
                <Link to={`/skills/${category.slug}`} className="hover:text-primary transition-colors">{category.name}</Link>
                <span>/</span>
              </>
            )}
            <span className="text-foreground">{skill.name}</span>
          </motion.div>

          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-4">
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${sec.bg} ${sec.color}`}>
                <SecIcon className="w-3.5 h-3.5" />
                {sec.label}
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-sm font-medium">{skill.rating}</span>
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              {skill.name} for OpenClaw
              <span className="text-gradient"> — Full Guide</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              {skill.description}
            </motion.p>

            {/* Install command */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-4 flex items-center justify-between gap-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-primary shrink-0" />
                <code className="font-mono text-sm text-muted-foreground">
                  <span className="text-primary">npx</span> clawhub@latest install <span className="text-foreground">{skill.slug}</span>
                </code>
              </div>
              <Button variant="ghost" size="icon" onClick={handleCopy} className="shrink-0">
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center gap-6 mt-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{skill.author}</span>
              <span>v{skill.version}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />Updated {skill.lastUpdated}</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold text-foreground mb-4">About This Skill</h2>
                <p className="text-muted-foreground leading-relaxed text-base">{skill.longDescription}</p>
              </motion.div>

              {/* Use Cases */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold text-foreground mb-6">Use Cases</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {skill.useCases.map((useCase, i) => (
                    <div key={i} className="glass rounded-xl p-5 card-hover">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <span className="text-primary font-bold text-sm">{i + 1}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{useCase}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* FAQ */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {skill.faqs.map((faq, i) => (
                    <div key={i} className="glass rounded-xl p-6">
                      <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="glass rounded-xl p-6 sticky top-24">
                <h3 className="font-semibold text-foreground mb-4">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <Link to={`/skills/${skill.categorySlug}`} className="text-primary hover:underline">{skill.category}</Link>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="flex items-center gap-1 text-foreground"><Star className="w-3 h-3 text-yellow-400 fill-current" />{skill.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Security</span>
                    <span className={`flex items-center gap-1 ${sec.color}`}><SecIcon className="w-3 h-3" />{sec.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Version</span>
                    <span className="text-foreground">{skill.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Author</span>
                    <span className="text-foreground">{skill.author}</span>
                  </div>
                </div>
              </div>

              {/* Related Skills */}
              {related.length > 0 && (
                <div className="glass rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-4">Related Skills</h3>
                  <div className="space-y-3">
                    {related.map((rel) => (
                      <Link key={rel.slug} to={`/skills/${rel.categorySlug}/${rel.slug}`} className="group flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                        <div>
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{rel.name}</p>
                          <p className="text-xs text-muted-foreground">{rel.category}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SkillDetail;
