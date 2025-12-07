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
  const [showBusinessSetup, setShowBusinessSetup] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleTabChange = (tab: AuthOption) => {
    setCurrentTab(tab);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
    setIsLoading(false);
    console.log(`Tab changed to: ${tab}`);
  };

  const registerUser = async () => {
    if (password !== confirmPassword) {
      setError("Password dan Konfirmasi Password tidak cocok!");
      return;
    }

    try {
      const data = await APICall("/auth/register", "POST", {
        email,
        password,
      });

      // Save token to localStorage
      const token = data.token;
      localStorage.setItem("userToken", token);
      localStorage.setItem("access_token", token); // For API interceptor

      // Show business setup modal instead of login tab
      setShowBusinessSetup(true);
      setError(null);
    } catch (err: any) {
      console.error("Register Error:", err.message);
      setError(err.message || "Terjadi kesalahan jaringan.");
    }
  };

  const loginUser = async () => {
    try {
      console.log("🔑 Starting login...");
      const data = await APICall("/auth/login", "POST", { email, password });

      console.log("📦 Login response data:", data);

      const token = data.token;
      console.log("🎫 Token extracted:", token ? "EXISTS" : "NULL");

      // Save to localStorage
      localStorage.setItem("access_token", token);
      localStorage.setItem("userToken", token);

      // Verify saved
      const savedToken = localStorage.getItem("access_token");
      console.log(
        "✅ Token saved to localStorage:",
        savedToken ? "SUCCESS" : "FAILED"
      );

      // FETCH USER BUSINESSES
      try {
        console.log("🏢 Fetching user businesses...");
        const businessesData = await APICall("/businesses", "GET");
        console.log("🏢 User businesses:", businessesData);

        if (businessesData && businessesData.length > 0) {
          // User has existing businesses - use the first one for now
          // In a real app, we might check for a 'default' or 'last_active' flag
          const firstBusiness = businessesData[0];
          localStorage.setItem("business_id", firstBusiness.id.toString());
          console.log("💾 Business ID restored:", firstBusiness.id);

          navigate(listed.dashboard);
        } else {
          // User has no businesses yet - prompt setup
          console.log("⚠️ No businesses found for user. Prompting setup.");
          setShowBusinessSetup(true);
        }
      } catch (bizErr) {
        console.error("❌ Failed to fetch businesses:", bizErr);
        // Fallback: If fetch fails but login succeeded, go to dashboard.
        // The dashboard might show errors, but at least user is logged in.
        // Or prompt setup if it seems like a new user issue.
        navigate(listed.dashboard);
      }

      setError(null);
    } catch (err: any) {
      console.error("❌ Login Error:", err.message);
      setError(err.message || "Terjadi kesalahan jaringan.");
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

  return {
    // State
    currentTab,
    email,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    isLoading,
    error,
    showBusinessSetup,

    // Handlers
    handleTabChange,
    handleAuth,
    setEmail,
    setPassword,
    setConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    setShowBusinessSetup,
  };
};
