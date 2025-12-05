<template>
  <div class="vertical-reveal-player">
    <!-- 左侧缩略图面板 -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h3 class="course-title">{{ courseware?.title || '课件演示' }}</h3>
      </div>
      <div class="thumbnail-list">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          :class="['thumbnail-item', { active: currentSlide === index }]"
          @click="goToSlide(index)"
        >
          <div class="thumb-number">{{ index + 1 }}</div>
          <div class="thumb-title">{{ slide.title || `第 ${index + 1} 页` }}</div>
        </div>
      </div>
      <div class="sidebar-footer">
        <span class="slide-counter">幻灯片 {{ currentSlide + 1 }}/{{ totalSlides }}</span>
      </div>
    </aside>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 顶部工具栏 -->
      <div class="toolbar">
        <div class="toolbar-left">
          <button class="btn-icon" @click="$emit('close')" title="关闭">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <span class="current-title">{{ currentSlideData?.title || `第 ${currentSlide + 1} 页` }}</span>
        </div>
        <div class="toolbar-right">
          <button class="btn-icon" @click="toggleFullscreen" title="全屏">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Reveal.js 容器 -->
      <div class="reveal-wrapper" ref="revealContainer">
        <div class="reveal" ref="revealEl">
          <div class="slides">
            <section>
              <section 
                v-for="(slide, index) in slides" 
                :key="index"
                :data-background-color="slide.backgroundColor || '#f7f9fb'"
              >
                <template v-if="slide.type === 'title'">
                  <h1>{{ slide.title }}</h1>
                  <p v-if="slide.subtitle">{{ slide.subtitle }}</p>
                </template>
                <template v-else-if="slide.type === 'list'">
                  <h2 v-if="slide.title">{{ slide.title }}</h2>
                  <ul>
                    <li v-for="(item, i) in slide.items" :key="i">{{ item }}</li>
                  </ul>
                </template>
                <template v-else-if="slide.type === 'content'">
                  <h2 v-if="slide.title">{{ slide.title }}</h2>
                  <div v-html="slide.content"></div>
                </template>
                <template v-else>
                  <div v-html="slide.html || slide.content || ''"></div>
                </template>
              </section>
            </section>
          </div>
        </div>
      </div>

      <!-- 导航按钮 -->
      <button class="nav-btn nav-prev" @click="prevSlide" :disabled="currentSlide === 0">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>
      <button class="nav-btn nav-next" @click="nextSlide" :disabled="currentSlide === totalSlides - 1">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

interface Slide {
  type: 'title' | 'content' | 'image' | 'list' | 'code' | 'custom'
  title?: string
  subtitle?: string
  content?: string
  html?: string
  items?: string[]
  backgroundColor?: string
}

interface Courseware {
  id: string
  title: string
  slides: Slide[]
}

const props = defineProps<{
  courseware?: Courseware
  initialSlide?: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'slideChange', index: number): void
}>()

const revealEl = ref<HTMLElement | null>(null)
const revealContainer = ref<HTMLElement | null>(null)
const currentSlide = ref(props.initialSlide || 0)
let revealInstance: any = null

const defaultSlides: Slide[] = [
  { type: 'title', title: '欢迎使用课件系统', subtitle: '基于 Reveal.js', backgroundColor: '#f7f9fb' },
  { type: 'list', title: '功能特点', items: ['垂直滚动导航', '缩略图预览', '全屏模式'], backgroundColor: '#f7f9fb' }
]

const slides = computed(() => props.courseware?.slides || defaultSlides)
const totalSlides = computed(() => slides.value.length)
const currentSlideData = computed(() => slides.value[currentSlide.value])

const initReveal = async () => {
  if (!revealEl.value) {
    console.error('revealEl not found')
    return
  }

  try {
    const Reveal = (await import('reveal.js')).default
    
    revealInstance = new Reveal(revealEl.value, {
      hash: false,
      controls: true,
      progress: true,
      center: true,
      mouseWheel: true,
      transition: 'slide',
      embedded: true,
      width: 1280,
      height: 720,
    })

    await revealInstance.initialize()
    console.log('Reveal initialized!')

    revealInstance.on('slidechanged', (event: any) => {
      currentSlide.value = event.indexv ?? 0
      emit('slideChange', currentSlide.value)
    })
  } catch (err) {
    console.error('Reveal init error:', err)
  }
}

const goToSlide = (index: number) => {
  if (revealInstance) {
    revealInstance.slide(0, index)
  }
}

const nextSlide = () => {
  revealInstance?.next()
}

const prevSlide = () => {
  revealInstance?.prev()
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    revealContainer.value?.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

onMounted(async () => {
  await nextTick()
  setTimeout(initReveal, 100)
})

onBeforeUnmount(() => {
  revealInstance?.destroy()
})
</script>

<style scoped>
.vertical-reveal-player {
  display: flex;
  width: 100%;
  height: 100vh;
  background: #1a1a2e;
}

.sidebar {
  width: 200px;
  display: flex;
  flex-direction: column;
  background: #0f1220;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.course-title {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.thumbnail-list {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}

.thumbnail-item {
  padding: 10px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.thumbnail-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.thumbnail-item.active {
  border-color: #f9a825;
  background: rgba(249, 168, 37, 0.15);
}

.thumb-number {
  font-size: 12px;
  font-weight: 700;
  color: #f9a825;
  margin-bottom: 4px;
}

.thumb-title {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.sidebar-footer {
  padding: 12px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.slide-counter {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #16213e;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.toolbar-left, .toolbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.current-title {
  color: #fff;
  font-size: 14px;
}

.btn-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
}

.btn-icon:hover {
  background: rgba(255, 255, 255, 0.2);
}

.reveal-wrapper {
  flex: 1;
  position: relative;
  background: #f7f9fb;
}

.reveal-wrapper .reveal {
  width: 100%;
  height: 100%;
}

.nav-btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  z-index: 10;
}

.nav-btn:hover:not(:disabled) {
  background: #f9a825;
}

.nav-btn:disabled {
  opacity: 0.3;
}

.nav-prev { top: 70px; }
.nav-next { bottom: 20px; }
</style>
