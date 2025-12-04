"use client"

import { useState } from "react"
import { Search, Plus, ChevronDown, Menu, Flame, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useSidebar } from "@/components/sidebar-provider"

export function Header() {
  const { toggle, isOpen } = useSidebar()
  const [activeCategory, setActiveCategory] = useState(0)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const categories = [
    "전체",
    "뉴스",
    "MCP",
    "DeepSeek",
    "운영체제",
    "인공지능",
    "Java",
    "C++",
    "Python",
    "프론트엔드",
    "백엔드",
  ]

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="flex items-center h-14 px-2 sm:px-4 gap-2 sm:gap-6">
        {/* 왼쪽: 햄버거 + 로고 */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={toggle}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">사이드바 토글</span>
          </Button>
          <div className="text-xl sm:text-2xl font-bold text-primary">
            <span className="text-orange-500">Dev</span>Hub
          </div>
        </div>

        <div className="hidden md:flex flex-1 justify-center items-center gap-2 mx-4 lg:mx-8">
          <div className="flex items-center w-full max-w-xl bg-gray-100 rounded-full">
            <Flame className="h-4 w-4 text-orange-500 ml-4 shrink-0" />
            <Input
              placeholder="html+css+js 웹페이지 디자인"
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-10 text-sm"
            />
          </div>
          <Button className="rounded-full h-9 px-4 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium gap-1.5 shrink-0">
            <Search className="h-4 w-4" />
            <span className="hidden lg:inline">검색</span>
          </Button>
          <Button
            className="rounded-full h-9 px-4 text-white text-sm font-medium shrink-0 hover:opacity-90"
            style={{ background: "linear-gradient(90deg, #ba88fa 0%, #635bff 100%)" }}
          >
            <span className="hidden lg:inline">AI 검색</span>
            <span className="lg:hidden">AI</span>
          </Button>
        </div>

        <div className="flex md:hidden flex-1 justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          >
            {mobileSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>
        </div>

        <div className="flex items-center gap-1 sm:gap-4 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex text-muted-foreground hover:text-foreground rounded-full px-2 sm:px-3"
            style={{ backgroundColor: "#f2f2f2" }}
          >
            로그인
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hidden lg:flex gap-1 text-muted-foreground hover:text-foreground rounded-full"
            style={{ backgroundColor: "#f2f2f2" }}
          >
            회원·신규혜택
            <Badge className="bg-orange-500 text-white text-xs px-1 py-0 h-4">🎁</Badge>
          </Button>
          <div
            className="hidden sm:block relative px-2 sm:px-3 py-1.5 rounded-full cursor-pointer"
            style={{ backgroundColor: "#f2f2f2" }}
          >
            <span className="text-muted-foreground hover:text-foreground text-sm">메시지</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          <Button className="gap-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 h-8 sm:h-9 px-2 sm:px-4 text-xs sm:text-sm">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">글쓰기</span>
            <ChevronDown className="h-4 w-4 hidden sm:inline" />
          </Button>
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="md:hidden px-2 pb-2 flex items-center gap-2">
          <div className="flex items-center flex-1 bg-gray-100 rounded-full">
            <Flame className="h-4 w-4 text-orange-500 ml-3 shrink-0" />
            <Input
              placeholder="검색어를 입력하세요"
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-9 text-sm"
              autoFocus
            />
          </div>
          <Button className="rounded-full h-9 px-3 bg-orange-500 hover:bg-orange-600 text-white text-sm shrink-0">
            <Search className="h-4 w-4" />
          </Button>
          <Button
            className="rounded-full h-9 px-3 text-white text-sm shrink-0 hover:opacity-90"
            style={{ background: "linear-gradient(90deg, #ba88fa 0%, #635bff 100%)" }}
          >
            AI
          </Button>
        </div>
      )}

      <div className="flex items-center h-10 sm:h-12 px-2 sm:px-4 bg-muted/30 border-t">
        <div className={`hidden lg:block transition-all duration-300 ${isOpen ? "w-48" : "w-16"} shrink-0`} />

        {/* 카테고리 메뉴 - 스크롤 가능 */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide flex-1">
          {categories.map((cat, index) => (
            <Button
              key={cat}
              variant="ghost"
              size="sm"
              onClick={() => setActiveCategory(index)}
              className={`shrink-0 h-7 sm:h-8 text-xs sm:text-sm ${
                activeCategory === index
                  ? "bg-zinc-800 hover:bg-zinc-700 text-white rounded-full px-3 sm:px-4"
                  : "text-muted-foreground hover:text-foreground hover:bg-gray-300 rounded-full px-3 sm:px-4"
              }`}
              style={activeCategory !== index ? { backgroundColor: "#f2f2f2" } : undefined}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>
    </header>
  )
}
