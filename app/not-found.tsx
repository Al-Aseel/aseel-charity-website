"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, MapPin } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export default function NotFound() {
  const { language, t } = useLanguage();

  const isArabic = language === "ar";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.8,
          }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold text-primary/20 select-none">
            {isArabic ? "٤٠٤" : "404"}
          </h1>
        </motion.div>

        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2,
            duration: 0.8,
          }}
          className="mb-6"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {isArabic ? "الصفحة غير موجودة" : "Page Not Found"}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isArabic
              ? "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر."
              : "Sorry, the page you're looking for doesn't exist or has been moved."}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.4,
            duration: 0.8,
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <Button asChild size="lg" className="group">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-5 w-5 transition-transform group-hover:scale-110" />
              {isArabic ? "العودة للرئيسية" : "Back to Home"}
            </Link>
          </Button>

          <Button variant="outline" asChild size="lg" className="group">
            <Link href="/search" className="flex items-center gap-2">
              <Search className="h-5 w-5 transition-transform group-hover:scale-110" />
              {isArabic ? "البحث" : "Search"}
            </Link>
          </Button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.6,
            duration: 0.8,
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto"
        >
          <Link
            href="/about"
            className="group p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {isArabic ? "من نحن" : "About Us"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isArabic
                    ? "تعرف على جمعيتنا"
                    : "Learn about our association"}
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/programs"
            className="group p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <ArrowLeft className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {isArabic ? "برامجنا" : "Our Programs"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isArabic ? "اكتشف مشاريعنا" : "Discover our projects"}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 text-muted-foreground/50 text-sm">
            <div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse"></div>
            <span>
              {isArabic ? "جمعية أصيل الخيرية" : "Aseel Charity Association"}
            </span>
            <div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
