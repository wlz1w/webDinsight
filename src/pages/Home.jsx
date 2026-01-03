import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import RoomCard from '../components/RoomCard'
import { mockRooms, categories } from '../data/mockRooms'
import './Home.css'

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredRooms = selectedCategory === 'all' 
    ? mockRooms 
    : mockRooms.filter(room => room.category === selectedCategory)

  const hotRooms = [...mockRooms]
    .sort((a, b) => b.participants - a.participants)
    .slice(0, 3)

  return (
    <div className="home">
      <header className="home-header">
        <div className="header-content">
          <h1 className="logo">🎤 在线辩论平台</h1>
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
