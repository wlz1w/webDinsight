import React from 'react'
import { Link } from 'react-router-dom'
import './RoomCard.css'

const RoomCard = ({ room }) => {
  const getStatusText = (status) => {
    switch (status) {
      case 'waiting':
        return '等待中'
      case 'ongoing':
        return '进行中'
      case 'completed':
        return '已结束'
      default:
        return '未知'
    }
  }

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return '简单'
      case 'medium':
        return '中等'
      case 'hard':
        return '困难'
      default:
        return '未知'
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'waiting':
        return 'status-waiting'
      case 'ongoing':
        return 'status-ongoing'
      case 'completed':
        return 'status-completed'
      default:
        return ''
    }
  }

  return (
    <div className="room-card">
      <div className="room-card-header">
        <span className={`room-status ${getStatusClass(room.status)}`}>
          {getStatusText(room.status)}
        </span>
        <span className="room-category">{room.category}</span>
      </div>
      <h3 className="room-title">{room.title}</h3>
      <p className="room-description">{room.description}</p>
      <div className="room-info">
        <span className="room-difficulty">{getDifficultyText(room.difficulty)}</span>
        <span className="room-participants">
          {room.currentParticipants}/{room.maxParticipants} 人
        </span>
      </div>
      <div className="room-footer">
        <span className="room-watchers">👁 {room.participants} 人围观</span>
        <Link 
          to={room.status === 'waiting' && room.currentParticipants < room.maxParticipants ? `/debate/${room.id}?topic=${encodeURIComponent(room.title)}` : '#'}
          className={`join-button ${room.status !== 'waiting' || room.currentParticipants >= room.maxParticipants ? 'disabled' : ''}`}
        >
          {room.status === 'waiting' && room.currentParticipants < room.maxParticipants ? '加入辩论' : '房间已满'}
        </Link>
      </div>
    </div>
  )
}

export default RoomCard
