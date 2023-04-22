import AgoraChat from 'agora-chat'
import { AGORA_CHAT_APP_KEY } from '../env'

const getConnection = (connected) => {
  if (connected) {
    return
  }

  // eslint-disable-next-line new-cap
  const connection = new AgoraChat.connection({
    appKey: AGORA_CHAT_APP_KEY
  })

  return connection
}

const openConnection = async (connection, username, password, onConnected, onTextMessage) => {
  try {
    connection.addEventHandler('connection&message', {
      onConnected: () => {
        console.log('Connect success !')
        onConnected()
      },
      onDisconnected: () => {
        console.log('Logout success !')
      },
      onTextMessage: ({ msg }) => {
        const [type, ...messages] = msg.split('|')
        const message = messages.join('|')

        if (type === 'text') {
          onTextMessage(message, '')
        } else if (type === 'stickers') {
          onTextMessage('', message)
        }
      }
    })

    const loginResult = await connection.open({
      user: username,
      pwd: password
    })

    return loginResult
  } catch {
    return null
  }
}

const closeConnection = (connection) => {
  try {
    connection.close()
  } catch { }
}

const sendMessage = async (connection, peerUserId, messageInput, image) => {
  try {
    const message = AgoraChat.message.create({
      type: 'txt', // Sets the message type.
      chatType: 'singleChat', // Sets the chat type as single chat.
      to: peerUserId, // Sets the recipient of the message with user ID.
      msg: messageInput ? `text|${messageInput}` : `stickers|${image}` // Sets the message content.
    })

    await connection.send(message)

    return true
  } catch {
    return false
  }
}

export const agoraChat = {
  getConnection,
  openConnection,
  closeConnection,
  sendMessage
}
