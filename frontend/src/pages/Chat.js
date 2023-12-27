import ChatBox from '../components/ChatBox';
import Sidebar from '../components/Sidebar';

const Chat = () => {
    
    return (
      <div className='grid grid-cols-12 gap-4'>
        <Sidebar />
        <ChatBox />
      </div>
    )
}

export default Chat