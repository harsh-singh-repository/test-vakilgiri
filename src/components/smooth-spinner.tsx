"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface SpinnerProps {
  size?: number
  color?: string
  thickness?: number
  speed?: number
  initialDelay?: number
}

export default function Spinner({
  size = 40,
  color = '#3b82f6',
  thickness = 4,
  speed = 0.75,
  initialDelay = 0.3
}: SpinnerProps) {
  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: speed
  }

  return (
    <div role="status" aria-label="Loading" className="flex items-center justify-center">
      <motion.span
        className="sr-only"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: initialDelay }}
      >
        Loading...
      </motion.span>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        style={{ color: color }}
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: 1 }}
        transition={{
          ...spinTransition,
          delay: initialDelay,
          opacity: { duration: 0.2, delay: initialDelay }
        }}
      >
        <motion.circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeLinecap="round"
          initial={{ pathLength: 0.2, opacity: 0 }}
          animate={{ 
            pathLength: [0.2, 0.8, 0.2],
            opacity: 1
          }}
          transition={{
            duration: speed * 2,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.5, 1],
            delay: initialDelay,
            opacity: { duration: 0.2 }
          }}
        />
      </motion.svg>
    </div>
  )
}

