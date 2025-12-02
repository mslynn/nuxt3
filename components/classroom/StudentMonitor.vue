<template>
  <div class="student-monitor bg-slate-800 rounded-xl p-4">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-white font-medium flex items-center gap-2">
        <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        学生监控
      </h3>
      <div class="flex gap-2">
        <button
          @click="$emit('lockAll')"
          class="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          全部锁定
        </button>
        <button
          @click="$emit('unlockAll')"
          class="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          全部解锁
        </button>
      </div>
    </div>

    <div class="grid gap-3">
      <div
        v-for="student in students"
        :key="student.id"
        class="student-item flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
      >
        <div class="flex items-center gap-3">
          <!-- 头像 -->
          <div 
            class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            :class="student.isFocused ? 'bg-green-600' : 'bg-red-600'"
          >
            {{ student.name.charAt(0).toUpperCase() }}
          </div>
          
          <!-- 信息 -->
          <div>
            <p class="text-white text-sm font-medium">{{ student.name }}</p>
            <div class="flex items-center gap-2 text-xs">
              <span 
                class="flex items-center gap-1"
                :class="student.isFocused ? 'text-green-400' : 'text-red-400'"
              >
                <span class="w-2 h-2 rounded-full" :class="student.isFocused ? 'bg-green-400' : 'bg-red-400 animate-pulse'"></span>
                {{ student.isFocused ? '专注中' : '未聚焦' }}
              </span>
              <span v-if="student.isLocked" class="text-yellow-400 flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                已锁定
              </span>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex gap-2">
          <button
            v-if="!student.isLocked"
            @click="$emit('lock', student.id)"
            class="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-600 rounded-lg transition-colors"
            title="锁定屏幕"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </button>
          <button
            v-else
            @click="$emit('unlock', student.id)"
            class="p-2 text-yellow-400 hover:text-green-400 hover:bg-slate-600 rounded-lg transition-colors"
            title="解锁屏幕"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      <div v-if="students.length === 0" class="text-center py-8 text-slate-500">
        <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p>暂无学生加入</p>
      </div>
    </div>

    <!-- 统计信息 -->
    <div v-if="students.length > 0" class="mt-4 pt-4 border-t border-slate-700 grid grid-cols-3 gap-4 text-center">
      <div>
        <p class="text-2xl font-bold text-white">{{ students.length }}</p>
        <p class="text-xs text-slate-400">在线人数</p>
      </div>
      <div>
        <p class="text-2xl font-bold text-green-400">{{ focusedCount }}</p>
        <p class="text-xs text-slate-400">专注人数</p>
      </div>
      <div>
        <p class="text-2xl font-bold text-yellow-400">{{ lockedCount }}</p>
        <p class="text-xs text-slate-400">锁定人数</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Student {
  id: string
  name: string
  isFocused: boolean
  isLocked: boolean
}

const props = defineProps<{
  students: Student[]
}>()

defineEmits<{
  (e: 'lock', studentId: string): void
  (e: 'unlock', studentId: string): void
  (e: 'lockAll'): void
  (e: 'unlockAll'): void
}>()

const focusedCount = computed(() => props.students.filter(s => s.isFocused).length)
const lockedCount = computed(() => props.students.filter(s => s.isLocked).length)
</script>

