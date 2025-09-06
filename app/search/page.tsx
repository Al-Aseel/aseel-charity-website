"use client";

import React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Calendar, FileText, Users, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import PartnersSection from "@/components/partners-section";
import { useSearchParams } from "next/navigation";

// Mock search data
const searchData = [
  {
    id: 1,
    type: "news",
    title: {
      ar: "توزيع 500 طرد غذائي على الأسر المحتاجة",
      en: "Distribution of 500 food packages to needy families",
    },
    excerpt: {
      ar: "نفذت الجمعية حملة توزيع طرود غذائية شملت 500 أسرة من الأسر الأكثر احتياجاً",
      en: "The association implemented a food package distribution campaign for 500 families",
    },
    date: "2024-01-15",
    category: "relief",
  },
  {
    id: 2,
    type: "program",
    title: {
      ar: "برنامج التدريب المهني للشباب",
      en: "Youth Vocational Training Program",
    },
    excerpt: {
      ar: "برنامج تدريبي شامل لتأهيل الشباب في مختلف المهن والحرف",
      en: "Comprehensive training program to qualify youth in various professions",
    },
    date: "2023-09-01",
    category: "training",
  },
  {
    id: 3,
    type: "report",
    title: {
      ar: "التقرير السنوي 2023",
      en: "Annual Report 2023",
    },
    excerpt: {
      ar: "تقرير شامل عن أنشطة ومشاريع الجمعية خلال عام 2023",
      en: "Comprehensive report on association activities and projects during 2023",
    },
    date: "2024-01-01",
    category: "administrative",
  },
  {
    id: 4,
    type: "news",
    title: {
      ar: "افتتاح مركز التدريب المهني الجديد",
      en: "Opening of New Vocational Training Center",
    },
    excerpt: {
      ar: "تم افتتاح مركز جديد للتدريب المهني في شمال غزة",
      en: "A new vocational training center was opened in North Gaza",
    },
    date: "2024-01-10",
    category: "training",
  },
  {
    id: 5,
    type: "program",
    title: {
      ar: "برنامج تمكين النساء اقتصادياً",
      en: "Women Economic Empowerment Program",
    },
    excerpt: {
      ar: "دعم النساء في إقامة مشاريع صغيرة مدرة للدخل",
      en: "Supporting women in establishing small income-generating projects",
    },
    date: "2022-06-01",
    category: "empowerment",
  },
];

const contentTypes = [
  {
    id: "all",
    name: { ar: "جميع المحتويات", en: "All Content" },
    icon: FileText,
  },
  { id: "news", name: { ar: "الأخبار", en: "News" }, icon: FileText },
  { id: "program", name: { ar: "البرامج", en: "Programs" }, icon: Users },
  { id: "report", name: { ar: "التقارير", en: "Reports" }, icon: Award },
];

const categories = [
  { id: "all", name: { ar: "جميع الفئات", en: "All Categories" } },
  { id: "relief", name: { ar: "إغاثة", en: "Relief" } },
  { id: "training", name: { ar: "تدريب", en: "Training" } },
  { id: "empowerment", name: { ar: "تمكين", en: "Empowerment" } },
  { id: "administrative", name: { ar: "إداري", en: "Administrative" } },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchResults, setSearchResults] = useState(searchData);
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") ?? "";

  useEffect(() => {
    // لا تحدّث الحالة إلا إذا اختلفت قيمة معلمة q عن قيمة الحقل الحالي
    if (queryParam !== searchQuery) {
      setSearchQuery(queryParam);
      performSearch(queryParam);
    }
    // الاعتماد على قيمة queryParam فقط يضمن عدم الدخول في حلقة تحديث غير منتهية
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParam]);

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(searchData);
      return;
    }

    const filtered = searchData.filter((item) => {
      const titleMatch =
        item.title.ar.toLowerCase().includes(query.toLowerCase()) ||
        item.title.en.toLowerCase().includes(query.toLowerCase());
      const excerptMatch =
        item.excerpt.ar.toLowerCase().includes(query.toLowerCase()) ||
        item.excerpt.en.toLowerCase().includes(query.toLowerCase());
      const typeMatch = selectedType === "all" || item.type === selectedType;
      const categoryMatch =
        selectedCategory === "all" || item.category === selectedCategory;

      return (titleMatch || excerptMatch) && typeMatch && categoryMatch;
    });

    setSearchResults(filtered);
  };

  const handleSearch = () => {
    performSearch(searchQuery);
  };

  const getTypeIcon = (type: string) => {
    const typeObj = contentTypes.find((t) => t.id === type);
    return typeObj ? typeObj.icon : FileText;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "news":
        return "bg-blue-100 text-blue-800";
      case "program":
        return "bg-green-100 text-green-800";
      case "report":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeName = (type: string) => {
    const typeObj = contentTypes.find((t) => t.id === type);
    return typeObj ? typeObj.name[language] : type;
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
              {t("nav.search")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {language === "ar"
                ? "ابحث في جميع محتويات الموقع من أخبار وبرامج وتقارير"
                : "Search all website content including news, programs and reports"}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2">
                <Input
                  placeholder={t("search.placeholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="text-lg h-12"
                />
                <Button onClick={handleSearch} size="lg" className="px-8">
                  <Search className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                  {language === "ar" ? "بحث" : "Search"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Content Type Filter */}
            <div className="flex-1">
              <h3 className="font-medium mb-3 flex items-center">
                <Filter className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {language === "ar" ? "نوع المحتوى:" : "Content Type:"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {contentTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedType(type.id);
                      performSearch(searchQuery);
                    }}
                    className="flex items-center"
                  >
                    <type.icon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                    {type.name[language]}
                  </Button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex-1">
              <h3 className="font-medium mb-3">
                {language === "ar" ? "الفئة:" : "Category:"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={
                      selectedCategory === category.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(category.id);
                      performSearch(searchQuery);
                    }}
                  >
                    {category.name[language]}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">{t("search.results")}</h2>
            <p className="text-muted-foreground">
              {language === "ar"
                ? `تم العثور على ${searchResults.length} نتيجة`
                : `Found ${searchResults.length} results`}
              {searchQuery && (
                <span>
                  {language === "ar" ? ' لـ "' : ' for "'}
                  <strong>{searchQuery}</strong>"
                </span>
              )}
            </p>
          </div>

          {searchResults.length > 0 ? (
            <div className="space-y-6">
              {searchResults.map((result, index) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getTypeColor(result.type)}>
                              {getTypeName(result.type)}
                            </Badge>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                              {new Date(result.date).toLocaleDateString(
                                language === "ar" ? "ar-EG" : "en-US"
                              )}
                            </div>
                          </div>
                          <CardTitle className="text-xl hover:text-primary cursor-pointer">
                            {result.title[language]}
                          </CardTitle>
                        </div>
                        <div className="flex-shrink-0">
                          {React.createElement(getTypeIcon(result.type), {
                            className: "w-6 h-6 text-muted-foreground",
                          })}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {result.excerpt[language]}
                      </p>
                      <Button
                        variant="ghost"
                        className="p-0 h-auto font-medium text-primary hover:text-primary/80"
                      >
                        {t("common.read-more")}
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
                {t("search.no-results")}
              </h3>
              <p className="text-muted-foreground">
                {language === "ar"
                  ? "جرب استخدام كلمات مفتاحية مختلفة أو تعديل الفلاتر"
                  : "Try using different keywords or adjusting the filters"}
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
