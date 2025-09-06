"use client";

import { Loader2 } from "lucide-react";

export default function SettingsLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        {/* Logo Placeholder */}
        <div className="w-20 h-20 bg-muted rounded-full animate-pulse flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>

        {/* Website Name Placeholder */}
        <div className="space-y-2 text-center">
          <div className="h-6 bg-muted rounded animate-pulse w-48"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-32"></div>
        </div>

        {/* Loading Text */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">جاري تحميل إعدادات الموقع...</span>
        </div>
      </div>
    </div>
  );
}
