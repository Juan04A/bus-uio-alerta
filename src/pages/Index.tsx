import { useState } from "react";
import LoginScreen from "@/components/LoginScreen";
import BusAlert from "@/components/BusAlert";

const Index = () => {
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (username: string, password: string) => {
    // Simulamos autenticación simple
    if (username && password) {
      setUser(username);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <BusAlert username={user} onLogout={handleLogout} />;
};

export default Index;
