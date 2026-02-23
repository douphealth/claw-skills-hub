import { motion } from "framer-motion";
import { Terminal, Wrench, Shield, PenLine, Users } from "lucide-react";

const tutorials = [
  {
    icon: Terminal,
    title: "Install Your First Skill",
    description: "Step-by-step beginner's guide to getting started with OpenClaw skills.",
    difficulty: "Beginner",
  },
  {
    icon: Wrench,
    title: "Build a Custom Skill from Scratch",
    description: "Learn how to create your own markdown-based skill and publish it.",
    difficulty: "Intermediate",
  },
  {
    icon: Shield,
    title: "Skill Security Checklist",
    description: "What to check before installing any third-party skill.",
    difficulty: "All Levels",
  },
  {
    icon: PenLine,
    title: "Take the Wheel for Long-Form Writing",
    description: "Master the autonomous writing skill for blog posts and articles.",
    difficulty: "Intermediate",
  },
  {
    icon: Users,
    title: "Multi-Agent Shared Skills Setup",
    description: "Configure shared vs per-agent skills in multi-agent environments.",
    difficulty: "Advanced",
  },
];

const TutorialsSection = () => {
  return (
    <section id="tutorials" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-15" />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            Tutorials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Learn How to Use OpenClaw
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From installation to building custom skills — we've got you covered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {tutorials.map((tutorial, i) => {
            const Icon = tutorial.icon;
            return (
              <motion.a
                key={tutorial.title}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group glass rounded-xl p-6 card-hover"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/70">
                  {tutorial.difficulty}
                </span>
                <h3 className="text-base font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">
                  {tutorial.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tutorial.description}
                </p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TutorialsSection;
