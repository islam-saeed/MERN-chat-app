import io from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { IoSend } from "react-icons/io5";

function App() {

  const socketUrl = 'http://localhost:3000';
  let socket = useRef(null);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    socket.current = io(socketUrl, {
      autoConnect: false,
    });
  
    socket.current.connect()

    socket.current.on("connect", () => {
      console.log("Connected to the server");
    });
  
    
    return () => {
      socket.current.disconnect();
    };
  }, []);


  useEffect(()=>{
    socket.current.on("incoming-message", (data) => {
      console.log(data);
    });
  }, [socket.current])

  const handleSubmit = () => {
    if(inputText && socket.current)
      socket.current.emit("new-message", inputText);
  };

  return (
    <div className="App bg-[#222] text-white h-[100vh] w-[100%] flex justify-center items-center flex-col-reverse">
      <div id="chat-container" className='w-[80vw] h-[90vh] bg-[#111] rounded flex flex-col-reverse p-3'>
        <div id="message-container"></div>
        <div className='flex justify-around'>
          <input type="text" id="message-input" className='bg-[#333] rounded-full w-[90%] py-2 px-4 focus:outline-none' placeholder='type a message' autoComplete='off' value={inputText} onChange={(e)=>setInputText(e.target.value)}/>
          <button type="submit" id="send-button" className='rounded-full bg-[#C40234] w-12 h-12 flex justify-center items-center text-xl' onClick={handleSubmit}><IoSend /></button>
        </div>
      </div>
    </div>
  );
}

export default App;
