"use client";

import type React from "react";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/components/language-provider";
import PartnersSection from "@/components/partners-section";
import { useSettings } from "@/components/settings-provider";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language, t } = useLanguage();
  const { settings } = useSettings();
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: formData.subject,
        contactInfo: formData.phone || "",
      };
      await api.sendMessage(payload);

      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

      toast({
        title: language === "ar" ? "تم الإرسال" : "Sent",
        description:
          language === "ar"
            ? "تم إرسال رسالتك بنجاح!"
            : "Your message has been sent successfully!",
      });
    } catch (error) {
      toast({
        title: language === "ar" ? "فشل الإرسال" : "Send failed",
        description:
          language === "ar"
            ? "حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى."
            : "An error occurred while sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = useMemo(() => {
    return [
      {
        icon: MapPin,
        title: { ar: "العنوان", en: "Address" },
        content: {
          ar: settings?.address || "",
          en: settings?.address || "",
        },
      },
      {
        icon: Phone,
        title: { ar: "الهاتف", en: "Phone" },
        content: {
          ar: settings?.contactNumber || "",
          en: settings?.contactNumber || "",
        },
      },
      {
        icon: Mail,
        title: { ar: "البريد الإلكتروني", en: "Email" },
        content: {
          ar: settings?.email || "",
          en: settings?.email || "",
        },
      },
      {
        icon: Clock,
        title: { ar: "ساعات العمل", en: "Working Hours" },
        content: {
          ar:
            language === "ar"
              ? "السبت - الخميس: 8:00 ص - 3:00 م"
              : "Sunday - Thursday: 8:00 AM - 4:00 PM\nFriday: 8:00 AM - 12:00 PM",
          en:
            language === "ar"
              ? "السبت - الخميس: 8:00 ص - 3:00 م"
              : "Sunday - Thursday: 8:00 AM - 4:00 PM\nFriday: 8:00 AM - 12:00 PM",
        },
      },
    ];
  }, [settings, language]);

  const socialLinks = useMemo(() => {
    const links: { icon: any; href: string; label: string; color: string }[] =
      [];
    if (settings?.facebook) {
      links.push({
        icon: Facebook,
        href: settings.facebook,
        label: "Facebook",
        color: "text-blue-600",
      });
    }
    if (settings?.twitter) {
      links.push({
        icon: Twitter,
        href: settings.twitter,
        label: "Twitter",
        color: "text-sky-500",
      });
    }
    if (settings?.instagram) {
      links.push({
        icon: Instagram,
        href: settings.instagram,
        label: "Instagram",
        color: "text-pink-600",
      });
    }
    if (settings?.youtube) {
      links.push({
        icon: Youtube,
        href: settings.youtube,
        label: "YouTube",
        color: "text-red-600",
      });
    }
    if (settings?.whatsappNumber) {
      const digits = settings.whatsappNumber.replace(/[^0-9]/g, "");
      if (digits) {
        links.push({
          icon: MessageCircle,
          href: `https://wa.me/${digits}`,
          label: "WhatsApp",
          color: "text-green-600",
        });
      }
    }
    return links;
  }, [settings]);

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
              {t("contact.title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {language === "ar"
                ? "نحن هنا للإجابة على استفساراتكم ومساعدتكم. لا تترددوا في التواصل معنا"
                : "We are here to answer your questions and help you. Don't hesitate to contact us"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {language === "ar" ? "أرسل لنا رسالة" : "Send us a message"}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {language === "ar"
                      ? "املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن"
                      : "Fill out the form below and we will contact you as soon as possible"}
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-2"
                        >
                          {t("contact.form.name")} *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={
                            language === "ar"
                              ? "أدخل اسمك الكامل"
                              : "Enter your full name"
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-2"
                        >
                          {t("contact.form.email")} *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={
                            language === "ar"
                              ? "أدخل بريدك الإلكتروني"
                              : "Enter your email"
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium mb-2"
                        >
                          {language === "ar" ? "رقم الهاتف" : "Phone Number"}
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          dir="ltr"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={
                            language === "ar"
                              ? "أدخل رقم هاتفك"
                              : "Enter your phone number"
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium mb-2"
                        >
                          {language === "ar" ? "الموضوع" : "Subject"} *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder={
                            language === "ar"
                              ? "موضوع الرسالة"
                              : "Message subject"
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        {t("contact.form.message")} *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={
                          language === "ar"
                            ? "اكتب رسالتك هنا..."
                            : "Write your message here..."
                        }
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 rtl:ml-2 rtl:mr-0"></div>
                          {language === "ar" ? "جاري الإرسال..." : "Sending..."}
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                          {t("contact.form.send")}
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Contact Info Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4 rtl:space-x-reverse">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <info.icon className="w-6 h-6 text-primary" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-2">
                              {info.title[language]}
                            </h3>
                            <p
                              className="text-muted-foreground whitespace-pre-line"
                              dir={
                                info.title.en === "Phone" ? "ltr" : undefined
                              }
                            >
                              {info.content[language]}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">
                      {language === "ar"
                        ? "تابعونا على وسائل التواصل"
                        : "Follow us on social media"}
                    </h3>
                    <div className="flex space-x-4 rtl:space-x-reverse">
                      {socialLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.href}
                          className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors ${social.color}`}
                          aria-label={social.label}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <social.icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        title={
                          language === "ar"
                            ? "موقعنا على الخريطة"
                            : "Our Location Map"
                        }
                        src={`https://www.google.com/maps?q=31.511111,34.453806&z=15&output=embed`}
                        width="100%"
                        height="100%"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        style={{ border: 0 }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />
    </div>
  );
}
