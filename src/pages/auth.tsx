import React from 'react';
import AuthToggle from '../components/auth/toggle';
import { authFunction } from '../functions/auth_function';
import PasswordObscure from '../components/auth/obscure';

const Auth: React.FC = () => {
    const { 
        currentTab, handleTabChange, handleAuth, 
        email, setEmail, password, setPassword, confirmPassword, setConfirmPassword,
        showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword,
        isLoading, error
    } = authFunction();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
    
    return(
        <div className="flex justify-center items-center h-screen bg-black/30">
            <div className="bg-white/75 p-1 rounded-3xl shadow-2xl w-[400px] max-w-sm scale-130">

                <AuthToggle activeTab={currentTab} onTabChange={handleTabChange} />
                
                <div className="flex flex-col items-center mb-6 px-8">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-lg mb-2">
                        <img src="https://placehold.co/400" alt="logo" className='rounded-full' />
                    </div>
                    <p className="text-gray-800 font-semibold text-base mb-1">NusaBiz</p>
                    <p className="text-gray-500 text-xs text-center">Aplikasi Manajemen Bisnis Berbasis AI</p>
                </div>

                <form className="flex flex-col gap-4 px-8 pb-8" onSubmit={handleAuth}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                            id="email"
                            type="email" 
                            placeholder="Masukkan email..." 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-100 p-3 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input 
                                id="password"
                                type={showPassword ? "text" : "password"} 
                                placeholder="Masukkan password..." 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-100 p-3 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150 pr-10"
                                required
                            />
                            <PasswordObscure 
                                isVisible={showPassword} 
                                toggleFunction={togglePasswordVisibility} 
                            />
                        </div>
                        {currentTab === 'masuk' && (
                            <a href="#" className="block text-right text-xs text-blue-500 mt-1 hover:text-blue-700 transition duration-150">lupa password</a>
                        )}
                    </div>
                    
                    {currentTab === 'daftar' && (
                        <div>
                            <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                            <div className="relative">
                                <input 
                                    id="cpassword"
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder="Konfirmasi Password" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-gray-100 p-3 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-150 pr-10"
                                    required
                                />
                                <PasswordObscure 
                                    isVisible={showConfirmPassword} 
                                    toggleFunction={toggleConfirmPasswordVisibility} 
                                />
                            </div>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="w-full bg-white text-black font-semibold p-3 mt-4 rounded-lg shadow-md hover:bg-white transition duration-150"
                    >
                        {isLoading ? (
                            <span>Loading...</span>
                        ) : (
                            currentTab === 'masuk' ? 'Login' : 'Register'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Auth;