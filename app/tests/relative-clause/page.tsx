"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const QS = [
  { q: "The woman ___ lives next door is a doctor.", o: ["who", "which", "whose", "whom"], a: 0 },
  { q: "This is the book ___ I told you about.", o: ["who", "which", "whose", "what"], a: 1 },
  { q: "The student ___ bag was stolen reported it.", o: ["who", "which", "whose", "that"], a: 2 },
  { q: "Is there anything ___ I can do for you?", o: ["who", "which", "that", "whose"], a: 2 },
  { q: "The man ___ you met yesterday is my uncle.", o: ["who", "which", "whose", "what"], a: 0 },
  { q: "She works in a hospital ___ was built in 1990.", o: ["who", "that", "whose", "whom"], a: 1 },
  { q: "The people ___ live in this building are friendly.", o: ["which", "whose", "who", "what"], a: 2 },
  { q: "I found the keys ___ I had lost.", o: ["who", "which", "whose", "what"], a: 1 },
  { q: "He is the teacher ___ I respect the most.", o: ["which", "whose", "what", "whom"], a: 3 },
  { q: "The car ___ she drives is very expensive.", o: ["who", "whose", "that", "what"], a: 2 },
  { q: "Everything ___ he says is true.", o: ["who", "which", "that", "whom"], a: 2 },
  { q: "That is the house ___ Jack built.", o: ["who", "that", "whose", "what"], a: 1 },
  { q: "The city ___ I was born is beautiful.", o: ["which", "that", "where", "who"], a: 2 },
  { q: "I remember the day ___ we first met.", o: ["which", "where", "when", "whose"], a: 2 },
  { q: "The reason ___ she left is unknown.", o: ["where", "when", "whose", "why"], a: 3 },
  { q: "A surgeon is a doctor ___ performs operations.", o: ["which", "whose", "who", "what"], a: 2 },
  { q: "The film ___ we watched last night was boring.", o: ["who", "whom", "which", "whose"], a: 2 },
  { q: "This is the girl ___ father is a pilot.", o: ["who", "which", "that", "whose"], a: 3 },
  { q: "I don't like people ___ talk too much.", o: ["which", "whose", "who", "what"], a: 2 },
  { q: "The letter ___ arrived this morning is for you.", o: ["who", "whose", "which", "what"], a: 2 },
  { q: "The student ___ I gave the book to was grateful.", o: ["which", "whose", "that", "what"], a: 2 },
  { q: "Is this the hotel ___ you stayed last summer?", o: ["which", "where", "that", "who"], a: 1 },
  { q: "He told me something ___ surprised me a lot.", o: ["who", "whom", "which", "whose"], a: 2 },
  { q: "The company ___ products are exported worldwide is local.", o: ["that", "which", "whose", "who"], a: 2 },
  { q: "The time ___ we arrived, the show had already started.", o: ["where", "why", "which", "when"], a: 3 }
]

const gradeColor: Record<string, string> = {
  A: 'bg-green-100 text-green-800',
  B: 'bg-blue-100 text-blue-800',
  C: 'bg-yellow-100 text-yellow-800',
  D: 'bg-orange-100 text-orange-800',
  F: 'bg-red-100 text-red-800'
}

export default function RelativeClauseTest() {
  const [screen, setScreen] = useState<'quiz' | 'result'>('quiz')
  const [chosen, setChosen] = useState<Record<number, number>>({})
  const [result, setResult] = useState<{ score: number; pct: number; grade: string } | null>(null)
  const [details, setDetails] = useState<{ correct: boolean; chosen: string; answer: string; q: string }[]>([])
  const [userEmail, setUserEmail] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserEmail(data.user.email || '')
    })
  }, [])

  const handleSubmit = async () => {
    for (let i = 0; i < QS.length; i++) {
      if (chosen[i] === undefined) { alert(`Please answer question ${i + 1}`); return }
    }
    let score = 0
    const det = QS.map((q, i) => {
      const ok = chosen[i] === q.a
      if (ok) score++
      return { correct: ok, chosen: q.o[chosen[i]], answer: q.o[q.a], q: q.q }
    })
    const pct = Math.round((score / QS.length) * 100)
    const grade = pct >= 90 ? 'A' : pct >= 80 ? 'B' : pct >= 70 ? 'C' : pct >= 60 ? 'D' : 'F'
    setResult({ score, pct, grade })
    setDetails(det)
    setScreen('result')
    setStatus('saving')
    try {
      const res = await fetch('/api/save-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, score, total: QS.length, percentage: pct, test_name: 'relative-clause' })
      })
      const json = await res.json()
      setStatus(json.ok ? 'saved' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (screen === 'result' && result) {
    return (
      <div className="min-h-screen bg-indigo-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow p-8 mb-6 text-center">
            <h1 className="text-3xl font-bold text-indigo-900 mb-2">🎉 Quiz Complete!</h1>
            <p className="text-gray-500 mb-4">{userEmail}</p>
            <div className="text-6xl font-black text-indigo-800 mb-2">{result.score} / {QS.length}</div>
            <span className={`inline-block px-6 py-2 rounded-full text-xl font-bold ${gradeColor[result.grade]}`}>
              Grade {result.grade} · {result.pct}%
            </span>
            <div className="mt-4 text-sm">
              {status === 'saving' && <span className="text-gray-400">⏳ Saving your score...</span>}
              {status === 'saved' && <span className="text-green-600">✅ Score saved to leaderboard!</span>}
              {status === 'error' && <span className="text-red-500">⚠️ Could not save score.</span>}
            </div>
            <div className="flex gap-3 mt-6 justify-center">
              <Link href="/tests/relative-clause/leaderboard"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-semibold">
                🏆 View Leaderboard
              </Link>
              <Link href="/dashboard"
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 font-semibold">
                ← Dashboard
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-bold text-lg mb-4 text-gray-800">📋 Detailed Results</h2>
            {details.map((d, i) => (
              <div key={i} className={`flex gap-3 p-3 rounded-lg mb-2 text-sm ${d.correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <span className="font-bold min-w-[24px]">{i + 1}.</span>
                <span>
                  {d.q}<br />
                  {d.correct
                    ? <><b>✔ Correct: {d.answer}</b></>
                    : <>✘ You chose: <b>{d.chosen}</b> → Correct: <b>{d.answer}</b></>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-indigo-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-8 mb-6">
          <h1 className="text-3xl font-bold text-indigo-900 text-center">📚 Relative Clause Quiz</h1>
          <p className="text-center text-gray-500 mt-1 mb-2">{QS.length} questions · Multiple choice</p>
          <p className="text-center text-indigo-700 font-medium mb-6">{userEmail}</p>
          {QS.map((q, i) => (
            <div key={i} className="mb-6">
              <p className="font-semibold text-gray-800 mb-3">
                <span className="text-indigo-600 mr-1">{i + 1}.</span>{q.q}
              </p>
              {q.o.map((opt, j) => (
                <label key={j} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-1 transition ${
                  chosen[i] === j ? 'bg-indigo-100 border border-indigo-400' : 'hover:bg-indigo-50'
                }`}>
                  <input
                    type="radio" name={`q${i}`} value={j}
                    checked={chosen[i] === j}
                    onChange={() => setChosen(prev => ({ ...prev, [i]: j }))}
                    className="accent-indigo-600"
                  />
                  {opt}
                </label>
              ))}
              {i < QS.length - 1 && <hr className="mt-4 border-gray-100" />}
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 mt-4">
            ✓ Submit Answers
          </button>
        </div>
      </div>
    </div>
  )
}
