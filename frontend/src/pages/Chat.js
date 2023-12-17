import io from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { IoSend } from "react-icons/io5";

const Chat = () => {
    const socketUrl = process.env.REACT_APP_SOCKET_URL;
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
        <div className="bg-[#222] text-white h-[100vh] w-[100%] flex sm:justify-center sm:items-center flex-col">
            <div id="chat-container" className='sm:w-[80vw] w-[100vw] sm:h-[90vh] h-[100%] bg-[#111] rounded flex flex-col-reverse p-3'>
                <form className='flex justify-around' onSubmit={e=>handleSubmit(e)}>
                <input type="text" id="message-input" className='bg-[#333] rounded-full w-[90%] py-2 px-4 focus:outline-none' placeholder='type a message' autoComplete='off' value={inputText} onChange={(e)=>setInputText(e.target.value)}/>
                <button type="submit" id="send-button" className='rounded-full bg-[#C40234] w-12 h-12 flex justify-center items-center text-xl'><IoSend /></button>
                </form>
                <div id="message-container" className='mx-6 flex flex-col'>
                {messages.map((message)=>{
                    if(message.sender==='you'){
                    return (
                        <div className='flex justify-end' key={message.message}>
                          <div className='p-4 my-4 bg-gray-700 rounded-xl w-fit'>{message.message}</div>
                        </div>
                    )
                    } else if(message.sender==='other'){
                    return (
                        <div className='flex justify-start' key={message.message}>
                          <div className='p-4 my-4 bg-gray-800 rounded-xl w-fit'>{message.message}</div>
                        </div>
                        )
                    }
                })}
                </div>
            </div>
        </div>
    )
}

export default Chat