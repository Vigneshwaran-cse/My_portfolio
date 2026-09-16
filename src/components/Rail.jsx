import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = [
  { id: 'hero',       label: 'init',        num: '00' },
  { id: 'bento',      label: 'skills',      num: '01' },
  { id: 'builds',     label: 'projects',    num: '02' },
  { id: 'deploy_log', label: 'experience',  num: '03' },
  { id: 'certs',      label: 'credentials', num: '04' },
  { id: 'connect',    label: 'contact',     num: '05' },
]

export default function Rail() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[236px] z-50 flex flex-col px-7 py-8"
      style={{ background: 'rgba(10,7,20,0.94)', borderRight: '1px solid rgba(180,150,255,0.08)', backdropFilter: 'blur(20px)' }}>
      {/* Brand */}
      <a href="#hero" className="font-head font-extrabold text-xl tracking-tight mb-12 block">
        VK<span className="text-cyan">_</span>
      </a>

      {/* Nav items */}
      <nav className="relative flex flex-col">
        {/* vertical line */}
        <div className="absolute left-[9px] top-3 bottom-3 w-px"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 20%, rgba(255,255,255,0.07) 80%, transparent)' }} />

        {SECTIONS.map(({ id, label, num }) => {
          const isActive = active === id
          return (
            <a
              key={id}
              href={`#${id}`}
              className="relative flex items-baseline gap-3 pl-7 py-3 font-mono text-[13px] transition-colors duration-200"
              style={{ color: isActive ? '#E8ECF0' : '#4A5568' }}
            >
              {/* node dot */}
              <span className="absolute left-[5px] top-1/2 -translate-y-1/2 w-[9px] h-[9px] rounded-full transition-all duration-250"
                style={{
                  background: isActive ? '#00E5FF' : '#050505',
                  border: `1px solid ${isActive ? '#00E5FF' : 'rgba(255,255,255,0.1)'}`,
                  boxShadow: isActive ? '0 0 0 3px rgba(0,229,255,0.15), 0 0 14px rgba(0,229,255,0.3)' : 'none',
                }} />
              <span style={{ color: isActive ? '#00E5FF' : '#2D3748', fontSize: '12px' }}>{num}</span>
              <span style={{ color: isActive ? '#E8ECF0' : '#4A5568' }}>{label}</span>
            </a>
          )
        })}
      </nav>


    </aside>
  )
}
