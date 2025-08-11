import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, CheckCheck, MessageCircle } from "lucide-react";
import { Message, Conversation } from "@/lib/types";
import { format } from "date-fns";

interface MessageThreadProps {
  conversation?: Conversation;
  isLoading?: boolean;
}

export function MessageThread({ conversation, isLoading = false }: MessageThreadProps) {
  if (isLoading) {
    return (
      <div className="flex-1 p-4 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-sm bg-muted rounded-lg p-3 animate-pulse">
              <div className="h-4 bg-muted-foreground/20 rounded w-32 mb-2" />
              <div className="h-3 bg-muted-foreground/20 rounded w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4 mx-auto">
            <MessageCircle className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Select a conversation</h3>
          <p className="text-muted-foreground">
            Choose a conversation from the list to start messaging
          </p>
        </div>
      </div>
    );
  }

  const renderMessage = (message: Message) => {
    const isFromMe = message.isFromMe;
    
    return (
      <div
        key={message.id}
        className={`flex ${isFromMe ? 'justify-end' : 'justify-start'} mb-4 fade-in`}
      >
        {!isFromMe && (
          <Avatar className="w-8 h-8 mr-2 mt-auto">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {conversation.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        
        <div className={isFromMe ? 'message-bubble-sent' : 'message-bubble-received'}>
          <p className="text-sm leading-relaxed mb-1">{message.text}</p>
          <div className="flex items-center gap-1 justify-end">
            <span className="text-xs opacity-70">
              {format(message.timestamp, 'HH:mm')}
            </span>
            {isFromMe && (
              <div className="opacity-70">
                {message.status === 'read' ? (
                  <CheckCheck className="w-3 h-3 text-blue-500" />
                ) : message.status === 'delivered' ? (
                  <CheckCheck className="w-3 h-3" />
                ) : (
                  <Check className="w-3 h-3" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="border-b p-4 bg-card">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {conversation.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {conversation.isOnline && (
              <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-background absolute -bottom-0.5 -right-0.5" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-sm">{conversation.name}</h3>
            <p className="text-xs text-muted-foreground">
              {conversation.isOnline ? 'Online' : 'Last seen recently'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-1">
          {conversation.messages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No messages yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Start the conversation below
              </p>
            </div>
          ) : (
            conversation.messages.map(renderMessage)
          )}
        </div>
      </ScrollArea>
    </div>
  );
}