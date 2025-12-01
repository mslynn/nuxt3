<template>
  <div 
    class="video-container relative rounded-xl overflow-hidden bg-slate-800"
    :class="{ 'ring-2 ring-indigo-500': isActive }"
  >
    <video
      ref="videoRef"
      :muted="muted"
      autoplay
      playsinline
      class="w-full h-full object-cover"
    ></video>
    
    <!-- 名字标签 -->
    <div class="absolute bottom-2 left-2 px-2 py-1 bg-black/60 rounded-md text-white text-sm flex items-center gap-2">
      <span v-if="role === 'teacher'" class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
      <span>{{ name }}</span>
      <span v-if="isMuted" class="text-red-400">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      </span>
    </div>

    <!-- 无视频时的占位 -->
    <div 
      v-if="!hasVideo"
      class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800"
    >
      <div class="text-center">
        <div class="w-20 h-20 mx-auto mb-3 rounded-full bg-slate-600 flex items-center justify-center text-3xl text-white font-bold">
          {{ name.charAt(0).toUpperCase() }}
        </div>
        <p class="text-slate-400">{{ name }}</p>
      </div>
    </div>

    <!-- 屏幕共享标识 -->
    <div 
      v-if="isScreenShare"
      class="absolute top-2 right-2 px-2 py-1 bg-green-600/90 rounded-md text-white text-xs flex items-center gap-1"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      屏幕共享
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  stream?: MediaStream | null
  name: string
  role?: 'teacher' | 'student'
  muted?: boolean
  isActive?: boolean
  isScreenShare?: boolean
  isMuted?: boolean
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const hasVideo = ref(false)

watch(() => props.stream, (newStream) => {
  if (videoRef.value && newStream) {
    videoRef.value.srcObject = newStream
    hasVideo.value = newStream.getVideoTracks().length > 0
  } else {
    hasVideo.value = false
  }
}, { immediate: true })

onMounted(() => {
  if (videoRef.value && props.stream) {
    videoRef.value.srcObject = props.stream
    hasVideo.value = props.stream.getVideoTracks().length > 0
  }
})
</script>

<style scoped>
.video-container {
  aspect-ratio: 16 / 9;
}
</style>

