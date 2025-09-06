"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettingsErrorProps {
  error: string;
  onRetry: () => void;
}

export default function SettingsError({ error, onRetry }: SettingsErrorProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-6 max-w-md mx-auto px-4">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>

        {/* Error Message */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            خطأ في تحميل الإعدادات
          </h2>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>

        {/* Retry Button */}
        <Button
          onClick={onRetry}
          className="flex items-center space-x-2 rtl:space-x-reverse"
        >
          <RefreshCw className="h-4 w-4" />
          <span>إعادة المحاولة</span>
        </Button>
      </div>
    </div>
  );
}
