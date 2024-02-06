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
    // current user
    const [user, setUser] = useContext(userContext)

    // active users list
    const [users, setUsers] = useContext(usersContext)

    // socket server url
    const socketUrl = process.env.REACT_APP_SOCKET_URL;

    // using reference to avoid re-rendering
    let socket = useRef(null);

    // for chat input text
    const [inputText, setInputText] = useState('');

    // for message display
    const [ messages, setMessages] = useState([]);
  
    // setting the socket events for each user
    useEffect(() => {

      // initializing the reference
      socket.current = io(socketUrl, {
        autoConnect: false,
        query: {
          token: user.token
        }
      });
      
      
      // connecting to the socket server
      socket.current.connect()
  
      // sending the user info to the socket server
      socket.current.on("connect", () => {
        socket.current.emit("new-user", {id:user.user._id, username: user.user.name, imgURL: user.user.imgURL? user.user.imgURL : ""});
        console.log("Connected to the server");
      });


      // listening for incoming messages
      socket.current.on("incoming-message", (data) => {
        setMessages(prev => [...prev, { sender: data.sender, message: data.message, createdAt: data.createdAt}])
      });

      // listening for new users joining
      socket.current.on("update-users", (data) => {
        setUsers(data.filter(activeUser=>activeUser.id!==user.user._id));
        console.log('users updated')
      });

      // tell the server on disconnection
      return () => {
        console.log('disconnect')
        socket.current.emit('disconnect-event', user.user._id);
        socket.current.disconnect();
      };
    }, [user]);
  
    // send data to the socket server on submit
    const handleSubmit = (e) => {
      e.preventDefault();
      if(inputText && socket.current)
        socket.current.emit("new-message", {sender: user.user.name, message: inputText, createdAt: Date.now()});
        setMessages(prev => [...prev, { sender: user.user.name, message: inputText, createdAt: Date.now()}])
        setInputText('');
    };
  return (
      <div className="bg-[#222] text-white h-[100vh] w-[100%] flex sm:justify-center sm:items-center flex-col col-span-10">
        <div id="chat-container" className='sm:w-[80vw] w-[100vw] sm:h-[90vh] h-[100%] bg-[#111] rounded flex flex-col-reverse p-3'>
            <form className='flex justify-around' onSubmit={e=>handleSubmit(e)}>
            <InputEmoji value={inputText} onChange={(newMessage)=>setInputText(newMessage)} />
            <button type="submit" id="send-button" className='rounded-full bg-[#C40234] w-12 h-12 flex justify-center items-center text-xl'><IoSend /></button>
            </form>
            <div id="message-container" className='mx-6 flex flex-col'>
            {messages.map((message)=>{
              return(
                <div>
                  <div>
                    <h3 className='inline-block text-xl font-semibold mr-4'>{message.sender}</h3>
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