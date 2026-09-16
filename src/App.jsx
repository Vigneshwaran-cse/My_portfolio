import { useEffect, useRef } from 'react'
import Rail from './components/Rail'
import MobileNav from './components/MobileNav'
import Hero from './components/Hero'
import BentoSection from './components/BentoSection'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Certs from './components/Certs'
import Connect from './components/Connect'

/* ── Custom Cursor ── */
function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    const glow = glowRef.current
    if (!dot || !ring || !glow) return

    /* Completely disable on mobile, tablet, and touch devices */
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches || window.innerWidth < 1024
    if (isTouch) {
      dot.style.display = 'none'
      ring.style.display = 'none'
      glow.style.display = 'none'
      return
    }

    /* Respect reduced-motion */
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      dot.style.display = 'none'
      ring.style.display = 'none'
      glow.style.display = 'none'
      return
    }

    /* Hide the native OS cursor on desktop */
    document.body.style.cursor = 'none'

    let mx = -500, my = -500   // mouse (snapped)
    let rx = -500, ry = -500   // ring  (lagged)
    let gx = -500, gy = -500   // glow  (very lagged)
    let raf
    let isHover = false
    let isDown  = false

    /* ── Track mouse ── */
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      /* Dot snaps immediately */
      dot.style.transform = `translate(${mx}px, ${my}px)`
      dot.style.opacity   = '1'
      ring.style.opacity  = '1'
      glow.style.opacity  = '1'
    }
    const onLeave = () => {
      dot.style.opacity  = '0'
      ring.style.opacity = '0'
      glow.style.opacity = '0'
    }
    const onEnter = () => {
      dot.style.opacity  = '1'
      ring.style.opacity = '1'
      glow.style.opacity = '1'
    }

    /* ── Hover detection on interactive elements ── */
    const HOVER_SEL = 'a, button, [role="button"], input, textarea, select, label, [tabindex]'
    const onOver = (e) => {
      if (e.target.closest(HOVER_SEL)) {
        isHover = true
        ring.style.width  = '52px'
        ring.style.height = '52px'
        ring.style.borderColor = 'rgba(200,150,255,0.8)'
        ring.style.background  = 'rgba(160,100,255,0.08)'
        dot.style.background   = '#C87FFF'
        dot.style.width  = '6px'
        dot.style.height = '6px'
      } else if (isHover) {
        isHover = false
        ring.style.width  = '32px'
        ring.style.height = '32px'
        ring.style.borderColor = 'rgba(180,130,255,0.55)'
        ring.style.background  = 'transparent'
        dot.style.background   = '#B87FFF'
        dot.style.width  = '8px'
        dot.style.height = '8px'
      }
    }

    /* ── Click press ── */
    const onDown = () => {
      isDown = true
      ring.style.transform = 'translate(-50%, -50%) scale(0.75)'
      dot.style.width  = '12px'
      dot.style.height = '12px'
    }
    const onUp = () => {
      isDown = false
      ring.style.transform = 'translate(-50%, -50%) scale(1)'
      dot.style.width  = isHover ? '6px'  : '8px'
      dot.style.height = isHover ? '6px'  : '8px'
    }

    document.addEventListener('mousemove',  onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover',  onOver)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)

    /* ── Lagged ring + glow animation loop ── */
    function lerp(a, b, t) { return a + (b - a) * t }
    function tick() {
      rx = lerp(rx, mx, 0.12)
      ry = lerp(ry, my, 0.12)
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'

      gx = lerp(gx, mx, 0.05)
      gy = lerp(gy, my, 0.05)
      glow.style.left = gx + 'px'
      glow.style.top  = gy + 'px'

      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      document.body.style.cursor = ''
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
    }
  }, [])

  return (
    <div className="hidden lg:block">
      {/* ── Dot: snaps to pointer exactly ── */}
      <div ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '8px', height: '8px',
          marginLeft: '-4px', marginTop: '-4px',
          borderRadius: '50%',
          background: '#B87FFF',
          boxShadow: '0 0 8px rgba(184,127,255,0.8), 0 0 20px rgba(160,100,255,0.4)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          willChange: 'transform',
          transition: 'width 0.15s ease, height 0.15s ease, background 0.15s ease, box-shadow 0.15s ease',
        }}
      />

      {/* ── Ring: lags behind the dot ── */}
      <div ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '32px', height: '32px',
          borderRadius: '50%',
          border: '1.5px solid rgba(180,130,255,0.55)',
          background: 'transparent',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0,
          willChange: 'left, top',
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background 0.2s ease, transform 0.15s ease',
        }}
      />

      {/* ── Glow blob: very slow follow ── */}
      <div ref={glowRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '320px', height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(160,100,255,0.07) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0,
          willChange: 'left, top',
        }}
      />
    </div>
  )
}

/* ── Particle canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = canvas.getContext('2d')
    let W, H, particles, raf

    const COLORS = ['rgba(160,100,255,', 'rgba(200,150,255,', 'rgba(120,80,220,']
    const N = 50

    function resize() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    function makeParticle() {
      return {
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.3 + 0.4,
        dx: (Math.random() - 0.5) * 0.25,
        dy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.3 + 0.06,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }
    }
    function init() { particles = Array.from({ length: N }, makeParticle) }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      // lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 130) {
            ctx.strokeStyle = `rgba(160,100,255,${(1 - d / 130) * 0.06})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      // dots
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy
        if (p.x < 0 || p.x > W) p.dx *= -1
        if (p.y < 0 || p.y > H) p.dy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color + p.alpha + ')'
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }

    resize()
    init()
    draw()
    window.addEventListener('resize', () => { resize(); init() })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
}

export default function App() {
  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Background effects */}
      <ParticleCanvas />

      {/* Ambient glow blobs */}
      <div className="glow-blob w-[500px] h-[500px] opacity-50"
        style={{ top: '-100px', left: '200px', background: 'radial-gradient(circle, rgba(140,80,255,0.09) 0%, transparent 70%)', animation: 'orb-float 12s ease-in-out infinite' }} />
      <div className="glow-blob w-[400px] h-[400px] opacity-40"
        style={{ top: '60%', right: '-50px', background: 'radial-gradient(circle, rgba(200,120,255,0.07) 0%, transparent 70%)', animation: 'orb-float 9s ease-in-out infinite -3s' }} />

      {/* Navigation */}
      <Rail />
      <MobileNav />



      {/* Main content */}
      <main className="relative z-10 ml-0 lg:ml-[236px]">
        <Hero />
        <BentoSection />
        <Projects />
        <Timeline />
        <Certs />
        <Connect />

        <footer className="px-6 lg:px-14 py-7 font-mono text-[12px] text-[#4A5568] flex justify-between flex-wrap gap-2"
          style={{ borderTop: '1px solid rgba(180,150,255,0.07)', maxWidth: '960px' }}>
          <span>© 2026 Vigneshwaran K</span>
          <span>React · Tailwind · Framer Motion</span>
        </footer>
      </main>

      {/* Touch devices cursor override */}
      <style>{`
        @media (max-width: 1024px) {
          .glow-blob { display: none; }
        }
        @media (hover: none), (pointer: coarse) {
          * { cursor: auto !important; }
        }
      `}</style>
    </>
  )
}
