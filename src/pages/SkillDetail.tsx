import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Terminal, Shield, ShieldCheck, ShieldAlert, Star, Clock, User, ArrowRight, Copy, Check, Monitor, Cpu, Wrench, GitBranch } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { getSkillBySlug, getRelatedSkills, getCategoryBySlug } from "@/data/skills";
import { skillJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/utils/jsonLd";

const securityConfig = {
  verified: { icon: ShieldCheck, label: "Verified", color: "text-green-400", bg: "bg-green-400/10" },
  community: { icon: Shield, label: "Community", color: "text-yellow-400", bg: "bg-yellow-400/10" },
  unreviewed: { icon: ShieldAlert, label: "Unreviewed", color: "text-red-400", bg: "bg-red-400/10" },
};

const SkillHero = ({ skill, category, sec, SecIcon, copied, handleCopy }: any) => (
  <section className="relative pt-28 pb-16 overflow-hidden">
    <div className="absolute inset-0 grid-pattern opacity-20" />
    <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-glow opacity-[0.04] blur-[100px]" />

    <div className="relative z-10 container mx-auto px-6">
      {/* Breadcrumb */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/skills">Skills</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            {category && (
              <>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to={`/skills?category=${category.slug}`}>{category.name}</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem><BreadcrumbPage>{skill.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
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
);

const CompatibilitySection = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
      <Monitor className="w-5 h-5 text-primary" /> Compatibility
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
);

const ToolsUsedSection = ({ skill }: { skill: any }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
      <Wrench className="w-5 h-5 text-primary" /> Tools & Capabilities
    </h2>
    <div className="flex flex-wrap gap-2">
      {["system.run", "file.read", "file.write", "web.search"].map((tool) => (
        <Badge key={tool} variant="secondary" className="font-mono text-xs px-3 py-1.5">
          {tool}
        </Badge>
      ))}
    </div>
    <p className="text-xs text-muted-foreground mt-3">These are the OpenClaw tool permissions this skill may request during execution.</p>
  </motion.div>
);

const ChangelogSection = ({ skill }: { skill: any }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
      <GitBranch className="w-5 h-5 text-primary" /> Changelog
    </h2>
    <div className="space-y-4">
      <div className="glass rounded-xl p-5">
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="secondary" className="font-mono text-xs">v{skill.version}</Badge>
          <span className="text-xs text-muted-foreground">{skill.lastUpdated}</span>
        </div>
        <p className="text-sm text-muted-foreground">Latest stable release. Improvements to reliability and output formatting.</p>
      </div>
    </div>
  </motion.div>
);

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
    ...(category ? [{ name: category.name, url: `/skills?category=${category.slug}` }] : []),
    { name: skill.name, url: `/skills/${skill.categorySlug}/${skill.slug}` },
  ]);

  const allJsonLd = [sJsonLd, breadcrumbs, ...(faq ? [faq] : [])];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${skill.name} for OpenClaw — Full Guide`}
        description={`${skill.description} Install with: ${skill.installCmd}. Rating: ${skill.rating}/5.`}
        jsonLd={allJsonLd}
      />
      <Navbar />

      <SkillHero skill={skill} category={category} sec={sec} SecIcon={SecIcon} copied={copied} handleCopy={handleCopy} />

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

              {/* Compatibility */}
              <CompatibilitySection />

              {/* Tools Used */}
              <ToolsUsedSection skill={skill} />

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

              {/* Changelog */}
              <ChangelogSection skill={skill} />

              {/* FAQ */}
              {skill.faqs?.length > 0 && (
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
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="glass rounded-xl p-6 sticky top-24">
                <h3 className="font-semibold text-foreground mb-4">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <Link to={`/skills?category=${skill.categorySlug}`} className="text-primary hover:underline">{skill.category}</Link>
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
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">License</span>
                    <span className="text-foreground">MIT</span>
                  </div>
                </div>
              </div>

              {/* Related Skills (Alternatives) */}
              {related.length > 0 && (
                <div className="glass rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary" /> Alternatives & Related
                  </h3>
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
