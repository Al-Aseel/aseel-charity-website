import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اتصل بنا | جمعية أصيل",
  description:
    "تواصل مع جمعية أصيل للتنمية الخيرية للاستفسارات والمقترحات والدعم",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "اتصل بنا | جمعية أصيل",
    description:
      "تواصل مع جمعية أصيل للتنمية الخيرية للاستفسارات والمقترحات والدعم",
    url: "/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
