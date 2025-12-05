<template>
  <div class="courseware-selector">
    <!-- 打开课件按钮 -->
    <button
      @click="isOpen = true"
      class="flex items-center gap-2 px-4 py-2 bg-[#f5a623] hover:bg-[#e09520] text-white rounded-lg font-medium transition-colors"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
      课件
    </button>

    <!-- 课件选择弹窗 -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          @click.self="isOpen = false"
        >
          <Transition
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 scale-95 translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-200"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="isOpen"
              class="w-full max-w-4xl max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <!-- 标题 -->
              <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 class="text-xl font-bold text-gray-800">选择课件</h2>
                  <p class="text-sm text-gray-400 mt-1">选择要在课堂上展示的课件</p>
                </div>
                <button
                  @click="isOpen = false"
                  class="w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- 课件列表 -->
              <div class="p-6 overflow-y-auto max-h-[calc(85vh-100px)]">
                <div v-if="loading" class="flex items-center justify-center py-16">
                  <div class="w-10 h-10 border-3 border-[#f5a623] border-t-transparent rounded-full animate-spin"></div>
                </div>

                <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-5">
                  <div
                    v-for="courseware in coursewareList"
                    :key="courseware.id"
                    @click="selectCourseware(courseware)"
                    class="group cursor-pointer"
                  >
                    <div class="bg-gray-50 rounded-xl overflow-hidden border-2 border-transparent hover:border-[#f5a623] transition-all duration-200 hover:shadow-lg hover:shadow-orange-100">
                      <!-- 封面 -->
                      <div class="relative aspect-[16/10] overflow-hidden">
                        <img
                          :src="courseware.coverImage"
                          :alt="courseware.title"
                          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <!-- 页数 -->
                        <div class="absolute top-2 right-2 px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded text-xs text-white">
                          {{ courseware.pages.length }} 页
                        </div>
                        <!-- 选择遮罩 -->
                        <div class="absolute inset-0 bg-[#f5a623]/0 group-hover:bg-[#f5a623]/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span class="px-4 py-1.5 bg-[#f5a623] text-white text-sm rounded-full font-medium shadow-lg">
                            选择
                          </span>
                        </div>
                      </div>
                      <!-- 信息 -->
                      <div class="p-4">
                        <div class="flex items-center gap-2 mb-1">
                          <span class="text-xs text-[#f5a623] font-medium">{{ courseware.subject }}</span>
                        </div>
                        <h3 class="text-gray-800 font-medium truncate group-hover:text-[#f5a623] transition-colors">
                          {{ courseware.title }}
                        </h3>
                        <p class="text-xs text-gray-400 mt-1 truncate">{{ courseware.grade }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 空状态 -->
                <div v-if="!loading && coursewareList.length === 0" class="text-center py-16">
                  <div class="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p class="text-gray-400">暂无可用课件</p>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { Courseware } from '~/composables/useCourseware'

const emit = defineEmits<{
  (e: 'select', courseware: Courseware): void
}>()

const { getCoursewareList } = useCourseware()

const isOpen = ref(false)
const loading = ref(true)
const coursewareList = ref<Courseware[]>([])

// 加载课件列表
watch(isOpen, async (open) => {
  if (open && coursewareList.value.length === 0) {
    loading.value = true
    try {
      coursewareList.value = await getCoursewareList()
    } finally {
      loading.value = false
    }
  }
})

// 选择课件
const selectCourseware = (courseware: Courseware) => {
  emit('select', courseware)
  isOpen.value = false
}
</script>

<style scoped>
.border-3 {
  border-width: 3px;
}
</style>
