import { useState } from 'react'
import Home from './pages/Home'
import Resume from './pages/Resume'
import Roadmap from './pages/Roadmap'
import Interview from './pages/Interview'
import Chat from './pages/Chat'
import './index.css'

const nav = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'resume', label: 'Resume', icon: '📄' },
  { id: 'roadmap', label: 'Roadmap', icon: '🗺️' },
  { id: 'interview', label: 'Interview', icon: '🎯' },
  { id: 'chat', label: 'Mentor', icon: '💬' },
]

export default function App() {
  const [page, setPage] = useState('home')
  const pages = { home: Home, resume: Resume, roadmap: Roadmap, interview: Interview, chat: Chat }
  const Page = pages[page]

  return (
    <div className="app">
      <div className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark">
            <div className="logo-icon">🤝</div>
            <div className="logo-text">S.AI Career<br /><span>Copilot</span></div>
          </div>
          <div className="logo-sub">Your career support companion</div>
        </div>

        <div className="nav-section">
          <div className="nav-label">Navigation</div>
          {nav.map(({ id, label, icon }) => (
            <div key={id} className={`nav-item ${page === id ? 'active' : ''}`} onClick={() => setPage(id)}>
              <div className="nav-icon">{icon}</div>
              {label}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="user-avatar">S</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Sai Chowdary</div>
              <div style={{ fontSize: 11, color: 'var(--text3)' }}>CS Student</div>
            </div>
          </div>
        </div>
      </div>

      <div className="main">
        {/* Mobile header */}
        <div className="mobile-header">
          <div className="logo-mark">
            <div className="logo-icon" style={{ width: 28, height: 28, fontSize: 14 }}>🤝</div>
            <div style={{ fontSize: 14, fontWeight: 800 }}>S.AI Career <span style={{ color: 'var(--accent)' }}>Copilot</span></div>
          </div>
        </div>
        <Page setPage={setPage} />
      </div>
    </div>
  )
}