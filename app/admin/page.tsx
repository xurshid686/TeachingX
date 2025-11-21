import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'

export default async function AdminPanel() {
  const { data: users } = await supabaseAdmin.auth.admin.listUsers()

  return (
    <div className="min-h-screen bg-red-50 p-8">
      <h1 className="text-4xl font-bold mb-8 text-red-800">TEACHER ADMIN PANEL</h1>
      <Link href="/admin/register-student">
        <button className="bg-green-600 text-white px-6 py-3 rounded mb-6 text-xl hover:bg-green-700">
          + Register New Student
        </button>
      </Link>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Created</th>
              <th className="p-4 text-left">Last Sign In</th>
            </tr>
          </thead>
          <tbody>
            {users?.users.map((u: any) => (
              <tr key={u.id} className="border-t">
                <td className="p-4">{u.email}</td>
                <td className="p-4">{new Date(u.created_at).toLocaleDateString()}</td>
                <td className="p-4">{u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString() : 'Never'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
