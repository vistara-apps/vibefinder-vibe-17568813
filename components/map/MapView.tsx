'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { FiCrosshair, FiPlus, FiMinus, FiLayers } from 'react-icons/fi';
import { Recommendation, GeoLocation, MapViewSettings } from '@/types';
import MapPin from '../ui/MapPin';

interface MapViewProps {
  recommendations: Recommendation[];
  initialSettings?: Partial<MapViewSettings>;
  onMarkerClick?: (recommendation: Recommendation) => void;
  onMapMove?: (center: GeoLocation, zoom: number) => void;
  onMapIdle?: (bounds: google.maps.LatLngBounds) => void;
  selectedRecommendation?: string | null;
}

export default function MapView({
  recommendations,
  initialSettings,
  onMarkerClick,
  onMapMove,
  onMapIdle,
  selectedRecommendation,
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [mapType, setMapType] = useState<google.maps.MapTypeId>(
    google.maps.MapTypeId.ROADMAP
  );
  
  // Default settings
  const defaultSettings: MapViewSettings = {
    center: { latitude: 37.7749, longitude: -122.4194 }, // San Francisco
    zoom: 13,
    showLabels: true,
    mapType: 'roadmap',
  };
  
  const settings = { ...defaultSettings, ...initialSettings };

  // Initialize the map
  useEffect(() => {
    if (!mapRef.current) return;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API key is missing');
      return;
    }

    const loader = new Loader({
      apiKey,
      version: 'weekly',
    });

    loader.load().then(() => {
      if (!mapRef.current) return;

      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { 
          lat: settings.center.latitude, 
          lng: settings.center.longitude 
        },
        zoom: settings.zoom,
        mapTypeId: settings.mapType === 'satellite' 
          ? google.maps.MapTypeId.SATELLITE 
          : google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControl: false,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: settings.showLabels ? 'on' : 'off' }],
          },
        ],
      });

      // Add event listeners
      mapInstance.addListener('dragend', () => {
        const center = mapInstance.getCenter();
        if (center && onMapMove) {
          onMapMove(
            { 
              latitude: center.lat(), 
              longitude: center.lng() 
            },
            mapInstance.getZoom() || settings.zoom
          );
        }
      });

      mapInstance.addListener('idle', () => {
        const bounds = mapInstance.getBounds();
        if (bounds && onMapIdle) {
          onMapIdle(bounds);
        }
      });

      setMap(mapInstance);
    });
  }, []);

  // Update markers when recommendations change
  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    // Create new markers
    const newMarkers = recommendations.map(recommendation => {
      const { location, recommendationId, title, trend_score } = recommendation;
      
      // Create a custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      
      // Render the MapPin component into the marker element
      const isActive = recommendationId === selectedRecommendation;
      
      // Create the marker
      const marker = new google.maps.Marker({
        position: { 
          lat: location.latitude, 
          lng: location.longitude 
        },
        map,
        title,
        icon: {
          url: isActive 
            ? '/icons/marker-active.svg' 
            : '/icons/marker.svg',
          scaledSize: new google.maps.Size(32, 32),
          anchor: new google.maps.Point(16, 32),
        },
      });
      
      // Add click event
      marker.addListener('click', () => {
        if (onMarkerClick) {
          onMarkerClick(recommendation);
        }
      });
      
      return marker;
    });
    
    setMarkers(newMarkers);
    
    // If a recommendation is selected, center the map on it
    if (selectedRecommendation) {
      const selected = recommendations.find(
        r => r.recommendationId === selectedRecommendation
      );
      
      if (selected) {
        map.panTo({ 
          lat: selected.location.latitude, 
          lng: selected.location.longitude 
        });
        map.setZoom(15);
      }
    }
    
    return () => {
      newMarkers.forEach(marker => marker.setMap(null));
    };
  }, [map, recommendations, selectedRecommendation, onMarkerClick]);

  // Handle map type change
  const handleMapTypeChange = useCallback(() => {
    if (!map) return;
    
    const currentType = map.getMapTypeId();
    let newType: google.maps.MapTypeId;
    
    if (currentType === google.maps.MapTypeId.ROADMAP) {
      newType = google.maps.MapTypeId.SATELLITE;
    } else {
      newType = google.maps.MapTypeId.ROADMAP;
    }
    
    map.setMapTypeId(newType);
    setMapType(newType);
  }, [map]);

  // Handle zoom in
  const handleZoomIn = useCallback(() => {
    if (!map) return;
    map.setZoom((map.getZoom() || 0) + 1);
  }, [map]);

  // Handle zoom out
  const handleZoomOut = useCallback(() => {
    if (!map) return;
    map.setZoom((map.getZoom() || 0) - 1);
  }, [map]);

  // Handle getting current location
  const handleGetCurrentLocation = useCallback(() => {
    if (!map || !navigator.geolocation) return;
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.panTo({ lat: latitude, lng: longitude });
        map.setZoom(15);
        
        if (onMapMove) {
          onMapMove({ latitude, longitude }, 15);
        }
      },
      (error) => {
        console.error('Error getting current location:', error);
        // You could show a toast notification here
      }
    );
  }, [map, onMapMove]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button
          onClick={handleZoomIn}
          className="bg-white rounded-full p-2 shadow-md text-gray-700 hover:bg-gray-100"
          aria-label="Zoom in"
        >
          <FiPlus className="text-lg" />
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white rounded-full p-2 shadow-md text-gray-700 hover:bg-gray-100"
          aria-label="Zoom out"
        >
          <FiMinus className="text-lg" />
        </button>
        <button
          onClick={handleMapTypeChange}
          className="bg-white rounded-full p-2 shadow-md text-gray-700 hover:bg-gray-100"
          aria-label="Change map type"
        >
          <FiLayers className="text-lg" />
        </button>
        <button
          onClick={handleGetCurrentLocation}
          className="bg-white rounded-full p-2 shadow-md text-gray-700 hover:bg-gray-100"
          aria-label="Get current location"
        >
          <FiCrosshair className="text-lg" />
        </button>
      </div>
    </div>
  );
}

