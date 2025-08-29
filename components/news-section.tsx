"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import Link from "next/link";

const newsItems = [
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
  },
];

export default function NewsSection() {
  const { language, t } = useLanguage();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("home.news.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === "ar"
              ? "تابع آخر أنشطتنا ومشاريعنا التي نقوم بها لخدمة المجتمع الفلسطيني"
              : "Follow our latest activities and projects that we carry out to serve the Palestinian community"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
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
                    <span className="bg-primary text-white px-2 py-1 rounded text-xs font-medium">
                      {item.category[language]}
                    </span>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline" asChild>
            <Link href="/archive">
              {t("common.view-all")}
              <ArrowRight className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
