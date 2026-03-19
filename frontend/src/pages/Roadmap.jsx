import { useState } from 'react'
import { generateRoadmap } from '../api'

const ROLES = ['AI Engineer', 'Full Stack Developer', 'Data Scientist', 'Machine Learning Engineer', 'Backend Developer', 'Frontend Developer', 'DevOps Engineer', 'Product Manager']

export default function Roadmap() {
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [roadmap, setRoadmap] = useState(null)
  const [error, setError] = useState(null)

  const generate = async () => {
    if (!role) return
    setLoading(true); setError(null); setRoadmap(null)
    try {
      const { data } = await generateRoadmap(role)
      setRoadmap(data.roadmap)
    } catch (e) {
      setError(e.response?.data?.detail || 'Failed to generate roadmap. Try again.')
    } finally { setLoading(false) }
  }

  return (
    <div>
      <h1 className="page-title">Skill Roadmap Generator</h1>
      <p className="page-subtitle">Pick your target role and get a clear, structured learning plan tailored for you.</p>

      <div className="card">
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', marginBottom: 8 }}>What role are you targeting?</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <select className="select" value={role} onChange={e => setRole(e.target.value)}>
            <option value="">Choose a role...</option>
            {ROLES.map(r => <option key={r}>{r}</option>)}
          </select>
          <button className="btn" onClick={generate} disabled={!role || loading} style={{ whiteSpace: 'nowrap' }}>
            {loading ? 'Building...' : 'Generate Roadmap'}
          </button>
        </div>
        {loading && (
          <div className="loading" style={{ marginTop: 12 }}>
            <div className="spinner" /> Creating your personalized roadmap...
          </div>
        )}
        {error && <div className="alert-error">{error}</div>}
      </div>

      {roadmap && (
        <>
          <div className="grid-3" style={{ marginBottom: 20 }}>
            <div className="stat-card">
              <div className="stat-value">{roadmap.total_duration_weeks}</div>
              <div className="stat-label">Total Weeks</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{roadmap.phases?.length}</div>
              <div className="stat-label">Learning Phases</div>
            </div>
            <div className="stat-card">
              <div className="stat-value" style={{ fontSize: 15, lineHeight: 1.3 }}>{roadmap.salary_range}</div>
              <div className="stat-label">Expected Salary</div>
            </div>
          </div>

          <div className="card">
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 24 }}>Your Learning Journey</p>
            {roadmap.phases?.map((phase, i) => (
              <div key={phase.phase_number} className={`roadmap-phase ${i === 0 ? 'active-phase' : ''}`}>
                <div className="phase-dot" />
                <div className="phase-badge">Phase {phase.phase_number} · {phase.duration_weeks} weeks</div>
                <div className="phase-title">{phase.title}</div>
                <div style={{ marginBottom: 8 }}>
                  {phase.topics?.map(t => <span key={t} className="tag tag-blue">{t}</span>)}
                </div>
                <div style={{ marginBottom: 8 }}>
                  {phase.tools?.map(t => <span key={t} className="tag tag-yellow">{t}</span>)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                  <span style={{ fontSize: 14 }}>🎯</span>
                  <span style={{ fontSize: 13, color: 'var(--green)', fontWeight: 600 }}>{phase.milestone}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ background: 'var(--green-bg)', border: '1px solid #c0e8d8' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24 }}>🏆</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--green)', marginBottom: 6 }}>Capstone Project to Build</p>
                <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7 }}>{roadmap.final_project_idea}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Where to Apply</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {roadmap.job_boards?.map(j => <span key={j} className="tag tag-gray">{j}</span>)}
            </div>
          </div>
        </>
      )}
    </div>
  )
}