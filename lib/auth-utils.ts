/**
 * 토큰 저장소 키
 */
const TOKEN_KEYS = {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
} as const

/**
 * 인증 유틸리티
 */
export class AuthUtils {
    /**
     * Access Token 저장
     */
    static setAccessToken(token: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, token)
        }
    }

    /**
     * Access Token 조회
     */
    static getAccessToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN)
        }
        return null
    }

    /**
     * Refresh Token 저장
     */
    static setRefreshToken(token: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, token)
        }
    }

    /**
     * Refresh Token 조회
     */
    static getRefreshToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN)
        }
        return null
    }

    /**
     * 모든 토큰 제거
     */
    static clearTokens(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN)
            localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN)
        }
    }

    /**
     * 토큰 존재 여부 확인
     */
    static hasToken(): boolean {
        return !!this.getAccessToken()
    }

    /**
     * JWT 토큰 디코딩 (페이로드만)
     */
    static decodeToken(token: string): any {
        try {
            const base64Url = token.split('.')[1]
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            )
            return JSON.parse(jsonPayload)
        } catch (error) {
            console.error('Failed to decode token:', error)
            return null
        }
    }

    /**
     * 토큰 만료 여부 확인
     */
    static isTokenExpired(token: string): boolean {
        const decoded = this.decodeToken(token)
        if (!decoded || !decoded.exp) {
            return true
        }

        const currentTime = Date.now() / 1000
        return decoded.exp < currentTime
    }

    /**
     * Access Token 만료 여부 확인
     */
    static isAccessTokenExpired(): boolean {
        const token = this.getAccessToken()
        if (!token) {
            return true
        }
        return this.isTokenExpired(token)
    }

    /**
     * 로그아웃 (토큰 제거 및 리다이렉트)
     */
    static logout(redirectTo = '/login'): void {
        this.clearTokens()
        if (typeof window !== 'undefined') {
            window.location.href = redirectTo
        }
    }

    /**
     * 사용자 정보 조회 (토큰에서)
     */
    static getUserFromToken(): any {
        const token = this.getAccessToken()
        if (!token) {
            return null
        }
        return this.decodeToken(token)
    }
}
