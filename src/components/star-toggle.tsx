'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

interface StarToggleProps {
  onChange?: (filled: boolean) => void
  defaultFilled?: boolean
}

export function StarToggle({ onChange, defaultFilled = false }: StarToggleProps) {
  const [filled, setFilled] = useState(defaultFilled)

  const handleToggle = () => {
    const newFilled = !filled
    setFilled(newFilled)
    onChange?.(newFilled)
  }

  return (
    <button
      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded-full"
      onClick={handleToggle}
      aria-pressed={filled}
      aria-label={filled ? "Unstar" : "Star"}
    >
      <Star
        className={`w-4 h-4 transition-colors ${
          filled ? 'fill-[#f21300] text-[#f21300]' : 'text-gray-300'
        }`}
      />
    </button>
  )
}

