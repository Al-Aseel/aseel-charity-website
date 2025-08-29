"use client"

import { motion } from "framer-motion"
import { Calendar, ArrowLeft, Share2, User, Tag, Eye, MapPin, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import ImageGallery from "@/components/image-gallery"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data for archive item details
const archiveData = {
  "1": {
    id: 1,
    title: {
      ar: "حملة الشتاء الدافئ 2022",
      en: "Warm Winter Campaign 2022",
    },
    description: {
      ar: "حملة توزيع الملابس الشتوية والبطانيات على الأسر المحتاجة",
      en: "Distribution campaign of winter clothes and blankets to needy families",
    },
    fullDescription: {
      ar: `
        <p>نفذت جمعية أصيل للتنمية الخيرية حملة "الشتاء الدافئ 2022" والتي استهدفت توزيع الملابس الشتوية والبطانيات على الأسر الأكثر احتياجاً في قطاع غزة خلال فصل الشتاء.</p>
        
        <p>شملت الحملة توزيع أكثر من 1000 قطعة ملابس شتوية للأطفال والكبار، بالإضافة إلى 500 بطانية عالية الجودة لحماية الأسر من برد الشتاء القارس.</p>
        
        <p>تم تنفيذ الحملة بالتعاون مع عدد من المؤسسات المحلية والدولية، وشارك فيها أكثر من 50 متطوع من أبناء المجتمع المحلي.</p>
        
        <p>وقد لاقت الحملة استجابة واسعة من المجتمع المحلي، حيث تبرع العديد من المواطنين بالملابس والبطانيات لدعم هذه المبادرة الإنسانية.</p>
        
        <p>كما تضمنت الحملة برنامجاً توعوياً حول أهمية الحفاظ على الصحة خلال فصل الشتاء، وتوزيع نشرات إرشادية على الأسر المستفيدة.</p>
      `,
      en: `
        <p>Aseel Charitable Development Association implemented the "Warm Winter 2022" campaign which targeted distributing winter clothes and blankets to the most needy families in Gaza Strip during winter season.</p>
        
        <p>The campaign included distributing more than 1000 pieces of winter clothing for children and adults, in addition to 500 high-quality blankets to protect families from the harsh winter cold.</p>
        
        <p>The campaign was implemented in cooperation with a number of local and international institutions, and more than 50 volunteers from the local community participated in it.</p>
        
        <p>The campaign received a wide response from the local community, as many citizens donated clothes and blankets to support this humanitarian initiative.</p>
        
        <p>The campaign also included an awareness program about the importance of maintaining health during winter, and distributing guidance leaflets to beneficiary families.</p>
      `,
    },
    type: "campaign",
    category: "relief",
    date: "2022-12-15",
    year: "2022",
    author: {
      ar: "فريق الإعلام",
      en: "Media Team",
    },
    location: {
      ar: "جميع محافظات غزة",
      en: "All Gaza Governorates",
    },
    beneficiaries: 800,
    duration: {
      ar: "شهر واحد",
      en: "One month",
    },
    budget: "$25,000",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    imageCaptions: [
      {
        ar: "توزيع الملابس الشتوية على الأطفال",
        en: "Distribution of winter clothes to children",
      },
      {
        ar: "توزيع البطانيات عالية الجودة",
        en: "Distribution of high-quality blankets",
      },
      {
        ar: "المتطوعون أثناء تنفيذ الحملة",
        en: "Volunteers during campaign implementation",
      },
      {
        ar: "الأسر المستفيدة تتسلم المساعدات",
        en: "Beneficiary families receiving aid",
      },
      {
        ar: "فرز وتصنيف الملابس الشتوية",
        en: "Sorting and categorizing winter clothes",
      },
      {
        ar: "متطوعو المجتمع المحلي",
        en: "Local community volunteers",
      },
    ],
    tags: {
      ar: ["شتاء", "ملابس", "بطانيات", "أسر محتاجة", "تطوع"],
      en: ["Winter", "Clothes", "Blankets", "Needy Families", "Volunteering"],
    },
    views: 2150,
    achievements: {
      ar: [
        "توزيع 1000 قطعة ملابس شتوية",
        "توزيع 500 بطانية عالية الجودة",
        "مشاركة 50 متطوع",
        "تغطية جميع محافظات غزة",
        "وصول لـ 800 مستفيد",
      ],
      en: [
        "Distributed 1000 pieces of winter clothing",
        "Distributed 500 high-quality blankets",
        "50 volunteers participated",
        "Covered all Gaza governorates",
        "Reached 800 beneficiaries",
      ],
    },
    relatedItems: [2, 3],
  },
  "2": {
    id: 2,
    title: {
      ar: "ورشة تدريبية: إدارة المشاريع الصغيرة",
      en: "Training Workshop: Small Business Management",
    },
    description: {
      ar: "ورشة تدريبية متخصصة في إدارة وتطوير المشاريع الصغيرة",
      en: "Specialized training workshop on small business management and development",
    },
    fullDescription: {
      ar: `
        <p>نظمت جمعية أصيل للتنمية الخيرية ورشة تدريبية متخصصة في إدارة المشاريع الصغيرة، استهدفت رواد الأعمال الشباب والنساء الراغبات في إقامة مشاريعهن الخاصة.</p>
        
        <p>امتدت الورشة لمدة ثلاثة أيام متتالية، وتضمنت محاور متنوعة شملت التخطيط الاستراتيجي، إدارة الموارد المالية، التسويق الرقمي، وإدارة المخاطر.</p>
        
        <p>قدم الورشة نخبة من الخبراء المتخصصين في مجال ريادة الأعمال، وتضمنت جلسات نظرية وعملية تفاعلية.</p>
        
        <p>شارك في الورشة 40 متدرب ومتدربة من مختلف التخصصات والأعمار، وحصل جميع المشاركين على شهادات مشاركة معتمدة.</p>
        
        <p>كما تضمنت الورشة جلسة خاصة لعرض نماذج ناجحة من المشاريع الصغيرة في قطاع غزة، ومناقشة التحديات والفرص المتاحة.</p>
      `,
      en: `
        <p>Aseel Charitable Development Association organized a specialized training workshop on small business management, targeting young entrepreneurs and women wishing to establish their own projects.</p>
        
        <p>The workshop lasted for three consecutive days and included various topics including strategic planning, financial resource management, digital marketing, and risk management.</p>
        
        <p>The workshop was presented by a group of experts specialized in entrepreneurship, and included theoretical and interactive practical sessions.</p>
        
        <p>40 male and female trainees from various specializations and ages participated in the workshop, and all participants received certified participation certificates.</p>
        
        <p>The workshop also included a special session to present successful models of small projects in Gaza Strip, and discuss challenges and available opportunities.</p>
      `,
    },
    type: "workshop",
    category: "training",
    date: "2022-10-20",
    year: "2022",
    author: {
      ar: "د. سامي أحمد",
      en: "Dr. Sami Ahmed",
    },
    location: {
      ar: "مركز التدريب - غزة",
      en: "Training Center - Gaza",
    },
    beneficiaries: 40,
    duration: {
      ar: "ثلاثة أيام",
      en: "Three days",
    },
    budget: "$5,000",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    imageCaptions: [
      {
        ar: "جلسة تدريبية حول إدارة المشاريع",
        en: "Training session on project management",
      },
      {
        ar: "المشاركون أثناء التدريب العملي",
        en: "Participants during practical training",
      },
      {
        ar: "ورشة التخطيط الاستراتيجي",
        en: "Strategic planning workshop",
      },
      {
        ar: "المشاركون في الورشة التدريبية",
        en: "Workshop participants",
      },
    ],
    tags: {
      ar: ["تدريب", "ريادة أعمال", "مشاريع صغيرة", "تطوير مهارات"],
      en: ["Training", "Entrepreneurship", "Small Business", "Skill Development"],
    },
    views: 1580,
    achievements: {
      ar: ["تدريب 40 متدرب ومتدربة", "3 أيام تدريبية مكثفة", "شهادات مشاركة معتمدة", "خبراء متخصصون", "جلسات تفاعلية"],
      en: [
        "Trained 40 male and female trainees",
        "3 intensive training days",
        "Certified participation certificates",
        "Specialized experts",
        "Interactive sessions",
      ],
    },
    relatedItems: [1, 3],
  },
  "3": {
    id: 3,
    title: {
      ar: "مؤتمر التنمية المجتمعية 2023",
      en: "Community Development Conference 2023",
    },
    description: {
      ar: "مؤتمر سنوي يناقش قضايا التنمية المجتمعية في فلسطين",
      en: "Annual conference discussing community development issues in Palestine",
    },
    fullDescription: {
      ar: `
        <p>استضافت جمعية أصيل للتنمية الخيرية المؤتمر السنوي للتنمية المجتمعية 2023، والذي جمع نخبة من الخبراء والأكاديميين والممارسين في مجال التنمية.</p>
        
        <p>ناقش المؤتمر عدة محاور رئيسية شملت التنمية المستدامة، تمكين المرأة، تطوير التعليم، والابتكار في العمل الخيري.</p>
        
        <p>شارك في المؤتمر أكثر من 200 مشارك من مختلف المؤسسات الحكومية وغير الحكومية، بالإضافة إلى ممثلين عن المنظمات الدولية.</p>
        
        <p>تضمن المؤتمر جلسات حوارية وورش عمل تفاعلية، وخرج بتوصيات مهمة لتطوير العمل التنموي في فلسطين.</p>
        
        <p>كما شهد المؤتمر إطلاق عدة مبادرات جديدة للتعاون بين المؤسسات المختلفة في مجال التنمية المجتمعية.</p>
      `,
      en: `
        <p>Aseel Charitable Development Association hosted the Annual Community Development Conference 2023, which brought together a group of experts, academics and practitioners in the field of development.</p>
        
        <p>The conference discussed several main topics including sustainable development, women empowerment, education development, and innovation in charitable work.</p>
        
        <p>More than 200 participants from various governmental and non-governmental institutions participated in the conference, in addition to representatives of international organizations.</p>
        
        <p>The conference included dialogue sessions and interactive workshops, and came out with important recommendations for developing development work in Palestine.</p>
        
        <p>The conference also witnessed the launch of several new initiatives for cooperation between different institutions in the field of community development.</p>
      `,
    },
    type: "conference",
    category: "development",
    date: "2023-05-10",
    year: "2023",
    author: {
      ar: "اللجنة المنظمة",
      en: "Organizing Committee",
    },
    location: {
      ar: "فندق الكومودور - غزة",
      en: "Commodore Hotel - Gaza",
    },
    beneficiaries: 200,
    duration: {
      ar: "يومان",
      en: "Two days",
    },
    budget: "$15,000",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    imageCaptions: [
      {
        ar: "افتتاح مؤتمر التنمية المجتمعية",
        en: "Opening of Community Development Conference",
      },
      {
        ar: "المتحدثون الرئيسيون في المؤتمر",
        en: "Main speakers at the conference",
      },
      {
        ar: "المشاركون في المؤتمر",
        en: "Conference participants",
      },
      {
        ar: "جلسات ورش العمل التفاعلية",
        en: "Interactive workshop sessions",
      },
      {
        ar: "فعاليات التواصل والتشبيك",
        en: "Networking activities",
      },
    ],
    tags: {
      ar: ["مؤتمر", "تنمية مجتمعية", "خبراء", "توصيات", "تعاون"],
      en: ["Conference", "Community Development", "Experts", "Recommendations", "Cooperation"],
    },
    views: 3200,
    achievements: {
      ar: [
        "مشاركة 200 خبير ومختص",
        "4 جلسات حوارية رئيسية",
        "6 ورش عمل تفاعلية",
        "إطلاق 3 مبادرات جديدة",
        "توصيات تنموية مهمة",
      ],
      en: [
        "200 experts and specialists participated",
        "4 main dialogue sessions",
        "6 interactive workshops",
        "Launched 3 new initiatives",
        "Important development recommendations",
      ],
    },
    relatedItems: [1, 2],
  },
}

export default function ArchiveDetailPage() {
  const params = useParams()
  const { language, t } = useLanguage()
  const itemId = params.id as string

  const item = archiveData[itemId as keyof typeof archiveData]

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{language === "ar" ? "العنصر غير موجود" : "Item not found"}</h1>
          <Button asChild>
            <Link href="/archive">{language === "ar" ? "العودة للأرشيف" : "Back to Archive"}</Link>
          </Button>
        </div>
      </div>
    )
  }

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
    const typeNames = {
      campaign: { ar: "حملة", en: "Campaign" },
      workshop: { ar: "ورشة عمل", en: "Workshop" },
      conference: { ar: "مؤتمر", en: "Conference" },
      program: { ar: "برنامج", en: "Program" },
      event: { ar: "فعالية", en: "Event" },
      exhibition: { ar: "معرض", en: "Exhibition" },
    }
    return typeNames[type as keyof typeof typeNames]?.[language] || type
  }

  const relatedItems = item.relatedItems
    .map((id) => archiveData[id.toString() as keyof typeof archiveData])
    .filter(Boolean)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-8 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/archive" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {language === "ar" ? "العودة للأرشيف" : "Back to Archive"}
              </Link>
            </Button>

            <div className="flex items-center gap-3 mb-4">
              <Badge className={getTypeColor(item.type)}>{getTypeName(item.type)}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                {new Date(item.date).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US")}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                {item.views.toLocaleString()} {language === "ar" ? "مشاهدة" : "views"}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{item.title[language]}</h1>
            <p className="text-xl text-muted-foreground mb-6">{item.description[language]}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                <span>{item.author[language]}</span>
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
              src={item.images[0] || "/placeholder.svg"}
              alt={item.title[language]}
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
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold mb-4">{language === "ar" ? "التفاصيل" : "Details"}</h2>
                <div
                  className="prose prose-lg max-w-none text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.fullDescription[language] }}
                />
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold mb-4">{language === "ar" ? "الإنجازات" : "Achievements"}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.achievements[language].map((achievement, index) => (
                    <div key={index} className="flex items-center p-4 bg-muted/30 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 rtl:ml-3 rtl:mr-0"></div>
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-8 pt-8 border-t"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{language === "ar" ? "الكلمات المفتاحية:" : "Tags:"}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags[language].map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Image Gallery */}
              {item.images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <ImageGallery
                    images={item.images.slice(1)}
                    captions={item.imageCaptions?.slice(1)}
                    title={language === "ar" ? "معرض الصور" : "Photo Gallery"}
                  />
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">{language === "ar" ? "معلومات سريعة" : "Quick Info"}</h3>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <Users className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-muted-foreground" />
                        <span>
                          {item.beneficiaries.toLocaleString()} {language === "ar" ? "مستفيد" : "beneficiaries"}
                        </span>
                      </div>

                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-muted-foreground" />
                        <span>{item.duration[language]}</span>
                      </div>

                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-muted-foreground" />
                        <span>{item.location[language]}</span>
                      </div>

                      <div className="flex items-center text-sm">
                        <span className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-muted-foreground">💰</span>
                        <span>{item.budget}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Related Items */}
              {relatedItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-4">
                        {language === "ar" ? "عناصر ذات صلة" : "Related Items"}
                      </h3>
                      <div className="space-y-4">
                        {relatedItems.map((relatedItem) => (
                          <Link
                            key={relatedItem.id}
                            href={`/archive/${relatedItem.id}`}
                            className="block group hover:bg-muted/50 p-3 rounded-lg transition-colors"
                          >
                            <div className="flex gap-3">
                              <div className="w-16 h-16 flex-shrink-0">
                                <img
                                  src={relatedItem.images[0] || "/placeholder.svg"}
                                  alt={relatedItem.title[language]}
                                  className="w-full h-full object-cover rounded"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                  {relatedItem.title[language]}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(relatedItem.date).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US")}
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

              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">{language === "ar" ? "للاستفسار" : "For Inquiries"}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {language === "ar"
                        ? "للمزيد من المعلومات حول هذا النشاط"
                        : "For more information about this activity"}
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
