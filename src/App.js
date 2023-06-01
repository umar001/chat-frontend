import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import "./App.css"

const socket = io('http://localhost:3050'); // Replace with your server URL

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault()
    if (input) {
      socket.emit('message', input);
      setInput('');
    }

  };

  return (
    <div className='chat'>
      <h1>Chat App</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index} className='message'>{message}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};

export default App;
