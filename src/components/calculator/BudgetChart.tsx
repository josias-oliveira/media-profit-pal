import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface BudgetChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

export function BudgetChart({ data }: BudgetChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percentage = ((item.value / total) * 100).toFixed(1);
      return (
        <div className="bg-popover/100 backdrop-blur-none border border-border rounded-lg p-3 shadow-lg" style={{ backgroundColor: 'hsl(var(--popover))' }}>
          <p className="text-sm font-medium text-foreground">{item.name}</p>
          <p className="text-sm text-muted-foreground">
            R$ {item.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-primary font-mono">{percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                className="transition-all duration-300 hover:opacity-80"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} wrapperStyle={{ zIndex: 100 }} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ height: 280 }}>
        <div className="text-center flex flex-col items-center justify-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Total</p>
          <p className="text-lg font-bold font-mono text-foreground">
            R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-muted-foreground truncate">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
