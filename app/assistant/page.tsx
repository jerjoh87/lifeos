import { AppShell } from "@/components/layout/app-shell";
import { ChatWindow } from "@/components/assistant/chat-window";

export default function AssistantPage() {
  return (
    <AppShell title="Jordan AI Assistant">
      <ChatWindow />
    </AppShell>
  );
}
