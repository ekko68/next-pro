import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_KR } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const notoSansKR = Noto_Sans_KR({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DevHub - 개발자 커뮤니티",
  description: "개발자를 위한 기술 블로그, 오픈소스, 커뮤니티 플랫폼",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
