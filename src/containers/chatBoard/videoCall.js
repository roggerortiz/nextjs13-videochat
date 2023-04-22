import classNames from 'classnames'
import { Modal, ModalBody } from 'reactstrap'
import { useVideoCall } from '@/helpers/context/videoCallContext'
import VideoCallPlayer from './videoCallPlayer'
import VideoCallDetails from './videoCallDetails'
import VideoCallActions from './videoCallActions'

const VideoCall = () => {
  const { videoCall, videoMaximize, videoFullScreen, toggleVideoCall } = useVideoCall()

  return (
    <Modal
      centered
      keyboard={false}
      backdrop='static'
      id='videoCallModal'
      isOpen={videoCall}
      toggle={toggleVideoCall}
      className={classNames(
        'fade',
        'show',
        'viddiolog',
        { active: (videoMaximize || videoFullScreen) }
      )}
    >
      <ModalBody>
        <div className='videocall call-modal'>
          <VideoCallPlayer />
          <VideoCallDetails />
          <VideoCallActions />
        </div>
      </ModalBody>
    </Modal>
  )
}

export default VideoCall
