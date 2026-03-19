import { useState, useRef } from 'react'
import { uploadResume } from '../api'

export default function Resume() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [drag, setDrag] = useState(false)
  const ref = useRef()

  const handle = async (f) => {
    if (!f || !f.name.endsWith('.pdf')) return setError('Please upload a PDF file')
    setFile(f); setError(null); setResult(null); setLoading(true)
    try {
      const { data } = await uploadResume(f)
      setResult(data.analysis)
    } catch (e) {
      setError(e.response?.data?.detail || 'Something went wrong. Please try again.')
    } finally { setLoading(false) }
  }

  const score = result?.hackathon_readiness_score || 0
  const circumference = 2 * Math.PI * 52
  const dash = (score / 100) * circumference

  const gradeColor = { A: '#2d7a5f', B: '#2e5fa3', C: '#c47f17', D: '#dc2626' }

  return (
    <div>
      <h1 className="page-title">Resume Analyzer</h1>
      <p className="page-subtitle">Upload your resume and get a detailed AI-powered career assessment — completely free.</p>

      <div className="card">
        <div
          className={`upload-zone ${drag ? 'drag' : ''}`}
          onDragOver={e => { e.preventDefault(); setDrag(true) }}
          onDragLeave={() => setDrag(false)}
          onDrop={e => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files[0]) }}
          onClick={() => ref.current.click()}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>📄</div>
          <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 4 }}>
            {file ? `✓ ${file.name}` : 'Drop your resume here or click to browse'}
          </p>
          <p style={{ fontSize: 13, color: 'var(--text3)' }}>PDF format only • Max 10MB</p>
          <input ref={ref} type="file" accept=".pdf" style={{ display: 'none' }} onChange={e => handle(e.target.files[0])} />
        </div>
        {error && <div className="alert-error">{error}</div>}
        {loading && (
          <div className="loading" style={{ justifyContent: 'center', marginTop: 8 }}>
            <div className="spinner" /> Analyzing your resume with AI — this takes about 10 seconds...
          </div>
        )}
      </div>

      {result && (
        <>
          {/* Score + Grade */}
          <div className="card" style={{ textAlign: 'center' }}>
            <div className="score-ring">
              <svg width="130" height="130" viewBox="0 0 130 130">
                <circle cx="65" cy="65" r="52" fill="none" stroke="var(--bg2)" strokeWidth="10" />
                <circle cx="65" cy="65" r="52" fill="none" stroke="var(--accent)" strokeWidth="10"
                  strokeDasharray={`${dash} ${circumference}`} strokeLinecap="round" />
              </svg>
              <div className="score-text">
                <div className="score-number">{score}</div>
                <div className="score-label">/ 100</div>
              </div>
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Career Readiness Score</h2>
            {result.name && <p style={{ color: 'var(--text3)', fontSize: 13, marginBottom: 10 }}>Analysis for {result.name}</p>}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--bg2)', borderRadius: 20, padding: '6px 16px' }}>
              <span style={{ fontSize: 13, color: 'var(--text2)' }}>Overall Grade</span>
              <span style={{ fontWeight: 800, fontSize: 18, color: gradeColor[result.overall_grade] || 'var(--accent)' }}>{result.overall_grade}</span>
            </div>
            {result.top_roles?.length > 0 && (
              <div style={{ marginTop: 14 }}>
                <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>Best suited roles for you</p>
                {result.top_roles.map(r => <span key={r} className="tag tag-blue">{r}</span>)}
              </div>
            )}
          </div>

          <div className="grid-2">
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 20 }}>✅</span>
                <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--green)' }}>Your Strengths</span>
              </div>
              {result.strengths?.map(s => (
                <div key={s} className="list-item"><div className="list-dot" style={{ background: 'var(--green)' }} />{s}</div>
              ))}
            </div>
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 20 }}>🔧</span>
                <span style={{ fontWeight: 700, fontSize: 15, color: '#dc2626' }}>Skills to Build</span>
              </div>
              {result.missing_skills?.map(s => (
                <div key={s} className="list-item"><div className="list-dot" style={{ background: '#dc2626' }} />{s}</div>
              ))}
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 20 }}>💡</span>
              <span style={{ fontWeight: 700, fontSize: 15 }}>How to Improve</span>
            </div>
            {result.improvement_suggestions?.map((s, i) => (
              <div key={i} className="list-item"><div className="list-dot" />{s}</div>
            ))}
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 20 }}>🚀</span>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Projects You Should Build</span>
            </div>
            {result.project_recommendations?.map((p, i) => (
              <div key={i} className="list-item"><div className="list-dot" style={{ background: 'var(--yellow)' }} />{p}</div>
            ))}
          </div>

          <div className="card" style={{ background: 'var(--accent-bg)', border: '1px solid #f5ddd0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>🧭</span>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Career Path Assessment</span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, fontStyle: 'italic' }}>{result.career_path_alignment}</p>
          </div>
        </>
      )}
    </div>
  )
}