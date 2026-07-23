import { createFileRoute } from '@tanstack/react-router'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react'
import { useRef } from 'react'

// ─── Generated watch imagery (CDN) ────────────────────────────────────────────
const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3FuCan21Moqq9F87YZSPqZ0TuU7'
const IMGS = {
  dialMacro:    `${CDN}/hf_20260723_190704_e0feb576-171e-4f98-bc10-d220d77ab312.png`,
  bracelet:     `${CDN}/hf_20260723_190705_e9f8aac1-b2ff-47dd-b25d-544b134cc869.png`,
  side:         `${CDN}/hf_20260723_190706_67786b0d-d790-4522-8155-19a525fca2c6.png`,
  crown:        `${CDN}/hf_20260723_190707_0b5a52ae-96ce-4168-94bc-81a1ee0fa2bb.png`,
  gmtHero:      `${CDN}/hf_20260723_190719_9622a7a1-da4a-439b-9af3-d25710c7cfc6.png`,
  gmtGold:      `${CDN}/hf_20260723_190720_2a7393b2-7365-464e-863c-c1457893c33c.png`,
  gmtGreen:     `${CDN}/hf_20260723_190722_04ebc3f2-4191-42ed-9561-c25bb8612af7.png`,
  skeletonRed:  `${CDN}/hf_20260723_190725_ac9f6508-1abd-419a-ae59-11afe23ef81e.png`,
  sceneDiver:   `${CDN}/hf_20260723_190915_069ffe78-1e62-4f8a-95e2-1e53bf2d4666.png`,
  sceneMtn:     `${CDN}/hf_20260723_190917_172aa96b-a5ea-4316-98c8-9835f3270f6e.png`,
  skeletonWhite:`${CDN}/hf_20260723_190919_6ed1607e-940a-4248-8253-fa922ab65e92.png`,
}

// ─── Route ────────────────────────────────────────────────────────────────────
export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="bg-ink text-porcelain overflow-x-hidden">
      <TopBar />
      <Hero />
      <ParallaxCard
        image={IMGS.crown}
        eyebrow="Winding Crown"
        title="The touch of a craftsman."
        body="Every revolution engages decades of horological refinement, transmitting intent through hand-lapped metal."
        align="left"
      />
      <ParallaxCard
        image={IMGS.side}
        eyebrow="Case Architecture"
        title="Sculpted from a single ingot."
        body="Rose gold machined to tolerances measured in microns — where engineering becomes sculpture."
        align="right"
      />
      <BraceletSection />
      <GmtSection />
      <SkeletonSection />
      <SceneStrip />
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

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const scale     = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const imgY      = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const opacity   = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.85, 0])
  const textY     = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Zooming background */}
        <motion.img
          src={IMGS.dialMacro}
          alt="Watch dial macro"
          style={{ scale, y: imgY }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient veil */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

        {/* Hero text */}
        <motion.div
          style={{ opacity, y: textY }}
          className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-6 text-center"
        >
          <p className="text-porcelain/40 text-[10px] tracking-[0.55em] uppercase mb-5">
            A Crown for Every Achievement
          </p>
          <h2 className="font-serif text-5xl sm:text-7xl text-porcelain font-light leading-[1.04]">
            Perpetual Spirit
          </h2>
          <div className="mt-10 border border-porcelain/20 px-8 py-3 cursor-pointer hover:border-porcelain/50 transition-colors duration-300">
            <span className="text-[11px] tracking-[0.3em] text-porcelain/50 uppercase">
              Explore Heritage
            </span>
          </div>
          <div className="mt-16 flex flex-col items-center gap-2 opacity-40">
            <span className="text-[9px] tracking-[0.45em] uppercase">Scroll</span>
            <div className="w-px h-8 bg-porcelain/40" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── ParallaxCard ─────────────────────────────────────────────────────────────

interface ParallaxCardProps {
  image: string
  eyebrow: string
  title: string
  body: string
  align: 'left' | 'right'
}

function ParallaxCard({ image, eyebrow, title, body, align }: ParallaxCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const imgY    = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.88, 1], [0, 1, 1, 0])
  const textY   = useTransform(scrollYProgress, [0, 1], ['0px', '-44px'])

  return (
    <section ref={ref} className="relative h-[160vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.img
          src={image}
          alt={eyebrow}
          style={{ y: imgY }}
          className="absolute inset-0 w-full h-[115%] -top-[7.5%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-ink/25" />

        <motion.div
          style={{ opacity, y: textY }}
          className={`absolute inset-0 flex flex-col justify-end pb-20 px-8 sm:px-16 ${
            align === 'right' ? 'items-end text-right' : 'items-start text-left'
          }`}
        >
          <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4">{eyebrow}</p>
          <h2 className="font-serif text-4xl sm:text-6xl text-porcelain font-light max-w-md leading-tight">
            {title}
          </h2>
          <p className="text-mist text-sm mt-5 max-w-[280px] leading-relaxed">{body}</p>
        </motion.div>
      </div>
    </section>
  )
}

// ─── BraceletSection ──────────────────────────────────────────────────────────

function BraceletSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-15% 0px -15% 0px' })

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-32 px-6"
      style={{ background: 'radial-gradient(ellipse at center, #181818 0%, #0a0a0a 100%)' }}
    >
      <motion.div
        initial={{ y: 56, opacity: 0 }}
        animate={
          isInView
            ? {
                y: 0,
                opacity: 1,
                boxShadow:
                  '0 60px 140px rgba(0,0,0,0.95), 0 0 80px rgba(181,150,90,0.07)',
              }
            : { y: 56, opacity: 0, boxShadow: 'none' }
        }
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[320px]"
      >
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={IMGS.bracelet}
            alt="Luxury watch on rubber strap"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-gold text-[10px] tracking-[0.35em] uppercase">Sport Traveller</p>
            <h3 className="font-serif text-3xl text-porcelain font-light mt-1">The Bracelet</h3>
          </div>
          <div className="text-right">
            <p className="text-mist/50 text-[10px] tracking-widest uppercase">Oystersteel</p>
            <p className="text-mist/50 text-[10px] tracking-widest uppercase mt-1">Three-piece</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// ─── GmtSection ───────────────────────────────────────────────────────────────

function GmtSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false })

  return (
    <>
      <section ref={sectionRef}>
        <GmtHeroCard />
        <GmtGoldCard />
        <GmtGreenCard />
      </section>

      {/* Sticky model-tab that slides up while the GMT section is visible */}
      <AnimatePresence>
        {isInView && (
          <motion.div
            key="gmt-tab"
            initial={{ y: 64 }}
            animate={{ y: 0 }}
            exit={{ y: 64 }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            className="fixed bottom-0 inset-x-0 z-50"
          >
            <div className="flex items-center justify-between px-6 py-4 bg-graphite/95 backdrop-blur-md border-t border-white/5">
              <span className="text-gold text-[11px] tracking-[0.4em] font-light">
                GMT-TRAVELER
              </span>
              {/* Up chevron */}
              <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
                <path
                  d="M1 8L7 2L13 8"
                  stroke="#b5965a"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// GMT sub-card 1 — Two-tone watch on mist background with mirror reflection
function GmtHeroCard() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const watchX     = useTransform(scrollYProgress, [0.1, 0.6], ['7%', '-7%'])
  const cardOpacity= useTransform(scrollYProgress, [0, 0.08, 0.88, 1], [0, 1, 1, 0])
  const textOpacity= useTransform(scrollYProgress, [0.1, 0.35], [0, 1])
  const textY      = useTransform(scrollYProgress, [0.1, 0.4], ['28px', '0px'])

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-32 px-6"
      style={{ backgroundColor: '#c8c6c1' }}
    >
      {/* Headline */}
      <motion.div style={{ opacity: textOpacity, y: textY }} className="text-center mb-12 z-10">
        <h2 className="font-serif text-4xl sm:text-6xl text-ink font-light leading-tight max-w-xl">
          On world time,<br />crossing meridians.
        </h2>
      </motion.div>

      {/* Watch + mirror */}
      <motion.div style={{ opacity: cardOpacity }} className="relative z-10 w-full max-w-[380px]">
        <motion.img
          src={IMGS.gmtHero}
          alt="GMT Traveler two-tone watch"
          style={{ x: watchX }}
          className="w-full object-contain drop-shadow-2xl"
        />
        {/* Reflection */}
        <div
          className="w-full overflow-hidden pointer-events-none select-none"
          style={{ height: '26%', marginTop: '-1px' }}
        >
          <img
            src={IMGS.gmtHero}
            alt=""
            aria-hidden
            className="w-full object-contain"
            style={{
              transform: 'scaleY(-1)',
              opacity: 0.13,
              filter: 'blur(4px)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)',
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}

// GMT sub-card 2 — Full gold watch on cream, scale-in from small
function GmtGoldCard() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-12% 0px -12% 0px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const scale   = useTransform(scrollYProgress, [0.1, 0.52], [0.84, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.88, 1], [0, 1, 1, 0])

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-32 px-6"
      style={{ backgroundColor: '#ece7de' }}
    >
      {/* Upper headline */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif text-3xl sm:text-5xl text-ink font-light text-center mb-14 z-10"
      >
        A two-colour visual hallmark.
      </motion.h2>

      {/* Watch — scale in on scroll */}
      <motion.div style={{ scale, opacity }} className="z-10 w-full max-w-[340px]">
        <img
          src={IMGS.gmtGold}
          alt="Full yellow gold GMT-style watch"
          className="w-full object-contain drop-shadow-2xl"
        />
      </motion.div>

      {/* Lower headline */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif text-2xl sm:text-4xl text-ink font-light text-center mt-14 z-10"
      >
        Mastering materials
      </motion.h3>
    </div>
  )
}

// GMT sub-card 3 — Green-dial watch full-bleed teal scene
function GmtGreenCard() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1])
  const opacity  = useTransform(scrollYProgress, [0, 0.1, 0.88, 1], [0, 1, 1, 0])

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex flex-col items-start justify-center overflow-hidden py-32 px-8 sm:px-20"
    >
      {/* Full-bleed scene image */}
      <motion.img
        src={IMGS.gmtGreen}
        alt=""
        aria-hidden
        style={{ scale: imgScale }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark gradient left → transparent */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/65 via-ink/20 to-transparent" />

      {/* Text overlay */}
      <motion.div style={{ opacity }} className="relative z-10 max-w-sm">
        <h2 className="font-serif text-4xl sm:text-6xl text-porcelain font-light leading-tight">
          Travel around<br />the clock.
        </h2>
        <div className="w-12 h-px bg-gold/60 mt-8 mb-6" />
        <p className="text-porcelain/60 text-sm leading-relaxed">
          For those who live across time zones — a second hour hand marks home while you discover the world.
        </p>
      </motion.div>
    </div>
  )
}

// ─── SkeletonSection ──────────────────────────────────────────────────────────

function SkeletonSection() {
  return (
    <section className="bg-ink">
      <SkeletonRed />
      <SkeletonWhite />
    </section>
  )
}

// RM-01 — Scale + rotate reveal (small + tilted → full size + straight)
function SkeletonRed() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const scale        = useTransform(scrollYProgress, [0.06, 0.5], [0.52, 1])
  const rotate       = useTransform(scrollYProgress, [0.06, 0.5], [-9, 0])
  const watchOpacity = useTransform(scrollYProgress, [0.03, 0.16, 0.84, 1], [0, 1, 1, 0])
  const textOpacity  = useTransform(scrollYProgress, [0.38, 0.56], [0, 1])
  const textY        = useTransform(scrollYProgress, [0.38, 0.56], ['30px', '0px'])

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-28"
      style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, #200000 0%, #050505 100%)' }}
    >
      {/* Watch */}
      <motion.div
        style={{ opacity: watchOpacity, scale, rotate }}
        className="z-10 w-full max-w-[280px] sm:max-w-[330px]"
      >
        <img
          src={IMGS.skeletonRed}
          alt="RM-01 tonneau skeleton watch with red strap"
          className="w-full object-contain"
          style={{ filter: 'drop-shadow(0 0 40px rgba(200,0,0,0.22))' }}
        />
      </motion.div>

      {/* Text reveal */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="z-10 text-center mt-10 px-6"
      >
        <p className="text-gold text-[10px] tracking-[0.55em] uppercase">Calibre 01</p>
        <h3 className="font-serif text-5xl sm:text-7xl text-porcelain font-light mt-3">RM-01</h3>
        <p className="text-mist text-[10px] tracking-[0.25em] uppercase mt-2">
          Tourbillon Automatique
        </p>
        <div className="w-px h-12 bg-gold/30 mx-auto mt-7" />
        <p className="text-mist/50 text-xs leading-relaxed max-w-[260px] mx-auto mt-6">
          A hand-wound movement suspended within a tonneau of forged carbon,
          its mechanism fully visible through the open-worked dial.
        </p>
      </motion.div>
    </div>
  )
}

// RM-02 — Vertical clip-path reveal (slides up from bottom)
function SkeletonWhite() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const clipRaw      = useTransform(scrollYProgress, [0.08, 0.52], [100, 0])
  const clipPath     = useTransform(clipRaw, (v) => `inset(${v}% 0% 0% 0%)`)
  const watchOpacity = useTransform(scrollYProgress, [0.04, 0.16, 0.84, 1], [0, 1, 1, 0])
  const textOpacity  = useTransform(scrollYProgress, [0.4, 0.58], [0, 1])
  const textY        = useTransform(scrollYProgress, [0.4, 0.58], ['30px', '0px'])

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-28"
      style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, #0e0e14 0%, #050505 100%)' }}
    >
      {/* Watch — clip-path slides up */}
      <motion.div
        style={{ opacity: watchOpacity, clipPath }}
        className="z-10 w-full max-w-[280px] sm:max-w-[330px]"
      >
        <img
          src={IMGS.skeletonWhite}
          alt="RM-02 white ceramic skeleton watch"
          className="w-full object-contain"
          style={{ filter: 'drop-shadow(0 0 50px rgba(210,185,130,0.18))' }}
        />
      </motion.div>

      {/* Text reveal */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="z-10 text-center mt-10 px-6"
      >
        <p className="text-champagne text-[10px] tracking-[0.55em] uppercase">Calibre 02</p>
        <h3 className="font-serif text-5xl sm:text-7xl text-porcelain font-light mt-3">RM-02</h3>
        <p className="text-mist text-[10px] tracking-[0.25em] uppercase mt-2">
          White Ceramic · Rose Gold
        </p>
        <div className="w-px h-12 bg-champagne/30 mx-auto mt-7" />
        <p className="text-mist/50 text-xs leading-relaxed max-w-[260px] mx-auto mt-6">
          Nano-crystalline ceramic encases a rose gold movement of extraordinary
          complexity, revealed through a tonneau of transparent sapphire crystal.
        </p>
      </motion.div>
    </div>
  )
}

// ─── SceneStrip ───────────────────────────────────────────────────────────────

function SceneStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-stretch">
        <motion.div style={{ x }} className="flex w-[200%] h-full">
          {/* Panel 1 — Diver */}
          <div className="relative w-1/2 h-full flex-shrink-0">
            <img
              src={IMGS.sceneDiver}
              alt="Diver editorial scene"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-10 sm:p-16">
              <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-3">Submariner</p>
              <h3 className="font-serif text-4xl sm:text-5xl text-porcelain font-light">
                Depth mastered.
              </h3>
            </div>
          </div>

          {/* Panel 2 — Mountain */}
          <div className="relative w-1/2 h-full flex-shrink-0">
            <img
              src={IMGS.sceneMtn}
              alt="Mountain explorer editorial scene"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-10 sm:p-16">
              <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-3">Explorer</p>
              <h3 className="font-serif text-4xl sm:text-5xl text-porcelain font-light">
                Heights conquered.
              </h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
