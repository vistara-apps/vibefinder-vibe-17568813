'use client';

import { useState, useEffect, useCallback } from 'react';
import { GeoLocation, Recommendation, RecommendationFilters, MapViewSettings } from '@/types';

interface UseMapProps {
  initialRecommendations?: Recommendation[];
  initialFilters?: RecommendationFilters;
  initialSettings?: Partial<MapViewSettings>;
  onFilterChange?: (filters: RecommendationFilters) => void;
}

export default function useMap({
  initialRecommendations = [],
  initialFilters = {},
  initialSettings = {},
  onFilterChange,
}: UseMapProps = {}) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations);
  const [filteredRecommendations, setFilteredRecommendations] = useState<Recommendation[]>(initialRecommendations);
  const [filters, setFilters] = useState<RecommendationFilters>(initialFilters);
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<GeoLocation | null>(null);
  const [mapSettings, setMapSettings] = useState<MapViewSettings>({
    center: initialSettings.center || { latitude: 37.7749, longitude: -122.4194 },
    zoom: initialSettings.zoom || 13,
    showLabels: initialSettings.showLabels !== undefined ? initialSettings.showLabels : true,
    mapType: initialSettings.mapType || 'roadmap',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          
          // Update map center if no initial center was provided
          if (!initialSettings.center) {
            setMapSettings(prev => ({
              ...prev,
              center: { latitude, longitude },
            }));
          }
        },
        (error) => {
          console.error('Error getting user location:', error);
          // Don't set an error state here, as we have a fallback location
        }
      );
    }
  }, [initialSettings.center]);

  // Apply filters to recommendations
  useEffect(() => {
    if (recommendations.length === 0) return;
    
    setIsLoading(true);
    
    try {
      let filtered = [...recommendations];
      
      // Filter by vibes
      if (filters.vibes && filters.vibes.length > 0) {
        filtered = filtered.filter(rec => 
          filters.vibes!.some(vibe => rec.vibe_tags.includes(vibe))
        );
      }
      
      // Filter by categories
      if (filters.categories && filters.categories.length > 0) {
        filtered = filtered.filter(rec => 
          filters.categories!.includes(rec.category)
        );
      }
      
      // Filter by price level
      if (filters.price_level && filters.price_level.length > 0) {
        filtered = filtered.filter(rec => 
          rec.price_level && filters.price_level!.includes(rec.price_level)
        );
      }
      
      // Filter by distance (if user location is available)
      if (filters.distance && userLocation) {
        filtered = filtered.filter(rec => {
          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            rec.location.latitude,
            rec.location.longitude
          );
          return distance <= filters.distance!;
        });
      }
      
      // Sort results
      if (filters.sort_by) {
        if (filters.sort_by === 'trending') {
          filtered.sort((a, b) => b.trend_score - a.trend_score);
        } else if (filters.sort_by === 'distance' && userLocation) {
          filtered.sort((a, b) => {
            const distanceA = calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              a.location.latitude,
              a.location.longitude
            );
            const distanceB = calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              b.location.latitude,
              b.location.longitude
            );
            return distanceA - distanceB;
          });
        }
        // Note: 'rating' sort would be implemented if we had rating data
      }
      
      setFilteredRecommendations(filtered);
    } catch (err) {
      setError('Error applying filters');
      console.error('Error applying filters:', err);
    } finally {
      setIsLoading(false);
    }
  }, [recommendations, filters, userLocation]);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters: RecommendationFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    
    if (onFilterChange) {
      onFilterChange({ ...filters, ...newFilters });
    }
  }, [filters, onFilterChange]);

  // Handle map movement
  const handleMapMove = useCallback((center: GeoLocation, zoom: number) => {
    setMapSettings(prev => ({
      ...prev,
      center,
      zoom,
    }));
  }, []);

  // Handle marker click
  const handleMarkerClick = useCallback((recommendation: Recommendation) => {
    setSelectedRecommendation(recommendation.recommendationId);
  }, []);

  // Calculate distance between two points (Haversine formula)
  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  return {
    recommendations,
    setRecommendations,
    filteredRecommendations,
    filters,
    handleFilterChange,
    selectedRecommendation,
    setSelectedRecommendation,
    userLocation,
    mapSettings,
    handleMapMove,
    handleMarkerClick,
    isLoading,
    error,
  };
}

