"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Filter, Calendar, Search, Grid, List } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import PartnersSection from "@/components/partners-section";
import Link from "next/link";
import { api, getImageUrl } from "@/lib/api";
import type { Activity, Program } from "@/lib/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";

type ArchiveItem = Activity | (Program & { type?: string });

const contentTypes = [
  { id: "all", name: { ar: "جميع الأنواع", en: "All Types" } },
  { id: "program", name: { ar: "برامج", en: "Programs" } },
  { id: "activity", name: { ar: "أنشطة/أخبار", en: "Activities/News" } },
];

// Future: you can add categories/years filters when backend supports them

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [items, setItems] = useState<ArchiveItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<
    { name: string; ids: { id: string; type: string }[] }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string | "all">(
    "all"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { language, t } = useLanguage();

  // debounce search
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(id);
  }, [searchQuery]);

  // fetch archive
  useEffect(() => {
    let isCancelled = false;
    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const types =
          selectedType === "all" ? ["program", "activity"] : [selectedType];
        const res = await api.getArchive(
          page,
          limit,
          types,
          debouncedSearch,
          selectedCategory !== "all" ? selectedCategory : undefined
        );
        if (isCancelled) return;
        const data = res.data?.data || [];
        setItems(data as ArchiveItem[]);
        const totalCount = res.data?.pagination?.total ?? data.length;
        setTotal(totalCount);
        const serverTotalPages = res.data?.pagination?.totalPages;
        setTotalPages(
          serverTotalPages ?? Math.max(1, Math.ceil(totalCount / limit))
        );
        setCategories(res.data?.categories || []);
      } catch (e) {
        if (isCancelled) return;
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }
    load();
    return () => {
      isCancelled = true;
    };
  }, [page, limit, selectedType, debouncedSearch, selectedCategory]);

  // Reset to first page when filters or search change
  useEffect(() => {
    setPage(1);
  }, [selectedType, debouncedSearch, selectedCategory]);

  const getTypeColor = (type: string) => {
    const colors = {
      program: "bg-green-100 text-green-800",
      activity: "bg-blue-100 text-blue-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getTypeName = (type: string) => {
    const map: Record<string, { ar: string; en: string }> = {
      program: { ar: "برنامج", en: "Program" },
      activity: { ar: "نشاط/خبر", en: "Activity/News" },
    };
    return map[type]?.[language] || type;
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
              {t("archive.title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {language === "ar"
                ? "استعرض أرشيف شامل لجميع أنشطة ومشاريع الجمعية عبر السنوات"
                : "Browse a comprehensive archive of all association activities and projects over the years"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={
                  language === "ar" ? "ابحث في الأرشيف..." : "Search archive..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rtl:pr-10 rtl:pl-3"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
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
                    onClick={() => setSelectedType(type.id)}
                  >
                    {type.name[language]}
                  </Button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="flex-1">
              <h3 className="font-medium mb-3">
                {language === "ar" ? "الفئات:" : "Categories:"}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                >
                  {language === "ar" ? "الكل" : "All"}
                </Button>
                {categories.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-2">
                    {cat.ids?.map((entry) => (
                      <Button
                        key={`${cat.name}-${entry.id}-${entry.type}`}
                        variant={
                          selectedCategory === entry.id ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          setSelectedCategory(entry.id || "all");
                          setSelectedType(entry.type || "all");
                        }}
                        title={entry.type}
                      >
                        {`${cat.name} - ${entry.type === "program" ? (language === "ar" ? "برامج" : "Programs") : language === "ar" ? "أنشطة" : "Activities"}`}
                      </Button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              {language === "ar"
                ? `تم العثور على ${total} عنصر`
                : `Found ${total} items`}
            </p>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Archive Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="h-full">
                  <div className="aspect-video bg-muted/40 animate-pulse" />
                  <CardHeader>
                    <div className="h-5 w-2/3 bg-muted/40 animate-pulse rounded mb-2" />
                    <div className="h-4 w-1/3 bg-muted/40 animate-pulse rounded" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 w-full bg-muted/40 animate-pulse rounded mb-2" />
                    <div className="h-4 w-5/6 bg-muted/40 animate-pulse rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : items.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
              }
            >
              {items.map((item, index) => (
                <motion.div
                  key={(item as any)._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  {viewMode === "grid" ? (
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <img
                          src={
                            getImageUrl((item as any).coverImage?.url) ||
                            "/placeholder.svg"
                          }
                          alt={(item as any).name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto">
                          <Badge className={getTypeColor((item as any).type)}>
                            {getTypeName((item as any).type)}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg leading-tight">
                          {(item as any).name}
                        </CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                          {new Date((item as any).createdAt).toLocaleDateString(
                            language === "ar" ? "ar-EG" : "en-US"
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {(item as any).description}
                        </p>
                        <Button
                          variant="ghost"
                          className="p-0 h-auto font-medium text-primary hover:text-primary/80 mt-3"
                          asChild
                        >
                          <Link
                            href={`/${(item as any).type === "program" ? "programs" : "news"}/${(item as any)._id}`}
                          >
                            {t("common.read-more")}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="w-24 h-24 flex-shrink-0">
                            <img
                              src={
                                getImageUrl((item as any).coverImage?.url) ||
                                "/placeholder.svg"
                              }
                              alt={(item as any).name}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <Link
                                href={`/${(item as any).type === "program" ? "programs" : "news"}/${(item as any)._id}`}
                              >
                                <h3 className="font-semibold text-lg hover:text-primary transition-colors cursor-pointer">
                                  {(item as any).name}
                                </h3>
                              </Link>
                              <Badge
                                className={getTypeColor((item as any).type)}
                              >
                                {getTypeName((item as any).type)}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                              {(item as any).description}
                            </p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                              {new Date(
                                (item as any).createdAt
                              ).toLocaleDateString(
                                language === "ar" ? "ar-EG" : "en-US"
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
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
                  ? "جرب تعديل معايير البحث أو الفلاتر"
                  : "Try adjusting your search criteria or filters"}
              </p>
            </motion.div>
          )}
          {!isLoading && items.length > 0 && totalPages > 1 && (
            <div className="mt-10">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page > 1) setPage(page - 1);
                      }}
                      className={
                        page === 1 ? "pointer-events-none opacity-50" : ""
                      }
                    >
                      {language === "ar" ? "السابق" : "Previous"}
                    </PaginationPrevious>
                  </PaginationItem>
                  {(() => {
                    const maxButtons = 5;
                    const start = Math.max(
                      1,
                      Math.min(page - 2, totalPages - (maxButtons - 1))
                    );
                    const count = Math.min(totalPages, maxButtons);
                    return Array.from({ length: count }).map((_, idx) => {
                      const pageNumber = start + idx;
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href="#"
                            isActive={page === pageNumber}
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(pageNumber);
                            }}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    });
                  })()}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page < totalPages) setPage(page + 1);
                      }}
                      className={
                        page === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    >
                      {language === "ar" ? "التالي" : "Next"}
                    </PaginationNext>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />
    </div>
  );
}
