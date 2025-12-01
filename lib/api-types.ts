/**
 * API 응답 타입 정의
 */
export interface ApiResponse<T = any> {
    data: T
    message?: string
    status: number
    success: boolean
}

/**
 * API 에러 타입 정의
 */
export interface ApiError {
    message: string
    status: number
    code?: string
    errors?: Record<string, string[]>
}

/**
 * 페이지네이션 응답 타입
 */
export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    pageSize: number
    totalPages: number
}

/**
 * 요청 설정 타입
 */
export interface RequestConfig {
    headers?: Record<string, string>
    params?: Record<string, any>
    timeout?: number
    withCredentials?: boolean
}
