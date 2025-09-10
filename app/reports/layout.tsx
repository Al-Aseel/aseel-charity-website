import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "التقارير | جمعية أصيل",
  description:
    "تقارير الجمعية المالية والإدارية والإعلامية متاحة للتصفح والتحميل",
  alternates: { canonical: "/reports" },
  openGraph: {
    title: "التقارير | جمعية أصيل",
    description:
      "تقارير الجمعية المالية والإدارية والإعلامية متاحة للتصفح والتحميل",
    url: "/reports",
    type: "website",
  },
};

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
