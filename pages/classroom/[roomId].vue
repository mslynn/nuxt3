<template>
  <div class="classroom-page min-h-screen bg-slate-900">
    <!-- 顶部控制栏 -->
    <header class="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-4">
      <div class="flex items-center gap-4">
        <NuxtLink to="/classroom" class="text-slate-400 hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-white font-medium">教室: {{ roomId }}</h1>
          <p class="text-xs text-slate-400">
            {{ isTeacher ? '👨‍🏫 老师模式' : '📚 学生模式' }}
            <span v-if="isConnected" class="text-green-400 ml-2">● 已连接</span>
            <span v-else class="text-red-400 ml-2">● 未连接</span>
          </p>
        </div>
      </div>

      <!-- 控制按钮 -->
      <div class="flex items-center gap-2">
        <!-- 摄像头 -->
        <button
          @click="toggleCamera"
          :class="[
            'control-btn',
            isCameraOn ? 'bg-slate-700 text-white' : 'bg-red-600 text-white'
          ]"
          title="摄像头"
        >
          <svg v-if="isCameraOn" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        </button>

        <!-- 麦克风 -->
        <button
          @click="toggleMic"
          :class="[
            'control-btn',
            isMicOn ? 'bg-slate-700 text-white' : 'bg-red-600 text-white'
          ]"
          title="麦克风"
        >
          <svg v-if="isMicOn" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        </button>

        <!-- 屏幕共享（仅老师） -->
        <button
          v-if="isTeacher"
          @click="toggleScreenShare"
          :class="[
            'control-btn',
            isScreenSharing ? 'bg-green-600 text-white' : 'bg-slate-700 text-white hover:bg-slate-600'
          ]"
          title="屏幕共享"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>

        <div class="w-px h-8 bg-slate-700 mx-2"></div>

        <!-- 视图切换 -->
        <div class="flex bg-slate-700 rounded-lg p-1">
          <button
            @click="currentView = 'whiteboard'"
            :class="[
              'px-3 py-1 text-sm rounded-md transition-colors',
              currentView === 'whiteboard' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            ]"
          >
            白板
          </button>
          <button
            @click="currentView = 'screen'"
            :class="[
              'px-3 py-1 text-sm rounded-md transition-colors',
              currentView === 'screen' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            ]"
          >
            屏幕
          </button>
        </div>

        <div class="w-px h-8 bg-slate-700 mx-2"></div>

        <!-- 离开教室 -->
        <button
          @click="leaveRoom"
          class="control-btn bg-red-600 text-white hover:bg-red-700"
          title="离开教室"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </header>

    <!-- 主内容区 -->
    <div class="flex h-[calc(100vh-4rem)]">
      <!-- 左侧主区域 -->
      <div class="flex-1 flex flex-col p-4 gap-4">
        <!-- 主视图区域 -->
        <div class="flex-1 relative bg-slate-800 rounded-xl overflow-hidden">
          <!-- 白板视图 -->
          <ClassroomWhiteboard
            v-show="currentView === 'whiteboard'"
            ref="whiteboardRef"
            :readonly="!isTeacher"
            @draw="onWhiteboardDraw"
            @clear="onWhiteboardClear"
          />

          <!-- 屏幕共享视图 -->
          <div v-show="currentView === 'screen'" class="w-full h-full flex items-center justify-center">
            <!-- 老师端：显示自己的屏幕共享 -->
            <ClassroomVideoPlayer
              v-if="isTeacher && screenShareStream"
              :stream="screenShareStream"
              name="我的屏幕"
              :is-screen-share="true"
              class="w-full h-full"
            />
            <!-- 学生端：显示老师的屏幕共享 -->
            <ClassroomVideoPlayer
              v-else-if="!isTeacher && remoteScreenStream"
              :stream="remoteScreenStream"
              name="老师的屏幕"
              :is-screen-share="true"
              class="w-full h-full"
            />
            <!-- 学生端：等待接收屏幕流 -->
            <div v-else-if="!isTeacher && teacherScreenSharing && !remoteScreenStream" class="text-center">
              <div class="w-32 h-32 mx-auto mb-6 bg-green-600/20 rounded-full flex items-center justify-center">
                <svg class="w-16 h-16 text-green-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p class="text-xl text-white mb-2">正在连接老师的屏幕...</p>
              <p class="text-slate-400 text-sm">请稍候，正在建立 WebRTC 连接</p>
            </div>
            <!-- 无屏幕共享时 -->
            <div v-else class="text-center text-slate-500">
              <svg class="w-24 h-24 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p v-if="isTeacher">点击上方按钮开始屏幕共享</p>
              <p v-else>等待老师开始屏幕共享...</p>
            </div>
          </div>
        </div>

        <!-- 底部视频区域 -->
        <div class="h-40 flex gap-4 overflow-x-auto pb-2">
          <!-- 本地视频 -->
          <ClassroomVideoPlayer
            :stream="localStream"
            :name="userName + '（我）'"
            :role="isTeacher ? 'teacher' : 'student'"
            :muted="true"
            :is-active="true"
            :is-muted="!isMicOn"
            class="w-56 shrink-0"
          />

          <!-- 远程视频 -->
          <ClassroomVideoPlayer
            v-for="(stream, odid) in remoteStreams"
            :key="odid as string"
            :stream="stream"
            :name="getParticipantName(odid as string)"
            :role="getParticipantRole(odid as string)"
            class="w-56 shrink-0"
          />
        </div>
      </div>

      <!-- 右侧面板 -->
      <div class="w-80 bg-slate-800/50 border-l border-slate-700 flex flex-col">
        <!-- Tab 切换 -->
        <div class="flex border-b border-slate-700">
          <button
            @click="rightPanel = 'chat'"
            :class="[
              'flex-1 py-3 text-sm font-medium transition-colors',
              rightPanel === 'chat' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:text-white'
            ]"
          >
            聊天
          </button>
          <button
            v-if="isTeacher"
            @click="rightPanel = 'monitor'"
            :class="[
              'flex-1 py-3 text-sm font-medium transition-colors',
              rightPanel === 'monitor' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:text-white'
            ]"
          >
            学生监控
          </button>
        </div>

        <!-- 聊天面板 -->
        <ClassroomChatPanel
          v-show="rightPanel === 'chat'"
          :messages="chatMessages"
          :participants="participants"
          :current-user-id="odid"
          :show-participants="true"
          class="flex-1"
          @send="sendChatMessage"
        />

        <!-- 学生监控面板（仅老师） -->
        <ClassroomStudentMonitor
          v-if="isTeacher"
          v-show="rightPanel === 'monitor'"
          :students="studentsList"
          class="flex-1 overflow-y-auto"
          @lock="lockStudent"
          @unlock="unlockStudent"
          @lock-all="lockAllStudents"
          @unlock-all="unlockAllStudents"
        />
      </div>
    </div>

    <!-- 屏幕锁定遮罩（学生端） -->
    <ClassroomScreenLockOverlay
      v-if="!isTeacher"
      :is-locked="isScreenLocked"
      message="请认真听讲，老师正在授课中"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const route = useRoute()
const router = useRouter()

// 路由参数
const roomId = route.params.roomId as string
const role = (route.query.role as string) || 'student'
const userName = (route.query.name as string) || '匿名用户'
const isTeacher = computed(() => role === 'teacher')

// WebSocket
const WS_URL = 'ws://127.0.0.1:3001'
const ws = ref<WebSocket | null>(null)

// 状态
const isConnected = ref(false)
const currentView = ref<'whiteboard' | 'screen'>('whiteboard')
const rightPanel = ref<'chat' | 'monitor'>('chat')
const odid = ref(Math.random().toString(36).substring(2, 15))

// 媒体流
const localStream = ref<MediaStream | null>(null)
const screenShareStream = ref<MediaStream | null>(null)
const remoteStreams = ref<Map<string, MediaStream>>(new Map())

// 控制状态
const isCameraOn = ref(false)
const isMicOn = ref(false)
const isScreenSharing = ref(false)
const isScreenLocked = ref(false)
const teacherScreenSharing = ref(false) // 学生端：老师是否在共享屏幕

// WebRTC - 屏幕共享
const peerConnections = ref<Map<string, RTCPeerConnection>>(new Map())
const remoteScreenStream = ref<MediaStream | null>(null) // 学生端：接收老师的屏幕共享流

// ICE 服务器配置
const iceServers: RTCConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
}

// 参与者和消息
const participants = ref<Array<{ id: string; name: string; role: string }>>([])
const chatMessages = ref<Array<{
  from: string
  fromName?: string
  content: string
  time: Date
  isTeacher?: boolean
}>>([])

// 学生列表（用于监控）
const studentsList = ref<Array<{
  id: string
  name: string
  isFocused: boolean
  isLocked: boolean
}>>([])

// 组件引用
const whiteboardRef = ref<any>(null)

// WebSocket 消息发送
const wsSend = (type: string, payload: any = {}) => {
  if (ws.value && ws.value.readyState === WebSocket.OPEN) {
    ws.value.send(JSON.stringify({ type, payload }))
  }
}

// WebSocket 消息处理
const handleWsMessage = (event: MessageEvent) => {
  try {
    const data = JSON.parse(event.data)
    const { type, payload } = data
    
    // 调试：打印所有收到的消息
    console.log('📩 收到消息:', type, payload)

    switch (type) {
      case 'room-joined':
        userId.value = payload.odid
        participants.value = payload.participants || []
        // 更新学生列表
        updateStudentsList()
        break

      case 'user-joined':
        participants.value.push(payload.user)
        updateStudentsList()
        break

      case 'user-left':
        participants.value = participants.value.filter(p => p.id !== payload.odid)
        updateStudentsList()
        break

      case 'chat-message':
        chatMessages.value.push({
          from: payload.from,
          fromName: payload.fromName,
          content: payload.content,
          time: new Date(payload.time),
          isTeacher: payload.isTeacher
        })
        break

      case 'whiteboard-draw':
        if (whiteboardRef.value && payload.from !== odid.value) {
          whiteboardRef.value.applyRemoteDraw(payload)
        }
        break

      case 'whiteboard-clear':
        if (whiteboardRef.value && payload.from !== odid.value) {
          whiteboardRef.value.applyClear()
        }
        break

      case 'lock-screen':
        isScreenLocked.value = true
        break

      case 'unlock-screen':
        isScreenLocked.value = false
        break

      case 'focus-status':
        // 更新学生焦点状态
        const student = studentsList.value.find(s => s.id === payload.studentId)
        if (student) {
          student.isFocused = payload.isFocused
        }
        break

      case 'screen-share-started':
        // 老师开始屏幕共享（学生端收到通知）
        console.log('📺 收到屏幕共享开始通知', payload)
        if (!isTeacher.value) {
          teacherScreenSharing.value = true
          currentView.value = 'screen'
          console.log('📺 学生端：老师开始屏幕共享')
        }
        break

      case 'screen-share-stopped':
        // 老师停止屏幕共享
        console.log('📺 收到屏幕共享停止通知', payload)
        if (!isTeacher.value) {
          teacherScreenSharing.value = false
          remoteScreenStream.value = null
          // 关闭 PeerConnection
          peerConnections.value.forEach(pc => pc.close())
          peerConnections.value.clear()
          console.log('📺 学生端：老师停止屏幕共享')
        }
        break

      case 'webrtc-offer':
        // 学生端收到老师的 offer
        if (!isTeacher.value) {
          console.log('🔗 收到 WebRTC offer')
          handleWebRTCOffer(payload.from, payload.offer)
        }
        break

      case 'webrtc-answer':
        // 老师端收到学生的 answer
        if (isTeacher.value) {
          console.log('🔗 收到 WebRTC answer')
          handleWebRTCAnswer(payload.from, payload.answer)
        }
        break

      case 'webrtc-ice-candidate':
        // 收到 ICE candidate
        console.log('🔗 收到 ICE candidate')
        handleICECandidate(payload.from, payload.candidate)
        break
    }
  } catch (e) {
    console.error('消息解析失败:', e)
  }
}

// 更新学生列表（从参与者中筛选）
const updateStudentsList = () => {
  // 先保存旧的状态
  const oldStudents = [...studentsList.value]
  
  studentsList.value = participants.value
    .filter(p => p.role === 'student')
    .map(p => {
      const existingStudent = oldStudents.find(s => s.id === p.id)
      return {
        id: p.id,
        name: p.name,
        isFocused: existingStudent?.isFocused ?? true, // 默认为专注
        isLocked: existingStudent?.isLocked ?? false
      }
    })
}

// 用户ID
const odidValue = odid.value
const userId = ref(odidValue)

onMounted(async () => {
  // 连接 WebSocket
  try {
    ws.value = new WebSocket(WS_URL)

    ws.value.onopen = () => {
      isConnected.value = true
      console.log('✅ WebSocket 已连接')
      // 加入房间
      wsSend('join-room', { roomId, name: userName, role })
    }

    ws.value.onclose = () => {
      isConnected.value = false
      console.log('❌ WebSocket 已断开')
    }

    ws.value.onerror = (error) => {
      console.error('WebSocket 错误:', error)
      isConnected.value = false
    }

    ws.value.onmessage = handleWsMessage
  } catch (error) {
    console.error('WebSocket 连接失败:', error)
  }

  // 尝试获取媒体流
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })
    localStream.value = stream
    isCameraOn.value = true
    isMicOn.value = true
  } catch (error) {
    console.error('获取媒体设备失败:', error)
  }

  // 监听页面焦点变化（学生端）- 暂时禁用调试
  // if (!isTeacher.value) {
  //   document.addEventListener('visibilitychange', handleVisibilityChange)
  //   window.addEventListener('blur', handleWindowBlur)
  //   window.addEventListener('focus', handleWindowFocus)
  //   
  //   // 初始化时发送焦点状态（延迟一下确保 WebSocket 已连接和加入房间）
  //   setTimeout(() => {
  //     const isFocused = document.hasFocus() && !document.hidden
  //     console.log('📤 发送焦点状态:', isFocused)
  //     wsSend('focus-status', { isFocused: true }) // 刚加入默认为专注
  //   }, 2000)
  // }
})

onUnmounted(() => {
  // 离开房间
  wsSend('leave-room', { roomId })

  // 关闭 WebSocket
  if (ws.value) {
    ws.value.close()
  }

  // 清理媒体流
  if (localStream.value) {
    localStream.value.getTracks().forEach(track => track.stop())
  }
  if (screenShareStream.value) {
    screenShareStream.value.getTracks().forEach(track => track.stop())
  }

  // 移除事件监听
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  window.removeEventListener('blur', handleWindowBlur)
  window.removeEventListener('focus', handleWindowFocus)
})

// 摄像头切换
const toggleCamera = () => {
  if (localStream.value) {
    const videoTrack = localStream.value.getVideoTracks()[0]
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled
      isCameraOn.value = videoTrack.enabled
    }
  }
}

// 麦克风切换
const toggleMic = () => {
  if (localStream.value) {
    const audioTrack = localStream.value.getAudioTracks()[0]
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled
      isMicOn.value = audioTrack.enabled
    }
  }
}

// 屏幕共享切换
const toggleScreenShare = async () => {
  if (isScreenSharing.value) {
    // 停止屏幕共享
    if (screenShareStream.value) {
      screenShareStream.value.getTracks().forEach(track => track.stop())
      screenShareStream.value = null
    }
    // 关闭所有 PeerConnection
    peerConnections.value.forEach(pc => pc.close())
    peerConnections.value.clear()
    isScreenSharing.value = false
    wsSend('screen-share-stopped', {})
  } else {
    // 开始屏幕共享
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { width: 1920, height: 1080 },
        audio: true
      })
      screenShareStream.value = stream
      isScreenSharing.value = true
      currentView.value = 'screen'
      console.log('📺 老师端：发送屏幕共享开始通知')
      wsSend('screen-share-started', {})

      // 为每个学生创建 WebRTC 连接
      const students = participants.value.filter(p => p.role === 'student')
      for (const student of students) {
        await createOfferForStudent(student.id, stream)
      }

      // 监听停止
      stream.getVideoTracks()[0].onended = () => {
        screenShareStream.value = null
        peerConnections.value.forEach(pc => pc.close())
        peerConnections.value.clear()
        isScreenSharing.value = false
        wsSend('screen-share-stopped', {})
      }
    } catch (error) {
      console.error('屏幕共享失败:', error)
    }
  }
}

// WebRTC: 老师为学生创建 offer
const createOfferForStudent = async (studentId: string, stream: MediaStream) => {
  console.log('🔗 为学生创建 WebRTC 连接:', studentId)
  
  const pc = new RTCPeerConnection(iceServers)
  peerConnections.value.set(studentId, pc)

  // 添加屏幕共享流
  stream.getTracks().forEach(track => {
    pc.addTrack(track, stream)
  })

  // ICE candidate
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      wsSend('webrtc-ice-candidate', {
        targetId: studentId,
        candidate: event.candidate.toJSON()
      })
    }
  }

  // 创建并发送 offer
  const offer = await pc.createOffer()
  await pc.setLocalDescription(offer)
  
  wsSend('webrtc-offer', {
    targetId: studentId,
    offer: {
      type: offer.type,
      sdp: offer.sdp
    }
  })
  console.log('📤 发送 WebRTC offer 给学生:', studentId)
}

// WebRTC: 学生处理 offer 并发送 answer
const handleWebRTCOffer = async (teacherId: string, offer: RTCSessionDescriptionInit) => {
  console.log('🔗 学生处理 WebRTC offer, teacherId:', teacherId)
  
  const pc = new RTCPeerConnection(iceServers)
  peerConnections.value.set(teacherId, pc)

  // 连接状态变化
  pc.onconnectionstatechange = () => {
    console.log('🔗 连接状态:', pc.connectionState)
  }

  pc.oniceconnectionstatechange = () => {
    console.log('🔗 ICE 连接状态:', pc.iceConnectionState)
  }

  // 接收远程流
  pc.ontrack = (event) => {
    console.log('📥 收到远程视频流!', event.streams)
    if (event.streams && event.streams[0]) {
      remoteScreenStream.value = event.streams[0]
      console.log('✅ 远程流已设置')
    }
  }

  // ICE candidate
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      console.log('📤 发送 ICE candidate')
      wsSend('webrtc-ice-candidate', {
        targetId: teacherId,
        candidate: event.candidate.toJSON()
      })
    }
  }

  try {
    // 设置远程描述并创建 answer
    await pc.setRemoteDescription(new RTCSessionDescription(offer))
    console.log('✅ 远程描述已设置')
    
    const answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)
    console.log('✅ 本地描述已设置')

    wsSend('webrtc-answer', {
      targetId: teacherId,
      answer: {
        type: answer.type,
        sdp: answer.sdp
      }
    })
    console.log('📤 发送 WebRTC answer 给老师')
  } catch (error) {
    console.error('❌ WebRTC 错误:', error)
  }
}

// WebRTC: 老师处理 answer
const handleWebRTCAnswer = async (studentId: string, answer: RTCSessionDescriptionInit) => {
  const pc = peerConnections.value.get(studentId)
  if (pc) {
    await pc.setRemoteDescription(new RTCSessionDescription(answer))
    console.log('✅ WebRTC 连接建立成功:', studentId)
  }
}

// WebRTC: 处理 ICE candidate
const handleICECandidate = async (peerId: string, candidate: RTCIceCandidateInit) => {
  const pc = peerConnections.value.get(peerId)
  if (pc) {
    await pc.addIceCandidate(new RTCIceCandidate(candidate))
  }
}

// 白板绘图
const onWhiteboardDraw = (data: any) => {
  wsSend('whiteboard-draw', data)
}

const onWhiteboardClear = () => {
  wsSend('whiteboard-clear', {})
}

// 聊天消息
const sendChatMessage = (content: string) => {
  // 本地先显示
  chatMessages.value.push({
    from: odid.value,
    fromName: userName,
    content,
    time: new Date(),
    isTeacher: isTeacher.value
  })
  // 发送到服务器
  wsSend('chat-message', { content })
}

// 学生监控
const lockStudent = (studentId: string) => {
  const student = studentsList.value.find(s => s.id === studentId)
  if (student) {
    student.isLocked = true
    wsSend('lock-screen', { targetStudentId: studentId })
  }
}

const unlockStudent = (studentId: string) => {
  const student = studentsList.value.find(s => s.id === studentId)
  if (student) {
    student.isLocked = false
    wsSend('unlock-screen', { targetStudentId: studentId })
  }
}

const lockAllStudents = () => {
  studentsList.value.forEach(s => s.isLocked = true)
  wsSend('lock-screen', {})
}

const unlockAllStudents = () => {
  studentsList.value.forEach(s => s.isLocked = false)
  wsSend('unlock-screen', {})
}

// 获取参与者信息
const getParticipantName = (odid: string) => {
  const p = participants.value.find(p => p.id === odid)
  return p?.name || '未知用户'
}

const getParticipantRole = (odid: string): 'teacher' | 'student' => {
  const p = participants.value.find(p => p.id === odid)
  return (p?.role as 'teacher' | 'student') || 'student'
}

// 焦点监听（学生端）
const handleVisibilityChange = () => {
  if (document.hidden) {
    console.log('学生离开了页面')
    wsSend('focus-status', { isFocused: false })
  } else {
    console.log('学生回到了页面')
    wsSend('focus-status', { isFocused: true })
  }
}

const handleWindowBlur = () => {
  console.log('窗口失去焦点')
  wsSend('focus-status', { isFocused: false })
}

const handleWindowFocus = () => {
  console.log('窗口获得焦点')
  wsSend('focus-status', { isFocused: true })
}

// 离开教室
const leaveRoom = () => {
  if (confirm('确定要离开教室吗？')) {
    router.push('/classroom')
  }
}
</script>

<style scoped>
.control-btn {
  @apply w-10 h-10 flex items-center justify-center rounded-lg transition-colors;
}
</style>

