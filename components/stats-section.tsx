"use client";

import { motion } from "framer-motion";
import { Users, Heart, Award, Globe } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const stats = [
  {
    icon: Users,
    value: "15,000+",
    label: {
      ar: "مستفيد",
      en: "Beneficiaries",
    },
  },
  {
    icon: Heart,
    value: "250+",
    label: {
      ar: "مشروع منفذ",
      en: "Completed Projects",
    },
  },
  {
    icon: Award,
    value: "10+",
    label: {
      ar: "سنوات خبرة",
      en: "Years of Experience",
    },
  },
  {
    icon: Globe,
    value: "50+",
    label: {
      ar: "شريك محلي ودولي",
      en: "Local & International Partners",
    },
  },
];

export default function StatsSection() {
  const { language } = useLanguage();

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base opacity-90">
                {stat.label[language]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
