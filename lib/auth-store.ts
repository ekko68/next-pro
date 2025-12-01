import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthUtils } from './auth-utils'

/**
 * 사용자 타입
 */
export interface User {
    id: number
    email: string
    name: string
    role?: string
}

/**
 * 인증 상태 타입
 */
interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
}

/**
 * 인증 액션 타입
 */
interface AuthActions {
    setUser: (user: User | null) => void
    setTokens: (accessToken: string, refreshToken: string) => void
    login: (user: User, accessToken: string, refreshToken: string) => void
    logout: () => void
    setLoading: (isLoading: boolean) => void
}

/**
 * 인증 스토어
 */
export const useAuthStore = create<AuthState & AuthActions>()(
    persist(
        (set) => ({
            // 상태
            user: null,
            isAuthenticated: false,
            isLoading: false,

            // 액션
            setUser: (user) =>
                set({
                    user,
                    isAuthenticated: !!user,
                }),

            setTokens: (accessToken, refreshToken) => {
                AuthUtils.setAccessToken(accessToken)
                AuthUtils.setRefreshToken(refreshToken)
            },

            login: (user, accessToken, refreshToken) => {
                AuthUtils.setAccessToken(accessToken)
                AuthUtils.setRefreshToken(refreshToken)
                set({
                    user,
                    isAuthenticated: true,
                })
            },

            logout: () => {
                AuthUtils.clearTokens()
                set({
                    user: null,
                    isAuthenticated: false,
                })
            },

            setLoading: (isLoading) =>
                set({
                    isLoading,
                }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)
