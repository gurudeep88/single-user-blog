"use client";
import { authenticate, loginApi } from "@/api/auth";
import LoginRegister from "@/components/LoginRegister";
import { useAuth } from "@/context/auth";
import { LoginUserProps } from "@/interface/user";
import { initialLoginUser } from "@/state/user";
import { authRedirect } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Login = () => {
  const {user} = useAuth();
  const router = useRouter();
  const [state, setState] = useState<LoginUserProps>(initialLoginUser)
  const { email, password} = state;
  const {setUser} = useAuth();

  useEffect(() => {
    authRedirect(router);
  }, [user, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState({...state, error: '', [name]: value});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({...state, loading: true, error: ''});
    const user = { email, password};
    const data = await loginApi(user);
    if(data?.error){
        setState({...state, error: data.error, loading: false});
    }else{
      authenticate(data, () => {
        setUser(data.user);
        authRedirect(router);
      })
      
    }
  };

  return (
    <LoginRegister 
        isRegister={false}
        state={state}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
    />
  );
};

export default Login;
