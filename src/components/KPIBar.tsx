import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, MessageCircle, Users } from "lucide-react";
import { KPI } from "@/lib/types";

interface KPIBarProps {
  kpis: KPI;
}

export function KPIBar({ kpis }: KPIBarProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Send className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Sent Today</p>
            <p className="text-2xl font-bold">{kpis.sentToday}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Received Today</p>
            <p className="text-2xl font-bold">{kpis.receivedToday}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Open Conversations</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{kpis.openConversations}</p>
              <Badge variant="secondary" className="text-xs">
                Active
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}