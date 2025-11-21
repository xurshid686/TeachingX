"use client"

import { useState } from 'react'
import { supabaseAdmin } from '@/lib/supabase'

export default function RegisterStudent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const generatePassword = () => {
    const pass = Math.random().toString(36).slice(-8) + "A1!"
    setPassword(pass)
  }

  const createStudent = async () => {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    if (error) {
      setMessage("Error: " + error.message)
    } else {
      setMessage(`SUCCESS! Send this to student:
Email: ${email}
Password: ${password}
Login: yourdomain.com/login`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-8">Register New Student</h1>
        <input
          type="email"
          placeholder="student@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded mb-4"
        />
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Password"
            value={password}
            readOnly
            className="flex-1 p-3 border rounded"
          />
          <button onClick={generatePassword} className="bg-gray-600 text-white px-4 rounded">
            Generate
          </button>
        </div>
        <button
          onClick={createStudent}
          className="w-full bg-red-600 text-white py-4 rounded text-xl hover:bg-red-700"
        >
          Create Student Account
        </button>
        {message && (
          <div className="mt-6 p-4 bg-gray-100 rounded whitespace-pre-wrap">
            {message}
          </div>
        )}
      </div>
    </div>
  )
}
