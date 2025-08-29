"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filter, Calendar, Search, Grid, List } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

const archiveItems = [
  {
    id: 1,
    title: {
      ar: "حملة الشتاء الدافئ 2022",
      en: "Warm Winter Campaign 2022",
    },
    description: {
      ar: "حملة توزيع الملابس الشتوية والبطانيات على الأسر المحتاجة",
      en: "Distribution campaign of winter clothes and blankets to needy families",
    },
    type: "campaign",
    category: "relief",
    date: "2022-12-15",
    year: "2022",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: {
      ar: "ورشة تدريبية: إدارة المشاريع الصغيرة",
      en: "Training Workshop: Small Business Management",
    },
    description: {
      ar: "ورشة تدريبية متخصصة في إدارة وتطوير المشاريع الصغيرة",
      en: "Specialized training workshop on small business management and development",
    },
    type: "workshop",
    category: "training",
    date: "2022-10-20",
    year: "2022",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: {
      ar: "مؤتمر التنمية المجتمعية 2023",
      en: "Community Development Conference 2023",
    },
    description: {
      ar: "مؤتمر سنوي يناقش قضايا التنمية المجتمعية في فلسطين",
      en: "Annual conference discussing community development issues in Palestine",
    },
    type: "conference",
    category: "development",
    date: "2023-05-10",
    year: "2023",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    title: {
      ar: "برنامج الإفطار المدرسي",
      en: "School Breakfast Program",
    },
    description: {
      ar: "برنامج توفير وجبات الإفطار للطلاب في المدارس الحكومية",
      en: "Program providing breakfast meals for students in public schools",
    },
    type: "program",
    category: "education",
    date: "2023-09-01",
    year: "2023",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    title: {
      ar: "يوم الصحة المجتمعية",
      en: "Community Health Day",
    },
    description: {
      ar: "فعالية صحية مجتمعية تتضمن فحوصات طبية مجانية",
      en: "Community health event including free medical checkups",
    },
    type: "event",
    category: "health",
    date: "2023-03-15",
    year: "2023",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 6,
    title: {
      ar: "معرض المنتجات المحلية",
      en: "Local Products Exhibition",
    },
    description: {
      ar: "معرض لعرض وتسويق المنتجات المحلية للمشاريع الصغيرة",
      en: "Exhibition to display and market local products from small businesses",
    },
    type: "exhibition",
    category: "empowerment",
    date: "2022-08-25",
    year: "2022",
    image: "/placeholder.svg?height=300&width=400",
  },
]

const contentTypes = [
  { id: "all", name: { ar: "جميع الأنواع", en: "All Types" } },
  { id: "campaign", name: { ar: "حملات", en: "Campaigns" } },
  { id: "workshop", name: { ar: "ورش عمل", en: "Workshops" } },
  { id: "conference", name: { ar: "مؤتمرات", en: "Conferences" } },
  { id: "program", name: { ar: "برامج", en: "Programs" } },
  { id: "event", name: { ar: "فعاليات", en: "Events" } },
  { id: "exhibition", name: { ar: "معارض", en: "Exhibitions" } },
]

const categories = [
  { id: "all", name: { ar: "جميع الفئات", en: "All Categories" } },
  { id: "relief", name: { ar: "إغاثة", en: "Relief" } },
  { id: "training", name: { ar: "تدريب", en: "Training" } },
  { id: "development", name: { ar: "تنمية", en: "Development" } },
  { id: "education", name: { ar: "تعليم", en: "Education" } },
  { id: "health", name: { ar: "صحة", en: "Health" } },
  { id: "empowerment", name: { ar: "تمكين", en: "Empowerment" } },
]

const years = [
  { id: "all", name: { ar: "جميع السنوات", en: "All Years" } },
  { id: "2023", name: { ar: "2023", en: "2023" } },
  { id: "2022", name: { ar: "2022", en: "2022" } },
  { id: "2021", name: { ar: "2021", en: "2021" } },
]

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { language, t } = useLanguage()

  const filteredItems = archiveItems.filter((item) => {
    const searchMatch =
      !searchQuery ||
      item.title.ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.en.toLowerCase().includes(searchQuery.toLowerCase())

    const typeMatch = selectedType === "all" || item.type === selectedType
    const categoryMatch = selectedCategory === "all" || item.category === selectedCategory
    const yearMatch = selectedYear === "all" || item.year === selectedYear

    return searchMatch && typeMatch && categoryMatch && yearMatch
  })

  const getTypeColor = (type: string) => {
    const colors = {
      campaign: "bg-red-100 text-red-800",
      workshop: "bg-blue-100 text-blue-800",
      conference: "bg-purple-100 text-purple-800",
      program: "bg-green-100 text-green-800",
      event: "bg-yellow-100 text-yellow-800",
      exhibition: "bg-pink-100 text-pink-800",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getTypeName = (type: string) => {
    const typeObj = contentTypes.find((t) => t.id === type)
    return typeObj ? typeObj.name[language] : type
  }

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("archive.title")}</h1>
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
                placeholder={language === "ar" ? "ابحث في الأرشيف..." : "Search archive..."}
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

            {/* Category Filter */}
            <div className="flex-1">
              <h3 className="font-medium mb-3">{language === "ar" ? "الفئة:" : "Category:"}</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name[language]}
                  </Button>
                ))}
              </div>
            </div>

            {/* Year Filter */}
            <div className="flex-1">
              <h3 className="font-medium mb-3">{language === "ar" ? "السنة:" : "Year:"}</h3>
              <div className="flex flex-wrap gap-2">
                {years.map((year) => (
                  <Button
                    key={year.id}
                    variant={selectedYear === year.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedYear(year.id)}
                  >
                    {year.name[language]}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              {language === "ar" ? `تم العثور على ${filteredItems.length} عنصر` : `Found ${filteredItems.length} items`}
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
          {filteredItems.length > 0 ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  {viewMode === "grid" ? (
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title[language]}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto">
                          <Badge className={getTypeColor(item.type)}>{getTypeName(item.type)}</Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg leading-tight">{item.title[language]}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                          {new Date(item.date).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US")}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm line-clamp-3">{item.description[language]}</p>
                        <Button
                          variant="ghost"
                          className="p-0 h-auto font-medium text-primary hover:text-primary/80 mt-3"
                          asChild
                        >
                          <Link href={`/archive/${item.id}`}>{t("common.read-more")}</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="w-24 h-24 flex-shrink-0">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.title[language]}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <Link href={`/archive/${item.id}`}>
                                <h3 className="font-semibold text-lg hover:text-primary transition-colors cursor-pointer">
                                  {item.title[language]}
                                </h3>
                              </Link>
                              <Badge className={getTypeColor(item.type)}>{getTypeName(item.type)}</Badge>
                            </div>
                            <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                              {item.description[language]}
                            </p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                              {new Date(item.date).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US")}
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{language === "ar" ? "لا توجد نتائج" : "No results found"}</h3>
              <p className="text-muted-foreground">
                {language === "ar"
                  ? "جرب تعديل معايير البحث أو الفلاتر"
                  : "Try adjusting your search criteria or filters"}
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
