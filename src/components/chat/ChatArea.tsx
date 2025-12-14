import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import SuggestedQuestions from "./SuggestedQuestions";
import { Message, Conversation } from "@/types/chat";
import legalAiHero from "@/assets/legal-ai-hero.png";

const suggestedQuestions = [
  "Thủ tục thành lập doanh nghiệp như thế nào?",
  "Quy định về hợp đồng lao động?",
  "Thủ tục đăng ký bảo hộ nhãn hiệu?",
  "Quyền và nghĩa vụ của người tiêu dùng?",
];

interface ChatAreaProps {
  conversation: Conversation | null;
  onSendMessage: (message: Message) => void;
}

const ChatArea = ({ conversation, onSendMessage }: ChatAreaProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = conversation?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    onSendMessage(userMessage);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Cảm ơn bạn đã gửi câu hỏi về "${content}". Đây là phản hồi mẫu từ hệ thống Trợ Lý Pháp Lý AI. Trong phiên bản thực tế, tôi sẽ phân tích tài liệu của bạn và cung cấp câu trả lời chính xác dựa trên các quy định pháp luật hiện hành.`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      onSendMessage(aiMessage);
    }, 2000);
  };

  const handleSelectQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-foreground">
          {conversation?.title || "Trò chuyện"}
        </h2>
        <p className="text-sm text-muted-foreground">
          Đặt câu hỏi về tài liệu pháp lý của bạn
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center relative">
            {/* Hero Image as Main Focus */}
            <div className="relative w-full max-w-2xl mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <img 
                src={legalAiHero} 
                alt="Trợ Lý Pháp Lý AI" 
                className="w-full h-auto rounded-2xl shadow-2xl animate-fade-in"
              />
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-3 animate-fade-in">
              AI Ứng dụng trong ngành Luật
            </h3>
            <p className="text-muted-foreground mb-8 max-w-lg text-base animate-fade-in">
              Hãy tải lên tài liệu PDF và đặt câu hỏi. Tôi sẽ giúp bạn phân tích
              và trả lời các thắc mắc pháp lý một cách nhanh chóng và chính xác.
            </p>
            <SuggestedQuestions
              questions={suggestedQuestions}
              onSelect={handleSelectQuestion}
            />
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 px-6 py-4 border-t border-border/50 bg-card/30">
        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

export default ChatArea;
