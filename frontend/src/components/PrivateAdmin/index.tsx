'use client';
import { isAuth } from '@/api/auth';
import { ROLE } from '@/constant';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const PrivateAdmin = ({children}: {
    children: React.ReactNode
}) => {
    const router = useRouter();

    useEffect(() => {
        if(!isAuth()){
            router.push('/login')
        }else if(isAuth() && isAuth().role !== ROLE.Admin){
            router.push('/')
        }
    },[]);

  return (
    <>
        {children}
    </>
  )
}

export default PrivateAdmin