import { MessageSquare } from "lucide-react";

interface SuggestedQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
}

const SuggestedQuestions = ({ questions, onSelect }: SuggestedQuestionsProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <MessageSquare className="w-4 h-4" />
        <span className="text-sm font-medium">Câu hỏi gợi ý</span>
      </div>
      <div className="grid gap-2">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelect(question)}
            className="text-left p-3 rounded-xl bg-secondary/50 hover:bg-secondary text-sm text-foreground border border-border/30 hover:border-accent/30 transition-all duration-200 hover:shadow-soft"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
