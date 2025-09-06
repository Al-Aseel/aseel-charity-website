"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { useSettings } from "@/components/settings-provider";
import { api, getImageUrl } from "@/lib/api";
import { Activity } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import NewsSkeleton from "@/components/news-skeleton";

export default function NewsSection() {
  const { language, t } = useLanguage();
  const { getMainColor } = useSettings();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debug log for render
  console.log(
    "NewsSection render - loading:",
    loading,
    "error:",
    error,
    "activities:",
    activities.length
  );

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Starting to fetch activities...");

        const response = await api.getActivities(3);
        console.log("Full API Response:", response);
        console.log("Response structure:", {
          status: response.status,
          message: response.message,
          data: response.data,
          dataType: typeof response.data,
          dataKeys: response.data ? Object.keys(response.data) : "no data",
        });

        // Check if response.data exists and has activities
        if (!response.data) {
          console.error("No data in response");
          setError("لا توجد بيانات في الاستجابة");
          setActivities([]);
          return;
        }

        // Handle different possible API response structures
        let activities = [];

        // Try different possible structures
        if (
          response.data.activities &&
          Array.isArray(response.data.activities)
        ) {
          // Standard structure: { data: { activities: [...] } }
          activities = response.data.activities;
          console.log(
            "Using standard structure - activities from response.data.activities"
          );
        } else if (Array.isArray(response.data)) {
          // Direct array structure: { data: [...] }
          activities = response.data;
          console.log(
            "Using direct array structure - activities from response.data"
          );
        } else if (
          (response as any).activities &&
          Array.isArray((response as any).activities)
        ) {
          // Alternative structure: { activities: [...] }
          activities = (response as any).activities;
          console.log(
            "Using alternative structure - activities from response.activities"
          );
        } else {
          console.error("Could not find activities in any expected structure");
          console.log("Full response object:", response);
          console.log("Response.data:", response.data);
          console.log(
            "Available keys in response.data:",
            Object.keys(response.data)
          );

          // Try to extract any array from the response
          const possibleArrays = Object.values(response.data).filter(
            Array.isArray
          );
          if (possibleArrays.length > 0) {
            console.log("Found possible array in response:", possibleArrays[0]);
            activities = possibleArrays[0];
          } else {
            setError("هيكل البيانات غير متوقع");
            setActivities([]);
            return;
          }
        }

        console.log("Final extracted activities:", activities);
        console.log("Activities count:", activities.length);
        console.log("Activities type:", typeof activities);
        console.log("Is array:", Array.isArray(activities));

        // Validate that we have valid activities
        if (!Array.isArray(activities)) {
          console.error("Activities is not an array:", activities);
          setError("تنسيق البيانات غير صحيح");
          setActivities([]);
          return;
        }

        if (activities.length > 0) {
          console.log("First activity:", activities[0]);
          // Validate first activity structure
          if (!activities[0]._id || !activities[0].name) {
            console.warn(
              "Activity structure may be incomplete:",
              activities[0]
            );
          }
        } else {
          console.log("No activities found in response");
        }

        setActivities(activities);
        console.log("Activities state set successfully");
      } catch (err) {
        console.error("Error fetching activities:", err);
        if (err instanceof Error) {
          if (err.message.includes("fetch")) {
            setError("خطأ في الاتصال بالخادم. تأكد من الاتصال بالإنترنت.");
          } else {
            setError(err.message);
          }
        } else {
          setError("فشل في تحميل الأنشطة");
        }
        setActivities([]); // Set empty array on error
      } finally {
        console.log("Setting loading to false");
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("home.news.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === "ar"
              ? "تابع آخر أنشطتنا ومشاريعنا التي نقوم بها لخدمة المجتمع الفلسطيني"
              : "Follow our latest activities and projects that we carry out to serve the Palestinian community"}
          </p>
        </motion.div>

        {loading ? (
          <NewsSkeleton count={3} />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              إعادة المحاولة
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(() => {
              console.log("Rendering activities:", {
                activities,
                length: activities?.length,
                isArray: Array.isArray(activities),
                type: typeof activities,
              });
              return null;
            })()}
            {activities && activities.length > 0 ? (
              activities.map((activity, index) => {
                console.log(`Rendering activity ${index}:`, activity);
                return (
                  <motion.div
                    key={activity._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <img
                          src={
                            activity.coverImage?.url
                              ? getImageUrl(activity.coverImage.url)
                              : "/placeholder.svg"
                          }
                          alt={activity.name || "Activity image"}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.warn(
                              "Image failed to load:",
                              activity.coverImage?.url
                            );
                            (e.target as HTMLImageElement).src =
                              "/placeholder.svg";
                          }}
                        />
                        <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto">
                          <span className="bg-primary-custom text-white px-2 py-1 rounded text-xs font-medium">
                            {activity.type === "new"
                              ? language === "ar"
                                ? "خبر"
                                : "News"
                              : language === "ar"
                                ? "نشاط"
                                : "Activity"}
                          </span>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <Calendar className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                          {activity.createdAt
                            ? new Date(activity.createdAt).toLocaleDateString(
                                language === "ar" ? "ar-EG" : "en-US"
                              )
                            : "تاريخ غير محدد"}
                        </div>
                        <h3 className="font-semibold text-lg leading-tight">
                          {activity.name}
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {activity.description}
                        </p>
                        <Button
                          variant="ghost"
                          className="p-0 h-auto font-medium text-primary-custom hover:text-primary-custom/80"
                          asChild
                        >
                          <Link href={`/news/${activity._id}`}>
                            {t("common.read-more")}
                            <ArrowRight className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  {language === "ar"
                    ? "لا توجد أنشطة متاحة حالياً"
                    : "No activities available at the moment"}
                </p>
              </div>
            )}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline" asChild>
            <Link href="/archive">
              {t("common.view-all")}
              <ArrowRight className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
