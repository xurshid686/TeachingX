import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { email, score, total, percentage, test_name } = await req.json()
    if (!email || score === undefined) {
      return NextResponse.json({ ok: false, error: 'Missing fields' }, { status: 400 })
    }
    const { error } = await supabaseAdmin
      .from('test_scores')
      .insert({ email, score, total, percentage, test_name })
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
