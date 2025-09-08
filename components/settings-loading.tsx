"use client";

import { Loader2 } from "lucide-react";

export default function SettingsLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Subtle radial accent using primary */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_30%,black,transparent)]"
        style={{
          background:
            "radial-gradient(60rem 30rem at 50% -10%, hsl(var(--primary)/0.18), transparent)",
        }}
      />

      {/* Glass card */}
      <div className="relative w-full max-w-md mx-auto px-6">
        <div className="rounded-2xl border border-[hsl(var(--primary)/0.20)] bg-background/60 backdrop-blur-md shadow-[0_10px_40px_hsl(var(--primary)/0.18)]">
          <div className="p-8 flex flex-col items-center text-center space-y-6">
            {/* Logo placeholder with conic ring */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,hsl(var(--primary)/0.25)_120deg,transparent_240deg)] animate-spin-slow" />
              <div className="relative w-20 h-20 rounded-full bg-muted/60 border border-white/10 flex items-center justify-center backdrop-blur">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            </div>

            {/* Skeletons */}
            <div className="w-full space-y-3">
              <div className="h-6 w-2/3 mx-auto rounded-md bg-muted animate-pulse" />
              <div className="h-4 w-1/2 mx-auto rounded-md bg-muted animate-pulse" />
            </div>

            {/* Helper text */}
            <p className="text-sm text-muted-foreground">
              جاري تحميل إعدادات الموقع...
            </p>
          </div>
        </div>
      </div>

      {/* Keyframes via tailwind arbitrary (using utilities layer is preferred, but simple inline here) */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-loading-bar {
          position: relative;
          animation: load 1.6s ease-in-out infinite;
        }
        @keyframes load {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(20%);
          }
          100% {
            transform: translateX(120%);
          }
        }
      `}</style>
    </div>
  );
}
