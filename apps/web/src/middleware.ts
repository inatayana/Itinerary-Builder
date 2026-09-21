import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const headersList = headers();
  const pathname = request.url.split('/').pop() || '';

  if (pathname === 'api/itinerary' && request.method === 'POST') {
    const body = request.clone().text();
    if (!body) {
      return NextResponse.json({ error: 'Request body required' }, { status: 400 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
