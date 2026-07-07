"use client"

import { useEffect, useRef } from "react"
import Reveal from "@/components/reveal"
import { cn } from "@/lib/utils"
import styles from "./CakeSketchSection.module.css"

/**
 * „Torta se gradi" (V4 #18 — izvedba A, skica perom):
 * sekcija od ~250vh sa sticky vizualom; SVG linijska skica torte na stalku
 * docrtava se stroke-dashoffset-om vezanim DIREKTNO za scroll progress
 * (bez easinga — korisnik crta skrolom). Sa strane ulaze beleške slojeva.
 *
 * prefers-reduced-motion: skica odmah cela nacrtana, beleške sve vidljive,
 * bez sticky pozornice (CSS modul + JS se ne kači).
 *
 * SSR/no-JS default: path-ovi NEMAJU dasharray → skica je cela nacrtana.
 */

/** [start, end] scroll-progress prozor za svaki path, redom kao u SVG-u */
const SEGMENTS: ReadonlyArray<readonly [number, number]> = [
  [0.0, 0.08], // stalak — ploča
  [0.08, 0.16], // stalak — noga i baza
  [0.16, 0.32], // donja kora
  [0.34, 0.48], // fil (talasasta linija)
  [0.5, 0.64], // gornja kora
  [0.66, 0.78], // krem talas
  [0.78, 0.84], // kovrdža krema
  [0.86, 0.93], // malina
  [0.93, 0.99], // peteljka i list
]

interface SketchNote {
  text: string
  start: number
  end: number
  top: string
  script?: boolean
}

const NOTES: readonly SketchNote[] = [
  { text: "— kora od pistaća", start: 0.17, end: 0.3, top: "69%" },
  { text: "— srce od malina", start: 0.35, end: 0.48, top: "62%" },
  { text: "— svileni puter krem", start: 0.66, end: 0.8, top: "50%" },
  {
    text: "i vreme koje torta zasluži",
    start: 0.88,
    end: 1.0,
    top: "96%",
    script: true,
  },
]

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

export default function CakeSketchSection() {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const notesRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const stage = stageRef.current
    const svg = svgRef.current
    const notesWrap = notesRef.current
    if (!stage || !svg || !notesWrap) return

    const media = window.matchMedia("(prefers-reduced-motion: reduce)")

    let raf: number | null = null
    let cleanupScrub: (() => void) | null = null

    const startScrub = () => {
      const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"))
      const segs = paths.map((el, i) => {
        const len = el.getTotalLength()
        el.style.strokeDasharray = `${len}`
        el.style.strokeDashoffset = `${len}`
        const win = SEGMENTS[i] ?? ([0, 1] as const)
        return { el, len, start: win[0], end: win[1] }
      })
      const noteEls = Array.from(
        notesWrap.querySelectorAll<HTMLElement>("[data-note]")
      )

      const update = () => {
        raf = null
        const rect = stage.getBoundingClientRect()
        const total = stage.offsetHeight - window.innerHeight
        const p = total <= 0 ? 1 : clamp01(-rect.top / total)

        for (const seg of segs) {
          const local = clamp01((p - seg.start) / (seg.end - seg.start))
          seg.el.style.strokeDashoffset = `${seg.len * (1 - local)}`
        }
        noteEls.forEach((el, i) => {
          const note = NOTES[i]
          if (!note) return
          const o = clamp01((p - note.start) / (note.end - note.start))
          el.style.opacity = `${o}`
          el.style.transform = `translateY(${(1 - o) * 14}px)`
        })
      }

      const schedule = () => {
        if (raf === null) raf = requestAnimationFrame(update)
      }

      window.addEventListener("scroll", schedule, { passive: true })
      window.addEventListener("resize", schedule, { passive: true })
      update()

      cleanupScrub = () => {
        window.removeEventListener("scroll", schedule)
        window.removeEventListener("resize", schedule)
        if (raf !== null) cancelAnimationFrame(raf)
        raf = null
        // vrati statično stanje: skica cela, beleške vidljive
        for (const seg of segs) {
          seg.el.style.strokeDasharray = ""
          seg.el.style.strokeDashoffset = ""
        }
        for (const el of noteEls) {
          el.style.opacity = ""
          el.style.transform = ""
        }
      }
    }

    const apply = () => {
      if (media.matches) {
        cleanupScrub?.()
        cleanupScrub = null
      } else if (!cleanupScrub) {
        startScrub()
      }
    }

    apply()
    media.addEventListener("change", apply)

    return () => {
      media.removeEventListener("change", apply)
      cleanupScrub?.()
    }
  }, [])

  return (
    <section
      className={cn("section-tint", styles.section)}
      aria-labelledby="slojevi-naslov"
    >
      <div className={cn("container-site", styles.head)}>
        <Reveal>
          <span className="label mb-4 block">Slojevi</span>
          <h2 id="slojevi-naslov">Svaka torta se gradi redom</h2>
        </Reveal>
      </div>

      <div ref={stageRef} className={styles.stage}>
        <div className={styles.sticky}>
          <div ref={notesRef} className={styles.atelje}>
            <svg
              ref={svgRef}
              viewBox="0 0 440 460"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Skica perom: torta na stalku — kore, fil, krem i malina na vrhu"
              className={styles.sketch}
            >
              {/* 1 · stalak — ploča */}
              <path d="M86 352 Q220 364 354 352 Q220 380 86 352" />
              {/* 2 · stalak — noga i baza */}
              <path d="M204 368 C204 388 200 398 184 406 M236 368 C236 388 240 398 256 406 M170 410 Q220 402 270 410 Q220 426 170 410" />
              {/* 3 · donja kora */}
              <path d="M138 348 C134 334 134 318 138 304 M302 304 C306 318 306 334 302 348 M138 348 Q220 354 302 348" />
              {/* 4 · fil (talasasta linija) */}
              <path d="M136 300 Q146 291 156 300 T176 300 T196 300 T216 300 T236 300 T256 300 T276 300 T296 300" />
              {/* 5 · gornja kora */}
              <path d="M138 296 C134 282 134 264 138 250 M302 250 C306 264 306 282 302 296" />
              {/* 6 · krem talas na vrhu */}
              <path d="M132 253 Q141 231 151 249 Q159 263 169 247 Q177 231 189 249 Q197 263 207 247 Q215 231 227 249 Q235 263 245 247 Q253 231 265 249 Q273 261 283 247 Q291 233 301 251" />
              {/* 7 · kovrdža krema */}
              <path d="M207 229 C202 212 215 203 225 209 C234 214 231 227 220 229" />
              {/* 8 · malina na vrhu */}
              <path d="M226 191 a10 10 0 1 1 -20 0 a10 10 0 1 1 20 0" />
              {/* 9 · peteljka i list */}
              <path d="M216 181 Q217 172 224 168 M224 168 Q233 162 239 169 Q231 173 224 168" />
            </svg>

            {NOTES.map((note) => (
              <span
                key={note.text}
                data-note
                className={cn(styles.note, note.script && styles.script)}
                style={{ top: note.top }}
              >
                {note.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
