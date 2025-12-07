import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { listed } from "../constant/listed";
import APICall from "./callapi";

type AuthOption = "masuk" | "daftar";

export const authFunction = () => {
  const [currentTab, setCurrentTab] = useState<AuthOption>("masuk");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState<
    string | null
  >(null);

  const [showBusinessSetup, setShowBusinessSetup] = useState(false);

  const navigate = useNavigate();

  const handleTabChange = (tab: AuthOption) => {
    setCurrentTab(tab);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
    setForgotPasswordMessage(null);
    setIsLoading(false);
  };

  const checkUserHasBusiness = async (): Promise<boolean> => {
    try {
      const businesses = await APICall("/businesses");
      if (businesses && businesses.length > 0) {
        localStorage.setItem("business_id", businesses[0].id.toString());
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const registerUser = async () => {
    if (password !== confirmPassword) {
      setError("Password dan Konfirmasi Password tidak cocok!");
      return;
    }

    try {
      const data = await APICall("/auth/register", "POST", { email, password });

      const token = data.token;
      localStorage.setItem("userToken", token);
      localStorage.setItem("access_token", token);

      setShowBusinessSetup(true);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan jaringan.");
    }
  };

  const loginUser = async () => {
    try {
      const data = await APICall("/auth/login", "POST", { email, password });

      const token = data.token;
      localStorage.setItem("userToken", token);
      localStorage.setItem("access_token", token);

      const hasBusiness = await checkUserHasBusiness();
      if (hasBusiness) {
        navigate(listed.dashboard);
      } else {
        setShowBusinessSetup(true);
      }
      setError(null);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan jaringan.");
    }
  };

  const handleForgotPassword = async (emailToReset: string) => {
    setError(null);
    setForgotPasswordMessage(null);
    setIsLoading(true);

    try {
      await APICall("/auth/forgot-password", "POST", { email: emailToReset });

      setForgotPasswordMessage(
        "Jika email Anda terdaftar, tautan pemulihan sandi telah dikirim ke kotak masuk Anda."
      );
    } catch (err: any) {
      setForgotPasswordMessage(
        "Jika email Anda terdaftar, tautan pemulihan sandi telah dikirim ke kotak masuk Anda."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (currentTab === "daftar") {
      await registerUser();
    } else {
      await loginUser();
    }

    setIsLoading(false);
  };

  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isLoading) return;

    if (!email) {
      setError("Masukkan alamat email Anda terlebih dahulu di kolom Email.");
      return;
    }

    handleForgotPassword(email);
  };

  const handleBusinessSetupClose = () => {
    setShowBusinessSetup(false);
  };

  return {
    currentTab,
    email,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    isLoading,
    error,
    handleTabChange,
    handleAuth,
    setEmail,
    setPassword,
    setConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    forgotPasswordMessage,
    handleForgotPassword,
    handleForgotPasswordClick,
    showBusinessSetup,
    handleBusinessSetupClose,
  };
};
