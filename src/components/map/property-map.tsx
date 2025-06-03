import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { Property } from "@/types/property";
import { Link } from "react-router-dom";
import { formatPrice } from "@/lib/utils";

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";

interface PropertyMapProps {
  properties: Property[];
  height?: string;
  zoom?: number;
  center?: [number, number];
}

export function PropertyMap({ 
  properties, 
  height = "600px", 
  zoom = 10,
  center
}: PropertyMapProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>(
    center || [39.8283, -98.5795] // Center of US as default
  );

  // Calculate map center based on properties if not provided
  useEffect(() => {
    if (center) return;
    
    if (properties.length > 0) {
      const latTotal = properties.reduce((sum, prop) => sum + prop.lat, 0);
      const lngTotal = properties.reduce((sum, prop) => sum + prop.lng, 0);
      
      setMapCenter([
        latTotal / properties.length,
        lngTotal / properties.length
      ]);
    }
  }, [properties, center]);

  // Custom marker icon
  const markerIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div style={{ height }} className="rounded-lg overflow-hidden border">
      <MapContainer 
        center={mapCenter} 
        zoom={zoom} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {properties.map((property) => (
          <Marker 
            key={property.id} 
            position={[property.lat, property.lng]}
            icon={markerIcon}
          >
            <Popup>
              <div className="w-64">
                <img 
                  src={property.images[0]} 
                  alt={property.title}
                  className="w-full h-32 object-cover mb-2 rounded"
                />
                <h3 className="font-semibold">{property.title}</h3>
                <p className="text-gray-700">{property.address}, {property.city}</p>
                <p className="font-bold text-blue-600 my-1">{formatPrice(property.price)}</p>
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>{property.bedrooms} Beds</span>
                  <span>{property.bathrooms} Baths</span>
                  <span>{property.squareFeet.toLocaleString()} Sq Ft</span>
                </div>
                <Link 
                  to={`/properties/${property.id}`}
                  className="block text-center bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}