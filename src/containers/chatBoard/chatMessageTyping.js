import Image from 'next/image'
import { useEffect } from 'react'
import { useChat } from '@/helpers/context/chatContext'

const ChatMessageTyping = ({ user }) => {
  const { isTyping, setIsTyping } = useChat()

  useEffect(() => {
    setTimeout(() => {
      setIsTyping(false)
    }, 3000)
  }, [isTyping])

  if (!user || !isTyping) {
    return ''
  }

  return (
    <li className='sent last typing-m'>
      <div className='media'>
        <div className='profile rounded overflow-hidden mr-4'>
          <Image
            className='bg-img'
            src='/images/contact/1.jpg'
            alt={`Avatar - ${user.name}`}
            height={50}
            width={50}
          />
        </div>
        <div className='media-body'>
          <div className='contact-name'>
            <h5>{user.name}</h5>
            <ul className='msg-box'>
              <li>
                <h5>
                  <span className='d-block type'>
                    <span className='d-block typing-loader' />
                  </span>
                </h5>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ChatMessageTyping
