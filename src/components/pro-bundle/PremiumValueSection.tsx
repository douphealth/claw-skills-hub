import { motion } from "framer-motion";
import { Check, X, Crown, FileJson, Terminal, ShieldCheck, RefreshCw, ArrowRight, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRO_BUNDLE_SKILL_COUNT } from "@/utils/proBundleExport";

const premiumDeliverables = [
  {
    icon: FileJson,
    title: "Current JSON Manifest",
    desc: `A machine-readable export of all ${PRO_BUNDLE_SKILL_COUNT} skills currently documented by ClawSkills, including slugs, categories, versions, install commands, guide URLs, ratings, and trust labels.`,
  },
  {
    icon: Terminal,
    title: "macOS / Linux Bulk Installer",
    desc: "A generated shell script that checks for Node.js and invokes the current clawhub package against the documented skill set.",
  },
  {
    icon: Monitor,
    title: "Windows PowerShell Installer",
    desc: "A PowerShell equivalent with Node.js validation, explicit failure handling, and the same documented skill set.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Stripe Fulfillment",
    desc: "Downloads unlock only after the server confirms the Checkout Session is complete, paid, and contains the configured Pro Bundle Stripe Price.",
  },
  {
    icon: RefreshCw,
    title: "Regenerated From Current Site Data",
    desc: "The bundle files are built from the same dataset the directory uses, avoiding a stale hand-maintained ZIP that drifts from the live site.",
  },
  {
    icon: Crown,
    title: "One Paid Convenience Layer",
    desc: "The underlying directory remains free. Pro is for users who want the full documented set packaged into repeatable, downloadable bulk-install artifacts.",
  },
];

const comparison = [
  { feature: "Browse documented skills", free: "Included", pro: "Included" },
  { feature: "Install one skill", free: "Copy individual command", pro: "Included" },
  { feature: "Full JSON manifest", free: "Not bundled", pro: "Download included" },
  { feature: "macOS/Linux bulk installer", free: "Build manually", pro: "Generated download" },
  { feature: "Windows bulk installer", free: "Build manually", pro: "Generated download" },
  { feature: "Payment verification", free: "Not applicable", pro: "Stripe session verified server-side" },
  { feature: "Dataset freshness", free: "Live directory", pro: "Downloads generated from current site data" },
];

interface PremiumValueSectionProps {
  onCheckout: () => void;
}

const PremiumValueSection = ({ onCheckout }: PremiumValueSectionProps) => (
  <>
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 text-sm px-4 py-1 bg-primary/10 text-primary border-primary/20">
            <Crown className="h-3.5 w-3.5 mr-1 inline" /> Paid convenience bundle
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Exactly what the Pro purchase unlocks</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No hidden enterprise tier and no invented exclusives. The paid value is a verified, current packaging layer over the documented directory.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumDeliverables.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-6 rounded-xl border bg-card hover:border-primary/30 transition-colors"
            >
              <item.icon className="h-5 w-5 text-primary mb-3" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-4">Free directory vs Pro bundle</h2>
        <p className="text-center text-muted-foreground mb-10">
          Choose Pro only if bulk packaging is worth the one-time price to you.
        </p>

        <div className="rounded-xl border overflow-hidden bg-card">
          <div className="grid grid-cols-3 gap-0 text-sm font-semibold border-b bg-muted/50 p-4">
            <span>Feature</span>
            <span className="text-center">Free</span>
            <span className="text-center text-primary">Pro ($7.99)</span>
          </div>
          {comparison.map((row) => (
            <div key={row.feature} className="grid grid-cols-3 gap-0 text-sm border-b last:border-b-0 p-4 items-center">
              <span className="font-medium">{row.feature}</span>
              <span className="text-center text-muted-foreground flex items-center justify-center gap-1">
                {row.free === "Included" ? <Check className="h-4 w-4" /> : <X className="h-3.5 w-3.5 text-muted-foreground/60 hidden sm:block" />}
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

export default PremiumValueSection;
