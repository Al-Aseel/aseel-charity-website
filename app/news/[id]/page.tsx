"use client"

import { motion } from "framer-motion"
import { Calendar, ArrowLeft, Share2, User, Tag, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import ImageGallery from "@/components/image-gallery"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data for news details
const newsData = {
  "1": {
    id: 1,
    title: {
      ar: "توزيع 500 طرد غذائي على الأسر المحتاجة",
      en: "Distribution of 500 food packages to needy families",
    },
    excerpt: {
      ar: "نفذت الجمعية حملة توزيع طرود غذائية شملت 500 أسرة من الأسر الأكثر احتياجاً في قطاع غزة",
      en: "The association implemented a food package distribution campaign that included 500 families from the most needy families in Gaza Strip",
    },
    content: {
      ar: `
        <p>في إطار جهودها المستمرة لدعم الأسر المحتاجة في قطاع غزة، نفذت جمعية أصيل للتنمية الخيرية حملة توزيع طرود غذائية واسعة النطاق شملت 500 أسرة من الأسر الأكثر احتياجاً.</p>
        
        <p>تضمنت الطرود الغذائية مجموعة متنوعة من المواد الأساسية مثل الأرز، السكر، الزيت، المعلبات، البقوليات، والدقيق، بما يكفي لتلبية احتياجات الأسرة لمدة شهر كامل.</p>
        
        <p>وقد تم اختيار الأسر المستفيدة بناءً على معايير دقيقة تشمل مستوى الدخل، عدد أفراد الأسرة، والظروف الاجتماعية والصحية. كما تم التنسيق مع الجهات المحلية لضمان وصول المساعدات للأسر الأكثر احتياجاً.</p>
        
        <p>وأعرب المستفيدون عن امتنانهم الكبير لهذه المبادرة، مؤكدين أنها ساهمت في تخفيف الأعباء المالية عن كاهلهم في ظل الظروف الاقتصادية الصعبة التي يمر بها القطاع.</p>
        
        <p>وتأتي هذه الحملة ضمن برنامج المساعدات الغذائية الطارئة الذي تنفذه الجمعية بالتعاون مع شركائها المحليين والدوليين، والذي يهدف إلى توفير الأمن الغذائي للأسر الفقيرة والمهمشة.</p>
      `,
      en: `
        <p>As part of its ongoing efforts to support needy families in Gaza Strip, Aseel Charitable Development Association implemented a large-scale food package distribution campaign that included 500 families from the most needy families.</p>
        
        <p>The food packages included a variety of basic materials such as rice, sugar, oil, canned goods, legumes, and flour, sufficient to meet the family's needs for a full month.</p>
        
        <p>The beneficiary families were selected based on precise criteria including income level, family size, and social and health conditions. Coordination was also made with local authorities to ensure aid reaches the most needy families.</p>
        
        <p>The beneficiaries expressed their great gratitude for this initiative, confirming that it contributed to relieving financial burdens from them given the difficult economic conditions the sector is experiencing.</p>
        
        <p>This campaign comes within the Emergency Food Assistance Program implemented by the association in cooperation with its local and international partners, which aims to provide food security for poor and marginalized families.</p>
      `,
    },
    date: "2024-01-15",
    author: {
      ar: "فريق الإعلام",
      en: "Media Team",
    },
    category: {
      ar: "إغاثة",
      en: "Relief",
    },
    tags: {
      ar: ["إغاثة", "طرود غذائية", "أسر محتاجة", "قطاع غزة"],
      en: ["Relief", "Food Packages", "Needy Families", "Gaza Strip"],
    },
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    imageCaptions: [
      {
        ar: "توزيع الطرود الغذائية على الأسر المحتاجة",
        en: "Distribution of food packages to needy families",
      },
      {
        ar: "تحضير وتجهيز الطرود الغذائية",
        en: "Preparation and packaging of food packages",
      },
      {
        ar: "المتطوعون أثناء توزيع المساعدات",
        en: "Volunteers during aid distribution",
      },
      {
        ar: "الأسر المستفيدة تتسلم المساعدات",
        en: "Beneficiary families receiving aid",
      },
    ],
    views: 1250,
    relatedNews: [2, 3],
  },
  "2": {
    id: 2,
    title: {
      ar: "افتتاح مركز التدريب المهني للشباب",
      en: "Opening of Youth Vocational Training Center",
    },
    excerpt: {
      ar: "تم افتتاح مركز جديد للتدريب المهني يهدف إلى تأهيل الشباب في مختلف المهن والحرف",
      en: "A new vocational training center was opened aimed at qualifying youth in various professions and crafts",
    },
    content: {
      ar: `
        <p>افتتحت جمعية أصيل للتنمية الخيرية مركزاً جديداً للتدريب المهني في مدينة غزة، والذي يهدف إلى تأهيل الشباب الفلسطيني في مختلف المهن والحرف التقنية.</p>
        
        <p>يضم المركز الجديد ورش عمل متخصصة في مجالات الكهرباء، السباكة، النجارة، الخياطة، وتكنولوجيا المعلومات، بالإضافة إلى قاعات تدريبية مجهزة بأحدث الأجهزة والمعدات.</p>
        
        <p>وسيستفيد من المركز حوالي 200 شاب وشابة في المرحلة الأولى، حيث سيحصلون على تدريب نظري وعملي مكثف لمدة 6 أشهر في التخصص الذي يختارونه.</p>
        
        <p>كما يتضمن البرنامج التدريبي دورات في ريادة الأعمال وإدارة المشاريع الصغيرة، لتمكين الخريجين من إقامة مشاريعهم الخاصة أو الحصول على فرص عمل مناسبة.</p>
        
        <p>وأكد مدير الجمعية أن هذا المركز يأتي ضمن استراتيجية الجمعية لتمكين الشباب وتطوير قدراتهم المهنية، مما يساهم في تقليل معدلات البطالة وتحسين الأوضاع الاقتصادية للأسر الفلسطينية.</p>
      `,
      en: `
        <p>Aseel Charitable Development Association opened a new vocational training center in Gaza City, which aims to qualify Palestinian youth in various technical professions and crafts.</p>
        
        <p>The new center includes specialized workshops in electricity, plumbing, carpentry, sewing, and information technology, in addition to training halls equipped with the latest devices and equipment.</p>
        
        <p>About 200 young men and women will benefit from the center in the first phase, where they will receive intensive theoretical and practical training for 6 months in their chosen specialization.</p>
        
        <p>The training program also includes courses in entrepreneurship and small business management, to enable graduates to establish their own projects or get suitable job opportunities.</p>
        
        <p>The association director confirmed that this center comes within the association's strategy to empower youth and develop their professional capabilities, which contributes to reducing unemployment rates and improving the economic conditions of Palestinian families.</p>
      `,
    },
    date: "2024-01-10",
    author: {
      ar: "أحمد محمد",
      en: "Ahmed Mohammed",
    },
    category: {
      ar: "تدريب",
      en: "Training",
    },
    tags: {
      ar: ["تدريب مهني", "شباب", "تأهيل", "مهارات"],
      en: ["Vocational Training", "Youth", "Qualification", "Skills"],
    },
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    imageCaptions: [
      {
        ar: "حفل افتتاح مركز التدريب المهني",
        en: "Opening ceremony of vocational training center",
      },
      {
        ar: "ورش العمل المجهزة بأحدث المعدات",
        en: "Workshops equipped with latest equipment",
      },
      {
        ar: "الطلاب أثناء التدريب العملي",
        en: "Students during practical training",
      },
    ],
    views: 890,
    relatedNews: [1, 3],
  },
  "3": {
    id: 3,
    title: {
      ar: "برنامج دعم المشاريع الصغيرة للنساء",
      en: "Small Business Support Program for Women",
    },
    excerpt: {
      ar: "إطلاق برنامج جديد لدعم النساء في إقامة مشاريع صغيرة مدرة للدخل",
      en: "Launch of a new program to support women in establishing small income-generating projects",
    },
    content: {
      ar: `
        <p>أطلقت جمعية أصيل للتنمية الخيرية برنامجاً جديداً لدعم النساء في إقامة مشاريع صغيرة مدرة للدخل، وذلك في إطار جهودها لتمكين المرأة الفلسطينية اقتصادياً.</p>
        
        <p>يستهدف البرنامج 100 امرأة في المرحلة الأولى، حيث سيحصلن على تدريب متخصص في مجالات مختلفة مثل الطبخ، الخياطة، الحرف اليدوية، والتجارة الإلكترونية.</p>
        
        <p>كما يتضمن البرنامج تقديم قروض ميسرة بدون فوائد للنساء المشاركات لمساعدتهن في بدء مشاريعهن، بالإضافة إلى المتابعة والإرشاد المستمر من قبل فريق متخصص.</p>
        
        <p>وتهدف هذه المبادرة إلى تحسين الوضع الاقتصادي للأسر الفلسطينية من خلال تمكين النساء من المساهمة في دخل الأسرة، وتعزيز دورهن في التنمية المجتمعية.</p>
        
        <p>وقد لاقى البرنامج إقبالاً كبيراً من النساء في مختلف مناطق قطاع غزة، مما يعكس الحاجة الماسة لمثل هذه البرامج التمكينية.</p>
      `,
      en: `
        <p>Aseel Charitable Development Association launched a new program to support women in establishing small income-generating projects, as part of its efforts to economically empower Palestinian women.</p>
        
        <p>The program targets 100 women in the first phase, where they will receive specialized training in various fields such as cooking, sewing, handicrafts, and e-commerce.</p>
        
        <p>The program also includes providing soft loans without interest to participating women to help them start their projects, in addition to continuous follow-up and guidance from a specialized team.</p>
        
        <p>This initiative aims to improve the economic situation of Palestinian families by enabling women to contribute to family income and enhance their role in community development.</p>
        
        <p>The program has received great interest from women in various areas of Gaza Strip, reflecting the urgent need for such empowerment programs.</p>
      `,
    },
    date: "2024-01-05",
    author: {
      ar: "فاطمة أحمد",
      en: "Fatima Ahmed",
    },
    category: {
      ar: "تمكين اقتصادي",
      en: "Economic Empowerment",
    },
    tags: {
      ar: ["تمكين المرأة", "مشاريع صغيرة", "قروض ميسرة", "تدريب"],
      en: ["Women Empowerment", "Small Projects", "Soft Loans", "Training"],
    },
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    imageCaptions: [
      {
        ar: "برنامج تدريب النساء على المشاريع الصغيرة",
        en: "Women training program for small businesses",
      },
      {
        ar: "ورشة الحرف اليدوية",
        en: "Handicrafts workshop",
      },
      {
        ar: "رائدات الأعمال المشاركات في البرنامج",
        en: "Women entrepreneurs participating in the program",
      },
      {
        ar: "منتجات المشاريع الصغيرة",
        en: "Small business products",
      },
    ],
    views: 1100,
    relatedNews: [1, 2],
  },
}

export default function NewsDetailPage() {
  const params = useParams()
  const { language, t } = useLanguage()
  const newsId = params.id as string

  const news = newsData[newsId as keyof typeof newsData]

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{language === "ar" ? "الخبر غير موجود" : "News not found"}</h1>
          <Button asChild>
            <Link href="/">{language === "ar" ? "العودة للرئيسية" : "Back to Home"}</Link>
          </Button>
        </div>
      </div>
    )
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      إغاثة: "bg-red-100 text-red-800",
      Relief: "bg-red-100 text-red-800",
      تدريب: "bg-blue-100 text-blue-800",
      Training: "bg-blue-100 text-blue-800",
      "تمكين اقتصادي": "bg-green-100 text-green-800",
      "Economic Empowerment": "bg-green-100 text-green-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const relatedNewsItems = news.relatedNews
    .map((id) => newsData[id.toString() as keyof typeof newsData])
    .filter(Boolean)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-8 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {language === "ar" ? "العودة للرئيسية" : "Back to Home"}
              </Link>
            </Button>

            <div className="flex items-center gap-3 mb-4">
              <Badge className={getCategoryColor(news.category[language])}>{news.category[language]}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                {new Date(news.date).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US")}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                {news.views.toLocaleString()} {language === "ar" ? "مشاهدة" : "views"}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title[language]}</h1>
            <p className="text-xl text-muted-foreground mb-6">{news.excerpt[language]}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                <span>{news.author[language]}</span>
              </div>

              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {language === "ar" ? "مشاركة" : "Share"}
              </Button>
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
              src={news.images[0] || "/placeholder.svg"}
              alt={news.title[language]}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="prose prose-lg max-w-none"
              >
                <div
                  className="text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: news.content[language] }}
                />
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-8 pt-8 border-t"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{language === "ar" ? "الكلمات المفتاحية:" : "Tags:"}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {news.tags[language].map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Image Gallery */}
              {news.images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="mt-8"
                >
                  <ImageGallery
                    images={news.images.slice(1)}
                    captions={news.imageCaptions?.slice(1)}
                    title={language === "ar" ? "معرض الصور" : "Photo Gallery"}
                  />
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Related News */}
              {relatedNewsItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-4">{language === "ar" ? "أخبار ذات صلة" : "Related News"}</h3>
                      <div className="space-y-4">
                        {relatedNewsItems.map((relatedNews) => (
                          <Link
                            key={relatedNews.id}
                            href={`/news/${relatedNews.id}`}
                            className="block group hover:bg-muted/50 p-3 rounded-lg transition-colors"
                          >
                            <div className="flex gap-3">
                              <div className="w-16 h-16 flex-shrink-0">
                                <img
                                  src={relatedNews.images[0] || "/placeholder.svg"}
                                  alt={relatedNews.title[language]}
                                  className="w-full h-full object-cover rounded"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                  {relatedNews.title[language]}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(relatedNews.date).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US")}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Share */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="mt-6"
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">{language === "ar" ? "شارك الخبر" : "Share News"}</h3>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        Facebook
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        Twitter
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        WhatsApp
                      </Button>
                    </div>
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
