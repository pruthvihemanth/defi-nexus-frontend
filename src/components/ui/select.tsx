"use client"

import * as React from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CustomSelectProps {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  options: { value: string; label: string }[]
  className?: string
}

export function CustomSelect({ value, onValueChange, placeholder, options, className }: CustomSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const selectRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectedOption = options.find(option => option.value === value)

  return (
    <div ref={selectRef} className={cn("relative z-50", className)}>
      <button
        type="button"
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/20 hover:bg-white/90 dark:hover:bg-slate-700/80 transition-all duration-200",
          isOpen && "ring-2 ring-blue-500"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={cn("block truncate text-left", !selectedOption && "text-muted-foreground")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-[9999] mt-1 max-h-60 overflow-auto rounded-md border bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-white/20 shadow-2xl">
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(
                "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-200",
                value === option.value && "bg-blue-500/10 text-blue-600 dark:text-blue-400"
              )}
              onClick={() => {
                onValueChange(option.value)
                setIsOpen(false)
              }}
            >
              <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {value === option.value && <Check className="h-4 w-4 text-blue-500" />}
              </span>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
