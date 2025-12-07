export const APICall = async (endpoint: string, method: string = 'GET', data: any = null) => {
    const token = localStorage.getItem('userToken');
    if (!token && endpoint !== '/auth/login' && endpoint !== '/auth/register') {
        throw new Error('Autentikasi diperlukan. Token hilang.');
    }

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
        method: method,
        headers: headers,
    };

    if (data && method !== 'GET' && method !== 'HEAD') {
        config.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}${endpoint}`, config);
        const result = await response.json();
        
        if (!response.ok || !result.success) {
            // Melemparkan pesan error yang diterima dari API
            const errorMessage = result.error?.message || `API Error: ${response.statusText}`;
            throw new Error(errorMessage);
        }

        return result.data;
    } catch (error) {
        const errorMessage = (error as Error).message || 'Terjadi kesalahan jaringan atau CORS.';
        throw new Error(errorMessage);
    }
};

export default APICall;