import Image from "next/image";
import { RotateCw } from "react-feather";

const ChatMessageReplies = ({ user, message }) => {
  const handleRefreshCw = (e) => {
    e.currentTarget.classList.toggle('refreshed');
  };

  if (!user) {
    return ''
  }

  return (
    <li className='replies'>
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

                {!message.status && (
                  <div className='refresh-block'>
                    <div
                      className='badge badge-outline-primary refresh sm ml-2'
                      onClick={handleRefreshCw}
                    >
                      <RotateCw />
                    </div>
                    <div className='badge badge-danger sm ml-2'>F</div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ChatMessageReplies;
