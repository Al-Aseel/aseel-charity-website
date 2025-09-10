"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Target,
  ArrowLeft,
  Download,
  Share2,
  Heart,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/components/language-provider";
import ImageGallery from "@/components/image-gallery";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api, getImageUrl } from "@/lib/api";
import { Program } from "@/lib/types";

// Helper function to format budget
const formatBudget = (budget: number): string => {
  return `$${budget.toLocaleString()}`;
};

// Helper function to calculate duration
const calculateDuration = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the difference in years and months
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  // Adjust for day difference
  if (end.getDate() < start.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }

  // Format the result
  if (years > 0 && months > 0) {
    return `${years} ${years === 1 ? "سنة" : "سنة"} و ${months} ${months === 1 ? "شهر" : "شهر"}`;
  } else if (years > 0) {
    return `${years} ${years === 1 ? "سنة" : "سنة"}`;
  } else if (months > 0) {
    return `${months} ${months === 1 ? "شهر" : "شهر"}`;
  } else {
    return "أقل من شهر";
  }
};

// Helper function to calculate progress percentage
const calculateProgress = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  const totalTime = end.getTime() - start.getTime();
  const elapsedTime = now.getTime() - start.getTime();

  const progress = Math.min(Math.max((elapsedTime / totalTime) * 100, 0), 100);
  return Math.round(progress);
};

export default function ProgramDetailPage() {
  const params = useParams();
  const { language, t } = useLanguage();
  const programId = params.id as string;
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.getProgramById(programId);
        setProgram(response.data);
      } catch (err) {
        console.error("Error fetching program:", err);
        setError("فشل في تحميل البرنامج");
      } finally {
        setLoading(false);
      }
    };

    if (programId) {
      fetchProgram();
    }
  }, [programId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-lg">
            {language === "ar" ? "جاري التحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {error ||
              (language === "ar" ? "المشروع غير موجود" : "Program not found")}
          </h1>
          <Button asChild>
            <Link href="/programs">
              {language === "ar" ? "العودة للبرامج" : "Back to Programs"}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

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
          >
            <div className="mb-6">
              <Button variant="ghost" asChild className="mb-4">
                <Link href="/programs" className="flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {language === "ar" ? "العودة للبرامج" : "Back to Programs"}
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={getStatusColor(program.status)}>
                    {getStatusText(program.status)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {language === "ar" ? "بدأ في" : "Started on"}{" "}
                    {new Date(program.startDate).toLocaleDateString(
                      language === "ar" ? "ar-EG" : "en-US"
                    )}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {program.name}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {program.description}
                </p>

                <div className="flex flex-wrap gap-4 mt-6">
                  <Button size="lg" variant="outline">
                    <Share2 className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {language === "ar" ? "مشاركة" : "Share"}
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <Users className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-muted-foreground" />
                        <span>
                          {program.numberOfBeneficiary.toLocaleString()}{" "}
                          {language === "ar" ? "مستفيد" : "beneficiaries"}
                        </span>
                      </div>

                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-muted-foreground" />
                        <span>
                          {calculateDuration(
                            program.startDate,
                            program.endDate
                          )}
                        </span>
                      </div>

                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-muted-foreground" />
                        <span>{program.location}</span>
                      </div>

                      <div className="flex items-center text-sm">
                        <Target className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-muted-foreground" />
                        <span>{formatBudget(program.budget)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Image */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="aspect-video rounded-lg overflow-hidden"
          >
            <Image
              src={getImageUrl(program.coverImage?.url) || "/placeholder.svg"}
              alt={program.name}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">
                  {language === "ar" ? "وصف المشروع" : "Project Description"}
                </h2>
                <div
                  className="text-muted-foreground leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{ __html: program.content }}
                />
              </motion.div>

              {/* Objectives */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">
                  {language === "ar" ? "أهداف المشروع" : "Project Objectives"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {program.goals.map((goal, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 rtl:ml-3 rtl:mr-0 mt-1">
                            {index + 1}
                          </div>
                          <p className="text-sm">{goal}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>

              {/* Activities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">
                  {language === "ar" ? "الأنشطة الرئيسية" : "Main Activities"}
                </h2>
                <div className="space-y-3">
                  {program.activities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 bg-muted/30 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 rtl:ml-3 rtl:mr-0"></div>
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <ImageGallery
                  images={program.gallery.map((img) => getImageUrl(img.url))}
                  captions={program.gallery.map((_, index) => ({
                    ar: `صورة ${index + 1}`,
                    en: `Image ${index + 1}`,
                  }))}
                  title={language === "ar" ? "معرض الصور" : "Photo Gallery"}
                />
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Program Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "ar"
                        ? "معلومات المشروع"
                        : "Project Information"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                        <span className="font-medium">
                          {language === "ar" ? "المدير:" : "Manager:"}{" "}
                          {program.manager}
                        </span>
                      </div>
                      <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                        <span className="font-medium">
                          {language === "ar" ? "الحالة:" : "Status:"}{" "}
                          {getStatusText(program.status)}
                        </span>
                      </div>
                      <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                        <span className="font-medium">
                          {language === "ar" ? "تاريخ الإنشاء:" : "Created:"}{" "}
                          {new Date(program.createdAt).toLocaleDateString(
                            language === "ar" ? "ar-EG" : "en-US"
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Timeline */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "ar" ? "الجدول الزمني" : "Timeline"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3 rtl:ml-3 rtl:mr-0"></div>
                        <div>
                          <p className="font-medium">
                            {language === "ar"
                              ? "بداية المشروع"
                              : "Project Start"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(program.startDate).toLocaleDateString(
                              language === "ar" ? "ar-EG" : "en-US"
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 rtl:ml-3 rtl:mr-0"></div>
                        <div>
                          <p className="font-medium">
                            {language === "ar"
                              ? "نهاية المشروع"
                              : "Project End"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(program.endDate).toLocaleDateString(
                              language === "ar" ? "ar-EG" : "en-US"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "ar" ? "للاستفسار" : "For Inquiries"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {language === "ar"
                        ? "للمزيد من المعلومات حول هذا المشروع"
                        : "For more information about this project"}
                    </p>
                    <Button className="w-full" asChild>
                      <Link href="/contact">
                        {language === "ar" ? "اتصل بنا" : "Contact Us"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
