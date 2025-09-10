import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "البرامج والمشاريع | جمعية أصيل",
  description: "استعرض برامج ومشاريع جمعية أصيل التنموية والإنسانية",
  alternates: { canonical: "/programs" },
  openGraph: {
    title: "البرامج والمشاريع | جمعية أصيل",
    description: "استعرض برامج ومشاريع جمعية أصيل التنموية والإنسانية",
    url: "/programs",
    type: "website",
  },
};

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
