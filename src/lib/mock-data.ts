import { Conversation, QuickReply, KPI, Message } from './types';

export const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hi! How can I help you today?',
    timestamp: new Date('2024-01-10T09:00:00'),
    isFromMe: true,
    status: 'read'
  },
  {
    id: '2',
    text: 'I need help with my order',
    timestamp: new Date('2024-01-10T09:05:00'),
    isFromMe: false
  },
  {
    id: '3',
    text: 'Sure! Can you please provide your order number?',
    timestamp: new Date('2024-01-10T09:06:00'),
    isFromMe: true,
    status: 'delivered'
  }
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    lastMessage: 'I need help with my order',
    timestamp: new Date('2024-01-10T09:05:00'),
    unreadCount: 2,
    isOnline: true,
    messages: mockMessages
  },
  {
    id: '2',
    name: 'Mike Chen',
    lastMessage: 'Thank you for your help!',
    timestamp: new Date('2024-01-10T08:30:00'),
    unreadCount: 0,
    isOnline: false,
    messages: []
  },
  {
    id: '3',
    name: 'Emma Davis',
    lastMessage: 'When will my package arrive?',
    timestamp: new Date('2024-01-10T07:45:00'),
    unreadCount: 1,
    isOnline: true,
    messages: []
  },
  {
    id: '4',
    name: 'John Smith',
    lastMessage: 'Perfect, exactly what I needed',
    timestamp: new Date('2024-01-09T16:20:00'),
    unreadCount: 0,
    isOnline: false,
    messages: []
  }
];

export const mockQuickReplies: QuickReply[] = [
  {
    id: '1',
    title: 'Welcome Message',
    shortcut: '/welcome',
    body: 'Hi! Thank you for contacting us. How can I help you today?'
  },
  {
    id: '2',
    title: 'Order Status',
    shortcut: '/status',
    body: 'To check your order status, please provide your order number and I\'ll look it up for you.'
  },
  {
    id: '3',
    title: 'Business Hours',
    shortcut: '/hours',
    body: 'Our business hours are Monday-Friday 9AM-6PM EST. We\'ll respond to your message as soon as possible!'
  },
  {
    id: '4',
    title: 'Thank You',
    shortcut: '/thanks',
    body: 'Thank you for choosing our service! Is there anything else I can help you with?'
  }
];

export const mockKPIs: KPI = {
  sentToday: 127,
  receivedToday: 89,
  openConversations: 15
};

export const incomingMessages = [
  "Hi, I have a question about my order",
  "Is anyone there?",
  "Can you help me with a refund?",
  "I love your product!",
  "When will you restock this item?",
  "Do you offer international shipping?",
  "This is exactly what I was looking for",
  "Your customer service is amazing!",
  "I'm having trouble with checkout",
  "Can I change my delivery address?"
];