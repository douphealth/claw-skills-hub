import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShieldCheck, ArrowRight, Zap, Code2, ListChecks, Search, Megaphone, ShieldAlert, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ArticlesSection from "@/components/ArticlesSection";
import TutorialsSection from "@/components/TutorialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { websiteJsonLd, organizationJsonLd, faqJsonLd, collectionPageJsonLd } from "@/utils/jsonLd";
import { skills } from "@/data/skills";
import { intentHubs } from "@/data/intentHubs";
import { computeTrustTotal } from "@/components/TrustScore";
import { skillPath } from "@/lib/routeUrls";

const homepageFaqs = [
  { question: "What are OpenClaw skills?", answer: "OpenClaw skills are modular capabilities defined in SKILL.md files that extend what OpenClaw can do. Each skill adds a specific function — from AI prompt chaining and browser automation to Gmail integration and code review. Install any skill with one command: npx clawhub@latest install <skill-name>." },
  { question: "Are OpenClaw skills safe?", answer: "OpenClaw skills use a three-tier trust model: verified (formally audited), community (peer-reviewed), and unreviewed. Verified skills in the ClawSkills directory have passed security audits covering permission scoping, data handling, and dependency safety. Always check the security badge before installing." },
  { question: "How do I install OpenClaw skills safely?", answer: "Install with npx clawhub@latest install <skill-name>. For safe installation: use verified skills, pin versions, review SKILL.md permissions (especially system.run and network access), audit dependencies, and test in a sandbox before production use." },
  { question: "How many OpenClaw skills are there?", answer: "As of 2026, there are over 5,705 OpenClaw skills available across 10 categories including AI & LLMs, DevOps, Web Development, Browser Automation, Productivity, Marketing, and more. New skills are published daily by the community." },
  { question: "What is the Skill Trust Score?", answer: "The Skill Trust Score is a 0-100 rating based on six dimensions: security audit status, update recency, community trust, documentation quality, permission scope, and open-source status. Scores above 80 indicate verified, well-maintained skills safe for production use." },
  { question: "How do I create custom OpenClaw skills?", answer: "Create a SKILL.md file with frontmatter (name, description, permissions) and markdown instructions. Define tools, input/output schemas, and behavioral logic. Test locally with npx clawhub@latest install ./path/to/skill, then publish with npx clawhub@latest publish." },
  { question: "What are the best OpenClaw skills for beginners?", answer: "Start with GPT Prompt Chainer (AI workflows), Deep Research (research automation), Browser Pilot (web automation), Notion Sync (productivity), and LLM Router (cost optimization). These five skills cover the most common use cases and work well together." },
  { question: "Is OpenClaw free to use?", answer: "Yes. OpenClaw is fully open-source under the MIT license with no framework usage fees. Users only pay for their own LLM provider API costs, or can use free local models via Ollama for zero-cost development." },
];

const useCaseIcons: Record<string, React.ElementType> = {
  "best-openclaw-skills-for-coding": Code2,
  "best-openclaw-skills-for-productivity": ListChecks,
  "best-openclaw-skills-for-beginners": GraduationCap,
  "safe-openclaw-skills": ShieldCheck,
  "best-openclaw-skills-for-research": Search,
  "best-openclaw-skills-for-marketing": Megaphone,
};

const Index = () => {
  const faq = faqJsonLd(homepageFaqs);
  const collection = collectionPageJsonLd(
    "OpenClaw Skills Directory",
    "Browse 5,705+ curated OpenClaw AI agent skills across 10 categories with security reviews, Trust Scores, and one-click installation.",
    "/",
    5705
  );
  const jsonLd = [websiteJsonLd(), organizationJsonLd(), collection, ...(faq ? [faq] : [])];

  // Top verified skills
  const topVerified = skills
    .filter((s) => s.securityStatus === "verified")
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  // Recently updated
  const recentlyUpdated = [...skills]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="OpenClaw Skill Hub — 5,705+ Reviewed Skills | ClawSkills"
        description="Discover, compare, and safely install 5,705+ OpenClaw skills. Trust Scores, security audits, and one-command installation across 10 categories."
        canonical="https://openclaw-skillshub.com/"
        jsonLd={jsonLd}
      />
      <Navbar />
      <HeroSection />

      {/* Browse by Use Case */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Browse by Use Case</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Find the perfect skills for your workflow. Each guide includes tested picks, Trust Scores, and one-click install commands.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {intentHubs.map((hub, i) => {
              const Icon = useCaseIcons[hub.slug] || Zap;
              return (
                <motion.div key={hub.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Link to={`/use-cases/${hub.slug}`} className="group glass rounded-xl p-5 flex items-start gap-4 card-hover block">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">{hub.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{hub.metaDescription.slice(0, 80)}…</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CategoriesSection />

      {/* Top Verified Skills */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Top Verified Skills</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Security-audited skills with the highest Trust Scores. Safe for production use.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {topVerified.map((skill, i) => {
              const trust = computeTrustTotal(skill.securityStatus, skill.rating, skill.lastUpdated);
              return (
                <motion.div key={skill.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Link to={skillPath(skill.categorySlug, skill.slug)} className="group glass rounded-xl p-5 card-hover block">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-[10px]">{skill.category}</Badge>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-xs text-green-400 font-semibold">{trust}/100</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors mb-1">{skill.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{skill.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-yellow-400 text-xs">
                        <Star className="w-3 h-3 fill-current" />{skill.rating}
                      </div>
                      <span className="text-xs text-primary group-hover:underline flex items-center gap-1">Review <ArrowRight className="w-3 h-3" /></span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recently Updated */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Recently Updated</h2>
            <p className="text-muted-foreground text-sm">Latest skill reviews and updates from the ClawSkills editorial team.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {recentlyUpdated.map((skill) => (
              <Link key={skill.slug} to={skillPath(skill.categorySlug, skill.slug)} className="group glass rounded-xl p-4 card-hover block">
                <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors mb-1">{skill.name}</p>
                <p className="text-xs text-muted-foreground mb-2">Updated {skill.lastUpdated}</p>
                <Badge variant="outline" className="text-[10px]">v{skill.version}</Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ArticlesSection />
      <TutorialsSection />

      {/* FAQ */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-4">
            {homepageFaqs.slice(0, 6).map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="glass rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-2 text-sm">{f.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
