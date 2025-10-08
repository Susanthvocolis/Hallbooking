import Cookies from 'js-cookie';

export async function apiFetch(endpoint: string, method: string, data?: any): Promise<any> {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}${endpoint}`;
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Cookies.get('jwt_token')}`,
        },
        body: JSON.stringify(data),
    };
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`API error: ${res.statusText}`);
    }
    return res.json();
}

export async function authApiFetch(endpoint: string, method: string, data?: any): Promise<any> {
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}${endpoint}`;
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    const res = await fetch(url, options);
    console.log('API Response:', res);
    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }
    return res.json();
}