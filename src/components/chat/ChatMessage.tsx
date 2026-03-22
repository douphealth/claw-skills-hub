import { Fragment, memo, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Msg } from "./types";

interface ChatMessageProps {
  message: Msg;
  onLinkClick: (href: string) => void;
}

const INLINE_TOKEN_REGEX = /(\[\[[^\]|]+\|[^\]]+\]\]|\[[^\]]+\]\([^\)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g;

const renderInline = (text: string, onLinkClick: (href: string) => void): ReactNode[] => {
  const parts = text.split(INLINE_TOKEN_REGEX).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("[[") && part.endsWith("]]")) {
      const raw = part.slice(2, -2);
      const splitIndex = raw.indexOf("|");
      if (splitIndex === -1) return <Fragment key={index}>{part}</Fragment>;

      const label = raw.slice(0, splitIndex).trim();
      const href = raw.slice(splitIndex + 1).trim();

      return (
        <button
          key={index}
          onClick={() => onLinkClick(href)}
          className="text-primary hover:underline font-medium inline"
        >
          {label}
        </button>
      );
    }

    const markdownLinkMatch = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
    if (markdownLinkMatch) {
      const [, label, href] = markdownLinkMatch;
      return (
        <button
          key={index}
          onClick={() => onLinkClick(href)}
          className="text-primary hover:underline font-medium inline"
        >
          {label}
        </button>
      );
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="bg-background/50 px-1 py-0.5 rounded text-xs font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }

    return <Fragment key={index}>{part}</Fragment>;
  });
};

const ChatMessage = memo(({ message, onLinkClick }: ChatMessageProps) => (
  <div className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
    <div className={cn(
      "max-w-[85%] rounded-xl px-3 py-2 text-[13px] leading-relaxed",
      message.role === "user"
        ? "bg-primary text-primary-foreground rounded-br-sm"
        : "bg-secondary/60 text-foreground rounded-bl-sm"
    )}>
      {message.role === "assistant" ? (
        <div className="whitespace-pre-wrap break-words">
          {renderInline(message.content, onLinkClick)}
        </div>
      ) : message.content}
    </div>
  </div>
));

ChatMessage.displayName = "ChatMessage";
export default ChatMessage;
