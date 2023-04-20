import { useEffect } from 'react'
import { useChat } from '@/helpers/context/chatContext';
import ChitChat from '@/containers/chatBoard';
import LeftSidebar from '@/containers/leftSidebar';

export default function Home() {
  const { user } = useChat()

  useEffect(() => {
    document.body.classList.add('sidebar-active');
  }, [])

  if (!user) {
    return <></>
  }

  return (
    <div className="chitchat-container sidebar-toggle">
      <LeftSidebar />
      <ChitChat />
    </div>
  )
}
