import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './DebateRoom.css'

const DebateRoom = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const messagesEndRef = useRef(null)
  const searchParams = new URLSearchParams(window.location.search)
  const topicFromUrl = decodeURIComponent(searchParams.get('topic') || '人工智能是否会取代人类工作')

  const topicMessages = {
    '人工智能是否会取代人类工作': [
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
    ],
    '远程办公是否比传统办公更高效': [
      {
        id: 1,
        speaker: '正方',
        content: '远程办公显著提高了工作效率。员工可以更好地平衡工作与生活，减少通勤时间，提高工作满意度。',
        timestamp: '10:00'
      },
      {
        id: 2,
        speaker: '反方',
        content: '远程办公降低了团队协作效率。缺乏面对面交流，沟通成本增加，团队凝聚力下降。',
        timestamp: '10:02'
      }
    ],
    '未来社会更需要专才还是通才': [
      {
        id: 1,
        speaker: '正方',
        content: '未来社会更需要专才。随着科技发展，分工越来越细，专业领域的深度知识才是核心竞争力。',
        timestamp: '10:00'
      },
      {
        id: 2,
        speaker: '反方',
        content: '未来社会更需要通才。复杂问题需要跨学科知识，综合能力比单一技能更重要。',
        timestamp: '10:02'
      }
    ],
    '是否应该支持超前消费': [
      {
        id: 1,
        speaker: '正方',
        content: '超前消费可以刺激经济增长，提高生活质量。合理使用信用工具，提前享受生活是明智的选择。',
        timestamp: '10:00'
      },
      {
        id: 2,
        speaker: '反方',
        content: '超前消费容易导致债务危机，影响个人财务健康。应该量入为出，理性消费。',
        timestamp: '10:02'
      }
    ],
    '算法推荐是利大于弊还是弊大于利': [
      {
        id: 1,
        speaker: '正方',
        content: '算法推荐提高了信息获取效率，精准推送满足个性化需求，极大提升了用户体验。',
        timestamp: '10:00'
      },
      {
        id: 2,
        speaker: '反方',
        content: '算法推荐导致信息茧房，限制了视野。过度依赖算法会降低独立思考能力。',
        timestamp: '10:02'
      }
    ],
    '人生路上应仰望月亮还是捡拾六便士': [
      {
        id: 1,
        speaker: '正方',
        content: '人生应该仰望月亮，追求理想和精神价值。物质生活固然重要，但精神追求才是人生的意义。',
        timestamp: '10:00'
      },
      {
        id: 2,
        speaker: '反方',
        content: '人生应该捡拾六便士，脚踏实地。理想需要现实基础，先解决生存问题才能追求更高层次的需求。',
        timestamp: '10:02'
      }
    ],
    'AI辅助写作工具的普及对大学生批判性思维培养弊大于利/利大于弊': [
      {
        id: 1,
        speaker: '正方',
        content: 'AI辅助写作工具利大于弊。它可以帮助学生快速整理思路，提高写作效率，有更多时间深入思考。',
        timestamp: '10:00'
      },
      {
        id: 2,
        speaker: '反方',
        content: 'AI辅助写作工具弊大于利。过度依赖AI会削弱独立思考能力，降低批判性思维培养。',
        timestamp: '10:02'
      }
    ],
    '电动汽车是否真的环保': [
      {
        id: 1,
        speaker: '正方',
        content: '电动汽车确实环保。零排放，减少空气污染，随着清洁能源普及，环保优势会更加明显。',
        timestamp: '10:00'
      },
      {
        id: 2,
        speaker: '反方',
        content: '电动汽车未必环保。电池生产和回收过程污染严重，电力来源仍以化石能源为主。',
        timestamp: '10:02'
      }
    ],
    '社交媒体是否加剧了社会极化': [
      {
        id: 1,
        speaker: '正方',
        content: '社交媒体确实加剧了社会极化。算法推送强化偏见，回音室效应让观点更加对立。',
        timestamp: '10:00'
      },
      {
        id: 2,
        speaker: '反方',
        content: '社交媒体没有加剧社会极化。它只是暴露了已有的分歧，促进不同观点的交流。',
        timestamp: '10:02'
      }
    ],
    '是否应该实行四天工作制': [
      {
        id: 1,
        speaker: '正方',
        content: '应该实行四天工作制。提高工作效率，改善工作生活平衡，促进社会和谐发展。',
        timestamp: '10:00'
      },
      {
        id: 2,
        speaker: '反方',
        content: '不应该实行四天工作制。减少工作时间影响生产力，增加企业成本，不利于经济发展。',
        timestamp: '10:02'
      }
    ]
  }

  const [debateInfo, setDebateInfo] = useState({
    topic: topicFromUrl,
    proponent: '正方',
    opponent: '反方',
    timeLeft: 300,
    status: 'ongoing'
  })

  const [messages, setMessages] = useState(topicMessages[topicFromUrl] || topicMessages['人工智能是否会取代人类工作'])

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
