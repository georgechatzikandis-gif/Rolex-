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
    headline: 'Built\nTough',
    body: '',
    layout: 'split',
  },
  {
    image: `${BASE}watches/gmt-twotone.jpg`,
    model: 'GMT-MASTER II',
    tag: 'Rolesor',
    headline: 'World\nTime',
    body: '',
    layout: 'split-reverse',
  },
  {
    image: `${BASE}watches/gmt-gold.jpg`,
    model: 'GMT-MASTER II',
    tag: 'Yellow Gold',
    headline: 'Two\nColours',
    body: '',
    layout: 'split',
  },
  {
    image: `${BASE}watches/gmt-green.jpg`,
    model: 'GMT-MASTER II',
    tag: 'Meteorite',
    headline: 'Always\nReady',
    body: '',
    layout: 'dark-full',
  },
  {
    image: `${BASE}watches/rm-01-black.jpg`,
    model: 'RM 74-01',
    tag: 'Titanium',
    headline: 'Pure\nMechanism',
    body: '',
    layout: 'dark-full',
  },
  {
    image: `${BASE}watches/rm-02-white.jpg`,
    model: 'RM 74-02',
    tag: 'White Ceramic',
    headline: 'Radical\nHorology',
    body: '',
    layout: 'dark-full',
  },
]

// ─── Brand data ──────────────────────────────────────────────────────────────

const BRANDS = [
  {
    name: 'Rolex',
    sub: 'Crown Collection',
    year: 'Since 1905',
    image: `${BASE}watches/gmt-steel.jpg`,
  },
  {
    name: 'Richard Mille',
    sub: 'Haute Horlogerie',
    year: 'Since 2001',
    image: `${BASE}watches/rm-01-black.jpg`,
  },
  {
    name: 'Daytona',
    sub: 'Racing Heritage',
    year: 'Since 1963',
    image: `${BASE}watches/gmt-gold.jpg`,
  },
]

// ─── Ease ─────────────────────────────────────────────────────────────────────

const EASE = [0.25, 0.46, 0.45, 0.94] as const

// ─── Home ─────────────────────────────────────────────────────────────────────

function Home() {
  return (
    <main className="bg-ink text-porcelain">
      <HeroSection />
      <BrandsCarousel />
      {WATCHES.map((w, i) =>
        w.layout === 'dark-full'
          ? <DarkSection key={i} watch={w} />
          : <SplitSection key={i} watch={w} reverse={w.layout === 'split-reverse'} />,
      )}
      <ViberButton />
    </main>
  )
}

// ─── BrandsCarousel ──────────────────────────────────────────────────────────

function BrandsCarousel() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section ref={ref} className="py-20 bg-ink overflow-hidden">
      <style>{`.brands-track::-webkit-scrollbar{display:none}`}</style>

      <div className="px-8 mb-10">
        <motion.p
          className="text-[10px] tracking-[0.28em] text-gold uppercase mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          The Houses
        </motion.p>
        <motion.h2
          className="font-serif text-4xl text-porcelain"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          Our Brands
        </motion.h2>
      </div>

      <div
        className="brands-track flex gap-4 overflow-x-auto px-8 pb-6"
        style={{
          scrollSnapType: 'x mandatory' as CSSProperties['scrollSnapType'],
          WebkitOverflowScrolling: 'touch' as CSSProperties['WebkitOverflowScrolling'],
          scrollbarWidth: 'none' as CSSProperties['scrollbarWidth'],
        }}
      >
        {BRANDS.map((brand, i) => (
          <motion.div
            key={brand.name}
            className="relative flex-shrink-0 rounded-2xl overflow-hidden"
            style={{
              width: 'min(72vw, 300px)',
              height: '480px',
              scrollSnapAlign: 'start',
            }}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.13, ease: EASE }}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <p className="text-[9px] tracking-[0.32em] text-gold uppercase mb-2">{brand.year}</p>
              <h3 className="font-serif text-[2rem] leading-tight text-porcelain mb-2">{brand.name}</h3>
              <div className="flex items-center gap-3">
                <span className="text-[9px] tracking-[0.25em] text-porcelain/50 uppercase">{brand.sub}</span>
                <div className="h-px w-8 bg-gold/50 shrink-0" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
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
        <motion.button
          initial="rest"
          whileTap="pressed"
          variants={{
            rest: { scale: 1, backgroundColor: 'rgba(255,255,255,0)' },
            pressed: { scale: 0.91, backgroundColor: 'rgba(201,169,110,0.12)' },
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="flex-1 flex flex-col items-center justify-center gap-2 border-r border-porcelain/20"
          style={{ touchAction: 'manipulation' }}
        >
          <motion.span
            className="font-serif text-3xl"
            variants={{ rest: { color: '#F5F0E8' }, pressed: { color: '#C9A96E' } }}
            transition={{ duration: 0.12 }}
          >Watches</motion.span>
          <motion.span
            className="text-[10px] tracking-[0.3em] uppercase"
            variants={{ rest: { color: 'rgba(245,240,232,0.45)' }, pressed: { color: 'rgba(201,169,110,0.7)' } }}
            transition={{ duration: 0.12 }}
          >Explore Collection</motion.span>
        </motion.button>
        <motion.a
          href="tel:+306944955367"
          initial="rest"
          whileTap="pressed"
          variants={{
            rest: { scale: 1, backgroundColor: 'rgba(255,255,255,0)' },
            pressed: { scale: 0.91, backgroundColor: 'rgba(201,169,110,0.12)' },
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="flex-1 flex flex-col items-center justify-center gap-2"
          style={{ touchAction: 'manipulation' }}
        >
          <motion.span
            className="font-serif text-3xl"
            variants={{ rest: { color: '#F5F0E8' }, pressed: { color: '#C9A96E' } }}
            transition={{ duration: 0.12 }}
          >Call Us</motion.span>
          <motion.span
            className="text-[10px] tracking-[0.3em] uppercase"
            variants={{ rest: { color: 'rgba(245,240,232,0.45)' }, pressed: { color: 'rgba(201,169,110,0.7)' } }}
            transition={{ duration: 0.12 }}
          >+30 694 495 5367</motion.span>
        </motion.a>
      </nav>
    </section>
  )
}

// ─── ViberButton ─────────────────────────────────────────────────────────────

function ViberButton() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSend = () => {
    window.open('viber://chat?number=+306944955367', '_blank')
  }

  return (
    <>
      {/* Floating circle — speech bubble icon */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Chat"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
        style={{ background: '#7360F2' }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.02 2 11c0 2.67 1.19 5.07 3.08 6.74L4 20l2.54-1.27C7.91 19.55 9.9 20 12 20c5.52 0 10-4.02 10-9S17.52 2 12 2zm0 16c-1.85 0-3.58-.5-5.06-1.37l-.36-.21-2.18 1.09.74-2.28-.23-.34C3.74 13.8 3 12.46 3 11c0-4.41 4.03-8 9-8s9 3.59 9 8-4.03 8-9 8z"/>
        </svg>
      </button>

      {/* Popup */}
      {open && (
        <div
          className="fixed bottom-24 right-3 left-3 z-50 rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: '#0d1b3e', maxWidth: 460, margin: '0 auto' }}
        >
          {/* Header — purple gradient */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ background: 'linear-gradient(135deg, #6B4FE0 0%, #8B6FFF 100%)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/25 flex items-center justify-center shrink-0 text-white font-bold text-sm tracking-wide">
                PW
              </div>
              <div>
                <div className="text-white font-bold text-[15px]">Perpetual Watches</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block shrink-0" />
                  <span className="text-white/80 text-xs">Συνήθως απαντάμε σύντομα</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white text-xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/15 transition-colors"
            >✕</button>
          </div>

          {/* Body */}
          <div className="px-5 py-5" style={{ background: '#0d1b3e' }}>
            {/* Greeting bubble */}
            <div className="flex items-start gap-3 mb-5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs"
                style={{ background: 'linear-gradient(135deg, #6B4FE0 0%, #8B6FFF 100%)' }}>
                PW
              </div>
              <div className="rounded-2xl rounded-tl-none px-4 py-3 text-white text-sm leading-relaxed"
                style={{ background: '#1a2d54' }}>
                Γεια σας! 👋 Πώς μπορούμε να σας βοηθήσουμε;
              </div>
            </div>

            {/* Name input */}
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Το όνομά σας"
              className="w-full rounded-xl px-4 py-3 text-white text-sm mb-3 outline-none"
              style={{
                background: 'transparent',
                border: '1.5px solid #7360F2',
                color: 'white',
              }}
            />

            {/* Message textarea */}
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Γράψτε το μήνυμά σας..."
              rows={3}
              className="w-full rounded-xl px-4 py-3 text-white text-sm mb-4 outline-none resize-none"
              style={{
                background: 'transparent',
                border: '1.5px solid rgba(115,96,242,0.45)',
                color: 'white',
              }}
            />

            {/* Send button */}
            <button
              onClick={handleSend}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold text-sm active:opacity-80 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #6B4FE0 0%, #8B6FFF 100%)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
              Αποστολή
            </button>
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
