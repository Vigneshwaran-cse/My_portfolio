import ScrollReveal from './ScrollReveal'

const ENTRIES = [
  {
    badge: 'DEPLOY_01',
    type: 'Internship',
    date: 'Dec 2025 – Jan 2026 · Remote',
    company: 'CodTech IT Solutions',
    companyUrl: 'https://www.codtechitsolutions.com',
    role: 'Java Programming Intern',
    project: null,
    points: [
      'Completed a four-week internship built on core Java and Object-Oriented Programming.',
      'Applied file handling, exception handling, and OOP design to practical development tasks.',
    ],
    typeColor: 'amber',
  },
  {
    badge: 'DEPLOY_02',
    type: 'Internship',
    date: 'Jun 2026 – Jul 2026 · Chennai, On-site',
    company: 'VRNeXGen Technologies',
    companyUrl: 'https://vrnexgen1.com',
    role: 'Software Development Intern',
    project: '// Project: Intelligent Workflow Automation & AI Integration using n8n',
    points: [
      'Designed and deployed AI-powered automation workflows in n8n across local and cloud environments.',
      'Integrated Gmail, Google Sheets, and other cloud apps to streamline business processes end to end.',
      'Implemented AI agents for intelligent workflow orchestration and automated decision routing.',
      'Ran SQL-based analysis in Google BigQuery Studio — query generation, retrieval, optimization, and reporting.',
    ],
    typeColor: 'amber',
  },
  {
    badge: 'TRAINING_01',
    type: 'Training',
    date: 'Remote',
    company: 'Dyizan Academy',
    companyUrl: null,
    role: 'Web Development Trainee',
    project: null,
    points: [
      'Completed structured front-end training in HTML5 and CSS3, finishing with a 95% assessment score.',
    ],
    typeColor: 'purple',
  },
]

export default function Timeline() {
  return (
    <section id="deploy_log" className="py-16 md:py-20 px-6 sm:px-10 lg:px-14 max-w-[960px]">
      <ScrollReveal>
        <div className="flex items-center gap-2.5 mb-2">
          <span className="font-mono text-[12px] text-cyan">03</span>
          <span className="font-head text-[13px] text-[#8892A0] font-semibold tracking-widest uppercase">Experience</span>
        </div>
        <p className="font-body text-[#4A5568] text-[15px] mb-10">Professional experience and training — chronological order.</p>
      </ScrollReveal>

      <div className="relative pl-1">
        {ENTRIES.map((entry, i) => (
          <ScrollReveal key={entry.badge} delay={i * 0.12} y={24}>
            <div className="relative flex gap-6 pb-10 last:pb-0">
              {/* Timeline node */}
              <div className="relative flex-shrink-0 w-5">
                <div className="absolute left-[9px] top-[6px] w-2.5 h-2.5 rounded-full z-10"
                  style={{
                    background: '#00E5FF',
                    boxShadow: '0 0 0 3px rgba(0,229,255,0.12), 0 0 16px rgba(0,229,255,0.3)',
                  }} />
                {i < ENTRIES.length - 1 && (
                  <div className="absolute left-[13px] top-[20px] bottom-[-40px] w-px"
                    style={{ background: 'linear-gradient(to bottom, rgba(0,229,255,0.2), rgba(255,255,255,0.05))' }} />
                )}
              </div>

              {/* Card */}
              <div className="glass p-6 flex-1 transition-all duration-300 hover:-translate-x-0 hover:translate-x-1"
                style={{ transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.18)'; e.currentTarget.style.boxShadow = '0 4px 28px rgba(0,229,255,0.05)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.boxShadow = '' }}
              >
                {/* Head */}
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span className="font-mono text-[11px] text-cyan px-2.5 py-1 rounded-full"
                    style={{ border: '1px solid rgba(0,229,255,0.3)', background: 'rgba(0,229,255,0.06)' }}>
                    {entry.badge}
                  </span>
                  <span className="font-mono text-[12px] text-[#4A5568]">{entry.date}</span>
                  <span className="font-mono text-[11px] px-2.5 py-1 rounded-full"
                    style={{
                      color: entry.typeColor === 'purple' ? '#A064FF' : '#FFB627',
                      border: `1px solid ${entry.typeColor === 'purple' ? 'rgba(160,100,255,0.25)' : 'rgba(255,182,39,0.25)'}`,
                      background: entry.typeColor === 'purple' ? 'rgba(160,100,255,0.06)' : 'rgba(255,182,39,0.06)',
                    }}>
                    {entry.type}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-head font-semibold text-[16px] text-[#E8ECF0] mb-2">
                  {entry.companyUrl
                    ? <a href={entry.companyUrl} target="_blank" rel="noopener"
                        className="hover:text-cyan transition-colors border-b pb-px"
                        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#00E5FF' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                      >
                        {entry.company}
                      </a>
                    : entry.company
                  }
                  <span className="text-[#4A5568] font-normal"> — {entry.role}</span>
                </h3>

                {entry.project && (
                  <p className="font-mono text-[12px] text-cyan mb-3 opacity-80">{entry.project}</p>
                )}

                <ul className="space-y-1.5 pl-4" style={{ listStyleType: 'disc' }}>
                  {entry.points.map((p, pi) => (
                    <li key={pi} className="text-[#8892A0] text-[14px] leading-relaxed">{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
