import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Status = "analysis" | "proposal" | "closed";

interface StatusDropdownProps {
  value: Status;
  onChange: (value: Status) => void;
}

const statusConfig: Record<Status, { label: string; color: string }> = {
  analysis: { label: "In Analysis", color: "bg-warning/10 text-warning border-warning/20" },
  proposal: { label: "Proposal Sent", color: "bg-primary/10 text-primary border-primary/20" },
  closed: { label: "Closed", color: "bg-success/10 text-success border-success/20" },
};

export function StatusDropdown({ value, onChange }: StatusDropdownProps) {
  const config = statusConfig[value];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger 
        className={cn(
          "w-[160px] border rounded-full text-xs font-medium h-8",
          config.color
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border">
        {Object.entries(statusConfig).map(([key, { label, color }]) => (
          <SelectItem 
            key={key} 
            value={key}
            className="text-sm cursor-pointer focus:bg-muted"
          >
            <div className="flex items-center gap-2">
              <div className={cn("w-2 h-2 rounded-full", color.split(" ")[0].replace("/10", ""))} />
              {label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
