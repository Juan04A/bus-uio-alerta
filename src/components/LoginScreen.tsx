import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Bus, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginScreenProps {
  onLogin: (username: string, password: string) => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Por favor ingrese usuario y contraseña",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simular autenticación
    setTimeout(() => {
      onLogin(username, password);
      setIsLoading(false);
    }, 1000);
  };

  const currentHour = new Date().getHours();
  const greeting = 
    currentHour < 12 ? "Buenos días" :
    currentHour < 18 ? "Buenas tardes" :
    "Buenas noches";

  return (
    <div className="min-h-screen bg-gradient-to-br from-university via-university-dark to-university flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-white/10 border-white/20 backdrop-blur-sm">
        <CardContent className="p-8 space-y-6">
          {/* Logo y título */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-white/20 p-3 rounded-full">
                <Bus className="w-8 h-8 text-white" />
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">UEES</h1>
                <div className="flex items-center space-x-1">
                  <Bell className="w-4 h-4" />
                  <span className="text-sm">Bus Alert</span>
                </div>
              </div>
            </div>
            
            <div className="text-white text-center">
              <h2 className="text-xl font-semibold">BUEES Go</h2>
              <p className="text-white/80 text-sm mt-2">
                {greeting}
              </p>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white/20"
              />
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white/20"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-all duration-200"
            >
              <Lock className="w-4 h-4 mr-2" />
              {isLoading ? "INGRESANDO..." : "INGRESAR CON CONTRASEÑA"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-white/60 text-xs">
              Sistema de notificaciones de transporte universitario
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;