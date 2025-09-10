import type React from "react";
import type { Metadata } from "next";
import Script from "next/script";
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
    const siteUrl = process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000";
    const siteName =
      settings?.websiteName ||
      "جمعية أصيل للتنمية الخيرية | Aseel Charitable Development Association";
    const siteDescription =
      settings?.aboutUs ||
      "مؤسسة أهلية غير ربحية تعمل في فلسطين لتمكين الفئات المهمشة ودعم صمود المجتمع الفلسطيني";

    return {
      metadataBase: new URL(siteUrl),
      title: siteName,
      description: siteDescription,
      generator: "v0.dev",
      icons: {
        icon: [{ url: faviconUrl }],
        shortcut: [{ url: faviconUrl }],
        apple: [{ url: faviconUrl }],
      },
      applicationName: siteName,
      authors: [{ name: siteName }],
      keywords: [
        "Aseel",
        "Charity",
        "جمعية",
        "تنمية",
        "فلسطين",
        "برامج",
        "أخبار",
        "تقارير",
      ],
      openGraph: {
        type: "website",
        url: siteUrl,
        title: siteName,
        siteName,
        description: siteDescription,
        images: [
          {
            url: faviconUrl,
          },
        ],
        locale: "ar_AR",
      },
      twitter: {
        card: "summary_large_image",
        title: siteName,
        description: siteDescription,
        images: [faviconUrl],
      },
      alternates: {
        canonical: siteUrl,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          maxSnippet: -1,
          maxImagePreview: "large",
          maxVideoPreview: -1,
        },
      },
    };
  } catch (error) {
    return {
      metadataBase: new URL(
        process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000"
      ),
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
      openGraph: {
        type: "website",
        url: process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000",
        title:
          "جمعية أصيل للتنمية الخيرية | Aseel Charitable Development Association",
        siteName:
          "جمعية أصيل للتنمية الخيرية | Aseel Charitable Development Association",
        description:
          "مؤسسة أهلية غير ربحية تعمل في فلسطين لتمكين الفئات المهمشة ودعم صمود المجتمع الفلسطيني",
        images: [
          {
            url: "/placeholder-logo.png",
          },
        ],
        locale: "ar_AR",
      },
      twitter: {
        card: "summary_large_image",
        title:
          "جمعية أصيل للتنمية الخيرية | Aseel Charitable Development Association",
        description:
          "مؤسسة أهلية غير ربحية تعمل في فلسطين لتمكين الفئات المهمشة ودعم صمود المجتمع الفلسطيني",
        images: ["/placeholder-logo.png"],
      },
      robots: {
        index: true,
        follow: true,
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
              {/* JSON-LD: Organization and WebSite */}
              <Script
                id="ld-org"
                type="application/ld+json"
                strategy="afterInteractive"
              >
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  name: "جمعية أصيل للتنمية الخيرية",
                  url:
                    process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000",
                  logo:
                    (typeof window === "undefined" ? undefined : undefined) ||
                    undefined,
                })}
              </Script>
              <Script
                id="ld-website"
                type="application/ld+json"
                strategy="afterInteractive"
              >
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  name: "جمعية أصيل للتنمية الخيرية | Aseel Charitable Development Association",
                  url:
                    process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000",
                  potentialAction: {
                    "@type": "SearchAction",
                    target:
                      (process.env.NEXT_PUBLIC_HOST_URL ||
                        "http://localhost:3000") +
                      "/search?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                })}
              </Script>
            </LanguageProvider>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
