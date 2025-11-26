<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="[
      isScrolled 
        ? 'bg-dark-950/90 backdrop-blur-xl shadow-xl shadow-black/10 py-3' 
        : 'bg-transparent py-5'
    ]"
  >
    <div class="container mx-auto px-4 lg:px-8">
      <nav class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow duration-300">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <span class="text-xl font-bold text-white font-display tracking-wide">智启教育</span>
            <span class="block text-xs text-primary-400 -mt-0.5">AI Education Platform</span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-8">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            class="nav-link py-2"
            :class="{ 'nav-link-active': $route.path === item.path }"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <!-- Desktop Actions -->
        <div class="hidden lg:flex items-center gap-4">
          <NuxtLink to="/login" class="text-dark-300 hover:text-white font-medium transition-colors">
            登录
          </NuxtLink>
          <NuxtLink to="/register" class="btn-accent text-sm">
            免费注册
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="lg:hidden w-10 h-10 rounded-xl bg-dark-800/50 flex items-center justify-center text-dark-300 hover:text-white hover:bg-dark-700/50 transition-all"
        >
          <svg v-if="!isMobileMenuOpen" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="isMobileMenuOpen" class="lg:hidden absolute top-full left-0 right-0 bg-dark-900/95 backdrop-blur-xl border-t border-dark-700/50 p-6">
          <div class="flex flex-col gap-4">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.path" 
              :to="item.path"
              class="text-dark-200 hover:text-white py-2 font-medium transition-colors"
              @click="isMobileMenuOpen = false"
            >
              {{ item.name }}
            </NuxtLink>
            <hr class="border-dark-700/50 my-2">
            <div class="flex gap-4">
              <NuxtLink to="/login" class="flex-1 text-center py-3 rounded-xl border border-dark-600 text-dark-200 hover:text-white hover:border-dark-500 transition-all">
                登录
              </NuxtLink>
              <NuxtLink to="/register" class="flex-1 btn-accent text-center text-sm">
                免费注册
              </NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
const navItems = [
  { name: '首页', path: '/' },
  { name: '课程中心', path: '/courses' },
  { name: '解决方案', path: '/solutions' },
  { name: '教师团队', path: '/teachers' },
  { name: '关于我们', path: '/about' },
]

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
  }
  window.addEventListener('scroll', handleScroll)
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})
</script>

