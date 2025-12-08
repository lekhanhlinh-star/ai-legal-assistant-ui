export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  updatedAt: string;
  messages: Message[];
}
