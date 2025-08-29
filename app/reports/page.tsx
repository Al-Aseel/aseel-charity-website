"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, Calendar, FileText, Eye, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"

const reports = [
  {
    id: 1,
    title: {
      ar: "التقرير السنوي 2023",
      en: "Annual Report 2023",
    },
    description: {
      ar: "تقرير شامل عن أنشطة ومشاريع الجمعية خلال عام 2023",
      en: "Comprehensive report on association activities and projects during 2023",
    },
    type: "administrative",
    date: "2024-01-01",
    size: "2.5 MB",
    pages: 45,
    downloadUrl: "#",
    viewUrl: "#",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: {
      ar: "تقرير المشاريع الإغاثية Q4 2023",
      en: "Relief Projects Report Q4 2023",
    },
    description: {
      ar: "تقرير مفصل عن المشاريع الإغاثية المنفذة في الربع الأخير من 2023",
      en: "Detailed report on relief projects implemented in Q4 2023",
    },
    type: "administrative",
    date: "2023-12-31",
    size: "1.8 MB",
    pages: 32,
    downloadUrl: "#",
    viewUrl: "#",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: {
      ar: "التقرير المالي 2023",
      en: "Financial Report 2023",
    },
    description: {
      ar: "البيانات المالية المدققة للجمعية لعام 2023",
      en: "Audited financial statements of the association for 2023",
    },
    type: "administrative",
    date: "2024-02-15",
    size: "1.2 MB",
    pages: 28,
    downloadUrl: "#",
    viewUrl: "#",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    title: {
      ar: "تغطية إعلامية: حملة التوزيع الغذائي",
      en: "Media Coverage: Food Distribution Campaign",
    },
    description: {
      ar: "تغطية إعلامية شاملة لحملة توزيع الطرود الغذائية",
      en: "Comprehensive media coverage of food package distribution campaign",
    },
    type: "media",
    date: "2024-01-20",
    size: "3.1 MB",
    pages: 15,
    downloadUrl: "#",
    viewUrl: "#",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    title: {
      ar: "تقرير برنامج التدريب المهني",
      en: "Vocational Training Program Report",
    },
    description: {
      ar: "تقرير تفصيلي عن نتائج برنامج التدريب المهني للشباب",
      en: "Detailed report on youth vocational training program results",
    },
    type: "administrative",
    date: "2023-11-15",
    size: "2.0 MB",
    pages: 38,
    downloadUrl: "#",
    viewUrl: "#",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 6,
    title: {
      ar: "مقالات صحفية: إنجازات الجمعية",
      en: "Press Articles: Association Achievements",
    },
    description: {
      ar: "مجموعة من المقالات الصحفية التي تسلط الضوء على إنجازات الجمعية",
      en: "Collection of press articles highlighting association achievements",
    },
    type: "media",
    date: "2023-12-10",
    size: "1.5 MB",
    pages: 22,
    downloadUrl: "#",
    viewUrl: "#",
    image: "/placeholder.svg?height=300&width=400",
  },
]

const reportTypes = [
  { id: "all", name: { ar: "جميع التقارير", en: "All Reports" } },
  { id: "administrative", name: { ar: "التقارير الإدارية", en: "Administrative Reports" } },
  { id: "media", name: { ar: "التقارير الإعلامية", en: "Media Reports" } },
]

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState("all")
  const { language, t } = useLanguage()

  const filteredReports = reports.filter((report) => {
    return selectedType === "all" || report.type === selectedType
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "administrative":
        return "bg-blue-100 text-blue-800"
      case "media":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeName = (type: string) => {
    switch (type) {
      case "administrative":
        return language === "ar" ? "إداري" : "Administrative"
      case "media":
        return language === "ar" ? "إعلامي" : "Media"
      default:
        return type
    }
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("reports.title")}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {language === "ar"
                ? "تصفح وحمل التقارير الإدارية والمالية والإعلامية للجمعية"
                : "Browse and download administrative, financial and media reports of the association"}
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
              <span className="font-medium">{language === "ar" ? "فلترة التقارير:" : "Filter Reports:"}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {reportTypes.map((type) => (
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
        </div>
      </section>

      {/* Reports Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={report.image || "/placeholder.svg"}
                      alt={report.title[language]}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto">
                      <Badge className={getTypeColor(report.type)}>{getTypeName(report.type)}</Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg leading-tight">{report.title[language]}</CardTitle>
                    <p className="text-muted-foreground text-sm line-clamp-2">{report.description[language]}</p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                        <span>{new Date(report.date).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US")}</span>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                        <span>
                          {report.pages} {language === "ar" ? "صفحة" : "pages"} • {report.size}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" asChild>
                        <a href={report.downloadUrl} download>
                          <Download className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                          {t("common.download")}
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                        <a href={report.viewUrl} target="_blank" rel="noopener noreferrer">
                          <Eye className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                          {language === "ar" ? "عرض" : "View"}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {language === "ar" ? "لا توجد تقارير تطابق المعايير المحددة" : "No reports match the selected criteria"}
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
