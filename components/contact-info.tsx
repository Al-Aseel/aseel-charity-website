"use client";

import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useSettings } from "@/components/settings-provider";
import { useLanguage } from "@/components/language-provider";

export default function ContactInfo() {
  const { settings } = useSettings();
  const { language } = useLanguage();

  if (!settings) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {language === "ar" ? "معلومات الاتصال" : "Contact Information"}
      </h3>

      <div className="space-y-3">
        {/* Phone */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Phone className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium">
              {language === "ar" ? "الهاتف" : "Phone"}
            </p>
            <a
              href={`tel:${settings.contactNumber}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              dir="ltr"
            >
              {settings.contactNumber}
            </a>
          </div>
        </div>

        {/* WhatsApp */}
        {settings.whatsappNumber && (
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <MessageCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium">
                {language === "ar" ? "واتساب" : "WhatsApp"}
              </p>
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-green-600 transition-colors"
                dir="ltr"
              >
                {settings.whatsappNumber}
              </a>
            </div>
          </div>
        )}

        {/* Email */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Mail className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium">
              {language === "ar" ? "البريد الإلكتروني" : "Email"}
            </p>
            <a
              href={`mailto:${settings.email}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {settings.email}
            </a>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <MapPin className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium">
              {language === "ar" ? "العنوان" : "Address"}
            </p>
            <p className="text-sm text-muted-foreground">{settings.address}</p>
          </div>
        </div>

        {/* Website */}
        {settings.website && (
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="h-5 w-5 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">W</span>
            </div>
            <div>
              <p className="text-sm font-medium">
                {language === "ar" ? "الموقع الإلكتروني" : "Website"}
              </p>
              <a
                href={settings.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {settings.website}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
