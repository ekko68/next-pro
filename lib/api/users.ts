import { apiClient } from '../api-client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ErrorHandler } from '../error-handler'
import { PaginatedResponse } from '../api-types'

/**
 * 사용자 타입
 */
export interface User {
    id: number
    email: string
    name: string
    role?: string
    createdAt?: string
    updatedAt?: string
}

/**
 * 사용자 생성 요청 타입
 */
export interface CreateUserRequest {
    email: string
    name: string
    password: string
    role?: string
}

/**
 * 사용자 수정 요청 타입
 */
export interface UpdateUserRequest {
    email?: string
    name?: string
    role?: string
}

/**
 * 사용자 목록 쿼리 파라미터
 */
export interface UserListParams {
    page?: number
    pageSize?: number
    search?: string
    role?: string
}

/**
 * 사용자 API
 */
export const userApi = {
    /**
     * 사용자 목록 조회
     */
    getUsers: (params?: UserListParams) =>
        apiClient.get<PaginatedResponse<User>>('/users', { params }),

    /**
     * 사용자 상세 조회
     */
    getUser: (id: number) => apiClient.get<User>(`/users/${id}`),

    /**
     * 사용자 생성
     */
    createUser: (data: CreateUserRequest) =>
        apiClient.post<User>('/users', data),

    /**
     * 사용자 수정
     */
    updateUser: (id: number, data: UpdateUserRequest) =>
        apiClient.put<User>(`/users/${id}`, data),

    /**
     * 사용자 삭제
     */
    deleteUser: (id: number) => apiClient.delete(`/users/${id}`),
}

/**
 * 사용자 목록 Query
 */
export function useUsers(params?: UserListParams) {
    return useQuery({
        queryKey: ['users', params],
        queryFn: () => userApi.getUsers(params),
        // Note: onError removed in TanStack Query v5
        // Handle errors in component: const { error } = useUsers()
        // Or use global error boundary
    })
}

/**
 * 사용자 상세 Query
 */
export function useUser(id: number) {
    return useQuery({
        queryKey: ['users', id],
        queryFn: () => userApi.getUser(id),
        enabled: !!id,
        // Note: onError removed in TanStack Query v5
        // Handle errors in component: const { error } = useUser(id)
        // Or use global error boundary
    })
}

/**
 * 사용자 생성 Mutation
 */
export function useCreateUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: userApi.createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            ErrorHandler.showSuccess('사용자가 생성되었습니다.')
        },
        onError: (error) => {
            ErrorHandler.handle(error)
        },
    })
}

/**
 * 사용자 수정 Mutation
 */
export function useUpdateUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateUserRequest }) =>
            userApi.updateUser(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['users', variables.id] })
            queryClient.invalidateQueries({ queryKey: ['users'] })
            ErrorHandler.showSuccess('사용자 정보가 수정되었습니다.')
        },
        onError: (error) => {
            ErrorHandler.handle(error)
        },
    })
}

/**
 * 사용자 삭제 Mutation
 */
export function useDeleteUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: userApi.deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            ErrorHandler.showSuccess('사용자가 삭제되었습니다.')
        },
        onError: (error) => {
            ErrorHandler.handle(error)
        },
    })
}
