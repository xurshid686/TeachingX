import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">English Academy</h1>
        <p className="text-center mb-8">Student Portal</p>
        <Link href="/login">
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 text-lg">
            Student Login
          </button>
        </Link>
        <p className="text-center mt-6 text-sm text-gray-600">
          Only registered students can log in.<br/>
          Contact your teacher for access.
        </p>
      </div>
    </div>
  )
}
