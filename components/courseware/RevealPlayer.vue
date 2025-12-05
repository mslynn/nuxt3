<template>
  <div class="reveal-player">
    <div class="reveal-layout">
      <!-- 左侧缩略图，贴近示例图的竖向导航 -->
      <div class="sidebar" v-if="showThumbnails">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          :class="['sidebar-thumb', { active: currentSlide === index }]"
          @click="goToSlide(index)"
        >
          <div class="thumb-number">{{ index + 1 }}</div>
          <div class="thumb-title">{{ slide.title || `第 ${index + 1} 页` }}</div>
        </div>
      </div>

      <div class="main-area">
        <!-- 顶部工具栏 -->
        <div class="toolbar">
          <div class="toolbar-left">
            <button class="btn-icon" @click="$emit('close')" title="关闭">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <span class="course-title">{{ courseware?.title || '课件演示' }}</span>
          </div>
          <div class="toolbar-right">
            <span class="page-info">幻灯片 {{ currentSlide + 1 }} / {{ totalSlides }}</span>
            <button class="btn-icon" @click="toggleOverview" title="概览">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
            </button>
            <button class="btn-icon" @click="toggleFullscreen" title="全屏">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Reveal.js 容器 -->
        <div class="reveal-container" ref="revealContainer">
          <!-- 画布层 - 用于画笔标注 -->
          <canvas 
            v-if="isDrawing" 
            ref="canvasEl" 
            class="draw-canvas"
            @mousedown="startDraw"
            @mousemove="draw"
            @mouseup="endDraw"
            @mouseleave="endDraw"
          ></canvas>
          <div class="reveal" ref="revealEl">
            <div class="slides">
              <!-- 外层section包裹所有垂直幻灯片 -->
              <section>
                <section 
                  v-for="(slide, index) in slides" 
                  :key="index"
                  :data-background-color="slide.backgroundColor || '#f7f9fb'"
                  :data-background-image="slide.backgroundImage"
                >
                <!-- 标题幻灯片 -->
                <template v-if="slide.type === 'title'">
                  <h1 class="slide-title">{{ slide.title }}</h1>
                  <p class="slide-subtitle" v-if="slide.subtitle">{{ slide.subtitle }}</p>
                </template>

                <!-- 内容幻灯片 -->
                <template v-else-if="slide.type === 'content'">
                  <h2 v-if="slide.title">{{ slide.title }}</h2>
                  <div class="content-body" v-html="slide.content"></div>
                </template>

                <!-- 图片幻灯片 -->
                <template v-else-if="slide.type === 'image'">
                  <h2 v-if="slide.title">{{ slide.title }}</h2>
                  <img :src="slide.imageUrl" :alt="slide.title" class="slide-image" />
                  <p v-if="slide.caption" class="image-caption">{{ slide.caption }}</p>
                </template>

                <!-- 列表幻灯片 -->
                <template v-else-if="slide.type === 'list'">
                  <h2 v-if="slide.title">{{ slide.title }}</h2>
                  <ul class="slide-list">
                    <li v-for="(item, i) in slide.items" :key="i" class="fragment fade-up">
                      {{ item }}
                    </li>
                  </ul>
                </template>

                <!-- 代码幻灯片 -->
                <template v-else-if="slide.type === 'code'">
                  <h2 v-if="slide.title">{{ slide.title }}</h2>
                  <pre><code :class="slide.language || 'javascript'">{{ slide.code }}</code></pre>
                </template>

                <!-- 自定义 HTML -->
                <template v-else>
                  <div v-html="slide.html || slide.content"></div>
                </template>
                </section>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 导航按钮（上下方向） -->
    <button class="nav-btn nav-up" @click="prevSlide" :disabled="currentSlide === 0">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
    <button class="nav-btn nav-down" @click="nextSlide" :disabled="currentSlide === totalSlides - 1">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </button>

    <!-- 底部工具栏 -->
    <div class="bottom-toolbar">
      <!-- 画笔工具 -->
      <button 
        :class="['tool-btn', { active: isDrawing }]" 
        @click="toggleDraw" 
        title="画笔"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 19l7-7 3 3-7 7-3-3z"/>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
          <path d="M2 2l7.586 7.586"/>
        </svg>
      </button>

      <!-- 自动播放按钮 -->
      <button 
        :class="['tool-btn', { active: isAutoPlaying }]" 
        @click="toggleAutoPlay" 
        :title="isAutoPlaying ? '停止自动播放' : '自动播放'"
      >
        <svg v-if="!isAutoPlaying" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16"/>
          <rect x="14" y="4" width="4" height="16"/>
        </svg>
      </button>

      <!-- 录制按钮 -->
      <button 
        :class="['tool-btn', { active: isRecording, recording: isRecording }]" 
        @click="toggleRecord" 
        title="录制"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="8"/>
        </svg>
      </button>

      <!-- 批注 -->
      <button class="tool-btn" @click="addNote" title="批注">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>

      <!-- 橡皮擦 -->
      <button 
        :class="['tool-btn', { active: isErasing }]" 
        @click="toggleErase" 
        title="橡皮擦"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 20H7L3 16c-.8-.8-.8-2 0-2.8L13.4 2.8c.8-.8 2-.8 2.8 0L21 7.6c.8.8.8 2 0 2.8L11 20"/>
        </svg>
      </button>

      <div class="toolbar-divider"></div>

      <!-- 缩小 -->
      <button class="tool-btn" @click="zoomOut" title="缩小">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>

      <!-- 缩放比例 -->
      <span class="zoom-level">{{ zoomLevel }}%</span>

      <!-- 放大 -->
      <button class="tool-btn" @click="zoomIn" title="放大">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>

      <!-- 适应屏幕 -->
      <button class="tool-btn" @click="fitToScreen" title="适应屏幕">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
        </svg>
      </button>

      <!-- 更多选项 -->
      <div class="more-options-wrapper">
        <button class="tool-btn" @click="toggleMoreOptions" title="更多">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="19" cy="12" r="1"/>
            <circle cx="5" cy="12" r="1"/>
          </svg>
        </button>
        <!-- 下拉菜单 -->
        <div v-if="showMoreMenu" class="more-menu">
          <div class="menu-item" @click="setAutoPlaySpeed(3000)">
            <span>自动播放速度: 3秒</span>
            <span v-if="autoPlayInterval === 3000" class="check">✓</span>
          </div>
          <div class="menu-item" @click="setAutoPlaySpeed(5000)">
            <span>自动播放速度: 5秒</span>
            <span v-if="autoPlayInterval === 5000" class="check">✓</span>
          </div>
          <div class="menu-item" @click="setAutoPlaySpeed(10000)">
            <span>自动播放速度: 10秒</span>
            <span v-if="autoPlayInterval === 10000" class="check">✓</span>
          </div>
          <div class="menu-divider"></div>
          <div class="menu-item" @click="toggleThumbnails">
            <span>{{ showThumbnails ? '隐藏缩略图' : '显示缩略图' }}</span>
          </div>
          <div class="menu-item" @click="clearCanvas">
            <span>清除画笔</span>
          </div>
          <div class="menu-item" @click="exportPDF">
            <span>导出PDF</span>
          </div>
          <div class="menu-divider"></div>
          <div class="menu-item" @click="showKeyboardShortcuts">
            <span>键盘快捷键</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed, nextTick } from 'vue'

interface Slide {
  type: 'title' | 'content' | 'image' | 'list' | 'code' | 'custom'
  title?: string
  subtitle?: string
  content?: string
  html?: string
  imageUrl?: string
  caption?: string
  items?: string[]
  code?: string
  language?: string
  backgroundColor?: string
  backgroundImage?: string
}

interface Courseware {
  id: string
  title: string
  slides: Slide[]
}

const props = defineProps<{
  courseware?: Courseware
  initialSlide?: number
  syncMode?: boolean // 是否启用同步模式（老师控制）
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'slideChange', index: number): void
}>()

const revealEl = ref<HTMLElement | null>(null)
const revealContainer = ref<HTMLElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)
const currentSlide = ref(props.initialSlide || 0)
const totalSlides = computed(() => slides.value.length)
const showThumbnails = ref(true)
let revealInstance: any = null

// 工具栏状态
const isDrawing = ref(false)
const isErasing = ref(false)
const isRecording = ref(false)
const isAutoPlaying = ref(false)
const autoPlayInterval = ref(5000) // 默认5秒切换
const showMoreMenu = ref(false)
const zoomLevel = ref(100)
let ctx: CanvasRenderingContext2D | null = null
let drawing = false
let autoPlayTimer: ReturnType<typeof setInterval> | null = null

// 默认演示数据
const defaultSlides: Slide[] = [
  {
    type: 'title',
    title: '欢迎使用课件系统',
    subtitle: '基于 Reveal.js 的在线演示',
    backgroundColor: '#1a1a2e'
  },
  {
    type: 'list',
    title: '系统特点',
    items: [
      '🚀 纯前端，无需后端服务',
      '📡 支持局域网离线使用',
      '🎨 丰富的动画效果',
      '📱 响应式设计，支持多终端',
      '🔄 教师学生实时同步'
    ],
    backgroundColor: '#16213e'
  },
  {
    type: 'content',
    title: '功能演示',
    content: `
      <p>支持多种内容类型：</p>
      <ul>
        <li>文本内容</li>
        <li>图片展示</li>
        <li>代码高亮</li>
        <li>列表动画</li>
      </ul>
    `,
    backgroundColor: '#0f3460'
  },
  {
    type: 'image',
    title: '图片展示',
    imageUrl: 'https://picsum.photos/800/400',
    caption: '支持高清图片展示',
    backgroundColor: '#1a1a2e'
  },
  {
    type: 'code',
    title: '代码展示',
    language: 'javascript',
    code: `// 初始化 Reveal.js
import Reveal from 'reveal.js'

Reveal.initialize({
  hash: true,
  transition: 'slide'
})`,
    backgroundColor: '#1a1a2e'
  },
  {
    type: 'title',
    title: '谢谢观看！',
    subtitle: '开始创建您的课件吧',
    backgroundColor: '#e94560'
  }
]

const slides = computed(() => {
  return props.courseware?.slides || defaultSlides
})

// 初始化 Reveal.js
const initReveal = async () => {
  if (!revealEl.value) return

  // 动态导入 Reveal.js
  const Reveal = (await import('reveal.js')).default
  
  revealInstance = new Reveal(revealEl.value, {
    hash: false,
    history: false,
    controls: true,
    controlsLayout: 'edges',
    progress: true,
    center: true,
    transition: 'slide',
    backgroundTransition: 'fade',
    width: 1280,
    height: 720,
    margin: 0.04,
    minScale: 0.2,
    maxScale: 2.0,
    keyboard: !props.syncMode,
    touch: !props.syncMode,
    embedded: true,
    mouseWheel: true // 启用鼠标滚轮导航
  })

  await revealInstance.initialize()

  // 监听幻灯片变化（使用垂直索引indexv）
  revealInstance.on('slidechanged', (event: any) => {
    currentSlide.value = event.indexv ?? 0
    emit('slideChange', currentSlide.value)
  })

  // 如果有初始幻灯片，跳转到指定位置（垂直导航）
  if (props.initialSlide && props.initialSlide > 0) {
    revealInstance.slide(0, props.initialSlide)
  }
}

// 导航方法
const prevSlide = () => {
  if (revealInstance) {
    revealInstance.prev()
  }
}

const nextSlide = () => {
  if (revealInstance) {
    revealInstance.next()
  }
}

const goToSlide = (index: number) => {
  if (revealInstance) {
    // 垂直导航：slide(h, v) - h=0表示第一列，v=index表示垂直位置
    revealInstance.slide(0, index)
  }
}

// 切换概览模式
const toggleOverview = () => {
  if (revealInstance) {
    revealInstance.toggleOverview()
  }
}

// 全屏
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    revealContainer.value?.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// 外部同步控制（供父组件调用）
const syncToSlide = (index: number) => {
  if (revealInstance && index !== currentSlide.value) {
    revealInstance.slide(0, index)
  }
}

// 监听 courseware 变化，重新初始化
watch(() => props.courseware, async () => {
  if (revealInstance) {
    revealInstance.destroy()
  }
  await nextTick()
  await initReveal()
}, { deep: true })

// 监听外部同步指令
watch(() => props.initialSlide, (newIndex) => {
  if (props.syncMode && newIndex !== undefined) {
    syncToSlide(newIndex)
  }
})

onMounted(async () => {
  await nextTick()
  await initReveal()
})

onBeforeUnmount(() => {
  stopAutoPlay()
  if (revealInstance) {
    revealInstance.destroy()
  }
})

// 画笔功能
const toggleDraw = () => {
  isDrawing.value = !isDrawing.value
  isErasing.value = false
  if (isDrawing.value) {
    nextTick(() => initCanvas())
  }
}

const toggleErase = () => {
  isErasing.value = !isErasing.value
  isDrawing.value = false
}

const initCanvas = () => {
  if (!canvasEl.value || !revealContainer.value) return
  const rect = revealContainer.value.getBoundingClientRect()
  canvasEl.value.width = rect.width
  canvasEl.value.height = rect.height
  ctx = canvasEl.value.getContext('2d')
  if (ctx) {
    ctx.strokeStyle = '#e94560'
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
  }
}

const startDraw = (e: MouseEvent) => {
  if (!ctx) return
  drawing = true
  ctx.beginPath()
  ctx.moveTo(e.offsetX, e.offsetY)
}

const draw = (e: MouseEvent) => {
  if (!drawing || !ctx) return
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.stroke()
}

const endDraw = () => {
  drawing = false
}

const clearCanvas = () => {
  if (!ctx || !canvasEl.value) return
  ctx.clearRect(0, 0, canvasEl.value.width, canvasEl.value.height)
}

// 自动播放功能
const toggleAutoPlay = () => {
  isAutoPlaying.value = !isAutoPlaying.value
  if (isAutoPlaying.value) {
    startAutoPlay()
  } else {
    stopAutoPlay()
  }
}

const startAutoPlay = () => {
  stopAutoPlay() // 先清除之前的定时器
  autoPlayTimer = setInterval(() => {
    if (currentSlide.value < totalSlides.value - 1) {
      nextSlide()
    } else {
      // 播放到最后一页，回到第一页继续
      goToSlide(0)
    }
  }, autoPlayInterval.value)
}

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

// 录制功能
const toggleRecord = () => {
  isRecording.value = !isRecording.value
  if (isRecording.value) {
    console.log('开始录制...')
  } else {
    console.log('停止录制')
  }
}

// 批注功能
const addNote = () => {
  console.log('添加批注')
}

// 缩放功能
const zoomIn = () => {
  if (zoomLevel.value < 200) {
    zoomLevel.value += 10
    applyZoom()
  }
}

const zoomOut = () => {
  if (zoomLevel.value > 50) {
    zoomLevel.value -= 10
    applyZoom()
  }
}

const fitToScreen = () => {
  zoomLevel.value = 100
  applyZoom()
}

const applyZoom = () => {
  if (revealContainer.value) {
    const scale = zoomLevel.value / 100
    const slides = revealContainer.value.querySelector('.slides') as HTMLElement
    if (slides) {
      slides.style.transform = `scale(${scale})`
    }
  }
}

const toggleMoreOptions = () => {
  showMoreMenu.value = !showMoreMenu.value
}

const setAutoPlaySpeed = (speed: number) => {
  autoPlayInterval.value = speed
  if (isAutoPlaying.value) {
    startAutoPlay() // 重新启动以应用新速度
  }
  showMoreMenu.value = false
}

const toggleThumbnails = () => {
  showThumbnails.value = !showThumbnails.value
  showMoreMenu.value = false
}

const exportPDF = () => {
  console.log('导出PDF功能')
  showMoreMenu.value = false
  alert('PDF导出功能开发中...')
}

const showKeyboardShortcuts = () => {
  showMoreMenu.value = false
  alert('快捷键:\n↑/↓ - 上下翻页\n空格 - 下一页\nF - 全屏\nO - 概览模式\nEsc - 退出')
}

// 暴露方法供父组件调用
defineExpose({
  prevSlide,
  nextSlide,
  goToSlide,
  syncToSlide,
  getCurrentSlide: () => currentSlide.value,
  clearCanvas
})
</script>

<style>
/* 引入 Reveal.js 样式 */
@import 'reveal.js/dist/reveal.css';
@import 'reveal.js/dist/theme/black.css';
</style>

<style scoped>
.reveal-player {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  background: #0d0d1a;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.reveal-layout {
  flex: 1;
  display: grid;
  grid-template-columns: 220px 1fr;
  height: 100%;
}

.sidebar {
  background: #0f1220;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  padding: 16px 10px;
  overflow-y: auto;
}

.sidebar-thumb {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.sidebar-thumb:hover {
  border-color: rgba(255, 255, 255, 0.18);
  transform: translateY(-2px);
}

.sidebar-thumb.active {
  border-color: #f0b62b;
  background: rgba(240, 182, 43, 0.12);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.3);
}

.thumb-number {
  font-size: 13px;
  font-weight: 700;
  color: #f0b62b;
}

.thumb-title {
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  margin-top: 6px;
  line-height: 1.4;
}

.main-area {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 顶部工具栏 */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 100;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toolbar-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.course-title {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}

.page-info {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  background: rgba(255, 255, 255, 0.1);
  padding: 6px 16px;
  border-radius: 20px;
}

.btn-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

/* Reveal 容器 */
.reveal-container {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.reveal-container :deep(.reveal) {
  width: 100%;
  height: 100%;
}

.reveal-container :deep(.slides) {
  text-align: left;
}

.reveal-container :deep(.slides section) {
  padding: 40px 60px;
}

/* 幻灯片样式 */
.reveal-container :deep(.slide-title) {
  font-size: 3em;
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.reveal-container :deep(.slide-subtitle) {
  font-size: 1.5em;
  color: rgba(255, 255, 255, 0.8);
}

.reveal-container :deep(h2) {
  font-size: 2em;
  color: #e94560;
  margin-bottom: 30px;
}

.reveal-container :deep(.slide-list) {
  list-style: none;
  padding: 0;
}

.reveal-container :deep(.slide-list li) {
  font-size: 1.3em;
  margin: 20px 0;
  padding-left: 30px;
  position: relative;
}

.reveal-container :deep(.slide-list li::before) {
  content: '▸';
  position: absolute;
  left: 0;
  color: #e94560;
}

.reveal-container :deep(.slide-image) {
  max-width: 80%;
  max-height: 60vh;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.reveal-container :deep(.image-caption) {
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 15px;
}

.reveal-container :deep(pre) {
  width: 100%;
  font-size: 0.8em;
}

.reveal-container :deep(code) {
  padding: 20px;
  border-radius: 8px;
  background: #0d0d1a !important;
}

/* 缩略图栏 */
.thumbnail-bar {
  display: flex;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.5);
  overflow-x: auto;
  z-index: 100;
}

.thumbnail-bar::-webkit-scrollbar {
  height: 4px;
}

.thumbnail-bar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.thumbnail {
  flex-shrink: 0;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.thumbnail:hover {
  background: rgba(255, 255, 255, 0.15);
}

.thumbnail.active {
  background: rgba(233, 69, 96, 0.3);
  border-color: #e94560;
}

.thumbnail-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.thumbnail-number {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  font-size: 12px;
  color: #fff;
}

.thumbnail.active .thumbnail-number {
  background: #e94560;
}

.thumbnail-title {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  white-space: nowrap;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 导航按钮（上下方向） */
.nav-btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 50;
  border-radius: 8px;
}

.nav-btn:hover:not(:disabled) {
  background: rgba(240, 182, 43, 0.8);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-up {
  top: 70px;
}

.nav-down {
  bottom: 60px;
}

/* 画布层 */
.draw-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  cursor: crosshair;
}

/* 底部工具栏 */
.bottom-toolbar {
  position: absolute;
  bottom: 12px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  z-index: 200;
}

.tool-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.tool-btn:hover {
  background: rgba(0, 0, 0, 0.08);
  color: #333;
}

.tool-btn.active {
  background: #e3f2fd;
  color: #1976d2;
}

.tool-btn.recording {
  color: #f44336;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.toolbar-divider {
  width: 1px;
  height: 20px;
  background: #ddd;
  margin: 0 4px;
}

.zoom-level {
  font-size: 12px;
  color: #666;
  min-width: 40px;
  text-align: center;
}
</style>

