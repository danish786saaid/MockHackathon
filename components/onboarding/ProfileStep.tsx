"use client";

import { User } from "lucide-react";
import type { OnboardingData } from "./onboarding-types";

const inputClass =
  "w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-3 px-4 text-sm text-white placeholder-[#78716c] transition-colors focus:border-[#ea580c]/30 focus:outline-none focus:bg-white/[0.05]";

type Props = {
  data: OnboardingData["profile"];
  onChange: (data: OnboardingData["profile"]) => void;
};

export default function ProfileStep({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Profile setup</h2>
        <p className="mt-1 text-sm text-[#78716c]">
          Tell us a bit about yourself. You can change this later.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-white/[0.15] bg-white/[0.02] text-[#78716c] transition-colors hover:border-[#ea580c]/30 hover:bg-white/[0.04] cursor-pointer">
          <User className="h-8 w-8" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-[#a8a29e]">
          Display name
        </label>
        <input
          type="text"
          placeholder="How you'll appear in Sentinel"
          value={data.displayName}
          onChange={(e) => onChange({ ...data, displayName: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-[#a8a29e]">
          Bio or role (optional)
        </label>
        <textarea
          placeholder="e.g. Crypto trader, Portfolio manager"
          rows={3}
          value={data.bio}
          onChange={(e) => onChange({ ...data, bio: e.target.value })}
          className={inputClass + " resize-none"}
        />
      </div>
    </div>
  );
}
