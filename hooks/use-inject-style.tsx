"use client"

import { useEffect } from "react"

export default function useInjectStyle(href: string) {
  useEffect(() => {
    // Don't insert twice
    if (document.querySelector(`link[data-href="${href}"]`)) return

    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = href
    link.dataset.href = href
    document.head.appendChild(link)

    return () => {
      // optional cleanup
      const existingLink = document.querySelector(`link[data-href="${href}"]`)
      if (existingLink) {
        document.head.removeChild(existingLink)
      }
    }
  }, [href])
}
