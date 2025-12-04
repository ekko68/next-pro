import { Header } from "@/components/header"
import { LeftSidebar } from "@/components/left-sidebar"
import { MainContent } from "@/components/main-content"
import { RightSidebar } from "@/components/right-sidebar"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SidebarProvider } from "@/components/sidebar-provider"
import { MobileNav } from "@/components/mobile-nav"

export default function Home() {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-muted/30">
        <Header />
        <div className="max-w-[1400px] mx-auto px-2 sm:px-4 py-2 sm:py-4">
          <div className="flex gap-2 sm:gap-4">
            <LeftSidebar />
            <MainContent />
            <RightSidebar />
          </div>
        </div>
        <ScrollToTop />
        <MobileNav />
      </div>
    </SidebarProvider>
  )
}
