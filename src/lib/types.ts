export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isFromMe: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

export interface QuickReply {
  id: string;
  title: string;
  shortcut: string;
  body: string;
}

export interface KPI {
  sentToday: number;
  receivedToday: number;
  openConversations: number;
}