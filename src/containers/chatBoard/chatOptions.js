import dynamic from 'next/dynamic';
import { Tooltip } from 'react-tippy';
import { Video } from 'react-feather';
import { useVideoCall } from '@/helpers/context/videoCallContext';

const VideoCall = dynamic(import('./videoCall'), { ssr: false });

const ChatOptions = () => {
  const { toggleVideoCall } = useVideoCall();

  return (
    <ul className='calls text-right'>
      <li>
        <Tooltip
          title='Quick Video Call'
          position='bottom-end'
          trigger='mouseenter'
        >
          <button
            type='button'
            className='icon-btn btn-light button-effect'
            onClick={toggleVideoCall}
          >
            <Video />
          </button>
        </Tooltip>

        <VideoCall />
      </li>
    </ul>
  );
};

export default ChatOptions;
