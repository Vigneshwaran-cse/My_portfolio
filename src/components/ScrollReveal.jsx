import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Wraps children in a Framer Motion div that fades + slides up
 * when scrolled into view. Uses only opacity + transform for GPU performance.
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 32,
  duration = 0.65,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
