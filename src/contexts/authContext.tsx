// contexts/AuthContext.tsx
//Tạo Context -> Đổ dữ liệu vào Context (Provider) -> useContext = lấy dữ liệu đó ra
import { createContext, useContext, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  customer: any | null;
  login: (token: string, customer: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("customer_token")
  );

  const [customer, setCustomer] = useState<any>(() => {
    const c = localStorage.getItem("customer");
    return c ? JSON.parse(c) : null;
  });

  const login = (token: string, customerData: any) => {
    localStorage.setItem("customer_token", token);
    localStorage.setItem("customer", JSON.stringify(customerData));
    setIsLoggedIn(true);
    setCustomer(customerData);
  };

  const logout = () => {
    localStorage.removeItem("customer_token");
    localStorage.removeItem("customer");
    setIsLoggedIn(false);
    setCustomer(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, customer, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

