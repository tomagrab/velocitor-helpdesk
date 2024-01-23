import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from './lib/Types/Database/Database';

export async function middleware(req: NextRequest) {
  console.log('middleware');
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({ req, res });

  // Get the session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If there is no session, redirect to login
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  console.log('session', session);

  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login route without the leading slash)
     */
    '/((?!_next/static|_next/image|favicon.ico|login).*)',
  ],
};
