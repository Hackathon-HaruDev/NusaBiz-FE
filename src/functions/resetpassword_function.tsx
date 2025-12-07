// src/functions/reset_password_function.tsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import APICall from './callapi'; // Import fungsi API Anda
import { listed } from '../constant/listed'; // Asumsi listed.auth = '/auth'

export const resetPasswordFunction = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [tokenVerified, setTokenVerified] = useState(false);
    const [recoveryToken, setRecoveryToken] = useState<string | null>(null);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const hash = location.hash;
        
        if (hash.includes('access_token')) {
            const params = new URLSearchParams(hash.substring(1));
            const token = params.get('access_token');
            
            if (token) {
                setRecoveryToken(token);
                setTokenVerified(true);
                setMessage("Token pemulihan valid. Masukkan kata sandi baru Anda.");
            } else {
                 setError("Token pemulihan tidak ditemukan.");
            }

        } else {
            setError("Tautan pemulihan tidak valid atau sudah kadaluarsa. Silakan mulai ulang proses pemulihan.");
        }
        setIsLoading(false);
    }, [location]);

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setIsLoading(true);

        if (!tokenVerified || !recoveryToken) {
             setError('Sesi pemulihan tidak valid atau sudah hilang. Coba lagi dari email.');
             setIsLoading(false);
             return;
        }

        if (newPassword.length < 8) {
            setError('Kata sandi baru minimal harus 8 karakter.');
            setIsLoading(false);
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Kata sandi baru dan konfirmasi tidak cocok.');
            setIsLoading(false);
            return;
        }
        
        try {
            await APICall('/auth/reset-password', 'PUT', { newPassword }, false, recoveryToken);

            setMessage('Kata sandi berhasil diatur ulang! Mengarahkan ke halaman login...');
            
            setTimeout(() => {
                navigate(listed.auth);
            }, 3000);

        } catch (err: any) {
            console.error('Password Reset Error:', err.message);
            if (err.message.includes('recovery session') || err.message.includes('expired')) {
                 setError('Sesi pemulihan kedaluwarsa. Silakan minta tautan pemulihan baru.');
            } else {
                 setError(err.message || 'Gagal mengatur ulang kata sandi.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    // Handler untuk tombol "Kembali ke Login"
    const handleGoToLogin = () => {
         navigate(listed.auth); // Ganti dengan rute login Anda
    }

    return {
        // State Data
        newPassword,
        confirmPassword,
        
        // UI State
        isLoading,
        message,
        error,
        tokenVerified,
        showPassword,
        showConfirmPassword,
        
        // Handlers
        setNewPassword,
        setConfirmPassword,
        togglePasswordVisibility,
        toggleConfirmPasswordVisibility,
        handlePasswordReset,
        handleGoToLogin, // Export handler navigasi
    };
};