"use client";

import { useRef, useEffect, useState } from "react";
import {
  Swiper as SwiperCore,
  SwiperSlide as SwiperSlideCore,
} from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import Image from "next/image";
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

  // Ensure navigation refs are attached after Swiper and buttons mount
  useEffect(() => {
    const swiper = swiperRef.current;
    const prevEl = prevRef.current;
    const nextEl = nextRef.current;

    if (!swiper || !prevEl || !nextEl) return;

    if (
      typeof swiper.params.navigation !== "boolean" &&
      swiper.params.navigation
    ) {
      swiper.params.navigation.prevEl = prevEl;
      swiper.params.navigation.nextEl = nextEl;
      // Re-init navigation to bind events to the newly assigned elements
      try {
        // Destroy first to avoid duplicate handlers if any
        swiper.navigation.destroy();
      } catch (_) {
        // ignore if not initialized yet
      }
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiperRef.current, prevRef.current, nextRef.current]);

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

  // Show empty/error state when no slides available
  if (error || slides.length === 0) {
    return (
      <section className="relative h-[90vh] overflow-hidden">
        {/* Placeholder background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/placeholder.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

        {/* Centered glass card */}
        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="mx-auto w-full max-w-xl rounded-2xl border border-[hsl(var(--primary)/0.25)] bg-background/60 backdrop-blur-md shadow-[0_10px_40px_hsl(var(--primary)/0.20)] p-8 text-center text-white">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-white/15 border border-white/20 flex items-center justify-center">
                <ImageOff className="w-8 h-8 text-white/90" />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {language === "ar"
                  ? "لا توجد صور متاحة الآن"
                  : "No images available"}
              </h2>
              <p className="text-white/80 mb-6">
                {language === "ar"
                  ? error
                    ? "حدث خطأ أثناء تحميل الصور. يرجى المحاولة لاحقاً."
                    : "سيتم عرض الشرائح هنا عند توفر صور."
                  : error
                    ? "An error occurred while loading images. Please try later."
                    : "Slides will appear here when images are available."}
              </p>
              <div className="flex items-center justify-center">
                <Button
                  size="lg"
                  className="bg-primary-custom hover:bg-primary-custom/90 transform hover:scale-105 transition-all duration-300 text-lg px-6 py-2 shadow-lg hover:shadow-xl"
                  asChild
                >
                  <Link
                    href="/programs"
                    className="inline-flex items-center gap-2"
                  >
                    {language === "ar"
                      ? "تعرف على مشاريعنا"
                      : "Explore Our Projects"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[90vh] overflow-hidden">
      {/** Enable loop/autoplay only when we have 2+ slides to avoid Swiper warnings */}
      {/** Compute once here to reuse across props */}
      {(() => {
        return null;
      })()}
      {/* Load Swiper only on client to cut JS for bots/SSR */}
      <SwiperCore
        key={slides.length > 1 ? "swiper-loop" : "swiper-single"}
        onSwiper={handleSwiperInit}
        onBeforeInit={handleBeforeInit}
        modules={
          slides.length > 1
            ? [Navigation, Pagination, Autoplay, EffectFade]
            : [EffectFade]
        }
        spaceBetween={0}
        slidesPerView={1}
        loop={slides.length > 1}
        autoplay={
          slides.length > 1
            ? {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        speed={800}
        navigation={
          slides.length > 1
            ? {
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }
            : false
        }
        pagination={
          slides.length > 1
            ? {
                clickable: true,
                bulletClass: "swiper-pagination-bullet hero-bullet",
                bulletActiveClass:
                  "swiper-pagination-bullet-active hero-bullet-active",
              }
            : false
        }
        allowTouchMove={slides.length > 1}
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
        {slides.map((slide, index) => (
          <SwiperSlideCore key={slide.id}>
            <div className="relative h-full">
              {/* Use next/image for better LCP/SEO instead of CSS background */}
              <Image
                src={slide.image}
                alt={slide.title[language] || ""}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

              <div className="relative h-full flex items-center justify-end">
                <div className="container mx-auto px-10">
                  {(() => {
                    const titleText = slide.title[language]?.trim();
                    const subtitleText = slide.subtitle[language]?.trim();
                    const hasText = Boolean(titleText || subtitleText);

                    return (
                      <div className=" text-right ml-auto max-w-3xl text-white rtl:text-left">
                        {titleText && (
                          <h1 className="text-right text-2xl md:text-3xl lg:text-4xl font-bold mb-4 animate-fade-in-up leading-snug">
                            {titleText}
                          </h1>
                        )}

                        {subtitleText && (
                          <p className="text-right text-base md:text-lg lg:text-xl mb-6 leading-relaxed animate-fade-in-up animation-delay-200 opacity-90">
                            {subtitleText}
                          </p>
                        )}

                        {hasText && (
                          <div className="text-right animate-fade-in-up animation-delay-400">
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
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </SwiperSlideCore>
        ))}
      </SwiperCore>

      {/* No-JS fallback for SEO bots that don't execute JS: render first slide image */}
      <noscript>
        {slides[0] && (
          <div className="absolute inset-0">
            <img
              src={slides[0].image}
              alt={slides[0].title[language] || ""}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}
      </noscript>

      {/* Custom Navigation Arrows */}
      {slides.length > 1 && (
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
      )}

      {slides.length > 1 && (
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
      )}
    </section>
  );
}
