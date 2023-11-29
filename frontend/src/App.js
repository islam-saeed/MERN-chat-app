import io from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import './App.css';


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
    <div className="App">
      <div id="message-container"></div>
        <input type="text" id="message-input" value={inputText} onChange={(e)=>setInputText(e.target.value)}/>
        <button type="submit" id="send-button" onClick={handleSubmit}>Send</button>
    </div>
  );
}

export default App;
