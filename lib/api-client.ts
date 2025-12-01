import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ApiResponse, ApiError } from './api-types'
import { AuthUtils } from './auth-utils'

// 토큰 갱신 중 플래그
let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })
    failedQueue = []
}

/**
 * Axios 인스턴스 생성
 */
const createAxiosInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
        },
    })

    // Request 인터셉터 (전처리)
    instance.interceptors.request.use(
        (config) => {
            // 1. 인증 토큰 추가 (AuthUtils 사용)
            const token = AuthUtils.getAccessToken()
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }

            // 2. 요청 로깅 (개발 환경)
            if (process.env.NODE_ENV === 'development') {
                console.log('🚀 API Request:', {
                    method: config.method?.toUpperCase(),
                    url: config.url,
                    data: config.data,
                    params: config.params,
                })
            }

            // 3. 타임스탬프 추가
            config.headers['X-Request-Time'] = new Date().toISOString()

            return config
        },
        (error) => {
            console.error('❌ Request Error:', error)
            return Promise.reject(error)
        }
    )

    // Response 인터셉터 (후처리)
    instance.interceptors.response.use(
        (response: AxiosResponse) => {
            // 1. 응답 로깅 (개발 환경)
            if (process.env.NODE_ENV === 'development') {
                console.log('✅ API Response:', {
                    status: response.status,
                    url: response.config.url,
                    data: response.data,
                })
            }

            // 2. 응답 데이터 정규화
            return response
        },
        async (error: AxiosError<ApiError>) => {
            const originalRequest: any = error.config

            // 1. 에러 로깅
            if (process.env.NODE_ENV === 'development') {
                console.error('❌ API Error:', {
                    status: error.response?.status,
                    url: error.config?.url,
                    message: error.response?.data?.message || error.message,
                })
            }

            // 2. 401 에러 처리 (인증 만료) - 토큰 갱신 시도
            if (error.response?.status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    // 이미 토큰 갱신 중이면 대기열에 추가
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject })
                    })
                        .then((token) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`
                            return instance(originalRequest)
                        })
                        .catch((err) => {
                            return Promise.reject(err)
                        })
                }

                originalRequest._retry = true
                isRefreshing = true

                const refreshToken = AuthUtils.getRefreshToken()

                if (!refreshToken) {
                    // Refresh token이 없으면 로그아웃
                    AuthUtils.logout()
                    return Promise.reject(error)
                }

                try {
                    // 토큰 갱신 요청
                    const response = await instance.post('/auth/refresh', { refreshToken })
                    const { accessToken, refreshToken: newRefreshToken } = response.data.data

                    // 새 토큰 저장
                    AuthUtils.setAccessToken(accessToken)
                    AuthUtils.setRefreshToken(newRefreshToken)

                    // 대기 중인 요청들 처리
                    processQueue(null, accessToken)

                    // 원래 요청 재시도
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`
                    return instance(originalRequest)
                } catch (refreshError) {
                    // 토큰 갱신 실패 시 로그아웃
                    processQueue(refreshError, null)
                    AuthUtils.logout()
                    return Promise.reject(refreshError)
                } finally {
                    isRefreshing = false
                }
            }

            // 3. 403 에러 처리 (권한 없음)
            if (error.response?.status === 403) {
                console.error('권한이 없습니다.')
            }

            // 4. 500 에러 처리 (서버 에러)
            if (error.response?.status === 500) {
                console.error('서버 에러가 발생했습니다.')
            }

            // 5. 네트워크 에러 처리
            if (!error.response) {
                console.error('네트워크 연결을 확인해주세요.')
            }

            return Promise.reject(error)
        }
    )

    return instance
}

// Axios 인스턴스
const axiosInstance = createAxiosInstance()

/**
 * API Client 클래스
 */
class ApiClient {
    /**
     * GET 요청
     */
    async get<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const response = await axiosInstance.get<ApiResponse<T>>(url, config)
        return response.data.data
    }

    /**
     * POST 요청
     */
    async post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const response = await axiosInstance.post<ApiResponse<T>>(url, data, config)
        return response.data.data
    }

    /**
     * PUT 요청
     */
    async put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const response = await axiosInstance.put<ApiResponse<T>>(url, data, config)
        return response.data.data
    }

    /**
     * DELETE 요청
     */
    async delete<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const response = await axiosInstance.delete<ApiResponse<T>>(url, config)
        return response.data.data
    }

    /**
     * PATCH 요청
     */
    async patch<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const response = await axiosInstance.patch<ApiResponse<T>>(url, data, config)
        return response.data.data
    }

    /**
     * Raw Axios 인스턴스 접근 (필요한 경우)
     */
    get instance(): AxiosInstance {
        return axiosInstance
    }
}

// API Client 인스턴스 생성 및 export
export const apiClient = new ApiClient()

// Axios 인스턴스도 export (필요한 경우)
export { axiosInstance }
