"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** 0–3: stepenasto kašnjenje unutar iste sekcije */
  delay?: 0 | 1 | 2 | 3
  as?: "div" | "section" | "li" | "span"
}

/**
 * Reveal-on-scroll: element ulazi JEDNOM (translate + opacity, ≤400ms).
 * CSS živi u globals.css (.reveal / .is-visible); prefers-reduced-motion
 * ga potpuno gasi. Bez layout thrashing-a — samo class toggle.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const Tag = as as React.ElementType

  return (
    <Tag
      ref={ref}
      className={cn(
        "reveal",
        delay > 0 && `reveal-delay-${delay}`,
        className
      )}
    >
      {children}
    </Tag>
  )
}
