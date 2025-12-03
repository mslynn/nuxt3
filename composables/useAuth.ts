/**
 * 登录认证
 * 使用 useHttp 封装
 */

// 登录请求参数
interface LoginParams {
  username: string
  password: string
  grantType: string
}

// 登录响应（根据实际接口调整）
interface LoginResponse {
  token?: string
  access_token?: string
  refresh_token?: string
  expires_in?: number
  user?: any
  [key: string]: any
}

export const useAuth = () => {
  const http = useHttp()
  const user = useState<any>('auth-user', () => null)

  // token 状态（从 localStorage 同步）
  const token = computed(() => http.getToken())
  const isLoggedIn = computed(() => !!http.getToken())

  // 登录
  const login = async (username: string, password: string) => {
    try {
      const response = await http.post<LoginResponse>('/auth/login', {
        username,
        password,
        grantType: 'password'
      })
      
      console.log('✅ 登录成功:', response)
      
      // 保存 token（根据实际返回结构调整）
      const accessToken = response.token || response.access_token
      if (accessToken) {
        http.setToken(accessToken)
      }
      
      // 保存用户信息
      user.value = response.user || response
      
      return response
    } catch (error: any) {
      console.error('❌ 登录失败:', error)
      throw error
    }
  }

  // 登出
  const logout = () => {
    http.removeToken()
    user.value = null
  }

  // 获取当前用户信息
  const getUserInfo = async () => {
    try {
      const response = await http.get('/auth/user')
      user.value = response
      return response
    } catch (error) {
      console.error('获取用户信息失败:', error)
      throw error
    }
  }

  return {
    token,
    user,
    isLoggedIn,
    login,
    logout,
    getUserInfo
  }
}

