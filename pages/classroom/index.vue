<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- 标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-white mb-4">
          <span class="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            智启在线教室
          </span>
        </h1>
        <p class="text-slate-400">选择您的身份进入教室</p>
      </div>

      <!-- 房间号输入 -->
      <div class="max-w-md mx-auto mb-8">
        <label class="block text-slate-300 text-sm mb-2">房间号</label>
        <input
          v-model="roomId"
          type="text"
          placeholder="输入房间号（如：room-001）"
          class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <!-- 名字输入 -->
      <div class="max-w-md mx-auto mb-8">
        <label class="block text-slate-300 text-sm mb-2">您的名字</label>
        <input
          v-model="userName"
          type="text"
          placeholder="输入您的名字"
          class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <!-- 角色选择 -->
      <div class="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <!-- 老师入口 -->
        <div
          @click="joinAs('teacher')"
          class="role-card group cursor-pointer bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-500/60 transition-all duration-300"
        >
          <div class="w-20 h-20 mx-auto mb-6 bg-indigo-600/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-white text-center mb-2">我是老师</h2>
          <p class="text-slate-400 text-center text-sm mb-4">创建/进入教室，开始授课</p>
          <ul class="text-slate-500 text-xs space-y-1">
            <li>✓ 屏幕共享</li>
            <li>✓ 电子白板</li>
            <li>✓ 学生监控</li>
            <li>✓ 锁定学生屏幕</li>
          </ul>
        </div>

        <!-- 学生入口 -->
        <div
          @click="joinAs('student')"
          class="role-card group cursor-pointer bg-gradient-to-br from-green-600/20 to-teal-600/20 border border-green-500/30 rounded-2xl p-8 hover:border-green-500/60 transition-all duration-300"
        >
          <div class="w-20 h-20 mx-auto mb-6 bg-green-600/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-white text-center mb-2">我是学生</h2>
          <p class="text-slate-400 text-center text-sm mb-4">加入教室，开始学习</p>
          <ul class="text-slate-500 text-xs space-y-1">
            <li>✓ 观看老师屏幕</li>
            <li>✓ 查看电子白板</li>
            <li>✓ 课堂互动聊天</li>
            <li>✓ 举手提问</li>
          </ul>
        </div>
      </div>

      <!-- 提示 -->
      <div class="mt-12 text-center">
        <p class="text-slate-500 text-sm">
          💡 提示：本系统使用 WebRTC 技术，需要授权摄像头和麦克风权限
        </p>
        <p class="text-slate-600 text-xs mt-2">
          首次使用请允许浏览器访问媒体设备
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const router = useRouter()
const roomId = ref('room-' + Math.random().toString(36).substring(2, 8))
const userName = ref('')

const joinAs = (role: 'teacher' | 'student') => {
  if (!roomId.value.trim()) {
    alert('请输入房间号')
    return
  }
  if (!userName.value.trim()) {
    alert('请输入您的名字')
    return
  }

  router.push({
    path: `/classroom/${roomId.value}`,
    query: {
      role,
      name: userName.value
    }
  })
}
</script>

<style scoped>
.role-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.5);
}
</style>

