import { getCookie } from "./auth";

export const POST_SERVER = async(params: {url: string, payload: any}) => {
    const { url, payload} = params;
    const authHeaders = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    };
                    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify(payload) 
        });
        return await response.json();
    } catch (error) {
        console.error( error);
    }
}

export const GET_SERVER = async(params: { url: string }) => {
    const { url } = params;
    const authHeaders = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    };
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: authHeaders
        });
        return await response.json();
    } catch (error) {
        console.error( error);
    }
}

export const DELETE_SERVER = async(params: {url: string}) => {
    const { url} = params;
    const cookie = await getCookie('x_access_token');
    const authHeaders = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${cookie}`
                    };
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: authHeaders
        });
        return await response.json();
    } catch (error) {
        console.error( error);
    }
}

export const UPDATE_SERVER = async(params: {url: string, payload: any, isForm: boolean}) => {
    const { url, payload, isForm} = params;
    console.log('url para', url, payload, payload.get('title'))
    const cookie = await getCookie('x_access_token');
    const authHeaders = {
                        'Accept': 'application/json',
                        ...(isForm ? {} : {'Content-Type': 'application/json'}),
                        'Authorization': `Bearer ${cookie}`
                    };
    const body = isForm ? payload : JSON.stringify(payload);
    console.log('body', body)
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: authHeaders,
            body
        });
        return await response.json();
    } catch (error) {
        console.error( error);
    }
}