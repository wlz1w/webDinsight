import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Match.css'

const Match = () => {
  const navigate = useNavigate()
  const [matchStatus, setMatchStatus] = useState('idle')
  const [selectedTopic, setSelectedTopic] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium')
  const [matchTime, setMatchTime] = useState(0)

  const topics = [
    '人工智能是否会取代人类工作',
    '远程办公是否比传统办公更高效',
    '未来社会更需要专才还是通才',
    '电动汽车是否真的环保',
    '社交媒体是否加剧了社会极化',
    '是否应该支持超前消费',
    '算法推荐是利大于弊还是弊大于利',
    '人生路上应仰望月亮还是捡拾六便士',
    'AI辅助写作工具的普及对大学生批判性思维培养弊大于利/利大于弊',
    '是否应该实行四天工作制'
  ]

  const difficulties = [
    { value: 'easy', label: '简单', description: '适合新手' },
    { value: 'medium', label: '中等', description: '有一定经验' },
    { value: 'hard', label: '困难', description: '挑战自我' }
  ]

  useEffect(() => {
    let interval
    if (matchStatus === 'matching') {
      interval = setInterval(() => {
        setMatchTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [matchStatus])

  const handleStartMatch = () => {
    if (!selectedTopic) {
      alert('请选择一个辩论主题')
      return
    }
    setMatchStatus('matching')
    
    setTimeout(() => {
      setMatchStatus('found')
      setTimeout(() => {
        const roomId = Math.floor(Math.random() * 10000)
        navigate(`/debate/${roomId}?topic=${encodeURIComponent(selectedTopic)}`)
      }, 2000)
    }, 3000)
  }

  const handleCancelMatch = () => {
    setMatchStatus('idle')
    setMatchTime(0)
  }

  return (
    <div className="match-page">
      <div className="match-container">
        <header className="match-header">
          <h1 className="match-title">🎯 辩论匹配</h1>
          <p className="match-subtitle">找到你的辩论对手</p>
        </header>

        {matchStatus === 'idle' && (
          <div className="match-form">
            <div className="form-section">
              <label className="form-label">选择辩论主题</label>
              <div className="topics-grid">
                {topics.map((topic, index) => (
                  <button
                    key={index}
                    className={`topic-button ${selectedTopic === topic ? 'active' : ''}`}
                    onClick={() => setSelectedTopic(topic)}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-section">
              <label className="form-label">选择难度等级</label>
              <div className="difficulty-options">
                {difficulties.map(diff => (
                  <button
                    key={diff.value}
                    className={`difficulty-button ${selectedDifficulty === diff.value ? 'active' : ''}`}
                    onClick={() => setSelectedDifficulty(diff.value)}
                  >
                    <span className="difficulty-label">{diff.label}</span>
                    <span className="difficulty-desc">{diff.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              className="start-match-button"
              onClick={handleStartMatch}
              disabled={!selectedTopic}
            >
              开始匹配
            </button>
          </div>
        )}

        {matchStatus === 'matching' && (
          <div className="matching-status">
            <div className="matching-animation">
              <div className="pulse-ring"></div>
              <div className="pulse-ring delay-1"></div>
              <div className="pulse-ring delay-2"></div>
              <div className="matching-icon">🔍</div>
            </div>
            <h2 className="matching-title">正在寻找对手...</h2>
            <p className="matching-time">已等待 {matchTime} 秒</p>
            <p className="matching-topic">主题：{selectedTopic}</p>
            <button className="cancel-match-button" onClick={handleCancelMatch}>
              取消匹配
            </button>
          </div>
        )}

        {matchStatus === 'found' && (
          <div className="match-found">
            <div className="found-animation">
              <div className="success-icon">✓</div>
            </div>
            <h2 className="found-title">匹配成功！</h2>
            <p className="found-message">正在进入辩论房间...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Match
