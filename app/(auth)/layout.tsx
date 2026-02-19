import Link from "next/link";
import { Shield } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left: branding panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 border-r border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              background: "linear-gradient(135deg, #ea580c, #f59e0b)",
            }}
          >
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-white">
            Sentinel
          </span>
        </Link>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white max-w-md">
            AI-powered risk control for your portfolio
          </h2>
          <p className="mt-4 text-[#a8a29e] max-w-sm">
            Monitor exposure, set rules, and stay in control with real-time
            alerts and insights.
          </p>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-6 max-w-sm">
          <p className="text-sm text-[#a8a29e]">
            &ldquo;Sentinel gives us one place to see risk and act on it.&rdquo;
          </p>
        </div>
      </div>

      {/* Right: form area */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
