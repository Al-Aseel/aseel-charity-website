"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowLeft,
  Share2,
  Eye,
  User,
  Tag,
  Heart,
  Download,
  Clock,
  MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { api, getImageUrl } from "@/lib/api";
import { Activity } from "@/lib/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import ImageGallery from "@/components/image-gallery";
import Image from "next/image";
import PartnersSection from "@/components/partners-section";

export default function NewsDetailPage() {
  const { language, t } = useLanguage();
  const params = useParams();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [relatedActivities, setRelatedActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching activity with ID:", params.id);

        // Fetch the main activity
        const activityResponse = await api.getActivityById(params.id as string);
        console.log("Activity response:", activityResponse);

        if (activityResponse.data) {
          setActivity(activityResponse.data);
        } else {
          setError("النشاط غير موجود");
          return;
        }

        // Fetch related activities (last 3 activities excluding current one)
        try {
          const relatedResponse = await api.getActivities(3);
          console.log("Related activities response:", relatedResponse);

          if (relatedResponse.data && Array.isArray(relatedResponse.data)) {
            // Filter out the current activity from related activities
            const filteredRelated = relatedResponse.data.filter(
              (relatedActivity) =>
                relatedActivity._id !== activityResponse.data._id
            );
            setRelatedActivities(filteredRelated.slice(0, 3)); // Take only 3 related activities
          }
        } catch (relatedErr) {
          console.warn("Failed to fetch related activities:", relatedErr);
          // Don't fail the whole page if related activities fail
        }
      } catch (err) {
        console.error("Error fetching activity:", err);
        if (err instanceof Error) {
          if (err.message.includes("fetch")) {
            setError("خطأ في الاتصال بالخادم. تأكد من الاتصال بالإنترنت.");
          } else {
            setError(err.message);
          }
        } else {
          setError("فشل في تحميل النشاط");
        }
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === "ar" ? "خطأ" : "Error"}
          </h1>
          <p className="text-muted-foreground mb-4">
            {error ||
              (language === "ar" ? "النشاط غير موجود" : "Activity not found")}
          </p>
          <Button asChild>
            <Link href="/news">
              {language === "ar" ? "العودة للأخبار" : "Back to News"}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* JSON-LD: NewsArticle */}
      {activity && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: activity.name,
              datePublished: activity.createdAt,
              author: activity.author
                ? { "@type": "Person", name: activity.author }
                : undefined,
              description: activity.description,
              image: activity.coverImage?.url
                ? getImageUrl(activity.coverImage.url)
                : undefined,
            }),
          }}
        />
      )}
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <Button variant="ghost" asChild className="mb-4">
                <Link href="/news" className="flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {language === "ar" ? "العودة للأخبار" : "Back to News"}
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
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
                  {activity.isSpecial && (
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-800"
                    >
                      {language === "ar" ? "مميز" : "Special"}
                    </Badge>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {language === "ar" ? "منشور في" : "Published on"}{" "}
                    {new Date(activity.createdAt).toLocaleDateString(
                      language === "ar" ? "ar-EG" : "en-US"
                    )}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {activity.name}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>

                <div className="flex flex-wrap gap-4 mt-6">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: activity.name,
                          text: activity.description,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert(
                          language === "ar" ? "تم نسخ الرابط" : "Link copied"
                        );
                      }
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {language === "ar" ? "مشاركة" : "Share"}
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center text-sm">
                        <User className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-muted-foreground" />
                        <span>{activity.author}</span>
                      </div>

                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-muted-foreground" />
                        <span>
                          {new Date(activity.createdAt).toLocaleDateString(
                            language === "ar" ? "ar-EG" : "en-US"
                          )}
                        </span>
                      </div>

                      <div className="flex items-center text-sm">
                        <Tag className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-muted-foreground" />
                        <span>{activity.category}</span>
                      </div>

                      <div className="flex items-center text-sm">
                        <Eye className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 text-muted-foreground" />
                        <span>{activity.status}</span>
                      </div>
                    </div>

                    {/* Keywords */}
                    {activity.keywords && activity.keywords.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm font-medium mb-3">
                          {language === "ar" ? "الكلمات المفتاحية" : "Keywords"}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {activity.keywords.map((keyword, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Image */}
      {activity.coverImage && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative w-full max-w-6xl mx-auto"
            >
              <div className="aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={getImageUrl(activity.coverImage.url)}
                  alt={activity.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1200px"
                  className="object-cover object-center"
                  priority={false}
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              {activity.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold mb-6">
                    {language === "ar" ? "الملخص" : "Summary"}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {activity.description}
                  </p>
                </motion.div>
              )}

              {/* Content */}
              {activity.content && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold mb-6">
                    {language === "ar" ? "المحتوى الكامل" : "Full Content"}
                  </h2>
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: activity.content }}
                  />
                </motion.div>
              )}

              {/* Gallery */}
              {activity.gallery && activity.gallery.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <ImageGallery
                    images={activity.gallery.map((img) => getImageUrl(img.url))}
                    title={language === "ar" ? "معرض الصور" : "Photo Gallery"}
                  />
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Author Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "ar" ? "معلومات الكاتب" : "Author Info"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {language === "ar" ? "فريق الإعلام" : "Media Team"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Related News */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {language === "ar" ? "أخبار ذات صلة" : "Related News"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {relatedActivities.length > 0 ? (
                      <div className="space-y-3">
                        {relatedActivities.map((relatedActivity) => (
                          <Link
                            key={relatedActivity._id}
                            href={`/news/${relatedActivity._id}`}
                            className="block p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-start space-x-3 rtl:space-x-reverse">
                              {relatedActivity.coverImage && (
                                <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0">
                                  <Image
                                    src={getImageUrl(
                                      relatedActivity.coverImage.url
                                    )}
                                    alt={relatedActivity.name}
                                    fill
                                    sizes="128px"
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm mb-1 line-clamp-2">
                                  {relatedActivity.name}
                                </h4>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {relatedActivity.description}
                                </p>
                                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                  <Calendar className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                                  {new Date(
                                    relatedActivity.createdAt
                                  ).toLocaleDateString(
                                    language === "ar" ? "ar-EG" : "en-US"
                                  )}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <h4 className="font-medium text-sm mb-1">
                            {language === "ar"
                              ? "لا توجد أخبار ذات صلة"
                              : "No related news"}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {language === "ar"
                              ? "تحقق من الأخبار الأخرى"
                              : "Check other news"}
                          </p>
                        </div>
                      </div>
                    )}
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
                    <CardTitle>
                      {language === "ar" ? "للاستفسار" : "For Inquiries"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {language === "ar"
                        ? "للمزيد من المعلومات حول هذا النشاط"
                        : "For more information about this activity"}
                    </p>
                    <Button className="w-full" asChild>
                      <Link href="/contact">
                        {language === "ar" ? "اتصل بنا" : "Contact Us"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />
    </div>
  );
}
