import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الأخبار والأنشطة | جمعية أصيل",
  description: "تابع آخر الأخبار والأنشطة من جمعية أصيل للتنمية الخيرية",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "الأخبار والأنشطة | جمعية أصيل",
    description: "تابع آخر الأخبار والأنشطة من جمعية أصيل للتنمية الخيرية",
    url: "/news",
    type: "website",
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
