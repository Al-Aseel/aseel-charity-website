"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import Image from "next/image";
export default function Footer() {
  const { language, t } = useLanguage();

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const quickLinks = [
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.programs"), href: "/programs" },
    { name: t("nav.reports"), href: "/reports" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Image
                  src="/logo.jpg"
                  alt="جمعية أصيل"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <span className="font-bold text-lg hidden sm:inline-block">
                  {language === "ar" ? " جمعية أصيل" : "Aseel Association"}
                </span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              {language === "ar"
                ? "مؤسسة أهلية غير ربحية تعمل في فلسطين لتمكين الفئات المهمشة ودعم صمود المجتمع الفلسطيني"
                : "A non-profit civil institution working in Palestine to empower marginalized groups and support Palestinian community resilience"}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">
              {language === "ar" ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">
              {language === "ar" ? "معلومات الاتصال" : "Contact Information"}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>
                  {language === "ar" ? "غزة، فلسطين" : "Gaza, Palestine"}
                </span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span dir="ltr">+970 59112233</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@aseel-charity.org</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold">
              {language === "ar" ? "تابعونا" : "Follow Us"}
            </h3>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {language === "ar"
              ? `© ${new Date().getFullYear()} جمعية أصيل للتنمية الخيرية. جميع الحقوق محفوظة.`
              : `© ${new Date().getFullYear()} Aseel Charitable Development Association. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
