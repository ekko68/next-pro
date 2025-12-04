import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const newsItems = [
  {
    image: "/ai-pytorch-code.jpg",
    title: "AI 학습을 위한 PyTorch 완벽 가이드",
    tag: "Python",
  },
  {
    image: "/bug-fixing-developer.jpg",
    title: "'버그'를 '기능'으로 바꾸는 개발자의 기술",
    tag: "개발문화",
  },
  {
    image: "/blockchain-ecosystem.jpg",
    title: "블록체인 생태계의 미래: 개발자가 알아야 할 것들",
    tag: "블록체인",
  },
  {
    image: "/startup-developer-meeting.jpg",
    title: "스타트업 개발자가 말하는 성공 노하우",
    tag: "커리어",
  },
]

const headlines = [
  "네이버, AI 개발자 대규모 채용 시작... 연봉 5천만원 시작",
  "메타, AI 어시스턴트 성능 대폭 향상... 개발자 생산성 2배",
  "사상 최대 규모! 개발자 컨퍼런스 2025 개최 예정",
  "구글 클라우드, 한국 개발자를 위한 새로운 프로그램 발표",
  "전 세계 개발자들이 주목하는 'AI 코드 리뷰' 서비스",
  "개발자 연봉 순위, 올해도 1위는 역시...",
]

export function NewsSection() {
  return (
    <Card>
      <CardHeader className="pb-2 px-3 sm:px-6">
        <CardTitle className="text-base sm:text-lg flex items-center gap-2">📰 뉴스 헤드라인</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-3 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {newsItems.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-2">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-32 sm:h-24 object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-1 left-1 text-xs bg-black/70 text-white px-1.5 py-0.5 rounded">
                  {item.tag}
                </span>
              </div>
              <p className="text-sm font-medium line-clamp-2 group-hover:text-orange-500">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          {headlines.map((headline, index) => (
            <div
              key={index}
              className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <span className="text-orange-500">•</span>
              <span className="line-clamp-1">{headline}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
