import VideoCallUserInfo from './videoCallUserInfo';
import VideoCallVideoInputs from './videoCallVideoInputs';
import VideoCallAudioInputs from './videoCallAudioInputs';
import VideoCallFullScreen from './videoCallFullScreen';
import VideoCallTimeValues from './videoCallTimeValues';
import VideoCallMaximize from './videoCallMaximize';

const VideoCallDetails = () => {
  return (
    <div className='media videocall-details px-3 py-2'>
      <VideoCallUserInfo />
      <div className='d-flex align-items-center'>
        <VideoCallTimeValues />
        <VideoCallVideoInputs />
        <VideoCallAudioInputs />
        <VideoCallMaximize />
        <VideoCallFullScreen />
      </div>
    </div>
  );
};

export default VideoCallDetails;
