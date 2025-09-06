"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Calendar, MapPin, Users, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import PartnersSection from "@/components/partners-section";
import Link from "next/link";

const programs = [
  {
    id: 1,
    title: {
      ar: "برنامج المساعدات الغذائية الطارئة",
      en: "Emergency Food Assistance Program",
    },
    description: {
      ar: "توفير المساعدات الغذائية العاجلة للأسر الأكثر احتياجاً في قطاع غزة",
      en: "Providing urgent food assistance to the most needy families in Gaza Strip",
    },
    status: "active",
    category: "relief",
    beneficiaries: 2500,
    duration: "12 شهر",
    location: {
      ar: "قطاع غزة",
      en: "Gaza Strip",
    },
    image: "/placeholder.svg?height=300&width=400",
    startDate: "2024-01-01",
    budget: "$150,000",
  },
  {
    id: 2,
    title: {
      ar: "مشروع التدريب المهني للشباب",
      en: "Youth Vocational Training Project",
    },
    description: {
      ar: "برنامج تدريبي شامل لتأهيل الشباب في مختلف المهن والحرف",
      en: "Comprehensive training program to qualify youth in various professions and crafts",
    },
    status: "active",
    category: "training",
    beneficiaries: 300,
    duration: "18 شهر",
    location: {
      ar: "غزة ورفح",
      en: "Gaza and Rafah",
    },
    image: "/placeholder.svg?height=300&width=400",
    startDate: "2023-09-01",
    budget: "$200,000",
  },
  {
    id: 3,
    title: {
      ar: "برنامج تمكين النساء اقتصادياً",
      en: "Women Economic Empowerment Program",
    },
    description: {
      ar: "دعم النساء في إقامة مشاريع صغيرة مدرة للدخل",
      en: "Supporting women in establishing small income-generating projects",
    },
    status: "completed",
    category: "empowerment",
    beneficiaries: 150,
    duration: "24 شهر",
    location: {
      ar: "شمال غزة",
      en: "North Gaza",
    },
    image: "/placeholder.svg?height=300&width=400",
    startDate: "2022-06-01",
    budget: "$120,000",
  },
  {
    id: 4,
    title: {
      ar: "مشروع الدعم النفسي للأطفال",
      en: "Psychological Support Project for Children",
    },
    description: {
      ar: "تقديم الدعم النفسي والاجتماعي للأطفال المتضررين من الأوضاع الصعبة",
      en: "Providing psychological and social support to children affected by difficult conditions",
    },
    status: "active",
    category: "support",
    beneficiaries: 500,
    duration: "15 شهر",
    location: {
      ar: "جميع محافظات غزة",
      en: "All Gaza Governorates",
    },
    image: "/placeholder.svg?height=300&width=400",
    startDate: "2023-11-01",
    budget: "$180,000",
  },
  {
    id: 5,
    title: {
      ar: "برنامج الرعاية الصحية الأولية",
      en: "Primary Healthcare Program",
    },
    description: {
      ar: "توفير خدمات الرعاية الصحية الأساسية للمجتمعات المحلية",
      en: "Providing basic healthcare services to local communities",
    },
    status: "completed",
    category: "health",
    beneficiaries: 1200,
    duration: "36 شهر",
    location: {
      ar: "خان يونس والوسطى",
      en: "Khan Younis and Middle Area",
    },
    image: "/placeholder.svg?height=300&width=400",
    startDate: "2021-03-01",
    budget: "$300,000",
  },
  {
    id: 6,
    title: {
      ar: "مشروع التعليم البديل",
      en: "Alternative Education Project",
    },
    description: {
      ar: "برنامج تعليمي بديل للأطفال المتسربين من المدارس",
      en: "Alternative educational program for children who dropped out of school",
    },
    status: "planning",
    category: "education",
    beneficiaries: 400,
    duration: "20 شهر",
    location: {
      ar: "رفح وخان يونس",
      en: "Rafah and Khan Younis",
    },
    image: "/placeholder.svg?height=300&width=400",
    startDate: "2024-06-01",
    budget: "$250,000",
  },
];

const categories = [
  { id: "all", name: { ar: "جميع البرامج", en: "All Programs" } },
  { id: "relief", name: { ar: "إغاثة", en: "Relief" } },
  { id: "training", name: { ar: "تدريب", en: "Training" } },
  { id: "empowerment", name: { ar: "تمكين", en: "Empowerment" } },
  { id: "support", name: { ar: "دعم نفسي", en: "Psychological Support" } },
  { id: "health", name: { ar: "صحة", en: "Health" } },
  { id: "education", name: { ar: "تعليم", en: "Education" } },
];

const statusOptions = [
  { id: "all", name: { ar: "جميع الحالات", en: "All Status" } },
  { id: "active", name: { ar: "نشط", en: "Active" } },
  { id: "completed", name: { ar: "مكتمل", en: "Completed" } },
  { id: "planning", name: { ar: "قيد التخطيط", en: "Planning" } },
];

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { language, t } = useLanguage();

  const filteredPrograms = programs.filter((program) => {
    const categoryMatch =
      selectedCategory === "all" || program.category === selectedCategory;
    const statusMatch =
      selectedStatus === "all" || program.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "planning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return language === "ar" ? "نشط" : "Active";
      case "completed":
        return language === "ar" ? "مكتمل" : "Completed";
      case "planning":
        return language === "ar" ? "قيد التخطيط" : "Planning";
      default:
        return status;
    }
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
              {t("programs.title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {language === "ar"
                ? "نقدم مجموعة متنوعة من البرامج والمشاريع التنموية والإنسانية لخدمة المجتمع الفلسطيني"
                : "We offer a diverse range of developmental and humanitarian programs and projects to serve the Palestinian community"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">
                {language === "ar" ? "فلترة البرامج:" : "Filter Programs:"}
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
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

              {/* Status Filter */}
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <Button
                    key={status.id}
                    variant={
                      selectedStatus === status.id ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedStatus(status.id)}
                  >
                    {status.name[language]}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={program.image || "/placeholder.svg"}
                      alt={program.title[language]}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto">
                      <Badge className={getStatusColor(program.status)}>
                        {getStatusText(program.status)}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg leading-tight">
                      {program.title[language]}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {program.description[language]}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                        <span>
                          {program.beneficiaries.toLocaleString()}{" "}
                          {language === "ar" ? "مستفيد" : "beneficiaries"}
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                        <span>{program.duration}</span>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                        <span>{program.location[language]}</span>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Target className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                        <span>{program.budget}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-4 bg-transparent"
                      variant="outline"
                      asChild
                    >
                      <Link href={`/programs/${program.id}`}>
                        {language === "ar"
                          ? "تفاصيل المشروع"
                          : "Project Details"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground text-lg">
                {language === "ar"
                  ? "لا توجد برامج تطابق المعايير المحددة"
                  : "No programs match the selected criteria"}
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
