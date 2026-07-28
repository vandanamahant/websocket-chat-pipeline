# Real-Time Chat Application

A modern, full-stack real-time chat application built with a React (Vite) frontend and a Node.js (Express + Socket.io) backend. This project enables seamless live messaging, multi-room support, and real-time typing indicators.

---

## Features
* **Real-Time Messaging:** Instant bidirectional message delivery without page reloads using WebSockets.
* **Room-Based Chat:** Allows users to create or join specific rooms to communicate in segmented groups.
* **Typing Indicators:** Live feedback displaying when a user is typing a message.
* **Modern Interface:** Clean, responsive design optimized for various screen sizes.

---

## Tech Stack
* **Frontend:** React, Vite, Socket.io-client, CSS
* **Backend:** Node.js, Express, Socket.io

---

## Project Structure
```text
websocket-chat-pipeline/
├── backend/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   └── package.json
├── .gitignore
└── vercel.json

## Getting Started

Follow the instructions below to set up and run the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/vandanamahant/websocket-chat-pipeline.git](https://github.com/vandanamahant/websocket-chat-pipeline.git)
cd websocket-chat-pipeline

### 2. Configure and Run the Backend
Navigate to the backend directory, install dependencies, and start the server:

```bash
cd backend
npm install
node server.js

*(The backend server will run on http://localhost:5000 by default).*

### 3. Configure and Run the Frontend
Open a new terminal window, navigate to the frontend directory, install dependencies, and start the development server:

```bash
cd frontend
npm install
npm run dev

## Environment Variables

To configure the backend connection locally, create a `.env` file inside the frontend folder with the following variable:

```env
VITE_BACKEND_URL=http://localhost:5000