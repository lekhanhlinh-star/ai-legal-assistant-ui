import { MessageSquare, Trash2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Conversation } from "@/types/chat";

interface ConversationHistoryProps {
  conversations: Conversation[];
  activeId: string | null;
  isCollapsed: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const ConversationHistory = ({
  conversations,
  activeId,
  isCollapsed,
  onSelect,
  onDelete,
}: ConversationHistoryProps) => {
  if (isCollapsed) {
    return (
      <div className="space-y-1">
        {conversations.slice(0, 5).map((conv) => (
          <Button
            key={conv.id}
            variant="ghost"
            size="icon"
            onClick={() => onSelect(conv.id)}
            className={cn(
              "w-full h-10 rounded-xl",
              activeId === conv.id
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            )}
          >
            <MessageSquare className="w-5 h-5" />
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {conversations.length === 0 ? (
        <p className="text-xs text-slate-500 px-3 py-2">
          Chưa có cuộc trò chuyện nào
        </p>
      ) : (
        conversations.map((conv) => (
          <div
            key={conv.id}
            className={cn(
              "group relative flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all",
              activeId === conv.id
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            )}
            onClick={() => onSelect(conv.id)}
          >
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{conv.title}</p>
              <p className="text-xs text-slate-500 truncate">
                {conv.lastMessage}
              </p>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 hover:bg-slate-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 bg-slate-800 border-slate-700">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(conv.id);
                  }}
                  className="text-red-400 focus:text-red-400 focus:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Xoá
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))
      )}
    </div>
  );
};

export default ConversationHistory;