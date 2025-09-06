"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import Link from "next/link";
import { motion } from "framer-motion";
import { api, getImageUrl } from "@/lib/api";
import type { PartnerItem } from "@/lib/types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const PLACEHOLDER_IMG = "/placeholder.svg?height=80&width=120";

interface PartnerCardProps {
  partner: PartnerItem;
}

export default function PartnersSection(): JSX.Element {
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const swiperRef = useRef<{ swiper: SwiperType } | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    let isMounted = true;
    const loadPartners = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const res = await api.getPartners();
        if (!isMounted) return;
        setPartners(res?.data?.partners || []);
      } catch (err) {
        if (!isMounted) return;
        setPartners([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadPartners();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAutoplayToggle = (): void => {
    if (swiperRef.current && swiperRef.current.swiper) {
      if (isAutoPlaying) {
        swiperRef.current.swiper.autoplay.stop();
      } else {
        swiperRef.current.swiper.autoplay.start();
      }
      setIsAutoPlaying(!isAutoPlaying);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const PartnerCard = ({ partner }: PartnerCardProps): JSX.Element => (
    <motion.div
      className="flex flex-col items-center group h-full"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Link
        target="_blank"
        href={partner.website || "#"}
        className="bg-white rounded-lg p-6 shadow-sm w-full h-32 flex items-center justify-center mb-4"
      >
        <motion.img
          src={getImageUrl(partner.logo?.url || PLACEHOLDER_IMG)}
          alt={language === "ar" ? partner.name_ar : partner.name_en}
          className="max-w-full max-h-full object-contain filter grayscale"
          whileHover={{ filter: "grayscale(0%)" }}
          transition={{ duration: 0.3 }}
        />
      </Link>
      <h3 className="font-medium text-center text-sm mb-2">
        {partner.name_ar || partner.name_en}
      </h3>
      {partner.name_en ? (
        <p className="text-xs text-muted-foreground text-center leading-relaxed line-clamp-2">
          {partner.name_en || partner.name_ar}
        </p>
      ) : null}
    </motion.div>
  );

  const MobilePartnerCard = ({ partner }: PartnerCardProps): JSX.Element => (
    <motion.div
      className="flex flex-col items-center group"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <div className="bg-white rounded-lg p-4 shadow-sm w-full h-20 flex items-center justify-center mb-3">
        <motion.img
          src={getImageUrl(partner.logo?.url || PLACEHOLDER_IMG)}
          alt={language === "ar" ? partner.name_ar : partner.name_en}
          className="max-w-full max-h-full object-contain filter grayscale"
          whileHover={{ filter: "grayscale(0%)" }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <h3 className="font-medium text-center text-xs mb-1">
        {language === "ar" ? partner.name_ar : partner.name_en}
      </h3>
      {partner.website ? (
        <p className="text-xs text-muted-foreground text-center line-clamp-2">
          {partner.website}
        </p>
      ) : null}
    </motion.div>
  );

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("home.partners.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === "ar"
              ? "نتعاون مع منظمات محلية وإقليمية ودولية لتحقيق أهدافنا التنموية والإنسانية"
              : "We collaborate with local, regional and international organizations to achieve our developmental and humanitarian goals"}
          </p>
        </motion.div>

        {/* Desktop Slider */}
        <div className="hidden md:block relative">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: `.swiper-button-prev-${language}`,
              nextEl: `.swiper-button-next-${language}`,
            }}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 5, spaceBetween: 24 },
            }}
            dir={language === "ar" ? "rtl" : "ltr"}
            className="partners-swiper"
            onAutoplayStart={() => setIsAutoPlaying(true)}
            onAutoplayStop={() => setIsAutoPlaying(false)}
          >
            {(isLoading ? Array.from({ length: 5 }) : partners).map(
              (partner, idx) => (
                <SwiperSlide key={(partner as PartnerItem)?._id || idx}>
                  {isLoading ? (
                    <div className="bg-white rounded-lg p-6 shadow-sm w-full h-32 flex items-center justify-center mb-4 animate-pulse" />
                  ) : (
                    <PartnerCard partner={partner as PartnerItem} />
                  )}
                </SwiperSlide>
              )
            )}
          </Swiper>

          {/* Custom Nav */}
          <Button
            variant="outline"
            size="sm"
            className={`swiper-button-prev-${language} absolute top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg z-10 ${
              language === "ar" ? "right-4" : "left-4"
            }`}
          >
            {language === "ar" ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`swiper-button-next-${language} absolute top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg z-10 ${
              language === "ar" ? "left-4" : "right-4"
            }`}
          >
            {language === "ar" ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Mobile Slider */}
        <div className="block md:hidden">
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            spaceBetween={16}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".swiper-button-prev-mobile",
              nextEl: ".swiper-button-next-mobile",
            }}
            dir={language === "ar" ? "rtl" : "ltr"}
            className="mobile-partners-swiper"
          >
            {Array.from({
              length: Math.ceil((partners.length || (isLoading ? 4 : 0)) / 2),
            }).map((_, slideIndex) => (
              <SwiperSlide key={slideIndex}>
                <div className="grid grid-cols-2 gap-4">
                  {(isLoading
                    ? Array.from({ length: 2 })
                    : partners.slice(slideIndex * 2, (slideIndex + 1) * 2)
                  ).map((partner, idx) =>
                    isLoading ? (
                      <div
                        key={idx}
                        className="bg-white rounded-lg p-4 shadow-sm w-full h-20 animate-pulse"
                      />
                    ) : (
                      <MobilePartnerCard
                        key={(partner as PartnerItem)._id}
                        partner={partner as PartnerItem}
                      />
                    )
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Mobile Nav */}
          <div className="flex justify-center mt-4 gap-4">
            <Button
              variant="outline"
              size="sm"
              className="swiper-button-prev-mobile bg-white/90 hover:bg-white shadow-lg"
            >
              {language === "ar" ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
              <span className="ml-2 rtl:mr-2 rtl:ml-0 text-xs">
                {language === "ar" ? "السابق" : "Previous"}
              </span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="swiper-button-next-mobile bg-white/90 hover:bg-white shadow-lg"
            >
              <span className="mr-2 rtl:ml-2 rtl:mr-0 text-xs">
                {language === "ar" ? "التالي" : "Next"}
              </span>
              {language === "ar" ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Auto-play Control */}
        <div className="flex justify-center mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAutoplayToggle}
            className="text-muted-foreground hover:text-foreground"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {language === "ar"
                  ? "إيقاف التشغيل التلقائي"
                  : "Pause Auto-play"}
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {language === "ar" ? "تشغيل تلقائي" : "Start Auto-play"}
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
