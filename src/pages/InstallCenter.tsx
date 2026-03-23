import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Terminal, Copy, Check, Search, Shield, Star,
  Apple, Monitor as MonitorIcon, HardDrive, ChevronDown, ChevronUp,
  ArrowRight, Sparkles, Download, Zap, BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { skills, categories, type Skill } from "@/data/skills";
import { breadcrumbJsonLd, webPageJsonLd, faqJsonLd } from "@/utils/jsonLd";
import installHero from "@/assets/install-center-hero.jpg";

type Platform = "macos" | "linux" | "windows";

const platforms: { id: Platform; label: string; icon: React.ElementType }[] = [
  { id: "macos", label: "macOS", icon: Apple },
  { id: "linux", label: "Linux", icon: HardDrive },
  { id: "windows", label: "Windows WSL", icon: MonitorIcon },
];

function getPlatformInstallSteps(platform: Platform) {
  const common = [
    { title: "Install Node.js (v18+)", cmd: platform === "macos" ? "brew install node" : platform === "linux" ? "curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs" : "wsl --install && curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs", note: platform === "windows" ? "Run this in PowerShell as Administrator, then open WSL" : undefined },
    { title: "Verify installation", cmd: "node --version && npm --version", note: "Should show v18+ and v9+" },
    { title: "Install OpenClaw CLI", cmd: "npm install -g clawhub@latest", note: "Installs the OpenClaw command-line tool globally" },
    { title: "Verify OpenClaw", cmd: "clawhub --version", note: "Confirms OpenClaw CLI is ready" },
    { title: "Initialize your project", cmd: "clawhub init my-project && cd my-project", note: "Creates a new project with default configuration" },
    { title: "Install your first skill", cmd: "npx clawhub@latest install gpt-prompt-chainer", note: "Installs the #1 most popular skill" },
  ];
  return common;
}

const installFaqs = [
  { question: "How do I install OpenClaw on macOS?", answer: "Install Node.js via Homebrew (brew install node), then run npm install -g clawhub@latest. Verify with clawhub --version. You can then install any skill with npx clawhub@latest install <skill-name>." },
  { question: "How do I install OpenClaw on Windows?", answer: "OpenClaw requires WSL (Windows Subsystem for Linux). Run wsl --install in PowerShell as Administrator, then install Node.js inside WSL. Finally, run npm install -g clawhub@latest to install the CLI." },
  { question: "How do I install a specific OpenClaw skill?", answer: "Use the command npx clawhub@latest install <skill-slug>. For example: npx clawhub@latest install gpt-prompt-chainer. You can find skill slugs in the Skills Directory." },
  { question: "Can I install multiple OpenClaw skills at once?", answer: "Yes! Use npx clawhub@latest install skill-1 skill-2 skill-3 to install multiple skills in a single command. All dependencies are resolved automatically." },
  { question: "How do I update OpenClaw skills?", answer: "Run npx clawhub@latest update to update all installed skills, or npx clawhub@latest update <skill-name> to update a specific skill to its latest version." },
  { question: "How do I uninstall an OpenClaw skill?", answer: "Run npx clawhub@latest uninstall <skill-name> to remove a skill. This cleanly removes the SKILL.md file and any associated configuration." },
];

const InstallCenter = () => {
  const [platform, setPlatform] = useState<Platform>("macos");
  const [search, setSearch] = useState("");
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCopy = useCallback((cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  }, []);

  const filtered = useMemo(() => {
    let result = skills;
    if (activeCategory) result = result.filter(s => s.categorySlug === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(s => s.name.toLowerCase().includes(q) || s.slug.includes(q) || s.description.toLowerCase().includes(q));
    }
    return result;
  }, [search, activeCategory]);

  const steps = getPlatformInstallSteps(platform);

  const bJsonLd = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Installation Center", url: "/install" },
  ]);
  const pJsonLd = webPageJsonLd(
    "OpenClaw Installation Center",
    "Get enterprise-grade installation commands for OpenClaw and 5,705+ skills. Step-by-step guides for macOS, Linux, and Windows WSL.",
    "/install"
  );
  const fJson = faqJsonLd(installFaqs);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Installation Center — OpenClaw Setup & Skill Install Commands"
        description="Get enterprise-grade installation commands for OpenClaw and 5,705+ skills. Step-by-step guides for macOS, Linux, and Windows WSL with one-click copy."
        canonical="https://openclaw-skillshub.com/install"
        jsonLd={[bJsonLd, pJsonLd, ...(fJson ? [fJson] : [])]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={installHero} alt="OpenClaw installation command center" className="w-full h-full object-cover opacity-20" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Installation Center</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-8">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">Enterprise-Grade Commands</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              Installation <span className="text-gradient">Command Center</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Copy-paste ready commands for every platform. Set up OpenClaw and install any of 5,705+ skills in seconds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Platform Setup */}
      <section className="pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" /> Quick Start Setup
            </h2>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">Choose your platform and follow the steps to get OpenClaw running.</p>

            {/* Platform tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {platforms.map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      platform === p.id
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "glass text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {p.label}
                  </button>
                );
              })}
            </div>

            {/* Steps */}
            <div className="space-y-4">
              {steps.map((step, i) => (
                <motion.div
                  key={`${platform}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass rounded-xl p-4 sm:p-5"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground mb-2">{step.title}</h3>
                      <div className="flex items-center gap-2 glass rounded-lg p-3 group">
                        <Terminal className="w-4 h-4 text-primary shrink-0 hidden sm:block" />
                        <code className="font-mono text-xs sm:text-sm text-muted-foreground flex-1 overflow-x-auto whitespace-nowrap">{step.cmd}</code>
                        <button onClick={() => handleCopy(step.cmd)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                          {copiedCmd === step.cmd ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      {step.note && <p className="text-xs text-muted-foreground mt-2">{step.note}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skill Installer */}
      <section className="pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" /> Install Any Skill
            </h2>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">Search and get instant install commands for all 5,705+ skills.</p>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search skills by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-secondary border-border h-11 text-foreground"
              />
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${!activeCategory ? "bg-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(activeCategory === cat.slug ? null : cat.slug)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeCategory === cat.slug ? "bg-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Results count */}
            <p className="text-xs text-muted-foreground mb-4">{filtered.length} skills found</p>

            {/* Skill list */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {filtered.slice(0, 50).map((skill) => (
                <SkillInstallCard
                  key={skill.slug}
                  skill={skill}
                  expanded={expandedSkill === skill.slug}
                  onToggle={() => setExpandedSkill(expandedSkill === skill.slug ? null : skill.slug)}
                  onCopy={handleCopy}
                  copiedCmd={copiedCmd}
                />
              ))}
              {filtered.length > 50 && (
                <p className="text-center text-sm text-muted-foreground py-4">
                  Showing 50 of {filtered.length} skills. Narrow your search to find more.
                </p>
              )}
              {filtered.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No skills found. Try a different search.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" /> Installation FAQ
          </h2>
          <div className="space-y-4">
            {installFaqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl group"
              >
                <summary className="p-5 cursor-pointer list-none flex items-center justify-between text-sm font-semibold text-foreground hover:text-primary transition-colors">
                  {faq.question}
                  <ChevronDown className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform shrink-0 ml-2" />
                </summary>
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

function SkillInstallCard({
  skill,
  expanded,
  onToggle,
  onCopy,
  copiedCmd,
}: {
  skill: Skill;
  expanded: boolean;
  onToggle: () => void;
  onCopy: (cmd: string) => void;
  copiedCmd: string | null;
}) {
  const installCmd = `npx clawhub@latest install ${skill.slug}`;
  const verifyCmd = `clawhub list --installed | grep ${skill.slug}`;
  const uninstallCmd = `npx clawhub@latest uninstall ${skill.slug}`;

  return (
    <div className="glass rounded-xl overflow-hidden">
      <button onClick={onToggle} className="w-full p-4 flex items-center gap-3 text-left hover:bg-secondary/30 transition-colors">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-foreground">{skill.name}</h3>
            <Badge variant="outline" className="text-[10px] border-border text-muted-foreground">{skill.category}</Badge>
            {skill.securityStatus === "verified" && (
              <Shield className="w-3.5 h-3.5 text-green-400" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{skill.description}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs">{skill.rating}</span>
          </div>
          {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
              {[
                { label: "Install", cmd: installCmd },
                { label: "Verify", cmd: verifyCmd },
                { label: "Uninstall", cmd: uninstallCmd },
              ].map((item) => (
                <div key={item.label}>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-1 block">{item.label}</span>
                  <div className="flex items-center gap-2 glass rounded-lg p-2.5">
                    <Terminal className="w-3.5 h-3.5 text-primary shrink-0 hidden sm:block" />
                    <code className="font-mono text-xs text-muted-foreground flex-1 overflow-x-auto whitespace-nowrap">{item.cmd}</code>
                    <button onClick={() => onCopy(item.cmd)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                      {copiedCmd === item.cmd ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
              <Link
                to={`/skills/${skill.categorySlug}/${skill.slug}`}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
              >
                Full skill details <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default InstallCenter;
