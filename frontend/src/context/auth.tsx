'use client';
import { getCookie } from '@/api/auth';
import { APIUser, AuthContextType } from '@/interface/user';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<AuthContextType>({ 
    user:  null,
    setUser: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<APIUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const updateUserFromLocalStorage = () => {
    const storedUser: APIUser = JSON.parse(localStorage.getItem('multi_blog_user')!);
    setUser(storedUser);
  };

  useEffect(() => {
    const cookie = getCookie('x_access_token');
    if(cookie){
      setToken(cookie);
    }else{
      setToken(null)
    }
  }, [])

  useEffect(() => {
    // Set initial user value on mount
    updateUserFromLocalStorage();

    // Listen for `storage` events to detect changes to `localStorage`
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'multi_blog_user') {
        updateUserFromLocalStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [token]);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
