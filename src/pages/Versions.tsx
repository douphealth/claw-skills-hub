import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Check, X, GitBranch, Download, Users, Package, Star, ChevronDown, ChevronUp, AlertTriangle, ArrowRight } from "lucide-react";
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

const versionFaqs = [
  { question: "How often does OpenClaw release new versions?", answer: "OpenClaw follows a quarterly release cadence, with major versions every 3 months and patch releases as needed for bug fixes and security updates." },
  { question: "How do I upgrade to the latest version?", answer: "Run `npm install -g openclaw@latest` or `npx clawhub@latest install` to get the newest version. Always check the migration notes for breaking changes." },
  { question: "Are older versions still supported?", answer: "OpenClaw maintains security patches for the current and previous major version. Older versions receive critical security fixes only." },
  { question: "Where can I find the full changelog?", answer: "The complete changelog is available on the OpenClaw GitHub repository. Each release tag includes detailed notes, migration guides, and contributor credits." },
];

const Versions = () => {
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null);
  const faq = faqJsonLd(versionFaqs);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="OpenClaw Version History — Compare All Releases & Features"
        description="Complete OpenClaw version history with feature comparison tables, release highlights, GitHub links, and migration guides. Track every update from v0.25 to latest."
        canonical="https://openclaw-skillshub.com/versions"
        jsonLd={faq ? [faq] : []}
      />
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-4 sm:px-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 border-primary/40 text-primary">
              <GitBranch className="w-3 h-3 mr-1" /> {openclawVersions.length} Releases
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-4">
              OpenClaw <span className="text-primary">Version History</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Track every release, compare features across versions, and find migration guides — all in one place.
            </p>
          </motion.div>
        </section>

        {/* Timeline Cards */}
        <section className="container mx-auto px-4 sm:px-6 mb-16">
          <div className="space-y-6 max-w-4xl mx-auto">
            {openclawVersions.map((v, i) => (
              <motion.div
                key={v.version}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className={`border ${v.isLatest ? "border-primary/50 shadow-lg shadow-primary/10" : "border-border"}`}>
                  <CardHeader className="pb-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
                          v{v.version}
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs">{v.codename}</Badge>
                        {v.isLatest && <Badge className="bg-primary text-primary-foreground text-xs">Latest</Badge>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{new Date(v.releaseDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                        <a href={v.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="gap-1.5">
                            <ExternalLink className="w-3.5 h-3.5" /> GitHub
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Stats row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Package className="w-4 h-4 text-primary" />
                        <span><strong className="text-foreground">{v.stats.skills.toLocaleString()}</strong> skills</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 text-primary" />
                        <span><strong className="text-foreground">{v.stats.mcpServers}</strong> MCP servers</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4 text-primary" />
                        <span><strong className="text-foreground">{v.stats.contributors.toLocaleString()}</strong> contributors</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Download className="w-4 h-4 text-primary" />
                        <span><strong className="text-foreground">{v.stats.downloads}</strong> downloads</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-1.5 mb-4">
                      {v.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ArrowRight className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Expandable breaking changes */}
                    {v.breakingChanges && (
                      <button
                        onClick={() => setExpandedVersion(expandedVersion === v.version ? null : v.version)}
                        className="flex items-center gap-1.5 text-sm font-medium text-destructive hover:underline mb-2"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {v.breakingChanges.length} Breaking Change{v.breakingChanges.length > 1 ? "s" : ""}
                        {expandedVersion === v.version ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    )}
                    {expandedVersion === v.version && v.breakingChanges && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mb-3 pl-5 border-l-2 border-destructive/30">
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
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="container mx-auto px-4 sm:px-6 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8">
            Feature <span className="text-primary">Comparison</span>
          </h2>

          <Tabs defaultValue="table" className="max-w-5xl mx-auto">
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
                        <TableHead className="font-semibold text-foreground min-w-[180px]">Feature</TableHead>
                        {openclawVersions.map((v) => (
                          <TableHead key={v.version} className="text-center font-semibold text-foreground min-w-[100px]">
                            <div>v{v.version}</div>
                            <div className="text-xs font-normal text-muted-foreground">{v.codename}</div>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {featureKeys.map((fk) => (
                        <TableRow key={fk}>
                          <TableCell className="font-medium text-foreground">{featureLabels[fk]}</TableCell>
                          {openclawVersions.map((v) => (
                            <TableCell key={v.version} className="text-center">
                              {v.features[fk] ? (
                                <Check className="w-5 h-5 text-primary mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                      {/* Stats rows */}
                      <TableRow className="bg-muted/30">
                        <TableCell className="font-medium text-foreground">Total Skills</TableCell>
                        {openclawVersions.map((v) => (
                          <TableCell key={v.version} className="text-center font-semibold text-foreground">
                            {v.stats.skills.toLocaleString()}
                          </TableCell>
                        ))}
                      </TableRow>
                      <TableRow className="bg-muted/30">
                        <TableCell className="font-medium text-foreground">Downloads</TableCell>
                        {openclawVersions.map((v) => (
                          <TableCell key={v.version} className="text-center font-semibold text-foreground">
                            {v.stats.downloads}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timeline">
              <div className="relative pl-8 border-l-2 border-primary/20 space-y-8">
                {openclawVersions.map((v, i) => (
                  <motion.div
                    key={v.version}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="relative"
                  >
                    <div className={`absolute -left-[calc(1rem+5px)] w-3 h-3 rounded-full border-2 ${v.isLatest ? "bg-primary border-primary" : "bg-background border-primary/40"}`} />
                    <div className="flex flex-wrap items-baseline gap-2 mb-1">
                      <span className="font-bold text-foreground text-lg">v{v.version}</span>
                      <Badge variant="outline" className="text-xs">{v.codename}</Badge>
                      <span className="text-sm text-muted-foreground">{new Date(v.releaseDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}</span>
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

        {/* FAQ */}
        <section className="container mx-auto px-4 sm:px-6 max-w-3xl mb-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {versionFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-foreground">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
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
