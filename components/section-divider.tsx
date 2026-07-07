"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import styles from "./section-divider.module.css"

/**
 * SectionDivider (V4 E3c — „linija koja se iscrta"):
 * tanka 1px linija (espresso 13% opacity) koja se na ulasku u viewport
 * iscrta od SREDINE ka ivicama (scaleX 0→1, transform-origin center,
 * 800ms ease, JEDNOM — IntersectionObserver).
 * prefers-reduced-motion: linija odmah puna (CSS modul).
 */
export default function SectionDivider({ className }: { className?: string }) {
  const lineRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const el = lineRef.current
    const drawnClass = styles.drawn
    if (!el || !drawnClass) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add(drawnClass)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={cn(styles.wrap, className)} aria-hidden="true">
      <span ref={lineRef} className={styles.line} />
    </div>
  )
}
