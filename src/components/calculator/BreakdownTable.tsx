interface BreakdownItem {
  label: string;
  percentage: number;
  value: number;
  color: string;
}

interface BreakdownTableProps {
  items: BreakdownItem[];
  total: number;
}

export function BreakdownTable({ items, total }: BreakdownTableProps) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div 
          key={index} 
          className="group flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-2 h-8 rounded-full" 
              style={{ backgroundColor: item.color }}
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
