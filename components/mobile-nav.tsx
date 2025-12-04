"use client"

import { Home, FileText, Search, Bookmark, User } from "lucide-react"
import { useState } from "react"

const navItems = [
  { icon: Home, label: "홈", id: "home" },
  { icon: FileText, label: "블로그", id: "blog" },
  { icon: Search, label: "검색", id: "search" },
  { icon: Bookmark, label: "북마크", id: "bookmark" },
  { icon: User, label: "마이", id: "my" },
]

export function MobileNav() {
  const [activeItem, setActiveItem] = useState("home")

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <div className="flex items-center justify-around h-14">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? "text-orange-500" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "scale-110" : ""} transition-transform`} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
