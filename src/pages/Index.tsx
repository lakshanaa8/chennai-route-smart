import { useState } from "react";
import AuthPage from "@/components/auth/AuthPage";
import BusTracker from "@/components/bus/BusTracker";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; phone: string } | null>(null);

  const handleLogin = (userData: { name: string; phone: string }) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return <BusTracker user={user} />;
};

export default Index;