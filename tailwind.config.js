/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0F0B1E',
        panel: '#16102A',
        panel2: '#1E1535',
        cyan: '#00E5FF',
        amber: '#FFB627',
        'cyan-dim': 'rgba(0,229,255,0.08)',
        'amber-dim': 'rgba(255,182,39,0.10)',
        'border-subtle': 'rgba(255,255,255,0.06)',
        'border-glow': 'rgba(0,229,255,0.22)',
      },
      fontFamily: {
        head: ['Sora', 'sans-serif'],
        body: ['IBM Plex Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      backgroundImage: {
        'glow-cyan': 'radial-gradient(circle at center, rgba(0,229,255,0.12) 0%, transparent 70%)',
        'glow-amber': 'radial-gradient(circle at center, rgba(255,182,39,0.10) 0%, transparent 70%)',
        'gradient-hero': 'linear-gradient(135deg, #00E5FF 0%, #FFB627 100%)',
      },
      animation: {
        'blink': 'blink 1.1s steps(1) infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'scroll-slide': 'scroll-slide 2.2s ease-in-out infinite',
        'orb-float-1': 'orb-float 12s ease-in-out infinite',
        'orb-float-2': 'orb-float 9s ease-in-out infinite -3s',
        'orb-float-3': 'orb-float 14s ease-in-out infinite -6s',
        'badge-pop': 'badge-pop 0.5s cubic-bezier(0.16,1,0.3,1) both',
        'photo-reveal': 'photo-reveal 1.2s cubic-bezier(0.16,1,0.3,1) both 0.3s',
        'hero-enter': 'hero-enter 0.9s cubic-bezier(0.16,1,0.3,1) both',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        blink: { '50%': { opacity: '0' } },
        'pulse-dot': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0,229,255,0.6)' },
          '50%': { boxShadow: '0 0 0 6px rgba(0,229,255,0)' },
        },
        'scroll-slide': {
          '0%': { left: '-60%' },
          '100%': { left: '120%' },
        },
        'orb-float': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(24px, -32px) scale(1.06)' },
          '66%': { transform: 'translate(-18px, 22px) scale(0.94)' },
        },
        'badge-pop': {
          from: { opacity: '0', transform: 'scale(0.8) translateY(-8px)' },
          to: { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'photo-reveal': {
          from: { opacity: '0', transform: 'scale(1.07)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'hero-enter': {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 30px rgba(0,229,255,0.15), 0 0 60px rgba(0,229,255,0.06)',
        'glow-amber': '0 0 30px rgba(255,182,39,0.20), 0 0 60px rgba(255,182,39,0.08)',
        'card': '0 1px 0 rgba(255,255,255,0.05) inset',
      },
    },
  },
  plugins: [],
}
