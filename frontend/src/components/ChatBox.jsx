import io from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import React from 'react'
import { IoSend } from "react-icons/io5";
import { useContext } from 'react';
import { userContext } from '../context/UserContext';
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'
import { usersContext } from '../context/UsersContext';

const ChatBox = () => {
    const [user, setUser] = useContext(userContext)
    const [users, setUsers] = useContext(usersContext)
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
        socket.current.emit("new-user", {id:user.user._id, username: user.user.name, imgURL: user.user.imgURL? user.user.imgURL : ""});
        console.log("Connected to the server");
      });

    
      socket.current.on("incoming-message", (data) => {
        setMessages(prev => [...prev, { sender: data.sender, message: data.message, createdAt: data.createdAt}])
      });

      socket.current.on("update-users", (data) => {
        setUsers(data.filter(activeUser=>activeUser.id!==user.user._id));
        console.log('users updated')
      });

      return () => {
        console.log('disconnect')
        socket.current.emit('disconnect-event', user.user._id);
        socket.current.disconnect();
      };
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if(inputText && socket.current)
        socket.current.emit("new-message", {sender: user.data.user.name, message: inputText, createdAt: Date.now()});
        setMessages(prev => [...prev, { sender: user.data.user.name, message: inputText, createdAt: Date.now()}])
        setInputText('');
    };
  return (
    <div className="bg-[#222] text-white h-[100vh] w-[100%] flex sm:justify-center sm:items-center flex-col col-span-10">
            <div id="chat-container" className='sm:w-[80vw] w-[100vw] sm:h-[90vh] h-[100%] bg-[#111] rounded flex flex-col-reverse p-3'>
                <form className='flex justify-around' onSubmit={e=>handleSubmit(e)}>
                {/* <input type="text" id="message-input" className='bg-[#333] rounded-full w-[90%] py-2 px-4 focus:outline-none' placeholder='type a message' autoComplete='off' value={inputText} onChange={(e)=>setInputText(e.target.value)}/> */}
                <InputEmoji value={inputText} onChange={(newMessage)=>setInputText(newMessage)} />
                <button type="submit" id="send-button" className='rounded-full bg-[#C40234] w-12 h-12 flex justify-center items-center text-xl'><IoSend /></button>
                </form>
                <div id="message-container" className='mx-6 flex flex-col'>
                {messages.map((message)=>{
                  return(
                    <div>
                      <div>
                        <h3 className='inline-block text-xl font-semibold mr-4'>{user.data.user.name}</h3>
                        <span className='text-gray-400'>{format(message.createdAt)}</span>
                      </div>
                      <p>{message.message}</p>
                    </div>
                  )
                })}
                </div>
            </div>
        </div>
  )
}

export default ChatBox