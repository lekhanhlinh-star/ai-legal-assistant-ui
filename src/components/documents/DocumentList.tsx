import { useState } from "react";
import DocumentCard from "./DocumentCard";
import DocumentUpload from "./DocumentUpload";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Document } from "@/types/chat";

interface DocumentListProps {
  documents: Document[];
  onDocumentsChange: (documents: Document[]) => void;
}

const DocumentList = ({ documents, onDocumentsChange }: DocumentListProps) => {
  const [showUpload, setShowUpload] = useState(false);

  const handleDelete = (id: string) => {
    onDocumentsChange(documents.filter((doc) => doc.id !== id));
  };

  const handleCheckChange = (id: string, checked: boolean) => {
    onDocumentsChange(
      documents.map((doc) =>
        doc.id === id ? { ...doc, isChecked: checked } : doc
      )
    );
  };

  const handleUploadComplete = (file: { name: string; pages: number }) => {
    const newDoc: Document = {
      id: Date.now().toString(),
      name: file.name,
      pages: file.pages,
      dateAdded: new Date().toLocaleDateString("vi-VN"),
      size: (Math.random() * 10 + 1).toFixed(1) + " MB",
      isChecked: true,
    };
    onDocumentsChange([newDoc, ...documents]);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Tài liệu</h2>
            <p className="text-sm text-muted-foreground">
              {documents.length} tài liệu đã tải lên
            </p>
          </div>
          <Button
            onClick={() => setShowUpload(!showUpload)}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl gap-2"
          >
            <Plus className="w-4 h-4" />
            Thêm mới
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {/* Upload Section */}
        {showUpload && (
          <div className="mb-6 animate-fade-in">
            <DocumentUpload onUploadComplete={handleUploadComplete} />
          </div>
        )}

        {/* Document List */}
        {documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-foreground mb-2">
              Chưa có tài liệu nào
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tải lên tài liệu PDF để bắt đầu
            </p>
            <Button
              onClick={() => setShowUpload(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl gap-2"
            >
              <Plus className="w-4 h-4" />
              Tải tài liệu
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <DocumentCard
                key={doc.id}
                name={doc.name}
                pages={doc.pages}
                dateAdded={doc.dateAdded}
                size={doc.size}
                isChecked={doc.isChecked}
                onCheckChange={(checked) => handleCheckChange(doc.id, checked)}
                onDelete={() => handleDelete(doc.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentList;
