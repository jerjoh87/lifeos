import {
  Brain,
  CalendarDays,
  ChartNoAxesCombined,
  CheckSquare,
  Home,
  Settings,
  Vault,
} from "lucide-react";

export const appNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Assistant", href: "/assistant", icon: Brain },
  { label: "Planner", href: "/planner", icon: CalendarDays },
  { label: "Tasks", href: "/tasks", icon: CheckSquare },
  { label: "Finance", href: "/finance", icon: ChartNoAxesCombined },
  { label: "Vault", href: "/vault", icon: Vault },
  { label: "Settings", href: "/settings", icon: Settings },
] as const;
