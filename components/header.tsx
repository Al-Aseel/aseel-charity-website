"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/components/language-provider";
import { useSettings } from "@/components/settings-provider";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { getLogoUrl, getWebsiteName } = useSettings();
  const { theme, setTheme } = useTheme();

  // Split website name into two lines (top/bottom)
  const siteName = getWebsiteName(language);
  const [nameTop, nameBottom] = (() => {
    const parts = siteName.trim().split(/\s+/);
    if (parts.length <= 1) return [siteName, ""];
    return [
      parts.slice(0, Math.ceil(parts.length / 2)).join(" "),
      parts.slice(Math.ceil(parts.length / 2)).join(" "),
    ];
  })();

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.programs"), href: "/programs" },
    { name: t("nav.reports"), href: "/reports" },
    { name: t("nav.archive"), href: "/archive" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 ">
        <div className="flex h-[13vh] items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <div className="relative h-12 w-12 md:h-14 md:w-14 rounded-full overflow-hidden ring-2 ring-primary shadow-sm bg-background">
              <Image
                src={getLogoUrl()}
                alt={getWebsiteName("ar")}
                fill
                sizes="(min-width: 768px) 56px, 48px"
                className="object-cover"
                priority
              />
            </div>
            <span className="flex flex-col leading-tight">
              <span className="font-bold text-base md:text-lg">{nameTop}</span>
              {nameBottom ? (
                <span className="text-xs md:text-sm text-muted-foreground">
                  {nameBottom}
                </span>
              ) : null}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse">
            <LayoutGroup id="desktop-nav">
              {navigation.map((item) => (
                <motion.div
                  key={item.href}
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className={`text-lg font-medium transition-all duration-300 hover:text-primary relative ${
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </LayoutGroup>
          </nav>

          {/* Search and Language Toggle */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {/* Search */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="h-9 w-9 p-0"
              >
                <Search className="h-4 w-4" />
              </Button>

              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute top-full mt-2 right-0 rtl:left-0 rtl:right-auto w-80 bg-background border rounded-lg shadow-lg p-4"
                  >
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Input
                        placeholder={t("search.placeholder")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1"
                      />
                      <Button size="sm" asChild>
                        <Link
                          href={`/search?q=${encodeURIComponent(searchQuery)}`}
                        >
                          {t("nav.search")}
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 p-0"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Language Toggle */}
            {/* <Button variant="ghost" size="sm" onClick={toggleLanguage} className="h-9 px-3">
              <Globe className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
              {language === "ar" ? "EN" : "عر"}
            </Button> */}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden h-9 w-9 p-0"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side={language === "ar" ? "right" : "left"}>
                <div className="flex flex-col space-y-4 mt-8">
                  <LayoutGroup id="mobile-nav">
                    {navigation.map((item) => (
                      <motion.div
                        key={item.href}
                        whileHover={{ x: 5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          href={item.href}
                          className={`text-lg font-medium transition-all duration-300 hover:text-primary relative ${
                            pathname === item.href
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {item.name}
                          {pathname === item.href && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </LayoutGroup>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
