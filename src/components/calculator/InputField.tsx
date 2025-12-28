import { ReactNode, useState, useEffect } from "react";
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
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const formatValue = (val: number) => {
    return val.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Sync external value to input when not focused
  useEffect(() => {
    if (!isFocused) {
      setInputValue(formatValue(value));
    }
  }, [value, isFocused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Show raw number without formatting when focused
    setInputValue(value.toString().replace(".", ","));
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Parse and apply the value
    const rawValue = inputValue.replace(/[^\d.,]/g, "").replace(",", ".");
    const parsed = parseFloat(rawValue);
    if (!isNaN(parsed)) {
      const clampedValue = Math.min(Math.max(parsed, min), max);
      onChange(clampedValue);
      setInputValue(formatValue(clampedValue));
    } else {
      // Reset to current value if invalid
      setInputValue(formatValue(value));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
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
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`h-8 text-right bg-muted/50 border-border/50 font-mono text-foreground focus:border-primary ${type === "currency" || type === "number" ? "w-32" : "w-24"}`}
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
