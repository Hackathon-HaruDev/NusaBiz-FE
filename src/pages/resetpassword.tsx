// src/pages/ResetPassword.tsx

import React from "react";
import { Loader2, Key, ChevronLeft } from "lucide-react";
import PasswordObscure from "../components/auth/obscure";
import { resetPasswordFunction } from "../functions/resetpassword_function";

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

  const inputClasses =
    "w-full bg-[#0f172a] text-white border border-gray-600 p-3 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 pr-10 placeholder-gray-500";

  return (
    <div className="flex justify-center items-center h-screen bg-[#0f172a]">
      <div className="bg-[#1e293b] p-6 rounded-2xl shadow-2xl md:w-96 lg:w-[28rem] w-80 border border-gray-700">
        <div className="flex flex-col items-center mb-6 pt-2">
          <Key className="w-8 h-8 text-blue-400 mb-2" />
          <p className="text-white font-bold text-lg mb-1">
            Atur Ulang Kata Sandi
          </p>
          <p className="text-gray-400 text-xs text-center">
            Masukkan sandi baru Anda.
          </p>
        </div>

        {/* Display Message */}
        {(error || message) && (
          <div className="mb-4">
            <div
              className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
                error
                  ? "bg-red-900/20 border border-red-500/50 text-red-400"
                  : "bg-green-900/20 border border-green-500/50 text-green-400"
              }`}
            >
              {error || message}
            </div>
          </div>
        )}

        {tokenVerified && !error && (
          <form className="flex flex-col gap-4" onSubmit={handlePasswordReset}>
            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Kata Sandi Baru
              </label>
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
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Konfirmasi Kata Sandi Baru
              </label>
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
              className="w-full bg-blue-600 text-white font-semibold p-3 mt-2 rounded-lg hover:bg-blue-700 transition duration-150 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Atur Ulang Kata Sandi"
              )}
            </button>
          </form>
        )}

        {/* Tombol kembali ke Login jika ada error token */}
        {error && (
          <div className="pt-4">
            <button
              onClick={handleGoToLogin}
              className="w-full text-blue-400 border border-blue-500 font-semibold p-3 rounded-lg hover:bg-blue-900/20 transition duration-150 flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Kembali ke Halaman Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
