"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Target, ArrowLeft, Download, Share2, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/components/language-provider"
import ImageGallery from "@/components/image-gallery"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data for program details
const programsData = {
  "1": {
    id: 1,
    title: {
      ar: "برنامج المساعدات الغذائية الطارئة",
      en: "Emergency Food Assistance Program",
    },
    description: {
      ar: "توفير المساعدات الغذائية العاجلة للأسر الأكثر احتياجاً في قطاع غزة",
      en: "Providing urgent food assistance to the most needy families in Gaza Strip",
    },
    fullDescription: {
      ar: "يهدف هذا البرنامج إلى توفير المساعدات الغذائية العاجلة للأسر الأكثر احتياجاً في قطاع غزة، خاصة في ظل الظروف الاقتصادية الصعبة التي يمر بها القطاع. يشمل البرنامج توزيع طرود غذائية شهرية تحتوي على المواد الأساسية مثل الأرز والسكر والزيت والمعلبات والبقوليات. كما يتضمن البرنامج توزيع وجبات ساخنة يومية للأطفال والمسنين في المناطق الأكثر فقراً.",
      en: "This program aims to provide urgent food assistance to the most needy families in Gaza Strip, especially given the difficult economic conditions the sector is experiencing. The program includes distributing monthly food packages containing basic materials such as rice, sugar, oil, canned goods and legumes. The program also includes distributing daily hot meals for children and elderly in the poorest areas.",
    },
    status: "active",
    category: "relief",
    beneficiaries: 2500,
    targetBeneficiaries: 3000,
    duration: "12 شهر",
    location: {
      ar: "قطاع غزة",
      en: "Gaza Strip",
    },
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    imageCaptions: [
      {
        ar: "توزيع الطرود الغذائية على الأسر",
        en: "Distribution of food packages to families",
      },
      {
        ar: "تحضير الوجبات الساخنة",
        en: "Preparation of hot meals",
      },
      {
        ar: "فريق العمل التطوعي",
        en: "Volunteer work team",
      },
    ],
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    budget: "$150,000",
    spent: "$95,000",
    progress: 63,
    objectives: {
      ar: [
        "توفير الأمن الغذائي للأسر المحتاجة",
        "تحسين الحالة الغذائية للأطفال والمسنين",
        "دعم الاقتصاد المحلي من خلال الشراء المحلي",
        "تعزيز التماسك الاجتماعي في المجتمع",
      ],
      en: [
        "Provide food security for needy families",
        "Improve nutritional status of children and elderly",
        "Support local economy through local purchasing",
        "Strengthen social cohesion in the community",
      ],
    },
    activities: {
      ar: [
        "توزيع 2500 طرد غذائي شهرياً",
        "تقديم 500 وجبة ساخنة يومياً",
        "تنظيم حملات توعية غذائية",
        "متابعة الحالة الصحية للمستفيدين",
      ],
      en: [
        "Distribute 2500 food packages monthly",
        "Provide 500 hot meals daily",
        "Organize nutritional awareness campaigns",
        "Monitor health status of beneficiaries",
      ],
    },
    partners: [
      { name: "UNICEF", logo: "/placeholder.svg?height=60&width=100" },
      { name: "WFP", logo: "/placeholder.svg?height=60&width=100" },
      { name: "Local Municipality", logo: "/placeholder.svg?height=60&width=100" },
    ],
  },
  "2": {
    id: 2,
    title: {
      ar: "مشروع التدريب المهني للشباب",
      en: "Youth Vocational Training Project",
    },
    description: {
      ar: "برنامج تدريبي شامل لتأهيل الشباب في مختلف المهن والحرف",
      en: "Comprehensive training program to qualify youth in various professions and crafts",
    },
    fullDescription: {
      ar: "يهدف هذا المشروع إلى تأهيل الشباب الفلسطيني في مختلف المهن والحرف لتمكينهم من الحصول على فرص عمل أو إقامة مشاريعهم الخاصة. يشمل المشروع تدريبات في مجالات الكهرباء، السباكة، النجارة، الخياطة، الحاسوب، والطبخ. كما يتضمن تدريبات على ريادة الأعمال وإدارة المشاريع الصغيرة.",
      en: "This project aims to qualify Palestinian youth in various professions and crafts to enable them to get job opportunities or establish their own projects. The project includes training in electricity, plumbing, carpentry, sewing, computer, and cooking. It also includes training on entrepreneurship and small business management.",
    },
    status: "active",
    category: "training",
    beneficiaries: 300,
    targetBeneficiaries: 400,
    duration: "18 شهر",
    location: {
      ar: "غزة ورفح",
      en: "Gaza and Rafah",
    },
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    imageCaptions: [
      {
        ar: "تدريب الشباب على الكهرباء",
        en: "Training youth in electricity",
      },
      {
        ar: "ورشة النجارة",
        en: "Carpentry workshop",
      },
      {
        ar: "تدريب الحاسوب",
        en: "Computer training",
      },
    ],
    startDate: "2023-09-01",
    endDate: "2025-02-28",
    budget: "$200,000",
    spent: "$120,000",
    progress: 60,
    objectives: {
      ar: [
        "تأهيل 400 شاب وشابة مهنياً",
        "تحسين فرص التوظيف للشباب",
        "تطوير المهارات التقنية والمهنية",
        "دعم ريادة الأعمال بين الشباب",
      ],
      en: [
        "Qualify 400 young men and women professionally",
        "Improve employment opportunities for youth",
        "Develop technical and professional skills",
        "Support entrepreneurship among youth",
      ],
    },
    activities: {
      ar: [
        "دورات تدريبية متخصصة في 6 مجالات",
        "ورش عمل في ريادة الأعمال",
        "برنامج التدريب العملي",
        "معرض للمنتجات والمشاريع",
      ],
      en: [
        "Specialized training courses in 6 fields",
        "Entrepreneurship workshops",
        "Practical training program",
        "Exhibition of products and projects",
      ],
    },
    partners: [
      { name: "UNDP", logo: "/placeholder.svg?height=60&width=100" },
      { name: "Ministry of Labor", logo: "/placeholder.svg?height=60&width=100" },
      { name: "Technical College", logo: "/placeholder.svg?height=60&width=100" },
    ],
  },
}

export default function ProgramDetailPage() {
  const params = useParams()
  const { language, t } = useLanguage()
  const programId = params.id as string

  const program = programsData[programId as keyof typeof programsData]

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{language === "ar" ? "المشروع غير موجود" : "Program not found"}</h1>
          <Button asChild>
            <Link href="/programs">{language === "ar" ? "العودة للبرامج" : "Back to Programs"}</Link>
          </Button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "planning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return language === "ar" ? "نشط" : "Active"
      case "completed":
        return language === "ar" ? "مكتمل" : "Completed"
      case "planning":
        return language === "ar" ? "قيد التخطيط" : "Planning"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
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
                  <Badge className={getStatusColor(program.status)}>{getStatusText(program.status)}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {language === "ar" ? "بدأ في" : "Started on"}{" "}
                    {new Date(program.startDate).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US")}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6">{program.title[language]}</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">{program.description[language]}</p>

                <div className="flex flex-wrap gap-4 mt-6">
                  <Button size="lg">
                    <Heart className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {language === "ar" ? "ادعم المشروع" : "Support Project"}
                  </Button>
                  <Button size="lg" variant="outline">
                    <Share2 className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {language === "ar" ? "مشاركة" : "Share"}
                  </Button>
                  <Button size="lg" variant="outline">
                    <Download className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {language === "ar" ? "تحميل التقرير" : "Download Report"}
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
                          {program.beneficiaries.toLocaleString()} / {program.targetBeneficiaries.toLocaleString()}{" "}
                          {language === "ar" ? "مستفيد" : "beneficiaries"}
                        </span>
                      </div>

                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-muted-foreground" />
                        <span>{program.duration}</span>
                      </div>

                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-muted-foreground" />
                        <span>{program.location[language]}</span>
                      </div>

                      <div className="flex items-center text-sm">
                        <Target className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-muted-foreground" />
                        <span>{program.budget}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span>{language === "ar" ? "التقدم" : "Progress"}</span>
                        <span>{program.progress}%</span>
                      </div>
                      <Progress value={program.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>
                          {language === "ar" ? "المنفق:" : "Spent:"} {program.spent}
                        </span>
                        <span>
                          {language === "ar" ? "المتبقي:" : "Remaining:"} $
                          {Number.parseInt(program.budget.replace("$", "").replace(",", "")) -
                            Number.parseInt(program.spent.replace("$", "").replace(",", ""))}
                        </span>
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
            <img
              src={program.images[0] || "/placeholder.svg"}
              alt={program.title[language]}
              className="w-full h-full object-cover"
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
                <h2 className="text-3xl font-bold mb-6">{language === "ar" ? "وصف المشروع" : "Project Description"}</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">{program.fullDescription[language]}</p>
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
                  {program.objectives[language].map((objective, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 rtl:ml-3 rtl:mr-0 mt-1">
                            {index + 1}
                          </div>
                          <p className="text-sm">{objective}</p>
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
                  {program.activities[language].map((activity, index) => (
                    <div key={index} className="flex items-center p-4 bg-muted/30 rounded-lg">
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
                  images={program.images.slice(1)}
                  captions={program.imageCaptions}
                  title={language === "ar" ? "معرض الصور" : "Photo Gallery"}
                />
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Partners */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{language === "ar" ? "الشركاء" : "Partners"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {program.partners.map((partner, index) => (
                        <div key={index} className="flex items-center p-3 bg-muted/30 rounded-lg">
                          <img
                            src={partner.logo || "/placeholder.svg"}
                            alt={partner.name}
                            className="w-12 h-8 object-contain mr-3 rtl:ml-3 rtl:mr-0"
                          />
                          <span className="font-medium">{partner.name}</span>
                        </div>
                      ))}
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
                    <CardTitle>{language === "ar" ? "الجدول الزمني" : "Timeline"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3 rtl:ml-3 rtl:mr-0"></div>
                        <div>
                          <p className="font-medium">{language === "ar" ? "بداية المشروع" : "Project Start"}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(program.startDate).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 rtl:ml-3 rtl:mr-0"></div>
                        <div>
                          <p className="font-medium">{language === "ar" ? "نهاية المشروع" : "Project End"}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(program.endDate).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US")}
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
                    <CardTitle>{language === "ar" ? "للاستفسار" : "For Inquiries"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {language === "ar"
                        ? "للمزيد من المعلومات حول هذا المشروع"
                        : "For more information about this project"}
                    </p>
                    <Button className="w-full" asChild>
                      <Link href="/contact">{language === "ar" ? "اتصل بنا" : "Contact Us"}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
