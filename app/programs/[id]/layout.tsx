import type { Metadata } from "next";
import { api, getImageUrl } from "@/lib/api";

type Props = { children: React.ReactNode; params: { id: string } };

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const res = await api.getProgramById(params.id);
    const item = res.data;
    const title = item?.name || "برنامج";
    const description = item?.description || "تفاصيل البرنامج";
    const image = item?.coverImage?.url
      ? getImageUrl(item.coverImage.url)
      : "/placeholder-logo.png";
    const urlBase = process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000";

    return {
      title,
      description,
      alternates: { canonical: `/programs/${params.id}` },
      openGraph: {
        title,
        description,
        type: "article",
        url: `${urlBase}/programs/${params.id}`,
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
      title: "برنامج",
      description: "تفاصيل البرنامج",
    };
  }
}

export default function ProgramItemLayout({ children }: Props) {
  return children;
}
