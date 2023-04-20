import Image from "next/image";

const ChatMessageSent = ({ user, message }) => {
  if (!user) {
    return ''
  }

  return (
    <li className='sent'>
      <div className='media'>
        <div className="profile bg-info rounded mr-4">
          <span>
            {user.initials}
          </span>
        </div>

        <div className='media-body'>
          <div className='contact-name'>
            <h5>{user.shortName}</h5>
            <h6>{message.time}</h6>
            <ul className='msg-box'>
              <li className='msg-setting-main'>
                {message.text.length && (
                  <h5 dangerouslySetInnerHTML={{ __html: message.text }} />
                )}

                {message.stickers && (
                  <Image
                    src={message.stickers}
                    alt={message.stickers}
                    height={110}
                    width={130}
                  />
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ChatMessageSent;
