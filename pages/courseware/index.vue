<template>
  <div class="min-h-screen bg-[#f7f8fa]">
    <!-- 顶部导航 -->
    <header class="h-16 bg-white border-b border-gray-100 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <div class="flex items-center gap-6">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2">
            <div class="w-10 h-10 bg-gradient-to-br from-[#f5a623] to-[#f7b84e] rounded-xl flex items-center justify-center">
              <span class="text-white font-bold text-lg">M</span>
            </div>
            <span class="text-xl font-bold text-gray-800">课程中心</span>
          </NuxtLink>
        </div>

        <div class="flex items-center gap-4">
          <!-- 搜索框 -->
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索课件..."
              class="w-72 h-10 px-4 pl-10 bg-gray-50 border border-gray-200 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5a623]/30 focus:border-[#f5a623] transition-all"
            />
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <!-- 进入教室 -->
          <NuxtLink
            to="/classroom"
            class="h-10 px-6 bg-[#f5a623] hover:bg-[#e09520] text-white font-medium rounded-full flex items-center gap-2 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            进入教室
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- 课件列表 -->
    <main class="max-w-7xl mx-auto px-6 py-8">
      <!-- 筛选标签 -->
      <div class="flex items-center gap-3 mb-8">
        <button
          @click="selectedCategory = ''"
          :class="[
            'px-5 py-2 rounded-full text-sm font-medium transition-all',
            !selectedCategory
              ? 'bg-[#f5a623] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          ]"
        >
          全部
        </button>
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-5 py-2 rounded-full text-sm font-medium transition-all',
            selectedCategory === category
              ? 'bg-[#f5a623] text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="w-10 h-10 border-3 border-[#f5a623] border-t-transparent rounded-full animate-spin"></div>
      </div>

      <!-- 课件网格 -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="courseware in filteredList"
          :key="courseware.id"
          @click="openCourseware(courseware)"
          class="group cursor-pointer"
        >
          <div class="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#f5a623]/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-100 hover:-translate-y-1">
            <!-- 封面图 -->
            <div class="relative aspect-[16/10] overflow-hidden bg-gray-100">
              <img
                :src="courseware.coverImage"
                :alt="courseware.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <!-- 页数标签 -->
              <div class="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                {{ courseware.pages.length }} 页
              </div>
              <!-- 悬停遮罩 -->
              <div class="absolute inset-0 bg-[#f5a623]/0 group-hover:bg-[#f5a623]/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span class="px-6 py-2 bg-[#f5a623] text-white rounded-full font-medium transform scale-90 group-hover:scale-100 transition-transform shadow-lg">
                  打开课件
                </span>
              </div>
            </div>

            <!-- 信息 -->
            <div class="p-5">
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2 py-0.5 bg-orange-50 text-[#f5a623] text-xs font-medium rounded">
                  {{ courseware.subject }}
                </span>
              </div>
              <h3 class="text-gray-800 font-bold text-lg truncate group-hover:text-[#f5a623] transition-colors">
                {{ courseware.title }}
              </h3>
              <p class="mt-2 text-gray-400 text-sm">
                {{ courseware.grade }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="!loading && filteredList.length === 0" class="text-center py-20">
        <div class="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p class="text-gray-400 text-lg">没有找到相关课件</p>
      </div>
    </main>

    <!-- 课件播放器弹窗 -->
    <Teleport to="body">
      <div
        v-if="currentCourseware"
        class="fixed inset-0 z-50"
      >
        <CoursewareViewer
          :courseware="currentCourseware"
          :current-index="currentPageIndex"
          :show-back="true"
          :breadcrumb="`主干课 > ${currentCourseware.grade}`"
          @back="closeCourseware"
          @page-change="goToPage"
        />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { Courseware } from '~/composables/useCourseware'

// 页面元数据
definePageMeta({
  layout: 'default'
})

const {
  currentCourseware,
  currentPageIndex,
  getCoursewareList,
  openCourseware,
  closeCourseware,
  goToPage
} = useCourseware()

// 状态
const loading = ref(true)
const coursewareList = ref<Courseware[]>([])
const searchQuery = ref('')
const selectedCategory = ref('')

// 分类列表
const categories = computed(() => {
  const grades = coursewareList.value.map(c => c.grade.split('·')[0])
  return [...new Set(grades)]
})

// 过滤后的列表
const filteredList = computed(() => {
  return coursewareList.value.filter(c => {
    const matchSearch = !searchQuery.value || 
      c.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCategory = !selectedCategory.value || c.grade.includes(selectedCategory.value)
    return matchSearch && matchCategory
  })
})

// 加载数据
onMounted(async () => {
  try {
    coursewareList.value = await getCoursewareList()
  } finally {
    loading.value = false
  }
})

// 键盘快捷键
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (!currentCourseware.value) return
    
    if (e.key === 'Escape') {
      closeCourseware()
    }
  }
  
  document.addEventListener('keydown', handleKeydown)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<style scoped>
.border-3 {
  border-width: 3px;
}
</style>
