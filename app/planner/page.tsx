import { AppShell } from "@/components/layout/app-shell";
import { PlannerModule } from "@/components/planner/planner-module";

export default function PlannerPage() {
  return (
    <AppShell title="Planner">
      <PlannerModule />
    </AppShell>
  );
}
