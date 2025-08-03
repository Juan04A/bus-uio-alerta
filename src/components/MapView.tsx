import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";

const MapView = () => {
  // Coordenadas de la UEES y paradas simuladas
  const locations = [
    {
      id: 'uees',
      name: 'Universidad Espíritu Santo',
      description: 'Campus Principal - Samborondón',
      address: 'Km 2.5 Vía La Puntilla',
      type: 'university',
      coords: { lat: -2.1325, lng: -79.8681 }
    },
    {
      id: 'mall-sol',
      name: 'Parada Mall del Sol',
      description: 'Rutas: Norte, Express',
      type: 'bus-stop',
      coords: { lat: -2.1280, lng: -79.8650 }
    },
    {
      id: 'via-costa',
      name: 'Parada Vía a la Costa',
      description: 'Rutas: Sur',
      type: 'bus-stop',
      coords: { lat: -2.1380, lng: -79.8720 }
    },
    {
      id: 'centro-comercial',
      name: 'Parada Centro Comercial',
      description: 'Rutas: Norte, Sur',
      type: 'bus-stop',
      coords: { lat: -2.1200, lng: -79.8600 }
    }
  ];

  const openInGoogleMaps = () => {
    const uees = locations[0];
    const url = `https://www.google.com/maps?q=${uees.coords.lat},${uees.coords.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="h-full w-full relative bg-gradient-to-br from-blue-50 to-green-50">
      {/* Mapa simulado con ubicaciones */}
      <div className="absolute inset-0 p-4">
        <div className="relative w-full h-full bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
          {/* Fondo del mapa simulado */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-blue-50">
            {/* Líneas simulando calles */}
            <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gray-300 transform rotate-12"></div>
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 transform -rotate-6"></div>
            <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gray-300 transform rotate-3"></div>
            <div className="absolute left-1/4 top-0 h-full w-0.5 bg-gray-300 transform rotate-12"></div>
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-300 transform -rotate-3"></div>
            <div className="absolute left-3/4 top-0 h-full w-0.5 bg-gray-300 transform rotate-6"></div>
          </div>

          {/* UEES - Marcador principal */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative group cursor-pointer">
              <div className="w-8 h-8 bg-university rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  {locations[0].name}
                </div>
              </div>
            </div>
          </div>

          {/* Paradas de bus */}
          <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative group cursor-pointer">
              <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  {locations[1].name}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-2/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative group cursor-pointer">
              <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  {locations[2].name}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-1/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative group cursor-pointer">
              <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  {locations[3].name}
                </div>
              </div>
            </div>
          </div>

          {/* Líneas de rutas simuladas */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#8B2635" />
              </marker>
            </defs>
            {/* Línea desde parada 1 a UEES */}
            <path
              d="M 33% 33% Q 45% 45% 50% 50%"
              stroke="#8B2635"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead)"
            />
            {/* Línea desde parada 2 a UEES */}
            <path
              d="M 25% 67% Q 35% 55% 50% 50%"
              stroke="#8B2635"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead)"
            />
            {/* Línea desde parada 3 a UEES */}
            <path
              d="M 75% 25% Q 65% 35% 50% 50%"
              stroke="#8B2635"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead)"
            />
          </svg>
        </div>
      </div>

      {/* Panel de información */}
      <div className="absolute top-4 left-4 z-10">
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-5 h-5 text-university" />
              <h3 className="font-semibold text-university">Mapa UEES</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Campus y rutas de transporte
            </p>
            <div className="space-y-2 text-xs mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-university rounded-full"></div>
                <span>Universidad UEES</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Paradas de Bus</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-0.5 bg-university"></div>
                <span>Rutas de Bus</span>
              </div>
            </div>
            <button
              onClick={openInGoogleMaps}
              className="w-full flex items-center justify-center space-x-2 bg-university text-white text-xs py-2 px-3 rounded hover:bg-university-dark transition-colors"
            >
              <Navigation className="w-3 h-3" />
              <span>Ver en Google Maps</span>
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Lista de ubicaciones */}
      <div className="absolute top-4 right-4 z-10 max-w-xs">
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <h4 className="font-semibold text-university mb-3">Ubicaciones</h4>
            <div className="space-y-3">
              {locations.map((location) => (
                <div key={location.id} className="text-xs">
                  <div className="flex items-start space-x-2">
                    <div className={`w-3 h-3 rounded-full mt-0.5 ${
                      location.type === 'university' ? 'bg-university' : 'bg-blue-500'
                    }`}></div>
                    <div>
                      <p className="font-medium">{location.name}</p>
                      <p className="text-gray-600">{location.description}</p>
                      {location.address && (
                        <p className="text-gray-500 mt-1">{location.address}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapView;