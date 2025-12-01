import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { ApiError } from './api-types'

/**
 * 에러 메시지 매핑
 */
const ERROR_MESSAGES: Record<number, string> = {
    400: '잘못된 요청입니다.',
    401: '인증이 필요합니다.',
    403: '접근 권한이 없습니다.',
    404: '요청한 리소스를 찾을 수 없습니다.',
    409: '이미 존재하는 데이터입니다.',
    422: '입력 데이터를 확인해주세요.',
    429: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.',
    500: '서버 오류가 발생했습니다.',
    502: '게이트웨이 오류가 발생했습니다.',
    503: '서비스를 일시적으로 사용할 수 없습니다.',
}

/**
 * API 에러 핸들러
 */
export class ErrorHandler {
    /**
     * 에러 처리 및 Toast 표시
     */
    static handle(error: unknown, showToast = true): ApiError {
        const apiError = this.parseError(error)

        if (showToast) {
            this.showErrorToast(apiError)
        }

        // 개발 환경에서 상세 로깅
        if (process.env.NODE_ENV === 'development') {
            console.error('Error Details:', {
                message: apiError.message,
                status: apiError.status,
                code: apiError.code,
                errors: apiError.errors,
            })
        }

        return apiError
    }

    /**
     * 에러 파싱
     */
    private static parseError(error: unknown): ApiError {
        // Axios 에러인 경우
        if (this.isAxiosError(error)) {
            const status = error.response?.status || 500
            const data = error.response?.data

            return {
                message: data?.message || ERROR_MESSAGES[status] || '알 수 없는 오류가 발생했습니다.',
                status,
                code: data?.code,
                errors: data?.errors,
            }
        }

        // 일반 Error 객체인 경우
        if (error instanceof Error) {
            return {
                message: error.message,
                status: 500,
            }
        }

        // 기타 에러
        return {
            message: '알 수 없는 오류가 발생했습니다.',
            status: 500,
        }
    }

    /**
     * Toast 에러 메시지 표시
     */
    private static showErrorToast(error: ApiError): void {
        // 필드별 에러가 있는 경우
        if (error.errors && Object.keys(error.errors).length > 0) {
            const firstError = Object.values(error.errors)[0][0]
            toast.error(firstError)
            return
        }

        // 일반 에러 메시지
        toast.error(error.message)
    }

    /**
     * Axios 에러 타입 가드
     */
    private static isAxiosError(error: unknown): error is AxiosError<ApiError> {
        return (error as AxiosError).isAxiosError === true
    }

    /**
     * 성공 메시지 표시
     */
    static showSuccess(message: string): void {
        toast.success(message)
    }

    /**
     * 정보 메시지 표시
     */
    static showInfo(message: string): void {
        toast.info(message)
    }

    /**
     * 경고 메시지 표시
     */
    static showWarning(message: string): void {
        toast.warning(message)
    }
}
