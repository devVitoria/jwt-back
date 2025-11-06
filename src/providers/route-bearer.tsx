'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    console.log("Ta entrandpa aqu i nessa bucet")
    const token = localStorage.getItem('Token')

    const publicRoutes = ['/login', '/register']
    if (!token && !publicRoutes.includes(pathname)) {
      console.log('vai voltra pro loginnn')
      router.replace('/login')
    }
  }, [pathname, router])

  return <>{children}</>
}

export default AuthGuard
