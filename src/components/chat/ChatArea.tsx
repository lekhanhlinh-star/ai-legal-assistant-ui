import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import SuggestedQuestions from "./SuggestedQuestions";
import { Message, Conversation } from "@/types/chat";
import legalAiHero from "@/assets/legal-ai-hero.png";
import chatBackground from "@/assets/chat-background.jpg";
import { Scale } from "lucide-react";

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
    <div 
      className="flex flex-col h-full relative"
      style={{ 
        backgroundImage: `url(${chatBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay để làm mờ nhẹ nền */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px]" />
      {/* Logo góc phải trên */}
      <div className="absolute top-4 right-6 z-30">
        <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/30 shadow-lg">
          <Scale className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold text-primary">Viện Kiểm Sát</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 relative z-10">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center relative">
            <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-8">
              {/* Hero Image - Trung tâm */}
              <div className="flex-1 flex flex-col items-center">
                <div className="relative w-full max-w-xl mx-auto">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-2xl" />
                  <img 
                    src={legalAiHero} 
                    alt="Trợ Lý Pháp Lý AI" 
                    className="relative w-full h-auto rounded-2xl shadow-2xl ring-1 ring-primary/20 animate-fade-in"
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mt-6 mb-2 text-center animate-fade-in">
                  AI Ứng dụng trong ngành Luật
                </h3>
                <p className="text-muted-foreground text-center max-w-md text-sm animate-fade-in">
                  Hãy tải lên tài liệu PDF và đặt câu hỏi về các vấn đề pháp lý
                </p>
              </div>

              {/* Kết quả / Gợi ý - Bên phải */}
              <div className="w-full lg:w-80 flex-shrink-0">
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 p-4 shadow-lg">
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Kết quả gợi ý
                  </h4>
                  <SuggestedQuestions
                    questions={suggestedQuestions}
                    onSelect={handleSelectQuestion}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
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

      {/* Input Area - Dưới cùng với avatar */}
      <div className="flex-shrink-0 px-6 py-4 border-t border-border/50 bg-card/50 backdrop-blur-sm relative z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          {/* Avatar đại diện VK */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/30 shadow-md">
            <img 
              src={legalAiHero} 
              alt="Avatar VK" 
              className="w-full h-full object-cover object-top"
            />
          </div>
          
          {/* Ô tìm kiếm */}
          <div className="flex-1">
            <ChatInput onSend={handleSendMessage} disabled={isTyping} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
