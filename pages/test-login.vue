<template>
  <div class="min-h-screen bg-slate-900 flex items-center justify-center">
    <div class="bg-slate-800 p-8 rounded-xl w-96">
      <h1 class="text-2xl font-bold text-white mb-6">登录测试</h1>
      
      <div class="space-y-4">
        <div>
          <label class="block text-slate-300 text-sm mb-1">用户名</label>
          <input 
            v-model="username" 
            type="text" 
            class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            placeholder="teacher[000001]"
          />
        </div>
        
        <div>
          <label class="block text-slate-300 text-sm mb-1">密码</label>
          <input 
            v-model="password" 
            type="password" 
            class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            placeholder="123456"
          />
        </div>
        
        <button 
          @click="handleLogin"
          :disabled="loading"
          class="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>

        <button 
          v-if="isLoggedIn"
          @click="handleLogout"
          class="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          退出登录
        </button>
      </div>

      <!-- 登录状态 -->
      <div v-if="isLoggedIn" class="mt-4 p-3 bg-green-900/50 rounded-lg">
        <p class="text-green-400 text-sm">✅ 已登录</p>
        <p class="text-slate-400 text-xs mt-1">Token: {{ token?.substring(0, 20) }}...</p>
      </div>
      
      <!-- 结果显示 -->
      <div v-if="result" class="mt-6 p-4 bg-slate-700 rounded-lg">
        <p class="text-green-400 text-sm mb-2">✅ 登录成功!</p>
        <pre class="text-slate-300 text-xs overflow-auto">{{ JSON.stringify(result, null, 2) }}</pre>
      </div>
      
      <div v-if="error" class="mt-6 p-4 bg-red-900/50 rounded-lg">
        <p class="text-red-400 text-sm">❌ 登录失败: {{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

// 使用封装的 auth
const { login, isLoggedIn, token, logout } = useAuth()

const username = ref('teacher[000001]')
const password = ref('123456')
const loading = ref(false)
const result = ref<any>(null)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  result.value = null
  
  try {
    const response = await login(username.value, password.value)
    result.value = response
  } catch (e: any) {
    error.value = e.data?.message || e.message || '请求失败'
  } finally {
    loading.value = false
  }
}

const handleLogout = () => {
  logout()
  result.value = null
}
</script>

