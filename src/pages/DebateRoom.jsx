import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './DebateRoom.css'

const DebateRoom = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const messagesEndRef = useRef(null)

  const [debateInfo, setDebateInfo] = useState({
    topic: '人工智能是否会取代人类工作',
    proponent: '正方',
    opponent: '反方',
    timeLeft: 300,
    status: 'ongoing'
  })

  const [messages, setMessages] = useState([
    {
      id: 1,
      speaker: '正方',
      content: '我认为人工智能不会完全取代人类工作，而是会改变工作方式。AI可以处理重复性任务，让人类专注于更有创造性和情感价值的工作。',
      timestamp: '10:00'
    },
    {
      id: 2,
      speaker: '反方',
      content: '我不同意。随着AI技术的快速发展，越来越多的工作正在被自动化取代。从制造业到服务业，AI正在逐步渗透到各个领域。',
      timestamp: '10:02'
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [currentSpeaker, setCurrentSpeaker] = useState('正方')

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const timer = setInterval(() => {
      setDebateInfo(prev => ({
        ...prev,
        timeLeft: prev.timeLeft > 0 ? prev.timeLeft - 1 : 0
      }))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      speaker: currentSpeaker,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages([...messages, message])
    setNewMessage('')
    setCurrentSpeaker(currentSpeaker === '正方' ? '反方' : '正方')
  }

  const handleLeaveRoom = () => {
    if (window.confirm('确定要离开辩论房间吗？')) {
      navigate('/')
    }
  }

  return (
    <div className="debate-room">
      <div className="room-header">
        <div className="room-info">
          <button className="back-button" onClick={() => navigate('/')}>
            ← 返回
          </button>
          <div className="room-details">
            <h1 className="room-title">{debateInfo.topic}</h1>
            <span className="room-id">房间号: {roomId}</span>
          </div>
        </div>
        <div className="room-timer">
          <span className="timer-label">剩余时间</span>
          <span className={`timer-value ${debateInfo.timeLeft <= 60 ? 'warning' : ''}`}>
            {formatTime(debateInfo.timeLeft)}
          </span>
        </div>
      </div>

      <div className="room-content">
        <div className="participants-panel">
          <div className={`participant proponent ${currentSpeaker === '正方' ? 'active' : ''}`}>
            <div className="participant-avatar">👤</div>
            <div className="participant-info">
              <h3 className="participant-name">正方</h3>
              <p className="participant-status">
                {currentSpeaker === '正方' ? '发言中...' : '等待中'}
              </p>
            </div>
          </div>

          <div className="vs-badge">VS</div>

          <div className={`participant opponent ${currentSpeaker === '反方' ? 'active' : ''}`}>
            <div className="participant-avatar">👤</div>
            <div className="participant-info">
              <h3 className="participant-name">反方</h3>
              <p className="participant-status">
                {currentSpeaker === '反方' ? '发言中...' : '等待中'}
              </p>
            </div>
          </div>
        </div>

        <div className="debate-area">
          <div className="messages-container">
            {messages.map(message => (
              <div
                key={message.id}
                className={`message ${message.speaker === '正方' ? 'proponent' : 'opponent'}`}
              >
                <div className="message-header">
                  <span className="message-speaker">{message.speaker}</span>
                  <span className="message-time">{message.timestamp}</span>
                </div>
                <div className="message-content">{message.content}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="message-form" onSubmit={handleSendMessage}>
            <div className="speaker-indicator">
              <span className="speaker-label">当前发言:</span>
              <span className={`speaker-value ${currentSpeaker === '正方' ? 'proponent' : 'opponent'}`}>
                {currentSpeaker}
              </span>
            </div>
            <div className="input-group">
              <textarea
                className="message-input"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="输入你的论点..."
                rows={3}
              />
              <button type="submit" className="send-button" disabled={!newMessage.trim()}>
                发送
              </button>
            </div>
          </form>
        </div>

        <div className="actions-panel">
          <button className="action-button leave" onClick={handleLeaveRoom}>
            离开房间
          </button>
          <button className="action-button pause">
            暂停辩论
          </button>
          <button className="action-button end">
            结束辩论
          </button>
        </div>
      </div>
    </div>
  )
}

export default DebateRoom
