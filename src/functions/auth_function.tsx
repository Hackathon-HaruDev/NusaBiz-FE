import { useState } from 'react';
import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import { listed } from '../constant/listed';

type AuthOption = "masuk" | "daftar";

export const authFunction = () => {
    const [currentTab, setCurrentTab] = useState<AuthOption>('masuk');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate()

    const handleTabChange = (tab: AuthOption) => {
        setCurrentTab(tab);
        setEmail('');
        setPassword('');
        setConfirmPassword(''); 
        setError(null);
        setIsLoading(false);
        console.log(`Tab changed to: ${tab}`);
    };
    
    const registerUser = async () => {
        if (password !== confirmPassword) {
            setError('Password dan Konfirmasi Password tidak cocok!');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();
            
            if (!response.ok || !result.success) {
                const errorMessage = result.error?.message || 'Pendaftaran gagal. Coba lagi.';
                throw new Error(errorMessage);
            }
            
            console.log("Pendaftaran Berhasil!", result.data);
            alert('Pendaftaran berhasil! Silakan Login.');
            setCurrentTab('masuk');
            setError(null);

        } catch (err: any) {
            console.error('Register Error:', err.message);
            setError(err.message || 'Terjadi kesalahan jaringan.');
        }
    };

    const loginUser = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                const errorMessage = result.error?.message || 'Login gagal. Cek email dan password Anda.';
                throw new Error(errorMessage);
            }
            
            const token = result.data.token;
            localStorage.setItem('userToken', token);
            navigate(listed.dashboard);
            setError(null);

        } catch (err: any) {
            console.error('Login Error:', err.message);
            setError(err.message || 'Terjadi kesalahan jaringan.');
        }
    };
    
    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (currentTab === 'daftar') {
            await registerUser();
        } else {
            await loginUser();
        }
        
        setIsLoading(false);
    };

    return {
        // State
        currentTab, email, password, confirmPassword,
        showPassword, showConfirmPassword,
        isLoading, error,
        
        // Handlers
        handleTabChange, handleAuth,
        setEmail, setPassword, setConfirmPassword,
        setShowPassword, setShowConfirmPassword
    };
}