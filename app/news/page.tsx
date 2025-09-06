"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/components/language-provider";
import { api, getImageUrl } from "@/lib/api";
import { Activity, ActivitiesData } from "@/lib/types";
import Link from "next/link";
import NewsSkeleton from "@/components/news-skeleton";
import PartnersSection from "@/components/partners-section";

export default function NewsPage() {
  const { language, t } = useLanguage();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "new" | "activity">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching activities with pagination...", {
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        filter: filterType,
      });

      const response = await api.getActivitiesPaginated(
        currentPage,
        itemsPerPage,
        searchTerm
      );
      console.log("Paginated activities response:", response);

      if (response.data) {
        if (Array.isArray(response.data)) {
          // Handle direct array response
          setActivities(response.data);
          setTotalPages(1);
          setTotalItems(response.data.length);
        } else if (
          response.data.activities &&
          Array.isArray(response.data.activities)
        ) {
          // Handle structured response with pagination
          setActivities(response.data.activities);
          if (response.data.pagination) {
            setTotalPages(response.data.pagination.totalPages || 1);
            setTotalItems(
              response.data.pagination.total || response.data.activities.length
            );
          } else {
            setTotalPages(1);
            setTotalItems(response.data.activities.length);
          }
        } else {
          setError("لا توجد أنشطة متاحة");
        }
      } else {
        setError("لا توجد أنشطة متاحة");
      }
    } catch (err) {
      console.error("Error fetching activities:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("فشل في تحميل الأنشطة");
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, searchTerm]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  // Handle search with debounce
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  // Handle filter change
  const handleFilterChange = useCallback((type: "all" | "new" | "activity") => {
    setFilterType(type);
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Handle items per page change
  const handleItemsPerPageChange = useCallback((value: string) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1); // Reset to first page
  }, []);

  // Filter activities based on type (client-side filtering for type)
  const filteredActivities = activities.filter((activity) => {
    const matchesType = filterType === "all" || activity.type === filterType;
    return matchesType;
  });

  if (loading) {
    return (
      <div className="min-h-screen">
        <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {language === "ar" ? "الأخبار والأنشطة" : "News & Activities"}
              </h1>
              <p className="text-xl text-muted-foreground">
                {language === "ar"
                  ? "تابع آخر أخبار وأنشطة الجمعية"
                  : "Follow the latest news and activities"}
              </p>
            </div>
            <NewsSkeleton count={6} />
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === "ar" ? "خطأ" : "Error"}
          </h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            {language === "ar" ? "إعادة المحاولة" : "Retry"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {language === "ar" ? "الأخبار والأنشطة" : "News & Activities"}
            </h1>
            <p className="text-xl text-muted-foreground">
              {language === "ar"
                ? "تابع آخر أخبار وأنشطة الجمعية"
                : "Follow the latest news and activities"}
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 rtl:right-3 rtl:left-auto" />
                <Input
                  placeholder={
                    language === "ar"
                      ? "البحث في الأخبار والأنشطة..."
                      : "Search news and activities..."
                  }
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 rtl:pr-10 rtl:pl-3"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterType === "all" ? "default" : "outline"}
                  onClick={() => handleFilterChange("all")}
                  size="sm"
                >
                  {language === "ar" ? "الكل" : "All"}
                </Button>
                <Button
                  variant={filterType === "new" ? "default" : "outline"}
                  onClick={() => handleFilterChange("new")}
                  size="sm"
                >
                  {language === "ar" ? "الأخبار" : "News"}
                </Button>
                <Button
                  variant={filterType === "activity" ? "default" : "outline"}
                  onClick={() => handleFilterChange("activity")}
                  size="sm"
                >
                  {language === "ar" ? "الأنشطة" : "Activities"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-muted-foreground">
                {language === "ar"
                  ? `تم العثور على ${totalItems} نتيجة`
                  : `Found ${totalItems} results`}
              </p>
              <p className="text-sm text-muted-foreground">
                {language === "ar"
                  ? `الصفحة ${currentPage} من ${totalPages}`
                  : `Page ${currentPage} of ${totalPages}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {language === "ar" ? "عرض" : "Show"}
              </span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={handleItemsPerPageChange}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="18">18</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">
                {language === "ar" ? "لكل صفحة" : "per page"}
              </span>
            </div>
          </div>

          {filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredActivities.map((activity, index) => (
                <motion.div
                  key={activity._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <img
                        src={
                          activity.coverImage?.url
                            ? getImageUrl(activity.coverImage.url)
                            : "/placeholder.svg"
                        }
                        alt={activity.name || "Activity image"}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder.svg";
                        }}
                      />
                      <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto">
                        <Badge
                          className={
                            activity.type === "new"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }
                        >
                          {activity.type === "new"
                            ? language === "ar"
                              ? "خبر"
                              : "News"
                            : language === "ar"
                              ? "نشاط"
                              : "Activity"}
                        </Badge>
                      </div>
                      {activity.isSpecial && (
                        <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto">
                          <Badge
                            variant="secondary"
                            className="bg-yellow-100 text-yellow-800"
                          >
                            {language === "ar" ? "مميز" : "Special"}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        {activity.createdAt
                          ? new Date(activity.createdAt).toLocaleDateString(
                              language === "ar" ? "ar-EG" : "en-US"
                            )
                          : "تاريخ غير محدد"}
                      </div>
                      <h3 className="font-semibold text-lg leading-tight">
                        {activity.name}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {activity.description}
                      </p>
                      {activity.keywords && activity.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {activity.keywords.slice(0, 3).map((keyword, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {keyword}
                            </Badge>
                          ))}
                          {activity.keywords.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{activity.keywords.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        className="p-0 h-auto font-medium text-primary-custom hover:text-primary-custom/80"
                        asChild
                      >
                        <Link href={`/news/${activity._id}`}>
                          {language === "ar" ? "اقرأ المزيد" : "Read More"}
                          <ArrowRight className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">
                {language === "ar" ? "لا توجد نتائج" : "No results found"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {language === "ar"
                  ? "جرب البحث بكلمات مختلفة أو قم بتغيير الفلتر"
                  : "Try searching with different keywords or change the filter"}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  handleSearch("");
                  handleFilterChange("all");
                }}
              >
                {language === "ar" ? "إعادة تعيين البحث" : "Reset Search"}
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8">
                <div className="flex flex-col items-center space-y-6">
                  {/* Pagination Info */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">
                      {language === "ar"
                        ? "التنقل بين الصفحات"
                        : "Page Navigation"}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === "ar"
                        ? `الصفحة ${currentPage} من ${totalPages} - إجمالي ${totalItems} نتيجة`
                        : `Page ${currentPage} of ${totalPages} - Total ${totalItems} results`}
                    </p>
                  </div>

                  {/* Pagination Controls */}
                  <div className="flex items-center justify-center gap-3">
                    {/* Previous Button */}
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 hover:border-primary/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <span className="font-medium">
                        {language === "ar" ? "السابق" : "Previous"}
                      </span>
                    </Button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-xl p-2">
                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
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
                                currentPage === pageNum ? "default" : "ghost"
                              }
                              size="lg"
                              onClick={() => handlePageChange(pageNum)}
                              className={`w-12 h-12 rounded-xl font-semibold text-lg transition-all duration-300 ${
                                currentPage === pageNum
                                  ? "bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40"
                                  : "hover:bg-primary/10 hover:text-primary"
                              }`}
                            >
                              {pageNum}
                            </Button>
                          );
                        }
                      )}
                    </div>

                    {/* Next Button */}
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 hover:border-primary/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="font-medium">
                        {language === "ar" ? "التالي" : "Next"}
                      </span>
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Quick Jump */}
                  {totalPages > 10 && (
                    <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-primary/10 shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold text-sm">
                            📄
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {language === "ar"
                            ? "انتقل إلى الصفحة:"
                            : "Jump to page:"}
                        </span>
                      </div>
                      <Select
                        value={currentPage.toString()}
                        onValueChange={(value) =>
                          handlePageChange(parseInt(value))
                        }
                      >
                        <SelectTrigger className="w-24 h-12 bg-white/80 border-2 border-primary/20 rounded-xl font-semibold text-center hover:border-primary/40 transition-all duration-300 focus:border-primary/60 focus:ring-2 focus:ring-primary/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white/95 backdrop-blur-md border border-primary/20 rounded-xl shadow-xl max-h-60">
                          {Array.from({ length: totalPages }, (_, i) => (
                            <SelectItem
                              key={i + 1}
                              value={(i + 1).toString()}
                              className="hover:bg-primary/10 hover:text-primary font-medium transition-colors duration-200 cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-sm">📄</span>
                                <span>
                                  {language === "ar" ? "الصفحة" : "Page"}{" "}
                                  {i + 1}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />
    </div>
  );
}
