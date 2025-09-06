"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Filter,
  Calendar,
  MapPin,
  Users,
  Target,
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/components/language-provider";
import PartnersSection from "@/components/partners-section";
import Link from "next/link";
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
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPrograms, setTotalPrograms] = useState(0);
  const [limit] = useState(9); // Programs per page
  const { language, t } = useLanguage();

  const fetchPrograms = async (page: number = 1, search: string = "") => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getPrograms(page, limit, search);
      setPrograms(response.data.programs);
      setTotalPages(response.data.pagination.totalPages);
      setTotalPrograms(response.data.pagination.total);
      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching programs:", err);
      setError("فشل في تحميل البرامج");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms(1, searchTerm);
  }, []);

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    fetchPrograms(1, value);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    fetchPrograms(page, searchTerm);
  };

  // Note: Filtering is now handled by API, so we use programs directly
  const filteredPrograms = programs;

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

      {/* Search and Filters */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder={
                  language === "ar"
                    ? "البحث في البرامج..."
                    : "Search programs..."
                }
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

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
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="ml-2 text-lg">
                {language === "ar" ? "جاري التحميل..." : "Loading..."}
              </span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">{error}</p>
              <Button onClick={() => window.location.reload()} className="mt-4">
                {language === "ar" ? "إعادة المحاولة" : "Retry"}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program, index) => (
                <motion.div
                  key={program._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <img
                        src={
                          getImageUrl(program.coverImage?.url) ||
                          "/placeholder.svg"
                        }
                        alt={program.name}
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
                        {program.name}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {program.description}
                      </p>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                          <span>
                            {program.numberOfBeneficiary.toLocaleString()}{" "}
                            {language === "ar" ? "مستفيد" : "beneficiaries"}
                          </span>
                        </div>

                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                          <span>
                            {calculateDuration(
                              program.startDate,
                              program.endDate
                            )}
                          </span>
                        </div>

                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                          <span>{program.location}</span>
                        </div>

                        <div className="flex items-center text-sm text-muted-foreground">
                          <Target className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                          <span>{formatBudget(program.budget)}</span>
                        </div>
                      </div>

                      <Button
                        className="w-full mt-4 bg-transparent"
                        variant="outline"
                        asChild
                      >
                        <Link href={`/programs/${program._id}`}>
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
          )}

          {!loading && !error && filteredPrograms.length === 0 && (
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

          {/* Results Info and Pagination */}
          {!loading && !error && filteredPrograms.length > 0 && (
            <div className="mt-12">
              {/* Results Info */}
              <div className="text-center mb-6">
                <p className="text-muted-foreground">
                  {language === "ar"
                    ? `عرض ${(currentPage - 1) * limit + 1}-${Math.min(currentPage * limit, totalPrograms)} من ${totalPrograms} برنامج`
                    : `Showing ${(currentPage - 1) * limit + 1}-${Math.min(currentPage * limit, totalPrograms)} of ${totalPrograms} programs`}
                </p>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {language === "ar" ? "السابق" : "Previous"}
                  </Button>

                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={
                            currentPage === pageNum ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => handlePageChange(pageNum)}
                          className="w-10 h-10"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    {language === "ar" ? "التالي" : "Next"}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />
    </div>
  );
}
