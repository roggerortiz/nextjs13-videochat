import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { getUid, scrollToBottom } from '@/helpers/utils'
import { ChatStatus } from '@/helpers/enums/chatStatus'
import { agoraChat } from '@/helpers/agora/chat'
import ChatContext from '.'
import axios from 'axios'

const ChatProvider = (props) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [contact, setContact] = useState(null)
  const [emojis, setEmojis] = useState([])
  const [stickers, setStickers] = useState([])
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [connected, setConnected] = useState(false)
  const [messageInput, setMessageInput] = useState('')
  const [lastMessage, setLastMessage] = useState(null)
  const [chatConnection] = useState(agoraChat.getConnection(connected))

  const signIn = async (username, password) => {
    setLoading(true)

    const loginResult = await agoraChat.openConnection(chatConnection, username, password, onConnected, onTextMessage)

    if (!loginResult) {
      toast.error('Please enter correct username or password')
      setLoading(false)
      return
    }

    const user = {
      message: 'Last message',
      lastSeenDate: '22/10/19',
      status: ChatStatus.SEEN
    }

    const contact = {
      message: 'Last message',
      lastSeenDate: '22/10/19',
      status: ChatStatus.SEEN
    }

    if (username === 'Sender') {
      user.id = 'Sender'
      user.name = 'Sender'
      user.initials = 'S'

      contact.id = 'Receiver'
      contact.name = 'Receiver'
      contact.initials = 'R'
    } else {
      user.id = 'Receiver'
      user.name = 'Receiver'
      user.initials = 'R'

      contact.id = 'Sender'
      contact.name = 'Sender'
      contact.initials = 'S'
    }

    setUser(user)
    setContact(contact)

    toast.success('Login Success')
    router.replace('/')
  }

  const signOut = () => {
    setUser(null)
    setContact(null)

    agoraChat.closeConnection(chatConnection)

    router.replace('/auth/signIn')
  }

  const showSidebar = (response) => {
    if (response) {
      document.querySelector('.sidebar-toggle').classList.add('mobile-menu')
    } else {
      document.querySelector('.sidebar-toggle').classList.remove('mobile-menu')
    }
  }

  const sendMessage = async (messageInput, image) => {
    const status = await agoraChat.sendMessage(chatConnection, contact.id, messageInput, image)

    const id = getUid()
    const now = new Date()
    const time = now.getHours() + ':' + now.getMinutes()
    const message = {
      id,
      status,
      time,
      sender: user.id,
      text: messageInput,
      stickers: image
    }

    setLastMessage(status ? null : message)
    setMessages((prevState) => [...prevState, message])
  }

  const resendMessage = async (lastMessage) => {
    const status = await agoraChat.sendMessage(chatConnection, contact.id, lastMessage.text, lastMessage.stickers)

    setLastMessage(status ? null : lastMessage)
    setMessages((prevState) => [...prevState].map((message) => {
      return (message.id === lastMessage.id) ? { ...message, status } : message
    }))
  }

  const onConnected = () => {
    setLoading(false)
    setConnected(true)
    scrollToBottom('.messages')
  }

  const onTextMessage = async (messageInput, image) => {
    const id = getUid()
    const now = new Date()
    const time = now.getHours() + ':' + now.getMinutes()

    const message = {
      id,
      time,
      sender: contact?.id ?? '',
      text: messageInput,
      stickers: image,
      status: true
    }

    setMessages((prevState) => [...prevState, message])
  }

  useEffect(() => {
    return () => agoraChat.closeConnection(chatConnection)
  }, [])

  useEffect(() => {
    if (user) {
      axios.get('/api/emoji.json').then(({ data }) => setEmojis(data ?? []))
      axios.get('/api/sticker.json').then(({ data }) => setStickers(data ?? []))

      setMessages([
        { id: getUid(), sender: 'Sender', time: '01:27 AM', text: 'Hi I am Alan,', stickers: '', status: true },
        { id: getUid(), sender: 'Sender', time: '01:27 AM', text: 'your personal assistant to help you &#128512;', stickers: '', status: false },
        { id: getUid(), sender: 'Receiver', time: '01:35 AM', text: 'Hi I am Josephin, can you help me to find best chat app?.', stickers: '', status: true },
        { id: getUid(), sender: 'Receiver', time: '01:35 AM', text: 'it should from elite auther &#128519;', stickers: '', status: true },
        { id: getUid(), sender: 'Sender', time: '01:40 AM', text: 'Sure, chitchat is best theme for chating project, you can it check', stickers: '', status: true },
        { id: getUid(), sender: 'Receiver', time: '01:42 AM', text: 'I think it&apos;s best for my project.', stickers: '', status: true }
      ])
    }
  }, [user])

  useEffect(() => {
    if (messages.length) {
      scrollToBottom('.messages')
    }
  }, [messages])

  return (
    <ChatContext.Provider
      value={{
        user,
        contact,
        loading,
        emojis,
        stickers,
        messages,
        isTyping,
        messageInput,
        lastMessage,
        signIn,
        signOut,
        showSidebar,
        sendMessage,
        resendMessage,
        setLoading,
        setIsTyping,
        setMessageInput,
        setLastMessage
      }}
    >
      {props.children}
    </ChatContext.Provider>
  )
}

export default ChatProvider
