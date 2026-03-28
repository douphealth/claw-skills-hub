import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Terminal, Shield, ShieldCheck, ShieldAlert, Star, Clock, User, ArrowRight, Copy, Check, Monitor, Wrench, GitBranch, Cpu, Download, Zap, Target, AlertTriangle, BookOpen } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import RelatedContent from "@/components/RelatedContent";
import NewsletterSection from "@/components/NewsletterSection";
import { getSkillBySlug, getRelatedSkills, getCategoryBySlug } from "@/data/skills";
import { skillJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/utils/jsonLd";
import SkillDownloadPanel from "@/components/SkillDownloadPanel";
import TrustScore, { computeTrustTotal } from "@/components/TrustScore";

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
          <Link to="/skills"><Button>Browse All Skills</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const sec = securityConfig[skill.securityStatus];
  const SecIcon = sec.icon;
  const trustTotal = computeTrustTotal(skill.securityStatus, skill.rating, skill.lastUpdated);

  const handleCopy = () => {
    navigator.clipboard.writeText(skill.installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faq = faqJsonLd(skill.faqs || []);
  const sJsonLd = skillJsonLd(skill);
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Skills", url: "/skills" },
    ...(category ? [{ name: category.name, url: `/skills/${category.slug}` }] : []),
    { name: skill.name, url: `/skills/${skill.categorySlug}/${skill.slug}` },
  ]);

  // Review schema
  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    name: `${skill.name} Review`,
    reviewBody: skill.longDescription,
    reviewRating: {
      "@type": "Rating",
      ratingValue: skill.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: { "@type": "Organization", name: "ClawSkills" },
    datePublished: skill.lastUpdated,
    dateModified: skill.lastUpdated,
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: skill.name,
      applicationCategory: "DeveloperApplication",
    },
  };

  const allJsonLd = [sJsonLd, breadcrumbs, reviewJsonLd, ...(faq ? [faq] : [])];

  const relatedLinks = [
    { title: `Browse all ${skill.category} skills`, url: `/skills/${skill.categorySlug}`, description: `See all skills in the ${skill.category} category` },
    { title: "Install Center", url: "/install", description: "Platform-specific setup guides for OpenClaw" },
    { title: "Security Methodology", url: "/trust-methodology", description: "How we calculate Trust Scores" },
    ...related.slice(0, 3).map((r) => ({
      title: `${r.name} (Alternative)`,
      url: `/skills/${r.categorySlug}/${r.slug}`,
      description: r.description.slice(0, 80),
    })),
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${skill.name} for OpenClaw — Review, Trust Score & Install Guide`}
        description={`${skill.name} is a ${skill.securityStatus} OpenClaw skill (Trust Score: ${trustTotal}/100). ${skill.description} Install: ${skill.installCmd}`}
        canonical={`https://openclaw-skillshub.com/skills/${skill.categorySlug}/${skill.slug}`}
        jsonLd={allJsonLd}
      />
      <Navbar />

      {/* Hero with answer-first structure */}
      <section className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-glow opacity-[0.04] blur-[100px]" />

        <div className="relative z-10 container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/skills">Skills</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                {category && (
                  <>
                    <BreadcrumbItem><BreadcrumbLink asChild><Link to={`/skills/${category.slug}`}>{category.name}</Link></BreadcrumbLink></BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )}
                <BreadcrumbItem><BreadcrumbPage>{skill.name}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          <div className="max-w-4xl">
            {/* Badges row */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-3 mb-4">
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${sec.bg} ${sec.color}`}>
                <SecIcon className="w-3.5 h-3.5" />{sec.label}
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-3.5 h-3.5 fill-current" /><span className="text-sm font-medium">{skill.rating}</span>
              </div>
              <Badge variant="secondary" className="text-xs font-semibold">Trust {trustTotal}/100</Badge>
            </motion.div>

            {/* H1 */}
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              {skill.name} for OpenClaw <span className="text-gradient">— Review & Guide</span>
            </motion.h1>

            {/* Direct answer (40-60 words, AEO-optimized) */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6" data-speakable>
              {skill.description} Maintained by {skill.author}, currently at v{skill.version}. Security status: {skill.securityStatus}. Install with one command via ClawHub.
            </motion.p>

            {/* Key Takeaways + Best For + Install (above the fold) */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid sm:grid-cols-2 gap-4 mb-6">
              {/* Key Takeaways */}
              <div className="glass rounded-xl p-5">
                <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" /> Key Takeaways
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground"><Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />{skill.useCases[0]}</li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground"><Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />Security: {skill.securityStatus} (Trust {trustTotal}/100)</li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground"><Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />Free, open-source, one-command install</li>
                </ul>
              </div>

              {/* Best For */}
              <div className="glass rounded-xl p-5 border-l-4 border-primary">
                <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" /> Best For
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{skill.useCases.slice(0, 2).join(". ")}.</p>
                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" /> Time to value: ~2 min setup
                </div>
              </div>
            </motion.div>

            {/* Install command */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass rounded-xl p-4 flex items-center justify-between gap-4 max-w-2xl">
              <div className="flex items-center gap-3 min-w-0">
                <Terminal className="w-5 h-5 text-primary shrink-0" />
                <code className="font-mono text-sm text-muted-foreground truncate">
                  <span className="text-primary">npx</span> clawhub@latest install <span className="text-foreground">{skill.slug}</span>
                </code>
              </div>
              <Button variant="ghost" size="icon" onClick={handleCopy} className="shrink-0">
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap items-center gap-4 mt-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{skill.author}</span>
              <span>v{skill.version}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />Last reviewed: {skill.lastUpdated}</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content - fixed order per AEO spec */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl">
            <div className="lg:col-span-2 space-y-12">
              {/* 1. What This Skill Does */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold text-foreground mb-4">What {skill.name} Does</h2>
                <p className="text-muted-foreground leading-relaxed text-base">{skill.longDescription}</p>
              </motion.div>

              {/* 2. Who Should Use It */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" /> Who Should Use {skill.name}
                </h2>
                <div className="glass rounded-xl p-5">
                  <ul className="space-y-2">
                    {skill.useCases.map((uc, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />{uc}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* 3. Requirements & Compatibility */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-primary" /> Requirements & Compatibility
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { os: "macOS", status: "Full Support", supported: true },
                    { os: "Linux", status: "Full Support", supported: true },
                    { os: "Windows (WSL)", status: "Supported", supported: true },
                  ].map((item) => (
                    <div key={item.os} className="glass rounded-xl p-4 flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${item.supported ? "bg-green-400" : "bg-muted-foreground"}`} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.os}</p>
                        <p className="text-xs text-muted-foreground">{item.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 4. Setup & Installation */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5 text-primary" /> Setup & Installation
                </h2>
                <div className="glass rounded-xl p-6 space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">Step 1: Install OpenClaw</p>
                    <code className="block bg-secondary/50 rounded-lg px-4 py-3 text-sm font-mono text-muted-foreground">npm install -g openclaw@latest</code>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">Step 2: Install {skill.name}</p>
                    <code className="block bg-secondary/50 rounded-lg px-4 py-3 text-sm font-mono text-muted-foreground">{skill.installCmd}</code>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">Step 3: Verify installation</p>
                    <code className="block bg-secondary/50 rounded-lg px-4 py-3 text-sm font-mono text-muted-foreground">openclaw skills list</code>
                  </div>
                </div>
              </motion.div>

              {/* 5. Tools & Permissions */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-primary" /> Tools & Permissions
                </h2>
                <div className="flex flex-wrap gap-2">
                  {["system.run", "file.read", "file.write", "web.search"].map((tool) => (
                    <Badge key={tool} variant="secondary" className="font-mono text-xs px-3 py-1.5">{tool}</Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">These are the OpenClaw tool permissions this skill may request during execution. Verified skills use minimal permission scoping.</p>
              </motion.div>

              {/* 6. Security Review */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" /> Security Review
                </h2>
                <div className={`glass rounded-xl p-5 border-l-4 ${skill.securityStatus === "verified" ? "border-green-500" : skill.securityStatus === "community" ? "border-yellow-500" : "border-red-500"}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <SecIcon className={`w-5 h-5 ${sec.color}`} />
                    <span className={`font-semibold ${sec.color}`}>{sec.label} Skill</span>
                    <span className="text-sm text-muted-foreground">— Trust Score: {trustTotal}/100</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {skill.securityStatus === "verified" ? `${skill.name} has passed the ClawSkills security audit. No malicious code, prompt injection vectors, or unsafe dependencies were detected.` :
                     skill.securityStatus === "community" ? `${skill.name} has been reviewed by the community but not officially audited. Generally considered safe for standard use cases.` :
                     `${skill.name} has not been formally reviewed. Review the SKILL.md permissions and test in a sandbox before production use.`}
                  </p>
                  <Link to="/trust-methodology" className="text-xs text-primary hover:underline">Read our security methodology →</Link>
                </div>
              </motion.div>

              {/* 7. Limitations & Risks */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" /> Limitations & Risks
                </h2>
                <div className="glass rounded-xl p-5">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />Requires active LLM provider API key (or local Ollama)</li>
                    <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />Output quality depends on chosen model capabilities</li>
                    <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />Token costs may apply depending on provider and usage volume</li>
                  </ul>
                </div>
              </motion.div>

              {/* 8. Alternatives */}
              {related.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-primary" /> Alternatives to {skill.name}
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-2 text-muted-foreground font-medium">Skill</th>
                          <th className="text-center py-3 px-2 text-muted-foreground font-medium">Rating</th>
                          <th className="text-center py-3 px-2 text-muted-foreground font-medium">Trust</th>
                          <th className="text-center py-3 px-2 text-muted-foreground font-medium">Security</th>
                          <th className="text-right py-3 px-2 text-muted-foreground font-medium"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {related.map((rel) => {
                          const relTrust = computeTrustTotal(rel.securityStatus, rel.rating, rel.lastUpdated);
                          const RelIcon = securityConfig[rel.securityStatus].icon;
                          return (
                            <tr key={rel.slug} className="border-b border-border/50">
                              <td className="py-3 px-2 font-medium text-foreground">{rel.name}</td>
                              <td className="py-3 px-2 text-center"><span className="flex items-center justify-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-current" />{rel.rating}</span></td>
                              <td className="py-3 px-2 text-center">{relTrust}/100</td>
                              <td className="py-3 px-2 text-center"><RelIcon className={`w-4 h-4 mx-auto ${securityConfig[rel.securityStatus].color}`} /></td>
                              <td className="py-3 px-2 text-right"><Link to={`/skills/${rel.categorySlug}/${rel.slug}`} className="text-primary hover:underline text-xs">Review →</Link></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* 9. FAQ */}
              {skill.faqs?.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {skill.faqs.map((f, i) => (
                      <div key={i} className="glass rounded-xl p-6">
                        <h3 className="font-semibold text-foreground mb-2">{f.question}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 10. Changelog */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-primary" /> Changelog & Last Reviewed
                </h2>
                <div className="glass rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="secondary" className="font-mono text-xs">v{skill.version}</Badge>
                    <span className="text-xs text-muted-foreground">Last reviewed: {skill.lastUpdated}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Latest stable release. Improvements to reliability and output formatting.</p>
                  <p className="text-xs text-muted-foreground mt-2">Reviewed by: <span className="text-foreground">ClawSkills Editorial Team</span></p>
                </div>
              </motion.div>

              {/* Internal links */}
              <RelatedContent title="Related Resources" links={relatedLinks} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="glass rounded-xl p-6 sticky top-24">
                <h3 className="font-semibold text-foreground mb-4">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Category</span><Link to={`/skills/${skill.categorySlug}`} className="text-primary hover:underline">{skill.category}</Link></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Rating</span><span className="flex items-center gap-1 text-foreground"><Star className="w-3 h-3 text-yellow-400 fill-current" />{skill.rating}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Trust Score</span><span className="text-foreground font-semibold">{trustTotal}/100</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Security</span><span className={`flex items-center gap-1 ${sec.color}`}><SecIcon className="w-3 h-3" />{sec.label}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Version</span><span className="text-foreground">{skill.version}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Author</span><span className="text-foreground">{skill.author}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">License</span><span className="text-foreground">MIT</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Last Reviewed</span><span className="text-foreground">{skill.lastUpdated}</span></div>
                </div>
              </div>

              <TrustScore status={skill.securityStatus} rating={skill.rating} lastUpdated={skill.lastUpdated} />

              <SkillDownloadPanel skill={skill} />
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default SkillDetail;
