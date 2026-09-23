import { useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from '../context/useTheme'
import asciiArt from '../assets/ahmed_ascii.txt?raw'

const calculateSize = (width) => {
  if (width <= 480) return Math.min(230, width - 40)
  if (width <= 768) return Math.min(300, width - 60)
  return 380
}

// Density scale from the source art's sparsest to densest glyphs
const DENSITY_ORDER = ' .:-=+*#%@'

const parseAsciiArt = (raw) => {
  const lines = raw.replace(/\r/g, '').split('\n').filter((line) => line.length > 0 || true)
  // Trim fully-blank trailing lines only
  while (lines.length && lines[lines.length - 1].trim() === '') lines.pop()

  const cols = Math.max(...lines.map((line) => line.length))
  const rows = lines.length

  const points = []
  lines.forEach((line, row) => {
    for (let col = 0; col < line.length; col++) {
      const ch = line[col]
      if (ch === ' ' || ch === undefined) continue

      const densityIndex = DENSITY_ORDER.indexOf(ch)
      const normalizedDensity = densityIndex === -1 ? 0.5 : densityIndex / (DENSITY_ORDER.length - 1)

      points.push({
        col,
        row,
        char: ch,
        density: normalizedDensity,
      })
    }
  })

  return { points, cols, rows }
}

const { points: PARSED_POINTS, cols: GRID_COLS, rows: GRID_ROWS } = parseAsciiArt(asciiArt)

const ParticlePortrait = () => {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000, active: false })
  const mouseTargetRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef([])
  const startTimeRef = useRef(null)
  const { theme } = useTheme()
  const [size, setSize] = useState(() => calculateSize(window.innerWidth))

  useEffect(() => {
    const updateSize = () => setSize(calculateSize(window.innerWidth))
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Grid layout is a pure function of size; only the scatter/timing seed is randomized,
  // so that randomization is isolated to this effect rather than a render-time memo.
  const layout = useMemo(() => {
    const padding = size * 0.04
    const usable = size - padding * 2
    const cellWidth = usable / GRID_COLS
    const cellHeight = usable / GRID_ROWS

    return PARSED_POINTS.map((p) => ({
      targetX: padding + p.col * cellWidth,
      targetY: padding + p.row * cellHeight,
      char: p.char,
      baseAlpha: 0.35 + p.density * 0.65,
    }))
  }, [size])

  useEffect(() => {
    particlesRef.current = layout.map((p) => ({
      ...p,
      x: p.targetX + (Math.random() - 0.5) * 420,
      y: p.targetY + (Math.random() - 0.5) * 420,
      vx: 0,
      vy: 0,
      currentAlpha: 0,
      delay: Math.random() * 0.4,
      shimmer: Math.random() * Math.PI * 2,
    }))
    startTimeRef.current = performance.now()
  }, [layout])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    const fontSize = Math.max(4.5, (size / GRID_COLS) * 1.9)

    let animationId

    const draw = () => {
      animationId = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, size, size)

      if (!particlesRef.current.length) return

      const particles = particlesRef.current
      const mouse = mouseRef.current
      const mouseTarget = mouseTargetRef.current
      const elapsed = (performance.now() - startTimeRef.current) / 1000

      mouse.x += (mouseTarget.x - mouse.x) * 0.15
      mouse.y += (mouseTarget.y - mouse.y) * 0.15

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const rgb = getComputedStyle(document.documentElement)
        .getPropertyValue('--particle-color')
        .trim() || '127, 211, 255'

      particles.forEach((p) => {
        const particleTime = elapsed - p.delay
        if (particleTime < 0) return

        const fadeProgress = Math.min(particleTime / 1.5, 1)
        const easedFade = 1 - Math.pow(1 - fadeProgress, 2)

        const isActive = mouse.active || particleTime < 3.0
        const shimmerVal = isActive ? Math.sin(elapsed * 2 + p.shimmer) * 0.1 : 0
        p.currentAlpha = Math.max(0, p.baseAlpha * easedFade + shimmerVal)

        const moveProgress = Math.min(particleTime / 2.5, 1)
        const easedMove = 1 - Math.pow(1 - moveProgress, 3)

        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = size * 0.2

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 4
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }

        const dx = p.targetX - p.x
        const dy = p.targetY - p.y
        const pullStrength = 0.01 + easedMove * 0.08
        p.vx += dx * pullStrength
        p.vy += dy * pullStrength

        if (isActive) {
          const breathX = Math.sin(elapsed * 0.5 + p.targetY * 0.1) * 0.15
          const breathY = Math.cos(elapsed * 0.5 + p.targetX * 0.1) * 0.15
          p.vx += breathX
          p.vy += breathY
          p.vx *= 0.92
          p.vy *= 0.92
        } else {
          p.vx *= 0.85
          p.vy *= 0.85

          if (particleTime > 4.0 && Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
            p.x = p.targetX
            p.y = p.targetY
            p.vx = 0
            p.vy = 0
          }
        }

        p.x += p.vx
        p.y += p.vy

        ctx.fillStyle = `rgba(${rgb}, ${p.currentAlpha})`
        ctx.fillText(p.char, p.x, p.y)
      })
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseTargetRef.current.x = e.clientX - rect.left
      mouseTargetRef.current.y = e.clientY - rect.top
      mouseRef.current.active = true
    }

    const handleTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      mouseTargetRef.current.x = touch.clientX - rect.left
      mouseTargetRef.current.y = touch.clientY - rect.top
      mouseRef.current.active = true
      if (e.cancelable) e.preventDefault()
    }

    const handleLeave = () => {
      mouseRef.current.active = false
      mouseTargetRef.current.x = -1000
      mouseTargetRef.current.y = -1000
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleLeave)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchend', handleLeave)

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleLeave)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleLeave)
    }
  }, [size, layout, theme])

  return (
    <canvas
      ref={canvasRef}
      className="particle-portrait"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: 'crosshair',
        touchAction: 'none',
      }}
    />
  )
}

export default ParticlePortrait
