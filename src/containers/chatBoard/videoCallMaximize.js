import { useVideoCall } from '@/helpers/context/videoCallContext'
import { Maximize2, Minimize2 } from 'react-feather'

const VideoCallMaximize = () => {
  const { videoFullScreen, videoMaximize, toggleVideoMaximize } = useVideoCall()

  const handleToggleVideoScreen = (e) => {
    e.preventDefault()
    toggleVideoMaximize()
  }

  if (videoFullScreen) {
    return ''
  }

  return (
    <div className='zoomcontent mr-2'>
      <a
        href='#'
        className='text-dark'
        onClick={handleToggleVideoScreen}
      >
        {videoMaximize ? <Minimize2 /> : <Maximize2 />}
      </a>
    </div>
  )
}

export default VideoCallMaximize
