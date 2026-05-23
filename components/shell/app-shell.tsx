import { DesktopSidebar } from "./desktop-sidebar";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { PageContainer } from "./page-container";
import { TopHeader } from "./top-header";

export function AppShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#05070c] text-slate-100">
      <div className="flex min-h-screen">
        <DesktopSidebar />
        <div className="min-w-0 flex-1">
          <PageContainer>
            <TopHeader title={title} />
            {children}
          </PageContainer>
        </div>
      </div>
      <MobileBottomNav />
    </main>
  );
}
