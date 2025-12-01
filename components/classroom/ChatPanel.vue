<template>
  <div class="chat-panel flex flex-col h-full bg-slate-800 rounded-xl overflow-hidden">
    <!-- 头部 -->
    <div class="px-4 py-3 bg-slate-700/50 border-b border-slate-700">
      <h3 class="text-white font-medium flex items-center gap-2">
        <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        课堂聊天
        <span class="text-xs text-slate-400">({{ participants.length }}人在线)</span>
      </h3>
    </div>

    <!-- 在线用户列表（可折叠） -->
    <div v-if="showParticipants" class="px-4 py-2 bg-slate-700/30 border-b border-slate-700">
      <div class="flex flex-wrap gap-2">
        <span
          v-for="p in participants"
          :key="p.id"
          class="px-2 py-1 text-xs rounded-full"
          :class="p.role === 'teacher' ? 'bg-indigo-600 text-white' : 'bg-slate-600 text-slate-300'"
        >
          {{ p.name }}
          <span v-if="p.role === 'teacher'" class="ml-1">👨‍🏫</span>
        </span>
      </div>
    </div>

    <!-- 消息列表 -->
    <div 
      ref="messagesContainer"
      class="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin"
    >
      <div v-if="messages.length === 0" class="text-center text-slate-500 py-8">
        <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p>暂无消息，快来发送第一条吧！</p>
      </div>

      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="message"
        :class="{ 'message-self': msg.from === currentUserId }"
      >
        <div 
          class="flex items-start gap-2"
          :class="{ 'flex-row-reverse': msg.from === currentUserId }"
        >
          <div 
            class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
            :class="msg.isTeacher ? 'bg-indigo-600 text-white' : 'bg-slate-600 text-slate-200'"
          >
            {{ msg.fromName?.charAt(0).toUpperCase() || '?' }}
          </div>
          <div :class="{ 'text-right': msg.from === currentUserId }">
            <div class="flex items-center gap-2 mb-1" :class="{ 'flex-row-reverse': msg.from === currentUserId }">
              <span class="text-xs text-slate-400">{{ msg.fromName }}</span>
              <span v-if="msg.isTeacher" class="text-xs text-indigo-400">老师</span>
              <span class="text-xs text-slate-500">{{ formatTime(msg.time) }}</span>
            </div>
            <div 
              class="inline-block px-3 py-2 rounded-xl text-sm max-w-[240px] break-words"
              :class="msg.from === currentUserId 
                ? 'bg-indigo-600 text-white rounded-br-sm' 
                : 'bg-slate-700 text-slate-200 rounded-bl-sm'"
            >
              {{ msg.content }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="p-4 border-t border-slate-700">
      <div class="flex gap-2">
        <input
          v-model="inputMessage"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="输入消息..."
          class="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          @click="sendMessage"
          :disabled="!inputMessage.trim()"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Message {
  from: string
  fromName?: string
  content: string
  time: Date
  isTeacher?: boolean
}

interface Participant {
  id: string
  name: string
  role: string
}

const props = defineProps<{
  messages: Message[]
  participants: Participant[]
  currentUserId: string
  showParticipants?: boolean
}>()

const emit = defineEmits<{
  (e: 'send', content: string): void
}>()

const inputMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

const sendMessage = () => {
  if (inputMessage.value.trim()) {
    emit('send', inputMessage.value.trim())
    inputMessage.value = ''
  }
}

const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

// 自动滚动到底部
watch(() => props.messages.length, () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
})
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 2px;
}
</style>

