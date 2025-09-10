import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "بحث الموقع | جمعية أصيل",
  description: "ابحث في محتوى الموقع من أخبار وبرامج وتقارير",
  alternates: { canonical: "/search" },
  openGraph: {
    title: "بحث الموقع | جمعية أصيل",
    description: "ابحث في محتوى الموقع من أخبار وبرامج وتقارير",
    url: "/search",
    type: "website",
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
