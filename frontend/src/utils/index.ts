'use client';
import { isAuth } from "@/api/auth";
import { ROLE } from "@/constant";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const authRedirect =(
    router: AppRouterInstance, 
    isRegister?: boolean
) => {
    if(isAuth()) {
        if(isAuth().role === ROLE.Admin){
            router.push('/admin');
        }else{
            router.push('/user');
        }
    }else{
        router.push(isRegister ? '/register' : '/login');
    }
}

export const parseHTMLTextContent = (str: string) => {
    if(!str){ return null}
    return str.replace(/<\/?[^>]+(>|$)/g, ""); 
}

export const parseDOM = (payload: string) => {
    // Create a DOMParser instance
        const parser = new DOMParser();

        // Parse the HTML string into a Document object
        const doc = parser.parseFromString(payload, "text/html");

        // Extract the content
        return doc.body.textContent || "";
}