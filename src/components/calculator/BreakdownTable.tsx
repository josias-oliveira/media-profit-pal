import { cn } from "@/lib/utils";

interface BreakdownItem {
  label: string;
  percentage: number;
  value: number;
  color: string;
}

interface BreakdownTableProps {
  items: BreakdownItem[];
  total: number;
  highlightedIndex?: number | null;
  onHoverChange?: (index: number | null) => void;
}

export function BreakdownTable({ items, total, highlightedIndex, onHoverChange }: BreakdownTableProps) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div 
          key={index} 
          className={cn(
            "group flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 cursor-pointer",
            highlightedIndex === index && "bg-muted/60 ring-2 ring-primary/30 scale-[1.02]"
          )}
          style={{
            opacity: highlightedIndex === null || highlightedIndex === undefined || highlightedIndex === index ? 1 : 0.5,
          }}
          onMouseEnter={() => onHoverChange?.(index)}
          onMouseLeave={() => onHoverChange?.(null)}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-2 h-8 rounded-full transition-all duration-200" 
              style={{ 
                backgroundColor: item.color,
                transform: highlightedIndex === index ? 'scaleY(1.1)' : 'scaleY(1)',
              }}
            />
            <div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground font-mono">
                {item.percentage.toFixed(2)}%
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-mono font-medium text-foreground">
              R$ {item.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
            <div className="w-20 h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${(item.value / total) * 100}%`,
                  backgroundColor: item.color
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
