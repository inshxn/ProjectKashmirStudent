import { NextRequest, NextResponse } from 'next/server'

const ADMIN_ACCOUNTS = [
  { username: 'admin', password: 'admin123', name: 'Admin User', role: 'super_admin' },
  { username: 'editor', password: 'editor123', name: 'Content Editor', role: 'editor' },
]

export async function POST(request: NextRequest) {
  try {
    const adminSecret = process.env.ADMIN_SECRET_KEY

    // Detailed error so you know exactly what's missing
    if (!adminSecret) {
      console.error('[admin/auth] ADMIN_SECRET_KEY is not set in environment variables')
      return NextResponse.json({
        success: false,
        error: 'ADMIN_SECRET_KEY is missing. Add it in Vercel → Settings → Environment Variables, then redeploy.'
      }, { status: 500 })
    }

    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ success: false, error: 'Username and password are required.' }, { status: 400 })
    }

    const account = ADMIN_ACCOUNTS.find(
      a => a.username === username && a.password === password
    )

    if (!account) {
      return NextResponse.json({ success: false, error: 'Invalid username or password.' }, { status: 401 })
    }

    const response = NextResponse.json({
      success: true,
      data: { name: account.name, role: account.role, username: account.username },
    })

    response.cookies.set('ks_admin_token', adminSecret, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    response.cookies.set('ks_admin_user', JSON.stringify({
      name: account.name,
      role: account.role,
      username: account.username,
    }), {
      httpOnly: false,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (err) {
    console.error('[admin/auth] Unexpected error:', err)
    return NextResponse.json({ success: false, error: 'Server error. Check Vercel logs.' }, { status: 500 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('ks_admin_token')
  response.cookies.delete('ks_admin_user')
  return response
}
