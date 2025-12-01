"use client"

import * as React from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "next-themes"

interface RadixProviderProps {
  children: React.ReactNode
}

export function RadixProvider({ children }: RadixProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider delayDuration={300} skipDelayDuration={100}>
        {children}
      </TooltipProvider>
    </ThemeProvider>
  )
}
