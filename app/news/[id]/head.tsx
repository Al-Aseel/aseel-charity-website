import type { Metadata } from "next";
import { api, getImageUrl } from "@/lib/api";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const res = await api.getActivityById(params.id);
    const item = res.data;
    const title = item?.name || "خبر";
    const description = item?.description || "تفاصيل الخبر";
    const image = item?.coverImage?.url
      ? getImageUrl(item.coverImage.url)
      : "/placeholder-logo.png";
    const urlBase = process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000";

    return {
      title,
      description,
      alternates: { canonical: `/news/${params.id}` },
      openGraph: {
        title,
        description,
        type: "article",
        url: `${urlBase}/news/${params.id}`,
        images: [{ url: image }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  } catch {
    return {
      title: "خبر",
      description: "تفاصيل الخبر",
    };
  }
}

export default function Head() {
  return null;
}
