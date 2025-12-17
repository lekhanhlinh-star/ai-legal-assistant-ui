import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
      >
        <Paperclip className="w-5 h-5" />
      </Button>

      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nhập câu hỏi pháp lý của bạn..."
        className="flex-1 min-h-[44px] max-h-32 resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-slate-400"
        disabled={disabled}
      />

      <Button
        type="submit"
        disabled={!message.trim() || disabled}
        className="h-10 w-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white disabled:opacity-50 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
      >
        <Send className="w-5 h-5" />
      </Button>
    </form>
  );
};

export default ChatInput;