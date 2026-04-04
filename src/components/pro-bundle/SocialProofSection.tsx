import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Staff Engineer, Stripe",
    text: "The Pro Bundle saved our team 3 days of setup. Every skill was pre-configured and just worked. The enterprise configs for our CI pipeline were worth the price alone.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Founder, ShipFast.io",
    text: "I was manually installing skills one by one like a caveman. The bundle's skill chains are incredible — research to draft to publish in one command. Game changer.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "DevOps Lead, Vercel",
    text: "The private security advisories alone justify the price. We got a heads-up on a vulnerability 2 days before it was public. That's enterprise-grade protection for $8.",
    rating: 5,
  },
];

const stats = [
  { value: "2,400+", label: "Bundles Sold" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "< 60s", label: "Avg Setup Time" },
  { value: "40+ hrs", label: "Time Saved" },
];

const SocialProofSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-xl border bg-card"
            >
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <h2 className="text-3xl font-bold text-center mb-10">
          Trusted by <span className="text-primary">Engineers at Top Companies</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border bg-card relative"
            >
              <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4 italic">"{t.text}"</p>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
