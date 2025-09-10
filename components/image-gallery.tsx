"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

interface ImageGalleryProps {
  images: string[];
  captions?: { ar: string; en: string }[];
  title?: string;
}

export default function ImageGallery({
  images,
  captions,
  title,
}: ImageGalleryProps) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const { language } = useLanguage();

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
    setZoom(1);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setOpen(false);
    setZoom(1);
    // Restore body scroll
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
  };

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "+" || e.key === "=") zoomIn();
    if (e.key === "-") zoomOut();
  };

  return (
    <div>
      {title && <h3 className="text-xl font-bold mb-6">{title}</h3>}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="group cursor-pointer relative overflow-hidden rounded-lg aspect-video bg-gray-100"
            onClick={() => openLightbox(idx)}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={captions?.[idx]?.[language] || `Image ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                  <ZoomIn className="w-6 h-6 text-gray-800" />
                </div>
              </div>
            </div>

            {/* Caption overlay */}
            {captions?.[idx] && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium">
                  {captions[idx][language]}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}

            {/* Zoom Controls */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={zoomOut}
                disabled={zoom <= 0.5}
              >
                <ZoomOut className="w-5 h-5" />
              </Button>
              <span className="text-white text-sm px-2 py-1 bg-black/50 rounded">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={zoomIn}
                disabled={zoom >= 3}
              >
                <ZoomIn className="w-5 h-5" />
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="absolute bottom-4 right-4 z-10 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = images[currentIndex];
                  link.download = `image-${currentIndex + 1}.jpg`;
                  link.click();
                }}
              >
                <Download className="w-5 h-5" />
              </Button>

              {/* Share Dropdown */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <Share2 className="w-5 h-5" />
                </Button>

                {/* Share Menu */}
                <div className="absolute bottom-full right-0 mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white rounded-lg shadow-lg p-2 min-w-[200px]">
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        const text =
                          captions?.[currentIndex]?.[language] ||
                          `Image ${currentIndex + 1}`;
                        const url = window.location.href;
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
                          "_blank",
                          "width=600,height=400"
                        );
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">f</span>
                      </div>
                      {language === "ar"
                        ? "مشاركة على فيسبوك"
                        : "Share on Facebook"}
                    </button>

                    <button
                      onClick={() => {
                        const text =
                          captions?.[currentIndex]?.[language] ||
                          `Image ${currentIndex + 1}`;
                        const url = window.location.href;
                        window.open(
                          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
                          "_blank",
                          "width=600,height=400"
                        );
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <div className="w-5 h-5 bg-sky-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">𝕏</span>
                      </div>
                      {language === "ar"
                        ? "مشاركة على تويتر"
                        : "Share on Twitter"}
                    </button>

                    <button
                      onClick={() => {
                        const text =
                          captions?.[currentIndex]?.[language] ||
                          `Image ${currentIndex + 1}`;
                        const url = window.location.href;
                        const whatsappText = `${text} ${url}`;
                        window.open(
                          `https://wa.me/?text=${encodeURIComponent(whatsappText)}`,
                          "_blank"
                        );
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">W</span>
                      </div>
                      {language === "ar"
                        ? "مشاركة على واتساب"
                        : "Share on WhatsApp"}
                    </button>

                    <button
                      onClick={() => {
                        const text =
                          captions?.[currentIndex]?.[language] ||
                          `Image ${currentIndex + 1}`;
                        const url = window.location.href;
                        const shareText = `${text} - ${url}`;

                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(shareText).then(() => {
                            // يمكنك إضافة إشعار هنا
                            alert(
                              language === "ar"
                                ? "تم نسخ الرابط!"
                                : "Link copied!"
                            );
                          });
                        } else {
                          // Fallback for older browsers
                          const textArea = document.createElement("textarea");
                          textArea.value = shareText;
                          document.body.appendChild(textArea);
                          textArea.select();
                          document.execCommand("copy");
                          document.body.removeChild(textArea);
                          alert(
                            language === "ar"
                              ? "تم نسخ الرابط!"
                              : "Link copied!"
                          );
                        }
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <div className="w-5 h-5 bg-gray-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">📋</span>
                      </div>
                      {language === "ar" ? "نسخ الرابط" : "Copy Link"}
                    </button>

                    {/* Native Share API (if supported) */}
                    {typeof navigator !== "undefined" && navigator.share && (
                      <button
                        onClick={async () => {
                          try {
                            await navigator.share({
                              title:
                                captions?.[currentIndex]?.[language] ||
                                `Image ${currentIndex + 1}`,
                              text:
                                captions?.[currentIndex]?.[language] ||
                                `Image ${currentIndex + 1}`,
                              url: window.location.href,
                            });
                          } catch (error) {
                            console.log("Error sharing:", error);
                          }
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
                          <Share2 className="w-3 h-3 text-white" />
                        </div>
                        {language === "ar" ? "مشاركة أخرى" : "More Options"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Image */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full flex flex-col items-center justify-center px-4"
            >
              <div
                className="relative overflow-hidden rounded-lg shadow-2xl"
                style={{ transform: `scale(${zoom})` }}
              >
                <img
                  src={images[currentIndex] || "/placeholder.svg"}
                  alt={
                    captions?.[currentIndex]?.[language] ||
                    `Image ${currentIndex + 1}`
                  }
                  className="max-w-[85vw] max-h-[75vh] w-auto h-auto object-contain"
                  onDoubleClick={() => (zoom === 1 ? zoomIn() : setZoom(1))}
                />
              </div>

              {/* Caption */}
              {captions?.[currentIndex] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center max-w-2xl"
                >
                  <p className="text-white text-lg font-medium">
                    {captions[currentIndex][language]}
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-4 z-10 text-white text-sm bg-black/50 px-3 py-1 rounded">
                {currentIndex + 1} / {images.length}
              </div>
            )}

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 max-w-[80vw] overflow-x-auto">
                {images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setZoom(1);
                    }}
                    className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-colors ${
                      idx === currentIndex
                        ? "border-white"
                        : "border-transparent opacity-60 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
