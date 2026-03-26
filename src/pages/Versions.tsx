import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Check, X, GitBranch, Download, Users, Package, Star, ChevronDown, ChevronUp, AlertTriangle, ArrowRight, Shield, Zap, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { openclawVersions, featureLabels, type OpenClawVersion } from "@/data/versions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqJsonLd } from "@/utils/jsonLd";

const featureKeys = Object.keys(featureLabels) as (keyof OpenClawVersion["features"])[];

const riskColors: Record<string, string> = {
  low: "bg-green-500/10 text-green-600 border-green-500/20",
  medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  high: "bg-red-500/10 text-red-600 border-red-500/20",
};

const typeColors: Record<string, string> = {
  stable: "bg-primary/10 text-primary border-primary/20",
  beta: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  "pre-release": "bg-muted text-muted-foreground border-border",
};

const versionFaqs = [
  { question: "How often does OpenClaw release new versions?", answer: "OpenClaw releases frequently — often multiple times per month. Stable releases come alongside beta/pre-release versions for early testing. Check the GitHub releases page for the latest." },
  { question: "How do I upgrade to the latest version?", answer: "Run `npm install -g openclaw@latest` or `npx clawhub@latest install` to get the newest stable version. Always check the migration notes for breaking changes, especially when jumping multiple versions." },
  { question: "What was the biggest breaking change recently?", answer: "Version 2026.3.22 was the most migration-heavy release, removing Chrome relay, legacy CLAWDBOT_*/MOLTBOT_* env vars, and the old .moltbot state directory. Run `npx clawhub@latest migrate` to update your config." },
  { question: "Should I use beta versions in production?", answer: "No. Beta and pre-release versions are for staging and testing only. Always use stable releases (like 2026.3.24) for production environments." },
  { question: "Where can I find the full changelog?", answer: "The complete changelog is on the OpenClaw GitHub repository at github.com/openclaw/openclaw/blob/main/CHANGELOG.md. Each release tag includes detailed notes and migration guides." },
];

const Versions = () => {
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null);
  const faq = faqJsonLd(versionFaqs);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="OpenClaw Version Comparison — All Releases & Migration Guides"
        description="Compare OpenClaw versions from 2026.2.21 to 2026.3.24. Feature comparison tables, risk levels, breaking changes, migration guides, and direct GitHub links for every release."
        canonical="https://openclaw-skillshub.com/versions"
        jsonLd={faq ? [faq] : []}
      />
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 border-primary/40 text-primary">
              <GitBranch className="w-3 h-3 mr-1" /> {openclawVersions.length} Releases Tracked
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-4">
              OpenClaw <span className="text-primary">Version Comparison</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Compare every release, check migration risk, and find the right version for your setup.
            </p>
          </motion.div>

          {/* Quick recommendation */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-2xl mx-auto">
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-4 flex items-start gap-3">
                <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground mb-1">Recommended: v2026.3.24 (Stable)</p>
                  <p className="text-muted-foreground">Latest stable with OpenAI-compatible gateway, container CLI, and all recent security fixes. Low migration risk if you're on 2026.3.23+.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Timeline Cards */}
        <section className="container mx-auto px-4 sm:px-6 mb-16">
          <div className="space-y-4 max-w-4xl mx-auto">
            {openclawVersions.map((v, i) => (
              <motion.div
                key={v.version}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className={`border ${v.isLatest ? "border-primary/50 shadow-lg shadow-primary/10" : "border-border"}`}>
                  <CardHeader className="pb-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
                          v{v.version}
                        </CardTitle>
                        <Badge variant="outline" className={`text-xs ${typeColors[v.type]}`}>{v.type}</Badge>
                        <Badge variant="outline" className={`text-xs ${riskColors[v.riskLevel]}`}>
                          <Shield className="w-3 h-3 mr-1" />{v.riskLevel} risk
                        </Badge>
                        {v.isLatest && <Badge className="bg-primary text-primary-foreground text-xs">Latest</Badge>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{new Date(v.releaseDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                        <a href={v.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="gap-1 text-xs h-7">
                            <ExternalLink className="w-3 h-3" /> GitHub
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Focus summary */}
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{v.mainFocus}</p>

                    {/* Stats row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                      {[
                        { icon: Package, label: "skills", value: v.stats.skills.toLocaleString() },
                        { icon: Star, label: "MCP servers", value: String(v.stats.mcpServers) },
                        { icon: Users, label: "contributors", value: v.stats.contributors.toLocaleString() },
                        { icon: Download, label: "downloads", value: v.stats.downloads },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Icon className="w-3.5 h-3.5 text-primary" />
                          <span><strong className="text-foreground">{value}</strong> {label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-1 mb-3">
                      {v.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ArrowRight className="w-3 h-3 mt-1 text-primary shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Breaking changes */}
                    {v.breakingChanges && (
                      <>
                        <button
                          onClick={() => setExpandedVersion(expandedVersion === v.version ? null : v.version)}
                          className="flex items-center gap-1.5 text-sm font-medium text-destructive hover:underline mb-2"
                        >
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {v.breakingChanges.length} Breaking Change{v.breakingChanges.length > 1 ? "s" : ""}
                          {expandedVersion === v.version ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                        {expandedVersion === v.version && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mb-3 pl-4 border-l-2 border-destructive/30">
                            <ul className="space-y-1">
                              {v.breakingChanges.map((bc, k) => (
                                <li key={k} className="text-sm text-muted-foreground">• {bc}</li>
                              ))}
                            </ul>
                            {v.migrationNotes && (
                              <p className="text-sm text-muted-foreground mt-2 bg-muted/50 rounded p-2">
                                <strong>Migration:</strong> {v.migrationNotes}
                              </p>
                            )}
                          </motion.div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="container mx-auto px-4 sm:px-6 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8">
            Feature <span className="text-primary">Comparison Matrix</span>
          </h2>

          <Tabs defaultValue="table" className="max-w-6xl mx-auto">
            <TabsList className="mx-auto w-fit mb-6">
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            </TabsList>

            <TabsContent value="table">
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold text-foreground min-w-[160px] sticky left-0 bg-muted/50 z-10">Feature</TableHead>
                        {openclawVersions.filter(v => v.type === "stable").map((v) => (
                          <TableHead key={v.version} className="text-center font-semibold text-foreground min-w-[90px]">
                            <div className="text-xs">v{v.version}</div>
                            <div className="text-[10px] font-normal text-muted-foreground">{v.codename}</div>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {featureKeys.map((fk) => (
                        <TableRow key={fk}>
                          <TableCell className="font-medium text-foreground text-sm sticky left-0 bg-background z-10">{featureLabels[fk]}</TableCell>
                          {openclawVersions.filter(v => v.type === "stable").map((v) => (
                            <TableCell key={v.version} className="text-center">
                              {v.features[fk] ? (
                                <Check className="w-4 h-4 text-primary mx-auto" />
                              ) : (
                                <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/30">
                        <TableCell className="font-medium text-foreground text-sm sticky left-0 bg-muted/30 z-10">Risk Level</TableCell>
                        {openclawVersions.filter(v => v.type === "stable").map((v) => (
                          <TableCell key={v.version} className="text-center">
                            <Badge variant="outline" className={`text-[10px] ${riskColors[v.riskLevel]}`}>{v.riskLevel}</Badge>
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow className="bg-muted/30">
                        <TableCell className="font-medium text-foreground text-sm sticky left-0 bg-muted/30 z-10">Total Skills</TableCell>
                        {openclawVersions.filter(v => v.type === "stable").map((v) => (
                          <TableCell key={v.version} className="text-center font-semibold text-foreground text-sm">
                            {v.stats.skills.toLocaleString()}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3 flex items-center justify-center gap-1">
                <Info className="w-3 h-3" /> Showing stable releases only. Scroll horizontally on mobile.
              </p>
            </TabsContent>

            <TabsContent value="timeline">
              <div className="relative pl-8 border-l-2 border-primary/20 space-y-8 max-w-3xl mx-auto">
                {openclawVersions.map((v, i) => (
                  <motion.div
                    key={v.version}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="relative"
                  >
                    <div className={`absolute -left-[calc(1rem+5px)] w-3 h-3 rounded-full border-2 ${v.isLatest ? "bg-primary border-primary" : v.type === "stable" ? "bg-background border-primary/40" : "bg-background border-muted-foreground/30"}`} />
                    <div className="flex flex-wrap items-baseline gap-2 mb-1">
                      <span className="font-bold text-foreground text-lg">v{v.version}</span>
                      <Badge variant="outline" className={`text-xs ${typeColors[v.type]}`}>{v.type}</Badge>
                      <span className="text-sm text-muted-foreground">{new Date(v.releaseDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-1">
                      {featureKeys.filter((fk) => {
                        const prev = openclawVersions[i + 1];
                        return v.features[fk] && (!prev || !prev.features[fk]);
                      }).map((fk) => (
                        <Badge key={fk} className="bg-primary/10 text-primary text-xs border-primary/20">+ {featureLabels[fk]}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{v.highlights[0]}</p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Upgrade Path */}
        <section className="container mx-auto px-4 sm:px-6 max-w-3xl mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-6">
            Upgrade <span className="text-primary">Decision Guide</span>
          </h2>
          <div className="space-y-4">
            {[
              { from: "2026.3.23", to: "2026.3.24", risk: "Low", note: "Safe upgrade. Adds OpenAI gateway and container CLI. No breaking changes." },
              { from: "2026.3.22", to: "2026.3.24", risk: "Low–Medium", note: "Review CSP header changes from 2026.3.23. Clear auth cache after upgrade." },
              { from: "2026.3.11 or older", to: "2026.3.24", risk: "High", note: "Must run `npx clawhub@latest migrate`. Remove all legacy CLAWDBOT_*/MOLTBOT_* env vars. Update plugins to SDK v2. Test thoroughly in staging first." },
            ].map((path) => (
              <Card key={path.from} className="border-border">
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">v{path.from}</Badge>
                    <ArrowRight className="w-4 h-4 text-primary" />
                    <Badge className="bg-primary text-primary-foreground text-xs">v{path.to}</Badge>
                    <Badge variant="outline" className={`text-xs ml-auto ${path.risk.includes("High") ? riskColors.high : path.risk.includes("Medium") ? riskColors.medium : riskColors.low}`}>
                      {path.risk} risk
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{path.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 sm:px-6 max-w-3xl mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {versionFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-foreground text-sm">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Versions;
