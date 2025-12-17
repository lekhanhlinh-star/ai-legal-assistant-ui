import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import SuggestedQuestions from "./SuggestedQuestions";
import { Message, Conversation } from "@/types/chat";
import legalAiHero from "@/assets/legal-ai-hero.png";
import chatBackground from "@/assets/chat-background.jpg";
import logoVks from "@/assets/logo-vks.webp";
import { Sparkles } from "lucide-react";

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
      className="flex flex-col h-full relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${chatBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-blue-900/85" />
      
      {/* Animated glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-subtle" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }} />

      {/* Logo Viện Kiểm Sát góc phải trên */}
      <div className="absolute top-4 right-6 z-30">
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
          <img src={logoVks} alt="Logo Viện Kiểm Sát" className="h-8 w-8 object-contain" />
          <span className="text-sm font-semibold text-white">Viện Kiểm Sát</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8 relative z-10">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-5 gap-8 items-center">
              
              {/* Hero Image - Chiếm 3 cột */}
              <div className="lg:col-span-3 flex flex-col items-center">
                <div className="relative w-full max-w-lg mx-auto group">
                  {/* Glow effect behind image */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-cyan-500/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    <img 
                      src={legalAiHero} 
                      alt="Trợ Lý Pháp Lý AI" 
                      className="w-full h-auto rounded-2xl shadow-2xl shadow-cyan-500/20 ring-1 ring-white/10 animate-fade-in"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-medium text-cyan-300">AI-Powered Legal Assistant</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3 animate-fade-in">
                    AI Ứng dụng trong ngành Luật
                  </h3>
                  <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed animate-fade-in">
                    Tải lên tài liệu PDF và đặt câu hỏi. Chúng tôi sẽ giúp bạn phân tích và giải đáp các vấn đề pháp lý một cách nhanh chóng và chính xác.
                  </p>
                </div>
              </div>

              {/* Kết quả / Gợi ý - Chiếm 2 cột */}
              <div className="lg:col-span-2">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 shadow-xl shadow-black/20">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <h4 className="text-sm font-semibold text-white">Kết quả gợi ý</h4>
                  </div>
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

      {/* Input Area */}
      <div className="flex-shrink-0 px-6 py-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-2 shadow-xl shadow-black/20">
            {/* Avatar */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden ring-2 ring-cyan-400/30 shadow-lg shadow-cyan-500/20">
              <img 
                src={legalAiHero} 
                alt="Avatar VK" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            
            {/* Input */}
            <div className="flex-1">
              <ChatInput onSend={handleSendMessage} disabled={isTyping} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;