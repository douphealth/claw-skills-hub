import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tutorials } from "@/data/tutorials";

const difficultyColor: Record<string, string> = {
  Beginner: "bg-green-400/10 text-green-400 border-green-400/20",
  Intermediate: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  Advanced: "bg-red-400/10 text-red-400 border-red-400/20",
  "All Levels": "bg-primary/10 text-primary border-primary/20",
};

const TutorialsIndex = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-15" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-glow opacity-[0.04] blur-[120px]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Tutorials</span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Learn <span className="text-gradient">OpenClaw</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              From installation to building custom skills — step-by-step guides for every level.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-6">
            {tutorials.map((tutorial, i) => (
              <motion.div
                key={tutorial.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/tutorials/${tutorial.slug}`}
                  className="group glass rounded-2xl p-8 card-hover flex flex-col sm:flex-row gap-6 items-start"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={`text-[10px] ${difficultyColor[tutorial.difficulty]}`}>{tutorial.difficulty}</Badge>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                      {tutorial.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-sm line-clamp-2">
                      {tutorial.heroDescription}
                    </p>
                    <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{tutorial.readTime}</span>
                      <span>{tutorial.sections.length} sections</span>
                    </div>
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

export default TutorialsIndex;
