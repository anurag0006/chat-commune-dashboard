import { useState, useEffect } from "react";
import { ConversationList } from "@/components/ConversationList";
import { MessageThread } from "@/components/MessageThread";
import { MessageComposer } from "@/components/MessageComposer";
import { KPIBar } from "@/components/KPIBar";
import { mockConversations, mockQuickReplies, mockKPIs, incomingMessages } from "@/lib/mock-data";
import { Conversation, Message } from "@/lib/types";

export default function Inbox() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  // Simulate incoming messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (conversations.length === 0) return;

      const randomConversation = conversations[Math.floor(Math.random() * conversations.length)];
      const randomMessage = incomingMessages[Math.floor(Math.random() * incomingMessages.length)];
      
      const newMessage: Message = {
        id: Date.now().toString(),
        text: randomMessage,
        timestamp: new Date(),
        isFromMe: false,
      };

      setConversations(prev => prev.map(conv => {
        if (conv.id === randomConversation.id) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: randomMessage,
            timestamp: new Date(),
            unreadCount: conv.unreadCount + 1,
          };
        }
        return conv;
      }));

      // Update selected conversation if it's the one that received the message
      if (selectedConversation?.id === randomConversation.id) {
        setSelectedConversation(prev => prev ? {
          ...prev,
          messages: [...prev.messages, newMessage],
          lastMessage: randomMessage,
          timestamp: new Date(),
        } : prev);
      }
    }, Math.random() * 20000 + 15000); // 15-35 seconds

    return () => clearInterval(interval);
  }, [conversations, selectedConversation]);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    // Mark as read
    setConversations(prev => prev.map(conv => 
      conv.id === conversation.id 
        ? { ...conv, unreadCount: 0 }
        : conv
    ));
  };

  const handleSendMessage = (text: string) => {
    if (!selectedConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      isFromMe: true,
      status: 'sent',
    };

    // Update conversations
    setConversations(prev => prev.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: text,
          timestamp: new Date(),
        };
      }
      return conv;
    }));

    // Update selected conversation
    setSelectedConversation(prev => prev ? {
      ...prev,
      messages: [...prev.messages, newMessage],
      lastMessage: text,
      timestamp: new Date(),
    } : prev);

    // Simulate message status updates
    setTimeout(() => {
      const updatedMessage = { ...newMessage, status: 'delivered' as const };
      setConversations(prev => prev.map(conv => {
        if (conv.id === selectedConversation.id) {
          return {
            ...conv,
            messages: conv.messages.map(msg => 
              msg.id === newMessage.id ? updatedMessage : msg
            ),
          };
        }
        return conv;
      }));
      
      if (selectedConversation) {
        setSelectedConversation(prev => prev ? {
          ...prev,
          messages: prev.messages.map(msg => 
            msg.id === newMessage.id ? updatedMessage : msg
          ),
        } : prev);
      }
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold mb-6">Inbox</h1>
        <KPIBar kpis={mockKPIs} />
      </div>
      
      <div className="flex-1 flex min-h-0">
        {/* Conversation List */}
        <div className="w-80 border-r flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-sm text-muted-foreground">
              Conversations ({conversations.length})
            </h2>
          </div>
          <ConversationList
            conversations={conversations}
            selectedConversationId={selectedConversation?.id}
            onSelectConversation={handleSelectConversation}
            isLoading={isLoading}
          />
        </div>

        {/* Message Thread & Composer */}
        <div className="flex-1 flex flex-col">
          <MessageThread 
            conversation={selectedConversation}
            isLoading={isLoading}
          />
          {selectedConversation && (
            <MessageComposer
              onSendMessage={handleSendMessage}
              quickReplies={mockQuickReplies}
              disabled={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}