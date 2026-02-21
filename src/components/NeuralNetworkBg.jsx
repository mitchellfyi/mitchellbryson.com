'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'

const NODE_COUNT = 75
const CONNECTION_DISTANCE = 120
const NODE_SPEED = 0.3
const NODE_RADIUS_MIN = 1.5
const NODE_RADIUS_MAX = 3
const MOUSE_RADIUS = 150
const MOUSE_REPEL_STRENGTH = 0.35

export function NeuralNetworkBg({ className }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const nodesRef = useRef([])
  const mouseRef = useRef({ x: -1000, y: -1000, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reducedMotion = motionQuery.matches

    function onMotionChange(e) {
      reducedMotion = e.matches
      if (reducedMotion) {
        cancelAnimationFrame(animationRef.current)
        draw()
      } else {
        animate()
      }
    }
    motionQuery.addEventListener('change', onMotionChange)

    function resize() {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
    }

    function initNodes() {
      const rect = canvas.parentElement.getBoundingClientRect()
      const count = rect.width < 640 ? 20 : NODE_COUNT
      nodesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * NODE_SPEED * 2,
        vy: (Math.random() - 0.5) * NODE_SPEED * 2,
        radius:
          NODE_RADIUS_MIN + Math.random() * (NODE_RADIUS_MAX - NODE_RADIUS_MIN),
      }))
    }

    function isDark() {
      return document.documentElement.classList.contains('dark')
    }

    const parent = canvas.parentElement
    function onMouseMove(e) {
      const rect = parent.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      mouseRef.current.active = true
    }
    function onMouseLeave() {
      mouseRef.current.active = false
    }
    parent.addEventListener('mousemove', onMouseMove)
    parent.addEventListener('mouseleave', onMouseLeave)

    function draw() {
      const rect = parent.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      const dark = isDark()
      const mouse = mouseRef.current

      ctx.clearRect(0, 0, w, h)

      const nodes = nodesRef.current

      // Draw mouse glow when active
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          MOUSE_RADIUS,
        )
        gradient.addColorStop(
          0,
          dark ? 'rgba(45, 212, 191, 0.06)' : 'rgba(20, 184, 166, 0.04)',
        )
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, w, h)
      }

      // Draw connections — brighter near mouse
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DISTANCE) {
            let opacity = 1 - dist / CONNECTION_DISTANCE

            // Boost opacity for lines near mouse
            if (mouse.active) {
              const midX = (nodes[i].x + nodes[j].x) / 2
              const midY = (nodes[i].y + nodes[j].y) / 2
              const mouseDist = Math.sqrt(
                (midX - mouse.x) ** 2 + (midY - mouse.y) ** 2,
              )
              if (mouseDist < MOUSE_RADIUS) {
                const boost = 1 - mouseDist / MOUSE_RADIUS
                opacity = Math.min(1, opacity + boost * 0.5)
              }
            }

            ctx.strokeStyle = dark
              ? `rgba(45, 212, 191, ${0.12 * opacity})`
              : `rgba(20, 184, 166, ${0.1 * opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw mouse connections to nearby nodes
      if (mouse.active) {
        for (const node of nodes) {
          const dx = node.x - mouse.x
          const dy = node.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS) {
            const opacity = 1 - dist / MOUSE_RADIUS
            ctx.strokeStyle = dark
              ? `rgba(45, 212, 191, ${0.2 * opacity})`
              : `rgba(20, 184, 166, ${0.15 * opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(node.x, node.y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes — glow up near mouse
      for (const node of nodes) {
        let radius = node.radius
        let alpha = dark ? 0.5 : 0.4

        if (mouse.active) {
          const dx = node.x - mouse.x
          const dy = node.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS) {
            const proximity = 1 - dist / MOUSE_RADIUS
            radius = node.radius + proximity * 2
            alpha = Math.min(1, alpha + proximity * 0.4)
          }
        }

        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = dark
          ? `rgba(45, 212, 191, ${alpha})`
          : `rgba(20, 184, 166, ${alpha})`
        ctx.fill()
      }
    }

    function update() {
      const rect = parent.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      const mouse = mouseRef.current

      for (const node of nodesRef.current) {
        // Mouse repulsion
        if (mouse.active) {
          const dx = node.x - mouse.x
          const dy = node.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force =
              ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * MOUSE_REPEL_STRENGTH
            node.vx += (dx / dist) * force
            node.vy += (dy / dist) * force
          }
        }

        // Dampen velocity back toward base speed
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy)
        if (speed > NODE_SPEED * 3) {
          node.vx *= 0.95
          node.vy *= 0.95
        }

        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > w) node.vx *= -1
        if (node.y < 0 || node.y > h) node.vy *= -1

        node.x = Math.max(0, Math.min(w, node.x))
        node.y = Math.max(0, Math.min(h, node.y))
      }
    }

    function animate() {
      if (reducedMotion) return
      update()
      draw()
      animationRef.current = requestAnimationFrame(animate)
    }

    resize()
    initNodes()

    if (reducedMotion) {
      draw()
    } else {
      animate()
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (reducedMotion) draw()
    })
    resizeObserver.observe(canvas.parentElement)

    return () => {
      cancelAnimationFrame(animationRef.current)
      resizeObserver.disconnect()
      motionQuery.removeEventListener('change', onMotionChange)
      parent.removeEventListener('mousemove', onMouseMove)
      parent.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={clsx('pointer-events-none absolute inset-0', className)}
    />
  )
}
