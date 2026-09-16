import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const PROJECTS = [
  {
    file: 'laundry-management-system.java',
    problem: 'Business operations relied on manual paper-based tracking, resulting in order loss, billing errors, and delayed status visibility.',
    minus: '− Manual logs · Duplicate entries · No real-time tracking',
    plus:  '+ Centralised MySQL records · Full CRUD operations · Real-time order & delivery status',
    tags: [
      { label: 'Java',  cls: 'amber' },
      { label: 'MySQL', cls: 'blue' },
      { label: 'CRUD',  cls: 'cyan' },
    ],
    github: 'https://github.com/Vigneshwaran-cse',
  },
  {
    file: 'courier-management-system.java',
    problem: 'Manual dispatch records made consignment tracing slow and error-prone, with no structured database for historical lookups.',
    minus: '− Manual dispatch sheets · Slow shipment lookup · No audit trail',
    plus:  '+ Structured registration & status updates · Delivery tracking · Single-query lookups',
    tags: [
      { label: 'Java',  cls: 'amber' },
      { label: 'MySQL', cls: 'blue' },
      { label: 'CRUD',  cls: 'cyan' },
    ],
    github: 'https://github.com/Vigneshwaran-cse',
  },
]

function TiltCard({ children }) {
  const cardRef = useRef(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const springConfig = { stiffness: 300, damping: 30 }
  const springX = useSpring(rotX, springConfig)
  const springY = useSpring(rotY, springConfig)

  function onMouseMove(e) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.width / 2
    const cy = rect.height / 2
    const x = e.clientX - rect.left - cx
    const y = e.clientY - rect.top - cy
    rotX.set((-y / cy) * 6)
    rotY.set((x / cx) * 6)
  }
  function onMouseLeave() {
    rotX.set(0)
    rotY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 900,
      }}
    >
      {children}
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="builds" className="py-16 md:py-20 px-6 sm:px-10 lg:px-14 max-w-[960px]">
      <ScrollReveal>
        <div className="flex items-center gap-2.5 mb-2">
          <span className="font-mono text-[12px] text-cyan">02</span>
          <span className="font-head text-[13px] text-[#8892A0] font-semibold tracking-widest uppercase">Projects</span>
        </div>
        <p className="font-body text-[#4A5568] text-[15px] mb-8">End-to-end applications built independently — from problem definition through database design to production-ready CRUD implementation.</p>
      </ScrollReveal>

      <div className="flex flex-col gap-5">
        {PROJECTS.map((proj, i) => (
          <ScrollReveal key={proj.file} delay={i * 0.12}>
            <TiltCard>
              <div className="glass overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-5 py-3"
                  style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                  <span className="ml-2 font-mono text-[12px] text-[#4A5568] flex-1">{proj.file}</span>
                  <a href={proj.github} target="_blank" rel="noopener"
                    className="font-mono text-[11px] text-cyan px-2.5 py-1 rounded transition-all"
                    style={{ border: '1px solid rgba(0,229,255,0.25)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,229,255,0.08)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '' }}
                  >
                    View on GitHub ↗
                  </a>
                </div>

                {/* Body */}
                <div className="p-6">
                  <p className="text-[#4A5568] text-[14.5px] mb-4 leading-relaxed">
                    <span className="font-mono text-[12px] text-[#2D3748] mr-2">// Problem:</span>
                    <span className="text-[#8892A0]">{proj.problem}</span>
                  </p>

                  <div className="space-y-2 mb-5">
                    <div className="font-mono text-[13px] px-4 py-2.5 rounded-md"
                      style={{ color: '#FC5C65', background: 'rgba(252,92,101,0.08)', border: '1px solid rgba(252,92,101,0.15)' }}>
                      {proj.minus}
                    </div>
                    <div className="font-mono text-[13px] px-4 py-2.5 rounded-md"
                      style={{ color: '#4ECC7A', background: 'rgba(78,204,122,0.08)', border: '1px solid rgba(78,204,122,0.15)' }}>
                      {proj.plus}
                    </div>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex gap-2 flex-wrap">
                      {proj.tags.map(({ label, cls }) => (
                        <span key={label} className={`tag-pill ${cls}`}>{label}</span>
                      ))}
                    </div>
                    <span className="font-mono text-[11.5px] px-2 py-0.5 rounded" style={{ color: '#4ECC7A', background: 'rgba(78,204,122,0.08)', border: '1px solid rgba(78,204,122,0.18)' }}>Completed</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
