"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import "../styles/hero-section.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const heroSlides = [
  {
    id: 1,
    title: {
      ar: "تمكين المجتمع الفلسطيني",
      en: "Empowering Palestinian Community",
    },
    subtitle: {
      ar: "نعمل على تقديم المساعدات الإنسانية والتنموية للفئات الأكثر احتياجاً في قطاع غزة",
      en: "We work to provide humanitarian and developmental assistance to the most needy groups in Gaza Strip",
    },
    image: "/placeholder.svg?height=600&width=1200",
    cta: {
      ar: "تعرف على مشاريعنا",
      en: "Explore Our Projects",
    },
  },
  {
    id: 2,
    title: {
      ar: "دعم المشاريع الصغيرة",
      en: "Supporting Small Projects",
    },
    subtitle: {
      ar: "نساعد الأسر الفلسطينية على بناء مشاريع صغيرة مستدامة لتحسين أوضاعها الاقتصادية",
      en: "We help Palestinian families build sustainable small projects to improve their economic conditions",
    },
    image: "/placeholder.svg?height=600&width=1200",
    cta: {
      ar: "اكتشف البرامج",
      en: "Discover Programs",
    },
  },
  {
    id: 3,
    title: {
      ar: "التأهيل والتدريب",
      en: "Rehabilitation and Training",
    },
    subtitle: {
      ar: "برامج تدريبية متخصصة لتطوير قدرات الشباب والنساء في مختلف المجالات المهنية",
      en: "Specialized training programs to develop the capabilities of youth and women in various professional fields",
    },
    image: "/placeholder.svg?height=600&width=1200",
    cta: {
      ar: "انضم إلينا",
      en: "Join Us",
    },
  },
];

export default function HeroSection() {
  const { language } = useLanguage();
  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;
  };

  const handleBeforeInit = (swiper: SwiperType) => {
    if (
      typeof swiper.params.navigation !== "boolean" &&
      swiper.params.navigation
    ) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    }
  };

  return (
    <section className="relative h-[90vh] overflow-hidden">
      <Swiper
        onSwiper={handleSwiperInit}
        onBeforeInit={handleBeforeInit}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        speed={800}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet hero-bullet",
          bulletActiveClass:
            "swiper-pagination-bullet-active hero-bullet-active",
        }}
        className="h-full"
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        a11y={{
          prevSlideMessage:
            language === "ar" ? "الشريحة السابقة" : "Previous slide",
          nextSlideMessage:
            language === "ar" ? "الشريحة التالية" : "Next slide",
        }}
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

              <div className="relative h-full flex items-center justify-center">
                <div className="container mx-auto px-4 text-center text-white">
                  <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in-up leading-tight">
                    {slide.title[language]}
                  </h1>

                  <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200 opacity-90">
                    {slide.subtitle[language]}
                  </p>

                  <div className="animate-fade-in-up animation-delay-400">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 text-lg px-8 py-3 shadow-lg hover:shadow-xl"
                      asChild
                    >
                      <Link
                        href="/programs"
                        className="inline-flex items-center gap-2"
                      >
                        {slide.cta[language]}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button
        ref={prevRef}
        className="invisible md:visible absolute left-4 rtl:right-4 rtl:left-auto top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-10 group hover:scale-110"
        aria-label={language === "ar" ? "الشريحة السابقة" : "Previous slide"}
      >
        {language === "ar" ? (
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        ) : (
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        )}
      </button>

      <button
        ref={nextRef}
        className=" invisible md:visible absolute right-4 rtl:left-4 rtl:right-auto top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-10 group hover:scale-110"
        aria-label={language === "ar" ? "الشريحة التالية" : "Next slide"}
      >
        {language === "ar" ? (
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        ) : (
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        )}
      </button>
    </section>
  );
}
