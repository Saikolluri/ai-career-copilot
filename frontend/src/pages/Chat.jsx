import { useState, useRef, useEffect } from 'react'
import { sendMessage } from '../api'

const STARTERS = [
  'How do I prepare for campus placements?',
  'I\'m a fresher with no experience — where do I start?',
  'What projects should I build for my resume?',
  'How do I prepare for Centific hackathon?',
  'What\'s the difference between AI Engineer and ML Engineer?',
  'How do I crack a FAANG interview as a fresher?',
]

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! 👋 I\'m your AI Career Mentor.\n\nI\'m here to help you navigate your career — whether you\'re a fresher just starting out, preparing for placements, building projects, or figuring out which role is right for you.\n\nWhat\'s on your mind today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottom = useRef()

  useEffect(() => { bottom.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    const updated = [...messages, { role: 'user', content: msg }]
    setMessages(updated); setInput(''); setLoading(true)
    try {
      const { data } = await sendMessage(updated)
      setMessages([...updated, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages([...updated, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }])
    } finally { setLoading(false) }
  }

  return (
    <div>
      <h1 className="page-title">Mentor Chat</h1>
      <p className="page-subtitle">Ask anything — career direction, skill gaps, project ideas, interview prep, or just general guidance.</p>

      {messages.length === 1 && (
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10 }}>Suggested questions</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {STARTERS.map(s => (
              <button key={s} className="btn btn-outline" style={{ fontSize: 12, padding: '7px 13px' }} onClick={() => send(s)}>{s}</button>
            ))}
          </div>
        </div>
      )}

      <div className="card chat-container">
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.role}`}>
              <div className="msg-avatar">
                {m.role === 'assistant' ? '🤝' : '👤'}
              </div>
              <div className="message-bubble" style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="message assistant">
              <div className="msg-avatar">🤝</div>
              <div className="message-bubble">
                <div className="loading" style={{ padding: 0 }}>
                  <div className="spinner" /> Thinking...
                </div>
              </div>
            </div>
          )}
          <div ref={bottom} />
        </div>

        <div className="chat-input-row">
          <textarea
            className="chat-input"
            rows={2}
            placeholder="Ask your mentor anything... (Press Enter to send, Shift+Enter for new line)"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
          />
          <button className="btn" onClick={() => send()} disabled={!input.trim() || loading} style={{ alignSelf: 'flex-end', padding: '11px 16px' }}>
            Send →
          </button>
        </div>
      </div>
    </div>
  )
}