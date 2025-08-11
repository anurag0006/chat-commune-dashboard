import { useState } from "react";
import { QuickRepliesTable } from "@/components/QuickRepliesTable";
import { mockQuickReplies } from "@/lib/mock-data";
import { QuickReply } from "@/lib/types";

export default function QuickReplies() {
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>(mockQuickReplies);

  const handleAdd = (quickReplyData: Omit<QuickReply, 'id'>) => {
    const newQuickReply: QuickReply = {
      ...quickReplyData,
      id: Date.now().toString(),
    };
    setQuickReplies(prev => [...prev, newQuickReply]);
  };

  const handleEdit = (id: string, quickReplyData: Omit<QuickReply, 'id'>) => {
    setQuickReplies(prev => prev.map(qr => 
      qr.id === id ? { ...quickReplyData, id } : qr
    ));
  };

  const handleDelete = (id: string) => {
    setQuickReplies(prev => prev.filter(qr => qr.id !== id));
  };

  return (
    <div className="p-6">
      <QuickRepliesTable
        quickReplies={quickReplies}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}