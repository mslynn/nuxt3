<template>
  <div class="pt-32 pb-16 min-h-screen bg-dark-950">
    <div class="container mx-auto px-4 lg:px-8">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-white mb-4">
          封装后的 API 使用演示
        </h1>
        <p class="text-dark-400">
          像 axios 一样优雅地发请求
        </p>
      </div>

      <!-- 演示区域 -->
      <div class="grid lg:grid-cols-2 gap-8">
        
        <!-- 左侧：SSR 请求示例 -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-white mb-4">
            📡 SSR 请求（页面加载时）
          </h2>
          <p class="text-dark-400 text-sm mb-4">
            使用 <code class="text-primary-400">useApi().course.getList()</code>
          </p>

          <!-- 加载状态 -->
          <div v-if="pending" class="text-center py-8">
            <div class="inline-block w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <p class="text-dark-400 mt-2">加载中...</p>
          </div>

          <!-- 数据展示 -->
          <div v-else class="space-y-3">
            <div 
              v-for="course in courses?.data" 
              :key="course.id"
              class="p-3 rounded-lg bg-dark-800 flex items-center justify-between"
            >
              <div>
                <div class="text-white font-medium">{{ course.title }}</div>
                <div class="text-dark-500 text-xs">{{ course.category }}</div>
              </div>
              <div class="text-primary-400 font-bold">{{ course.priceText }}</div>
            </div>
          </div>

          <!-- 代码示例 -->
          <div class="mt-6 p-4 rounded-lg bg-dark-800">
            <pre class="text-sm text-dark-300 overflow-x-auto"><code>// 在 setup 中使用
const api = useApi()
const { data, pending } = await api.course.getList({
  category: 'ai'
})</code></pre>
          </div>
        </div>

        <!-- 右侧：事件触发请求示例 -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-white mb-4">
            🖱️ 事件触发请求（按钮点击）
          </h2>
          <p class="text-dark-400 text-sm mb-4">
            使用 <code class="text-primary-400">http.post()</code>
          </p>

          <!-- 模拟登录表单 -->
          <form @submit.prevent="handleLogin" class="space-y-4">
            <div>
              <label class="block text-dark-300 text-sm mb-2">邮箱</label>
              <input 
                v-model="loginForm.email"
                type="email"
                class="input-field"
                placeholder="admin@test.com"
              />
            </div>
            <div>
              <label class="block text-dark-300 text-sm mb-2">密码</label>
              <input 
                v-model="loginForm.password"
                type="password"
                class="input-field"
                placeholder="123456"
              />
            </div>
            <button 
              type="submit"
              class="w-full btn-primary"
              :disabled="loginLoading"
            >
              {{ loginLoading ? '登录中...' : '模拟登录' }}
            </button>
          </form>

          <!-- 响应结果 -->
          <div v-if="loginResult" class="mt-4 p-4 rounded-lg bg-dark-800">
            <div class="text-accent-400 text-sm mb-2">✅ 登录成功（模拟）</div>
            <pre class="text-xs text-dark-400 overflow-x-auto">{{ JSON.stringify(loginResult, null, 2) }}</pre>
          </div>

          <!-- 代码示例 -->
          <div class="mt-6 p-4 rounded-lg bg-dark-800">
            <pre class="text-sm text-dark-300 overflow-x-auto"><code>// 在事件处理函数中使用
const handleLogin = async () => {
  const api = useApi()
  const result = await api.user.login({
    email: 'xxx',
    password: 'xxx'
  })
}</code></pre>
          </div>
        </div>
      </div>

      <!-- 封装说明 -->
      <div class="card p-8 mt-8">
        <h2 class="text-2xl font-bold text-white mb-6">📚 封装结构说明</h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <!-- useRequest.ts -->
          <div>
            <h3 class="text-lg font-bold text-primary-400 mb-3">composables/useRequest.ts</h3>
            <ul class="space-y-2 text-dark-400 text-sm">
              <li class="flex items-start gap-2">
                <span class="text-accent-400">•</span>
                <span><code class="text-white">useRequest()</code> - 基础请求封装</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-accent-400">•</span>
                <span><code class="text-white">useGet()</code> - GET 请求（SSR）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-accent-400">•</span>
                <span><code class="text-white">usePost()</code> - POST 请求（SSR）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-accent-400">•</span>
                <span><code class="text-white">http.get()</code> - GET 请求（事件触发）</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-accent-400">•</span>
                <span><code class="text-white">http.post()</code> - POST 请求（事件触发）</span>
              </li>
            </ul>
          </div>

          <!-- useApi.ts -->
          <div>
            <h3 class="text-lg font-bold text-secondary-400 mb-3">composables/useApi.ts</h3>
            <ul class="space-y-2 text-dark-400 text-sm">
              <li class="flex items-start gap-2">
                <span class="text-accent-400">•</span>
                <span><code class="text-white">useApi().course</code> - 课程接口</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-accent-400">•</span>
                <span><code class="text-white">useApi().user</code> - 用户接口</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-accent-400">•</span>
                <span><code class="text-white">useApi().order</code> - 订单接口</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-accent-400">•</span>
                <span><code class="text-white">useApi().common</code> - 通用接口</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 使用对比 -->
        <div class="mt-8 grid md:grid-cols-2 gap-6">
          <div class="p-4 rounded-lg bg-dark-800">
            <div class="text-red-400 text-sm mb-2">❌ 以前的写法</div>
            <pre class="text-xs text-dark-400"><code>const { data } = await useFetch('/api/courses', {
  method: 'GET',
  query: { category: 'ai' },
  headers: { Authorization: `Bearer ${token}` },
  onResponseError({ response }) {
    // 每次都要写错误处理...
  }
})</code></pre>
          </div>
          <div class="p-4 rounded-lg bg-dark-800">
            <div class="text-accent-400 text-sm mb-2">✅ 封装后的写法</div>
            <pre class="text-xs text-dark-400"><code>const api = useApi()

// SSR 请求
const { data } = await api.course.getList({ 
  category: 'ai' 
})

// 事件触发
const result = await api.course.create(formData)</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'API 封装演示 - 智启教育'
})

// ============================================
// SSR 请求示例
// ============================================
const api = useApi()

// 使用封装后的 API 获取课程列表
const { data: courses, pending } = await api.course.getList()

// ============================================
// 事件触发请求示例
// ============================================
const loginForm = reactive({
  email: 'admin@test.com',
  password: '123456'
})
const loginLoading = ref(false)
const loginResult = ref<any>(null)

const handleLogin = async () => {
  loginLoading.value = true
  
  try {
    // 模拟登录请求（实际会调用后端接口）
    // const result = await api.user.login(loginForm)
    
    // 这里模拟一下响应
    await new Promise(resolve => setTimeout(resolve, 1000))
    loginResult.value = {
      success: true,
      data: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 1,
          name: '管理员',
          email: loginForm.email,
          role: 'admin'
        }
      }
    }
  } catch (error) {
    console.error('登录失败:', error)
  } finally {
    loginLoading.value = false
  }
}
</script>

