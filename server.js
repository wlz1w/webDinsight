const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const wss = new WebSocket.Server({ server });

const users = new Map();
const rooms = new Map();

let onlineUsers = 0;

wss.on('connection', (ws) => {
  onlineUsers++;
  broadcastStats();

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'join':
        handleJoin(ws, data);
        break;
      case 'leave':
        handleLeave(ws, data);
        break;
      case 'sendMessage':
        handleSendMessage(ws, data);
        break;
    }
  });

  ws.on('close', () => {
    onlineUsers--;
    handleUserLeave(ws);
    broadcastStats();
  });
});

function handleJoin(ws, data) {
  const { roomId, userId, username } = data;
  
  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      id: roomId,
      topic: data.topic || '未命名房间',
      participants: [],
      messages: [],
      status: 'waiting'
    });
  }

  const room = rooms.get(roomId);
  room.participants.push({
    id: userId,
    username: username || '匿名用户',
    ws: ws
  });

  if (room.participants.length >= 2) {
    room.status = 'ongoing';
  }

  ws.roomId = roomId;
  ws.userId = userId;

  broadcastRoomUpdate(roomId);
  broadcastStats();
}

function handleLeave(ws, data) {
  const { roomId, userId } = data;
  const room = rooms.get(roomId);
  
  if (room) {
    room.participants = room.participants.filter(p => p.id !== userId);
    
    if (room.participants.length === 0) {
      rooms.delete(roomId);
    }
    
    broadcastRoomUpdate(roomId);
  }
}

function handleUserLeave(ws) {
  if (ws.roomId) {
    const room = rooms.get(ws.roomId);
    if (room) {
      room.participants = room.participants.filter(p => p.ws !== ws);
      
      if (room.participants.length === 0) {
        rooms.delete(ws.roomId);
      }
      
      broadcastRoomUpdate(ws.roomId);
    }
  }
}

function handleSendMessage(ws, data) {
  const { roomId, userId, content } = data;
  const room = rooms.get(roomId);
  
  if (room) {
    const message = {
      id: Date.now(),
      userId,
      content,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };
    
    room.messages.push(message);
    
    room.participants.forEach(participant => {
      if (participant.ws.readyState === WebSocket.OPEN) {
        participant.ws.send(JSON.stringify({
          type: 'newMessage',
          message
        }));
      }
    });
  }
}

function broadcastStats() {
  const stats = {
    type: 'stats',
    onlineUsers: onlineUsers,
    roomCount: rooms.size
  };
  
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(stats));
    }
  });
}

function broadcastRoomUpdate(roomId) {
  const room = rooms.get(roomId);
  if (room) {
    const update = {
      type: 'roomUpdate',
      roomId,
      room: {
        id: room.id,
        topic: room.topic,
        participants: room.participants.length,
        maxParticipants: 2,
        status: room.status
      }
    };
    
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(update));
      }
    });
  }
}

app.get('/api/stats', (req, res) => {
  res.json({
    onlineUsers: onlineUsers,
    roomCount: rooms.size
  });
});

app.get('/api/rooms', (req, res) => {
  const roomList = Array.from(rooms.values()).map(room => ({
    id: room.id,
    topic: room.topic,
    participants: room.participants.length,
    maxParticipants: 2,
    status: room.status
  }));
  res.json(roomList);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
