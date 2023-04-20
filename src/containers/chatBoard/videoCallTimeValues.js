import { useVideoCall } from '@/helpers/context/videoCallContext';

const VideoCallTimeValues = () => {
  const { timeValues } = useVideoCall();

  return (
    <div
      id='basicUsage'
      className='text-dark mr-2'
    >
      {timeValues}
    </div>
  );
};

export default VideoCallTimeValues;
