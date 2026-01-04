import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RoomCard from '../components/RoomCard'
import { mockRooms, categories } from '../data/mockRooms'
import './Home.css'

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [stats, setStats] = useState({ onlineUsers: 0, roomCount: 0 })
  const [rooms, setRooms] = useState(mockRooms)

  useEffect(() => {
    fetchStats();
    fetchRooms();
    
    const interval = setInterval(() => {
      fetchStats();
      fetchRooms();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  }

  const fetchRooms = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/rooms');
      const data = await response.json();
      if (data.length > 0) {
        setRooms(data);
      }
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    }
  }

  const filteredRooms = selectedCategory === 'all' 
    ? rooms 
    : rooms.filter(room => room.category === selectedCategory)

  const hotRooms = [...rooms]
    .sort((a, b) => b.participants - a.participants)
    .slice(0, 3)

  return (
    <div className="home">
      <header className="home-header">
        <div className="header-content">
          <h1 className="logo">🎤 在线辩论平台</h1>
          <div className="stats-display">
            <span className="stat-item">
              👥 在线用户: <strong>{stats.onlineUsers}</strong>
            </span>
            <span className="stat-item">
              🏠 房间数: <strong>{stats.roomCount}</strong>
            </span>
          </div>
          <nav className="nav">
            <Link to="/" className="nav-link active">首页</Link>
            <Link to="/match" className="nav-link">开始匹配</Link>
          </nav>
        </div>
      </header>

      <main className="home-main">
        <section className="hero-section">
          <div className="hero-content">
            <h2 className="hero-title">找到你的辩论对手</h2>
            <p className="hero-subtitle">与来自世界各地的辩手进行思想碰撞</p>
            <Link to="/match" className="hero-button">
              立即开始匹配
            </Link>
          </div>
        </section>

        <section className="hot-rooms-section">
          <h2 className="section-title">🔥 热门辩论房间</h2>
          <div className="hot-rooms-grid">
            {hotRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>

        <section className="all-rooms-section">
          <div className="section-header">
            <h2 className="section-title">📋 所有辩论房间</h2>
            <div className="category-filter">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          <div className="rooms-grid">
            {filteredRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>© 2024 在线辩论平台 - 让思想碰撞出火花</p>
      </footer>
    </div>
  )
}

export default Home
