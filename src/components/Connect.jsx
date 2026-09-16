import ScrollReveal from './ScrollReveal'
import TerminalCard from './TerminalCard'

const LINKS = [
  { icon: '@',  href: 'mailto:vigneshwaran2006csc@gmail.com',                  label: 'vigneshwaran2006csc@gmail.com', key: 'email' },
  { icon: '⌘', href: 'https://www.linkedin.com/in/vigneshwaran-k-090952326',  label: '/in/vigneshwaran-k-090952326',  key: 'linkedin' },
  { icon: '⌥', href: 'https://github.com/Vigneshwaran-cse',                   label: '/Vigneshwaran-cse',             key: 'github' },
]

export default function Connect() {
  return (
    <section id="connect" className="py-16 md:py-20 px-6 sm:px-10 lg:px-14 max-w-[960px] pb-32">
      <ScrollReveal>
        <div className="flex items-center gap-2.5 mb-2">
          <span className="font-mono text-[12px] text-cyan">05</span>
          <span className="font-head text-[13px] text-[#8892A0] font-semibold tracking-widest uppercase">Contact</span>
        </div>
        <p className="font-body text-[#4A5568] text-[15px] mb-8">Open to full-time roles, internships, and technical collaborations. Reach out directly.</p>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <div className="glass overflow-hidden mb-6">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5"
            style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <span className="w-[9px] h-[9px] rounded-full bg-[#FF5F57]" />
            <span className="w-[9px] h-[9px] rounded-full bg-[#FFBD2E]" />
            <span className="w-[9px] h-[9px] rounded-full bg-[#28C840]" />
            <span className="ml-2 font-mono text-[11px] text-[#4A5568]">~/vigneshwaran-k — zsh</span>
          </div>

          {/* Body */}
          <div className="px-5 py-5 font-mono text-[13px]" style={{ lineHeight: '1.9' }}>
            <div><span className="text-cyan">$</span> <span className="text-[#E8ECF0]">connect --with vigneshwaran_k</span></div>
            {LINKS.map(({ icon, href, label, key }) => (
              <div key={key} className="ml-5 flex gap-2">
                <span className="text-[#2D3748] w-[70px] flex-shrink-0">{key}</span>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener"
                  className="text-cyan hover:underline transition-all"
                >
                  {label}
                </a>
              </div>
            ))}
            <div><span className="text-cyan">$</span> <span className="animate-blink text-cyan">▍</span></div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.16}>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:vigneshwaran2006csc@gmail.com"
            className="font-body font-semibold text-sm px-7 py-3 rounded-lg transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #FFB627 0%, #FF8C00 100%)',
              color: '#0D0800',
              boxShadow: '0 0 28px rgba(255,182,39,0.35)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 36px rgba(255,182,39,0.55)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 0 28px rgba(255,182,39,0.35)' }}
          >
            Send me an email →
          </a>
          <a
            href="https://www.linkedin.com/in/vigneshwaran-k-090952326"
            target="_blank" rel="noopener"
            className="font-body font-semibold text-sm px-7 py-3 rounded-lg text-[#E8ECF0] transition-all duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.09)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#00E5FF'; e.currentTarget.style.color = '#00E5FF'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,229,255,0.1)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#E8ECF0'; e.currentTarget.style.boxShadow = '' }}
          >
            Connect on LinkedIn
          </a>
        </div>
      </ScrollReveal>
    </section>
  )
}
