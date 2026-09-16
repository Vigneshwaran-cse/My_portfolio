import ScrollReveal from './ScrollReveal'

const CERTS = [
  { icon: 'Java',    name: 'Programming in Java',              source: 'NPTEL Elite',         badge: 'Elite',    badgeType: 'elite' },
  { icon: 'Python',  name: 'The Joy of Computing using Python', source: 'NPTEL Elite',         badge: 'Elite',    badgeType: 'elite' },
  { icon: 'MongoDB', name: 'MongoDB Basics for Students',       source: 'MongoDB University',  badge: 'Verified', badgeType: 'verified' },
  { icon: 'English', name: 'Pearson MePro Level 5',            source: 'Professional English', badge: 'Verified', badgeType: 'verified' },
]

const ACHIEVEMENTS = [
  { medal: '02', name: 'Code Jigsaw Competition',  rank: 'Runner-Up · Inter-collegiate' },
  { medal: '02', name: 'AI Art Shadow Competition', rank: 'Runner-Up · Inter-collegiate' },
]

function Badge({ type, label }) {
  const styles = {
    elite:    { color: '#FFB627', border: 'rgba(255,182,39,0.3)',    bg: 'rgba(255,182,39,0.08)' },
    verified: { color: '#4ECC7A', border: 'rgba(78,204,122,0.3)',    bg: 'rgba(78,204,122,0.08)' },
  }
  const s = styles[type]
  return (
    <span className="font-mono text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
      style={{ color: s.color, border: `1px solid ${s.border}`, background: s.bg }}>
      {label}
    </span>
  )
}

export default function Certs() {
  return (
    <section id="certs" className="py-16 md:py-20 px-6 sm:px-10 lg:px-14 max-w-[960px]">
      <ScrollReveal>
        <div className="flex items-center gap-2.5 mb-2">
          <span className="font-mono text-[12px] text-cyan">04</span>
          <span className="font-head text-[13px] text-[#8892A0] font-semibold tracking-widest uppercase">Credentials</span>
        </div>
        <p className="font-body text-[#4A5568] text-[15px] mb-8">Verified credentials and academic recognitions — all completed, none in progress.</p>
      </ScrollReveal>

      {/* Cert grid */}
      <div className="grid grid-cols-2 gap-3 mb-8 max-sm:grid-cols-1">
        {CERTS.map((cert, i) => (
          <ScrollReveal key={cert.name} delay={i * 0.08}>
            <div className="glass flex items-center gap-4 p-4 transition-all duration-250 cursor-default"
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.18)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,229,255,0.05)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded flex-shrink-0"
                style={{ color: '#8892A0', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >{cert.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-body font-medium text-[14px] text-[#E8ECF0] leading-tight">{cert.name}</div>
                <div className="font-mono text-[11px] text-[#4A5568] mt-0.5">{cert.source}</div>
              </div>
              <Badge type={cert.badgeType} label={cert.badge} />
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Achievements */}
      <ScrollReveal delay={0.1}>
        <div className="font-head text-[13px] text-[#4A5568] font-semibold tracking-widest uppercase mb-4">Achievements</div>
      </ScrollReveal>
      <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        {ACHIEVEMENTS.map((a, i) => (
          <ScrollReveal key={a.name} delay={0.12 + i * 0.08}>
            <div className="glass flex items-center gap-4 p-4 transition-all duration-250 cursor-default"
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,182,39,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,182,39,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              <span className="font-mono text-[11px] font-semibold w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                style={{ color: '#FFB627', border: '1px solid rgba(255,182,39,0.25)', background: 'rgba(255,182,39,0.06)' }}
              >#2</span>
              <div>
                <div className="font-body font-medium text-[14px] text-[#E8ECF0]">{a.name}</div>
                <div className="font-mono text-[11px] text-amber mt-0.5">{a.rank}</div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
