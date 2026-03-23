import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Sparkles, Copy, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx clawhub@latest install notion-sync");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        <img src={heroBg} alt="OpenClaw AI agent skills directory — abstract technology background" className="w-full h-full object-cover opacity-40" loading="eager" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-glow opacity-[0.04] blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-glow opacity-[0.06] blur-[100px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 sm:mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium text-muted-foreground">5,705+ Skills and Growing</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight mb-4 sm:mb-6"
        >
          <span className="text-foreground">Discover, Install &</span><br />
          <span className="text-gradient">Audit OpenClaw Skills</span><br className="hidden sm:block" />
          <span className="text-foreground"> Before You Ship</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
        >
          The curated registry with verified security reviews and one-command installs.<br className="hidden sm:block" />
          Search 5,705+ skills across 10 categories. Compare, audit, and ship safely.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4"
        >
          <Link to="/skills" className="w-full sm:w-auto">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-8 h-12 gap-2 w-full sm:w-auto">
              Browse All Skills <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/install" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary font-medium text-base px-8 h-12 gap-2 w-full sm:w-auto">
              <Download className="w-4 h-4" /> Install Guide
            </Button>
          </Link>
        </motion.div>

        {/* Interactive install command */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass rounded-xl p-3 sm:p-4 max-w-xl mx-auto group cursor-pointer hover:border-primary/30 transition-colors"
          onClick={handleCopy}
        >
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-primary shrink-0" />
            <code className="font-mono text-xs sm:text-sm text-muted-foreground flex-1 text-left overflow-x-auto">
              <span className="text-primary">npx</span> clawhub@latest install <span className="text-foreground">notion-sync</span>
            </code>
            <button className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />}
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground/60 mt-1.5 text-center sm:hidden">Tap to copy</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: "5,705+", label: "Curated Skills" },
            { value: "10", label: "Skill Categories" },
            { value: "100%", label: "Open Source" },
            { value: "Verified", label: "Security Reviews" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
