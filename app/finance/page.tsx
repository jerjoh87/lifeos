import { AppShell } from "@/components/layout/app-shell";
import { FinanceHubModule } from "@/components/finance/finance-hub-module";

export default function FinancePage() {
  return (
    <AppShell title="Finance Hub">
      <FinanceHubModule />
    </AppShell>
  );
}
