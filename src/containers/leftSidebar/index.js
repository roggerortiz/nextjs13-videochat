import { useEffect } from 'react'
import ChatSection from './chatSection'
import { scrollToBottom } from '@/helpers/utils'

const LeftSidebar = () => {
  const updateSize = () => {
    scrollToBottom('.messages')
  }

  useEffect(() => {
    updateSize()
    window.addEventListener('resize', updateSize)

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <aside className='chitchat-left-sidebar left-disp'>
      <div className='recent-default dynemic-sidebar active'>
        <ChatSection />
      </div>
    </aside>
  )
}

export default LeftSidebar
