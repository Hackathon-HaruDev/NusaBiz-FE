import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AuthProtectLayout = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("userToken");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Invalid token");
        }

        setIsValid(true);
      } catch (err) {
        localStorage.removeItem("userToken");
        setIsValid(false);
      }
    };

    validateToken();
  }, [token]);

  if (isValid === null) {
    return <div>Loading...</div>;
  }

  if (isValid === false) {
    return <Navigate to="/Auth" replace />;
  }

  return <>{children}</>;
};

export default AuthProtectLayout;
