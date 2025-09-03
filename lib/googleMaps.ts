import axios from 'axios';
import { GeoLocation } from '@/types';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

if (!GOOGLE_MAPS_API_KEY) {
  console.warn('Google Maps API key is missing');
}

/**
 * Geocode an address to get latitude and longitude
 */
export async function geocodeAddress(address: string): Promise<GeoLocation> {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${GOOGLE_MAPS_API_KEY}`
    );

    if (response.data.status !== 'OK') {
      throw new Error(`Geocoding error: ${response.data.status}`);
    }

    const result = response.data.results[0];
    const { lat, lng } = result.geometry.location;
    
    // Extract address components
    const addressComponents = result.address_components;
    const city = addressComponents.find((component: any) => 
      component.types.includes('locality')
    )?.long_name;
    
    const state = addressComponents.find((component: any) => 
      component.types.includes('administrative_area_level_1')
    )?.short_name;
    
    const country = addressComponents.find((component: any) => 
      component.types.includes('country')
    )?.long_name;
    
    const postalCode = addressComponents.find((component: any) => 
      component.types.includes('postal_code')
    )?.long_name;

    return {
      latitude: lat,
      longitude: lng,
      address: result.formatted_address,
      city,
      state,
      country,
      postal_code: postalCode,
    };
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
}

/**
 * Reverse geocode coordinates to get address
 */
export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<GeoLocation> {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
    );

    if (response.data.status !== 'OK') {
      throw new Error(`Reverse geocoding error: ${response.data.status}`);
    }

    const result = response.data.results[0];
    
    // Extract address components
    const addressComponents = result.address_components;
    const city = addressComponents.find((component: any) => 
      component.types.includes('locality')
    )?.long_name;
    
    const state = addressComponents.find((component: any) => 
      component.types.includes('administrative_area_level_1')
    )?.short_name;
    
    const country = addressComponents.find((component: any) => 
      component.types.includes('country')
    )?.long_name;
    
    const postalCode = addressComponents.find((component: any) => 
      component.types.includes('postal_code')
    )?.long_name;

    return {
      latitude,
      longitude,
      address: result.formatted_address,
      city,
      state,
      country,
      postal_code: postalCode,
    };
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    throw error;
  }
}

/**
 * Get place details from Google Places API
 */
export async function getPlaceDetails(placeId: string) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,geometry,formatted_phone_number,website,opening_hours,price_level,rating,photos&key=${GOOGLE_MAPS_API_KEY}`
    );

    if (response.data.status !== 'OK') {
      throw new Error(`Place details error: ${response.data.status}`);
    }

    return response.data.result;
  } catch (error) {
    console.error('Error getting place details:', error);
    throw error;
  }
}

/**
 * Search for places nearby
 */
export async function searchNearbyPlaces(
  latitude: number,
  longitude: number,
  radius: number = 1500,
  type?: string,
  keyword?: string
) {
  try {
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&key=${GOOGLE_MAPS_API_KEY}`;
    
    if (type) {
      url += `&type=${type}`;
    }
    
    if (keyword) {
      url += `&keyword=${encodeURIComponent(keyword)}`;
    }
    
    const response = await axios.get(url);

    if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
      throw new Error(`Nearby search error: ${response.data.status}`);
    }

    return response.data.results;
  } catch (error) {
    console.error('Error searching nearby places:', error);
    throw error;
  }
}

/**
 * Get directions between two points
 */
export async function getDirections(
  origin: GeoLocation,
  destination: GeoLocation,
  mode: 'driving' | 'walking' | 'bicycling' | 'transit' = 'driving'
) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&mode=${mode}&key=${GOOGLE_MAPS_API_KEY}`
    );

    if (response.data.status !== 'OK') {
      throw new Error(`Directions error: ${response.data.status}`);
    }

    return response.data.routes[0];
  } catch (error) {
    console.error('Error getting directions:', error);
    throw error;
  }
}

/**
 * Calculate distance between two points (Haversine formula)
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
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

