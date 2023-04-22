import { useEffect } from 'react'
import { useChat } from '@/helpers/context/chatContext'
import ChitChat from '@/containers/chatBoard'
import LeftSidebar from '@/containers/leftSidebar'
import { useRouter } from 'next/router'

export default function Home () {
  const router = useRouter()
  const { user } = useChat()

  useEffect(() => {
    if (!user) {
      router.replace('/auth/signIn')
    }

    document.body.classList.add('sidebar-active')
    document.querySelector('.sidebar-toggle')?.classList.add('mobile-menu')
  }, [])

  if (!user) {
    return ''
  }

  return (
    <div className='chitchat-container sidebar-toggle'>
      <LeftSidebar />
      <ChitChat />
    </div>
  )
}
