'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = stored === 'dark' || (!stored && prefersDark)
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)
  }, [])

  function toggle() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  if (!mounted) {
    return (
      <button
        type="button"
        className="shrink-0 rounded-xl border border-transparent p-2 text-gray-400"
        aria-label="Tema değiştir"
      >
        <Sun size={18} />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="shrink-0 rounded-xl border border-transparent bg-white/80 p-2 text-gray-700 transition-all hover:border-[rgba(66,133,244,0.14)] hover:bg-[rgba(66,133,244,0.06)] dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-700/80"
      aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
