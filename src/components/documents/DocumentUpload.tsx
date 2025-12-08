import { useState, useCallback } from "react";
import { Upload, FileText, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface UploadingFile {
  id: string;
  name: string;
  progress: number;
  status: "uploading" | "complete" | "error";
}

interface DocumentUploadProps {
  onUploadComplete?: (file: { name: string; pages: number }) => void;
}

const DocumentUpload = ({ onUploadComplete }: DocumentUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const simulateUpload = (file: File) => {
    const uploadId = Date.now().toString();
    const uploadFile: UploadingFile = {
      id: uploadId,
      name: file.name,
      progress: 0,
      status: "uploading",
    };

    setUploadingFiles((prev) => [...prev, uploadFile]);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadingFiles((prev) =>
          prev.map((f) =>
            f.id === uploadId ? { ...f, progress: 100, status: "complete" } : f
          )
        );
        onUploadComplete?.({
          name: file.name,
          pages: Math.floor(Math.random() * 50) + 5,
        });

        // Remove from list after delay
        setTimeout(() => {
          setUploadingFiles((prev) => prev.filter((f) => f.id !== uploadId));
        }, 2000);
      } else {
        setUploadingFiles((prev) =>
          prev.map((f) => (f.id === uploadId ? { ...f, progress } : f))
        );
      }
    }, 200);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files).filter(
        (file) => file.type === "application/pdf"
      );

      files.forEach((file) => simulateUpload(file));
    },
    [onUploadComplete]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => simulateUpload(file));
    e.target.value = "";
  };

  const removeFile = (id: string) => {
    setUploadingFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200",
          isDragging
            ? "border-accent bg-accent/5"
            : "border-border/50 hover:border-accent/50 hover:bg-secondary/30"
        )}
      >
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center gap-4">
          <div
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
              isDragging ? "bg-accent/20" : "bg-primary/10"
            )}
          >
            <Upload
              className={cn(
                "w-7 h-7 transition-colors",
                isDragging ? "text-accent" : "text-primary"
              )}
            />
          </div>

          <div>
            <p className="font-medium text-foreground mb-1">
              Kéo thả tệp PDF vào đây
            </p>
            <p className="text-sm text-muted-foreground">
              hoặc{" "}
              <span className="text-accent font-medium">nhấn để chọn tệp</span>
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            Hỗ trợ định dạng PDF • Tối đa 50MB
          </p>
        </div>
      </div>

      {/* Uploading Files */}
      {uploadingFiles.length > 0 && (
        <div className="space-y-2">
          {uploadingFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border/50"
            >
              <div className="w-9 h-9 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-destructive" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {file.name}
                  </p>
                  {file.status === "complete" ? (
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  ) : (
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {Math.round(file.progress)}%
                    </span>
                  )}
                </div>
                <Progress
                  value={file.progress}
                  className="h-1.5"
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground flex-shrink-0"
                onClick={() => removeFile(file.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
