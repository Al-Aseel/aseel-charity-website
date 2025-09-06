"use client";

import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { useSettings } from "@/components/settings-provider";
import { api, getImageUrl, ApiError } from "@/lib/api";
import { SliderImage, HeroSlide } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import "../styles/hero-section.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function HeroSection() {
  const { language } = useLanguage();
  const { getMainColor } = useSettings();
  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  // State for API data
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch slider images from API
  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.getSliderImages();

        // Check if response and data exist
        if (!response || !response.data) {
          throw new Error("Invalid API response structure");
        }

        // Check if data is an array (actual API structure)
        if (!Array.isArray(response.data)) {
          throw new Error("Data is not an array");
        }

        // Transform API data to component format
        const transformedSlides: HeroSlide[] = response.data
          .filter((item: SliderImage) => item.isActive && !item.isDeleted)
          .map((item: SliderImage) => ({
            id: item._id,
            title: {
              ar: item.title,
              en: item.title, // You might want to add English translation logic here
            },
            subtitle: {
              ar: item.description,
              en: item.description, // You might want to add English translation logic here
            },
            image: getImageUrl(item.image.url),
            cta: {
              ar: "تعرف على مشاريعنا",
              en: "Explore Our Projects",
            },
          }));

        setSlides(transformedSlides);
      } catch (err) {
        console.error("Error fetching slider images:", err);
        setError(
          err instanceof ApiError ? err.message : "حدث خطأ في تحميل الصور"
        );
        // No fallback - rely on server data only
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderImages();
  }, []);

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

  // Show loading state (skeleton)
  if (loading) {
    return (
      <section className="relative h-[90vh] overflow-hidden">
        {/* Background skeleton */}
        <Skeleton className="absolute inset-0 rounded-none" />
        {/* Gradient overlay to match hero style */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />

        {/* Centered content skeletons */}
        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto flex flex-col items-center gap-6 w-full max-w-4xl">
              {/* Title skeleton */}
              <Skeleton className="h-10 w-[80%] max-w-3xl" />
              {/* Subtitle skeleton */}
              <div className="w-full max-w-4xl flex flex-col items-center gap-3">
                <Skeleton className="h-6 w-[90%]" />
                <Skeleton className="h-6 w-[85%]" />
                <Skeleton className="h-6 w-[70%]" />
              </div>
              {/* Button skeleton */}
              <Skeleton className="h-12 w-44" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state when no slides available
  if (error || slides.length === 0) {
    return (
      <section className="relative h-[90vh] overflow-hidden flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">
            {language === "ar"
              ? "حدث خطأ في تحميل الصور"
              : "Error loading images"}
          </p>
          <p className="text-sm text-gray-500">
            {language === "ar"
              ? "يرجى المحاولة مرة أخرى لاحقاً"
              : "Please try again later"}
          </p>
        </div>
      </section>
    );
  }

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
        {slides.map((slide) => (
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
                      className="bg-primary-custom hover:bg-primary-custom/90 transform hover:scale-105 transition-all duration-300 text-lg px-8 py-3 shadow-lg hover:shadow-xl text-white"
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
