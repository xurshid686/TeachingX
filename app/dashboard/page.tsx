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

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/homework" className="bg-orange-500 text-white p-6 rounded text-center hover:bg-orange-600">Homework</Link>
              <Link href="/progress" className="bg-purple-500 text-white p-6 rounded text-center hover:bg-purple-600">My Progress</Link>
              <Link href="/materials" className="bg-teal-500 text-white p-6 rounded text-center hover:bg-teal-600">Materials</Link>
              <Link href="/messages" className="bg-indigo-500 text-white p-6 rounded text-center hover:bg-indigo-600">Messages</Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectRoute>
  )
}
