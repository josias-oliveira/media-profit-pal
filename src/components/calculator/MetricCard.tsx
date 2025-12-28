import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  variant?: "primary" | "accent" | "default";
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  variant = "default",
  className 
}: MetricCardProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:border-primary/30 hover:shadow-glow-primary animate-scale-in",
        variant === "primary" && "border-primary/40 shadow-glow-primary",
        variant === "accent" && "border-accent/40 shadow-glow-accent",
        className
      )}
    >
      {/* Gradient overlay for primary/accent variants */}
      {variant !== "default" && (
        <div 
          className={cn(
            "absolute inset-0 opacity-5",
            variant === "primary" && "bg-gradient-primary",
            variant === "accent" && "bg-gradient-accent"
          )} 
        />
      )}
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </span>
          {icon && (
            <div className={cn(
              "p-2 rounded-lg",
              variant === "primary" && "bg-primary/10 text-primary",
              variant === "accent" && "bg-accent/10 text-accent",
              variant === "default" && "bg-muted text-muted-foreground"
            )}>
              {icon}
            </div>
          )}
        </div>
        
        <div className={cn(
          "text-3xl lg:text-4xl font-bold font-mono tracking-tight animate-number-tick",
          variant === "primary" && "text-gradient-primary",
          variant === "accent" && "text-gradient-accent",
          variant === "default" && "text-foreground"
        )}>
          {value}
        </div>
        
        {subtitle && (
          <p className="mt-2 text-sm text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
