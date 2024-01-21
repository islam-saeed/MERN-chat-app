import ChatBox from '../components/ChatBox';
import Sidebar from '../components/Sidebar';
import { IoLogOutOutline } from "react-icons/io5";
import { useCookies } from 'react-cookie';
import { useContext } from 'react';
import { userContext } from '../context/UserContext';

const Chat = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [user, setUser] = useContext(userContext)
    return (
      <div>
        <div className='absolute right-5 top-10 flex justify-center items-center text-white text-5xl cursor-pointer'>
          <IoLogOutOutline onClick={()=> {
            setUser({})
            removeCookie('user');
          }} />
        </div>
        <Sidebar />
        <ChatBox />
      </div>
    )
}

export default Chat