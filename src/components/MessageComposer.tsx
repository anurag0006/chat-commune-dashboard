import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Smile, Command } from "lucide-react";
import { QuickReply } from "@/lib/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MessageComposerProps {
  onSendMessage: (message: string) => void;
  quickReplies: QuickReply[];
  disabled?: boolean;
}

export function MessageComposer({ 
  onSendMessage, 
  quickReplies, 
  disabled = false 
}: MessageComposerProps) {
  const [message, setMessage] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      setShowQuickReplies(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickReply = (quickReply: QuickReply) => {
    setMessage(quickReply.body);
    setShowQuickReplies(false);
    textareaRef.current?.focus();
  };

  // Show quick replies when typing "/"
  useEffect(() => {
    const shouldShow = message.startsWith('/') && message.length > 1;
    setShowQuickReplies(shouldShow);
  }, [message]);

  const filteredQuickReplies = quickReplies.filter(qr => 
    qr.shortcut.toLowerCase().includes(message.toLowerCase()) ||
    qr.title.toLowerCase().includes(message.slice(1).toLowerCase())
  );

  return (
    <div className="border-t bg-card p-4">
      <div className="flex items-end gap-3">
        <Button variant="ghost" size="icon" className="mb-2" disabled={disabled}>
          <Paperclip className="w-4 h-4" />
        </Button>

        <div className="flex-1 relative">
          <Popover open={showQuickReplies} onOpenChange={setShowQuickReplies}>
            <PopoverTrigger asChild>
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message... (use / for quick replies)"
                className="min-h-[40px] max-h-32 resize-none pr-12"
                disabled={disabled}
              />
            </PopoverTrigger>
            {showQuickReplies && filteredQuickReplies.length > 0 && (
              <PopoverContent 
                side="top" 
                className="w-80 p-2" 
                align="start"
                sideOffset={8}
              >
                <ScrollArea className="max-h-60">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground">
                      <Command className="w-3 h-3" />
                      Quick Replies
                    </div>
                    {filteredQuickReplies.map((quickReply) => (
                      <button
                        key={quickReply.id}
                        onClick={() => handleQuickReply(quickReply)}
                        className="w-full text-left p-2 rounded-md hover:bg-muted transition-colors"
                      >
                        <div className="font-medium text-sm">{quickReply.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {quickReply.shortcut}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {quickReply.body}
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </PopoverContent>
            )}
          </Popover>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 bottom-2"
            disabled={disabled}
          >
            <Smile className="w-4 h-4" />
          </Button>
        </div>

        <Button 
          onClick={handleSend} 
          size="icon" 
          disabled={!message.trim() || disabled}
          className="mb-2"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}