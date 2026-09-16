import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { href: '#hero',       label: '00 · init' },
  { href: '#bento',      label: '01 · skills' },
  { href: '#builds',     label: '02 · projects' },
  { href: '#deploy_log', label: '03 · experience' },
  { href: '#certs',      label: '04 · credentials' },
  { href: '#connect',    label: '05 · contact' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="hidden max-md:flex sticky top-0 z-[200] items-center justify-between px-5 py-4"
        style={{ background: 'rgba(10,7,20,0.96)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(180,150,255,0.07)' }}>
        <span className="font-head font-extrabold text-lg">VK<span className="text-cyan">_</span></span>
        <button
          onClick={() => setOpen(o => !o)}
          className="font-mono text-base px-3 py-1.5 rounded-md transition-colors"
          style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#E8ECF0' }}
          aria-expanded={open}
          aria-label="Navigation"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="hidden max-md:flex flex-col sticky top-[57px] z-[190]"
            style={{ background: 'rgba(10,7,20,0.98)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(180,150,255,0.07)' }}
          >
            {LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm px-5 py-3.5 text-[#8892A0] hover:text-cyan hover:bg-cyan-dim transition-colors"
                style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
              >
                {label}
              </a>
            ))}

          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
