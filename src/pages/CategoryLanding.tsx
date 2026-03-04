import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Star, Shield, ShieldCheck, ShieldAlert, ArrowRight } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { getSkillsByCategory, getCategoryBySlug, categories } from "@/data/skills";
import { itemListJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/utils/jsonLd";

const CategoryLanding = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [search, setSearch] = useState("");
  const category = getCategoryBySlug(categorySlug || "");
  const allSkills = useMemo(() => getSkillsByCategory(categorySlug || ""), [categorySlug]);

  const filtered = useMemo(() => {
    if (!search) return allSkills;
    const q = search.toLowerCase();
    return allSkills.filter(
      (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    );
  }, [allSkills, search]);

  const securityIcon = (status: string) => {
    if (status === "verified") return <ShieldCheck className="w-3.5 h-3.5 text-green-400" />;
    if (status === "community") return <Shield className="w-3.5 h-3.5 text-yellow-400" />;
    return <ShieldAlert className="w-3.5 h-3.5 text-red-400" />;
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-32 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">This category doesn't exist.</p>
          <Link to="/skills"><Button>Browse All Skills</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const bJsonLd = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Skills", url: "/skills" },
    { name: category.name, url: `/skills/${category.slug}` },
  ]);

  const listJsonLd = itemListJsonLd(
    allSkills.slice(0, 50).map((s, i) => ({
      name: s.name,
      url: `/skills/${s.categorySlug}/${s.slug}`,
      position: i + 1,
    }))
  );

  const categoryFaqs = [
    { question: `How many ${category.name} skills are available for OpenClaw?`, answer: `There are ${allSkills.length}+ ${category.name} skills available in the ClawSkills directory. ${category.description}` },
    { question: `How do I install a ${category.name} skill?`, answer: `Install any ${category.name} skill with a single command: npx clawhub@latest install <skill-name>. The skill is immediately available to your AI agents.` },
    { question: `Are ${category.name} skills free?`, answer: `The vast majority of ${category.name} skills in the ClawSkills directory are free and open-source under the MIT license.` },
  ];
  const faq = faqJsonLd(categoryFaqs);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`Best ${category.name} Skills for OpenClaw (${category.count}+ Skills)`}
        description={category.description}
        canonical={`https://openclaw-skillshub.com/skills/${category.slug}`}
        jsonLd={[bJsonLd, listJsonLd, ...(faq ? [faq] : [])]}
      />
      <Navbar />

      <section className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-15" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-glow opacity-[0.04] blur-[120px]" />

        <div className="relative z-10 container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/skills">Skills</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>{category.name}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">{category.name}</span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Best <span className="text-gradient">{category.name}</span> Skills
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2">
              {category.description}
            </p>
            <p className="text-sm text-muted-foreground">
              {allSkills.length} skills available · Browse, compare, and install with one command.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-2xl mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder={`Search ${category.name} skills...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-13 bg-secondary border-border text-foreground text-base"
              />
            </div>
          </motion.div>
        </div>
      </section>

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
              <Button variant="outline" className="mt-4" onClick={() => setSearch("")}>
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryLanding;
