import { useState, useCallback } from "react";
import { Conversation, Message } from "@/types/chat";

const initialConversations: Conversation[] = [
  {
    id: "1",
    title: "Thủ tục thành lập công ty",
    lastMessage: "Cảm ơn bạn đã giải đáp",
    updatedAt: "14:30",
    messages: [
      {
        id: "1-1",
        content: "Thủ tục thành lập doanh nghiệp như thế nào?",
        isUser: true,
        timestamp: "14:25",
      },
      {
        id: "1-2",
        content:
          "Để thành lập doanh nghiệp tại Việt Nam, bạn cần thực hiện các bước sau:\n\n1. Chuẩn bị hồ sơ đăng ký\n2. Nộp hồ sơ tại Sở KH&ĐT\n3. Nhận Giấy chứng nhận ĐKKD\n4. Khắc dấu và công bố mẫu dấu\n5. Đăng ký thuế và mở tài khoản ngân hàng",
        isUser: false,
        timestamp: "14:26",
      },
      {
        id: "1-3",
        content: "Cảm ơn bạn đã giải đáp",
        isUser: true,
        timestamp: "14:30",
      },
    ],
  },
  {
    id: "2",
    title: "Hợp đồng lao động",
    lastMessage: "Thời gian thử việc tối đa bao lâu?",
    updatedAt: "Hôm qua",
    messages: [
      {
        id: "2-1",
        content: "Quy định về hợp đồng lao động như thế nào?",
        isUser: true,
        timestamp: "10:15",
      },
      {
        id: "2-2",
        content:
          "Theo Bộ luật Lao động 2019, hợp đồng lao động có các loại:\n\n1. Hợp đồng không xác định thời hạn\n2. Hợp đồng xác định thời hạn (12-36 tháng)\n\nHợp đồng phải được lập bằng văn bản và có đầy đủ các điều khoản theo quy định.",
        isUser: false,
        timestamp: "10:16",
      },
      {
        id: "2-3",
        content: "Thời gian thử việc tối đa bao lâu?",
        isUser: true,
        timestamp: "10:20",
      },
    ],
  },
  {
    id: "3",
    title: "Đăng ký nhãn hiệu",
    lastMessage: "Chi phí đăng ký khoảng bao nhiêu?",
    updatedAt: "03/01",
    messages: [
      {
        id: "3-1",
        content: "Thủ tục đăng ký bảo hộ nhãn hiệu?",
        isUser: true,
        timestamp: "09:00",
      },
      {
        id: "3-2",
        content:
          "Để đăng ký bảo hộ nhãn hiệu, bạn cần:\n\n1. Tra cứu nhãn hiệu đã đăng ký\n2. Chuẩn bị đơn đăng ký\n3. Nộp đơn tại Cục SHTT\n4. Thẩm định hình thức và nội dung\n5. Cấp Văn bằng bảo hộ\n\nThời gian xử lý: 12-18 tháng",
        isUser: false,
        timestamp: "09:02",
      },
      {
        id: "3-3",
        content: "Chi phí đăng ký khoảng bao nhiêu?",
        isUser: true,
        timestamp: "09:05",
      },
    ],
  },
];

export const useConversations = () => {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const createNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: "Cuộc trò chuyện mới",
      lastMessage: "",
      updatedAt: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      messages: [],
    };
    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    return newConversation.id;
  }, []);

  const selectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeConversationId === id) {
        setActiveConversationId(null);
      }
    },
    [activeConversationId]
  );

  const addMessage = useCallback(
    (message: Message) => {
      if (!activeConversationId) {
        // Create new conversation if none active
        const newId = createNewConversation();
        setConversations((prev) =>
          prev.map((c) =>
            c.id === newId
              ? {
                  ...c,
                  title:
                    message.content.slice(0, 30) +
                    (message.content.length > 30 ? "..." : ""),
                  lastMessage: message.content,
                  updatedAt: message.timestamp,
                  messages: [...c.messages, message],
                }
              : c
          )
        );
      } else {
        setConversations((prev) =>
          prev.map((c) =>
            c.id === activeConversationId
              ? {
                  ...c,
                  title:
                    c.messages.length === 0
                      ? message.content.slice(0, 30) +
                        (message.content.length > 30 ? "..." : "")
                      : c.title,
                  lastMessage: message.content,
                  updatedAt: message.timestamp,
                  messages: [...c.messages, message],
                }
              : c
          )
        );
      }
    },
    [activeConversationId, createNewConversation]
  );

  const clearActiveConversation = useCallback(() => {
    setActiveConversationId(null);
  }, []);

  return {
    conversations,
    activeConversation,
    activeConversationId,
    createNewConversation,
    selectConversation,
    deleteConversation,
    addMessage,
    clearActiveConversation,
  };
};
