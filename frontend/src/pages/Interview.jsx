import { useState } from 'react'
import { getQuestion, evaluateAnswer } from '../api'

const ROLES = ['AI Engineer', 'Full Stack Developer', 'Data Scientist', 'Machine Learning Engineer', 'Backend Developer', 'Frontend Developer']

export default function Interview() {
  const [role, setRole] = useState('Full Stack Developer')
  const [type, setType] = useState('technical')
  const [difficulty, setDifficulty] = useState('medium')
  const [question, setQuestion] = useState(null)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)
  const [evalLoading, setEvalLoading] = useState(false)

  const fetchQuestion = async () => {
    setLoading(true); setQuestion(null); setFeedback(null); setAnswer('')
    try {
      const { data } = await getQuestion(role, type, difficulty)
      setQuestion(data.question)
    } finally { setLoading(false) }
  }

  const evaluate = async () => {
    if (!answer.trim()) return
    setEvalLoading(true); setFeedback(null)
    try {
      const { data } = await evaluateAnswer(question.question, answer, role)
      setFeedback(data.feedback)
    } finally { setEvalLoading(false) }
  }

  const scoreColor = (s) => s >= 80 ? 'var(--green)' : s >= 60 ? 'var(--yellow)' : '#dc2626'

  return (
    <div>
      <h1 className="page-title">Interview Simulator</h1>
      <p className="page-subtitle">Practice real interview questions and get honest AI feedback on every answer.</p>

      <div className="card">
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', marginBottom: 10 }}>Set up your practice session</p>
        <div className="grid-3" style={{ marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 600, display: 'block', marginBottom: 6 }}>Role</label>
            <select className="select" value={role} onChange={e => setRole(e.target.value)}>
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 600, display: 'block', marginBottom: 6 }}>Type</label>
            <select className="select" value={type} onChange={e => setType(e.target.value)}>
              <option value="technical">Technical</option>
              <option value="behavioral">Behavioral</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 600, display: 'block', marginBottom: 6 }}>Difficulty</label>
            <select className="select" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
        <button className="btn" onClick={fetchQuestion} disabled={loading}>
          {loading ? 'Generating question...' : '🎯 Get a Question'}
        </button>
      </div>

      {question && (
        <div className="card">
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <span className="tag tag-blue">{question.category}</span>
            <span className="tag tag-orange">{difficulty}</span>
            <span className="tag tag-gray">{type}</span>
          </div>
          <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', lineHeight: 1.6, marginBottom: 14 }}>{question.question}</p>
          <div style={{ background: 'var(--bg2)', borderRadius: 8, padding: 12, marginBottom: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text3)', marginBottom: 6 }}>💡 WHAT THE INTERVIEWER LOOKS FOR</p>
            <p style={{ fontSize: 13, color: 'var(--text2)' }}>{question.what_interviewer_looks_for}</p>
          </div>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 8 }}>Your Answer</label>
          <textarea
            className="answer-box"
            placeholder="Write your answer here. Be detailed and specific — the more thorough, the better the feedback."
            value={answer}
            onChange={e => setAnswer(e.target.value)}
          />
          <button className="btn" onClick={evaluate} disabled={!answer.trim() || evalLoading} style={{ marginTop: 12 }}>
            {evalLoading ? 'Evaluating...' : '✨ Get Feedback'}
          </button>
        </div>
      )}

      {feedback && (
        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: 20, padding: '8px 0' }}>
            <div className="feedback-score" style={{ color: scoreColor(feedback.score) }}>{feedback.score}<span style={{ fontSize: 24 }}>/100</span></div>
            <div style={{ display: 'inline-flex', background: 'var(--bg2)', borderRadius: 20, padding: '4px 16px', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: 'var(--text2)' }}>Grade</span>
              <span style={{ fontWeight: 800, fontSize: 18, color: scoreColor(feedback.score) }}>{feedback.grade}</span>
            </div>
          </div>

          <div className="grid-2" style={{ marginBottom: 16 }}>
            <div style={{ background: 'var(--green-bg)', borderRadius: 10, padding: 16 }}>
              <p style={{ fontWeight: 700, fontSize: 13, color: 'var(--green)', marginBottom: 10 }}>✓ What you did well</p>
              {feedback.strengths?.map((s, i) => <div key={i} className="list-item" style={{ borderColor: '#c0e8d8' }}><div className="list-dot" style={{ background: 'var(--green)' }} />{s}</div>)}
            </div>
            <div style={{ background: '#fef2f2', borderRadius: 10, padding: 16 }}>
              <p style={{ fontWeight: 700, fontSize: 13, color: '#dc2626', marginBottom: 10 }}>✗ What was missing</p>
              {feedback.weaknesses?.map((w, i) => <div key={i} className="list-item" style={{ borderColor: '#fecaca' }}><div className="list-dot" style={{ background: '#dc2626' }} />{w}</div>)}
            </div>
          </div>

          <div style={{ background: 'var(--accent-bg)', border: '1px solid #f5ddd0', borderRadius: 10, padding: 16, marginBottom: 12 }}>
            <p style={{ fontWeight: 700, fontSize: 13, color: 'var(--accent)', marginBottom: 8 }}>💡 One tip to improve</p>
            <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7 }}>{feedback.improvement_tip}</p>
          </div>

          <button className="btn btn-ghost" onClick={fetchQuestion} style={{ width: '100%', justifyContent: 'center' }}>
            Try another question →
          </button>
        </div>
      )}
    </div>
  )
}