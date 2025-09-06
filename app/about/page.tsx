"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Award, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import PartnersSection from "@/components/partners-section";

const values = [
  {
    icon: Heart,
    title: {
      ar: "الشفافية",
      en: "Transparency",
    },
    description: {
      ar: "نلتزم بالشفافية الكاملة في جميع أعمالنا وأنشطتنا",
      en: "We are committed to complete transparency in all our work and activities",
    },
  },
  {
    icon: Users,
    title: {
      ar: "العدالة الاجتماعية",
      en: "Social Justice",
    },
    description: {
      ar: "نسعى لتحقيق العدالة الاجتماعية وتمكين الفئات المهمشة",
      en: "We strive to achieve social justice and empower marginalized groups",
    },
  },
  {
    icon: Award,
    title: {
      ar: "الجودة والإتقان",
      en: "Quality and Excellence",
    },
    description: {
      ar: "نحرص على تقديم خدمات عالية الجودة في جميع مشاريعنا",
      en: "We are committed to providing high-quality services in all our projects",
    },
  },
  {
    icon: Globe,
    title: {
      ar: "الاستدامة",
      en: "Sustainability",
    },
    description: {
      ar: "نركز على التنمية المستدامة والحلول طويلة المدى",
      en: "We focus on sustainable development and long-term solutions",
    },
  },
];

export default function AboutPage() {
  const { language, t } = useLanguage();

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
              {t("about.title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {language === "ar"
                ? "جمعية أصيل للتنمية الخيرية هي مؤسسة أهلية غير ربحية تعمل في فلسطين لتمكين الفئات المهمشة ودعم صمود المجتمع الفلسطيني"
                : "Aseel Charitable Development Association is a non-profit civil institution working in Palestine to empower marginalized groups and support Palestinian community resilience"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <Eye className="w-8 h-8 text-primary mr-3 rtl:ml-3 rtl:mr-0" />
                    <CardTitle className="text-2xl">
                      {t("about.vision.title")}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {language === "ar"
                      ? "أن نكون المؤسسة الرائدة في مجال التنمية المجتمعية والعمل الإنساني في فلسطين، ونساهم في بناء مجتمع فلسطيني قادر على الصمود والتطور والازدهار رغم التحديات."
                      : "To be the leading institution in the field of community development and humanitarian work in Palestine, and contribute to building a Palestinian society capable of resilience, development and prosperity despite challenges."}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <Target className="w-8 h-8 text-primary mr-3 rtl:ml-3 rtl:mr-0" />
                    <CardTitle className="text-2xl">
                      {t("about.mission.title")}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {language === "ar"
                      ? "تمكين الفئات المهمشة في المجتمع الفلسطيني من خلال تقديم برامج تنموية وإنسانية مستدامة، وتعزيز قدراتهم الاقتصادية والاجتماعية والثقافية، مع التركيز على النساء والأطفال والشباب وذوي الاحتياجات الخاصة."
                      : "Empowering marginalized groups in Palestinian society through providing sustainable developmental and humanitarian programs, and enhancing their economic, social and cultural capabilities, with focus on women, children, youth and people with special needs."}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("about.values.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "ar"
                ? "القيم الأساسية التي توجه عملنا وتحدد هويتنا المؤسسية"
                : "The core values that guide our work and define our institutional identity"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <value.icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">
                      {value.title[language]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {value.description[language]}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Structure */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === "ar"
                ? "الهيكل التنظيمي"
                : "Organizational Structure"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "ar"
                ? "هيكل تنظيمي متطور يضمن الكفاءة والفعالية في تنفيذ المشاريع والبرامج"
                : "An advanced organizational structure that ensures efficiency and effectiveness in implementing projects and programs"}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <img
                src="/placeholder.svg?height=400&width=800"
                alt={
                  language === "ar"
                    ? "الهيكل التنظيمي"
                    : "Organizational Structure"
                }
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Partners Section */}
      <PartnersSection />
    </div>
  );
}
