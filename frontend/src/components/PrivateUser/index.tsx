'use client';
import { isAuth } from '@/api/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const PrivateUser = ({children}: {
    children: React.ReactNode
}) => {
    const router = useRouter();

    useEffect(() => {
        if(!isAuth()){
            router.push('/login')
        }
    },[]);

  return (
    <>
        {children}
    </>
  )
}

export default PrivateUser