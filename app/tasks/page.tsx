import { AppShell } from "@/components/layout/app-shell";
import { ProductivityModule } from "@/components/productivity/productivity-module";

export default function TasksPage() {
  return (
    <AppShell title="Tasks · Goals · Habits">
      <ProductivityModule />
    </AppShell>
  );
}
