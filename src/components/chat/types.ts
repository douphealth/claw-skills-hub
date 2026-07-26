export type Msg = { role: "user" | "assistant"; content: string };

export const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`;
export const SUBSCRIBE_URL = "/api/email/subscribe";
export const AUTH_HEADER = `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`;

export const QUICK_ACTIONS = [
  { label: "🔍 Browse Skills", msg: "Show me the skills directory" },
  { label: "🚀 Get Started", msg: "How do I install a skill?" },
  { label: "📚 Tutorials", msg: "What tutorials do you have?" },
  { label: "🔒 Security", msg: "How does the trust model work?" },
];
