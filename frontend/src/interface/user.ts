import { Dispatch, SetStateAction } from "react";
import { APIResponseProps } from "./api";

export interface LoginUser {
    email: string,
    password: string,
}

export interface User extends LoginUser {
    name: string
}

export interface UserProps extends User, APIResponseProps {
    show: boolean
}

export interface LoginUserProps extends LoginUser, APIResponseProps {
    name?: string,
    show: boolean
}

export interface LocalStorageUser {
    _id: string;
    name: string;
    email: string;
    username: string;
}

export interface APIUser {
    role: number;
    name: string;
}

export interface AuthContextType {
    user: APIUser | null;
    setUser: Dispatch<SetStateAction<APIUser | null>>
}

export interface PostedByUser {
    _id: string;
    name: string;
    username: string;
}