import { ReactNode } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  prefix?: string;
  icon?: ReactNode;
  type?: "slider" | "number" | "currency";
  className?: string;
}

export function InputField({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 0.1,
  suffix = "%",
  prefix,
  icon,
  type = "slider",
  className,
}: InputFieldProps) {
  const formatValue = (val: number) => {
    if (type === "currency") {
      return val.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return val.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d.,]/g, "").replace(",", ".");
    const parsed = parseFloat(rawValue);
    if (!isNaN(parsed)) {
      onChange(Math.min(Math.max(parsed, min), max));
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && (
            <span className="text-muted-foreground">{icon}</span>
          )}
          <label className="text-sm font-medium text-foreground">
            {label}
          </label>
        </div>
        <div className="flex items-center gap-1 font-mono text-sm">
          {prefix && <span className="text-muted-foreground">{prefix}</span>}
          <Input
            type="text"
            value={formatValue(value)}
            onChange={handleInputChange}
            className="w-24 h-8 text-right bg-muted/50 border-border/50 font-mono text-foreground focus:border-primary"
          />
          {suffix && <span className="text-muted-foreground">{suffix}</span>}
        </div>
      </div>
      
      {type === "slider" && (
        <Slider
          value={[value]}
          onValueChange={([v]) => onChange(v)}
          min={min}
          max={max}
          step={step}
          className="py-1"
        />
      )}
    </div>
  );
}
