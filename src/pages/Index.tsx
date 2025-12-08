import { useState } from "react";
import AppSidebar from "@/components/sidebar/AppSidebar";
import ChatArea from "@/components/chat/ChatArea";
import DocumentList from "@/components/documents/DocumentList";
import SettingsPanel from "@/components/settings/SettingsPanel";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chat");

  const renderContent = () => {
    switch (activeTab) {
      case "chat":
        return <ChatArea />;
      case "documents":
        return <DocumentList />;
      case "settings":
        return <SettingsPanel />;
      default:
        return <ChatArea />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar */}
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Content Panel */}
        <div className="flex-1 overflow-hidden">
          {renderContent()}
        </div>

        {/* Document Panel (visible when chat is active) */}
        {activeTab === "chat" && (
          <div className="hidden lg:block w-80 xl:w-96 border-l border-border/50 overflow-hidden">
            <DocumentList />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
