import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Send, Users, Calendar } from "lucide-react";

export default function Broadcasts() {
  const broadcasts = [
    {
      id: "1",
      title: "Weekend Sale Announcement",
      message: "🎉 Weekend Sale! Get 30% off on all items. Use code WEEKEND30. Valid until Sunday!",
      recipients: 156,
      scheduled: new Date("2024-01-15T10:00:00"),
      status: "scheduled"
    },
    {
      id: "2", 
      title: "Product Launch",
      message: "Introducing our latest product! Check it out on our website and be among the first to try it.",
      recipients: 203,
      scheduled: new Date("2024-01-10T09:00:00"),
      status: "sent"
    },
    {
      id: "3",
      title: "Customer Survey",
      message: "Help us improve! Please take 2 minutes to fill out our customer satisfaction survey.",
      recipients: 89,
      scheduled: new Date("2024-01-08T14:00:00"),
      status: "sent"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="secondary">Scheduled</Badge>;
      case "sent":
        return <Badge variant="default">Sent</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Broadcasts</h1>
          <p className="text-muted-foreground">
            Send messages to multiple contacts at once
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Broadcast
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Send className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Broadcasts</p>
              <p className="text-2xl font-bold">{broadcasts.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Recipients</p>
              <p className="text-2xl font-bold">
                {broadcasts.reduce((sum, b) => sum + b.recipients, 0)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Scheduled</p>
              <p className="text-2xl font-bold">
                {broadcasts.filter(b => b.status === "scheduled").length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Broadcasts</h2>
        {broadcasts.map((broadcast) => (
          <Card key={broadcast.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold">{broadcast.title}</h3>
                  {getStatusBadge(broadcast.status)}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {broadcast.message}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {broadcast.recipients} recipients
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {broadcast.scheduled.toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  View Report
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {broadcasts.length === 0 && (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold mb-2">No broadcasts yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first broadcast to send messages to multiple contacts
          </p>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Broadcast
          </Button>
        </Card>
      )}
    </div>
  );
}