"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Filter, Search } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import PartnersSection from "@/components/partners-section";
import Link from "next/link";

const allNews = [
  {
    id: 1,
    title: {
      ar: "توزيع 500 طرد غذائي على الأسر المحتاجة",
      en: "Distribution of 500 food packages to needy families",
    },
    excerpt: {
      ar: "نفذت الجمعية حملة توزيع طرود غذائية شملت 500 أسرة من الأسر الأكثر احتياجاً في قطاع غزة",
      en: "The association implemented a food package distribution campaign that included 500 families from the most needy families in Gaza Strip",
    },
    date: "2024-01-15",
    image: "/placeholder.svg?height=300&width=400",
    category: {
      ar: "إغاثة",
      en: "Relief",
    },
    views: 1250,
  },
  {
    id: 2,
    title: {
      ar: "افتتاح مركز التدريب المهني للشباب",
      en: "Opening of Youth Vocational Training Center",
    },
    excerpt: {
      ar: "تم افتتاح مركز جديد للتدريب المهني يهدف إلى تأهيل الشباب في مختلف المهن والحرف",
      en: "A new vocational training center was opened aimed at qualifying youth in various professions and crafts",
    },
    date: "2024-01-10",
    image: "/placeholder.svg?height=300&width=400",
    category: {
      ar: "تدريب",
      en: "Training",
    },
    views: 890,
  },
  {
    id: 3,
    title: {
      ar: "برنامج دعم المشاريع الصغيرة للنساء",
      en: "Small Business Support Program for Women",
    },
    excerpt: {
      ar: "إطلاق برنامج جديد لدعم النساء في إقامة مشاريع صغيرة مدرة للدخل",
      en: "Launch of a new program to support women in establishing small income-generating projects",
    },
    date: "2024-01-05",
    image: "/placeholder.svg?height=300&width=400",
    category: {
      ar: "تمكين اقتصادي",
      en: "Economic Empowerment",
    },
    views: 1100,
  },
];

const categories = [
  { id: "all", name: { ar: "جميع الأخبار", en: "All News" } },
  { id: "relief", name: { ar: "إغاثة", en: "Relief" } },
  { id: "training", name: { ar: "تدريب", en: "Training" } },
  {
    id: "empowerment",
    name: { ar: "تمكين اقتصادي", en: "Economic Empowerment" },
  },
];

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { language, t } = useLanguage();

  const filteredNews = allNews.filter((news) => {
    const searchMatch =
      !searchQuery ||
      news.title.ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.excerpt.ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.excerpt.en.toLowerCase().includes(searchQuery.toLowerCase());

    const categoryMatch =
      selectedCategory === "all" ||
      news.category.ar.toLowerCase().includes(selectedCategory) ||
      news.category.en.toLowerCase().includes(selectedCategory);

    return searchMatch && categoryMatch;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      إغاثة: "bg-red-100 text-red-800",
      Relief: "bg-red-100 text-red-800",
      تدريب: "bg-blue-100 text-blue-800",
      Training: "bg-blue-100 text-blue-800",
      "تمكين اقتصادي": "bg-green-100 text-green-800",
      "Economic Empowerment": "bg-green-100 text-green-800",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {language === "ar" ? "الأخبار والأنشطة" : "News & Activities"}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {language === "ar"
                ? "تابع آخر أخبار وأنشطة جمعية أصيل للتنمية الخيرية"
                : "Follow the latest news and activities of Aseel Charitable Development Association"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={
                  language === "ar" ? "ابحث في الأخبار..." : "Search news..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rtl:pr-10 rtl:pl-3"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={
                      selectedCategory === category.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name[language]}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title[language]}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto">
                        <Badge
                          className={getCategoryColor(item.category[language])}
                        >
                          {item.category[language]}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        {new Date(item.date).toLocaleDateString(
                          language === "ar" ? "ar-EG" : "en-US"
                        )}
                      </div>
                      <h3 className="font-semibold text-lg leading-tight">
                        {item.title[language]}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {item.excerpt[language]}
                      </p>
                      <Button
                        variant="ghost"
                        className="p-0 h-auto font-medium text-primary hover:text-primary/80"
                        asChild
                      >
                        <Link href={`/news/${item.id}`}>
                          {t("common.read-more")}
                          <ArrowRight className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {language === "ar" ? "لا توجد نتائج" : "No results found"}
              </h3>
              <p className="text-muted-foreground">
                {language === "ar"
                  ? "جرب تعديل معايير البحث"
                  : "Try adjusting your search criteria"}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />
    </div>
  );
}
