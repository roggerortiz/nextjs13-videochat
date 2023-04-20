import Chat from './chat'

const ChitChat = () => {
  return (
    <div
      id="content"
      className="chitchat-main small-sidebar"
      style={{ borderLeft: '1px solid #eff7fe' }}
    >
      <Chat />
    </div>
  );
}

export default ChitChat;