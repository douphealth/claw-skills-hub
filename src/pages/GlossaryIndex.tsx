import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { glossaryEntries } from "@/data/glossary";
import { breadcrumbJsonLd } from "@/utils/jsonLd";

const GlossaryIndex = () => {
  const bJsonLd = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Glossary", url: "/glossary" },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="OpenClaw Glossary — Key Terms & Definitions"
        description="Learn the key terms, concepts, and definitions of the OpenClaw AI agent ecosystem. Your canonical reference for understanding OpenClaw skills, frameworks, and architecture."
        canonical="https://openclaw-skillshub.com/glossary"
        jsonLd={bJsonLd}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-15" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-glow opacity-[0.04] blur-[100px]" />

        <div className="relative z-10 container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Glossary</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Reference</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              OpenClaw Glossary
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              The canonical reference for understanding OpenClaw concepts, terminology, and architecture. 
              Essential reading for developers, teams, and AI researchers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Entries */}
      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-4">
            {glossaryEntries.map((entry, i) => (
              <motion.div
                key={entry.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/glossary/${entry.slug}`} className="group glass rounded-xl p-6 card-hover block">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {entry.term}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">{entry.shortDefinition}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <span>{entry.sections.length} sections</span>
                        <span>{entry.faqs.length} FAQs</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GlossaryIndex;
