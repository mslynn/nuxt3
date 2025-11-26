<template>
  <div class="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-hero-pattern">
      <div class="absolute inset-0 bg-mesh-gradient opacity-60"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-md mx-auto">
        <!-- Logo -->
        <div class="text-center mb-8">
          <NuxtLink to="/" class="inline-flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
              <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <span class="text-2xl font-bold text-white font-display">智启教育</span>
            </div>
          </NuxtLink>
        </div>

        <!-- Login Card -->
        <div class="card p-8">
          <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-white mb-2">欢迎回来</h1>
            <p class="text-dark-400">登录您的账户继续学习之旅</p>
          </div>

          <!-- Social Login -->
          <div class="grid grid-cols-2 gap-4 mb-6">
            <button class="flex items-center justify-center gap-2 py-3 rounded-xl bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white transition-colors">
              <svg class="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348z"/>
              </svg>
              <span class="text-sm">微信登录</span>
            </button>
            <button class="flex items-center justify-center gap-2 py-3 rounded-xl bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white transition-colors">
              <svg class="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.23 5.924c-.807.358-1.676.6-2.585.708a4.52 4.52 0 001.982-2.49 9.018 9.018 0 01-2.858 1.092 4.503 4.503 0 00-7.677 4.108 12.786 12.786 0 01-9.284-4.708 4.502 4.502 0 001.392 6.01 4.48 4.48 0 01-2.04-.563v.057a4.505 4.505 0 003.612 4.416 4.52 4.52 0 01-2.033.077 4.507 4.507 0 004.206 3.127 9.034 9.034 0 01-5.593 1.928c-.364 0-.722-.021-1.076-.063A12.746 12.746 0 006.92 21c8.303 0 12.844-6.879 12.844-12.844 0-.196-.004-.392-.013-.586a9.176 9.176 0 002.252-2.336l.227-.31z"/>
              </svg>
              <span class="text-sm">手机登录</span>
            </button>
          </div>

          <div class="relative mb-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-dark-700"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="px-4 bg-dark-900 text-dark-500 text-sm">或使用邮箱登录</span>
            </div>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="space-y-5">
            <div>
              <label class="block text-dark-300 text-sm font-medium mb-2">邮箱地址</label>
              <input 
                v-model="form.email"
                type="email" 
                placeholder="your@email.com"
                class="input-field"
                required
              >
            </div>

            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="text-dark-300 text-sm font-medium">密码</label>
                <NuxtLink to="/forgot-password" class="text-primary-400 text-sm hover:text-primary-300">
                  忘记密码？
                </NuxtLink>
              </div>
              <div class="relative">
                <input 
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'" 
                  placeholder="输入密码"
                  class="input-field pr-12"
                  required
                >
                <button 
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300"
                >
                  <svg v-if="!showPassword" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <input 
                v-model="form.remember"
                type="checkbox" 
                id="remember"
                class="w-4 h-4 rounded border-dark-600 bg-dark-800 text-primary-500 focus:ring-primary-500/20"
              >
              <label for="remember" class="text-dark-400 text-sm">记住我</label>
            </div>

            <button 
              type="submit" 
              class="w-full btn-primary"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">登录</span>
              <span v-else class="flex items-center gap-2">
                <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                登录中...
              </span>
            </button>
          </form>

          <p class="text-center text-dark-400 text-sm mt-6">
            还没有账户？
            <NuxtLink to="/register" class="text-primary-400 hover:text-primary-300 font-medium">
              立即注册
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

useSeoMeta({
  title: '登录 - 智启教育',
})

const showPassword = ref(false)
const isLoading = ref(false)

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const handleLogin = async () => {
  isLoading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  isLoading.value = false
  // In a real app, handle login logic here
  navigateTo('/')
}
</script>

