import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Grab the current path and the user's role from the cookie
  const path = request.nextUrl.pathname;
  const roleCookie = request.cookies.get('user_role')?.value;

  // 2. Define our protected route structures
  const isAuthRoute = path === '/login' || path === '/register';
  const isStudentRoute = path.startsWith('/student');
  const isLecturerRoute = path.startsWith('/lecturer');
  const isAdminRoute = path.startsWith('/admin');

  // 3. Handle Logged-Out Users
  if (!roleCookie && (isStudentRoute || isLecturerRoute || isAdminRoute)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. Handle Logged-In Users trying to access Login/Register
  if (roleCookie && isAuthRoute) {
    if (roleCookie === 'admin') return NextResponse.redirect(new URL('/admin/users', request.url));
    if (roleCookie === 'lecturer') return NextResponse.redirect(new URL('/lecturer/courses', request.url));
    if (roleCookie === 'student') return NextResponse.redirect(new URL('/student/courses', request.url));
  }

  // 5. Enforce Strict Role-Based Access Control (RBAC)
  if (isStudentRoute && roleCookie !== 'student') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (isLecturerRoute && roleCookie !== 'lecturer') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (isAdminRoute && roleCookie !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 6. Allow the request to proceed if all checks pass
  return NextResponse.next();
}

// 7. Tell Next.js which paths this middleware should run on
export const config = {
  matcher: [
    '/login',
    '/register',
    '/student/:path*',
    '/lecturer/:path*',
    '/admin/:path*'
  ],
};