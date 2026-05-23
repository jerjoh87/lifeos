export type ChatRole = "user" | "assistant";
export type ChatMessage = { id: string; role: ChatRole; text: string; createdAt: number };

export const quickPrompts = [
  "Plan my day around deep work",
  "Give me a weekly routine reset",
  "How can I reduce spending this week?",
  "What should I focus on right now?",
];

export const suggestionCards = [
  { title: "Daily Planning", prompt: "Build my ideal day schedule from 8 AM to 8 PM." },
  { title: "Finance Prompt", prompt: "Give me 3 ways to cut $200 this month." },
  { title: "Productivity Prompt", prompt: "Turn my top goal into a 7-day action sprint." },
];

export function mockAssistantReply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("finance") || q.includes("spend") || q.includes("budget")) {
    return "Finance focus: 1) pause non-essential subscriptions, 2) cap dining at a weekly limit, 3) schedule a 10-minute nightly spend review.";
  }
  if (q.includes("day") || q.includes("plan") || q.includes("schedule")) {
    return "Daily plan: Start with 90 minutes deep work, then admin batching, a midday reset, and a final review block before evening shutdown.";
  }
  if (q.includes("productivity") || q.includes("focus") || q.includes("goal")) {
    return "Productivity focus: choose one priority outcome, time-block two execution sprints, and define one measurable end-of-day checkpoint.";
  }
  return "Great prompt. I suggest a three-step flow: clarify your target, block focused execution time, and set a short reflection checkpoint tonight.";
}
