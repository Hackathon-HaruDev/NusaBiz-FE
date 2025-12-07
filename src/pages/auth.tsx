import React from "react";
import AuthToggle from "../components/auth/toggle";
import { authFunction } from "../functions/auth_function";
import PasswordObscure from "../components/auth/obscure";
import BusinessSetupModal from "../components/business/BusinessSetupModal";

const Auth: React.FC = () => {
    const { 
        currentTab, handleTabChange, handleAuth, 
        email, setEmail, password, setPassword, confirmPassword, setConfirmPassword,
        showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword,
        isLoading, error, 
        forgotPasswordMessage, handleForgotPassword, handleForgotPasswordClick
    } = authFunction();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

                <AuthToggle activeTab={currentTab} onTabChange={handleTabChange} />
                
                <div className="flex flex-col items-center mb-6 px-8">
                    <p className="text-gray-800 font-semibold text-base mb-1">NusaBiz</p>
                    <p className="text-gray-500 text-xs text-center">Aplikasi Manajemen Bisnis Berbasis AI</p>
                </div>

        <div className="flex flex-col items-center mb-6 mt-4">
          <p className="text-white font-bold text-xl sm:text-2xl mb-1">
            NusaBiz
          </p>
          <p className="text-gray-400 text-xs sm:text-sm text-center">
            Aplikasi Manajemen Bisnis Berbasis AI
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

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
                            <a 
                                href="#" 
                                onClick={handleForgotPasswordClick}
                                className="block text-right text-xs text-blue-500 mt-1 hover:text-blue-700 transition duration-150"
                            >
                                Lupa password?
                            </a>
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

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0f172a] text-white border border-gray-600 p-3 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 pr-10 placeholder-gray-500"
                required
              />
              <PasswordObscure
                isVisible={showPassword}
                toggleFunction={togglePasswordVisibility}
              />
            </div>
            {currentTab === "masuk" && (
              <a
                href="#"
                className="block text-right text-xs text-blue-400 mt-2 hover:text-blue-300 transition duration-150"
              >
                Lupa password?
              </a>
            )}
          </div>

          {currentTab === "daftar" && (
            <div>
              <label
                htmlFor="cpassword"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  id="cpassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Konfirmasi Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#0f172a] text-white border border-gray-600 p-3 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 pr-10 placeholder-gray-500"
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
            className="w-full bg-blue-600 text-white font-semibold p-3 mt-4 rounded-lg hover:bg-blue-700 transition duration-150 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading
              ? "Loading..."
              : currentTab === "masuk"
              ? "Login"
              : "Register"}
          </button>
        </form>
      </div>

      <BusinessSetupModal
        isOpen={showBusinessSetup}
        onClose={() => setShowBusinessSetup(false)}
      />
    </div>
  );
};

export default Auth;
