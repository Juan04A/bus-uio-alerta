import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import 'leaflet/dist/leaflet.css';

// Leaflet icon fix for webpack
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapView = () => {
  // Coordenadas de la UEES en Samborondón, Guayaquil
  const UEES_COORDINATES: [number, number] = [-2.1325, -79.8681];

  // Paradas de bus simuladas
  const busStops = [
    { 
      coords: [-2.1280, -79.8650] as [number, number], 
      name: "Parada Mall del Sol",
      routes: ["Ruta Norte", "Ruta Express"]
    },
    { 
      coords: [-2.1380, -79.8720] as [number, number], 
      name: "Parada Vía a la Costa",
      routes: ["Ruta Sur"]
    },
    { 
      coords: [-2.1200, -79.8600] as [number, number], 
      name: "Parada Centro Comercial",
      routes: ["Ruta Norte", "Ruta Sur"]
    }
  ];

  return (
    <div className="h-screen w-full relative">
      <MapContainer
        center={UEES_COORDINATES}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Marcador principal de la UEES */}
        <Marker position={UEES_COORDINATES}>
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-university mb-1">Universidad Espíritu Santo</h3>
              <p className="text-sm text-gray-600 mb-1">Campus Principal - Samborondón</p>
              <p className="text-xs text-gray-500">Km 2.5 Vía La Puntilla</p>
            </div>
          </Popup>
        </Marker>

        {/* Marcadores de paradas de bus */}
        {busStops.map((stop, index) => (
          <Marker key={index} position={stop.coords}>
            <Popup>
              <div className="p-2">
                <h4 className="font-bold text-blue-600 mb-1 text-sm">{stop.name}</h4>
                <p className="text-xs text-gray-600 mb-1">Rutas disponibles:</p>
                <p className="text-xs text-university font-medium">{stop.routes.join(', ')}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Overlay con información */}
      <div className="absolute top-4 left-4 z-[1000]">
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-5 h-5 text-university" />
              <h3 className="font-semibold text-university">Mapa UEES</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Campus y rutas de transporte
            </p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-university rounded-full"></div>
                <span>Universidad UEES</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Paradas de Bus</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapView;