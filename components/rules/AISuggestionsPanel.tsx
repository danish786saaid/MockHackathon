"use client";

import { Sparkles } from "lucide-react";

type Suggestion = { id: string; rule: string; reason: string };

type Props = {
  suggestions: Suggestion[];
  onAccept: (id: string) => void;
  onDismiss: (id: string) => void;
};

export default function AISuggestionsPanel({ suggestions, onAccept, onDismiss }: Props) {
  if (suggestions.length === 0) return null;

  return (
    <section className="glass-card overflow-hidden rounded-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 px-6 py-4">
        <Sparkles className="h-5 w-5 text-[#22d3ee]" />
        <h3 className="text-base font-semibold text-white">AI Suggested Rules</h3>
      </div>
      <ul className="divide-y divide-white/5">
        {suggestions.map((s) => (
          <li key={s.id} className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">{s.rule}</p>
              <p className="mt-0.5 text-xs text-[#94a3b8]">{s.reason}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => onAccept(s.id)}
                className="rounded-lg bg-[#3b82f6] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#2563eb]"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => onDismiss(s.id)}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-[#94a3b8] transition-colors hover:bg-white/10 hover:text-white"
              >
                Dismiss
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
