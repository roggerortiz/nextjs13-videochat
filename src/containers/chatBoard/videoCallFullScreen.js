import { toggleFullScreen } from '@/helpers/utils';
import { useVideoCall } from '@/helpers/context/videoCallContext';
import { Maximize, Minimize } from 'react-feather';

const VideoCallFullScreen = () => {
  const { videoFullScreen } = useVideoCall();

  const handleToggleVideoScreen = (e) => {
    e.preventDefault();
    toggleFullScreen('#videoCallModal');
  }

  return (
    <div className='zoomcontent'>
      <a
        href='#'
        className='text-dark'
        onClick={handleToggleVideoScreen}
      >
        {videoFullScreen ? <Minimize /> : <Maximize />}
      </a>
    </div>
  );
};

export default VideoCallFullScreen;
