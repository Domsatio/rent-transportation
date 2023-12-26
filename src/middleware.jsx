import { withAuth } from 'next-auth/middleware';

export default withAuth(
  async function middleware(req, res, next) {
    if (req.nextUrl.pathname.startsWith('/admin') && !req.token) {
      return NextResponse.redirect(new URL('/admin/sign-in', req.url));
    }
    // return next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return token?.role === 'admin';
        } else if (req.nextUrl.pathname === '/profile') {
          return token?.role === 'user';
        }
        return false;
      },
    },
  }
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sign-in|register|admin/sign-in|img|$).*)',
  ],
};