import { ChevronLeft } from 'react-feather';
import { useChat } from '@/helpers/context/chatContext';

const ChatContact = () => {
  const { showSidebar, mainMenu, contact } = useChat();

  return (
    <div className='media left'>
      {contact && (
        <>
          <div className='media-left mr-3'>
            <div className="profile bg-info rounded online">
              <span>
                {contact.initials}
              </span>
            </div>
          </div>

          <div className='media-body'>
            <h5>{contact.shortName}</h5>
            <div className='badge badge-success'>
              Active
            </div>
          </div>
        </>
      )}

      <div className='media-right'>
        <ul>
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
  );
};

export default ChatContact;
