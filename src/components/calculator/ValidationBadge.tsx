import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MathProofData {
  budget: number;
  rawSellingCpm: number;
  impressionsFromCpm: number;
  impressionsFromMedia: number;
  validator: number;
}

interface ValidationBadgeProps {
  isValid: boolean;
  message: string;
  mathProof?: MathProofData;
}

export function ValidationBadge({ isValid, message, mathProof }: ValidationBadgeProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div 
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer hover:scale-105",
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
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className={cn(
            "text-center font-bold text-lg",
            isValid ? "text-success" : "text-warning"
          )}>
            MATHEMATICAL PROOF
          </DialogTitle>
        </DialogHeader>
        
        {mathProof && (
          <div className="w-full rounded-lg overflow-hidden border border-border">
            <div className="divide-y divide-border">
              <div className="flex justify-between items-center px-4 py-3">
                <span className="font-semibold text-foreground">BUDGET</span>
                <span className="font-mono text-foreground">
                  R$ {mathProof.budget.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="flex justify-between items-center px-4 py-3">
                <span className="font-semibold text-foreground">SELLING CPM</span>
                <span className="font-mono text-foreground">
                  R$ {mathProof.rawSellingCpm.toFixed(6)}
                </span>
              </div>
              
              <div className="flex justify-between items-center px-4 py-3">
                <span className="font-semibold text-foreground">IMPRESSIONS</span>
                <span className="font-mono text-foreground">
                  {mathProof.impressionsFromCpm.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                </span>
              </div>
              
              <div className="flex justify-between items-center px-4 py-3">
                <span className="font-semibold text-foreground">IMPRESSIONS (MEDIA)</span>
                <span className="font-mono text-foreground">
                  {mathProof.impressionsFromMedia.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                </span>
              </div>
              
              <div className={cn(
                "flex justify-between items-center px-4 py-3",
                Math.abs(mathProof.validator) < 1 ? "bg-success/10" : "bg-destructive/10"
              )}>
                <span className="font-bold text-foreground">VALIDATOR</span>
                <span className={cn(
                  "font-mono font-bold",
                  Math.abs(mathProof.validator) < 1 ? "text-success" : "text-destructive"
                )}>
                  {Math.round(mathProof.validator).toLocaleString("pt-BR")}
                </span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
