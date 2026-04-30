import ProtectRoute from '@/components/ProtectRoute'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function Dashboard() {
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <ProtectRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-700 text-white p-6">
          <h1 className="text-3xl">Welcome back, {user?.email} 👋</h1>
        </div>
        <div className="p-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold">Next Lesson</h3>
              <p className="text-2xl mt-2">Tuesday, 25 Nov – 18:00</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold">Lessons Remaining</h3>
              <p className="text-2xl mt-2">8 / 10</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold">Homework Due</h3>
              <p className="text-2xl mt-2 text-red-600">2 tasks</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/homework" className="bg-orange-500 text-white p-6 rounded text-center hover:bg-orange-600">Homework</Link>
              <Link href="/progress" className="bg-purple-500 text-white p-6 rounded text-center hover:bg-purple-600">My Progress</Link>
              <Link href="/materials" className="bg-teal-500 text-white p-6 rounded text-center hover:bg-teal-600">Materials</Link>
              <Link href="/messages" className="bg-indigo-500 text-white p-6 rounded text-center hover:bg-indigo-600">Messages</Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">📝 Tests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-indigo-200 rounded-xl p-5 hover:border-indigo-400 transition">
                <h3 className="text-lg font-bold text-indigo-800 mb-1">Relative Clause Quiz</h3>
                <p className="text-gray-500 text-sm mb-4">25 questions · Multiple choice · Graded A–F</p>
                <div className="flex gap-3">
                  <Link href="/tests/relative-clause"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm font-semibold">
                    Take Test →
                  </Link>
                  <Link href="/tests/relative-clause/leaderboard"
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm font-semibold">
                    🏆 Leaderboard
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </ProtectRoute>
  )
}
