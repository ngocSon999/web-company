import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { useAuth } from "../contexts/authContext";

export default function Logout() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await authService.logout();
        logout()

        // ✅ redirect về trang chủ / login
        navigate("/");
      } catch (err: any) {
        setError(
          err?.response?.data?.message || "Đăng xuất thất bại"
        );
      }
    };

    doLogout();
  }, [navigate]);

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return <p>Đang đăng xuất...</p>;
}
