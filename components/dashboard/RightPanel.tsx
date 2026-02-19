"use client";

import AlertsFeed from "@/components/widgets/AlertsFeed";
import ActivityLog from "@/components/widgets/ActivityLog";

export default function RightPanel() {
  return (
    <aside
      className="fixed right-0 top-0 z-40 flex h-screen w-[320px] flex-col border-l border-white/5 backdrop-blur-xl"
      style={{ background: "rgba(13, 20, 36, 0.98)" }}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5">
        <AlertsFeed />
        <ActivityLog />
      </div>
    </aside>
  );
}
