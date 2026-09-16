import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { href: '#hero',       num: '00', label: 'init' },
  { href: '#bento',      num: '01', label: 'skills' },
  { href: '#builds',     num: '02', label: 'projects' },
  { href: '#deploy_log', num: '03', label: 'experience' },
  { href: '#certs',      num: '04', label: 'credentials' },
  { href: '#connect',    num: '05', label: 'contact' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('hero')

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Track active section
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: 0 }
    )
    const ids = ['hero', 'bento', 'builds', 'deploy_log', 'certs', 'connect']
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* Top Mobile Bar */}
      <header
        className="lg:hidden sticky top-0 z-[90] flex items-center justify-between px-6 py-4"
        style={{
          background: 'rgba(10, 7, 20, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(180, 150, 255, 0.1)',
        }}
      >
        <a href="#hero" className="font-head font-extrabold text-lg tracking-tight flex items-center gap-1">
          <span>VK</span>
          <span style={{ color: '#B87FFF' }}>_</span>
        </a>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
          style={{
            background: 'rgba(184, 127, 255, 0.08)',
            border: '1px solid rgba(184, 127, 255, 0.2)',
            color: '#E8ECF0',
          }}
          aria-label="Open Navigation Menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      {/* Drawer Overlay & Content */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[200] lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Slide-out Drawer Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-[82%] max-w-[320px] h-full flex flex-col justify-between p-6 z-10 shadow-2xl"
              style={{
                background: 'linear-gradient(180deg, #100B1E 0%, #0A0614 100%)',
                borderRight: '1px solid rgba(180, 150, 255, 0.15)',
              }}
            >
              {/* Drawer Header */}
              <div>
                <div className="flex items-center justify-between pb-6 mb-6" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div className="font-head font-extrabold text-xl">
                    VK<span style={{ color: '#B87FFF' }}>_</span>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#A0AEC0',
                    }}
                    aria-label="Close menu"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-1.5">
                  {LINKS.map(({ href, num, label }) => {
                    const sectionId = href.replace('#', '')
                    const isCurrent = active === sectionId
                    return (
                      <a
                        key={href}
                        href={href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3.5 px-4 py-3 rounded-xl font-mono text-[14px] transition-all duration-200"
                        style={{
                          background: isCurrent ? 'rgba(184, 127, 255, 0.12)' : 'transparent',
                          color: isCurrent ? '#FFFFFF' : '#94A3B8',
                          border: isCurrent ? '1px solid rgba(184, 127, 255, 0.25)' : '1px solid transparent',
                        }}
                      >
                        <span
                          className="text-[12px] font-semibold"
                          style={{ color: isCurrent ? '#B87FFF' : '#4B5563' }}
                        >
                          {num}
                        </span>
                        <span className="font-medium tracking-wide">{label}</span>
                      </a>
                    )
                  })}
                </nav>
              </div>

              {/* Drawer Footer */}
              <div className="pt-6" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div className="font-mono text-[11px] text-[#64748B] mb-2 uppercase tracking-wider">Connect</div>
                <div className="flex gap-2">
                  <a
                    href="https://github.com/Vigneshwaran-cse"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center py-2 px-3 rounded-lg font-mono text-[12px] text-[#E2E8F0] transition-colors"
                    style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/vigneshwarancse"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center py-2 px-3 rounded-lg font-mono text-[12px] text-[#E2E8F0] transition-colors"
                    style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
