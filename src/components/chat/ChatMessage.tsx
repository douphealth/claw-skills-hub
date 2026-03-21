import { memo } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import type { Msg } from "./types";

interface ChatMessageProps {
  message: Msg;
  onLinkClick: (href: string) => void;
}

const ChatMessage = memo(({ message, onLinkClick }: ChatMessageProps) => (
  <div className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
    <div className={cn(
      "max-w-[85%] rounded-xl px-3 py-2 text-[13px] leading-relaxed",
      message.role === "user"
        ? "bg-primary text-primary-foreground rounded-br-sm"
        : "bg-secondary/60 text-foreground rounded-bl-sm"
    )}>
      {message.role === "assistant" ? (
        <ReactMarkdown
          components={{
            a: ({ href, children }) => (
              <button
                onClick={() => href && onLinkClick(href)}
                className="text-primary hover:underline font-medium inline"
              >
                {children}
              </button>
            ),
            p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
            strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
            ul: ({ children }) => <ul className="list-disc pl-4 mb-1.5 space-y-0.5">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-4 mb-1.5 space-y-0.5">{children}</ol>,
            code: ({ children }) => <code className="bg-background/50 px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
          }}
        >
          {message.content}
        </ReactMarkdown>
      ) : message.content}
    </div>
  </div>
));

ChatMessage.displayName = "ChatMessage";
export default ChatMessage;
