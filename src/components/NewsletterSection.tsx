import { motion } from "framer-motion";
import { Mail, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSection = () => {
  return (
    <section id="newsletter" className="relative py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass rounded-3xl p-10 md:p-16 text-center overflow-hidden max-w-4xl mx-auto"
        >
          {/* Glow effects */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-glow opacity-[0.06] blur-[100px]" />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Zap className="w-7 h-7 text-primary" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Skill of the Week
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
              Get the best new OpenClaw skill delivered to your inbox every week — with install instructions, use cases, and security notes.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10 bg-secondary border-border h-11 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-11 px-6"
              >
                Subscribe
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-4">
              Free forever. Unsubscribe anytime. No spam.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
