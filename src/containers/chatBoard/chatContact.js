import dynamic from 'next/dynamic'
import { Tooltip } from 'react-tippy'
import { ChevronLeft, Video } from 'react-feather'
import { useChat } from '@/helpers/context/chatContext'
import { useVideoCall } from '@/helpers/context/videoCallContext'

const VideoCall = dynamic(import('./videoCall'), { ssr: false })

const ChatContact = () => {
  const { showSidebar, mainMenu, contact } = useChat()
  const { toggleVideoCall } = useVideoCall()

  return (
    <div className='media left'>
      {contact && (
        <>
          <div className='media-left mr-3'>
            <div className='profile bg-info rounded online'>
              <span>
                {contact.initials}
              </span>
            </div>
          </div>

          <div className='media-body'>
            <h5>{contact.name}</h5>
            <div className='badge badge-success'>
              Active
            </div>
          </div>
        </>
      )}

      <div className='media-right'>
        <ul>
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
          <li>
            <button
              type='button'
              className='icon-btn btn-light button-effect mobile-sidebar'
              onClick={() => showSidebar(mainMenu)}
            >
              <ChevronLeft />
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ChatContact
