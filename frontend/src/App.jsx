import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const socket = io(SOCKET_URL);

export default function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState('');

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
      setTypingUser('');
    });

    socket.on('display_typing', (data) => {
      setTypingUser(data.isTyping ? data.user : '');
    });

    return () => {
      socket.off('receive_message');
      socket.off('display_typing');
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() && room.trim()) {
      socket.emit('join_room', room);
      setIsLoggedIn(true);
    }
  };

  const handleTyping = (e) => {
    setText(e.target.value);
    socket.emit('typing', { room, user: username, isTyping: e.target.value.length > 0 });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const payload = {
      room,
      author: username,
      text,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit('send_message', payload);
    socket.emit('typing', { room, user: username, isTyping: false });
    setText('');
  };

  if (!isLoggedIn) {
    return (
      <div className="container">
        <h2>Join Chat Room</h2>
        <form onSubmit={handleLogin} className="form-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name..."
          />
          <select
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          >
            <option value="">Select Room</option>
            <option value="room1">Room 1</option>
            <option value="room2">Room 2</option>
          </select>
          <button type="submit">Join Room</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Chat Room: {room.toUpperCase()}</h2>
      <p>Logged in as: <strong>{username}</strong></p>

      <form onSubmit={handleSend} className="input-row">
        <input
          type="text"
          value={text}
          onChange={handleTyping}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>

      {typingUser && <p className="typing-text">{typingUser} is typing...</p>}

      <div className="message-box">
        {messages.map((msg, index) => (
          <div key={index} className="message-item">
            <div className="message-meta">
              <strong>{msg.author}</strong> ({msg.time})
            </div>
            <div>{msg.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}