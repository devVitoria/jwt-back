'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem('token')

    const publicRoutes = ['/login', '/register']

    if (!token && !publicRoutes.includes(pathname)) {
      router.replace('/login')
    }
  }, [pathname, router])

  return <>{children}</>
}

export default AuthGuard
