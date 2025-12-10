export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

export interface Document {
  id: string;
  name: string;
  pages: number;
  dateAdded: string;
  size: string;
  isChecked: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  updatedAt: string;
  messages: Message[];
  documents: Document[];
}
