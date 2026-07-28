const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

// HTTP server create kar rahe hain aur Express ko Socket.io ke sath link kar rahe hain
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

// WebSocket connection event (Client Handshake)
io.on('connection', (socket) => {
    console.log(`[Server] Client connected: ${socket.id}`);

    // Jab client disconnect ho
    socket.on('disconnect', () => {
        console.log(`[Server] Client disconnected: ${socket.id}`);
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});