import { useEffect, useRef, useState } from 'react'
import ScrollReveal from './ScrollReveal'
import { useSpotlight } from '../hooks/useSpotlight'

/* ─── Skill data with proficiency levels ─── */
const SKILLS = [
  { category: 'Languages',       code: '[ lang ]',  items: [{ label: 'Java', level: 88 }, { label: 'Python', level: 72 }] },
  { category: 'Web Technologies',code: '[ web ]',   items: [{ label: 'HTML5', level: 90 }, { label: 'CSS3', level: 85 }, { label: 'JavaScript', level: 75 }] },
  { category: 'Databases',       code: '[ db ]',    items: [{ label: 'MySQL', level: 85 }, { label: 'MongoDB', level: 70 }, { label: 'Google BigQuery', level: 65 }] },
  { category: 'Tools',           code: '[ tools ]', items: [{ label: 'Git / GitHub', level: 82 }, { label: 'VS Code', level: 90 }, { label: 'Eclipse IDE', level: 78 }] },
  { category: 'Core CS',         code: '[ cs ]',    items: [{ label: 'OOP', level: 90 }, { label: 'DSA', level: 78 }, { label: 'DBMS', level: 83 }, { label: 'SDLC', level: 75 }] },
  { category: 'Automation',      code: '[ auto ]',  items: [{ label: 'n8n Workflows', level: 80 }, { label: 'AI Agent Orchestration', level: 72 }] },
]

const STATS = [
  { value: 8.81, label: 'CGPA',        sub: 'B.E. Computer Science', suffix: '',  color: '#FFB627', isFloat: true  },
  { value: 2,    label: 'Internships', sub: 'Industry experience',   suffix: '',  color: '#A064FF', isFloat: false },
  { value: 2,    label: 'Projects',    sub: 'Production-grade CRUD', suffix: '',  color: '#00E5FF', isFloat: false },
  { value: 95,   label: 'Assessment',  sub: 'Web Dev Training Score',suffix: '%', color: '#4ECC7A', isFloat: false },
]

/* ─── Animated counter ─── */
function AnimatedNumber({ target, duration = 1500, suffix = '', isFloat = false }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const done = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true
        const t0 = performance.now()
        const tick = (now) => {
          const t = Math.min((now - t0) / duration, 1)
          const v = (1 - Math.pow(1 - t, 3)) * target
          setVal(isFloat ? parseFloat(v.toFixed(2)) : Math.round(v))
          if (t < 1) requestAnimationFrame(tick)
          else setVal(isFloat ? target : Math.round(target))
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration, isFloat])
  return <span ref={ref}>{val}{suffix}</span>
}

/* ─── Animated skill bar ─── */
function SkillBar({ label, level, delay = 0 }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setActive(true); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  const c = level >= 85 ? '#A064FF' : level >= 75 ? '#00E5FF' : '#FFB627'
  return (
    <div ref={ref} className="mb-3 last:mb-0">
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-mono text-[12px] text-white/55">{label}</span>
        <span className="font-mono text-[11px]" style={{ color: c }}>{level}%</span>
      </div>
      <div className="w-full h-[3px] rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-full rounded-full" style={{
          width: active ? `${level}%` : '0%',
          background: `linear-gradient(90deg, ${c}77, ${c})`,
          boxShadow: active ? `0 0 8px ${c}55` : 'none',
          transition: `width ${0.7 + delay * 0.4}s cubic-bezier(0.16,1,0.3,1) ${delay * 0.2}s`,
        }} />
      </div>
    </div>
  )
}

function SpotlightCard({ children, className = '', style = {} }) {
  const { ref, onMouseMove } = useSpotlight()
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`spotlight-card ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}



export default function BentoSection() {
  return (
    <section id="bento" className="py-16 md:py-20 px-6 sm:px-10 lg:px-14">
      <ScrollReveal>
        <div className="flex items-center gap-2.5 mb-1">
          <span className="font-mono text-[12px] text-cyan">01</span>
          <span className="font-head text-[13px] text-[#8892A0] font-semibold tracking-widest uppercase">Technical Skills</span>
        </div>
        <p className="font-body text-[#4A5568] text-[15px] mb-10">
          Core technologies and tools applied across academic projects and professional internships.
        </p>
      </ScrollReveal>

      <div className="bento-main flex flex-col lg:flex-row gap-6 items-start">
        {/* Left: 3-col skill cards */}
        <div className="bento-skills grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 flex-1 w-full">
          {SKILLS.map((g, gi) => (
            <ScrollReveal key={g.category} delay={gi * 0.07}>
              <SpotlightCard className="h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-head font-semibold text-[13px] text-white/80">{g.category}</span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded"
                    style={{ color: '#4A5568', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {g.code}
                  </span>
                </div>
                {g.items.map((item, ii) => (
                  <SkillBar key={item.label} label={item.label} level={item.level} delay={ii * 0.12} />
                ))}
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Right: animated stats + availability */}
        <div className="bento-stats grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-col gap-4 w-full lg:w-[220px] shrink-0">
          {STATS.map((s, si) => (
            <ScrollReveal key={s.label} delay={si * 0.1}>
              <SpotlightCard className="py-5 px-5">
                <div className="font-head font-extrabold leading-none mb-1" style={{ fontSize: '2.2rem', color: s.color }}>
                  <AnimatedNumber target={s.value} suffix={s.suffix} isFloat={s.isFloat} duration={1400 + si * 200} />
                </div>
                <div className="font-head font-semibold text-[13px] text-white/80">{s.label}</div>
                <div className="font-mono text-[10px] text-[#4A5568] mt-0.5">{s.sub}</div>
                <div className="mt-3 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="h-full rounded-full bento-stat-bar"
                    style={{ background: `linear-gradient(90deg, transparent, ${s.color})`, animationDelay: `${si * 0.18}s` }} />
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
          <ScrollReveal delay={0.45}>
            <SpotlightCard className="py-5 px-5"
              style={{ borderColor: 'rgba(0,229,255,0.2)', boxShadow: '0 0 30px rgba(0,229,255,0.05)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-cyan animate-pulse-dot" />
                <span className="font-mono text-[10px] text-cyan tracking-widest">AVAILABLE</span>
              </div>
              <div className="font-head font-bold text-[15px] text-white leading-snug mb-1">Open to<br />Opportunities</div>
              <div className="font-mono text-[10px] text-[#4A5568]">Full-time · Immediate Joiner</div>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        .bento-stat-bar {
          width: 0%;
          animation: bento-bar-anim 1.6s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes bento-bar-anim { from { width: 0% } to { width: 100% } }
        @media (max-width: 960px) {
          .bento-main   { flex-direction: column !important; }
          .bento-skills { grid-template-columns: repeat(2,1fr) !important; }
          .bento-stats  { width: 100% !important; flex-direction: row !important; flex-wrap: wrap !important; }
          .bento-stats > * { flex: 1 1 45% !important; min-width: 0; }
        }
        @media (max-width: 560px) {
          .bento-skills { grid-template-columns: 1fr !important; }
          .bento-stats > * { flex: 1 1 100% !important; }
        }
      `}</style>
    </section>
  )
}
