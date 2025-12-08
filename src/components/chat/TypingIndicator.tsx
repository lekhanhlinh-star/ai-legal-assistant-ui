import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex gap-3 animate-fade-in">
      {/* Avatar */}
      <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-accent/10">
        <Bot className="w-5 h-5 text-accent" />
      </div>

      {/* Typing Bubble */}
      <div className="bg-chat-assistant rounded-2xl rounded-tl-md px-4 py-3">
        <div className="typing-indicator flex gap-1">
          <span className="w-2 h-2 rounded-full bg-muted-foreground/60" />
          <span className="w-2 h-2 rounded-full bg-muted-foreground/60" />
          <span className="w-2 h-2 rounded-full bg-muted-foreground/60" />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
