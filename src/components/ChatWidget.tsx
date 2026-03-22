import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { X, Send, Loader2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Msg, QUICK_ACTIONS } from "./chat/types";
import { streamChat } from "./chat/streamChat";
import ChatMessage from "./chat/ChatMessage";
import EmailCaptureCard from "./chat/EmailCaptureCard";
import TypingIndicator from "./chat/TypingIndicator";

type CaptureReason = "intent" | "engaged" | "manual" | "exit";

const LEAD_INTENT_REGEX = /(recommend|best|compare|which|install|seo|marketing|automation|workflow|tutorial|integrat|strategy|optimi)/i;
const CAPTURE_DISMISS_KEY = "clawskills_capture_dismiss_count";

const safeStorageGet = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeStorageSet = (key: string, value: string): void => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // no-op: storage may be blocked in hardened browser/privacy modes
  }
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [captureReason, setCaptureReason] = useState<CaptureReason>("engaged");
  const [emailCaptured, setEmailCaptured] = useState(
    () => !!safeStorageGet("clawskills_subscriber_email")
  );
  const [msgCount, setMsgCount] = useState(0);
  const [captureDismissCount, setCaptureDismissCount] = useState(
    () => Number(safeStorageGet(CAPTURE_DISMISS_KEY) || "0")
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, showEmailCapture]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const openCapture = useCallback((reason: CaptureReason) => {
    if (emailCaptured || showEmailCapture) return;
    setCaptureReason(reason);
    setShowEmailCapture(true);
  }, [emailCaptured, showEmailCapture]);

  const handleEmailDismiss = useCallback(() => {
    setShowEmailCapture(false);
    setCaptureDismissCount(prev => {
      const next = prev + 1;
      safeStorageSet(CAPTURE_DISMISS_KEY, String(next));
      return next;
    });
  }, []);

  const handleClose = useCallback(() => {
    if (!emailCaptured && messages.length > 0 && !showEmailCapture && captureDismissCount < 2) {
      openCapture("exit");
      return;
    }
    setOpen(false);
  }, [captureDismissCount, emailCaptured, messages.length, openCapture, showEmailCapture]);

  const handleLinkClick = useCallback((href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
      setOpen(false);
    } else {
      window.open(href, "_blank");
    }
  }, [navigate]);

  const send = useCallback(async (text: string) => {
    const cleaned = text.trim();
    if (!cleaned || loading) return;

    const userMsg: Msg = { role: "user", content: cleaned };
    const nextCount = msgCount + 1;

    if (!emailCaptured && !showEmailCapture) {
      if (LEAD_INTENT_REGEX.test(cleaned)) {
        openCapture("intent");
      } else if (nextCount >= 2 && captureDismissCount === 0) {
        openCapture("engaged");
      }
    }

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setMsgCount(nextCount);

    let buffer = "";
    const upsert = (chunk: string) => {
      buffer += chunk;
      const snapshot = buffer;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: snapshot } : m);
        }
        return [...prev, { role: "assistant", content: snapshot }];
      });
    };

    await streamChat({
      messages: [...messages, userMsg],
      onDelta: upsert,
      onDone: () => setLoading(false),
      onError: (e) => { upsert(e); setLoading(false); },
    });
  }, [captureDismissCount, emailCaptured, loading, messages, msgCount, openCapture, showEmailCapture]);

  const handleEmailSubscribed = useCallback((email: string) => {
    setEmailCaptured(true);
    setShowEmailCapture(false);
    safeStorageSet(CAPTURE_DISMISS_KEY, "0");
    setCaptureDismissCount(0);
    setMessages(prev => [...prev, {
      role: "assistant",
      content: "🎉 **You're almost in!** Check your inbox for a confirmation email. Once confirmed, you'll get the best OpenClaw skill delivered weekly.\n\nNow, what else can I help you with?"
    }]);
  }, []);

  return (
    <>
      {/* FAB */}
      {!open && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center group"
          aria-label="Open assistant"
        >
          <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-background animate-pulse" />
        </motion.button>
      )}

      {/* Chat panel */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-5 right-5 z-50 w-[370px] max-w-[calc(100vw-2.5rem)] h-[560px] max-h-[calc(100vh-5rem)] flex flex-col rounded-2xl border border-border bg-card shadow-2xl shadow-black/40 overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-gradient-to-r from-primary/10 to-transparent">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground leading-none">Claw Assistant</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">AI-powered • Always here to help</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-7 h-7 rounded-full hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
              {messages.length === 0 && (
                <div className="space-y-3">
                  <div className="bg-secondary/50 rounded-xl p-3 text-sm text-foreground">
                    <p className="font-medium mb-1">Hey there! 🐾</p>
                    <p className="text-muted-foreground text-[13px]">
                      I'm Claw, your AI guide to 5,700+ OpenClaw skills. Ask me anything or pick a quick action:
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {QUICK_ACTIONS.map(a => (
                      <button
                        key={a.label}
                        onClick={() => send(a.msg)}
                        className="text-left text-xs px-3 py-2 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all"
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <ChatMessage key={i} message={m} onLinkClick={handleLinkClick} />
              ))}

              {loading && messages[messages.length - 1]?.role === "user" && <TypingIndicator />}

              {!showEmailCapture && !emailCaptured && messages.length > 0 && (
                <button
                  onClick={() => openCapture("manual")}
                  className="w-full text-left text-[11px] px-3 py-2 rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 text-foreground transition-colors"
                >
                  📩 Get one curated Skill of the Week in your inbox
                </button>
              )}

              {showEmailCapture && !emailCaptured && (
                <EmailCaptureCard
                  reason={captureReason}
                  onSubscribed={handleEmailSubscribed}
                  onDismiss={handleEmailDismiss}
                />
              )}
            </div>

            {/* Input */}
            <div className="px-3 py-2.5 border-t border-border bg-card">
              <form
                onSubmit={e => { e.preventDefault(); send(input); }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={loading}
                  className="flex-1 bg-secondary/50 border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-30"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
              <p className="text-[10px] text-muted-foreground text-center mt-1.5">Powered by AI • May make mistakes</p>
            </div>
        </motion.div>
      )}
    </>
  );
};

export default ChatWidget;
