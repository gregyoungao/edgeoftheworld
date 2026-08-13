"use client"

import { useEffect, useRef, useState } from "react"

interface TextScrambleProps {
  text: string
  className?: string
}

export function TextScramble({ text, className = "" }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text)
  const frameRequest = useRef<number>()
  const frame = useRef(0)
  const queue = useRef<Array<{ from: string; to: string; start: number; end: number }>>([])
  const resolve = useRef<(() => void) | null>(null)

  const chars = "!<>-_\\/[]{}—=+*^?#________"

  const setText = (newText: string) => {
    const oldText = displayText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise<void>((res) => {
      resolve.current = res
    })

    queue.current = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ""
      const to = newText[i] || ""
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      queue.current.push({ from, to, start, end })
    }

    cancelAnimationFrame(frameRequest.current!)
    frame.current = 0
    update()
    return promise
  }

  const update = () => {
    let output = ""
    let complete = 0

    for (let i = 0, n = queue.current.length; i < n; i++) {
      const { from, to, start, end } = queue.current[i]

      if (frame.current >= end) {
        complete++
        output += to
      } else if (frame.current >= start) {
        if (!to || Math.random() < 0.28) {
          output += chars[Math.floor(Math.random() * chars.length)]
        } else {
          output += to
        }
      } else {
        output += from
      }
    }

    setDisplayText(output)

    if (complete === queue.current.length) {
      if (resolve.current) resolve.current()
    } else {
      frameRequest.current = requestAnimationFrame(update)
      frame.current++
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setText(text)
    }, 3000)

    setText(text)

    return () => {
      clearInterval(interval)
      if (frameRequest.current) {
        cancelAnimationFrame(frameRequest.current)
      }
    }
  }, [text])

  return <span className={className}>{displayText}</span>
}
