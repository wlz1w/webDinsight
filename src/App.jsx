import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Match from './pages/Match'
import DebateRoom from './pages/DebateRoom'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/match" element={<Match />} />
          <Route path="/debate/:roomId" element={<DebateRoom />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
