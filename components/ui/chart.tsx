"use client"

import * as React from "react"
import { ResponsiveContainer } from "recharts"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

export interface ChartConfig {
  [key: string]: {
    label: string
    color?: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
  children: React.ReactNode // Ensure children is typed correctly
}

export function ChartContainer({
  config,
  children,
  className,
  ...props
}: ChartContainerProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      className={cn("h-[350px] w-full", className)}
      {...props}
      style={
        {
          "--chart-1": config[Object.keys(config)[0]]?.color,
          "--chart-2": config[Object.keys(config)[1]]?.color,
          "--chart-3": config[Object.keys(config)[2]]?.color,
          "--chart-4": config[Object.keys(config)[3]]?.color,
          "--chart-5": config[Object.keys(config)[4]]?.color,
        } as React.CSSProperties
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}
