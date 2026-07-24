'use client'
import { createFileRoute } from '@tanstack/react-router'
import { motion, useInView } from 'motion/react'
import { type CSSProperties, useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({ component: Home })

// ─── Base path (handles GitHub Pages /Rolex-/ subpath) ───────────────────────
const BASE = import.meta.env.BASE_URL

// ─── Watch data ───────────────────────────────────────────────────────────────

type Layout = 'dark-full' | 'split' | 'split-reverse'

type Watch = {
  image: string
  model: string
  tag: string
  headline: string
  body: string
  layout: Layout
}

const WATCHES: Watch[] = [
  {
    image: `${BASE}watches/gmt-steel.jpg`,
    model: 'GMT-MASTER II',
    tag: 'Oystersteel',
    headline: 'Robust and\nFunctional',
    body: 'The ideal watch for criss-crossing the globe — tracking two time zones simultaneously, without compromise.',
    layout: 'split',
  },
  {
    image: `${BASE}watches/gmt-twotone.jpg`,
    model: 'GMT-MASTER II',
    tag: 'Rolesor',
    headline: 'On World Time,\nCrossing Meridians',
    body: 'Oystersteel and yellow gold, unified in purpose. A globe-trotter\'s instrument for those venturing into new horizons.',
    layout: 'split-reverse',
  },
  {
    image: `${BASE}watches/gmt-gold.jpg`,
    model: 'GMT-MASTER II',
    tag: 'Yellow Gold',
    headline: 'A Two-Colour\nVisual Hallmark',
    body: 'Mastering materials in every detail, every light. The first to bear a Cerachrom bezel insert in two colours.',
    layout: 'split',
  },
  {
    image: `${BASE}watches/gmt-green.jpg`,
    model: 'GMT-MASTER II',
    tag: 'Meteorite',
    headline: 'Travel Around\nthe Clock',
    body: 'Never losing touch. Never losing time. For those who travel frequently and want to nurture personal connections across the world.',
    layout: 'dark-full',
  },
  {
    image: `${BASE}watches/rm-01-black.jpg`,
    model: 'RM 74-01',
    tag: 'Titanium Tourbillon',
    headline: 'The Skeleton\nPerfected',
    body: 'Carbon TPT and ceramic stripped to the essence of mechanical poetry. A flying tourbillon beating at its heart.',
    layout: 'dark-full',
  },
  {
    image: `${BASE}watches/rm-02-white.jpg`,
    model: 'RM 74-02',
    tag: 'White Ceramic',
    headline: 'Radical\nHorology',
    body: 'White ceramic case, rose gold bridges — an open-heart tourbillon that reveals the full architecture of time.',
    layout: 'dark-full',
  },
]

// ─── Ease ─────────────────────────────────────────────────────────────────────

const EASE = [0.25, 0.46, 0.45, 0.94] as const

// ─── Home ─────────────────────────────────────────────────────────────────────

function Home() {
  return (
    <main className="bg-ink text-porcelain">
      <HeroSection />
      {WATCHES.map((w, i) =>
        w.layout === 'dark-full'
          ? <DarkSection key={i} watch={w} />
          : <SplitSection key={i} watch={w} reverse={w.layout === 'split-reverse'} />,
      )}
      <ViberButton />
    </main>
  )
}

// ─── HeroSection ─────────────────────────────────────────────────────────────
// Full-screen hero: video background + nav (Watches | Contact)

function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!canvas || !video) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let rafId = 0
    const draw = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      rafId = requestAnimationFrame(draw)
    }
    const start = () => { if (!rafId) draw() }
    video.addEventListener('canplay', start)
    if (video.readyState >= 3) start()
    return () => {
      video.removeEventListener('canplay', start)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section className="relative w-full h-screen bg-ink flex flex-col">
      {/* Video background */}
      <video
        ref={videoRef}
        src={`${BASE}hero.mp4`}
        autoPlay muted loop playsInline
        style={{ position: 'absolute', opacity: 0, width: 1, height: 1 } as CSSProperties}
      />
      <canvas
        ref={canvasRef}
        width={720} height={802}
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: 'cover', pointerEvents: 'none' } as CSSProperties}
      />

      {/* Brand — top */}
      <div className="relative z-10 flex items-center justify-center gap-4 py-8 border-b border-porcelain/20 select-none">
        <svg width="22" height="20" viewBox="0 0 30 26" fill="none" className="text-gold">
          <path d="M3 23V13.5L8.5 19L15 5L21.5 19L27 13.5V23H3Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
          <rect x="3" y="23" width="24" height="2" rx="0.4" fill="currentColor" />
          <circle cx="15" cy="5" r="1.4" fill="currentColor" />
          <circle cx="3" cy="13.5" r="1.4" fill="currentColor" />
          <circle cx="27" cy="13.5" r="1.4" fill="currentColor" />
        </svg>
        <span className="font-serif tracking-[0.35em] text-base text-porcelain" style={{ letterSpacing: '0.35em' }}>PERPETUAL</span>
      </div>

      {/* Nav — fills remaining space */}
      <nav className="relative z-10 flex flex-1">
        <button className="flex-1 flex flex-col items-center justify-center gap-2 border-r border-porcelain/20 group hover:bg-white/5 transition-colors duration-300">
          <span className="font-serif text-3xl text-porcelain group-hover:text-gold transition-colors duration-300">Watches</span>
          <span className="text-[10px] tracking-[0.3em] text-porcelain/50 uppercase">Explore Collection</span>
        </button>
        <a href="tel:+306944955367" className="flex-1 flex flex-col items-center justify-center gap-2 group hover:bg-white/5 transition-colors duration-300">
          <span className="font-serif text-3xl text-porcelain group-hover:text-gold transition-colors duration-300">Call Us</span>
          <span className="text-[10px] tracking-[0.3em] text-porcelain/50 uppercase">+30 694 495 5367</span>
        </a>
      </nav>
    </section>
  )
}

// ─── ViberButton ─────────────────────────────────────────────────────────────

function ViberButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating circle button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Chat on Viber"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
        style={{ background: '#7360F2' }}
      >
        <svg width="28" height="28" viewBox="0 0 32 32" fill="white">
          <path d="M16 2C8.27 2 2 8.05 2 15.5c0 3.6 1.43 6.87 3.76 9.3L4 28l3.6-1.1A13.8 13.8 0 0016 29c7.73 0 14-6.05 14-13.5S23.73 2 16 2zm6.3 17.4c-.28.8-1.6 1.52-2.22 1.6-.56.08-1.27.12-2.04-.13-.47-.15-1.07-.35-1.84-.68-3.22-1.38-5.3-4.6-5.46-4.81-.16-.22-1.3-1.73-1.3-3.3 0-1.57.82-2.35 1.12-2.67.3-.33.65-.41.87-.41h.62c.2 0 .47.08.73.56.28.5 1.28 3.13 1.38 3.36.1.22.17.48.03.77-.13.3-.2.48-.4.73l-.43.5c-.18.17-.37.36-.16.7.22.35.97 1.6 2.08 2.6 1.43 1.27 2.64 1.66 3.01 1.85.37.18.58.15.8-.09l.73-.87c.23-.3.46-.24.77-.14l2.45 1.15c.28.13.47.2.54.32.08.22-.06.9-.27 1.46z"/>
        </svg>
      </button>

      {/* Popup */}
      {open && (
        <div className="fixed bottom-24 right-4 z-50 rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#1a1a2e', width: 'min(340px, calc(100vw - 2rem))' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4" style={{ background: '#7360F2' }}>
            <div className="flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="white">
                <path d="M16 2C8.27 2 2 8.05 2 15.5c0 3.6 1.43 6.87 3.76 9.3L4 28l3.6-1.1A13.8 13.8 0 0016 29c7.73 0 14-6.05 14-13.5S23.73 2 16 2zm6.3 17.4c-.28.8-1.6 1.52-2.22 1.6-.56.08-1.27.12-2.04-.13-.47-.15-1.07-.35-1.84-.68-3.22-1.38-5.3-4.6-5.46-4.81-.16-.22-1.3-1.73-1.3-3.3 0-1.57.82-2.35 1.12-2.67.3-.33.65-.41.87-.41h.62c.2 0 .47.08.73.56.28.5 1.28 3.13 1.38 3.36.1.22.17.48.03.77-.13.3-.2.48-.4.73l-.43.5c-.18.17-.37.36-.16.7.22.35.97 1.6 2.08 2.6 1.43 1.27 2.64 1.66 3.01 1.85.37.18.58.15.8-.09l.73-.87c.23-.3.46-.24.77-.14l2.45 1.15c.28.13.47.2.54.32.08.22-.06.9-.27 1.46z"/>
              </svg>
              <div>
                <div className="text-white font-semibold text-base">Viber</div>
                <div className="text-white/70 text-xs">Συνήθως απαντάμε άμεσα</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white text-xl leading-none w-8 h-8 flex items-center justify-center">✕</button>
          </div>

          {/* Body */}
          <div className="px-6 py-7">
            <p className="text-porcelain/80 text-base leading-relaxed mb-6">
              Έχετε ερωτήσεις για κάποιο ρολόι; Στείλτε μας μήνυμα στο Viber και θα σας απαντήσουμε άμεσα.
            </p>
            <a
              href="viber://chat?number=+306944955367"
              className="flex items-center justify-center gap-3 w-full text-center text-white text-sm font-semibold tracking-widest uppercase py-4 rounded-xl transition-opacity duration-200 hover:opacity-90"
              style={{ background: '#7360F2' }}
            >
              <svg width="18" height="18" viewBox="0 0 32 32" fill="white">
                <path d="M16 2C8.27 2 2 8.05 2 15.5c0 3.6 1.43 6.87 3.76 9.3L4 28l3.6-1.1A13.8 13.8 0 0016 29c7.73 0 14-6.05 14-13.5S23.73 2 16 2zm6.3 17.4c-.28.8-1.6 1.52-2.22 1.6-.56.08-1.27.12-2.04-.13-.47-.15-1.07-.35-1.84-.68-3.22-1.38-5.3-4.6-5.46-4.81-.16-.22-1.3-1.73-1.3-3.3 0-1.57.82-2.35 1.12-2.67.3-.33.65-.41.87-.41h.62c.2 0 .47.08.73.56.28.5 1.28 3.13 1.38 3.36.1.22.17.48.03.77-.13.3-.2.48-.4.73l-.43.5c-.18.17-.37.36-.16.7.22.35.97 1.6 2.08 2.6 1.43 1.27 2.64 1.66 3.01 1.85.37.18.58.15.8-.09l.73-.87c.23-.3.46-.24.77-.14l2.45 1.15c.28.13.47.2.54.32.08.22-.06.9-.27 1.46z"/>
              </svg>
              Έναρξη Συνομιλίας
            </a>
          </div>
        </div>
      )}
    </>
  )
}

// ─── DarkSection ─────────────────────────────────────────────────────────────
// Image on top, text panel below — no overlay so the image is fully visible

function DarkSection({ watch }: { watch: Watch }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })

  return (
    <section ref={ref} className="flex flex-col min-h-screen">
      {/* Image — Ken Burns on enter, takes upper portion */}
      <div className="relative overflow-hidden flex-1 min-h-[60vw] lg:min-h-[65vh]">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.07 }}
          animate={inView ? { scale: 1 } : { scale: 1.07 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <img
            src={watch.image}
            alt={watch.model}
            className="w-full h-full object-cover object-top"
          />
        </motion.div>
      </div>

      {/* Text panel below the image */}
      <div className="bg-ink px-8 py-12 lg:px-16 lg:py-16">
        <TextBlock watch={watch} inView={inView} />
      </div>
    </section>
  )
}

// ─── SplitSection ────────────────────────────────────────────────────────────
// Dark text panel + image panel, optionally reversed

function SplitSection({ watch, reverse }: { watch: Watch; reverse?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })

  const textPanel = (
    <div className="flex flex-col justify-center bg-ink px-8 py-20 lg:px-16 lg:w-5/12 shrink-0">
      <TextBlock watch={watch} inView={inView} />
    </div>
  )

  const imagePanel = (
    <div className="relative overflow-hidden min-h-[75vw] lg:min-h-0 flex-1">
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: reverse ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }}
        animate={inView ? { clipPath: 'inset(0 0% 0 0%)' } : {}}
        transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
      >
        <img
          src={watch.image}
          alt={watch.model}
          className="w-full h-full object-cover object-center"
        />
      </motion.div>
    </div>
  )

  return (
    <section ref={ref} className="flex flex-col lg:flex-row min-h-screen">
      {reverse ? <>{imagePanel}{textPanel}</> : <>{textPanel}{imagePanel}</>}
    </section>
  )
}

// ─── TextBlock ────────────────────────────────────────────────────────────────

function TextBlock({ watch, inView }: { watch: Watch; inView: boolean }) {
  return (
    <>
      <motion.p
        className="font-sans text-[10px] tracking-[0.28em] text-gold uppercase mb-5"
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
      >
        {watch.tag}
      </motion.p>

      <motion.h2
        className="font-serif text-5xl lg:text-7xl text-porcelain leading-[1.05] mb-6 whitespace-pre-line"
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, delay: 0.38, ease: EASE }}
      >
        {watch.headline}
      </motion.h2>

      <motion.p
        className="font-sans text-sm text-mist leading-relaxed max-w-sm mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
      >
        {watch.body}
      </motion.p>

      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.72, ease: EASE }}
      >
        <span className="font-sans text-[9px] tracking-[0.32em] text-mist/70 uppercase">
          {watch.model}
        </span>
        <div className="w-10 h-px bg-gold/60" />
      </motion.div>
    </>
  )
}
