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
import { api } from "@/lib/api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

type ContentType = "all" | "activity" | "program" | "report";

const contentTypes = [
  {
    id: "all",
    name: { ar: "جميع المحتويات", en: "All Content" },
    icon: FileText,
  },
  { id: "activity", name: { ar: "الأخبار", en: "News" }, icon: FileText },
  { id: "program", name: { ar: "البرامج", en: "Programs" }, icon: Users },
  { id: "report", name: { ar: "التقارير", en: "Reports" }, icon: Award },
];

interface SearchResultItem {
  _id: string;
  type: "activity" | "program" | "report";
  name?: string; // activity/program
  title?: string; // report
  description?: string;
  createdAt?: string;
}

interface CategoryPill {
  id: string;
  type: string;
  name: string;
}

function ResultsSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="hover:shadow-md transition-shadow">
          <div className="border rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-20 bg-gray-200 rounded" />
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>
                <div className="h-5 w-2/3 bg-gray-200 rounded" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded" />
                  <div className="h-4 w-4/6 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<ContentType>("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [availableCategories, setAvailableCategories] = useState<
    CategoryPill[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") ?? "";

  // Load initial data from /search on first mount when no query provided
  useEffect(() => {
    if (!queryParam) {
      fetchResults("", [], "all", 1, limit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (queryParam !== searchQuery) {
      setSearchQuery(queryParam);
      setPage(1);
      fetchResults(queryParam, selectedCategories, selectedType, 1, limit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParam]);

  const fetchResults = async (
    query: string,
    categoryIds: string[],
    type: ContentType,
    pageParam: number,
    limitParam: number
  ) => {
    setLoading(true);
    setError(null);
    try {
      const categoryCsv = categoryIds.join(",");
      const response = await api.globalSearch(
        query,
        categoryCsv,
        pageParam,
        limitParam
      );

      const mixed = response?.data?.data ?? [];
      const items: SearchResultItem[] = (
        Array.isArray(mixed) ? mixed : []
      ).filter(Boolean) as SearchResultItem[];

      // Filter by type on client if needed
      const filteredByType =
        type === "all" ? items : items.filter((it) => it.type === type);
      setSearchResults(filteredByType);
      setTotal(response?.data?.pagination?.total ?? filteredByType.length);
      setTotalPages(response?.data?.pagination?.totalPages ?? 1);
      setPage(response?.data?.pagination?.page ?? pageParam);

      // Map categories from API
      const cats = (response?.data?.categories ?? []).flatMap((c: any) =>
        (c.ids || []).map((idObj: any) => ({
          id: idObj.id as string,
          type: idObj.type as string,
          name: c.name as string,
        }))
      );
      setAvailableCategories(cats);
    } catch (e: any) {
      setError(
        e?.message || (language === "ar" ? "فشل الجلب" : "Failed to fetch")
      );
      setSearchResults([]);
      setTotal(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchResults(searchQuery, selectedCategories, selectedType, 1, limit);
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) => {
      const next = prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id];
      setPage(1);
      fetchResults(searchQuery, next, selectedType, 1, limit);
      return next;
    });
  };

  const getTypeIcon = (type: string) => {
    const typeObj = contentTypes.find((t) => t.id === type);
    return typeObj ? typeObj.icon : FileText;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "activity":
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

  const itemTitle = (it: SearchResultItem) => it.name || it.title || "";
  const itemDate = (it: SearchResultItem) =>
    it.createdAt || new Date().toISOString();
  const itemExcerpt = (it: SearchResultItem) => it.description || "";
  const itemLink = (it: SearchResultItem) => {
    if (it.type === "activity") return `/news/${it._id}`;
    if (it.type === "program") return `/programs/${it._id}`;
    return `/reports`;
  };

  return (
    <div className="min-h-screen">
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

            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2">
                <Input
                  placeholder={t("search.placeholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="text-lg h-12"
                />
                <Button
                  onClick={handleSearch}
                  size="lg"
                  className="px-8"
                  disabled={loading}
                >
                  <Search className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                  {language === "ar" ? "بحث" : "Search"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <h3 className="font-medium mb-3 flex items-center">
                <Filter className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {language === "ar" ? "نوع المحتوى:" : "Content Type:"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {contentTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={
                      selectedType === (type.id as ContentType)
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => {
                      const nextType = type.id as ContentType;
                      setSelectedType(nextType);
                      fetchResults(
                        searchQuery,
                        selectedCategories,
                        nextType,
                        1,
                        limit
                      );
                    }}
                    className="flex items-center"
                  >
                    <type.icon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                    {type.name[language]}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-medium mb-3">
                {language === "ar" ? "الفئات :" : "Categories (API):"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map((c) => (
                  <Button
                    key={`${c.id}-${c.type}`}
                    variant={
                      selectedCategories.includes(c.id) ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => toggleCategory(c.id)}
                  >
                    {c.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">{t("search.results")}</h2>
            <p className="text-muted-foreground">
              {language === "ar"
                ? `تم العثور على ${total} نتيجة`
                : `Found ${total} results`}
              {searchQuery && (
                <span>
                  {language === "ar" ? ' لـ "' : ' for "'}
                  <strong>{searchQuery}</strong>"
                </span>
              )}
            </p>
          </div>

          {loading ? (
            <ResultsSkeleton count={5} />
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-6">
              {searchResults.map((result, index) => (
                <motion.div
                  key={`${result._id}-${index}`}
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
                              {new Date(itemDate(result)).toLocaleDateString(
                                language === "ar" ? "ar-EG" : "en-US"
                              )}
                            </div>
                          </div>
                          <CardTitle className="text-xl hover:text-primary cursor-pointer">
                            {itemTitle(result)}
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
                      {itemExcerpt(result) && (
                        <p className="text-muted-foreground mb-4">
                          {itemExcerpt(result)}
                        </p>
                      )}
                      <Button
                        asChild
                        variant="ghost"
                        className="p-0 h-auto font-medium text-primary hover:text-primary/80"
                      >
                        <Link href={itemLink(result)}>
                          {t("common.read-more")}
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
                {t("search.no-results")}
              </h3>
              <p className="text-muted-foreground">
                {language === "ar"
                  ? "جرب استخدام كلمات مفتاحية مختلفة أو تعديل الفلاتر"
                  : "Try using different keywords or adjusting the filters"}
              </p>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page > 1) {
                          const newPage = page - 1;
                          setPage(newPage);
                          fetchResults(
                            searchQuery,
                            selectedCategories,
                            selectedType,
                            newPage,
                            limit
                          );
                        }
                      }}
                    >
                      {language === "ar" ? "السابق" : "Previous"}
                    </PaginationPrevious>
                  </PaginationItem>

                  {/* Page numbers (simple) */}
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href="#"
                          isActive={pageNum === page}
                          onClick={(e) => {
                            e.preventDefault();
                            if (pageNum !== page) {
                              setPage(pageNum);
                              fetchResults(
                                searchQuery,
                                selectedCategories,
                                selectedType,
                                pageNum,
                                limit
                              );
                            }
                          }}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page < totalPages) {
                          const newPage = page + 1;
                          setPage(newPage);
                          fetchResults(
                            searchQuery,
                            selectedCategories,
                            selectedType,
                            newPage,
                            limit
                          );
                        }
                      }}
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

      <PartnersSection />
    </div>
  );
}
