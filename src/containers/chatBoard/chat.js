import MessageInput from './messageInput';
import ChatMessages from './chatMessages';
import ChatContact from './chatContact';
import ChatOptions from './chatOptions';

const Chat = () => {
  return (
    <>
      <div className='messages custom-scroll active wallpapers' id='chating'>
        <div className='contact-details'>
          <div className='row'>
            <div className='col-7'>
              <ChatContact />
            </div>
            <div className='col'>
              <ChatOptions />
            </div>
          </div>
        </div>
        <ChatMessages />
      </div>

      <MessageInput />
    </>
  );
};

export default Chat;
