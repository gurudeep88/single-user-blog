import { getCookie } from "./auth";

export const POST = async(params: {url: string, payload: any, isAuth?: boolean, isForm?: boolean }) => {
    const { url, payload, isAuth, isForm } = params;
    const cookie = !isAuth ? await getCookie('x_access_token') : '';
    const authHeaders = {
                        'Accept': 'application/json',
                        ...(isForm ? {} : { 'Content-Type': 'application/json' }),
                        ...(isAuth ? {} : { 'Authorization': `Bearer ${cookie}` })
                    };
    const body = isForm ? payload : JSON.stringify(payload);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: authHeaders,
            body 
        });
        return await response.json();
    } catch (error) {
        console.error( error);
    }
}

export const GET = async(params: {url: string, isAuth?: boolean }) => {
    const { url, isAuth } = params;
    const cookie = await getCookie('x_access_token');
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...(isAuth ? {} : { 'Authorization': `Bearer ${cookie}` })
            },
        })
        if(response.status === 200){
            if(isAuth){
                console.log('Logged out successfully!');
            }else{
                const json = await response.json();
                return json;
            }
            
        }
    } catch (error) {
        console.error(error);
    }
}

export const DELETE = async(params: {url: string, isAuth?: boolean }) => {
    const { url, isAuth } = params;
    const cookie = await getCookie('x_access_token');
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...(isAuth ? {} : { 'Authorization': `Bearer ${cookie}` })
            },
        })
        if(response.status === 200){
            if(isAuth){
                console.log('Account deleted successfully!');
            }else{
                const json = await response.json();
                return json;
            }
            
        }
    } catch (error) {
        console.error(error);
    }
}