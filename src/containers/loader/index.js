import { useChat } from '@/helpers/context/chatContext'

const Loader = ({ title = 'Loading...' }) => {
  const { loading } = useChat()

  if (!loading) {
    return ''
  }

  return (
    <div className='block-ui'>
      <div className='block-ui-overlay' />
      <div className='block-ui-message-container'>
        <div className='block-ui-message'>
          <div className='block-ui-loader'>
            <span>
              <i className='fa fa-circle-notch fa-spin me-2' />
              {title}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader
