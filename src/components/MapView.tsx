import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Bus } from "lucide-react";
import ueesLogo from "@/assets/uees-logo.png";

const MapView = () => {
  // Coordenadas exactas de la UEES en Samborondón, Guayaquil
  const UEES_LAT = -2.1325;
  const UEES_LNG = -79.8681;

  // Paradas de bus con coordenadas específicas alrededor de la UEES
  const busStops = [
    {
      id: 1,
      name: "Mall del Sol",
      lat: -2.1280,
      lng: -79.8650,
      routes: ["Ruta Norte", "Ruta Express"]
    },
    {
      id: 2,
      name: "Vía a la Costa", 
      lat: -2.1380,
      lng: -79.8720,
      routes: ["Ruta Sur"]
    },
    {
      id: 3,
      name: "Centro Comercial",
      lat: -2.1200,
      lng: -79.8600,
      routes: ["Ruta Norte", "Ruta Sur"]
    }
  ];

  // Crear marcadores SVG para el mapa
  const createMarkerUrl = (color: string, isMain = false) => {
    const markerSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${isMain ? '30' : '20'}" height="${isMain ? '40' : '30'}" viewBox="0 0 24 32">
        <path d="M12 0C5.4 0 0 5.4 0 12c0 8 12 20 12 20s12-12 12-20c0-6.6-5.4-12-12-12z" fill="${color}" stroke="white" stroke-width="2"/>
        <circle cx="12" cy="12" r="${isMain ? '6' : '4'}" fill="white"/>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(markerSvg)}`;
  };

  // Crear URL del mapa con marcadores
  const createMapUrl = () => {
    const baseUrl = "https://www.openstreetmap.org/export/embed.html";
    const bbox = `${UEES_LNG-0.015},${UEES_LAT-0.015},${UEES_LNG+0.015},${UEES_LAT+0.015}`;
    
    // Marcador principal para UEES
    let markers = `&marker=${UEES_LAT},${UEES_LNG}`;
    
    // Agregar marcadores de paradas
    busStops.forEach(stop => {
      markers += `&marker=${stop.lat},${stop.lng}`;
    });

    return `${baseUrl}?bbox=${bbox}&layer=mapnik${markers}`;
  };

  return (
    <div className="h-full w-full relative">
      {/* Mapa base */}
      <iframe
        src={createMapUrl()}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        title="Mapa UEES con paradas de bus"
        className="absolute inset-0"
      />

      {/* Overlay con marcadores visuales mejorados */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Marcador principal UEES */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-full pointer-events-auto"
          style={{ 
            left: '50%', 
            top: '50%',
            zIndex: 1000
          }}
        >
          <div className="relative group cursor-pointer">
            <div className="w-8 h-8 bg-university rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <img src={ueesLogo} alt="UEES" className="w-6 h-6 rounded-full object-cover" />
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-university text-white text-xs rounded py-2 px-3 whitespace-nowrap shadow-lg">
              <div className="flex items-center space-x-2">
                <img src={ueesLogo} alt="UEES" className="w-4 h-4" />
                <span className="font-medium">Universidad Espíritu Santo</span>
              </div>
              <div className="text-xs opacity-90 mt-1">Campus Principal - Samborondón</div>
            </div>
          </div>
        </div>

        {/* Marcadores de paradas de bus */}
        {busStops.map((stop, index) => {
          const positions = [
            { left: '35%', top: '35%' }, // Mall del Sol
            { left: '25%', top: '70%' }, // Vía a la Costa  
            { left: '75%', top: '25%' }  // Centro Comercial
          ];
          
          return (
            <div
              key={stop.id}
              className="absolute transform -translate-x-1/2 -translate-y-full pointer-events-auto"
              style={{ 
                left: positions[index].left, 
                top: positions[index].top,
                zIndex: 999
              }}
            >
              <div className="relative group cursor-pointer">
                <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                  <Bus className="w-3 h-3 text-white" />
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white text-xs rounded py-2 px-3 whitespace-nowrap shadow-lg">
                  <div className="font-medium">{stop.name}</div>
                  <div className="text-xs opacity-90">{stop.routes.join(', ')}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Panel de información con logo */}
      <div className="absolute top-4 left-4 z-10">
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <img src={ueesLogo} alt="UEES Logo" className="w-8 h-8 rounded" />
              <div>
                <h3 className="font-semibold text-university">Campus UEES</h3>
                <p className="text-xs text-gray-500">Mapa de ubicación</p>
              </div>
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="bg-university/10 p-2 rounded">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-3 h-3 bg-university rounded-full"></div>
                  <span className="font-medium">Universidad Espíritu Santo</span>
                </div>
                <p className="text-gray-600">Km 2.5 Vía La Puntilla, Samborondón</p>
              </div>
              
              <div className="bg-blue-50 p-2 rounded">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">Paradas de Bus</span>
                </div>
                <div className="space-y-1">
                  {busStops.map(stop => (
                    <div key={stop.id} className="text-xs text-gray-600">
                      • {stop.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Información de rutas */}
      <div className="absolute bottom-4 right-4 z-10 max-w-xs">
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Bus className="w-5 h-5 text-university" />
              <h4 className="font-semibold text-university">Rutas Disponibles</h4>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-university rounded-full"></div>
                <span>Ruta Norte - Mall del Sol</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-university rounded-full"></div>
                <span>Ruta Sur - Vía a la Costa</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-university rounded-full"></div>
                <span>Ruta Express - Centros Comerciales</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapView;