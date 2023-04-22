import { createContext, useContext } from 'react'

const VideoCallContext = createContext()

export const useVideoCall = () => {
  const context = useContext(VideoCallContext)

  if (context === undefined) {
    throw new Error('useVideoCall must be used within a VideoCallProvider')
  }

  return context
}

export default VideoCallContext
