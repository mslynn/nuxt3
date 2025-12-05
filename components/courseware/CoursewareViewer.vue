<template>
  <div class="courseware-viewer h-full flex flex-col bg-[#f7f8fa]">
    <!-- 顶部橙色导航条 -->
    <div class="h-12 bg-gradient-to-r from-[#f5a623] to-[#f7b84e] flex items-center px-4 shrink-0">
      <button
        v-if="showBack"
        @click="$emit('back')"
        class="flex items-center gap-1 text-white hover:opacity-80 transition-opacity"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span>返回</span>
      </button>
      <div class="flex-1 text-center text-white text-sm">
        <span v-if="breadcrumb">{{ breadcrumb }}</span>
      </div>
    </div>

    <!-- 标题栏 -->
    <div class="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
      <div class="flex items-center gap-3">
        <span class="text-[#f5a623] font-medium">{{ courseware.subject || '第1课' }}</span>
        <h1 class="text-gray-800 font-bold text-xl">{{ courseware.title }}</h1>
      </div>

      <!-- 课件/教案 Tab -->
      <div class="flex items-center gap-3">
        <button
          @click="activeTab = 'slides'"
          :class="[
            'px-8 py-2 rounded-full text-sm font-medium transition-all',
            activeTab === 'slides'
              ? 'bg-[#f5a623] text-white shadow-md'
              : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200'
          ]"
        >
          课件
        </button>
        <button
          @click="activeTab = 'notes'"
          :class="[
            'px-8 py-2 rounded-full text-sm font-medium transition-all',
            activeTab === 'notes'
              ? 'bg-[#f5a623] text-white shadow-md'
              : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200'
          ]"
        >
          教案
        </button>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="flex-1 flex overflow-hidden">
      <!-- 左侧缩略图列表 -->
      <div class="w-48 bg-white border-r border-gray-100 flex flex-col">
        <!-- 缩略图滚动区 -->
        <div class="flex-1 overflow-y-auto py-4">
          <div
            v-for="(page, index) in courseware.pages"
            :key="page.id"
            @click="handlePageClick(index)"
            class="px-3 mb-3 cursor-pointer group"
          >
            <div class="flex gap-2">
              <!-- 页码 -->
              <span
                :class="[
                  'w-4 text-sm font-medium text-right shrink-0 pt-2',
                  index === currentIndex ? 'text-[#f5a623]' : 'text-gray-300'
                ]"
              >
                {{ index + 1 }}
              </span>
              <!-- 缩略图卡片 -->
              <div
                :class="[
                  'flex-1 rounded-lg overflow-hidden transition-all duration-200',
                  index === currentIndex
                    ? 'ring-2 ring-[#f5a623] shadow-lg shadow-orange-200/50'
                    : 'ring-1 ring-gray-200 hover:ring-gray-300 hover:shadow-md'
                ]"
              >
                <img
                  :src="page.thumbnail || page.imageUrl"
                  :alt="`第 ${index + 1} 页`"
                  class="w-full aspect-[16/10] object-cover bg-gray-100"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧主展示区 -->
      <div class="flex-1 flex flex-col relative">
        <!-- 课件视图 -->
        <div v-if="activeTab === 'slides'" class="flex-1 flex items-center justify-center p-8 bg-[#f0f1f3]">
          <!-- 课件图片容器 -->
          <div class="relative w-full h-full flex items-center justify-center">
            <div 
              class="relative bg-white rounded-lg shadow-2xl overflow-hidden"
              :style="{ transform: `scale(${zoomLevel})` }"
            >
              <img
                :src="currentPage?.imageUrl"
                :alt="currentPage?.title || `第 ${currentIndex + 1} 页`"
                class="max-w-[900px] max-h-[calc(100vh-280px)] object-contain"
                @load="onImageLoad"
              />
            </div>

            <!-- 翻页按钮 -->
            <button
              v-if="currentIndex > 0 && !readonly"
              @click="prevPage"
              class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-50 text-gray-400 hover:text-gray-600 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              v-if="currentIndex < courseware.pages.length - 1 && !readonly"
              @click="nextPage"
              class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-50 text-gray-400 hover:text-gray-600 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- 右侧工具栏 -->
          <div class="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            <!-- 画笔 -->
            <button
              v-if="!readonly"
              @click="toggleTool('pen')"
              :class="[
                'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
                activeTool === 'pen' ? 'bg-[#f5a623] text-white' : 'bg-white text-gray-400 hover:text-gray-600 shadow-md'
              ]"
              title="画笔"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <!-- 图片/媒体 -->
            <button
              class="w-10 h-10 rounded-lg bg-white text-gray-400 hover:text-gray-600 shadow-md flex items-center justify-center transition-colors"
              title="媒体"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- 教案视图 -->
        <div v-else class="flex-1 overflow-y-auto p-8 bg-white">
          <div class="max-w-3xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">
              {{ currentPage?.title || `第 ${currentIndex + 1} 页教案` }}
            </h2>
            <div v-if="currentPage?.notes" class="prose prose-orange max-w-none">
              <div v-html="formatNotes(currentPage.notes)"></div>
            </div>
            <div v-else class="text-center py-20">
              <svg class="w-20 h-20 mx-auto mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p class="text-gray-400">暂无教案内容</p>
            </div>
          </div>
        </div>

        <!-- 底部控制栏 -->
        <div class="h-14 bg-white border-t border-gray-100 flex items-center justify-between px-6 shrink-0">
          <!-- 左侧：页码 -->
          <div class="flex items-center gap-2">
            <span class="text-gray-400 text-sm">幻灯片</span>
            <span class="font-bold text-gray-800">{{ currentIndex + 1 }}/{{ courseware.pages.length }}</span>
          </div>

          <!-- 右侧：控制按钮 -->
          <div class="flex items-center gap-1">
            <!-- 画笔 -->
            <button
              v-if="!readonly"
              @click="toggleTool('pen')"
              :class="[
                'w-9 h-9 rounded flex items-center justify-center transition-colors',
                activeTool === 'pen' ? 'bg-[#f5a623] text-white' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              ]"
              title="画笔"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.71 4.04c-.18-.18-.43-.29-.71-.29-.28 0-.53.11-.71.29l-1.83 1.83 3.75 3.75 1.83-1.83c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71l-2.33-2.33zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
              </svg>
            </button>

            <!-- 橡皮擦 -->
            <button
              v-if="!readonly"
              @click="toggleTool('eraser')"
              :class="[
                'w-9 h-9 rounded flex items-center justify-center transition-colors',
                activeTool === 'eraser' ? 'bg-[#f5a623] text-white' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              ]"
              title="橡皮擦"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18.37 5.63a2.12 2.12 0 00-3-3L5.63 12.37a2.12 2.12 0 000 3l3 3a2.12 2.12 0 003 0L21.37 8.63M8.63 18.37L5 15"/>
              </svg>
            </button>

            <div class="w-px h-5 bg-gray-200 mx-2"></div>

            <!-- 缩小 -->
            <button
              @click="zoomOut"
              class="w-9 h-9 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors"
              title="缩小"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>

            <span class="text-sm text-gray-500 w-12 text-center">{{ Math.round(zoomLevel * 100) }}%</span>

            <!-- 放大 -->
            <button
              @click="zoomIn"
              class="w-9 h-9 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors"
              title="放大"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>

            <div class="w-px h-5 bg-gray-200 mx-2"></div>

            <!-- 全屏 -->
            <button
              @click="toggleFullscreen"
              class="w-9 h-9 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors"
              title="全屏"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Courseware, CoursewarePage } from '~/composables/useCourseware'

const props = defineProps<{
  courseware: Courseware
  currentIndex: number
  readonly?: boolean
  showBack?: boolean
  breadcrumb?: string
}>()

const emit = defineEmits<{
  (e: 'back'): void
  (e: 'pageChange', index: number): void
}>()

// 状态
const activeTab = ref<'slides' | 'notes'>('slides')
const activeTool = ref<'pen' | 'eraser' | null>(null)
const zoomLevel = ref(1)

// 当前页
const currentPage = computed(() => {
  return props.courseware.pages[props.currentIndex]
})

// 翻页
const handlePageClick = (index: number) => {
  if (props.readonly) return
  emit('pageChange', index)
}

const prevPage = () => {
  if (props.currentIndex > 0) {
    emit('pageChange', props.currentIndex - 1)
  }
}

const nextPage = () => {
  if (props.currentIndex < props.courseware.pages.length - 1) {
    emit('pageChange', props.currentIndex + 1)
  }
}

// 工具切换
const toggleTool = (tool: 'pen' | 'eraser') => {
  activeTool.value = activeTool.value === tool ? null : tool
}

// 缩放
const zoomIn = () => {
  if (zoomLevel.value < 2) {
    zoomLevel.value = Math.min(2, zoomLevel.value + 0.1)
  }
}

const zoomOut = () => {
  if (zoomLevel.value > 0.5) {
    zoomLevel.value = Math.max(0.5, zoomLevel.value - 0.1)
  }
}

// 全屏
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// 格式化教案
const formatNotes = (notes: string) => {
  return notes
    .split('\n')
    .map(line => `<p class="mb-3">${line}</p>`)
    .join('')
}

// 图片加载
const onImageLoad = () => {
  // 图片加载完成
}

// 键盘快捷键
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (props.readonly) return
    
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      prevPage()
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault()
      nextPage()
    }
  }
  
  document.addEventListener('keydown', handleKeydown)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<style scoped>
/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}

/* 图片过渡效果 */
img {
  transition: opacity 0.3s ease;
}
</style>
