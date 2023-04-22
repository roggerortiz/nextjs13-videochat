import { createContext, useContext } from 'react'

const ChatContext = createContext()

export const useChat = () => {
  const context = useContext(ChatContext)

  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }

  return context
}

export default ChatContext
