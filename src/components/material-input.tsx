"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface MaterialInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
}

const MaterialInput = React.forwardRef<HTMLInputElement, MaterialInputProps>(
  ({ className, placeholder, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "peer w-full rounded-sm border border-[#091747] bg-background px-3 py-2 text-sm ring-offset-background transition-all placeholder:text-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
            className
          )}
          ref={ref}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false)
            setHasValue(e.target.value.length > 0)
          }}
          onChange={(e) => setHasValue(e.target.value.length > 0)}
          {...props}
        />
        <span
          className={cn(
            "pointer-events-none absolute left-3 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-1 text-sm text-muted-foreground duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75",
            (isFocused || hasValue) && "text-foreground"
          )}
        >
          {placeholder}
        </span>
      </div>
    )
  }
)
MaterialInput.displayName = "MaterialInput"

export { MaterialInput }

