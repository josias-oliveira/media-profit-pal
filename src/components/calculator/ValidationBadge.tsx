import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ValidationBadgeProps {
  isValid: boolean;
  message: string;
}

export function ValidationBadge({ isValid, message }: ValidationBadgeProps) {
  return (
    <div 
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
        isValid 
          ? "bg-success/10 text-success border border-success/20" 
          : "bg-warning/10 text-warning border border-warning/20"
      )}
    >
      {isValid ? (
        <CheckCircle2 className="w-3.5 h-3.5" />
      ) : (
        <AlertCircle className="w-3.5 h-3.5" />
      )}
      <span>{message}</span>
    </div>
  );
}
