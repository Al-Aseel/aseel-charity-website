import type { Metadata } from "next";

type Props = { children: React.ReactNode; params: { id: string } };

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Archive detail is mock/local; provide generic metadata
  return {
    title: `عنصر أرشيف #${params.id}`,
    description: "تفاصيل العنصر من أرشيف الجمعية",
    alternates: { canonical: `/archive/${params.id}` },
    openGraph: {
      title: `عنصر أرشيف #${params.id}`,
      description: "تفاصيل العنصر من أرشيف الجمعية",
      type: "article",
      url:
        (process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000") +
        `/archive/${params.id}`,
    },
  };
}

export default function ArchiveItemLayout({ children }: Props) {
  return children;
}
