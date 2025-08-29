"use client"
import HeroSection from "@/components/hero-section"
import NewsSection from "@/components/news-section"
import PartnersSection from "@/components/partners-section"
import StatsSection from "@/components/stats-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <NewsSection />
      <PartnersSection />
    </div>
  )
}
