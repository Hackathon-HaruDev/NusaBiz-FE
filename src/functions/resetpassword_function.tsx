import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import APICall from "./callapi";
import { listed } from "../constant/listed";

export const resetPasswordFunction = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tokenVerified, setTokenVerified] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = location.hash;

    if (hash.includes("access_token")) {
      setTokenVerified(true);
      setMessage("Masukkan kata sandi baru Anda.");
    } else {
      setError(
        "Tautan pemulihan tidak valid atau sudah kadaluarsa. Silakan mulai ulang proses pemulihan."
      );
      setIsLoading(false);
    }
  }, [location]);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    if (newPassword.length < 8) {
      setError("Kata sandi baru minimal harus 8 karakter.");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Kata sandi baru dan konfirmasi tidak cocok.");
      setIsLoading(false);
      return;
    }

    try {
      await APICall("/auth/reset-password", "PUT", {
        newPassword,
      });

      setMessage(
        "Kata sandi berhasil diatur ulang! Mengarahkan ke halaman login..."
      );

      setTimeout(() => {
        navigate(listed.auth);
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Gagal mengatur ulang kata sandi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToLogin = () => {
    navigate(listed.auth);
  };

  return {
    newPassword,
    confirmPassword,
    isLoading,
    message,
    error,
    tokenVerified,
    showPassword,
    showConfirmPassword,
    setNewPassword,
    setConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handlePasswordReset,
    handleGoToLogin,
  };
};
