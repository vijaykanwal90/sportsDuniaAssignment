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
  children: React.ReactNode // Keep as ReactNode for flexibility
}

export function ChartContainer({
  config,
  children,
  className,
  ...props
}: ChartContainerProps) {
  // const { theme } = useTheme()
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

interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  payload?: Array<{ name: string; value: number | string; color?: string }>
  config: ChartConfig
  indicator?: "dot" | "line"
  hideLabel?: boolean
}

export function ChartTooltip({
  active,
  payload,
  config,
  indicator = "dot",
  hideLabel = false,
  className,
  ...props
}: ChartTooltipProps) {
  if (!active || !payload) {
    return null
  }

  return (
    <div
      className={cn(
        "rounded-lg border bg-background p-2 shadow-sm",
        className
      )}
      {...props}
    >
      <div className="grid gap-2">
        {payload.map((item, index) => {
          const configItem = config[item.name as keyof typeof config]

          return (
            <div key={`item-${index}`} className="flex items-center gap-2">
              {indicator === "dot" && (
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ background: item.color ?? configItem?.color }}
                />
              )}
              {indicator === "line" && (
                <div
                  className="h-1 w-4 rounded-full"
                  style={{ background: item.color ?? configItem?.color }}
                />
              )}
              {!hideLabel && (
                <span className="text-sm font-medium text-muted-foreground">
                  {configItem?.label ?? item.name}
                </span>
              )}
              <span className="font-bold">{item.value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface ChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export function ChartLegend({ config, className, ...props }: ChartLegendProps) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-4", className)}
      {...props}
    >
      {Object.entries(config).map(([key, value]) => (
        <div key={key} className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ background: value.color }}
          />
          <span className="text-sm font-medium text-muted-foreground">
            {value.label}
          </span>
        </div>
      ))}
    </div>
  )
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{ name: string; value: number | string; color?: string }>
  label?: string
  labelKey?: string
  hideLabel?: boolean
  indicator?: "dot" | "line"
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  labelKey,
  hideLabel = false,
  indicator = "dot",
}: ChartTooltipContentProps) {
  if (!active || !payload) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      {label && <div className="mb-2 font-medium">{label}</div>}
      <div className="grid gap-2">
        {payload.map((item, index) => {
          const labelValue = labelKey ? item[labelKey] : item.name
          return (
            <div key={`item-${index}`} className="flex items-center gap-2">
              {indicator === "dot" && (
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ background: item.color }}
                />
              )}
              {indicator === "line" && (
                <div
                  className="h-1 w-4 rounded-full"
                  style={{ background: item.color }}
                />
              )}
              {!hideLabel && (
                <span className="text-sm font-medium text-muted-foreground">
                  {labelValue}:
                </span>
              )}
              <span className="font-bold">{item.value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface ChartLegendContentProps {
  payload?: Array<{
    value: string
    type: string
    id: string
    color: string
  }>
}

export function ChartLegendContent({ payload }: ChartLegendContentProps) {
  if (!payload) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-4">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}
