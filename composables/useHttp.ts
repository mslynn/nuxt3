/**
 * HTTP 请求封装
 * 基于 Nuxt3 的 $fetch
 */

// 基础配置
const BASE_URL = 'http://192.168.0.34:8080'

// 请求配置类型
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: any
  params?: Record<string, any>
  headers?: Record<string, string>
}

// 响应类型
interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

export const useHttp = () => {
  // 获取 token
  const getToken = () => {
    if (process.client) {
      return localStorage.getItem('token')
    }
    return null
  }

  // 设置 token
  const setToken = (token: string) => {
    if (process.client) {
      localStorage.setItem('token', token)
    }
  }

  // 清除 token
  const removeToken = () => {
    if (process.client) {
      localStorage.removeItem('token')
    }
  }

  // 通用请求方法
  const request = async <T = any>(
    url: string,
    options: RequestOptions = {}
  ): Promise<T> => {
    const { method = 'GET', body, params, headers = {} } = options

    // 添加 token 到请求头
    const token = getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    try {
      const response = await $fetch<T>(url, {
        baseURL: BASE_URL,
        method,
        body,
        params,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        // 请求拦截
        onRequest({ options }) {
          console.log('📤 请求:', method, url, body || params || '')
        },
        // 响应拦截
        onResponse({ response }) {
          console.log('📥 响应:', response._data)
        },
        // 错误处理
        onResponseError({ response }) {
          console.error('❌ 请求错误:', response.status, response._data)
          
          // 401 未授权，清除 token
          if (response.status === 401) {
            removeToken()
            // 可以在这里跳转到登录页
            // navigateTo('/login')
          }
        }
      })

      return response
    } catch (error: any) {
      console.error('❌ 请求失败:', error)
      throw error
    }
  }

  // GET 请求
  const get = <T = any>(url: string, params?: Record<string, any>) => {
    return request<T>(url, { method: 'GET', params })
  }

  // POST 请求
  const post = <T = any>(url: string, body?: any) => {
    return request<T>(url, { method: 'POST', body })
  }

  // PUT 请求
  const put = <T = any>(url: string, body?: any) => {
    return request<T>(url, { method: 'PUT', body })
  }

  // DELETE 请求
  const del = <T = any>(url: string, params?: Record<string, any>) => {
    return request<T>(url, { method: 'DELETE', params })
  }

  // PATCH 请求
  const patch = <T = any>(url: string, body?: any) => {
    return request<T>(url, { method: 'PATCH', body })
  }

  return {
    request,
    get,
    post,
    put,
    del,
    patch,
    getToken,
    setToken,
    removeToken
  }
}

