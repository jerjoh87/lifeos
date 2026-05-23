import { ChatMessage } from "@/lib/assistant-mock";

export type AssistantPersistedState = {
  messages: ChatMessage[];
  promptUsage: Record<string, number>;
};

export const ASSISTANT_STORAGE_KEY = "lifeos_assistant_v1";

const seedMessage: ChatMessage = {
  id: "seed-1",
  role: "assistant",
  text: "I’m Jordan AI. Tell me what kind of day you want, and I’ll structure it.",
  createdAt: Date.now(),
};

export const defaultAssistantState: AssistantPersistedState = {
  messages: [seedMessage],
  promptUsage: {},
};

function normalize(input: AssistantPersistedState): AssistantPersistedState {
  return {
    messages: Array.isArray(input.messages)
      ? input.messages
          .filter((m) => m && (m.role === "assistant" || m.role === "user") && typeof m.text === "string")
          .map((m) => ({ ...m, createdAt: Number.isFinite(m.createdAt) ? m.createdAt : Date.now() }))
      : [seedMessage],
    promptUsage: input.promptUsage && typeof input.promptUsage === "object" ? input.promptUsage : {},
  };
}

export function loadAssistantState(): { state: AssistantPersistedState; hadCorruption: boolean } {
  if (typeof window === "undefined") return { state: defaultAssistantState, hadCorruption: false };
  try {
    const raw = localStorage.getItem(ASSISTANT_STORAGE_KEY);
    if (!raw) return { state: defaultAssistantState, hadCorruption: false };
    const parsed = JSON.parse(raw) as AssistantPersistedState;
    return { state: normalize({ ...defaultAssistantState, ...parsed }), hadCorruption: false };
  } catch {
    localStorage.removeItem(ASSISTANT_STORAGE_KEY);
    return { state: defaultAssistantState, hadCorruption: true };
  }
}

export function saveAssistantState(state: AssistantPersistedState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ASSISTANT_STORAGE_KEY, JSON.stringify(normalize(state)));
}
