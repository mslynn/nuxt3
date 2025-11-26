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

        <!-- Register Card -->
        <div class="card p-8">
          <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-white mb-2">创建账户</h1>
            <p class="text-dark-400">开启你的AI学习之旅</p>
          </div>

          <!-- Registration Steps -->
          <div class="flex items-center justify-center gap-4 mb-8">
            <div 
              v-for="(s, i) in steps" 
              :key="i"
              class="flex items-center gap-2"
            >
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all"
                :class="step > i 
                  ? 'bg-accent-500 text-white' 
                  : step === i 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-dark-700 text-dark-400'"
              >
                <svg v-if="step > i" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span v-else>{{ i + 1 }}</span>
              </div>
              <span 
                class="text-sm hidden sm:block"
                :class="step >= i ? 'text-white' : 'text-dark-500'"
              >
                {{ s }}
              </span>
              <svg 
                v-if="i < steps.length - 1" 
                class="w-4 h-4 text-dark-600 ml-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <!-- Step 1: Basic Info -->
          <form v-if="step === 0" @submit.prevent="nextStep" class="space-y-5">
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
              <label class="block text-dark-300 text-sm font-medium mb-2">设置密码</label>
              <div class="relative">
                <input 
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'" 
                  placeholder="至少8个字符"
                  class="input-field pr-12"
                  required
                  minlength="8"
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
              <!-- Password Strength -->
              <div class="mt-2 flex gap-1">
                <div 
                  v-for="i in 4" 
                  :key="i"
                  class="h-1 flex-1 rounded-full transition-colors"
                  :class="passwordStrength >= i ? strengthColors[passwordStrength - 1] : 'bg-dark-700'"
                ></div>
              </div>
              <p class="text-xs text-dark-500 mt-1">{{ strengthLabels[passwordStrength] }}</p>
            </div>

            <div>
              <label class="block text-dark-300 text-sm font-medium mb-2">确认密码</label>
              <input 
                v-model="form.confirmPassword"
                type="password" 
                placeholder="再次输入密码"
                class="input-field"
                required
              >
            </div>

            <button type="submit" class="w-full btn-primary">
              下一步
            </button>
          </form>

          <!-- Step 2: Profile Info -->
          <form v-if="step === 1" @submit.prevent="nextStep" class="space-y-5">
            <div>
              <label class="block text-dark-300 text-sm font-medium mb-2">姓名</label>
              <input 
                v-model="form.name"
                type="text" 
                placeholder="您的姓名"
                class="input-field"
                required
              >
            </div>

            <div>
              <label class="block text-dark-300 text-sm font-medium mb-2">我是</label>
              <div class="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  @click="form.role = 'student'"
                  class="p-4 rounded-xl border transition-all text-center"
                  :class="form.role === 'student' 
                    ? 'border-primary-500 bg-primary-500/10 text-primary-400' 
                    : 'border-dark-700 bg-dark-800 text-dark-300 hover:border-dark-600'"
                >
                  <svg class="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span class="font-medium">学生</span>
                </button>
                <button 
                  type="button"
                  @click="form.role = 'parent'"
                  class="p-4 rounded-xl border transition-all text-center"
                  :class="form.role === 'parent' 
                    ? 'border-primary-500 bg-primary-500/10 text-primary-400' 
                    : 'border-dark-700 bg-dark-800 text-dark-300 hover:border-dark-600'"
                >
                  <svg class="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span class="font-medium">家长</span>
                </button>
              </div>
            </div>

            <div v-if="form.role === 'student'">
              <label class="block text-dark-300 text-sm font-medium mb-2">年龄</label>
              <select v-model="form.age" class="input-field" required>
                <option value="" disabled>选择年龄</option>
                <option v-for="age in ages" :key="age" :value="age">{{ age }}岁</option>
              </select>
            </div>

            <div class="flex gap-4">
              <button 
                type="button" 
                @click="step--"
                class="flex-1 py-3 rounded-full border border-dark-600 text-dark-300 hover:bg-dark-800 transition-colors"
              >
                上一步
              </button>
              <button type="submit" class="flex-1 btn-primary">
                下一步
              </button>
            </div>
          </form>

          <!-- Step 3: Complete -->
          <div v-if="step === 2" class="text-center">
            <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-accent-500/20 flex items-center justify-center">
              <svg class="w-10 h-10 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-white mb-2">注册成功！</h2>
            <p class="text-dark-400 mb-8">
              欢迎加入智启教育，开始你的AI学习之旅吧！
            </p>
            <NuxtLink to="/" class="btn-primary inline-flex">
              开始探索
            </NuxtLink>
          </div>

          <!-- Terms -->
          <p v-if="step < 2" class="text-center text-dark-500 text-xs mt-6">
            注册即表示您同意我们的
            <NuxtLink to="/terms" class="text-primary-400 hover:text-primary-300">服务条款</NuxtLink>
            和
            <NuxtLink to="/privacy" class="text-primary-400 hover:text-primary-300">隐私政策</NuxtLink>
          </p>

          <p v-if="step < 2" class="text-center text-dark-400 text-sm mt-4">
            已有账户？
            <NuxtLink to="/login" class="text-primary-400 hover:text-primary-300 font-medium">
              立即登录
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
  title: '注册 - 智启教育',
})

const step = ref(0)
const steps = ['基本信息', '个人资料', '完成']
const showPassword = ref(false)

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  role: 'student',
  age: '',
})

const ages = Array.from({ length: 13 }, (_, i) => i + 6) // 6-18岁

const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-accent-500']
const strengthLabels = ['', '弱', '一般', '良好', '强']

const passwordStrength = computed(() => {
  const pwd = form.password
  if (!pwd) return 0
  let strength = 0
  if (pwd.length >= 8) strength++
  if (/[A-Z]/.test(pwd)) strength++
  if (/[0-9]/.test(pwd)) strength++
  if (/[^A-Za-z0-9]/.test(pwd)) strength++
  return strength
})

const nextStep = () => {
  if (step.value === 0) {
    if (form.password !== form.confirmPassword) {
      alert('两次输入的密码不一致')
      return
    }
    if (passwordStrength.value < 2) {
      alert('密码强度不够，请设置更复杂的密码')
      return
    }
  }
  step.value++
}
</script>

