import { apiClient } from '../api-client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../auth-store'
import { ErrorHandler } from '../error-handler'

/**
 * 로그인 요청 타입
 */
export interface LoginRequest {
    email: string
    password: string
}

/**
 * 회원가입 요청 타입
 */
export interface RegisterRequest {
    email: string
    password: string
    name: string
}

/**
 * 인증 응답 타입
 */
export interface AuthResponse {
    user: {
        id: number
        email: string
        name: string
        role?: string
    }
    accessToken: string
    refreshToken: string
}

/**
 * 토큰 갱신 응답 타입
 */
export interface RefreshTokenResponse {
    accessToken: string
    refreshToken: string
}

/**
 * 인증 API
 */
export const authApi = {
    /**
     * 로그인
     */
    login: (data: LoginRequest) =>
        apiClient.post<AuthResponse>('/auth/login', data),

    /**
     * 회원가입
     */
    register: (data: RegisterRequest) =>
        apiClient.post<AuthResponse>('/auth/register', data),

    /**
     * 로그아웃
     */
    logout: () => apiClient.post('/auth/logout'),

    /**
     * 토큰 갱신
     */
    refreshToken: (refreshToken: string) =>
        apiClient.post<RefreshTokenResponse>('/auth/refresh', { refreshToken }),

    /**
     * 현재 사용자 정보 조회
     */
    getCurrentUser: () =>
        apiClient.get<AuthResponse['user']>('/auth/me'),
}

/**
 * 로그인 Mutation
 */
export function useLogin() {
    const { login } = useAuthStore()

    return useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            login(data.user, data.accessToken, data.refreshToken)
            ErrorHandler.showSuccess('로그인되었습니다.')
        },
        onError: (error) => {
            ErrorHandler.handle(error)
        },
    })
}

/**
 * 회원가입 Mutation
 */
export function useRegister() {
    const { login } = useAuthStore()

    return useMutation({
        mutationFn: authApi.register,
        onSuccess: (data) => {
            login(data.user, data.accessToken, data.refreshToken)
            ErrorHandler.showSuccess('회원가입이 완료되었습니다.')
        },
        onError: (error) => {
            ErrorHandler.handle(error)
        },
    })
}

/**
 * 로그아웃 Mutation
 */
export function useLogout() {
    const { logout } = useAuthStore()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            logout()
            queryClient.clear()
            ErrorHandler.showSuccess('로그아웃되었습니다.')
            window.location.href = '/login'
        },
        onError: (error) => {
            // 에러가 발생해도 로그아웃 처리
            logout()
            queryClient.clear()
            window.location.href = '/login'
        },
    })
}

/**
 * 현재 사용자 정보 Query
 */
export function useCurrentUser() {
    const { setUser } = useAuthStore()

    return useQuery({
        queryKey: ['auth', 'currentUser'],
        queryFn: authApi.getCurrentUser,
        onSuccess: (data) => {
            setUser(data)
        },
        onError: (error) => {
            ErrorHandler.handle(error, false)
        },
        retry: false,
        staleTime: Infinity,
    })
}
