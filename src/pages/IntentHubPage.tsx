import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Terminal, Copy, Check, Star, ArrowRight, ShieldCheck, Shield, ShieldAlert, Zap, Clock } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import NewsletterSection from "@/components/NewsletterSection";
import { computeTrustTotal } from "@/components/TrustScore";
import { getHubBySlug, getHubSkills } from "@/data/intentHubs";
import { faqJsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/utils/jsonLd";
import type { Skill } from "@/data/skills";
import { skillPath } from "@/lib/routeUrls";

const secIcons = { verified: ShieldCheck, community: Shield, unreviewed: ShieldAlert };
const secColors = { verified: "text-green-400", community: "text-yellow-400", unreviewed: "text-red-400" };

const SkillRow = ({ skill, index }: { skill: Skill; index: number }) => {
  const [copied, setCopied] = useState(false);
  const Icon = secIcons[skill.securityStatus];

  const handleCopy = () => {
    navigator.clipboard.writeText(skill.installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const trust = computeTrustTotal(skill.securityStatus, skill.rating, skill.lastUpdated);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="glass rounded-xl p-5 md:p-6 card-hover"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-bold text-lg shrink-0">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Link to={skillPath(skill.categorySlug, skill.slug)} className="text-lg font-bold text-foreground hover:text-primary transition-colors">
              {skill.name}
            </Link>
            <div className={`flex items-center gap-1 text-xs ${secColors[skill.securityStatus]}`}>
              <Icon className="w-3.5 h-3.5" />
              {skill.securityStatus}
            </div>
            <div className="flex items-center gap-1 text-yellow-400 text-xs">
              <Star className="w-3 h-3 fill-current" />{skill.rating}
            </div>
            <Badge variant="secondary" className="text-[10px]">Trust {trust}/100</Badge>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{skill.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline" className="text-[10px]">{skill.category}</Badge>
            <Badge variant="outline" className="text-[10px]">v{skill.version}</Badge>
            <Badge variant="outline" className="text-[10px] flex items-center gap-1"><Clock className="w-2.5 h-2.5" />{skill.lastUpdated}</Badge>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2 glass rounded-lg px-3 py-2 flex-1">
              <Terminal className="w-4 h-4 text-primary shrink-0" />
              <code className="text-xs font-mono text-muted-foreground truncate">{skill.installCmd}</code>
              <button onClick={handleCopy} className="ml-auto shrink-0">
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground hover:text-primary" />}
              </button>
            </div>
            <Link to={skillPath(skill.categorySlug, skill.slug)}>
              <Button size="sm" variant="outline" className="text-xs whitespace-nowrap">
                Full Review <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const IntentHubPage = () => {
  const { hubSlug } = useParams<{ hubSlug: string }>();
  const hub = getHubBySlug(hubSlug || "");

  if (!hub) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-32 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Page Not Found</h1>
          <Link to="/skills"><Button>Browse All Skills</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const hubSkills = getHubSkills(hub);
  const faq = faqJsonLd(hub.faqs);
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Skills", url: "/skills" },
    { name: hub.title, url: `/use-cases/${hub.slug}` },
  ]);
  const itemList = itemListJsonLd(
    hubSkills.map((s, i) => ({ name: s.name, url: skillPath(s.categorySlug, s.slug), position: i + 1 }))
  );
  const jsonLd = [breadcrumbs, itemList, ...(faq ? [faq] : [])];

  const IconComp = (LucideIcons as unknown as Record<string, typeof Zap>)[hub.icon] || Zap;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={hub.seoTitle}
        description={hub.metaDescription}
        canonical={`https://openclaw-skillshub.com/use-cases/${hub.slug}`}
        type="article"
        jsonLd={jsonLd}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative z-10 container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/skills">Skills</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>{hub.title}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <IconComp className="w-6 h-6 text-primary" />
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              {hub.h1}
            </motion.h1>

            {/* Direct answer (AEO-optimized) */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6" data-speakable>
              {hub.directAnswer}
            </motion.p>

            {/* Key Facts */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-5 mb-6">
              <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" /> Key Facts
              </h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {hub.keyFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    {fact}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Best For */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass rounded-xl p-4 border-l-4 border-primary">
              <p className="text-sm"><span className="font-semibold text-foreground">Best for: </span><span className="text-muted-foreground">{hub.bestFor}</span></p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills List */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-foreground mb-8">Top {hubSkills.length} Skills — Ranked & Reviewed</h2>
          <div className="space-y-4 max-w-4xl">
            {hubSkills.map((skill, i) => (
              <SkillRow key={skill.slug} skill={skill} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {hub.faqs.length > 0 && (
        <section className="pb-16">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {hub.faqs.map((faq, i) => (
                <div key={i} className="glass rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default IntentHubPage;
