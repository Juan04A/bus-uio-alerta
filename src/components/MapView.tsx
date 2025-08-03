import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const MapView = () => {
  // Coordenadas de la UEES en Samborondón, Guayaquil
  const UEES_LAT = -2.1325;
  const UEES_LNG = -79.8681;
  const ZOOM_LEVEL = 14;

  // URL para OpenStreetMap embebido (no requiere API key)
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${UEES_LNG-0.01},${UEES_LAT-0.01},${UEES_LNG+0.01},${UEES_LAT+0.01}&layer=mapnik&marker=${UEES_LAT},${UEES_LNG}`;

  return (
    <div className="h-full w-full relative">
      {/* Mapa embebido de OpenStreetMap */}
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        title="Mapa UEES - Campus Principal Samborondón"
        className="absolute inset-0"
      />

      {/* Panel de información */}
      <div className="absolute top-4 left-4 z-10">
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-5 h-5 text-university" />
              <h3 className="font-semibold text-university">UEES Campus</h3>
            </div>
            <p className="text-sm text-gray-600">
              Universidad Espíritu Santo
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Km 2.5 Vía La Puntilla, Samborondón
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapView;