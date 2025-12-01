// WebSocket 连接管理
export const useWebSocket = () => {
  const ws = ref<WebSocket | null>(null)
  const isConnected = ref(false)
  const roomId = ref('')
  const userId = ref('')
  const userRole = ref<'teacher' | 'student'>('student')
  const participants = ref<Array<{ id: string; name: string; role: string }>>([])
  const messages = ref<Array<{ from: string; content: string; time: Date }>>([])

  // 事件处理器
  const eventHandlers = new Map<string, Set<Function>>()

  const on = (event: string, handler: Function) => {
    if (!eventHandlers.has(event)) {
      eventHandlers.set(event, new Set())
    }
    eventHandlers.get(event)!.add(handler)
  }

  const off = (event: string, handler: Function) => {
    eventHandlers.get(event)?.delete(handler)
  }

  const emit = (event: string, ...args: any[]) => {
    eventHandlers.get(event)?.forEach(handler => handler(...args))
  }

  const connect = (serverUrl: string) => {
    return new Promise<void>((resolve, reject) => {
      try {
        ws.value = new WebSocket(serverUrl)

        ws.value.onopen = () => {
          isConnected.value = true
          console.log('WebSocket 连接成功')
          resolve()
        }

        ws.value.onclose = () => {
          isConnected.value = false
          console.log('WebSocket 连接关闭')
          emit('disconnected')
        }

        ws.value.onerror = (error) => {
          console.error('WebSocket 错误:', error)
          reject(error)
        }

        ws.value.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            handleMessage(data)
          } catch (e) {
            console.error('消息解析失败:', e)
          }
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  const handleMessage = (data: any) => {
    const { type, payload } = data

    switch (type) {
      case 'room-joined':
        roomId.value = payload.roomId
        userId.value = payload.userId
        participants.value = payload.participants || []
        emit('room-joined', payload)
        break

      case 'user-joined':
        participants.value.push(payload.user)
        emit('user-joined', payload.user)
        break

      case 'user-left':
        participants.value = participants.value.filter(p => p.id !== payload.userId)
        emit('user-left', payload.userId)
        break

      case 'chat-message':
        messages.value.push({
          from: payload.from,
          content: payload.content,
          time: new Date(payload.time)
        })
        emit('chat-message', payload)
        break

      case 'offer':
      case 'answer':
      case 'ice-candidate':
        emit(type, payload)
        break

      case 'whiteboard-draw':
        emit('whiteboard-draw', payload)
        break

      case 'whiteboard-clear':
        emit('whiteboard-clear')
        break

      case 'screen-share-started':
        emit('screen-share-started', payload)
        break

      case 'screen-share-stopped':
        emit('screen-share-stopped', payload)
        break

      case 'lock-screen':
        emit('lock-screen', payload)
        break

      case 'unlock-screen':
        emit('unlock-screen', payload)
        break

      case 'focus-status':
        emit('focus-status', payload)
        break

      default:
        emit(type, payload)
    }
  }

  const send = (type: string, payload: any = {}) => {
    if (ws.value && isConnected.value) {
      ws.value.send(JSON.stringify({ type, payload }))
    }
  }

  const joinRoom = (room: string, name: string, role: 'teacher' | 'student') => {
    userRole.value = role
    send('join-room', { roomId: room, name, role })
  }

  const leaveRoom = () => {
    send('leave-room', { roomId: roomId.value })
  }

  const sendChatMessage = (content: string) => {
    send('chat-message', { content })
  }

  const disconnect = () => {
    if (ws.value) {
      ws.value.close()
      ws.value = null
    }
    isConnected.value = false
  }

  // 白板相关
  const sendWhiteboardDraw = (drawData: any) => {
    send('whiteboard-draw', drawData)
  }

  const sendWhiteboardClear = () => {
    send('whiteboard-clear', {})
  }

  // 屏幕锁定相关
  const sendLockScreen = (targetStudentId?: string) => {
    send('lock-screen', { targetStudentId })
  }

  const sendUnlockScreen = (targetStudentId?: string) => {
    send('unlock-screen', { targetStudentId })
  }

  // 学生焦点状态上报
  const sendFocusStatus = (isFocused: boolean) => {
    send('focus-status', { isFocused })
  }

  return {
    ws,
    isConnected,
    roomId,
    userId,
    userRole,
    participants,
    messages,
    connect,
    disconnect,
    joinRoom,
    leaveRoom,
    sendChatMessage,
    send,
    on,
    off,
    sendWhiteboardDraw,
    sendWhiteboardClear,
    sendLockScreen,
    sendUnlockScreen,
    sendFocusStatus
  }
}

