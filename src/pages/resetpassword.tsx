// src/pages/ResetPassword.tsx

import React from 'react';
import { Loader2, Key, ChevronLeft } from 'lucide-react'; // Tambahkan ChevronLeft untuk navigasi
import PasswordObscure from '../components/auth/obscure'; // Re-use komponen
import { resetPasswordFunction } from '../functions/resetpassword_function'; // Import function hook

const ResetPassword: React.FC = () => {
    const { 
        // State
        newPassword,
        confirmPassword,
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
        handleGoToLogin,
    } = resetPasswordFunction();
    
    // Styles (jika diperlukan)
    const inputClasses = "w-full bg-gray-100 p-3 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150 pr-10";

    return(
        <div className="flex justify-center items-center h-screen bg-black/30">
            <div className="bg-white/75 p-1 rounded-3xl shadow-2xl md:w-30 lg:w-96 w-80 lg:scale-130">

                <div className="flex flex-col items-center mb-6 px-8 pt-6">
                    <Key className="w-8 h-8 text-(--primary) mb-2" />
                    <p className="text-gray-800 font-bold text-lg mb-1">Atur Ulang Kata Sandi</p>
                    <p className="text-gray-500 text-xs text-center">Masukkan sandi baru Anda.</p>
                </div>

                {/* Display Message */}
                {(error || message) && (
                    <div className="mx-8 mb-4">
                        <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
                            error 
                                ? 'bg-red-100 text-red-700' 
                                : 'bg-green-100 text-green-700'
                        }`}>
                            {error || message}
                        </div>
                    </div>
                )}
                
                {tokenVerified && !error && (
                    <form className="flex flex-col gap-4 px-8 pb-8" onSubmit={handlePasswordReset}>
                        {/* New Password */}
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi Baru</label>
                            <div className="relative">
                                <input 
                                    id="newPassword"
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Kata Sandi Baru" 
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className={inputClasses}
                                    disabled={isLoading}
                                    required
                                />
                                <PasswordObscure 
                                    isVisible={showPassword} 
                                    toggleFunction={togglePasswordVisibility} 
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Kata Sandi Baru</label>
                            <div className="relative">
                                <input 
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder="Konfirmasi Kata Sandi" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={inputClasses}
                                    disabled={isLoading}
                                    required
                                />
                                <PasswordObscure 
                                    isVisible={showConfirmPassword} 
                                    toggleFunction={toggleConfirmPasswordVisibility} 
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-(--primary) text-white font-semibold p-3 mt-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-150 flex items-center justify-center gap-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                'Atur Ulang Kata Sandi'
                            )}
                        </button>
                    </form>
                )}
                
                {/* Tombol kembali ke Login jika ada error token */}
                {error && (
                    <div className="px-8 pb-8">
                         <button 
                            onClick={handleGoToLogin}
                            className="w-full mt-4 text-blue-600 border border-blue-600 font-semibold p-3 rounded-lg hover:bg-blue-50 transition duration-150 flex items-center justify-center gap-2"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Kembali ke Halaman Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ResetPassword;