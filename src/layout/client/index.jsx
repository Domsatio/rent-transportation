'use client'
import React from 'react'
import { useRouter } from 'next/router'
import ComplexNavbar from '@/component/client/navbar';
import { useSession } from 'next-auth/react';

export default function LayoutClient({children}) {
    const router = useRouter();
    const { data: session, status } = useSession();
    // if(!session) return router.push('/sign-in');
    if(router.pathname.includes('/admin') || router.pathname == '/sign-in' || router.pathname == '/register') return (
        <div>
            {children}
        </div>
    )
    
  return (
    <div>
        <ComplexNavbar />
        {children}
    </div>
  )
}
