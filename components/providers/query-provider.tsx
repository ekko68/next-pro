"use client"

import * as React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

interface QueryProviderProps {
    children: React.ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // 데이터가 stale 상태가 되는 시간 (5분)
                        staleTime: 60 * 1000 * 5,
                        // 캐시 가비지 컬렉션 시간 (10분)
                        gcTime: 60 * 1000 * 10,
                        // 윈도우 포커스 시 자동 refetch
                        refetchOnWindowFocus: false,
                        // 실패 시 재시도 횟수
                        retry: 1,
                        // 네트워크 재연결 시 자동 refetch
                        refetchOnReconnect: true,
                    },
                    mutations: {
                        // mutation 실패 시 재시도 횟수
                        retry: 0,
                    },
                },
            })
    )

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
        </QueryClientProvider>
    )
}
