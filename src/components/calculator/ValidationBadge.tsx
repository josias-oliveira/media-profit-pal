import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BreakdownItem {
  label: string;
  percentage: number;
}

interface ValidationBadgeProps {
  isValid: boolean;
  message: string;
  breakdown?: BreakdownItem[];
  total?: number;
}

export function ValidationBadge({ isValid, message, breakdown, total }: ValidationBadgeProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div 
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-help",
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
      </TooltipTrigger>
      <TooltipContent 
        side="bottom" 
        className="bg-popover border-border p-3 max-w-xs"
      >
        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground mb-2">Budget Allocation Check</p>
          {breakdown && breakdown.map((item, index) => (
            <div key={index} className="flex justify-between text-xs gap-4">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-mono text-foreground">{item.percentage.toFixed(2)}%</span>
            </div>
          ))}
          {total !== undefined && (
            <>
              <div className="border-t border-border my-2" />
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-foreground">Total</span>
                <span className={cn(
                  "font-mono",
                  Math.abs(total - 100) < 0.01 ? "text-success" : "text-warning"
                )}>
                  {total.toFixed(2)}%
                </span>
              </div>
            </>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
