"use client"

import { ArrowUp } from "lucide-react"

export function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-110 active:scale-95"
      aria-label="맨 위로 이동"
    >
      <ArrowUp className="h-4 w-4 md:h-5 md:w-5" />
    </button>
  )
}
