// import { withAuth } from 'next-auth/middleware'
// import { authOptions } from "./pages/api/auth/[...nextauth]";

import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req, res, next) {
    const excludedRoutes = ['/admin/sign-in', '/sign-up', '/sign-in', '/forgot-password', '/reset-password', '/profile'];
    if (excludedRoutes.includes(req.nextUrl.pathname)) {
      return next();
    }

    // Your authentication logic goes here
    if (!req.token?.role) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Authorized, continue to the next middleware or route handler
    return next();
  },
  {
    callbacks: {
      // authorized: ({ token }) => token?.role === "admin",
      // authorized: ({ token, req }) => {
      //   if(req.nextUrl.pathname.startsWith('/admin')) {
      //     return token?.role === "admin"
      //   }else if(req.nextUrl == '/profile') {
      //     return token?.role === "user"
      //   }
      // }
    },
  }
)

export const config = { api: { bodyParser: false } };
