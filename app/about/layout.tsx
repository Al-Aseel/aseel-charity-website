import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن | جمعية أصيل للتنمية الخيرية",
  description:
    "تعرف على رؤية ورسالة وقيم جمعية أصيل للتنمية الخيرية ودورها في خدمة المجتمع الفلسطيني",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "من نحن | جمعية أصيل للتنمية الخيرية",
    description:
      "تعرف على رؤية ورسالة وقيم جمعية أصيل للتنمية الخيرية ودورها في خدمة المجتمع الفلسطيني",
    url: "/about",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
