class WebSocketService {
  constructor() {
    this.ws = null;
    this.listeners = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect(url) {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(url);
        
        this.ws.onopen = () => {
          console.log('WebSocket connected');
          this.reconnectAttempts = 0;
          resolve();
        };

        this.ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('WebSocket disconnected');
          this.attemptReconnect(url);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  attemptReconnect(url) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      setTimeout(() => {
        this.connect(url);
      }, 3000 * this.reconnectAttempts);
    }
  }

  handleMessage(data) {
    const { type } = data;
    
    switch (type) {
      case 'stats':
        this.emit('stats', data);
        break;
      case 'roomUpdate':
        this.emit('roomUpdate', data);
        break;
      case 'newMessage':
        this.emit('newMessage', data);
        break;
    }
  }

  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  joinRoom(roomId, userId, username, topic) {
    this.send({
      type: 'join',
      roomId,
      userId,
      username,
      topic
    });
  }

  leaveRoom(roomId, userId) {
    this.send({
      type: 'leave',
      roomId,
      userId
    });
  }

  sendMessage(roomId, userId, content) {
    this.send({
      type: 'sendMessage',
      roomId,
      userId,
      content
    });
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        callback(data);
      });
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

export default new WebSocketService();
