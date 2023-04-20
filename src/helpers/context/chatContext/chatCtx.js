import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getUid, scrollToBottom } from '@/helpers/utils';
import { ChatStatus } from '@/helpers/enums/chatStatus';
import { agoraChat } from '@/helpers/agora/chat';
import ChatContext from ".";
import axios from 'axios';

const ChatProvider = (props) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [contact, setContact] = useState(null)
  const [emojis, setEmojis] = useState([])
  const [stickers, setStickers] = useState([])
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    { id: getUid(), sender: 'Sender', time: '01:27 AM', text: 'Hi I am Alan,', stickers: '', status: true },
    { id: getUid(), sender: 'Sender', time: '01:27 AM', text: 'your personal assistant to help you &#128512;', stickers: '', status: false },
    { id: getUid(), sender: 'Receiver', time: '01:35 AM', text: 'Hi I am Josephin, can you help me to find best chat app?.', stickers: '', status: true },
    { id: getUid(), sender: 'Receiver', time: '01:35 AM', text: 'it should from elite auther &#128519;', stickers: '', status: true },
    { id: getUid(), sender: 'Sender', time: '01:40 AM', text: 'Sure, chitchat is best theme for chating project, you can it check', stickers: '', status: true },
    { id: getUid(), sender: 'Receiver', time: '01:42 AM', text: 'I think it&apos;s best for my project.', stickers: '', status: true },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [connected, setConnected] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [chatConnection] = useState(agoraChat.getConnection(connected));

  const signIn = async (username, password) => {
    setLoading(true)

    const loginResult = await agoraChat.openConnection(chatConnection, username, password);

    if (!loginResult) {
      toast.error('Please enter correct username or password')
      setLoading(false)
      return
    }

    agoraChat.setEvents(chatConnection, { onConnected, onTextMessage })

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
    }
    else {
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
    agoraChat.closeConnection(chatConnection)
    setUser(null)
    setContact(null)
    router.replace('/auth/signIn')
  }

  const showSidebar = (response) => {
    if (response) {
      document.querySelector('.sidebar-toggle').classList.add('mobile-menu');
    } else {
      document.querySelector('.sidebar-toggle').classList.remove('mobile-menu');
    }
  };

  const sendMessage = async (messageInput, image) => {
    const id = getUid();
    const now = new Date();
    const time = now.getHours() + ':' + now.getMinutes();

    const status = await agoraChat.sendMessage(chatConnection, contact.id, messageInput, image);
    const message = {
      id,
      status,
      time: time,
      sender: user.id,
      text: messageInput,
      stickers: image,
    };

    setMessages([...messages, message]);
  }

  const onConnected = () => {
    setLoading(false)
    setConnected(true)
    scrollToBottom('.messages');
  }

  const onTextMessage = (messageInput, image) => {
    const id = getUid();
    const now = new Date();
    const time = now.getHours() + ':' + now.getMinutes();

    const message = {
      id,
      time: time,
      sender: contact.Id,
      text: messageInput,
      stickers: image,
      status: true,
    };

    setMessages([...messages, message]);
  };

  useEffect(() => {
    if (!user) {
      router.push('/auth/signIn')
    }

    return () => agoraChat.closeConnection(chatConnection)
  }, [])

  useEffect(() => {
    if (user) {
      axios.get("/api/emoji.json").then(({ data }) => setEmojis(data ?? []));
      axios.get("/api/sticker.json").then(({ data }) => setStickers(data ?? []));
    }
  }, [user])

  useEffect(() => {
    if (user) {
      scrollToBottom('.messages');
    }
  }, [
    user,
    messages
  ])

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
        signIn,
        signOut,
        setLoading,
        showSidebar,
        setIsTyping,
        setMessageInput,
        sendMessage
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
