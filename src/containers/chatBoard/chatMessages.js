import { useChat } from '@/helpers/context/chatContext'
import ChatMessageReplies from './chatMessageReplies'
import ChatMessageSent from './chatMessageSent'
import ChatMessageTyping from './chatMessageTyping'

const ChatMessages = () => {
  const { user, contact, messages } = useChat()

  return (
    <div className='contact-chat pb-0'>
      <ul className='chatappend'>
        {user && messages.map(message => {
          if (message.sender === user.id) {
            return (
              <ChatMessageReplies
                key={message.id}
                user={user}
                message={message}
              />
            )
          }

          return (
            <ChatMessageSent
              key={message.id}
              user={contact}
              message={message}
            />
          )
        })}

        <ChatMessageTyping
          user={contact}
        />
      </ul>
    </div>
  )
}

export default ChatMessages
