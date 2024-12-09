"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CustomSelectProps {
  placeholder: string
  options: { key: string; name: string }[]
  className?: string
}

export default function CustomSelect({ placeholder, options, className }: CustomSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <div className={cn("relative w-[200px]", className)}>
      <Select onValueChange={(newValue) => setValue(newValue)} onOpenChange={setIsOpen}>
        <SelectTrigger 
          className="w-full bg-white border-gray-300 focus:ring-0 focus:ring-offset-0 text-xs text-black relative max-h-fit rounded-md
          focus-within:border-blue-500 transition-colors data-[placeholder]:border-gray-300"
        >
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent 
          className="bg-white border-gray-300 text-black"
        >
          {options.map((option) => (
            <SelectItem key={option.key} value={option.key} className="focus:bg-blue-100 focus:text-black">
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span 
        className={cn(
          "pointer-events-none absolute left-[13px] bg-white px-1 text-xs text-gray-500 transition-all",
          isOpen || value ? "-top-2" : "top-[10px] text-xs"
        )}
      >
        {placeholder}
      </span>
    </div>
  )
}

