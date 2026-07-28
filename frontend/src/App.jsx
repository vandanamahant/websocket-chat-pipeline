import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Backend server se connection establish kar rahe hain
const socket = io('http://localhost:5000');

function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Jab server se connect ho jaye
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('[Client] Connected to server, ID:', socket.id);
    });

    // Jab server se disconnect ho jaye
    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('[Client] Disconnected from server');
    });

    // Cleanup on unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Sprint 12 - Track B: WebSockets Real-Time Pipeline</h2>
      <p>
        Server Status:{' '}
        <span style={{ color: isConnected ? 'green' : 'red', fontWeight: 'bold' }}>
          {isConnected ? 'Connected 🟢' : 'Disconnected 🔴'}
        </span>
      </p>
    </div>
  );
}

export default App;