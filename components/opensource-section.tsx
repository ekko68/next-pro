import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Star } from "lucide-react"

const projects = [
  {
    title: "Next-Auth-Template",
    description: "Next.js 15와 함께 사용하는 완벽한 인증 템플릿",
    tag: "TypeScript",
    tagColor: "bg-blue-500",
    stars: "12.5K",
  },
  {
    title: "AI-Code-Assistant",
    description: "AI 기반 코드 어시스턴트, 실시간 코드 추천",
    tag: "Python",
    tagColor: "bg-green-500",
    stars: "8.2K",
  },
  {
    title: "React-Design-System",
    description: "재사용 가능한 React 컴포넌트 디자인 시스템",
    tag: "React",
    tagColor: "bg-cyan-500",
    stars: "28.9K",
  },
  {
    title: "Docker-DevOps-Kit",
    description: "DevOps를 위한 Docker 자동화 도구 모음",
    tag: "Dockerfile",
    tagColor: "bg-blue-600",
    stars: "5.6K",
  },
]

export function OpenSourceSection() {
  return (
    <Card>
      <CardHeader className="pb-2 px-3 sm:px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">🔥 오픈소스 프로젝트</CardTitle>
          <span className="text-sm text-muted-foreground hover:text-orange-500 cursor-pointer flex items-center">
            더보기 <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg border hover:border-orange-300 hover:shadow-sm cursor-pointer transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold shrink-0">
                {project.title[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm truncate">{project.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{project.description}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant="secondary" className={`${project.tagColor} text-white text-xs`}>
                    {project.tag}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {project.stars}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
