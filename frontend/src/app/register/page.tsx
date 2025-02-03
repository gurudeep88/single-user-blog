"use client";
import { registerApi } from "@/api/auth";
import LoginRegister from "@/components/LoginRegister";
import { useAuth } from "@/context/auth";
import { UserProps } from "@/interface/user";
import { initialUser } from "@/state/user";
import { authRedirect } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Register = () => {
  const {user} = useAuth();
  const router = useRouter();
  const [state, setState] = useState<UserProps>(initialUser)

  const { name, email, password} = state;

  useEffect(() => {
    authRedirect(router, true);
  }, [user, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState({...state, error: '', [name]: value});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({...state, loading: true, error: ''});
    const user = { name, email, password};
    const data = await registerApi(user);
    if(data.error){
        setState({...state, error: data.error, loading: false});
    }else{
        setState({...initialUser, message: data.message, show: false});
    }
  };

  return (
    <LoginRegister 
        isRegister={true}
        state={state}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
    />
  );
};

export default Register;
