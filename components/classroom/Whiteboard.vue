<template>
  <div class="whiteboard-container relative bg-slate-900 rounded-xl overflow-hidden">
    <!-- 工具栏 -->
    <div class="toolbar absolute top-4 left-4 z-10 flex gap-2 bg-slate-800/90 backdrop-blur-sm rounded-lg p-2">
      <!-- 画笔 -->
      <button
        @click="setTool('pen')"
        :class="[
          'tool-btn',
          currentTool === 'pen' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        ]"
        title="画笔"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
      
      <!-- 橡皮擦 -->
      <button
        @click="setTool('eraser')"
        :class="[
          'tool-btn',
          currentTool === 'eraser' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        ]"
        title="橡皮擦"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

      <!-- 矩形 -->
      <button
        @click="setTool('rect')"
        :class="[
          'tool-btn',
          currentTool === 'rect' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        ]"
        title="矩形"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2" />
        </svg>
      </button>

      <!-- 圆形 -->
      <button
        @click="setTool('circle')"
        :class="[
          'tool-btn',
          currentTool === 'circle' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        ]"
        title="圆形"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" stroke-width="2" />
        </svg>
      </button>

      <!-- 直线 -->
      <button
        @click="setTool('line')"
        :class="[
          'tool-btn',
          currentTool === 'line' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        ]"
        title="直线"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <line x1="5" y1="19" x2="19" y2="5" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>

      <!-- 文字 -->
      <button
        @click="setTool('text')"
        :class="[
          'tool-btn',
          currentTool === 'text' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        ]"
        title="文字"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>

      <div class="w-px bg-slate-600 mx-1"></div>

      <!-- 颜色选择 -->
      <div class="flex gap-1">
        <button
          v-for="color in colors"
          :key="color"
          @click="currentColor = color"
          :class="[
            'w-6 h-6 rounded-full border-2 transition-transform',
            currentColor === color ? 'border-white scale-110' : 'border-transparent hover:scale-105'
          ]"
          :style="{ backgroundColor: color }"
        ></button>
      </div>

      <div class="w-px bg-slate-600 mx-1"></div>

      <!-- 画笔大小 -->
      <div class="flex items-center gap-2">
        <input
          type="range"
          v-model="strokeWidth"
          min="1"
          max="20"
          class="w-20 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer"
        />
        <span class="text-slate-300 text-xs w-6">{{ strokeWidth }}</span>
      </div>

      <div class="w-px bg-slate-600 mx-1"></div>

      <!-- 撤销 -->
      <button
        @click="undo"
        class="tool-btn bg-slate-700 text-slate-300 hover:bg-slate-600"
        title="撤销"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
      </button>

      <!-- 清空 -->
      <button
        @click="clearCanvas"
        class="tool-btn bg-red-600/80 text-white hover:bg-red-600"
        title="清空"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- 画布 -->
    <canvas
      ref="canvasRef"
      :width="canvasWidth"
      :height="canvasHeight"
      class="cursor-crosshair"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
      @touchstart.prevent="handleTouchStart"
      @touchmove.prevent="handleTouchMove"
      @touchend.prevent="stopDrawing"
    ></canvas>

    <!-- 文字输入框 -->
    <div
      v-if="showTextInput"
      class="absolute z-20"
      :style="{ left: textInputPos.x + 'px', top: textInputPos.y + 'px' }"
    >
      <input
        ref="textInputRef"
        v-model="textContent"
        @keyup.enter="confirmText"
        @blur="confirmText"
        class="bg-transparent border-2 border-indigo-500 text-white px-2 py-1 outline-none min-w-[100px]"
        :style="{ color: currentColor, fontSize: strokeWidth * 2 + 'px' }"
        placeholder="输入文字..."
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface DrawAction {
  type: 'pen' | 'eraser' | 'rect' | 'circle' | 'line' | 'text'
  color: string
  strokeWidth: number
  points?: { x: number; y: number }[]
  startX?: number
  startY?: number
  endX?: number
  endY?: number
  text?: string
}

const props = defineProps<{
  canvasWidth?: number
  canvasHeight?: number
  readonly?: boolean
}>()

const emit = defineEmits<{
  (e: 'draw', data: DrawAction): void
  (e: 'clear'): void
}>()

const canvasWidth = computed(() => props.canvasWidth || 1200)
const canvasHeight = computed(() => props.canvasHeight || 700)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const textInputRef = ref<HTMLInputElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)

const currentTool = ref<'pen' | 'eraser' | 'rect' | 'circle' | 'line' | 'text'>('pen')
const currentColor = ref('#ffffff')
const strokeWidth = ref(3)
const colors = ['#ffffff', '#ef4444', '#22c55e', '#3b82f6', '#eab308', '#a855f7', '#ec4899']

const isDrawing = ref(false)
const startX = ref(0)
const startY = ref(0)
const currentPath = ref<{ x: number; y: number }[]>([])
const history = ref<ImageData[]>([])

const showTextInput = ref(false)
const textInputPos = ref({ x: 0, y: 0 })
const textContent = ref('')

onMounted(() => {
  if (canvasRef.value) {
    ctx.value = canvasRef.value.getContext('2d')
    if (ctx.value) {
      // 设置默认背景
      ctx.value.fillStyle = '#1e293b'
      ctx.value.fillRect(0, 0, canvasWidth.value, canvasHeight.value)
      saveHistory()
    }
  }
})

const setTool = (tool: typeof currentTool.value) => {
  currentTool.value = tool
  showTextInput.value = false
}

const getCanvasPoint = (e: MouseEvent | Touch) => {
  if (!canvasRef.value) return { x: 0, y: 0 }
  const rect = canvasRef.value.getBoundingClientRect()
  const scaleX = canvasWidth.value / rect.width
  const scaleY = canvasHeight.value / rect.height
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY
  }
}

const startDrawing = (e: MouseEvent) => {
  if (props.readonly) return
  
  const { x, y } = getCanvasPoint(e)
  
  if (currentTool.value === 'text') {
    textInputPos.value = { x: e.offsetX, y: e.offsetY }
    showTextInput.value = true
    nextTick(() => textInputRef.value?.focus())
    return
  }

  isDrawing.value = true
  startX.value = x
  startY.value = y
  currentPath.value = [{ x, y }]

  if (currentTool.value === 'pen' || currentTool.value === 'eraser') {
    ctx.value!.beginPath()
    ctx.value!.moveTo(x, y)
  }
}

const draw = (e: MouseEvent) => {
  if (!isDrawing.value || props.readonly || !ctx.value) return

  const { x, y } = getCanvasPoint(e)

  if (currentTool.value === 'pen') {
    ctx.value.strokeStyle = currentColor.value
    ctx.value.lineWidth = strokeWidth.value
    ctx.value.lineCap = 'round'
    ctx.value.lineJoin = 'round'
    ctx.value.lineTo(x, y)
    ctx.value.stroke()
    currentPath.value.push({ x, y })
  } else if (currentTool.value === 'eraser') {
    ctx.value.strokeStyle = '#1e293b'
    ctx.value.lineWidth = strokeWidth.value * 3
    ctx.value.lineCap = 'round'
    ctx.value.lineJoin = 'round'
    ctx.value.lineTo(x, y)
    ctx.value.stroke()
    currentPath.value.push({ x, y })
  } else {
    // 对于形状工具，实时预览
    restoreFromHistory()
    drawShape(startX.value, startY.value, x, y)
  }
}

const drawShape = (x1: number, y1: number, x2: number, y2: number) => {
  if (!ctx.value) return

  ctx.value.strokeStyle = currentColor.value
  ctx.value.lineWidth = strokeWidth.value
  ctx.value.lineCap = 'round'
  ctx.value.lineJoin = 'round'

  if (currentTool.value === 'rect') {
    ctx.value.strokeRect(x1, y1, x2 - x1, y2 - y1)
  } else if (currentTool.value === 'circle') {
    const radiusX = Math.abs(x2 - x1) / 2
    const radiusY = Math.abs(y2 - y1) / 2
    const centerX = x1 + (x2 - x1) / 2
    const centerY = y1 + (y2 - y1) / 2
    ctx.value.beginPath()
    ctx.value.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2)
    ctx.value.stroke()
  } else if (currentTool.value === 'line') {
    ctx.value.beginPath()
    ctx.value.moveTo(x1, y1)
    ctx.value.lineTo(x2, y2)
    ctx.value.stroke()
  }
}

const stopDrawing = (e?: MouseEvent) => {
  if (!isDrawing.value) return
  
  isDrawing.value = false

  if (e && (currentTool.value === 'rect' || currentTool.value === 'circle' || currentTool.value === 'line')) {
    const { x, y } = getCanvasPoint(e)
    // 发送绘图数据
    emit('draw', {
      type: currentTool.value,
      color: currentColor.value,
      strokeWidth: strokeWidth.value,
      startX: startX.value,
      startY: startY.value,
      endX: x,
      endY: y
    })
  } else if (currentPath.value.length > 0) {
    emit('draw', {
      type: currentTool.value,
      color: currentTool.value === 'eraser' ? '#1e293b' : currentColor.value,
      strokeWidth: currentTool.value === 'eraser' ? strokeWidth.value * 3 : strokeWidth.value,
      points: [...currentPath.value]
    })
  }

  saveHistory()
  currentPath.value = []
}

const confirmText = () => {
  if (!ctx.value || !textContent.value.trim()) {
    showTextInput.value = false
    textContent.value = ''
    return
  }

  const rect = canvasRef.value!.getBoundingClientRect()
  const scaleX = canvasWidth.value / rect.width
  const scaleY = canvasHeight.value / rect.height
  const x = textInputPos.value.x * scaleX
  const y = textInputPos.value.y * scaleY

  ctx.value.font = `${strokeWidth.value * 4}px "Noto Sans SC", sans-serif`
  ctx.value.fillStyle = currentColor.value
  ctx.value.fillText(textContent.value, x, y)

  emit('draw', {
    type: 'text',
    color: currentColor.value,
    strokeWidth: strokeWidth.value,
    startX: x,
    startY: y,
    text: textContent.value
  })

  saveHistory()
  showTextInput.value = false
  textContent.value = ''
}

// 触摸支持
const handleTouchStart = (e: TouchEvent) => {
  if (e.touches.length === 1) {
    const touch = e.touches[0]
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    })
    startDrawing(mouseEvent)
  }
}

const handleTouchMove = (e: TouchEvent) => {
  if (e.touches.length === 1) {
    const touch = e.touches[0]
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    })
    draw(mouseEvent)
  }
}

// 历史记录
const saveHistory = () => {
  if (ctx.value) {
    history.value.push(ctx.value.getImageData(0, 0, canvasWidth.value, canvasHeight.value))
    // 限制历史记录数量
    if (history.value.length > 50) {
      history.value.shift()
    }
  }
}

const restoreFromHistory = () => {
  if (ctx.value && history.value.length > 0) {
    ctx.value.putImageData(history.value[history.value.length - 1], 0, 0)
  }
}

const undo = () => {
  if (history.value.length > 1) {
    history.value.pop()
    restoreFromHistory()
  }
}

const clearCanvas = () => {
  if (ctx.value) {
    ctx.value.fillStyle = '#1e293b'
    ctx.value.fillRect(0, 0, canvasWidth.value, canvasHeight.value)
    saveHistory()
    emit('clear')
  }
}

// 接收远程绘图数据
const applyRemoteDraw = (data: DrawAction) => {
  if (!ctx.value) return

  ctx.value.strokeStyle = data.color
  ctx.value.lineWidth = data.strokeWidth
  ctx.value.lineCap = 'round'
  ctx.value.lineJoin = 'round'

  if (data.type === 'pen' || data.type === 'eraser') {
    if (data.points && data.points.length > 0) {
      ctx.value.beginPath()
      ctx.value.moveTo(data.points[0].x, data.points[0].y)
      for (let i = 1; i < data.points.length; i++) {
        ctx.value.lineTo(data.points[i].x, data.points[i].y)
      }
      ctx.value.stroke()
    }
  } else if (data.type === 'rect') {
    ctx.value.strokeRect(
      data.startX!,
      data.startY!,
      data.endX! - data.startX!,
      data.endY! - data.startY!
    )
  } else if (data.type === 'circle') {
    const radiusX = Math.abs(data.endX! - data.startX!) / 2
    const radiusY = Math.abs(data.endY! - data.startY!) / 2
    const centerX = data.startX! + (data.endX! - data.startX!) / 2
    const centerY = data.startY! + (data.endY! - data.startY!) / 2
    ctx.value.beginPath()
    ctx.value.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2)
    ctx.value.stroke()
  } else if (data.type === 'line') {
    ctx.value.beginPath()
    ctx.value.moveTo(data.startX!, data.startY!)
    ctx.value.lineTo(data.endX!, data.endY!)
    ctx.value.stroke()
  } else if (data.type === 'text') {
    ctx.value.font = `${data.strokeWidth * 4}px "Noto Sans SC", sans-serif`
    ctx.value.fillStyle = data.color
    ctx.value.fillText(data.text!, data.startX!, data.startY!)
  }

  saveHistory()
}

const applyClear = () => {
  if (ctx.value) {
    ctx.value.fillStyle = '#1e293b'
    ctx.value.fillRect(0, 0, canvasWidth.value, canvasHeight.value)
    history.value = []
    saveHistory()
  }
}

// 暴露方法供父组件调用
defineExpose({
  applyRemoteDraw,
  applyClear
})
</script>

<style scoped>
.whiteboard-container {
  width: 100%;
  aspect-ratio: 16 / 9;
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.tool-btn {
  @apply w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: #6366f1;
  border-radius: 50%;
  cursor: pointer;
}
</style>

