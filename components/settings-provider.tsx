"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  Suspense,
} from "react";
import { api, getImageUrl } from "@/lib/api";
import { WebsiteSettings } from "@/lib/types";
import SettingsLoading from "./settings-loading";
import SettingsError from "./settings-error";

interface SettingsContextType {
  settings: WebsiteSettings | null;
  loading: boolean;
  error: string | null;
  getLogoUrl: () => string;
  getWebsiteName: (lang: "ar" | "en") => string;
  getDescription: () => string;
  getMainColor: () => string;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

interface SettingsProviderProps {
  children: ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getSettings();
      setSettings(response.data);
    } catch (err) {
      console.error("Error fetching settings:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  };

  const refreshSettings = async () => {
    await fetchSettings();
  };

  const getLogoUrl = (): string => {
    if (!settings?.websiteLogo?.url) {
      return "/placeholder-logo.png";
    }
    return getImageUrl(settings.websiteLogo.url);
  };

  const getWebsiteName = (lang: "ar" | "en"): string => {
    if (!settings) {
      return lang === "ar" ? "جمعية أصيل" : "Aseel Foundations";
    }
    return lang === "ar" ? settings.websiteName_ar : settings.websiteName_en;
  };

  const getDescription = (): string => {
    if (!settings?.description) {
      return "مؤسسة أهلية غير ربحية تعمل في فلسطين لتمكين الفئات المهمشة ودعم صمود المجتمع الفلسطيني";
    }
    return settings.description;
  };

  const getMainColor = (): string => {
    if (!settings?.mainColor) {
      return "#EF4444"; // Default red color
    }
    return settings.mainColor;
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const value: SettingsContextType = {
    settings,
    loading,
    error,
    getLogoUrl,
    getWebsiteName,
    getDescription,
    getMainColor,
    refreshSettings,
  };

  // Show loading state
  if (loading) {
    return <SettingsLoading />;
  }

  // Show error state
  if (error) {
    return <SettingsError error={error} onRetry={refreshSettings} />;
  }

  // Show content when settings are loaded
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
