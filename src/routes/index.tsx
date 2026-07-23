'use client'
import { createFileRoute } from '@tanstack/react-router'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

export const Route = createFileRoute('/')({ component: Home })

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
    image: '/watches/crown-macro.jpg',
    model: 'PERPETUAL',
    tag: 'Heritage',
    headline: 'A Crown for\nEvery Achievement',
    body: 'The mark of excellence. The symbol of perpetual precision, worn on every wrist that dares to excel.',
    layout: 'dark-full',
  },
  {
    image: '/watches/gmt-steel.jpg',
    model: 'GMT-MASTER II',
    tag: 'Oystersteel',
    headline: 'Robust and\nFunctional',
    body: 'The ideal watch for criss-crossing the globe — tracking two time zones simultaneously, without compromise.',
    layout: 'split',
  },
  {
    image: '/watches/gmt-twotone.jpg',
    model: 'GMT-MASTER II',
    tag: 'Rolesor',
    headline: 'On World Time,\nCrossing Meridians',
    body: 'Oystersteel and yellow gold, unified in purpose. A globe-trotter\'s instrument for those venturing into new horizons.',
    layout: 'split-reverse',
  },
  {
    image: '/watches/gmt-gold.jpg',
    model: 'GMT-MASTER II',
    tag: 'Yellow Gold',
    headline: 'A Two-Colour\nVisual Hallmark',
    body: 'Mastering materials in every detail, every light. The first to bear a Cerachrom bezel insert in two colours.',
    layout: 'split',
  },
  {
    image: '/watches/gmt-green.jpg',
    model: 'GMT-MASTER II',
    tag: 'Meteorite',
    headline: 'Travel Around\nthe Clock',
    body: 'Never losing touch. Never losing time. For those who travel frequently and want to nurture personal connections across the world.',
    layout: 'dark-full',
  },
  {
    image: '/watches/rm-01-black.jpg',
    model: 'RM 74-01',
    tag: 'Titanium Tourbillon',
    headline: 'The Skeleton\nPerfected',
    body: 'Carbon TPT and ceramic stripped to the essence of mechanical poetry. A flying tourbillon beating at its heart.',
    layout: 'dark-full',
  },
  {
    image: '/watches/rm-02-white.jpg',
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
    <main className="bg-ink text-porcelain overflow-x-hidden">
      <TopBar />
      {WATCHES.map((w, i) =>
        w.layout === 'dark-full'
          ? <DarkSection key={i} watch={w} />
          : <SplitSection key={i} watch={w} reverse={w.layout === 'split-reverse'} />,
      )}
    </main>
  )
}

// ─── TopBar ───────────────────────────────────────────────────────────────────

function TopBar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-5">
      <div className="flex flex-col gap-[5px] w-5 cursor-pointer">
        <span className="block w-full h-px bg-porcelain/70" />
        <span className="block w-3 h-px bg-porcelain/70" />
      </div>
      <h1
        className="font-serif tracking-[0.35em] text-lg text-porcelain/90 select-none"
        style={{ letterSpacing: '0.35em' }}
      >
        PERPETUAL
      </h1>
      <button className="text-[10px] tracking-[0.3em] text-porcelain/50 uppercase hover:text-porcelain/90 transition-colors duration-300">
        Explore
      </button>
    </header>
  )
}

// ─── DarkSection ─────────────────────────────────────────────────────────────
// Full-bleed image with gradient overlay, text bottom-left

function DarkSection({ watch }: { watch: Watch }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-18% 0px' })

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Image — subtle Ken Burns on enter */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.07 }}
        animate={inView ? { scale: 1 } : { scale: 1.07 }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <img
          src={watch.image}
          alt={watch.model}
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Gradient — stronger at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-ink/10 pointer-events-none" />

      {/* Text */}
      <div className="relative z-10 flex flex-col justify-end min-h-screen px-8 pb-16 lg:px-16 lg:pb-20">
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
