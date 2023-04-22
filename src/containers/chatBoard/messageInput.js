import { Send } from 'react-feather'
import { useChat } from '@/helpers/context/chatContext'
import MessageStickers from './messageStickers'
import MessageEmojis from './messageEmojis'

const MessageInput = () => {
  const { messageInput, setMessageInput, sendMessage } = useChat()

  const handleSendMessage = () => {
    if (!messageInput.length) {
      return
    }

    setMessageInput('')
    sendMessage(messageInput, '')
  }

  const handleMessageChange = (e) => {
    const message = e.target.value
    setMessageInput(message)
  }

  const handleMessageDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  const handleMessageClick = () => {
    handleSendMessage()
  }

  return (
    <div className='message-input'>
      <div className='wrap emojis-main'>
        <MessageStickers />

        <MessageEmojis />

        <input
          type='text'
          className='setemoj'
          value={messageInput}
          placeholder='Write your message...'
          onKeyDown={handleMessageDown}
          onChange={handleMessageChange}
        />

        <div>
          <button
            type='button'
            disabled={messageInput.length}
            className={`submit icon-btn btn-primary ml-3 ${messageInput ? '' : 'disabled'}`}
            onClick={handleMessageClick}
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MessageInput
