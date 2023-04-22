import { useChat } from '@/helpers/context/chatContext'

const VideoCallUserInfo = () => {
  const { user, contact } = useChat()

  return (
    <>
      <div className='usersprof'>
        {user && (
          <div className='profile bg-info border rounded online'>
            <span>
              {user.initials}
            </span>
          </div>
        )}

        {contact && (
          <div className='profile bg-info border rounded online'>
            <span>
              {contact.initials}
            </span>
          </div>
        )}
      </div>

      <div className='media-body'>
        <h3>{contact?.shortName}</h3>
      </div>
    </>
  )
}

export default VideoCallUserInfo
