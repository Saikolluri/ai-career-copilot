import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:8000' })

export const uploadResume = (file) => {
  const form = new FormData()
  form.append('file', file)
  return api.post('/resume/upload', form)
}

export const generateRoadmap = (role) =>
  api.post('/roadmap/generate', { role })

export const getRoles = () => api.get('/roadmap/roles')

export const getQuestion = (role, interview_type, difficulty) =>
  api.post('/interview/question', { role, interview_type, difficulty })

export const evaluateAnswer = (question, answer, role) =>
  api.post('/interview/evaluate', { question, answer, role })

export const sendMessage = (messages) =>
  api.post('/chat/message', { messages })