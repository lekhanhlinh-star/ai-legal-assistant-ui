import { ChevronRight } from "lucide-react";

interface SuggestedQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
}

const SuggestedQuestions = ({ questions, onSelect }: SuggestedQuestionsProps) => {
  return (
    <div className="space-y-2">
      {questions.map((question, index) => (
        <button
          key={index}
          onClick={() => onSelect(question)}
          className="group w-full text-left p-3 rounded-xl bg-white/5 hover:bg-cyan-500/10 text-sm text-slate-200 border border-white/5 hover:border-cyan-400/30 transition-all duration-300 flex items-center justify-between gap-2"
        >
          <span className="line-clamp-2">{question}</span>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
        </button>
      ))}
    </div>
  );
};

export default SuggestedQuestions;