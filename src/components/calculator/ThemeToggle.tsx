import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  isBmsTheme: boolean;
  onToggle: (checked: boolean) => void;
}

export function ThemeToggle({ isBmsTheme, onToggle }: ThemeToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <Moon className={`w-4 h-4 transition-colors ${isBmsTheme ? 'text-muted-foreground' : 'text-primary'}`} />
      <Switch
        id="theme-toggle"
        checked={isBmsTheme}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-[hsl(211,100%,46%)]"
      />
      <Sun className={`w-4 h-4 transition-colors ${isBmsTheme ? 'text-primary' : 'text-muted-foreground'}`} />
      <Label 
        htmlFor="theme-toggle" 
        className="text-sm font-medium text-foreground cursor-pointer ml-1"
      >
        {isBmsTheme ? "BMS" : "Dark"}
      </Label>
    </div>
  );
}
