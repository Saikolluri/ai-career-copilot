export default function Home({ setPage }) {
  const features = [
    { id: 'resume', icon: '📄', bg: '#fef3ed', title: 'Resume Analyzer', desc: 'Upload your resume and instantly get your strengths, skill gaps, a hackathon readiness score, and personalized project ideas.' },
    { id: 'roadmap', icon: '🗺️', bg: '#edf7f3', title: 'Skill Roadmap', desc: 'Tell us your dream role. Get a clear week-by-week roadmap with tools, topics, and milestones to get you job-ready.' },
    { id: 'interview', icon: '🎯', bg: '#eef3fc', title: 'Interview Simulator', desc: 'Practice real technical and behavioral questions. Get scored and receive detailed feedback to sharpen your answers.' },
    { id: 'chat', icon: '💬', bg: '#f3eefb', title: 'Mentor Chat', desc: 'Confused about your career path? Chat with your AI mentor anytime — honest, warm, and always available.' },
  ]

  const audience = [
    { emoji: '🎓', title: 'Final year students', desc: 'Preparing for placements and unsure where to start? We guide you step by step.' },
    { emoji: '💼', title: 'Fresh graduates', desc: 'Just graduated but lost on what role to target or skills to build? We help you find clarity.' },
    { emoji: '🔄', title: 'Career switchers', desc: 'Coming from a non-CS background or switching domains? We map your path forward.' },
    { emoji: '🚀', title: 'Hackathon participants', desc: 'Want to stand out at competitions like Centific or SIH? We help you prepare smarter.' },
  ]

  return (
    <div>
      {/* Hero */}
      <div className="hero-banner">
        <span className="hero-emoji">🤝</span>
        <h1 className="hero-title">
          Your career doesn't have<br />to be <span>confusing.</span>
        </h1>
        <p className="hero-desc">
          S.AI Career Copilot is a free, AI-powered support platform built for freshers and early professionals.
          Whether you're preparing for placements, switching roles, or building your first project —
          we're here to guide you clearly and warmly, every step of the way.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
          <button className="btn" onClick={() => setPage('resume')}>Analyze my resume →</button>
          <button className="btn btn-ghost" onClick={() => setPage('chat')}>Chat with mentor</button>
        </div>
      </div>

      {/* Features */}
      <div style={{ marginBottom: 8 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 14 }}>What you can do here</p>
      </div>
      <div className="grid-2" style={{ marginBottom: 28 }}>
        {features.map(({ id, icon, bg, title, desc }) => (
          <div key={id} className="feature-card" onClick={() => setPage(id)}>
            <div className="feature-icon" style={{ background: bg }}>{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>

      {/* Who is it for */}
      <div className="card" style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>Who is this for?</p>
        <div className="grid-2" style={{ gap: 12 }}>
          {audience.map(({ emoji, title, desc }) => (
            <div key={title} className="audience-card">
              <div className="audience-emoji">{emoji}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 3 }}>{title}</div>
                <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to start */}
      <div className="card">
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16 }}>How to get started</p>
        {[
          ['Upload your resume', 'Go to Resume Analyzer → upload your PDF → get your personalized career score in seconds'],
          ['Pick your target role', 'Go to Skill Roadmap → choose a role → get your complete week-by-week learning plan'],
          ['Practice interviews', 'Go to Interview Sim → choose question type & difficulty → get AI feedback on every answer'],
          ['Ask your mentor anything', 'Go to Mentor Chat → type your question → get honest, practical career guidance'],
        ].map(([title, desc], i) => (
          <div key={i} className="step-row">
            <div className="step-num">{i + 1}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 2 }}>{title}</div>
              <div style={{ fontSize: 13, color: 'var(--text2)' }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}