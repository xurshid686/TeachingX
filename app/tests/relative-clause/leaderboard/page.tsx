import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'

export const revalidate = 30

const gradeColor: Record<string, string> = {
  A: 'bg-green-100 text-green-700',
  B: 'bg-blue-100 text-blue-700',
  C: 'bg-yellow-100 text-yellow-700',
  D: 'bg-orange-100 text-orange-700',
  F: 'bg-red-100 text-red-700'
}

const medals = ['🥇', '🥈', '🥉']

export default async function Leaderboard() {
  const { data: scores } = await supabaseAdmin
    .from('test_scores')
    .select('email, score, total, percentage, created_at')
    .eq('test_name', 'relative-clause')
    .order('percentage', { ascending: false })
    .limit(50)

  return (
    <div className="min-h-screen bg-indigo-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-indigo-900">🏆 Leaderboard</h1>
            <Link href="/dashboard" className="text-indigo-600 hover:underline text-sm">← Dashboard</Link>
          </div>
          <p className="text-gray-500 mb-6">Relative Clause Quiz · Top scores</p>
          {!scores || scores.length === 0 ? (
            <p className="text-center text-gray-400 py-12">No scores yet. Be the first! 🚀</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-indigo-50 text-left">
                    <th className="p-4 text-indigo-800">#</th>
                    <th className="p-4 text-indigo-800">Student</th>
                    <th className="p-4 text-indigo-800">Score</th>
                    <th className="p-4 text-indigo-800">Grade</th>
                    <th className="p-4 text-indigo-800">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((s, i) => {
                    const grade = s.percentage >= 90 ? 'A' : s.percentage >= 80 ? 'B' : s.percentage >= 70 ? 'C' : s.percentage >= 60 ? 'D' : 'F'
                    return (
                      <tr key={i} className={`border-t ${i === 0 ? 'bg-yellow-50' : ''}`}>
                        <td className="p-4 font-bold text-lg">{medals[i] || i + 1}</td>
                        <td className="p-4 font-medium text-gray-800">{s.email}</td>
                        <td className="p-4 font-bold text-indigo-700">{s.score} / {s.total} ({s.percentage}%)</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${gradeColor[grade]}`}>
                            {grade}
                          </span>
                        </td>
                        <td className="p-4 text-gray-400 text-sm">
                          {new Date(s.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-6 text-center">
            <Link href="/tests/relative-clause"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-semibold inline-block">
              📝 Take the Test Again
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
