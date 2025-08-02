import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, AlertTriangle } from "lucide-react";

const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Coordenadas de la UEES en Samborondón, Guayaquil
  const UEES_COORDINATES: [number, number] = [-79.8681, -2.1325];

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: UEES_COORDINATES,
        zoom: 13,
        pitch: 45,
      });

      // Agregar controles de navegación
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Cuando el mapa se carga
      map.current.on('load', () => {
        setMapLoaded(true);
        
        // Agregar marcador principal de la UEES
        new mapboxgl.Marker({
          color: '#8B2635', // Color universitario
          scale: 1.5
        })
          .setLngLat(UEES_COORDINATES)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div style="padding: 10px;">
                  <h3 style="color: #8B2635; margin: 0 0 8px 0; font-weight: bold;">Universidad Espíritu Santo</h3>
                  <p style="margin: 0; color: #666; font-size: 14px;">Campus Principal - Samborondón</p>
                  <p style="margin: 4px 0 0 0; color: #666; font-size: 12px;">Km 2.5 Vía La Puntilla</p>
                </div>
              `)
          )
          .addTo(map.current);

        // Agregar paradas de bus simuladas
        const busStops = [
          { 
            coords: [-79.8650, -2.1280], 
            name: "Parada Mall del Sol",
            routes: ["Ruta Norte", "Ruta Express"]
          },
          { 
            coords: [-79.8720, -2.1380], 
            name: "Parada Vía a la Costa",
            routes: ["Ruta Sur"]
          },
          { 
            coords: [-79.8600, -2.1200], 
            name: "Parada Centro Comercial",
            routes: ["Ruta Norte", "Ruta Sur"]
          }
        ];

        busStops.forEach((stop, index) => {
          // Crear marcador para parada de bus
          const marker = new mapboxgl.Marker({
            color: '#3B82F6',
            scale: 0.8
          })
            .setLngLat(stop.coords as [number, number])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                  <div style="padding: 8px;">
                    <h4 style="color: #3B82F6; margin: 0 0 6px 0; font-weight: bold; font-size: 14px;">${stop.name}</h4>
                    <p style="margin: 0; color: #666; font-size: 12px;">Rutas disponibles:</p>
                    <p style="margin: 2px 0 0 0; color: #8B2635; font-size: 12px; font-weight: 500;">${stop.routes.join(', ')}</p>
                  </div>
                `)
            )
            .addTo(map.current);
        });
      });

    } catch (error) {
      console.error('Error inicializando el mapa:', error);
    }
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setIsTokenSet(true);
      initializeMap();
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isTokenSet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-university/5 to-university/10 p-4">
        <div className="max-w-md mx-auto mt-20">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="bg-university/10 p-3 rounded-full w-fit mx-auto mb-4">
                <MapPin className="w-8 h-8 text-university" />
              </div>
              <CardTitle className="text-university">Configurar Mapa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-800 font-medium">Token de Mapbox Requerido</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Ve a <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a> y obtén tu token público gratuito
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Token Público de Mapbox
                </label>
                <Input
                  type="text"
                  placeholder="pk.eyJ1IjoiZXhhbXBsZS..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>
              
              <Button 
                onClick={handleTokenSubmit}
                disabled={!mapboxToken.trim()}
                className="w-full bg-university hover:bg-university-dark"
              >
                Cargar Mapa
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full relative">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Overlay con información */}
      <div className="absolute top-4 left-4 z-10">
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
      
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-university mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Cargando mapa...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;