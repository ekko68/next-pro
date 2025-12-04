import { NewsSection } from "@/components/news-section"
import { OpenSourceSection } from "@/components/opensource-section"
import { BlogPosts } from "@/components/blog-posts"

export function MainContent() {
  return (
    <main className="flex-1 min-w-0 space-y-4">
      <NewsSection />
      <OpenSourceSection />
      <BlogPosts />
    </main>
  )
}
