/**
 * API 사용 예시 파일
 * 
 * 이 파일은 실제 프로젝트에서 사용하지 않으며,
 * API Client 사용법을 보여주는 예시입니다.
 */

import { apiClient } from './api-client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// ============================================
// 타입 정의 예시
// ============================================

interface User {
    id: number
    name: string
    email: string
}

interface Post {
    id: number
    title: string
    content: string
    userId: number
}

// ============================================
// 1. 기본 API 호출 예시
// ============================================

export const userApi = {
    // GET 요청
    getUsers: () => apiClient.get<User[]>('/users'),

    // GET 요청 (단일 항목)
    getUser: (id: number) => apiClient.get<User>(`/users/${id}`),

    // POST 요청
    createUser: (data: Omit<User, 'id'>) =>
        apiClient.post<User>('/users', data),

    // PUT 요청
    updateUser: (id: number, data: Partial<User>) =>
        apiClient.put<User>(`/users/${id}`, data),

    // DELETE 요청
    deleteUser: (id: number) =>
        apiClient.delete(`/users/${id}`),
}

// ============================================
// 2. TanStack Query와 함께 사용 (권장)
// ============================================

// useQuery 예시
export function useUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => apiClient.get<User[]>('/users'),
    })
}

export function useUser(id: number) {
    return useQuery({
        queryKey: ['users', id],
        queryFn: () => apiClient.get<User>(`/users/${id}`),
        enabled: !!id, // id가 있을 때만 실행
    })
}

// useMutation 예시
export function useCreateUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: Omit<User, 'id'>) =>
            apiClient.post<User>('/users', data),
        onSuccess: () => {
            // 성공 시 users 쿼리 무효화
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })
}

export function useUpdateUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<User> }) =>
            apiClient.put<User>(`/users/${id}`, data),
        onSuccess: (_, variables) => {
            // 특정 user 쿼리 무효화
            queryClient.invalidateQueries({ queryKey: ['users', variables.id] })
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })
}

export function useDeleteUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => apiClient.delete(`/users/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })
}

// ============================================
// 3. 컴포넌트에서 사용 예시
// ============================================

/*
'use client'

import { useUsers, useCreateUser } from '@/lib/api-examples'

export function UserList() {
  const { data: users, isLoading, error } = useUsers()
  const createUser = useCreateUser()

  const handleCreate = async () => {
    try {
      await createUser.mutateAsync({
        name: 'John Doe',
        email: 'john@example.com',
      })
      console.log('User created!')
    } catch (error) {
      console.error('Failed to create user:', error)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <button onClick={handleCreate}>Create User</button>
      <ul>
        {users?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
*/

// ============================================
// 4. 페이지네이션 예시
// ============================================

interface PaginationParams {
    page: number
    pageSize: number
}

export function usePaginatedUsers(params: PaginationParams) {
    return useQuery({
        queryKey: ['users', 'paginated', params],
        queryFn: () => apiClient.get('/users', {
            params: {
                page: params.page,
                pageSize: params.pageSize,
            },
        }),
    })
}

// ============================================
// 5. 파일 업로드 예시
// ============================================

export async function uploadFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    return apiClient.instance.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

// ============================================
// 6. 에러 처리 예시
// ============================================

export function useUserWithErrorHandling(id: number) {
    return useQuery({
        queryKey: ['users', id],
        queryFn: () => apiClient.get<User>(`/users/${id}`),
        retry: 2,
        onError: (error: any) => {
            console.error('Failed to fetch user:', error)
            // 토스트 알림 등 추가 가능
        },
    })
}
