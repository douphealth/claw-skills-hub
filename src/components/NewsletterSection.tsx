import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Zap, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            email,
            source_page: window.location.pathname,
            utm_source: new URLSearchParams(window.location.search).get("utm_source"),
            utm_medium: new URLSearchParams(window.location.search).get("utm_medium"),
            utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign"),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      localStorage.setItem("clawskills_subscriber_email", email);
      toast.success(data.message || "Check your inbox!");
    } catch (err) {
      setStatus("idle");
      toast.error(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  };

  return (
    <section id="newsletter" className="relative py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass rounded-3xl p-10 md:p-16 text-center overflow-hidden max-w-4xl mx-auto"
        >
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-glow opacity-[0.06] blur-[100px]" />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              {status === "success" ? (
                <CheckCircle className="w-7 h-7 text-green-500" />
              ) : (
                <Zap className="w-7 h-7 text-primary" />
              )}
            </div>

            {status === "success" ? (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  You're almost in! 🎉
                </h2>
                <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                  Check your inbox and click the confirmation link. Once confirmed, you'll get a welcome email plus our best skills delivered weekly.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Skill of the Week
                </h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
                  Get the best new OpenClaw skill delivered to your inbox every week — with install instructions, use cases, and security notes.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={status === "loading"}
                      className="pl-10 bg-secondary border-border h-11 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-11 px-6"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground mt-4">
                  Free forever. Unsubscribe anytime. No spam.
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
