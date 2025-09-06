"use client";

import { useEffect } from "react";
import { useSettings } from "./settings-provider";

export default function ThemeColorProvider() {
  const { getMainColor } = useSettings();

  useEffect(() => {
    const mainColor = getMainColor();

    // Convert hex to HSL for better color manipulation
    const hexToHsl = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0,
        s = 0,
        l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    };

    const [h, s, l] = hexToHsl(mainColor);

    // Update CSS custom properties with HSL values
    document.documentElement.style.setProperty("--primary", `${h} ${s}% ${l}%`);
    document.documentElement.style.setProperty(
      "--primary-foreground",
      "0 0% 100%"
    );

    // Update ring color (for focus states)
    document.documentElement.style.setProperty("--ring", `${h} ${s}% ${l}%`);

    // Update accent colors
    document.documentElement.style.setProperty(
      "--accent",
      `${h} ${s}% ${Math.min(l + 20, 95)}%`
    );
    document.documentElement.style.setProperty(
      "--accent-foreground",
      `${h} ${s}% ${Math.max(l - 40, 5)}%`
    );

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", mainColor);
    } else {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = mainColor;
      document.head.appendChild(meta);
    }

    // Update gradient classes
    const style = document.createElement("style");
    style.id = "dynamic-theme-colors";
    style.textContent = `
      .gradient-primary {
        background: linear-gradient(135deg, ${mainColor} 0%, ${mainColor}dd 100%);
      }
      .gradient-primary-hover:hover {
        background: linear-gradient(135deg, ${mainColor}dd 0%, ${mainColor}bb 100%);
      }
      .text-primary-custom {
        color: ${mainColor};
      }
      .bg-primary-custom {
        background-color: ${mainColor};
      }
      .border-primary-custom {
        border-color: ${mainColor};
      }
    `;

    // Remove existing dynamic styles
    const existingStyle = document.getElementById("dynamic-theme-colors");
    if (existingStyle) {
      existingStyle.remove();
    }

    document.head.appendChild(style);
  }, [getMainColor]);

  return null;
}
