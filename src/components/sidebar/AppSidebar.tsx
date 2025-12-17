import { useState } from "react";
import {
  MessageSquare,
  FileText,
  Settings,
  Plus,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Conversation } from "@/types/chat";
import ConversationHistory from "./ConversationHistory";
import logoVks from "@/assets/logo-vks.webp";

interface SidebarItem {
  id: string;
  icon: React.ElementType;
  label: string;
}

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onNewConversation: () => void;
}

const AppSidebar = ({
  activeTab,
  onTabChange,
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  onNewConversation,
}: AppSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems: SidebarItem[] = [
    { id: "chat", icon: MessageSquare, label: "Trò chuyện" },
    { id: "documents", icon: FileText, label: "Tài liệu" },
    { id: "settings", icon: Settings, label: "Tuỳ chỉnh" },
  ];

  const handleLogout = () => {
    navigate("/auth");
  };

  const handleNewConversation = () => {
    onNewConversation();
    onTabChange("chat");
  };

  const handleSelectConversation = (id: string) => {
    onSelectConversation(id);
    onTabChange("chat");
  };

  return (
    <aside
      className={cn(
        "h-full bg-slate-900 border-r border-slate-700/50 flex flex-col transition-all duration-300",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "flex items-center gap-3 transition-opacity",
              isCollapsed && "opacity-0"
            )}
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center p-1">
              <img src={logoVks} alt="Logo VKS" className="w-full h-full object-contain" />
            </div>
            <div className="overflow-hidden">
              <h1 className="font-bold text-white text-sm whitespace-nowrap">
                Trợ Lý Pháp Lý AI
              </h1>
              <p className="text-xs text-slate-400">Phiên bản 1.0</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex-shrink-0"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4">
        <div
          className={cn(
            "flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 transition-all",
            isCollapsed && "justify-center p-2"
          )}
        >
          <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-cyan-500/30">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
            <AvatarFallback className="bg-cyan-600 text-white">
              NV
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="font-medium text-white text-sm truncate">
                Nguyễn Văn A
              </p>
              <p className="text-xs text-slate-400 truncate">
                admin@example.com
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 space-y-2">
        <Button
          onClick={handleNewConversation}
          className={cn(
            "w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl gap-2 justify-start transition-all shadow-lg shadow-cyan-500/20",
            isCollapsed && "justify-center px-0"
          )}
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span>Cuộc trò chuyện mới</span>}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-3">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full justify-start gap-3 rounded-xl transition-all h-11",
                isCollapsed && "justify-center px-0",
                activeTab === item.id
                  ? "bg-cyan-500/10 text-cyan-400 font-medium border border-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </div>
      </nav>

      {/* Conversation History */}
      <div className="flex-1 overflow-hidden px-4 pb-4">
        {!isCollapsed && (
          <p className="text-xs text-slate-500 mb-2 px-1">Lịch sử trò chuyện</p>
        )}
        <ScrollArea className="h-full">
          <ConversationHistory
            conversations={conversations}
            activeId={activeConversationId}
            isCollapsed={isCollapsed}
            onSelect={handleSelectConversation}
            onDelete={onDeleteConversation}
          />
        </ScrollArea>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 p-4 border-t border-slate-700/50">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full justify-start gap-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 h-11 transition-all",
            isCollapsed && "justify-center px-0"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Đăng xuất</span>}
        </Button>
      </div>
    </aside>
  );
};

export default AppSidebar;