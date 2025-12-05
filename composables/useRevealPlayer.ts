import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick, type Ref, type ComputedRef } from 'vue'

export interface Slide {
  id?: string
  type: 'title' | 'content' | 'image' | 'list' | 'code' | 'custom'
  title?: string
  subtitle?: string
  content?: string
  html?: string
  imageUrl?: string
  thumbnailUrl?: string
  caption?: string
  items?: string[]
  code?: string
  language?: string
  backgroundColor?: string
  backgroundImage?: string
}

export interface Courseware {
  id: string
  title: string
  slides: Slide[]
}

export interface UseRevealPlayerOptions {
  containerRef: Ref<HTMLElement | null>
  slides: Ref<Slide[]>
  initialSlide?: number
  onSlideChange?: (index: number) => void
  syncMode?: boolean
}

export interface UseRevealPlayerReturn {
  currentSlide: Ref<number>
  totalSlides: ComputedRef<number>
  isReady: Ref<boolean>
  error: Ref<string | null>
  goToSlide: (index: number) => void
  nextSlide: () => void
  prevSlide: () => void
  toggleFullscreen: () => void
  toggleOverview: () => void
  destroy: () => void
}

export function useRevealPlayer(options: UseRevealPlayerOptions): UseRevealPlayerReturn {
  const { containerRef, slides, initialSlide = 0, onSlideChange, syncMode = false } = options

  const currentSlide = ref(initialSlide)
  const totalSlides = computed(() => slides.value.length)
  const isReady = ref(false)
  const error = ref<string | null>(null)
  
  let revealInstance: any = null

  // 初始化 Reveal.js - 配置为垂直导航模式
  const initReveal = async () => {
    if (!containerRef.value) {
      error.value = '容器元素未找到'
      return
    }

    try {
      const Reveal = (await import('reveal.js')).default
      
      revealInstance = new Reveal(containerRef.value, {
        // 垂直导航配置
        hash: false,
        history: false,
        controls: true,
        controlsLayout: 'edges',
        controlsTutorial: false,
        progress: true,
        center: true,
        
        // 垂直滚动导航
        navigationMode: 'linear',
        mouseWheel: true, // 启用鼠标滚轮导航
        
        // 过渡效果
        transition: 'slide',
        transitionSpeed: 'default',
        backgroundTransition: 'fade',
        
        // 尺寸配置
        width: 1280,
        height: 720,
        margin: 0.04,
        minScale: 0.2,
        maxScale: 2.0,
        
        // 交互配置
        keyboard: !syncMode, // 同步模式下禁用键盘
        touch: !syncMode,
        embedded: true,
        
        // 禁用水平导航，只使用垂直
        disableLayout: false,
      })

      await revealInstance.initialize()
      isReady.value = true
      error.value = null

      // 监听幻灯片变化
      revealInstance.on('slidechanged', (event: any) => {
        // Reveal.js 垂直幻灯片使用 indexv
        const newIndex = event.indexv !== undefined ? event.indexv : event.indexh
        currentSlide.value = newIndex
        onSlideChange?.(newIndex)
      })

      // 跳转到初始幻灯片
      if (initialSlide > 0) {
        revealInstance.slide(0, initialSlide)
      }
    } catch (err) {
      error.value = `Reveal.js 初始化失败: ${err}`
      console.error('Reveal.js init error:', err)
    }
  }

  // 导航方法
  const goToSlide = (index: number) => {
    if (!revealInstance || index < 0 || index >= totalSlides.value) return
    // 使用垂直导航: slide(h, v)
    revealInstance.slide(0, index)
  }

  const nextSlide = () => {
    if (!revealInstance) return
    if (currentSlide.value < totalSlides.value - 1) {
      revealInstance.next()
    }
  }

  const prevSlide = () => {
    if (!revealInstance) return
    if (currentSlide.value > 0) {
      revealInstance.prev()
    }
  }

  // 全屏切换
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.value?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  // 概览模式
  const toggleOverview = () => {
    if (revealInstance) {
      revealInstance.toggleOverview()
    }
  }

  // 销毁实例
  const destroy = () => {
    if (revealInstance) {
      revealInstance.destroy()
      revealInstance = null
      isReady.value = false
    }
  }

  // 监听 slides 变化，重新初始化
  watch(slides, async () => {
    if (revealInstance) {
      destroy()
    }
    await nextTick()
    await initReveal()
  }, { deep: true })

  onMounted(async () => {
    await nextTick()
    await initReveal()
  })

  onBeforeUnmount(() => {
    destroy()
  })

  return {
    currentSlide,
    totalSlides,
    isReady,
    error,
    goToSlide,
    nextSlide,
    prevSlide,
    toggleFullscreen,
    toggleOverview,
    destroy
  }
}
