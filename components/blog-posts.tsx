import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, ThumbsUp, Bookmark, ChevronRight } from "lucide-react"

const posts = [
  {
    author: "김개발",
    avatar: "/developer-male-korean.jpg",
    title: "React 19의 새로운 기능들: 실전 프로젝트 적용기",
    excerpt: "React 19에서 도입된 새로운 훅들과 서버 컴포넌트를 실제 프로젝트에 적용하면서 배운 점들을 공유합니다...",
    views: "1.3K",
    likes: 38,
    bookmarks: 21,
    image: "/react-code-programming.jpg",
  },
  {
    author: "코딩마스터",
    avatar: "/developer-female-asian.jpg",
    title: "[Linux 정리] 네트워크 기초부터 심화까지 완벽 정리",
    excerpt: "리눅스 네트워크의 기본 개념과 핵심 기술, 네트워크 계층별 동작 원리와 실무 적용법을 상세히 알아봅니다...",
    views: "1.7K",
    likes: 28,
    bookmarks: 24,
    image: "/linux-server-terminal.jpg",
  },
  {
    author: "풀스택개발자",
    avatar: "/developer-male-glasses.jpg",
    title: "Next.js 15와 TypeScript로 완벽한 풀스택 앱 만들기",
    excerpt: "서버 컴포넌트와 서버 액션을 활용하여 데이터베이스 연동부터 배포까지 전체 과정을 다룹니다...",
    views: "1.5K",
    likes: 32,
    bookmarks: 48,
    image: "/nextjs-typescript-fullstack.jpg",
  },
  {
    author: "AI엔지니어",
    avatar: "/developer-ai-engineer.jpg",
    title: "25년차 개발자가 말하는 AI 시대의 개발자 생존법",
    excerpt: "프론트엔드, 백엔드를 거쳐 AI 시대를 맞이한 개발자로서 느끼는 점과 앞으로의 방향성에 대해 이야기합니다...",
    views: "1.3K",
    likes: 30,
    bookmarks: 16,
    image: "/ai-developer-future-technology.jpg",
  },
  {
    author: "메모리최적화",
    avatar: "/developer-performance-engineer.jpg",
    title: "메모리 누수 찾기: 실무에서 겪은 사례와 해결법",
    excerpt: "프로덕션 환경에서 발생한 메모리 누수를 어떻게 발견하고 해결했는지 실제 사례를 바탕으로 설명합니다...",
    views: "238",
    likes: 5,
    bookmarks: 11,
    image: "/memory-optimization-debugging.jpg",
  },
  {
    author: "클라우드전문가",
    avatar: "/cloud-engineer-professional.png",
    title: "2025 클라우드 서비스 비교: AWS vs GCP vs Azure",
    excerpt: "세 가지 주요 클라우드 서비스의 특징과 가격, 사용 사례를 비교 분석하여 최적의 선택을 도와드립니다...",
    views: "2.1K",
    likes: 34,
    bookmarks: 17,
    image: "/cloud-aws-gcp-azure-comparison.jpg",
  },
]

export function BlogPosts() {
  return (
    <Card className="mb-16 md:mb-0">
      <CardHeader className="pb-2 px-3 sm:px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">✨ 추천 블로그</CardTitle>
          <span className="text-sm text-muted-foreground hover:text-orange-500 cursor-pointer flex items-center">
            랭킹 <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-3 sm:px-6">
        {posts.map((post, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pb-4 border-b last:border-0 last:pb-0 cursor-pointer group"
          >
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-full sm:w-32 h-40 sm:h-20 object-cover rounded-lg shrink-0 sm:order-2"
            />
            <div className="flex-1 min-w-0 sm:order-1">
              <div className="flex items-center gap-2 mb-1">
                <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                  <AvatarImage src={post.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{post.author[0]}</AvatarFallback>
                </Avatar>
                <span className="text-xs sm:text-sm text-muted-foreground">{post.author}</span>
              </div>
              <h3 className="font-semibold text-sm sm:text-base mb-1 group-hover:text-orange-500 transition-colors line-clamp-2 sm:line-clamp-1">
                {post.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2">{post.excerpt}</p>
              <div className="flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  조회 {post.views}
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Bookmark className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  저장 {post.bookmarks}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
