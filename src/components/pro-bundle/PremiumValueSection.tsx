import { motion } from "framer-motion";
import { Check, X, Crown, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const premiumExclusives = [
  {
    title: "Pre-Built Skill Chains",
    desc: "Ready-made workflows that combine multiple skills — e.g., Research → Draft → Edit → Publish in one command.",
    highlight: true,
  },
  {
    title: "Enterprise Config Profiles",
    desc: "Production-hardened configurations for CI/CD, Docker, and Kubernetes deployments. Battle-tested at scale.",
    highlight: true,
  },
  {
    title: "Private Security Advisories",
    desc: "Get notified 48 hours before public disclosure of skill vulnerabilities. Patch before anyone else knows.",
    highlight: true,
  },
  {
    title: "Custom Skill Templates",
    desc: "15+ starter templates for building your own skills — API integrators, data pipelines, and agent orchestrators.",
    highlight: false,
  },
  {
    title: "Performance Benchmarks",
    desc: "Detailed latency and token-usage benchmarks for every skill. Optimize cost before you deploy.",
    highlight: false,
  },
  {
    title: "Multi-LLM Config Presets",
    desc: "Optimized configs for GPT-4o, Claude, Gemini, Llama, and Mistral — switch models without reconfiguring.",
    highlight: false,
  },
];

const comparison = [
  { feature: "Skills included", free: "1 at a time (manual)", pro: "All 60+ in one command" },
  { feature: "Setup time", free: "2–4 hours per project", pro: "60 seconds total" },
  { feature: "Configuration", free: "Manual YAML editing", pro: "Pre-optimized for production" },
  { feature: "Security review", free: "Community-reviewed", pro: "Fully audited + private advisories" },
  { feature: "Skill chains", free: "Build your own", pro: "15+ pre-built workflows" },
  { feature: "Multi-LLM support", free: "Manual per-model config", pro: "Auto-switching presets" },
  { feature: "Updates", free: "Manual per-skill", pro: "Automatic for 1 year" },
  { feature: "Support", free: "Community forums", pro: "Priority email (< 24h response)" },
  { feature: "Enterprise configs", free: "Not included", pro: "CI/CD, Docker, K8s ready" },
];

interface PremiumValueSectionProps {
  onCheckout: () => void;
}

const PremiumValueSection = ({ onCheckout }: PremiumValueSectionProps) => {
  return (
    <>
      {/* Premium Exclusives */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 text-sm px-4 py-1 bg-primary/10 text-primary border-primary/20">
              <Crown className="h-3.5 w-3.5 mr-1 inline" /> Pro Exclusive
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What You <span className="text-primary">Can't Get</span> Anywhere Else
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These are only available in the Pro Bundle. No amount of manual setup can replicate these.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumExclusives.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  item.highlight
                    ? "bg-gradient-to-br from-primary/5 to-accent/5 border-primary/30 hover:border-primary/50"
                    : "bg-card hover:border-primary/30"
                }`}
              >
                {item.highlight && (
                  <Sparkles className="h-5 w-5 text-primary mb-3" />
                )}
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4">Free vs Pro Bundle</h2>
          <p className="text-center text-muted-foreground mb-10">See exactly what you're getting.</p>

          <div className="rounded-xl border overflow-hidden bg-card">
            <div className="grid grid-cols-3 gap-0 text-sm font-semibold border-b bg-muted/50 p-4">
              <span>Feature</span>
              <span className="text-center">Free (DIY)</span>
              <span className="text-center text-primary">Pro Bundle ($7.99)</span>
            </div>
            {comparison.map((row, i) => (
              <div key={i} className="grid grid-cols-3 gap-0 text-sm border-b last:border-b-0 p-4 items-center">
                <span className="font-medium">{row.feature}</span>
                <span className="text-center text-muted-foreground flex items-center justify-center gap-1">
                  <X className="h-3.5 w-3.5 text-destructive/60 flex-shrink-0 hidden sm:block" />
                  <span>{row.free}</span>
                </span>
                <span className="text-center font-medium text-primary flex items-center justify-center gap-1">
                  <Check className="h-4 w-4 flex-shrink-0" /> {row.pro}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" className="px-8 text-lg" onClick={onCheckout}>
              Get the Pro Bundle <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PremiumValueSection;
