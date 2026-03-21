import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2, ArrowRight } from "lucide-react";
import { SUBSCRIBE_URL, AUTH_HEADER } from "./types";

interface EmailCaptureCardProps {
  onSubscribed: (email: string) => void;
  onDismiss: () => void;
}

const EmailCaptureCard = ({ onSubscribed, onDismiss }: EmailCaptureCardProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || status === "loading") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(SUBSCRIBE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AUTH_HEADER,
        },
        body: JSON.stringify({
          email: trimmed,
          source_page: "chat-assistant",
          utm_source: "chat-widget",
          utm_medium: "conversational",
          utm_campaign: "claw-assistant",
        }),
      });

      if (res.ok) {
        localStorage.setItem("clawskills_subscriber_email", trimmed);
        onSubscribed(trimmed);
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Connection error. Try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-primary/10 via-secondary/50 to-secondary/30 rounded-xl p-3 border border-primary/20"
    >
      <div className="flex items-center gap-2 mb-2">
        <Mail className="w-4 h-4 text-primary" />
        <span className="text-xs font-semibold text-foreground">Get the best skills weekly</span>
      </div>
      <p className="text-[11px] text-muted-foreground mb-2">
        Free "Skill of the Week" newsletter — no spam, ever.
      </p>
      <div className="flex gap-1.5">
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setStatus("idle"); setErrorMsg(""); }}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          placeholder="your@email.com"
          className="flex-1 bg-background/60 border border-border rounded-lg px-2.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="bg-primary text-primary-foreground rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-1"
        >
          {status === "loading" ? <Loader2 className="w-3 h-3 animate-spin" /> : <ArrowRight className="w-3 h-3" />}
        </button>
      </div>
      {errorMsg && <p className="text-[10px] text-destructive mt-1">{errorMsg}</p>}
      <button
        onClick={onDismiss}
        className="text-[10px] text-muted-foreground hover:text-foreground mt-1.5 block"
      >
        Maybe later
      </button>
    </motion.div>
  );
};

export default EmailCaptureCard;
