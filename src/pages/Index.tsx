import { useState } from "react";
import AppSidebar from "@/components/sidebar/AppSidebar";
import ChatArea from "@/components/chat/ChatArea";
import DocumentList from "@/components/documents/DocumentList";
import SettingsPanel from "@/components/settings/SettingsPanel";
import { useConversations } from "@/hooks/useConversations";
import { Message } from "@/types/chat";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chat");

  const {
    conversations,
    activeConversation,
    activeConversationId,
    createNewConversation,
    selectConversation,
    deleteConversation,
    addMessage,
  } = useConversations();

  const handleSendMessage = (message: Message) => {
    addMessage(message);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "chat":
        return (
          <ChatArea
            conversation={activeConversation || null}
            onSendMessage={handleSendMessage}
          />
        );
      case "documents":
        return <DocumentList />;
      case "settings":
        return <SettingsPanel />;
      default:
        return (
          <ChatArea
            conversation={activeConversation || null}
            onSendMessage={handleSendMessage}
          />
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar */}
      <AppSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={selectConversation}
        onDeleteConversation={deleteConversation}
        onNewConversation={createNewConversation}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Content Panel */}
        <div className="flex-1 overflow-hidden">{renderContent()}</div>

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
