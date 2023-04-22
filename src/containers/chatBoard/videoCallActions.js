import { Mic, MicOff, Phone, Video, VideoOff } from 'react-feather'
import { useVideoCall } from '@/helpers/context/videoCallContext'

const VideoCallActions = () => {
  const { muteVideo, muteAudio, toggleVideoCall, toggleMuteVideo, toggleMuteAudio } = useVideoCall()

  return (
    <div className='center-con text-center'>
      <ul>
        <li>
          <button
            type='button'
            data-tippy-content='Hold'
            className='icon-btn btn-light button-effect pause'
            onClick={toggleMuteVideo}
          >
            {muteVideo ? <VideoOff /> : <Video />}
          </button>
        </li>
        <li>
          <button
            type='button'
            className='icon-btn btn-danger button-effect btn-xl is-animating'
            onClick={toggleVideoCall}
          >
            <Phone />
          </button>
        </li>
        <li>
          <button
            type='button'
            data-tippy-content='Mute'
            className='icon-btn btn-light button-effect mic'
            onClick={toggleMuteAudio}
          >
            {muteAudio ? <MicOff /> : <Mic />}
          </button>
        </li>
      </ul>
    </div>
  )
}

export default VideoCallActions
