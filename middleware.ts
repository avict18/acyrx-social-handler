import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const { data: { session } } = await supabase.auth.getSession()

  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      url.search = `redirected_from=${req.nextUrl.pathname}`
      return NextResponse.redirect(url)
    }
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
