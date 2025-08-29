"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.programs": "البرامج والمشاريع",
    "nav.reports": "التقارير",
    "nav.archive": "الأرشيف",
    "nav.contact": "اتصل بنا",
    "nav.search": "البحث",

    // Home page
    "home.hero.title": "جمعية أصيل للتنمية الخيرية",
    "home.hero.subtitle":
      "نعمل من أجل تمكين الفئات المهمشة ودعم صمود المجتمع الفلسطيني",
    "home.hero.cta": "تعرف على مشاريعنا",
    "home.news.title": "آخر الأخبار والأنشطة",
    "home.partners.title": "شركاؤنا في التنمية",

    // About page
    "about.title": "من نحن",
    "about.vision.title": "رؤيتنا",
    "about.mission.title": "رسالتنا",
    "about.values.title": "قيمنا",

    // Programs page
    "programs.title": "البرامج والمشاريع",
    "programs.current": "المشاريع الحالية",
    "programs.completed": "المشاريع المنفذة",

    // Reports page
    "reports.title": "التقارير",
    "reports.administrative": "التقارير الإدارية",
    "reports.media": "التقارير الإعلامية",

    // Archive page
    "archive.title": "الأرشيف",
    "archive.filter": "فلترة المحتوى",

    // Contact page
    "contact.title": "اتصل بنا",
    "contact.form.name": "الاسم",
    "contact.form.email": "البريد الإلكتروني",
    "contact.form.message": "الرسالة",
    "contact.form.send": "إرسال",

    // Search
    "search.placeholder": "ابحث في الموقع...",
    "search.results": "نتائج البحث",
    "search.no-results": "لا توجد نتائج",

    // Common
    "common.read-more": "اقرأ المزيد",
    "common.download": "تحميل",
    "common.view-all": "عرض الكل",
    "common.back": "العودة",
    "common.next": "التالي",
    "common.previous": "السابق",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.programs": "Programs & Projects",
    "nav.reports": "Reports",
    "nav.archive": "Archive",
    "nav.contact": "Contact Us",
    "nav.search": "Search",

    // Home page
    "home.hero.title": "Aseel Charitable Development Association",
    "home.hero.subtitle":
      "Working to empower marginalized groups and support Palestinian community resilience",
    "home.hero.cta": "Explore Our Projects",
    "home.news.title": "Latest News & Activities",
    "home.partners.title": "Our Development Partners",

    // About page
    "about.title": "About Us",
    "about.vision.title": "Our Vision",
    "about.mission.title": "Our Mission",
    "about.values.title": "Our Values",

    // Programs page
    "programs.title": "Programs & Projects",
    "programs.current": "Current Projects",
    "programs.completed": "Completed Projects",

    // Reports page
    "reports.title": "Reports",
    "reports.administrative": "Administrative Reports",
    "reports.media": "Media Reports",

    // Archive page
    "archive.title": "Archive",
    "archive.filter": "Filter Content",

    // Contact page
    "contact.title": "Contact Us",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.send": "Send",

    // Search
    "search.placeholder": "Search the website...",
    "search.results": "Search Results",
    "search.no-results": "No results found",

    // Common
    "common.read-more": "Read More",
    "common.download": "Download",
    "common.view-all": "View All",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "ar" || savedLanguage === "en")) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
