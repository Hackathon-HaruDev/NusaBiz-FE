export const APICall = async (endpoint: string, method: string = 'GET', data: any = null, isFormData: boolean = false) => {
    const token = localStorage.getItem('userToken');

    const isPublicEndpoint = [
        '/auth/login', 
        '/auth/register', 
        '/auth/forgot-password',
    ].some(publicPath => endpoint.includes(publicPath));

    if (!token && !isPublicEndpoint) {
        throw new Error('Autentikasi diperlukan. Token hilang.');
    }

    const headers: HeadersInit = {};
    const config: RequestInit = {
        method: method,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (isFormData) {
        config.body = data;
        config.headers = headers; 
    } else {
        headers['Content-Type'] = 'application/json';
        config.headers = headers;
        if (data && method !== 'GET' && method !== 'HEAD') {
            config.body = JSON.stringify(data);
        }
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}${endpoint}`, config);
        const result = await response.json();
        
        if (!response.ok || !result.success) {
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