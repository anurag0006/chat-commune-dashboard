import { Card } from "@/components/ui/card";
import { KPIBar } from "@/components/KPIBar";
import { Badge } from "@/components/ui/badge";
import { mockKPIs, mockConversations } from "@/lib/mock-data";
import { TrendingUp, Clock, Users, MessageSquare } from "lucide-react";

export default function Dashboard() {
  const totalMessages = mockConversations.reduce((sum, conv) => sum + conv.messages.length, 0);
  const activeConversations = mockConversations.filter(conv => conv.unreadCount > 0).length;
  const responseTime = "2.3 min";

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your WhatsApp business communications
        </p>
      </div>

      <KPIBar kpis={mockKPIs} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Growth Rate</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold">+23%</p>
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                  ↑ 12%
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
              <p className="text-xl font-bold">{responseTime}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Chats</p>
              <p className="text-xl font-bold">{activeConversations}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
              <p className="text-xl font-bold">{totalMessages}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {mockConversations.slice(0, 5).map((conv) => (
              <div key={conv.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-primary">
                    {conv.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{conv.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unreadCount > 0 && (
                  <Badge variant="default" className="text-xs">
                    {conv.unreadCount}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">Messages Today</span>
              <span className="font-bold">{mockKPIs.sentToday + mockKPIs.receivedToday}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">Active Contacts</span>
              <span className="font-bold">{mockConversations.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">Quick Replies Used</span>
              <span className="font-bold">47</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">Satisfaction Rate</span>
              <span className="font-bold text-green-600">94%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}