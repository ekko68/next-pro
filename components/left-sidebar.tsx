"use client"

import type React from "react"

import {
  Home,
  FileText,
  Download,
  BookOpen,
  Users,
  Search,
  Code,
  Terminal,
  Rss,
  Heart,
  Bookmark,
  History,
  Crown,
  Lightbulb,
  Sparkles,
} from "lucide-react"
import { useSidebar } from "@/components/sidebar-provider"
import { useState } from "react"

const menuItems = [
  {
    icon: Home,
    label: "홈",
    id: "home",
    color: "text-orange-500",
    hoverColor: "group-hover:text-orange-500",
    animation: "group-hover:scale-110",
  },
  {
    icon: FileText,
    label: "블로그",
    id: "blog",
    color: "text-blue-500",
    hoverColor: "group-hover:text-blue-500",
    animation: "group-hover:rotate-6",
  },
  {
    icon: Download,
    label: "다운로드",
    id: "download",
    color: "text-green-500",
    hoverColor: "group-hover:text-green-500",
    animation: "group-hover:translate-y-1",
  },
  {
    icon: BookOpen,
    label: "학습",
    id: "learn",
    color: "text-purple-500",
    hoverColor: "group-hover:text-purple-500",
    animation: "group-hover:scale-x-110",
  },
  {
    icon: Users,
    label: "커뮤니티",
    id: "community",
    color: "text-pink-500",
    hoverColor: "group-hover:text-pink-500",
    animation: "group-hover:scale-110",
  },
]

const serviceItems = [
  {
    icon: Search,
    label: "AI 검색",
    id: "ai-search",
    color: "text-violet-500",
    hoverColor: "group-hover:text-violet-500",
    animation: "group-hover:rotate-12",
  },
  {
    icon: Code,
    label: "GitCode",
    id: "gitcode",
    color: "text-gray-700",
    hoverColor: "group-hover:text-gray-700",
    animation: "group-hover:rotate-180",
  },
  {
    icon: Terminal,
    label: "InsCode",
    id: "inscode",
    color: "text-emerald-500",
    hoverColor: "group-hover:text-emerald-500",
    animation: "group-hover:scale-110",
  },
  {
    icon: Rss,
    label: "기술 세미나",
    id: "seminar",
    color: "text-amber-500",
    hoverColor: "group-hover:text-amber-500",
    animation: "group-hover:animate-pulse",
  },
  {
    icon: Sparkles,
    label: "DevHub AI",
    id: "devhub-ai",
    color: "text-cyan-500",
    hoverColor: "group-hover:text-cyan-500",
    animation: "group-hover:animate-spin",
  },
]

const userItems = [
  {
    icon: Rss,
    label: "구독",
    id: "subscribe",
    color: "text-orange-400",
    hoverColor: "group-hover:text-orange-400",
    animation: "group-hover:scale-110",
  },
  {
    icon: Heart,
    label: "좋아요",
    id: "like",
    color: "text-red-500",
    hoverColor: "group-hover:text-red-500",
    animation: "group-hover:scale-125",
  },
  {
    icon: Bookmark,
    label: "북마크",
    id: "bookmark",
    color: "text-yellow-500",
    hoverColor: "group-hover:text-yellow-500",
    animation: "group-hover:-translate-y-1",
  },
  {
    icon: History,
    label: "히스토리",
    id: "history",
    color: "text-slate-500",
    hoverColor: "group-hover:text-slate-500",
    animation: "group-hover:-rotate-180",
  },
  {
    icon: Crown,
    label: "회원센터",
    id: "member",
    color: "text-yellow-400",
    hoverColor: "group-hover:text-yellow-400",
    animation: "group-hover:scale-110",
  },
  {
    icon: Lightbulb,
    label: "창작센터",
    id: "creator",
    color: "text-amber-400",
    hoverColor: "group-hover:text-amber-400",
    animation: "group-hover:brightness-125",
  },
]

export function LeftSidebar() {
  const { isOpen } = useSidebar()
  const [activeItem, setActiveItem] = useState("home")

  const renderMenuItem = (item: {
    icon: React.ElementType
    label: string
    id: string
    color: string
    hoverColor: string
    animation: string
  }) => {
    const isActive = activeItem === item.id
    const Icon = item.icon

    return (
      <button
        key={item.id}
        onClick={() => setActiveItem(item.id)}
        className={`group w-full flex flex-col lg:flex-row items-center lg:gap-3 py-2 lg:px-4 lg:py-2 rounded-lg lg:rounded-lg text-sm transition-all ${
          isActive
            ? "bg-gray-100 text-foreground font-medium"
            : "text-muted-foreground hover:bg-gray-50 hover:text-foreground"
        } ${!isOpen ? "!flex-col !py-2" : ""}`}
      >
        <div
          className={`p-2 lg:p-0 rounded-lg lg:rounded-none transition-all duration-300 ${isActive && !isOpen ? "bg-gray-200" : ""} ${isOpen ? "lg:bg-transparent" : ""}`}
        >
          <Icon
            className={`h-5 w-5 shrink-0 transition-all duration-300 ${isActive ? item.color : item.hoverColor} ${item.animation}`}
          />
        </div>
        <span className={`text-xs lg:text-sm mt-1 lg:mt-0 truncate ${!isOpen ? "text-xs mt-1" : ""}`}>
          {item.label}
        </span>
      </button>
    )
  }

  return (
    <aside className={`shrink-0 hidden md:block transition-all duration-300 ${isOpen ? "md:w-16 lg:w-48" : "w-16"}`}>
      <div className={`sticky top-28 space-y-2 ${isOpen ? "md:w-16 md:px-1 lg:w-48 lg:px-0" : "w-16 px-1"}`}>
        {/* Main Menu */}
        <nav className={`${isOpen ? "space-y-1" : "space-y-0"}`}>{menuItems.map(renderMenuItem)}</nav>

        {/* Divider */}
        <div className="border-t my-2" />

        {/* Service Items */}
        <nav className={`${isOpen ? "space-y-1" : "space-y-0"}`}>{serviceItems.map(renderMenuItem)}</nav>

        {/* Divider */}
        <div className="border-t my-2" />

        {/* User Items */}
        <nav className={`${isOpen ? "space-y-1" : "space-y-0"}`}>{userItems.map(renderMenuItem)}</nav>

        {/* Contact - 데스크탑 열렸을 때만 표시 */}
        {isOpen && (
          <div className="hidden lg:block border-t pt-4 text-xs text-muted-foreground space-y-1 px-4">
            <p>고객센터</p>
            <p>운영시간: 08:30 - 22:00</p>
            <p>전화: 1588-0000</p>
          </div>
        )}
      </div>
    </aside>
  )
}
