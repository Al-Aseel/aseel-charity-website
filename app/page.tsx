import dynamic from "next/dynamic";
const HeroSection = dynamic(() => import("@/components/hero-section"), {
  ssr: true,
});
const StatsSection = dynamic(() => import("@/components/stats-section"), {
  ssr: false,
  loading: () => <div className="h-40" />,
});
const NewsSection = dynamic(() => import("@/components/news-section"), {
  ssr: false,
  loading: () => <div className="h-40" />,
});
const PartnersSection = dynamic(() => import("@/components/partners-section"), {
  ssr: false,
  loading: () => <div className="h-24" />,
});

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <NewsSection />
      <PartnersSection />
    </div>
  );
}
