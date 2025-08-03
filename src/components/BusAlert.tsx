import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Clock, MapPin, Bus, User, Settings, LogOut, Map } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MapView from "./MapView";
import ueesLogo from "@/assets/uees-logo.png";

interface BusRoute {
  id: string;
  name: string;
  destination: string;
  nextArrival: string;
  status: "en_ruta" | "llegando" | "en_parada";
  estimatedTime: number; // minutes
}

interface BusAlertProps {
  username: string;
  onLogout: () => void;
}

const BusAlert = ({ username, onLogout }: BusAlertProps) => {
  const [busRoutes] = useState<BusRoute[]>([
    {
      id: "1",
      name: "Ruta Norte",
      destination: "Campus Principal - Samborondón",
      nextArrival: "10:45 AM",
      status: "en_ruta",
      estimatedTime: 8
    },
    {
      id: "2", 
      name: "Ruta Sur",
      destination: "Campus Principal - Centro",
      nextArrival: "11:00 AM",
      status: "llegando",
      estimatedTime: 2
    },
    {
      id: "3",
      name: "Ruta Express",
      destination: "Campus Principal - Vía a la Costa",
      nextArrival: "11:15 AM", 
      status: "en_parada",
      estimatedTime: 15
    }
  ]);

  const [notifications, setNotifications] = useState<string[]>([]);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "llegando": return "bg-yellow-500";
      case "en_parada": return "bg-green-500";
      default: return "bg-blue-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "llegando": return "Llegando";
      case "en_parada": return "En parada";
      default: return "En ruta";
    }
  };

  const toggleNotification = (routeId: string) => {
    if (notifications.includes(routeId)) {
      setNotifications(notifications.filter(id => id !== routeId));
      toast({
        title: "Notificación desactivada",
        description: "Ya no recibirás alertas para esta ruta",
      });
    } else {
      setNotifications([...notifications, routeId]);
      toast({
        title: "Notificación activada",
        description: "Recibirás alertas cuando el bus esté cerca",
      });
    }
  };

  useEffect(() => {
    // Simular notificaciones en tiempo real
    const interval = setInterval(() => {
      const route = busRoutes.find(r => r.status === "llegando");
      if (route && notifications.includes(route.id)) {
        toast({
          title: "¡Bus llegando!",
          description: `${route.name} llegará en ${route.estimatedTime} minutos`,
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [notifications, busRoutes, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-university/5 to-university/10">
      {/* Header */}
      <div className="bg-university text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full">
              <img src={ueesLogo} alt="UEES Logo" className="w-8 h-8 rounded object-cover" />
            </div>
            <div>
              <h1 className="text-lg font-bold">BUEES Go</h1>
              <p className="text-sm text-white/80">Sistema de alertas</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="text-sm">{username}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-white hover:bg-white/20"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content with Tabs */}
      <div className="max-w-6xl mx-auto p-4">
        <Tabs defaultValue="routes" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="routes" className="flex items-center space-x-2">
              <Bus className="w-4 h-4" />
              <span>Rutas</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center space-x-2">
              <Map className="w-4 h-4" />
              <span>Mapa</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="routes" className="space-y-6">
            <div className="text-center py-6">
              <h2 className="text-2xl font-bold text-university mb-2">
                Rutas de Bus Disponibles
              </h2>
              <p className="text-muted-foreground">
                Activa las notificaciones para recibir alertas cuando tu bus esté cerca
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {busRoutes.map((route) => (
                <Card key={route.id} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg text-university">
                          {route.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            className={`${getStatusColor(route.status)} text-white`}
                          >
                            {getStatusText(route.status)}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant={notifications.includes(route.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleNotification(route.id)}
                        className={notifications.includes(route.id) ? "bg-university hover:bg-university-dark" : ""}
                      >
                        <Bell className={`w-4 h-4 ${notifications.includes(route.id) ? 'text-white' : ''}`} />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{route.destination}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-university" />
                      <span className="font-medium">Próxima salida: {route.nextArrival}</span>
                    </div>
                    
                    <div className="p-3 bg-university/5 rounded-lg">
                      <p className="text-sm text-center">
                        <span className="font-medium text-university">
                          {route.estimatedTime} minutos
                        </span>
                        <span className="text-muted-foreground ml-1">
                          estimados
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Active notifications info */}
            {notifications.length > 0 && (
              <Card className="bg-university/5 border-university/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Bell className="w-5 h-5 text-university" />
                    <span className="font-medium text-university">
                      Notificaciones Activas
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Tienes {notifications.length} ruta{notifications.length > 1 ? 's' : ''} con notificaciones activadas. 
                    Recibirás alertas cuando los buses estén cerca de tu parada.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="map">
            <div className="rounded-lg overflow-hidden border shadow-lg" style={{ height: 'calc(100vh - 200px)' }}>
              <MapView />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BusAlert;