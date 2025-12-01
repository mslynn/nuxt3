// WebRTC 音视频通信管理
export const useWebRTC = () => {
  const localStream = ref<MediaStream | null>(null)
  const screenStream = ref<MediaStream | null>(null)
  const remoteStreams = ref<Map<string, MediaStream>>(new Map())
  const peerConnections = ref<Map<string, RTCPeerConnection>>(new Map())
  const isScreenSharing = ref(false)
  const isCameraOn = ref(false)
  const isMicOn = ref(false)

  // ICE 服务器配置
  const iceServers: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' }
    ]
  }

  // 获取用户媒体流（摄像头/麦克风）
  const getUserMedia = async (video = true, audio = true) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: video ? { width: 1280, height: 720 } : false,
        audio: audio ? { echoCancellation: true, noiseSuppression: true } : false
      })
      localStream.value = stream
      isCameraOn.value = video
      isMicOn.value = audio
      return stream
    } catch (error) {
      console.error('获取媒体流失败:', error)
      throw error
    }
  }

  // 获取屏幕共享流
  const getScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 }
        },
        audio: true
      })

      // 监听屏幕共享停止
      stream.getVideoTracks()[0].onended = () => {
        stopScreenShare()
      }

      screenStream.value = stream
      isScreenSharing.value = true
      return stream
    } catch (error) {
      console.error('获取屏幕共享失败:', error)
      throw error
    }
  }

  // 停止屏幕共享
  const stopScreenShare = () => {
    if (screenStream.value) {
      screenStream.value.getTracks().forEach(track => track.stop())
      screenStream.value = null
    }
    isScreenSharing.value = false
  }

  // 创建 PeerConnection
  const createPeerConnection = (
    peerId: string,
    onIceCandidate: (candidate: RTCIceCandidate) => void,
    onTrack: (stream: MediaStream) => void
  ) => {
    const pc = new RTCPeerConnection(iceServers)

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        onIceCandidate(event.candidate)
      }
    }

    pc.ontrack = (event) => {
      const stream = event.streams[0]
      remoteStreams.value.set(peerId, stream)
      onTrack(stream)
    }

    pc.onconnectionstatechange = () => {
      console.log(`PeerConnection ${peerId} 状态: ${pc.connectionState}`)
      if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
        closePeerConnection(peerId)
      }
    }

    peerConnections.value.set(peerId, pc)
    return pc
  }

  // 添加本地流到 PeerConnection
  const addLocalStreamToPeer = (peerId: string) => {
    const pc = peerConnections.value.get(peerId)
    if (pc && localStream.value) {
      localStream.value.getTracks().forEach(track => {
        pc.addTrack(track, localStream.value!)
      })
    }
  }

  // 添加屏幕共享流到 PeerConnection
  const addScreenStreamToPeer = (peerId: string) => {
    const pc = peerConnections.value.get(peerId)
    if (pc && screenStream.value) {
      screenStream.value.getTracks().forEach(track => {
        pc.addTrack(track, screenStream.value!)
      })
    }
  }

  // 创建 Offer
  const createOffer = async (peerId: string) => {
    const pc = peerConnections.value.get(peerId)
    if (!pc) return null

    try {
      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)
      return offer
    } catch (error) {
      console.error('创建 Offer 失败:', error)
      throw error
    }
  }

  // 创建 Answer
  const createAnswer = async (peerId: string, offer: RTCSessionDescriptionInit) => {
    const pc = peerConnections.value.get(peerId)
    if (!pc) return null

    try {
      await pc.setRemoteDescription(new RTCSessionDescription(offer))
      const answer = await pc.createAnswer()
      await pc.setLocalDescription(answer)
      return answer
    } catch (error) {
      console.error('创建 Answer 失败:', error)
      throw error
    }
  }

  // 设置远程描述
  const setRemoteDescription = async (peerId: string, description: RTCSessionDescriptionInit) => {
    const pc = peerConnections.value.get(peerId)
    if (!pc) return

    try {
      await pc.setRemoteDescription(new RTCSessionDescription(description))
    } catch (error) {
      console.error('设置远程描述失败:', error)
      throw error
    }
  }

  // 添加 ICE Candidate
  const addIceCandidate = async (peerId: string, candidate: RTCIceCandidateInit) => {
    const pc = peerConnections.value.get(peerId)
    if (!pc) return

    try {
      await pc.addIceCandidate(new RTCIceCandidate(candidate))
    } catch (error) {
      console.error('添加 ICE Candidate 失败:', error)
    }
  }

  // 关闭指定 PeerConnection
  const closePeerConnection = (peerId: string) => {
    const pc = peerConnections.value.get(peerId)
    if (pc) {
      pc.close()
      peerConnections.value.delete(peerId)
      remoteStreams.value.delete(peerId)
    }
  }

  // 切换摄像头
  const toggleCamera = () => {
    if (localStream.value) {
      const videoTrack = localStream.value.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        isCameraOn.value = videoTrack.enabled
      }
    }
  }

  // 切换麦克风
  const toggleMic = () => {
    if (localStream.value) {
      const audioTrack = localStream.value.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        isMicOn.value = audioTrack.enabled
      }
    }
  }

  // 清理所有资源
  const cleanup = () => {
    // 停止本地流
    if (localStream.value) {
      localStream.value.getTracks().forEach(track => track.stop())
      localStream.value = null
    }

    // 停止屏幕共享
    stopScreenShare()

    // 关闭所有 PeerConnection
    peerConnections.value.forEach((pc, peerId) => {
      pc.close()
    })
    peerConnections.value.clear()
    remoteStreams.value.clear()

    isCameraOn.value = false
    isMicOn.value = false
  }

  return {
    localStream,
    screenStream,
    remoteStreams,
    peerConnections,
    isScreenSharing,
    isCameraOn,
    isMicOn,
    getUserMedia,
    getScreenShare,
    stopScreenShare,
    createPeerConnection,
    addLocalStreamToPeer,
    addScreenStreamToPeer,
    createOffer,
    createAnswer,
    setRemoteDescription,
    addIceCandidate,
    closePeerConnection,
    toggleCamera,
    toggleMic,
    cleanup
  }
}

