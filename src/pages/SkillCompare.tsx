import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Shield, ShieldCheck, ShieldAlert, ArrowRight, Search, GitCompare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { skills, getSkillBySlug, type Skill } from "@/data/skills";
import { breadcrumbJsonLd } from "@/utils/jsonLd";
import { skillPath } from "@/lib/routeUrls";

const securityConfig = {
  verified: { icon: ShieldCheck, label: "Verified", color: "text-green-400", rank: 3 },
  community: { icon: Shield, label: "Community", color: "text-yellow-400", rank: 2 },
  unreviewed: { icon: ShieldAlert, label: "Unreviewed", color: "text-red-400", rank: 1 },
};

const SkillCompare = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const slugA = searchParams.get("a") || "";
  const slugB = searchParams.get("b") || "";
  const [searchA, setSearchA] = useState("");
  const [searchB, setSearchB] = useState("");

  const skillA = getSkillBySlug(slugA);
  const skillB = getSkillBySlug(slugB);

  const filteredA = useMemo(() => {
    if (!searchA) return [];
    return skills.filter(s => s.slug !== slugB && s.name.toLowerCase().includes(searchA.toLowerCase())).slice(0, 6);
  }, [searchA, slugB]);

  const filteredB = useMemo(() => {
    if (!searchB) return [];
    return skills.filter(s => s.slug !== slugA && s.name.toLowerCase().includes(searchB.toLowerCase())).slice(0, 6);
  }, [searchB, slugA]);

  const selectSkill = (side: "a" | "b", slug: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(side, slug);
    setSearchParams(params);
    if (side === "a") setSearchA("");
    else setSearchB("");
  };

  const bJsonLd = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Skills", url: "/skills" },
    { name: "Compare", url: "/skills/compare" },
  ]);

  const title = skillA && skillB
    ? `${skillA.name} vs ${skillB.name} — OpenClaw Skill Comparison`
    : "Compare OpenClaw Skills Side-by-Side";

  const desc = skillA && skillB
    ? `Compare ${skillA.name} and ${skillB.name} for OpenClaw. Rating, security, features, and compatibility comparison.`
    : "Compare any two OpenClaw AI agent skills side-by-side. Evaluate ratings, security, and features.";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={title} description={desc} canonical="https://openclaw-skillshub.com/skills/compare/" jsonLd={bJsonLd} />
      <Navbar />

      <section className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-15" />
        <div className="relative z-10 container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/skills">Skills</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Compare</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Skill Comparison</span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Compare <span className="text-gradient">Skills</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Evaluate two OpenClaw skills side-by-side to find the best fit for your workflow.
            </p>
          </motion.div>

          {/* Skill selectors */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {(["a", "b"] as const).map((side) => {
              const selectedSkill = side === "a" ? skillA : skillB;
              const searchVal = side === "a" ? searchA : searchB;
              const setSearchVal = side === "a" ? setSearchA : setSearchB;
              const filtered = side === "a" ? filteredA : filteredB;

              return (
                <div key={side} className="relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder={`Search skill ${side.toUpperCase()}...`}
                      value={searchVal}
                      onChange={(e) => setSearchVal(e.target.value)}
                      className="pl-10 bg-secondary border-border"
                    />
                  </div>
                  {filtered.length > 0 && (
                    <div className="absolute z-20 w-full mt-1 glass-strong rounded-lg overflow-hidden shadow-xl">
                      {filtered.map(s => (
                        <button
                          key={s.slug}
                          onClick={() => selectSkill(side, s.slug)}
                          className="w-full text-left px-4 py-3 hover:bg-secondary/50 transition-colors flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground">{s.name}</p>
                            <p className="text-xs text-muted-foreground">{s.category}</p>
                          </div>
                          <ArrowRight className="w-3 h-3 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  )}
                  {selectedSkill && (
                    <div className="mt-2 glass rounded-xl p-4">
                      <p className="font-semibold text-foreground">{selectedSkill.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{selectedSkill.category}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      {skillA && skillB && (
        <section className="pb-32">
          <div className="container mx-auto px-6">
            <ComparisonTable skillA={skillA} skillB={skillB} />
          </div>
        </section>
      )}

      {!skillA || !skillB ? (
        <section className="pb-32">
          <div className="container mx-auto px-6 text-center">
            <GitCompare className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Select two skills above to compare them side-by-side.</p>
          </div>
        </section>
      ) : null}

      <Footer />
    </div>
  );
};

function ComparisonTable({ skillA, skillB }: { skillA: Skill; skillB: Skill }) {
  const rows: { label: string; a: React.ReactNode; b: React.ReactNode }[] = [
    { label: "Category", a: skillA.category, b: skillB.category },
    {
      label: "Rating",
      a: <RatingCell rating={skillA.rating} />,
      b: <RatingCell rating={skillB.rating} />,
    },
    {
      label: "Security",
      a: <SecurityCell status={skillA.securityStatus} />,
      b: <SecurityCell status={skillB.securityStatus} />,
    },
    { label: "Version", a: `v${skillA.version}`, b: `v${skillB.version}` },
    { label: "Author", a: skillA.author, b: skillB.author },
    { label: "Last Updated", a: skillA.lastUpdated, b: skillB.lastUpdated },
    { label: "Use Cases", a: skillA.useCases.length, b: skillB.useCases.length },
    { label: "FAQs", a: skillA.faqs?.length || 0, b: skillB.faqs?.length || 0 },
    {
      label: "Install Command",
      a: <code className="text-xs font-mono text-muted-foreground">{skillA.installCmd}</code>,
      b: <code className="text-xs font-mono text-muted-foreground">{skillB.installCmd}</code>,
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
      <div className="glass rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-3 border-b border-border">
          <div className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Attribute</div>
          <div className="p-4 text-center border-l border-border">
            <Link to={skillPath(skillA.categorySlug, skillA.slug)} className="text-sm font-semibold text-primary hover:underline">{skillA.name}</Link>
          </div>
          <div className="p-4 text-center border-l border-border">
            <Link to={skillPath(skillB.categorySlug, skillB.slug)} className="text-sm font-semibold text-primary hover:underline">{skillB.name}</Link>
          </div>
        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <div key={row.label} className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-secondary/20" : ""}`}>
            <div className="p-4 text-sm font-medium text-muted-foreground">{row.label}</div>
            <div className="p-4 text-sm text-foreground text-center border-l border-border">{row.a}</div>
            <div className="p-4 text-sm text-foreground text-center border-l border-border">{row.b}</div>
          </div>
        ))}
      </div>

      {/* Description comparison */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {[skillA, skillB].map(skill => (
          <div key={skill.slug} className="glass rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-3">{skill.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
            <Link to={skillPath(skill.categorySlug, skill.slug)} className="inline-flex items-center gap-1 text-primary text-sm mt-4 hover:underline">
              View full review <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function RatingCell({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
      <span className="font-medium">{rating}</span>
    </span>
  );
}

function SecurityCell({ status }: { status: Skill["securityStatus"] }) {
  const config = securityConfig[status];
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1 ${config.color}`}>
      <Icon className="w-3.5 h-3.5" />
      <span className="text-sm">{config.label}</span>
    </span>
  );
}

export default SkillCompare;
