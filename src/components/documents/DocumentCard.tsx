import { FileText, Trash2, Download, Calendar, FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DocumentCardProps {
  name: string;
  pages: number;
  dateAdded: string;
  size?: string;
  isSelected?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
}

const DocumentCard = ({
  name,
  pages,
  dateAdded,
  size = "2.4 MB",
  isSelected,
  onSelect,
  onDelete,
}: DocumentCardProps) => {
  return (
    <div
      className={cn(
        "group relative p-4 rounded-xl border transition-all duration-200 cursor-pointer",
        isSelected
          ? "bg-primary/5 border-primary/30 shadow-soft"
          : "bg-card border-border/50 hover:border-accent/30 hover:shadow-soft"
      )}
      onClick={onSelect}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
          <FileText className="w-5 h-5 text-destructive" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground truncate text-sm">
            {name}
          </h4>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <FileIcon className="w-3.5 h-3.5" />
              {pages} trang
            </span>
            <span>{size}</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>{dateAdded}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
