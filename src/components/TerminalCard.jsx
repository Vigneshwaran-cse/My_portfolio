import { useEffect, useRef, useState } from 'react'

const BOOT_LINES = [
  { prompt: true,  text: 'whoami' },
  { prompt: false, text: 'vigneshwaran_k — java / full-stack developer (fresher)' },
  { prompt: true,  text: 'cgpa --show' },
  { prompt: false, text: '8.81 / 10.0  ·  B.E. Computer Science Engineering' },
  { prompt: true,  text: 'status --availability' },
  { prompt: false, text: 'open to relocation · available for full-time roles' },
]

export default function TerminalCard({ className = '' }) {
  const [displayedLines, setDisplayedLines] = useState([])
  const [typing, setTyping] = useState({ lineIdx: 0, charIdx: 0 })
  const [done, setDone] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setDisplayedLines(BOOT_LINES.map(l => ({ ...l, text: l.text, partial: false })))
      setDone(true)
      return
    }

    let lineIdx = 0
    let charIdx = 0
    let buffer = []
    let timer

    function step() {
      if (lineIdx >= BOOT_LINES.length) {
        setDone(true)
        return
      }
      const line = BOOT_LINES[lineIdx]

      if (charIdx <= line.text.length) {
        const partial = line.text.slice(0, charIdx)
        setDisplayedLines([
          ...buffer,
          { ...line, text: partial, partial: true },
        ])
        charIdx++
        timer = setTimeout(step, line.prompt ? 44 : 16)
      } else {
        buffer = [...buffer, { ...line, partial: false }]
        lineIdx++
        charIdx = 0
        timer = setTimeout(step, 270)
      }
    }

    timer = setTimeout(step, 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`glass overflow-hidden ${className}`}
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5"
        style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span className="w-[9px] h-[9px] rounded-full bg-[#FF5F57]" />
        <span className="w-[9px] h-[9px] rounded-full bg-[#FFBD2E]" />
        <span className="w-[9px] h-[9px] rounded-full bg-[#28C840]" />
        <span className="ml-2 text-[11px] text-[#4A5568]">~/vigneshwaran-k — zsh</span>
      </div>

      {/* Body */}
      <div ref={containerRef} className="px-5 py-4 text-[13px] leading-[1.9] min-h-[110px]" style={{ color: '#8892A0' }}>
        {displayedLines.map((line, i) => (
          <div key={i}>
            {line.prompt
              ? <><span style={{ color: '#00E5FF' }}>$</span> <span style={{ color: '#E8ECF0' }}>{line.text}</span>{line.partial && <Cursor />}</>
              : <><span style={{ color: '#E8ECF0' }}>{line.text}</span>{line.partial && <Cursor />}</>
            }
          </div>
        ))}
        {done && (
          <div><span style={{ color: '#00E5FF' }}>$</span> <Cursor /></div>
        )}
      </div>
    </div>
  )
}

function Cursor() {
  return <span className="inline-block animate-blink" style={{ color: '#00E5FF' }}>▍</span>
}
