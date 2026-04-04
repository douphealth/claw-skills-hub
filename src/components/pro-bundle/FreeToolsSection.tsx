import { motion } from "framer-motion";
import { Terminal, Copy, Check, Shield, Zap, FileCode, Search, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const freeTools = [
  {
    icon: Terminal,
    title: "Instant Skill Installer",
    desc: "Copy-paste install commands for any skill. No signup required.",
    action: "Try it free",
    href: "/install",
  },
  {
    icon: Shield,
    title: "Security Scanner",
    desc: "Check the trust score and security audit status of any skill before installing.",
    action: "Scan a skill",
    href: "/skills",
  },
  {
    icon: Search,
    title: "Skill Finder & Comparator",
    desc: "Search 60+ skills, filter by category, and compare side-by-side — completely free.",
    action: "Compare skills",
    href: "/skills/compare",
  },
  {
    icon: FileCode,
    title: "SKILL.md Template Generator",
    desc: "Generate a production-ready SKILL.md manifest for your custom skills in seconds.",
    action: "Generate template",
    href: "/tutorials/how-to-write-a-skill-md",
  },
  {
    icon: BarChart3,
    title: "Version Changelog Tracker",
    desc: "Track every OpenClaw release with detailed changelogs, migration guides, and breaking changes.",
    action: "View versions",
    href: "/versions",
  },
  {
    icon: Zap,
    title: "Quick Start Tutorials",
    desc: "Step-by-step guides from zero to production. Install your first skill in under 5 minutes.",
    action: "Start learning",
    href: "/tutorials",
  },
];

const sampleCommands = [
  { label: "Install all AI skills", cmd: "openclaw install --category ai-llms --all" },
  { label: "Security audit", cmd: "openclaw audit --deep --report json" },
  { label: "Bulk export configs", cmd: "openclaw export --format yaml --all" },
];

const FreeToolsSection = () => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <section className="py-16 md:py-24 bg-background relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">🎁 100% Free — No Account Required</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Free Tools <span className="text-primary">for Every Developer</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We believe great developer tools should be accessible to everyone. Use these tools completely free, forever.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {freeTools.map((tool, i) => (
            <motion.a
              key={tool.title}
              href={tool.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-6 rounded-xl border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <tool.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{tool.desc}</p>
              <span className="text-primary text-sm font-medium group-hover:underline">{tool.action} →</span>
            </motion.a>
          ))}
        </div>

        {/* Interactive command showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border bg-card/50 p-6 md:p-8"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Terminal className="h-5 w-5 text-primary" />
            Try These Commands — Free
          </h3>
          <div className="space-y-3">
            {sampleCommands.map((c, i) => (
              <div key={i} className="flex items-center justify-between gap-4 p-3 rounded-lg bg-background border">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">{c.label}</p>
                  <code className="text-sm text-primary font-mono truncate block">{c.cmd}</code>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(c.cmd, i)}
                  className="flex-shrink-0"
                >
                  {copiedIdx === i ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Love these? The <span className="text-primary font-medium">Pro Bundle</span> automates all of this with one command.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FreeToolsSection;
