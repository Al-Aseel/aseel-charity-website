import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الأرشيف | جمعية أصيل",
  description: "أرشيف شامل للأخبار والبرامج عبر السنوات من جمعية أصيل",
  alternates: { canonical: "/archive" },
  openGraph: {
    title: "الأرشيف | جمعية أصيل",
    description: "أرشيف شامل للأخبار والبرامج عبر السنوات من جمعية أصيل",
    url: "/archive",
    type: "website",
  },
};

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
