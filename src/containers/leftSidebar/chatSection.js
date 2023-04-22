import { LogOut } from 'react-feather'
import { TabContent, TabPane } from 'reactstrap'
import { ChatStatus } from '@/helpers/enums/chatStatus'
import { useChat } from '@/helpers/context/chatContext'

const ChatSection = () => {
  const { contact, signOut } = useChat()

  const getStatusClassName = status => {
    if (status === ChatStatus.SENDING) {
      return 'font-dark'
    } else if (status === ChatStatus.FAILED) {
      return 'font-danger'
    } else {
      return 'font-success'
    }
  }

  const handleShowChat = () => {
    document.querySelector('.sidebar-toggle').classList.add('mobile-menu')
  }

  return (
    <div className='chat custom-scroll'>
      <div className='theme-title'>
        <div className='media align-items-center'>
          <div>
            <h2 className='mt-1'>
              Chat
            </h2>
          </div>
          <div className='media-body text-right'>
            <button
              className='icon-btn btn-outline-light btn-sm search contact-search'
              href='#'
              onClick={() => signOut()}
            >
              <LogOut />
            </button>
          </div>
        </div>
      </div>
      <div className='theme-tab tab-sm chat-tabs'>
        <TabContent activeTab='direct'>
          <TabPane
            tabId='direct'
            className='fade show'
            id='direct'
            role='tabpanel'
            aria-labelledby='direct-tab'
          >
            <ul className='chat-main'>
              {contact && (
                <li
                  className='active'
                  onClick={handleShowChat}
                >
                  <div className='chat-box'>
                    <div className='profile bg-info rounded online'>
                      <span>
                        {contact.initials}
                      </span>
                    </div>

                    <div className='details'>
                      <h5>{contact.name}</h5>
                      <h6>{contact.message}</h6>
                    </div>

                    <div className='date-status mt-2'>
                      <h6>{contact.lastSeenDate}</h6>
                      <h6 className={`${getStatusClassName(contact.status)} status`}>
                        {contact.status}
                      </h6>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </TabPane>
        </TabContent>
      </div>
    </div>
  )
}

export default ChatSection
