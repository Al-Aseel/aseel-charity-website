"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettingsErrorProps {
  error: string;
  onRetry: () => void;
}

export default function SettingsError({ error, onRetry }: SettingsErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Soft background accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_30%,black,transparent)]"
        style={{
          background:
            "radial-gradient(60rem 30rem at 50% -10%, hsl(var(--primary)/0.14), transparent)",
        }}
      />

      <div className="relative w-full max-w-md mx-auto px-6">
        <div className="rounded-2xl border border-[hsl(var(--primary)/0.20)] bg-background/60 backdrop-blur-md shadow-[0_10px_40px_hsl(var(--primary)/0.15)]">
          <div className="p-8 flex flex-col items-center text-center space-y-6">
            {/* Error Icon */}
            <div className="w-20 h-20 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                حدث خطأ أثناء تحميل الإعدادات
              </h2>
              <p className="text-sm text-muted-foreground break-words">
                {error}
              </p>
            </div>

            {/* Retry Button */}
            <Button
              onClick={onRetry}
              className="inline-flex items-center gap-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:opacity-90"
            >
              <RefreshCw className="h-4 w-4" />
              <span>إعادة المحاولة</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
