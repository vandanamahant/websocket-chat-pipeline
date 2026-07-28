import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('receive_message');
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const payload = {
      id: socket.id,
      text: text,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit('send_message', payload);
    setText('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Sprint 12 - Track B Real-Time Pipeline</h2>
      <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>

      <form onSubmit={handleSend}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
        />
        <button type="submit">Send</button>
      </form>

      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <small>{msg.id?.slice(0, 5)} ({msg.time}):</small>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}