<template>
  <div class="thumbnail-list" ref="listRef">
    <div
      v-for="(slide, index) in slides"
      :key="index"
      :ref="el => setThumbRef(el, index)"
      :class="['thumbnail-item', { active: currentIndex === index }]"
      @click="$emit('select', index)"
    >
      <!-- 页码 -->
      <div class="thumb-number">{{ index + 1 }}</div>
      
      <!-- 缩略图预览 -->
      <div class="thumb-preview">
        <!-- 如果有缩略图URL -->
        <img 
          v-if="slide.thumbnailUrl || slide.imageUrl" 
          :src="slide.thumbnailUrl || slide.imageUrl" 
          :alt="slide.title || `第 ${index + 1} 页`"
          class="thumb-image"
        />
        <!-- 否则显示标题预览 -->
        <div v-else class="thumb-content">
          <span class="thumb-title">{{ slide.title || `第 ${index + 1} 页` }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { Slide } from '~/composables/useRevealPlayer'

const props = defineProps<{
  slides: Slide[]
  currentIndex: number
}>()

defineEmits<{
  (e: 'select', index: number): void
}>()

const listRef = ref<HTMLElement | null>(null)
const thumbRefs = ref<Map<number, HTMLElement>>(new Map())

const setThumbRef = (el: any, index: number) => {
  if (el) {
    thumbRefs.value.set(index, el)
  }
}

// 自动滚动到当前活动的缩略图
const scrollToActive = () => {
  const activeThumb = thumbRefs.value.get(props.currentIndex)
  if (activeThumb && listRef.value) {
    activeThumb.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    })
  }
}

// 监听当前索引变化，自动滚动
watch(() => props.currentIndex, async () => {
  await nextTick()
  scrollToActive()
})
</script>

<style scoped>
.thumbnail-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
}

.thumbnail-list::-webkit-scrollbar {
  width: 4px;
}

.thumbnail-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.thumbnail-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.thumbnail-item {
  display: flex;
  gap: 8px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.03);
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.thumbnail-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-1px);
}

.thumbnail-item.active {
  border-color: #f9a825;
  background: rgba(249, 168, 37, 0.1);
}

.thumb-number {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
}

.thumbnail-item.active .thumb-number {
  background: #f9a825;
  color: #1a1a2e;
}

.thumb-preview {
  flex: 1;
  aspect-ratio: 16 / 9;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  overflow: hidden;
}

.thumb-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.thumb-title {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
