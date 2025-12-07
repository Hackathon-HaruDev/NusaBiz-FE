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
    const [tokenVerified, setTokenVerified] = useState(false); // Status verifikasi token dari URL

    const location = useLocation();
    const navigate = useNavigate();

    // --- EFFECT: Verifikasi Token dari URL ---
    useEffect(() => {
        // Supabase menempatkan token di hash: #access_token=...&refresh_token=...
        const hash = location.hash;
        
        if (hash.includes('access_token')) {
            // Jika token ditemukan, asumsikan Supabase SDK di client sudah memproses token tersebut
            // dan menetapkan sesi pemulihan.
            setTokenVerified(true);
            setMessage("Masukkan kata sandi baru Anda.");
        } else {
            setError("Tautan pemulihan tidak valid atau sudah kadaluarsa. Silakan mulai ulang proses pemulihan.");
            setIsLoading(false);
        }
    }, [location]);

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);

    // --- HANDLER: Reset Password ---
    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setIsLoading(true);

        // 1. Validasi
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
            // Catatan: Endpoint ini memerlukan token pemulihan di header Authorization (Bearer token)
            // yang harus disediakan oleh Supabase SDK setelah redirect dari email.
            const data = await APICall('/auth/reset-password', 'PUT', { newPassword });

            setMessage('Kata sandi berhasil diatur ulang! Mengarahkan ke halaman login...');
            
            setTimeout(() => {
                navigate(listed.auth); // Ganti dengan rute login Anda yang sebenarnya, misalnya '/auth'
            }, 3000);

        } catch (err: any) {
            console.error('Password Reset Error:', err.message);
            setError(err.message || 'Gagal mengatur ulang kata sandi.');
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