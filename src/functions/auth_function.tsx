import { useState } from 'react';
import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import { listed } from '../constant/listed';
import APICall from './callapi';

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
            const data = await APICall('/auth/register', 'POST', { 
                email, 
                password,
            });

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
            const data = await APICall('/auth/login', 'POST', { email, password });
            
            const token = data.token;
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