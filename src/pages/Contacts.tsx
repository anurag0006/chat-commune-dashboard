import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Users, UserPlus, MessageCircle } from "lucide-react";
import { mockConversations } from "@/lib/mock-data";

export default function Contacts() {
  const contacts = mockConversations.map(conv => ({
    id: conv.id,
    name: conv.name,
    phone: `+1 (555) ${Math.random().toString().slice(2, 9)}`,
    lastSeen: conv.timestamp,
    isOnline: conv.isOnline,
    messageCount: conv.messages.length,
    tags: ["Customer", conv.unreadCount > 0 ? "Active" : "Inactive"]
  }));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Contacts</h1>
          <p className="text-muted-foreground">
            Manage your WhatsApp business contacts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <UserPlus className="w-4 h-4 mr-2" />
            Import Contacts
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Contacts</p>
              <p className="text-2xl font-bold">{contacts.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Online Now</p>
              <p className="text-2xl font-bold">
                {contacts.filter(c => c.isOnline).length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Chats</p>
              <p className="text-2xl font-bold">
                {contacts.filter(c => c.tags.includes("Active")).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {contact.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {contact.isOnline && (
                  <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-background absolute -bottom-0.5 -right-0.5" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{contact.name}</h3>
                  <div className="flex gap-1">
                    {contact.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={tag === "Active" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{contact.phone}</p>
                <p className="text-xs text-muted-foreground">
                  {contact.messageCount} messages • Last seen {contact.lastSeen.toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>

        {contacts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">No contacts yet</h3>
            <p className="text-muted-foreground mb-4">
              Import your contacts or add them manually to get started
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Contact
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}