import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Play, MapPin } from "lucide-react"

const communities = [
  { name: "고퀄리티 개발자 커뮤니티", icon: "🔥", hot: true },
  { name: "HarmonyOS 개발자 커뮤니티", icon: "📱" },
  { name: "AI 개발자 커뮤니티", icon: "🤖" },
  { name: "클라우드 전문가 커뮤니티", icon: "☁️" },
  { name: "NVIDIA AI 기술 포럼", icon: "💻" },
  { name: "블록체인 개발자 공간", icon: "⛓️" },
  { name: "스타트업 개발자 모임", icon: "🚀" },
]

const liveStreams = [
  {
    title: "AI + MCP 더블코딩, 업무 자동화 완벽 구현",
    date: "11/13 12:00",
    live: true,
  },
  {
    title: "지능형 로봇 개발자 대회 시상식",
    date: "11/16 05:40",
    live: false,
  },
  {
    title: "Rockchip 기반 Edge AI 응용",
    date: "12/04 06:00",
    live: false,
  },
]

const events = [
  { day: "07", month: "11월", title: "서울대학교 AI 창업 아카데미", location: "서울" },
  { day: "12", month: "11월", title: "2025 개발자 컨퍼런스", location: "판교" },
  { day: "20", month: "11월", title: "인텔 기술 혁신 포럼", location: "강남" },
  { day: "26", month: "11월", title: "Power Hour: 기업 AI 기술 전환", location: "온라인" },
]

export function RightSidebar() {
  return (
    <aside className="w-64 xl:w-72 shrink-0 hidden xl:block space-y-4">
      {/* Communities */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">커뮤니티 추천</CardTitle>
            <span className="text-sm text-muted-foreground hover:text-orange-500 cursor-pointer flex items-center">
              더보기 <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {communities.map((community, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-1.5 hover:bg-muted rounded px-2 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span>{community.icon}</span>
                <span className="text-sm truncate">{community.name}</span>
              </div>
              {community.hot && (
                <Badge variant="destructive" className="text-xs shrink-0">
                  HOT
                </Badge>
              )}
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Live Streams */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">라이브</CardTitle>
            <span className="text-sm text-muted-foreground hover:text-orange-500 cursor-pointer flex items-center">
              더보기 <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {liveStreams.map((stream, index) => (
            <div key={index} className="flex items-start gap-3 group cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                <Play className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-2 group-hover:text-orange-500">{stream.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{stream.date}</span>
                  {stream.live ? (
                    <Badge className="bg-red-500 text-white text-xs">LIVE</Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs border-orange-500 text-orange-500">
                      예약
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Events */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">활동 일정</CardTitle>
            <span className="text-sm text-muted-foreground hover:text-orange-500 cursor-pointer flex items-center">
              더보기 <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {events.map((event, index) => (
            <div key={index} className="flex items-start gap-3 group cursor-pointer">
              <div className="text-center min-w-[40px] shrink-0">
                <div className="text-xl font-bold text-orange-500">{event.day}</div>
                <div className="text-xs text-muted-foreground">{event.month}</div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-2 group-hover:text-orange-500">{event.title}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {event.location}
                </div>
              </div>
              <Badge variant="secondary" className="shrink-0 text-xs">
                참가
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  )
}
