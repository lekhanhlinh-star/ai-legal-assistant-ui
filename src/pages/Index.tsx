import { useState } from "react";
import AppSidebar from "@/components/sidebar/AppSidebar";
import ChatArea from "@/components/chat/ChatArea";
import DocumentList from "@/components/documents/DocumentList";
import SettingsPanel from "@/components/settings/SettingsPanel";
import { useConversations } from "@/hooks/useConversations";
import { Message, Document } from "@/types/chat";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

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
    updateDocuments,
  } = useConversations();

  const handleSendMessage = (message: Message) => {
    addMessage(message);
  };

  const handleDocumentsChange = (documents: Document[]) => {
    updateDocuments(documents);
  };

  const currentDocuments = activeConversation?.documents || [];

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
        return (
          <DocumentList
            documents={currentDocuments}
            onDocumentsChange={handleDocumentsChange}
          />
        );
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

      {/* Main Content Area with Resizable Panels */}
      <main className="flex-1 flex overflow-hidden">
        {activeTab === "chat" ? (
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Chat Panel */}
            <ResizablePanel defaultSize={70} minSize={40}>
              {renderContent()}
            </ResizablePanel>

            {/* Resizable Handle */}
            <ResizableHandle 
              withHandle 
              className="bg-slate-700/50 hover:bg-cyan-500/30 transition-colors data-[resize-handle-active]:bg-cyan-500/50" 
            />

            {/* Document Panel */}
            <ResizablePanel defaultSize={30} minSize={20} className="hidden lg:block">
              <DocumentList
                documents={currentDocuments}
                onDocumentsChange={handleDocumentsChange}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <div className="flex-1 overflow-hidden">{renderContent()}</div>
        )}
      </main>
    </div>
  );
};

export default Index;
