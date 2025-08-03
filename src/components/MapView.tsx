import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

const MapView = () => {
  const [mapType, setMapType] = useState<'satellite' | 'roadmap'>('roadmap');
  
  // Coordenadas de la UEES en Samborondón, Guayaquil
  const UEES_COORDINATES = "-2.1325,-79.8681";
  
  // Paradas de bus con sus coordenadas
  const busStops = [
    {
      name: "Mall del Sol",
      coords: "-2.1280,-79.8650",
      routes: ["Ruta Norte", "Ruta Express"]
    },
    {
      name: "Vía a la Costa", 
      coords: "-2.1380,-79.8720",
      routes: ["Ruta Sur"]
    },
    {
      name: "Centro Comercial",
      coords: "-2.1200,-79.8600", 
      routes: ["Ruta Norte", "Ruta Sur"]
    }
  ];

  // URL base para Google Maps Embed
  const getMapUrl = () => {
    const baseUrl = "https://www.google.com/maps/embed/v1/place";
    const apiKey = "AIzaSyBFw0Qbyq9zTFTd-tUY6dw9rUP-6BzSB5Y"; // Public demo key
    
    return `${baseUrl}?key=${apiKey}&q=${UEES_COORDINATES}&zoom=14&maptype=${mapType}`;
  };

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${UEES_COORDINATES}&z=14`;
    window.open(url, '_blank');
  };

  const getDirections = (destination: string) => {
    const url = `https://www.google.com/maps/dir/${UEES_COORDINATES}/${destination}`;
    window.open(url, '_blank');
  };

  return (
    <div className="h-full w-full relative">
      {/* Mapa de Google Maps embebido */}
      <div className="absolute inset-0">
        <iframe
          src={getMapUrl()}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa UEES - Campus Principal"
        />
      </div>

      {/* Panel de información y controles */}
      <div className="absolute top-4 left-4 z-10">
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <MapPin className="w-5 h-5 text-university" />
              <h3 className="font-semibold text-university">Mapa UEES</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">
              Campus Principal - Samborondón
            </p>

            {/* Controles del mapa */}
            <div className="space-y-2 mb-3">
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant={mapType === 'roadmap' ? 'default' : 'outline'}
                  onClick={() => setMapType('roadmap')}
                  className={mapType === 'roadmap' ? 'bg-university hover:bg-university-dark' : ''}
                >
                  <Layers className="w-3 h-3 mr-1" />
                  Mapa
                </Button>
                <Button
                  size="sm"
                  variant={mapType === 'satellite' ? 'default' : 'outline'}
                  onClick={() => setMapType('satellite')}
                  className={mapType === 'satellite' ? 'bg-university hover:bg-university-dark' : ''}
                >
                  <Layers className="w-3 h-3 mr-1" />
                  Satélite
                </Button>
              </div>
            </div>

            {/* Información de ubicación */}
            <div className="space-y-2 text-xs mb-3">
              <div className="bg-university/10 p-2 rounded">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-university rounded-full"></div>
                  <span className="font-medium">Universidad UEES</span>
                </div>
                <p className="text-gray-600 mt-1">Km 2.5 Vía La Puntilla, Samborondón</p>
              </div>
            </div>

            <Button
              onClick={openInGoogleMaps}
              size="sm"
              className="w-full bg-university text-white hover:bg-university-dark"
            >
              <Navigation className="w-3 h-3 mr-2" />
              Abrir en Google Maps
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Panel de paradas de bus */}
      <div className="absolute top-4 right-4 z-10 max-w-xs">
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <h4 className="font-semibold text-university mb-3">Paradas de Bus</h4>
            <div className="space-y-3">
              {busStops.map((stop, index) => (
                <div key={index} className="text-xs">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-0.5"></div>
                      <div>
                        <p className="font-medium">{stop.name}</p>
                        <p className="text-gray-600">
                          {stop.routes.join(', ')}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => getDirections(stop.coords)}
                      className="h-6 w-6 p-0 hover:bg-university/20"
                    >
                      <Navigation className="w-3 h-3 text-university" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-t">
              <p className="text-xs text-gray-500">
                Haz clic en <Navigation className="w-3 h-3 inline" /> para obtener direcciones
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Información adicional */}
      <div className="absolute bottom-4 left-4 z-10">
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
          <CardContent className="p-3">
            <div className="text-xs text-gray-600">
              <p className="font-medium text-university mb-1">Información del Campus</p>
              <p>• Horarios: Lunes a Viernes 6:00 AM - 10:00 PM</p>
              <p>• Sábados: 7:00 AM - 6:00 PM</p>
              <p>• Transporte disponible cada 15-30 minutos</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapView;