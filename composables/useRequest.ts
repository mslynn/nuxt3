/**
 * 统一请求封装 - 类似 axios
 * 支持请求拦截、响应拦截、错误处理
 */

import type { UseFetchOptions } from 'nuxt/app'

// 后端响应数据格式
interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  code?: number
}

// 请求配置
interface RequestOptions<T> extends UseFetchOptions<ApiResponse<T>> {
  // 是否显示错误提示
  showError?: boolean
  // 是否显示加载中
  showLoading?: boolean
}

/**
 * 基础请求方法
 */
export const useRequest = <T = any>(
  url: string,
  options: RequestOptions<T> = {}
) => {
  const config = useRuntimeConfig()
  const { showError = true } = options

  // 默认配置
  const defaultOptions: UseFetchOptions<ApiResponse<T>> = {
    // 基础URL（可以在 nuxt.config.ts 中配置）
    baseURL: config.public.apiBase || '',
    
    // 请求拦截器
    onRequest({ options }) {
      // 获取 token
      const token = useCookie('token')
      
      // 设置请求头
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
      }
      
      // 如果有 token，添加到请求头
      if (token.value) {
        (options.headers as Record<string, string>)['Authorization'] = `Bearer ${token.value}`
      }
      
      console.log(`[Request] ${options.method || 'GET'} ${url}`)
    },
    
    // 响应拦截器
    onResponse({ response }) {
      console.log(`[Response] ${url}:`, response._data)
    },
    
    // 错误拦截器
    onResponseError({ response }) {
      const status = response.status
      const message = response._data?.message || '请求失败'
      
      console.error(`[Error] ${url}:`, status, message)
      
      // 统一错误处理
      if (showError) {
        switch (status) {
          case 401:
            // 未授权，跳转登录
            navigateTo('/login')
            break
          case 403:
            alert('没有权限访问')
            break
          case 404:
            alert('请求的资源不存在')
            break
          case 500:
            alert('服务器错误，请稍后重试')
            break
          default:
            alert(message)
        }
      }
    },
  }

  // 合并配置
  return useFetch<ApiResponse<T>>(url, {
    ...defaultOptions,
    ...options,
  } as any)
}

/**
 * GET 请求
 */
export const useGet = <T = any>(
  url: string,
  query?: Record<string, any>,
  options?: RequestOptions<T>
) => {
  return useRequest<T>(url, {
    method: 'GET',
    query,
    ...options,
  })
}

/**
 * POST 请求
 */
export const usePost = <T = any>(
  url: string,
  body?: Record<string, any>,
  options?: RequestOptions<T>
) => {
  return useRequest<T>(url, {
    method: 'POST',
    body,
    ...options,
  })
}

/**
 * PUT 请求
 */
export const usePut = <T = any>(
  url: string,
  body?: Record<string, any>,
  options?: RequestOptions<T>
) => {
  return useRequest<T>(url, {
    method: 'PUT',
    body,
    ...options,
  })
}

/**
 * DELETE 请求
 */
export const useDelete = <T = any>(
  url: string,
  options?: RequestOptions<T>
) => {
  return useRequest<T>(url, {
    method: 'DELETE',
    ...options,
  })
}

// ============================================
// $fetch 版本（用于事件触发的请求，如按钮点击）
// ============================================

/**
 * 基础 $fetch 封装
 */
export const http = {
  async request<T = any>(
    url: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
      body?: Record<string, any>
      query?: Record<string, any>
      showError?: boolean
    } = {}
  ): Promise<ApiResponse<T>> {
    const config = useRuntimeConfig()
    const token = useCookie('token')
    const { showError = true, ...fetchOptions } = options

    try {
      const response = await $fetch<ApiResponse<T>>(url, {
        baseURL: config.public.apiBase || '',
        headers: {
          'Content-Type': 'application/json',
          ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
        },
        ...fetchOptions,
      })
      
      return response
    } catch (error: any) {
      console.error(`[HTTP Error] ${url}:`, error)
      
      if (showError) {
        const message = error.data?.message || error.message || '请求失败'
        alert(message)
      }
      
      throw error
    }
  },

  // GET
  get<T = any>(url: string, query?: Record<string, any>) {
    return this.request<T>(url, { method: 'GET', query })
  },

  // POST
  post<T = any>(url: string, body?: Record<string, any>) {
    return this.request<T>(url, { method: 'POST', body })
  },

  // PUT
  put<T = any>(url: string, body?: Record<string, any>) {
    return this.request<T>(url, { method: 'PUT', body })
  },

  // DELETE
  delete<T = any>(url: string) {
    return this.request<T>(url, { method: 'DELETE' })
  },
}

