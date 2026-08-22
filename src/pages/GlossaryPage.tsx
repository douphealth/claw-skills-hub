import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import SEOHead from "@/components/SEOHead";
import { getGlossaryEntryBySlug, glossaryEntries } from "@/data/glossary";
import { faqJsonLd, breadcrumbJsonLd, definedTermJsonLd } from "@/utils/jsonLd";
import { Button } from "@/components/ui/button";

const GlossaryPage = () => {
  const { glossarySlug } = useParams<{ glossarySlug: string }>();
  const entry = getGlossaryEntryBySlug(glossarySlug || "");

  if (!entry) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-32 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Term Not Found</h1>
          <Link to="/glossary"><Button>Browse Glossary</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const fJsonLd = faqJsonLd(entry.faqs);
  const bJsonLd = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Glossary", url: "/glossary" },
    { name: entry.term, url: `/glossary/${entry.slug}` },
  ]);
  const dtJsonLd = definedTermJsonLd(entry.term, entry.shortDefinition, `/glossary/${entry.slug}`);
  const jsonLdArray = [bJsonLd, dtJsonLd, ...(fJsonLd ? [fJsonLd] : [])];
  const relatedEntries = glossaryEntries.filter((e) => entry.relatedTerms.includes(e.slug));

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={entry.metaTitle}
        description={entry.metaDescription}
        canonical={`https://openclaw-skillshub.com/glossary/${entry.slug}/`}
        jsonLd={jsonLdArray}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-15" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-glow opacity-[0.04] blur-[120px]" />

        <div className="relative z-10 container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/glossary">Glossary</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>{entry.term}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Glossary</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {entry.term}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {entry.shortDefinition}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content sections */}
      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-4xl space-y-12">
          {entry.sections.map((section, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-foreground mb-4">{section.heading}</h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                {section.content.split("\n\n").map((p, j) => (
                  <p key={j} dangerouslySetInnerHTML={{
                    __html: p
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                      .replace(/`(.*?)`/g, '<code class="font-mono text-sm text-primary bg-primary/10 px-1.5 py-0.5 rounded">$1</code>')
                      .replace(/- \*\*(.*?)\*\*/g, '• <strong class="text-foreground">$1</strong>')
                  }} />
                ))}
              </div>
            </motion.div>
          ))}

          {/* FAQ */}
          {entry.faqs.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {entry.faqs.map((faq, i) => (
                  <div key={i} className="glass rounded-xl p-6">
                    <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Related terms */}
          {relatedEntries.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-foreground mb-6">Related Terms</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedEntries.map((re) => (
                  <Link key={re.slug} to={`/glossary/${re.slug}`} className="group glass rounded-xl p-5 card-hover">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">{re.term}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{re.shortDefinition}</p>
                    <span className="inline-flex items-center gap-1 text-xs text-primary mt-3">Read more <ArrowRight className="w-3 h-3" /></span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default GlossaryPage;
