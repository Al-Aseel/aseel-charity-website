import type React from "react";
import type { Metadata } from "next";
import { api, getImageUrl } from "@/lib/api";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { SettingsProvider } from "@/components/settings-provider";
import AppContent from "@/components/app-content";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "700", "900"],
  variable: "--font-tajawal",
  display: "swap",
  fallback: ["system-ui", "arial", "sans-serif"],
  preload: true,
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settingsResponse = await api.getSettings();
    const settings = settingsResponse.data;

    const logoPath = settings?.websiteLogo?.url;
    const faviconUrl = logoPath
      ? getImageUrl(logoPath)
      : "/placeholder-logo.png";

    return {
      title:
        "جمعية أصيل للتنمية الخيرية | Aseel Charitable Development Association",
      description:
        "مؤسسة أهلية غير ربحية تعمل في فلسطين لتمكين الفئات المهمشة ودعم صمود المجتمع الفلسطيني",
      generator: "v0.dev",
      icons: {
        icon: [{ url: faviconUrl }],
        shortcut: [{ url: faviconUrl }],
        apple: [{ url: faviconUrl }],
      },
    };
  } catch (error) {
    return {
      title:
        "جمعية أصيل للتنمية الخيرية | Aseel Charitable Development Association",
      description:
        "مؤسسة أهلية غير ربحية تعمل في فلسطين لتمكين الفئات المهمشة ودعم صمود المجتمع الفلسطيني",
      generator: "v0.dev",
      icons: {
        icon: [{ url: "/placeholder-logo.png" }],
        shortcut: [{ url: "/placeholder-logo.png" }],
        apple: [{ url: "/placeholder-logo.png" }],
      },
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={tajawal.variable}
    >
      <body className={tajawal.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SettingsProvider>
            <LanguageProvider>
              <AppContent>{children}</AppContent>
            </LanguageProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
