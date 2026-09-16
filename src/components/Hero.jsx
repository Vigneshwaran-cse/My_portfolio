import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease },
})

/* ─── Mini glass Bento card ─── */
function BentoCard({ children, className = '', style = {}, delay = 0, glowColor }) {
  const glowStyle = glowColor
    ? { borderColor: glowColor, boxShadow: `0 0 28px ${glowColor}44, 0 0 0 1px ${glowColor}22 inset` }
    : {}
  return (
    <motion.div
      {...fadeUp(delay)}
      className={`relative overflow-hidden rounded-2xl border backdrop-blur-md p-4 ${className}`}
      style={{
        background: 'rgba(20,14,36, 0.86)',
        borderColor: 'rgba(200,180,255,0.13)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.6), 0 0 0 1px rgba(180,150,255,0.05) inset',
        ...glowStyle,
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}

/* ─── Stat number card ─── */
function StatCard({ num, label, color = '#FFB627', delay = 0 }) {
  return (
    <BentoCard delay={delay} className="flex flex-col justify-between gap-1">
      <div className="w-1 h-4 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}66` }} />
      <div>
        <div className="font-head font-extrabold text-[2.2rem] leading-none" style={{ color }}>{num}</div>
        <div className="font-mono text-[11px] text-white/30 mt-1 tracking-wide">{label}</div>
      </div>
    </BentoCard>
  )
}

/* ─── Whoami compact card ─── */
function WhoamiCard({ delay = 0 }) {
  return (
    <BentoCard delay={delay} className="col-span-2 flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-cyan shrink-0"
        style={{ boxShadow: '0 0 8px #00E5FF, 0 0 0 3px rgba(0,229,255,0.15)' }} />
      <div className="min-w-0">
        <div className="font-head font-bold text-[15px] text-white truncate">Vigneshwaran K</div>
        <div className="font-mono text-[11px] text-white/30 truncate">Java · Full-Stack Engineer · B.E. CSE</div>
      </div>
    </BentoCard>
  )
}

/* ─── Status chip card ─── */
function StatusCard({ delay = 0 }) {
  return (
    <BentoCard delay={delay} glowColor="#00E5FF" className="flex flex-col justify-between gap-2">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-cyan shrink-0 animate-pulse-dot" />
        <span className="font-mono text-[10px] text-cyan tracking-wide">available</span>
      </div>
      <div className="font-head font-bold text-[13px] text-white leading-snug">
        Open to<br />Opportunities
      </div>
      <div className="font-mono text-[10px] text-white/25">Full-time · Immediate Joiner</div>
    </BentoCard>
  )
}

/* ─── Condensed terminal row ─── */
function TerminalRow({ delay = 0 }) {
  return (
    <BentoCard delay={delay} className="col-span-3 flex flex-col gap-1.5">
      {/* dots */}
      <div className="flex gap-1.5 mb-1">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
      </div>
      <div className="font-mono text-[12px] leading-relaxed text-white/40">
        <span className="text-cyan">$</span>{' '}
        <span className="text-white/80">academic.record</span>
        {'  '}
        <span className="text-amber">→</span>
        {'  '}
        <span className="text-white">CGPA 8.81 / 10.0</span>
        <span className="text-white/25 ml-4">·  B.E. Computer Science &amp; Engineering</span>
      </div>
      <div className="font-mono text-[12px] leading-relaxed text-white/40">
        <span className="text-cyan">$</span>{' '}
        <span className="text-white/80">availability</span>
        {'  '}
        <span className="text-amber">→</span>
        {'  '}
        <span className="text-white">Immediate joiner · Open to relocation across India</span>
      </div>
    </BentoCard>
  )
}

/* ─── CTA buttons card ─── */
function CTACard({ delay = 0 }) {
  return (
    <BentoCard delay={delay} className="col-span-2 flex flex-col justify-between gap-3">
      <div className="font-mono text-[10px] text-white/25 tracking-widest uppercase">featured work</div>
      <div className="flex gap-2 flex-wrap">
        <a href="#builds"
          className="font-body font-semibold text-[13px] px-4 py-2 rounded-lg transition-all duration-200 shrink-0"
          style={{ background: 'linear-gradient(135deg,#FFB627,#FF8C00)', color: '#0D0800', boxShadow: '0 4px 16px rgba(255,182,39,0.3)' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(255,182,39,0.5)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,182,39,0.3)' }}
        >
          View Projects →
        </a>
      </div>
    </BentoCard>
  )
}

/* ─── Links compact card ─── */
function LinksCard({ delay = 0 }) {
  const links = [
    { href: 'https://github.com/Vigneshwaran-cse', label: 'GitHub', icon: '⌥' },
    { href: 'https://www.linkedin.com/in/vigneshwaran-k-090952326', label: 'LinkedIn', icon: '⌘' },
    { href: 'mailto:vigneshwaran2006csc@gmail.com', label: 'Email', icon: '@' },
  ]
  return (
    <BentoCard delay={delay} className="flex flex-col justify-between gap-2">
      <div className="font-mono text-[10px] text-white/25 tracking-widest uppercase">connect</div>
      <div className="flex flex-col gap-2">
        {links.map(({ href, label, icon }) => (
          <a key={href} href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener"
            className="flex items-center gap-2 font-mono text-[12px] text-white/40 hover:text-cyan transition-colors duration-150 w-fit"
          >
            <span className="w-5 h-5 rounded flex items-center justify-center text-[10px]"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
              {icon}
            </span>
            {label}
          </a>
        ))}
      </div>
    </BentoCard>
  )
}

/* ─── Location card ─── */
function LocationCard({ delay = 0 }) {
  return (
    <BentoCard delay={delay} className="col-span-2 flex items-center gap-3">
      <div className="w-1 h-5 rounded-full opacity-50" style={{ background: '#A064FF' }} />
      <div>
        <div className="font-body text-[13px] text-white/70 font-medium">Pudukkottai, Tamil Nadu</div>
        <div className="font-mono text-[11px] text-white/25 mt-0.5">Willing to relocate · Pan-India</div>
      </div>
    </BentoCard>
  )
}

/* ════════════════════════════════════════════
   HERO SECTION — Bento + Portrait
   ════════════════════════════════════════════ */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', background: '#0F0B1E' }}
    >
      {/* Ambient glow blobs (non-interactive) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div style={{
          position: 'absolute', top: '-10%', left: '10%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(140,80,255,0.09) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'orb-float 12s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', right: '30%',
          width: '350px', height: '350px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,130,255,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'orb-float 9s ease-in-out infinite -4s',
        }} />
      </div>

      {/*
       ══ OUTER GRID ══
       Left: Bento card grid  |  Right: Portrait (transparent-ready)
       Columns: fluid left | fixed 420px portrait column
      */}
      <div
        className="relative z-10"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 420px',
          minHeight: '100vh',
          alignItems: 'center',
        }}
      >

        {/* ══ LEFT — Content Bento Grid ══ */}
        <div className="px-5 sm:px-8 md:px-12 py-10 md:py-16 flex flex-col gap-5">

          {/* Big headline */}
          <motion.h1
            {...fadeUp(0.05)}
            className="font-head font-extrabold tracking-tight leading-[1.08]"
            style={{ fontSize: 'clamp(28px, 4vw, 50px)' }}
          >
            Designing Systems.<br />
            <span className="gradient-text">Delivering Impact.</span>
          </motion.h1>

          {/* Mobile Profile Photo Card (visible only on mobile screens) */}
          <motion.div
            {...fadeUp(0.08)}
            className="flex md:hidden items-center gap-4 p-3.5 rounded-2xl border"
            style={{
              background: 'rgba(20, 14, 36, 0.88)',
              borderColor: 'rgba(184, 127, 255, 0.25)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.6), 0 0 20px rgba(184,127,255,0.1)',
            }}
          >
            <div
              className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0"
              style={{ border: '2px solid rgba(184, 127, 255, 0.5)', boxShadow: '0 0 12px rgba(184,127,255,0.3)' }}
            >
              <img
                src="/img/profile.jpeg"
                alt="Vigneshwaran K"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 12%' }}
              />
            </div>
            <div className="min-w-0">
              <div className="font-head font-bold text-[16px] text-white truncate">Vigneshwaran K</div>
              <div className="font-mono text-[12px] text-[#B87FFF] font-medium truncate">Java &amp; Full-Stack Engineer</div>
              <div className="font-mono text-[10.5px] text-white/40 mt-0.5 truncate">Pudukkottai, TN · CGPA 8.81</div>
            </div>
          </motion.div>

          {/*
           ══ INNER BENTO GRID ══
           Responsive columns — cleanly scales from mobile to desktop
          */}
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
          >
            {/* Row 1 */}
            <WhoamiCard delay={0.18} />
            <StatCard num="8.81" label="CGPA" color="#FFB627" delay={0.22} />

            {/* Row 2 */}
            <StatCard num="2" label="Internships" color="#A064FF" delay={0.26} />
            <StatCard num="2" label="Projects" color="#00E5FF" delay={0.30} />
            <StatusCard delay={0.34} />

            {/* Row 3 — terminal (spans all 3 cols) */}
            <TerminalRow delay={0.38} />

            {/* Row 4 */}
            <CTACard delay={0.42} />
            <LinksCard delay={0.46} />

            {/* Row 5 */}
            <LocationCard delay={0.5} />
            {/* Scroll indicator chip */}
            <BentoCard delay={0.54} className="flex flex-col justify-between">
              <div className="font-mono text-[10px] text-white/20 tracking-widest uppercase">scroll</div>
              <div className="relative h-px overflow-hidden rounded-full mt-2" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="absolute top-0 left-[-60%] w-1/2 h-full"
                  style={{ background: 'linear-gradient(90deg,transparent,#00E5FF,transparent)', animation: 'scroll-slide 2.2s ease-in-out infinite' }} />
              </div>
            </BentoCard>
          </div>
        </div>

        {/*
         ══ RIGHT — Portrait Column with professional blending ══
         Face is centered, background fades to site color on all edges.
        */}
        <div
          className="portrait-col relative self-stretch overflow-hidden"
          style={{ minHeight: '100vh' }}
        >
          {/* Portrait image — centered on face */}
          <motion.img
            src="/img/profile.jpeg"
            alt="Vigneshwaran K"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 12%',
              filter: 'none',
              mixBlendMode: 'normal',
            }}
          />

          {/* Left edge blend — fades into background */}
          <div
            className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to right, #0F0B1E 0%, #0F0B1E 15%, rgba(15,11,30,0.7) 55%, transparent 100%)' }}
          />

          {/* Right edge blend */}
          <div
            className="absolute inset-y-0 right-0 w-8 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to left, #0F0B1E 0%, transparent 100%)' }}
          />

          {/* Bottom fade — professional vignette blending */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
            style={{ height: '45%', background: 'linear-gradient(to top, #0F0B1E 0%, #0F0B1E 15%, rgba(15,11,30,0.85) 50%, transparent 100%)' }}
          />

          {/* Top fade */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none z-10"
            style={{ height: '12%', background: 'linear-gradient(to bottom, #0F0B1E 0%, transparent 100%)' }}
          />

          {/* Status badge — top right */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0, ease }}
            className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md"
            style={{ background: 'rgba(15,11,30,0.88)', border: '1px solid rgba(0,229,255,0.45)', boxShadow: '0 0 20px rgba(0,229,255,0.2), 0 0 60px rgba(0,229,255,0.08)' }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse-dot shrink-0" />
            <span className="font-mono text-[11px] text-cyan">open_to_hire</span>
          </motion.div>

          {/* Location — bottom center, glassmorphism card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.15, ease }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 px-4 py-3 rounded-xl backdrop-blur-md whitespace-nowrap"
            style={{ background: 'rgba(15,11,30,0.85)', border: '1px solid rgba(200,180,255,0.12)', boxShadow: '0 4px 24px rgba(0,0,0,0.5)' }}
          >
            <div className="font-mono text-[11px] text-white/55">Pudukkottai, TN · open to relocation</div>
          </motion.div>
        </div>
      </div>

      {/* ── Responsive collapse ── */}
      <style>{`
        @media (max-width: 960px) {
          #hero > div.relative.z-10 {
            grid-template-columns: 1fr !important;
          }
          #hero .portrait-col {
            display: none;
          }
        }
        @media (max-width: 640px) {
          #hero .inner-bento {
            grid-template-columns: repeat(2, minmax(0,1fr)) !important;
          }
        }
      `}</style>
    </section>
  )
}
