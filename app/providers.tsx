"use client"

import type React from "react"

import { CartProvider } from "@/lib/cart-context"
import { ThemeProvider } from "@/components/theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  )
}

