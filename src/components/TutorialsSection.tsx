import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Terminal, Wrench, Shield, PenLine, Users, ArrowRight } from "lucide-react";
import { tutorials } from "@/data/tutorials";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, React.ElementType> = {
  "how-to-install-first-openclaw-skill": Terminal,
  "build-custom-openclaw-skill": Wrench,
  "openclaw-skill-security-checklist": Shield,
  "openclaw-take-the-wheel-long-form-writing": PenLine,
  "openclaw-multi-agent-shared-skills-setup": Users,
};

const difficultyColor: Record<string, string> = {
  Beginner: "border-green-500/30 text-green-400",
  Intermediate: "border-yellow-500/30 text-yellow-400",
  Advanced: "border-red-500/30 text-red-400",
};

const TutorialsSection = () => {
  return (
    <section id="tutorials" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-15" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Tutorials</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">Learn How to Use OpenClaw</h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            From installation to building custom skills — we've got you covered.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {tutorials.map((tutorial, i) => {
            const Icon = iconMap[tutorial.slug] || Terminal;
            const diffClass = difficultyColor[tutorial.difficulty] || difficultyColor.Beginner;
            return (
              <motion.div
                key={tutorial.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/tutorials/${tutorial.slug}`}
                  className="group glass rounded-xl p-5 sm:p-6 card-hover block h-full"
                >
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <Badge variant="outline" className={`text-[10px] ${diffClass}`}>{tutorial.difficulty}</Badge>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1.5 sm:mb-2 group-hover:text-primary transition-colors leading-snug">{tutorial.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">{tutorial.heroDescription}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Read tutorial <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <Link to="/tutorials" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
            View all tutorials <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TutorialsSection;
