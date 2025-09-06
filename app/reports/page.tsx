"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Calendar,
  FileText,
  Eye,
  Filter,
  Loader2,
  Search,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/components/language-provider";
import PartnersSection from "@/components/partners-section";
import { api, getImageUrl } from "@/lib/api";
import { Report } from "@/lib/types";

const reportTypes = [
  { id: "all", name: { ar: "جميع التقارير", en: "All Reports" } },
  {
    id: "financial",
    name: { ar: "التقارير المالية", en: "Financial Reports" },
  },
  {
    id: "management",
    name: { ar: "التقارير الإدارية", en: "Management Reports" },
  },
  { id: "media", name: { ar: "التقارير الإعلامية", en: "Media Reports" } },
];

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReports, setTotalReports] = useState(0);
  const { language, t } = useLanguage();

  // Fetch reports from API
  const fetchReports = async (
    page: number = 1,
    type: string = "all",
    search: string = ""
  ) => {
    try {
      setLoading(true);
      setError(null);

      // Log the parameters being sent
      console.log("Fetching reports with params:", {
        page,
        type,
        search: search.trim(),
        limit: 9,
      });

      const response = await api.getReports(
        page,
        9,
        search.trim() || undefined,
        type === "all" ? undefined : type
      );

      if (response.status === "success" || response.status === "sucsess") {
        setReports(response.data.reports);
        setCurrentPage(response.data.pagination.page);
        setTotalPages(response.data.pagination.totalPages);
        setTotalReports(response.data.pagination.total);
      } else {
        setError("Failed to fetch reports");
      }
    } catch (err) {
      console.error("Error fetching reports:", err);
      const errorMessage = searchQuery.trim()
        ? language === "ar"
          ? "فشل في البحث عن التقارير. يرجى المحاولة مرة أخرى."
          : "Failed to search reports. Please try again."
        : language === "ar"
          ? "فشل في تحميل التقارير. يرجى المحاولة مرة أخرى."
          : "Failed to load reports. Please try again later.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchReports(1, selectedType, searchQuery);
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [selectedType, searchQuery]);

  // Handle filter change
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  // Handle search change
  const handleSearchChange = (query: string) => {
    // Trim whitespace and normalize the search query
    const normalizedQuery = query.trim();
    setSearchQuery(normalizedQuery);
    setCurrentPage(1);
  };

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchReports(1, selectedType, searchQuery);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchReports(page, selectedType, searchQuery);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "financial":
        return "bg-green-100 text-green-800";
      case "management":
        return "bg-blue-100 text-blue-800";
      case "media":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case "financial":
        return language === "ar" ? "مالي" : "Financial";
      case "management":
        return language === "ar" ? "إداري" : "Management";
      case "media":
        return language === "ar" ? "إعلامي" : "Media";
      default:
        return type;
    }
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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
              {t("reports.title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {language === "ar"
                ? "تصفح وحمل التقارير الإدارية والمالية والإعلامية للجمعية"
                : "Browse and download administrative, financial and media reports of the association"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-6">
            <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder={
                    language === "ar"
                      ? "البحث في التقارير..."
                      : "Search reports..."
                  }
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">
                {language === "ar" ? "فلترة التقارير:" : "Filter Reports:"}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {reportTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={selectedType === type.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTypeChange(type.id)}
                >
                  {type.name[language]}
                </Button>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedType !== "all") && (
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">
                {language === "ar" ? "الفلاتر النشطة:" : "Active filters:"}
              </span>
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {language === "ar" ? "البحث:" : "Search:"} "{searchQuery}"
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="h-4 w-4 p-0 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              {selectedType !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {language === "ar" ? "النوع:" : "Type:"}{" "}
                  {
                    reportTypes.find((t) => t.id === selectedType)?.name[
                      language
                    ]
                  }
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTypeChange("all")}
                    className="h-4 w-4 p-0 ml-1"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Reports Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">
                {searchQuery
                  ? language === "ar"
                    ? "جاري البحث في التقارير..."
                    : "Searching reports..."
                  : language === "ar"
                    ? "جاري تحميل التقارير..."
                    : "Loading reports..."}
              </span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-red-500 text-lg mb-4">{error}</p>
              <Button onClick={() => fetchReports(currentPage, selectedType)}>
                {language === "ar" ? "إعادة المحاولة" : "Retry"}
              </Button>
            </motion.div>
          )}

          {/* Reports Grid */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reports.map((report, index) => (
                  <motion.div
                    key={report._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg bg-gray-100">
                        <div className="w-full h-full flex items-center justify-center">
                          <FileText className="w-16 h-16 text-gray-400" />
                        </div>
                        <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto">
                          <Badge className={getTypeColor(report.type)}>
                            {getTypeName(report.type)}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto">
                          <Badge variant="secondary" className="text-xs">
                            {report.status === "published"
                              ? language === "ar"
                                ? "منشور"
                                : "Published"
                              : language === "ar"
                                ? "مسودة"
                                : "Draft"}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader>
                        <CardTitle className="text-lg leading-tight">
                          {report.title}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm">
                          {language === "ar" ? "بواسطة" : "By"} {report.author}
                        </p>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                            <span>
                              {new Date(report.createdAt).toLocaleDateString(
                                language === "ar" ? "ar-EG" : "en-US"
                              )}
                            </span>
                          </div>

                          {report.file && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <FileText className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                              <span>{formatFileSize(report.file.size)}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {report.file ? (
                            <>
                              <Button size="sm" className="flex-1" asChild>
                                <a
                                  href={getImageUrl(report.file.url)}
                                  download={report.file.originalName}
                                >
                                  <Download className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                                  {t("common.download")}
                                </a>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 bg-transparent"
                                asChild
                              >
                                <a
                                  href={getImageUrl(report.file.url)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Eye className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                                  {language === "ar" ? "عرض" : "View"}
                                </a>
                              </Button>
                            </>
                          ) : (
                            <div className="flex-1 text-center text-muted-foreground text-sm py-2">
                              {language === "ar"
                                ? "لا يوجد ملف"
                                : "No file available"}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {reports.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="max-w-md mx-auto">
                    <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg mb-2">
                      {searchQuery
                        ? language === "ar"
                          ? "لم يتم العثور على تقارير تطابق البحث"
                          : "No reports found matching your search"
                        : language === "ar"
                          ? "لا توجد تقارير تطابق المعايير المحددة"
                          : "No reports match the selected criteria"}
                    </p>
                    {searchQuery && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {language === "ar"
                          ? `البحث عن: "${searchQuery}"`
                          : `Searching for: "${searchQuery}"`}
                      </p>
                    )}
                    <div className="flex gap-2 justify-center">
                      {searchQuery && (
                        <Button variant="outline" onClick={clearSearch}>
                          {language === "ar" ? "مسح البحث" : "Clear Search"}
                        </Button>
                      )}
                      {selectedType !== "all" && (
                        <Button
                          variant="outline"
                          onClick={() => handleTypeChange("all")}
                        >
                          {language === "ar" ? "إزالة الفلتر" : "Remove Filter"}
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col items-center mt-12 gap-4">
                  {/* Pagination Info */}
                  <div className="text-sm text-muted-foreground">
                    {language === "ar"
                      ? `الصفحة ${currentPage} من ${totalPages}`
                      : `Page ${currentPage} of ${totalPages}`}
                  </div>

                  {/* Pagination Controls */}
                  <div className="flex items-center gap-2">
                    {/* First Page */}
                    {currentPage > 2 && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(1)}
                          className="w-10"
                        >
                          1
                        </Button>
                        {currentPage > 3 && (
                          <span className="text-muted-foreground">...</span>
                        )}
                      </>
                    )}

                    {/* Previous Page */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      {language === "ar" ? "السابق" : "Previous"}
                    </Button>

                    {/* Current Page and Adjacent Pages */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(
                        (page) =>
                          page === currentPage ||
                          page === currentPage - 1 ||
                          page === currentPage + 1
                      )
                      .map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className="w-10"
                        >
                          {page}
                        </Button>
                      ))}

                    {/* Next Page */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      {language === "ar" ? "التالي" : "Next"}
                    </Button>

                    {/* Last Page */}
                    {currentPage < totalPages - 1 && (
                      <>
                        {currentPage < totalPages - 2 && (
                          <span className="text-muted-foreground">...</span>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(totalPages)}
                          className="w-10"
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Quick Jump */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">
                      {language === "ar" ? "انتقل إلى:" : "Go to:"}
                    </span>
                    <select
                      value={currentPage}
                      onChange={(e) => handlePageChange(Number(e.target.value))}
                      className="px-2 py-1 border rounded text-sm"
                    >
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <option key={page} value={page}>
                            {page}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              )}

              {/* Results Info */}
              <div className="text-center mt-8 text-muted-foreground">
                <div className="mb-2">
                  {language === "ar"
                    ? `عرض ${reports.length} من ${totalReports} تقرير`
                    : `Showing ${reports.length} of ${totalReports} reports`}
                </div>

                {/* Active Parameters Display */}
                {(searchQuery || selectedType !== "all") && (
                  <div className="text-xs text-muted-foreground/70">
                    {language === "ar"
                      ? "المعاملات النشطة:"
                      : "Active parameters:"}
                    {searchQuery && (
                      <span className="ml-1">
                        {language === "ar" ? "البحث" : "Search"}: "{searchQuery}
                        "
                      </span>
                    )}
                    {selectedType !== "all" && (
                      <span className="ml-1">
                        {language === "ar" ? "النوع" : "Type"}:{" "}
                        {
                          reportTypes.find((t) => t.id === selectedType)?.name[
                            language
                          ]
                        }
                      </span>
                    )}
                    <span className="ml-1">
                      {language === "ar" ? "الصفحة" : "Page"}: {currentPage}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />
    </div>
  );
}
