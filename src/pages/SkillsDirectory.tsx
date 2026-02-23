import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Star, Shield, ShieldCheck, ShieldAlert, ArrowRight, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { skills, categories } from "@/data/skills";

const SkillsDirectory = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return skills.filter((s) => {
      const matchesSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !activeCategory || s.categorySlug === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const securityIcon = (status: string) => {
    if (status === "verified") return <ShieldCheck className="w-3.5 h-3.5 text-green-400" />;
    if (status === "community") return <Shield className="w-3.5 h-3.5 text-yellow-400" />;
    return <ShieldAlert className="w-3.5 h-3.5 text-red-400" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-15" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-glow opacity-[0.04] blur-[120px]" />

        <div className="relative z-10 container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Skills Directory</span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Explore <span className="text-gradient">5,705+</span> Skills
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Search, filter, and discover the perfect OpenClaw skills for your workflow.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-2xl mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search skills by name or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-13 bg-secondary border-border text-foreground text-base"
              />
            </div>
          </motion.div>

          {/* Category filters */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-2 mb-12">
            <Button
              variant={activeCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(null)}
              className="rounded-full text-xs"
            >
              All ({skills.length})
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.slug}
                variant={activeCategory === cat.slug ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.slug)}
                className="rounded-full text-xs"
              >
                {cat.name}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.3) }}
              >
                <Link
                  to={`/skills/${skill.categorySlug}/${skill.slug}`}
                  className="group glass rounded-xl p-6 card-hover flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider border-border text-muted-foreground">
                      {skill.category}
                    </Badge>
                    <div className="flex items-center gap-2">
                      {securityIcon(skill.securityStatus)}
                      <span className="flex items-center gap-1 text-xs text-yellow-400">
                        <Star className="w-3 h-3 fill-current" />
                        {skill.rating}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                    {skill.description}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <code className="text-[10px] font-mono text-muted-foreground truncate mr-2">
                      clawhub install {skill.slug}
                    </code>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No skills found matching your search.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setActiveCategory(null); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SkillsDirectory;
