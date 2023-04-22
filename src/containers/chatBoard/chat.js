import MessageInput from './messageInput'
import ChatMessages from './chatMessages'
import ChatContact from './chatContact'

const Chat = () => {
  return (
    <>
      <div className='messages custom-scroll active wallpapers' id='chating'>
        <div className='contact-details'>
          <div className='row'>
            <div className='col-12'>
              <ChatContact />
            </div>
          </div>
        </div>
        <ChatMessages />
      </div>
      <MessageInput />
    </>
  )
}

export default Chat
