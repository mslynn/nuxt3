<template>
  <div class="courseware-player flex h-full bg-slate-900">
    <!-- 左侧缩略图列表 -->
    <div class="w-48 bg-slate-800 border-r border-slate-700 flex flex-col">
      <!-- 课件标题 -->
      <div class="p-3 border-b border-slate-700">
        <h3 class="text-white text-sm font-medium truncate">{{ courseware.title }}</h3>
        <p class="text-slate-400 text-xs mt-1">{{ courseware.subject }}</p>
      </div>

      <!-- 缩略图滚动区域 -->
      <div class="flex-1 overflow-y-auto p-2 space-y-2">
        <div
          v-for="(page, index) in courseware.pages"
          :key="page.id"
          @click="$emit('goToPage', index)"
          class="thumbnail-item cursor-pointer group"
          :class="{ 'ring-2 ring-indigo-500': index === currentIndex }"
        >
          <!-- 页码 -->
          <div class="flex items-start gap-2">
            <span 
              class="text-xs w-5 text-right shrink-0"
              :class="index === currentIndex ? 'text-indigo-400 font-bold' : 'text-slate-500'"
            >
              {{ index + 1 }}
            </span>
            <!-- 缩略图 -->
            <div class="flex-1 relative rounded overflow-hidden bg-slate-700">
              <img 
                :src="page.imageUrl" 
                :alt="page.title || `第 ${index + 1} 页`"
                class="w-full aspect-[4/3] object-cover transition-transform group-hover:scale-105"
              />
              <!-- 选中遮罩 -->
              <div 
                v-if="index === currentIndex"
                class="absolute inset-0 bg-indigo-500/20 border-2 border-indigo-500 rounded"
              ></div>
            </div>
          </div>
          <!-- 页面标题 -->
          <p 
            v-if="page.title"
            class="text-xs mt-1 ml-7 truncate"
            :class="index === currentIndex ? 'text-indigo-300' : 'text-slate-400'"
          >
            {{ page.title }}
          </p>
        </div>
      </div>

      <!-- 页码指示器 -->
      <div class="p-3 border-t border-slate-700 text-center">
        <span class="text-slate-400 text-sm">
          幻灯片 <span class="text-white font-medium">{{ currentIndex + 1 }}</span> / {{ courseware.pages.length }}
        </span>
      </div>
    </div>

    <!-- 右侧主展示区 -->
    <div class="flex-1 flex flex-col">
      <!-- 顶部工具栏 -->
      <div class="h-12 bg-slate-800/50 border-b border-slate-700 flex items-center justify-between px-4">
        <div class="flex items-center gap-2">
          <!-- 返回按钮 -->
          <button 
            @click="$emit('close')"
            class="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            title="返回"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <span class="text-white font-medium">{{ currentPage?.title || `第 ${currentIndex + 1} 页` }}</span>
        </div>

        <div class="flex items-center gap-2">
          <!-- 全屏 -->
          <button 
            @click="toggleFullscreen"
            class="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            title="全屏"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 主内容区 -->
      <div class="flex-1 relative flex items-center justify-center p-4 bg-slate-950">
        <!-- 课件图片 -->
        <div class="relative max-w-full max-h-full">
          <img 
            :src="currentPage?.imageUrl" 
            :alt="currentPage?.title"
            class="max-w-full max-h-[calc(100vh-200px)] object-contain rounded-lg shadow-2xl"
          />
        </div>

        <!-- 左箭头 -->
        <button
          v-if="hasPrev"
          @click="$emit('prevPage')"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- 右箭头 -->
        <button
          v-if="hasNext"
          @click="$emit('nextPage')"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- 底部备注区 -->
      <div v-if="currentPage?.notes" class="h-20 bg-slate-800/50 border-t border-slate-700 p-3 overflow-y-auto">
        <p class="text-slate-300 text-sm">
          <span class="text-slate-500">备注：</span>
          {{ currentPage.notes }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Courseware, CoursewarePage } from '~/composables/useCourseware'

const props = defineProps<{
  courseware: Courseware
  currentIndex: number
  currentPage: CoursewarePage | null
  hasPrev: boolean
  hasNext: boolean
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'prevPage'): void
  (e: 'nextPage'): void
  (e: 'goToPage', index: number): void
}>()

// 全屏切换
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// 键盘快捷键
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      if (props.hasPrev) {
        // 需要通过 emit 触发
      }
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      if (props.hasNext) {
        // 需要通过 emit 触发
      }
    } else if (e.key === 'Escape') {
      // 退出
    }
  }
  
  document.addEventListener('keydown', handleKeydown)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<style scoped>
.thumbnail-item {
  @apply transition-all duration-200;
}

.thumbnail-item:hover {
  @apply transform scale-[1.02];
}
</style>

