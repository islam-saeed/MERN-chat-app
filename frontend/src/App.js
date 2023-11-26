import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [socket, setSocket] = useState(null);
  const [inputText, setInputText] = useState('');

  useEffect(()=>{
    const socketInstance = io('http://localhost:3000');
    setSocket(socketInstance);
    // listen for events emitted by the server

    socketInstance.on('connection', () => {
      console.log('Connected to server');
    });

    socketInstance.on('message', (data) => {
      console.log(`Received message: ${data}`);
    });

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = inputText
  
    if (socket && message) {
      socket.emit('new-message', message);
    }
  };

  return (
    <div className="App">
      <div id="message-container"></div>
      <form id="send-container">
        <input type="text" id="message-input" onChange={(e)=>setInputText(e.target.value)}/>
        <button type="submit" id="send-button" onClick={handleSubmit}>Send</button>
      </form>
    </div>
  );
}

export default App;
