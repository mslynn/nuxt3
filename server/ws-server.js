/**
 * 简易 WebSocket 信令服务器
 * 用于在线教室的实时通信
 * 
 * 启动方式: node server/ws-server.js
 */

import { WebSocketServer, WebSocket } from 'ws'

const PORT = 3001
const wss = new WebSocketServer({ port: PORT })

// 房间管理
const rooms = new Map()

// 用户管理
const users = new Map()

console.log(`📡 WebSocket 信令服务器已启动，端口: ${PORT}`)

wss.on('connection', (ws) => {
  const odid = generateId()
  users.set(ws, { odid, roomId: null, name: '', role: '' })

  console.log(`✅ 新用户连接: ${odid}`)

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message)
      handleMessage(ws, data)
    } catch (e) {
      console.error('消息解析失败:', e)
    }
  })

  ws.on('close', () => {
    const user = users.get(ws)
    if (user && user.roomId) {
      leaveRoom(ws, user.roomId)
    }
    users.delete(ws)
    console.log(`❌ 用户断开: ${odid}`)
  })
})

function handleMessage(ws, data) {
  const { type, payload } = data
  const user = users.get(ws)

  switch (type) {
    case 'join-room':
      joinRoom(ws, payload.roomId, payload.name, payload.role)
      break

    case 'leave-room':
      leaveRoom(ws, payload.roomId)
      break

    case 'chat-message':
      broadcastToRoom(user.roomId, {
        type: 'chat-message',
        payload: {
          from: user.odid,
          fromName: user.name,
          content: payload.content,
          time: new Date().toISOString(),
          isTeacher: user.role === 'teacher'
        }
      }, ws)
      break

    case 'offer':
    case 'answer':
    case 'ice-candidate':
      // 转发给目标用户
      sendToUser(payload.targetId, {
        type,
        payload: {
          ...payload,
          from: user.odid
        }
      })
      break

    case 'whiteboard-draw':
      broadcastToRoom(user.roomId, {
        type: 'whiteboard-draw',
        payload: {
          from: user.odid,
          ...payload
        }
      }, ws)
      break

    case 'whiteboard-clear':
      broadcastToRoom(user.roomId, {
        type: 'whiteboard-clear',
        payload: { from: user.odid }
      }, ws)
      break

    case 'screen-share-started':
      console.log(`📺 ${user.name} 开始屏幕共享`)
      broadcastToRoom(user.roomId, {
        type: 'screen-share-started',
        payload: { from: user.odid, name: user.name }
      }, ws)
      break

    case 'screen-share-stopped':
      console.log(`📺 ${user.name} 停止屏幕共享`)
      broadcastToRoom(user.roomId, {
        type: 'screen-share-stopped',
        payload: { from: user.odid }
      }, ws)
      break

    case 'lock-screen':
      // 老师锁定学生屏幕
      if (user.role === 'teacher') {
        if (payload.targetStudentId) {
          // 锁定特定学生
          sendToUser(payload.targetStudentId, {
            type: 'lock-screen',
            payload: { from: user.odid }
          })
        } else {
          // 锁定所有学生
          broadcastToStudents(user.roomId, {
            type: 'lock-screen',
            payload: { from: user.odid }
          })
        }
      }
      break

    case 'unlock-screen':
      if (user.role === 'teacher') {
        if (payload.targetStudentId) {
          sendToUser(payload.targetStudentId, {
            type: 'unlock-screen',
            payload: { from: user.odid }
          })
        } else {
          broadcastToStudents(user.roomId, {
            type: 'unlock-screen',
            payload: { from: user.odid }
          })
        }
      }
      break

    case 'focus-status':
      // 学生上报焦点状态
      console.log(`👁️ ${user.name} 焦点状态: ${payload.isFocused ? '专注' : '未聚焦'}`)
      broadcastToTeachers(user.roomId, {
        type: 'focus-status',
        payload: {
          studentId: user.odid,
          studentName: user.name,
          isFocused: payload.isFocused
        }
      })
      break

    case 'webrtc-offer':
      // 老师发送 offer 给学生
      console.log(`🔗 转发 WebRTC offer: ${user.name} -> ${payload.targetId}`)
      sendToUser(payload.targetId, {
        type: 'webrtc-offer',
        payload: {
          from: user.odid,
          offer: payload.offer
        }
      })
      break

    case 'webrtc-answer':
      // 学生发送 answer 给老师
      console.log(`🔗 转发 WebRTC answer: ${user.name} -> ${payload.targetId}`)
      sendToUser(payload.targetId, {
        type: 'webrtc-answer',
        payload: {
          from: user.odid,
          answer: payload.answer
        }
      })
      break

    case 'webrtc-ice-candidate':
      // 转发 ICE candidate
      sendToUser(payload.targetId, {
        type: 'webrtc-ice-candidate',
        payload: {
          from: user.odid,
          candidate: payload.candidate
        }
      })
      break

    default:
      console.log('未知消息类型:', type)
  }
}

function joinRoom(ws, roomId, name, role) {
  const user = users.get(ws)
  user.roomId = roomId
  user.name = name
  user.role = role

  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Set())
  }
  rooms.get(roomId).add(ws)

  // 获取房间内所有用户
  const participants = []
  rooms.get(roomId).forEach((client) => {
    const u = users.get(client)
    if (u) {
      participants.push({
        id: u.odid,
        name: u.name,
        role: u.role
      })
    }
  })

  // 通知加入者
  send(ws, {
    type: 'room-joined',
    payload: {
      roomId,
      odid: user.odid,
      participants
    }
  })

  // 通知其他人
  broadcastToRoom(roomId, {
    type: 'user-joined',
    payload: {
      user: {
        id: user.odid,
        name: user.name,
        role: user.role
      }
    }
  }, ws)

  console.log(`👤 ${name}(${role}) 加入房间 ${roomId}`)
}

function leaveRoom(ws, roomId) {
  const user = users.get(ws)
  if (!user || !roomId) return

  const room = rooms.get(roomId)
  if (room) {
    room.delete(ws)

    // 通知其他人
    broadcastToRoom(roomId, {
      type: 'user-left',
      payload: { odid: user.odid }
    })

    // 如果房间空了，删除房间
    if (room.size === 0) {
      rooms.delete(roomId)
      console.log(`🚪 房间 ${roomId} 已关闭`)
    }
  }

  user.roomId = null
  console.log(`👤 ${user.name} 离开房间 ${roomId}`)
}

function send(ws, data) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data))
  }
}

function broadcastToRoom(roomId, data, exclude = null) {
  const room = rooms.get(roomId)
  if (!room) {
    console.log(`⚠️ 房间 ${roomId} 不存在，无法广播`)
    return
  }

  let sentCount = 0
  room.forEach((client) => {
    if (client !== exclude) {
      const user = users.get(client)
      console.log(`📤 发送 ${data.type} 给 ${user?.name || '未知用户'}`)
      send(client, data)
      sentCount++
    }
  })
  console.log(`📢 广播 ${data.type} 到房间 ${roomId}，发送给 ${sentCount} 人`)
}

function broadcastToStudents(roomId, data) {
  const room = rooms.get(roomId)
  if (!room) return

  room.forEach((client) => {
    const user = users.get(client)
    if (user && user.role === 'student') {
      send(client, data)
    }
  })
}

function broadcastToTeachers(roomId, data) {
  const room = rooms.get(roomId)
  if (!room) return

  room.forEach((client) => {
    const user = users.get(client)
    if (user && user.role === 'teacher') {
      send(client, data)
    }
  })
}

function sendToUser(targetId, data) {
  for (const [ws, user] of users.entries()) {
    if (user.odid === targetId) {
      send(ws, data)
      break
    }
  }
}

function generateId() {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
}

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n🛑 正在关闭服务器...')
  wss.close(() => {
    console.log('✅ 服务器已关闭')
    process.exit(0)
  })
})

