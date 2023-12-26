import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
export default function Layout({children}) {
  const router  = useRouter();
    if(router.pathname === '/login' || router.pathname === '/register') 
        return null
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
        {children}
    </div>
  )
}
