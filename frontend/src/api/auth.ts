'use client';
import { APIUser, LoginUser, User } from "@/interface/user";
import { COOKIE_EXPIRES_DURATION } from '../constant';
import Cookies from 'js-cookie';
import { GET, POST } from "./http";
import { API_DEVELOPMENT_SERVICE } from "@/config";



export const registerApi = async(user: User) => {
    const url = `${API_DEVELOPMENT_SERVICE}/register`;
    const payload = user;
    return await POST({ url, payload, isAuth: true });
}

export const loginApi = async(user: LoginUser) => {
    const url = `${API_DEVELOPMENT_SERVICE}/login`;
    const payload = user;
    return await POST({ url, payload, isAuth: true });
}

export const logout = (next: () => void) => {
    removeCookie('x_access_token');
    removeLocalStorage('multi_blog_user');

    GET({url: `${API_DEVELOPMENT_SERVICE}/logout`, isAuth: true})
    next();
}

// set cookie
export const setCookie = (key: string, value: string) => {
    Cookies.set(key, value, {expires: COOKIE_EXPIRES_DURATION})
}

// get cookie
export const getCookie = (key: string) => {
    return Cookies.get(key);
}

//remove cookie
export const removeCookie = (key: string) => {
    Cookies.remove(key);
}

//localstorage
export const setLocalStorage = (key: string, value: APIUser) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStorage = (key: string) => {
        if(localStorage.getItem(key)){
            return JSON.parse(localStorage.getItem(key)!);
        }else{
            return null;
        }
}

export const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key);
}

// authenticate user by pass data to cookie and localstorage
export const authenticate = (data: {token: string, user: APIUser}, next: ()=>void) => {
    setCookie('x_access_token', data.token);
    setLocalStorage('multi_blog_user', data.user);
    next()
}

export const isAuth = () => {
    const cookie = getCookie('x_access_token');
    if(cookie){
        if(localStorage.getItem('multi_blog_user')){
            return getLocalStorage('multi_blog_user')
        }else{
            return false;   
        }
    }else{
        return false;
    }
}