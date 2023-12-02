import io from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { IoSend } from "react-icons/io5";

function App() {

  const socketUrl = 'http://localhost:3000';
  let socket = useRef(null);
  const [inputText, setInputText] = useState('');
  const [ messages, setMessages] = useState([]);

  useEffect(() => {
    socket.current = io(socketUrl, {
      autoConnect: false,
    });
  
    socket.current.connect()

    socket.current.on("connect", () => {
      console.log("Connected to the server");
    });
  
    socket.current.on("incoming-message", (data) => {
      setMessages(prev => [...prev, { sender: 'other', message: data}])
    });
    
    return () => {
      socket.current.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(inputText && socket.current)
      socket.current.emit("new-message", inputText);
      setMessages(prev => [...prev, { sender: 'you', message: inputText}])
      setInputText('');
  };

  return (
    <div className="App bg-[#222] text-white h-[100vh] w-[100%] flex justify-center items-center flex-col-reverse">
      <div id="chat-container" className='w-[80vw] h-[90vh] bg-[#111] rounded flex flex-col-reverse p-3'>
        <form className='flex justify-around' onSubmit={e=>handleSubmit(e)}>
          <input type="text" id="message-input" className='bg-[#333] rounded-full w-[90%] py-2 px-4 focus:outline-none' placeholder='type a message' autoComplete='off' value={inputText} onChange={(e)=>setInputText(e.target.value)}/>
          <button type="submit" id="send-button" className='rounded-full bg-[#C40234] w-12 h-12 flex justify-center items-center text-xl'><IoSend /></button>
        </form>
        <div id="message-container" className='mx-6 flex flex-col'>
          {messages.map((message)=>{
            if(message.sender==='you'){
              return (
                <div className='flex justify-end'>
                <div className='p-4 my-4 bg-gray-700 rounded-xl w-fit'>{message.message}</div>
                </div>
              )
            } else if(message.sender==='other'){
              return (
                <div className='flex justify-start'>
                <div className='p-4 my-4 bg-gray-800 rounded-xl w-fit'>{message.message}</div>
                </div>
                )
              }
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
