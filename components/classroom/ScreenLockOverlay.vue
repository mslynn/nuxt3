<template>
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="isLocked"
        class="fixed inset-0 z-[9999] bg-slate-900/98 backdrop-blur-sm flex items-center justify-center"
      >
        <div class="text-center">
          <!-- 锁定动画 -->
          <div class="lock-animation mb-8">
            <div class="w-32 h-32 mx-auto relative">
              <svg class="w-full h-full text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="1.5" 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <div class="absolute inset-0 animate-ping opacity-20">
                <svg class="w-full h-full text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="1.5" 
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h2 class="text-3xl font-bold text-white mb-4">屏幕已锁定</h2>
          <p class="text-slate-400 text-lg mb-2">老师正在授课中，请专心听讲</p>
          <p class="text-slate-500 text-sm">{{ message || '请等待老师解锁屏幕' }}</p>

          <!-- 倒计时显示 -->
          <div v-if="remainingTime" class="mt-8">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full">
              <svg class="w-5 h-5 text-indigo-400 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="text-slate-300">锁定时间: {{ formatTime(remainingTime) }}</span>
            </div>
          </div>

          <!-- 提示信息 -->
          <div class="mt-12 text-slate-600 text-sm">
            <p>💡 提示：认真听课可以获得更好的学习效果哦！</p>
          </div>
        </div>

        <!-- 背景装饰 -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl"></div>
          <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  isLocked: boolean
  message?: string
  remainingTime?: number
}>()

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// 阻止键盘操作
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (props.isLocked) {
      // 阻止大部分快捷键
      if (e.altKey || e.ctrlKey || e.metaKey) {
        e.preventDefault()
      }
      // 阻止 Tab 键
      if (e.key === 'Tab' || e.key === 'Escape') {
        e.preventDefault()
      }
    }
  }

  document.addEventListener('keydown', handleKeydown)

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.lock-animation {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>

