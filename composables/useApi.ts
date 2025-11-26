/**
 * API 接口统一管理
 * 把所有接口集中在这里，方便管理和维护
 */

// ============================================
// 类型定义
// ============================================

// 课程
export interface Course {
  id: number
  title: string
  description: string
  category: string
  categoryId: string
  level: string
  levelId: string
  lessons: number
  price: number
  priceText: string
  rating: number
  students: number
  instructor: string
  gradient: string
}

// 用户
export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  role: 'student' | 'teacher' | 'admin'
}

// 登录响应
export interface LoginResult {
  token: string
  user: User
}

// ============================================
// API 接口封装
// ============================================

export const useApi = () => {
  
  // ---------- 课程相关 ----------
  const courseApi = {
    // 获取课程列表（SSR 友好）
    getList(params?: { category?: string; search?: string }) {
      return useGet<Course[]>('/api/courses', params)
    },

    // 获取课程详情
    getDetail(id: number) {
      return useGet<Course>(`/api/courses/${id}`)
    },

    // 创建课程（事件触发）
    create(data: Partial<Course>) {
      return http.post<Course>('/api/courses', data)
    },

    // 更新课程
    update(id: number, data: Partial<Course>) {
      return http.put<Course>(`/api/courses/${id}`, data)
    },

    // 删除课程
    delete(id: number) {
      return http.delete(`/api/courses/${id}`)
    },
  }

  // ---------- 用户相关 ----------
  const userApi = {
    // 登录
    login(data: { email: string; password: string }) {
      return http.post<LoginResult>('/api/auth/login', data)
    },

    // 注册
    register(data: { email: string; password: string; name: string }) {
      return http.post<User>('/api/auth/register', data)
    },

    // 获取当前用户信息
    getProfile() {
      return useGet<User>('/api/user/profile')
    },

    // 更新用户信息
    updateProfile(data: Partial<User>) {
      return http.put<User>('/api/user/profile', data)
    },

    // 修改密码
    changePassword(data: { oldPassword: string; newPassword: string }) {
      return http.post('/api/user/change-password', data)
    },

    // 退出登录
    logout() {
      return http.post('/api/auth/logout')
    },
  }

  // ---------- 订单相关 ----------
  const orderApi = {
    // 获取订单列表
    getList(params?: { status?: string; page?: number }) {
      return useGet('/api/orders', params)
    },

    // 创建订单
    create(data: { courseId: number }) {
      return http.post('/api/orders', data)
    },

    // 取消订单
    cancel(id: number) {
      return http.post(`/api/orders/${id}/cancel`)
    },
  }

  // ---------- 通用 ----------
  const commonApi = {
    // 上传文件
    async upload(file: File) {
      const formData = new FormData()
      formData.append('file', file)
      
      return await $fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
    },

    // 获取验证码
    getCaptcha() {
      return http.get('/api/captcha')
    },

    // 发送短信验证码
    sendSmsCode(phone: string) {
      return http.post('/api/sms/send', { phone })
    },
  }

  return {
    course: courseApi,
    user: userApi,
    order: orderApi,
    common: commonApi,
  }
}

