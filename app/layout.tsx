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
        icon: [
          { url: "/favicon.ico", sizes: "any" },
          { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
          { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
          { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        ],
        shortcut: [
          { url: "/favicon.ico", sizes: "any" },
          { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        ],
        apple: [
          { url: "/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
          { url: "/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
          { url: "/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
          { url: "/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
          {
            url: "/apple-icon-114x114.png",
            sizes: "114x114",
            type: "image/png",
          },
          {
            url: "/apple-icon-120x120.png",
            sizes: "120x120",
            type: "image/png",
          },
          {
            url: "/apple-icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            url: "/apple-icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            url: "/apple-icon-180x180.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
        other: [
          {
            rel: "mask-icon",
            url: "/apple-icon.png",
            color: "#1e40af",
          },
        ],
      },
      manifest: "/manifest.json",
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
        icon: [
          { url: "/favicon.ico", sizes: "any" },
          { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
          { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
          { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        ],
        shortcut: [
          { url: "/favicon.ico", sizes: "any" },
          { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        ],
        apple: [
          { url: "/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
          { url: "/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
          { url: "/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
          { url: "/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
          {
            url: "/apple-icon-114x114.png",
            sizes: "114x114",
            type: "image/png",
          },
          {
            url: "/apple-icon-120x120.png",
            sizes: "120x120",
            type: "image/png",
          },
          {
            url: "/apple-icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            url: "/apple-icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            url: "/apple-icon-180x180.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
        other: [
          {
            rel: "mask-icon",
            url: "/apple-icon.png",
            color: "#1e40af",
          },
        ],
      },
      manifest: "/manifest.json",
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
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link rel="mask-icon" href="/apple-icon.png" color="#1e40af" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#1e40af" />
      </head>
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
