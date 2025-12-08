import { useState } from "react";
import {
  MessageSquare,
  FileText,
  Settings,
  Plus,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface SidebarItem {
  id: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AppSidebar = ({ activeTab, onTabChange }: AppSidebarProps) => {
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

  return (
    <aside
      className={cn(
        "h-full bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "flex items-center gap-3 transition-opacity",
              isCollapsed && "opacity-0"
            )}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <div className="overflow-hidden">
              <h1 className="font-bold text-sidebar-foreground text-sm whitespace-nowrap">
                Trợ Lý Pháp Lý AI
              </h1>
              <p className="text-xs text-muted-foreground">Phiên bản 1.0</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent flex-shrink-0"
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
            "flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent/50 transition-all",
            isCollapsed && "justify-center p-2"
          )}
        >
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              NV
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="font-medium text-sidebar-foreground text-sm truncate">
                Nguyễn Văn A
              </p>
              <p className="text-xs text-muted-foreground truncate">
                admin@example.com
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 space-y-2">
        <Button
          className={cn(
            "w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl gap-2 justify-start transition-all",
            isCollapsed && "justify-center px-0"
          )}
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span>Cuộc trò chuyện mới</span>}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
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
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="flex-shrink-0 p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full justify-start gap-3 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-11 transition-all",
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
