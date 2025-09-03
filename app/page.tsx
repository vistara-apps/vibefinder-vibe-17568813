'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppHeader from '@/components/ui/AppHeader';
import MapView from '@/components/map/MapView';
import MapControls from '@/components/map/MapControls';
import RecommendationCard from '@/components/ui/RecommendationCard';
import useMap from '@/hooks/useMap';
import { Recommendation, RecommendationFilters } from '@/types';

// Mock data for initial development
const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    recommendationId: '1',
    title: 'Vibrant Night Market Experience',
    description: 'Explore this bustling night market with amazing street food, local crafts, and a lively atmosphere. Perfect for foodies and night owls looking for authentic local experiences.',
    venue_name: 'Downtown Night Market',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      address: '123 Market St, San Francisco, CA',
    },
    social_media_url: 'https://www.tiktok.com/@user/video/123456789',
    trend_score: 92,
    vibe_tags: ['bustling', 'foodie', 'trendy', 'night-life'],
    image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    timestamp: new Date().toISOString(),
    price_level: 2,
    category: 'markets',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    recommendationId: '2',
    title: 'Cozy Hidden Café with Amazing Views',
    description: 'This hidden gem offers artisanal coffee, homemade pastries, and breathtaking views of the city. A perfect spot for a quiet morning or afternoon work session.',
    venue_name: 'Skyview Café',
    location: {
      latitude: 37.7850,
      longitude: -122.4100,
      address: '456 Hill St, San Francisco, CA',
    },
    social_media_url: 'https://www.instagram.com/p/123456789/',
    trend_score: 85,
    vibe_tags: ['cozy', 'quiet', 'scenic', 'artsy'],
    image_url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb',
    timestamp: new Date().toISOString(),
    price_level: 3,
    category: 'cafes',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    recommendationId: '3',
    title: 'Energetic Rooftop Bar with Live DJ',
    description: 'Experience the city's best rooftop vibes with craft cocktails, panoramic views, and top DJs spinning the latest tracks. The perfect spot to start your night out.',
    venue_name: 'Elevation Rooftop',
    location: {
      latitude: 37.7700,
      longitude: -122.4250,
      address: '789 Tower Ave, San Francisco, CA',
    },
    social_media_url: 'https://www.tiktok.com/@user/video/987654321',
    trend_score: 78,
    vibe_tags: ['energetic', 'trendy', 'late-night', 'live-music'],
    image_url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187',
    timestamp: new Date().toISOString(),
    price_level: 4,
    category: 'bars',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Mock vibe and category options
const VIBE_OPTIONS = [
  'chill', 'energetic', 'romantic', 'cozy', 'elegant', 'trendy', 'artsy', 
  'hipster', 'family-friendly', 'foodie', 'outdoor', 'live-music', 'quiet', 
  'bustling', 'historic', 'modern', 'sporty', 'pet-friendly', 'scenic', 'late-night'
];

const CATEGORY_OPTIONS = [
  'restaurants', 'cafes', 'bars', 'clubs', 'parks', 'museums', 'galleries',
  'shops', 'markets', 'theaters', 'fitness', 'outdoors', 'events'
];

export default function HomePage() {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [savedRecommendations, setSavedRecommendations] = useState<string[]>([]);
  
  // Initialize the map hook with mock data
  const {
    recommendations,
    setRecommendations,
    filteredRecommendations,
    filters,
    handleFilterChange,
    selectedRecommendation,
    setSelectedRecommendation,
    handleMarkerClick,
    isLoading,
  } = useMap({
    initialRecommendations: MOCK_RECOMMENDATIONS,
    initialFilters: {
      sort_by: 'trending',
    },
  });

  // Set initial recommendations
  useEffect(() => {
    // In a real app, this would fetch from an API
    setRecommendations(MOCK_RECOMMENDATIONS);
  }, [setRecommendations]);

  // Handle recommendation card click
  const handleCardClick = (recommendation: Recommendation) => {
    router.push(`/recommendations/${recommendation.recommendationId}`);
  };

  // Handle saving a recommendation
  const handleSaveRecommendation = (id: string) => {
    if (savedRecommendations.includes(id)) {
      setSavedRecommendations(savedRecommendations.filter(recId => recId !== id));
    } else {
      setSavedRecommendations([...savedRecommendations, id]);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <AppHeader />
      
      <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
        {/* Map View */}
        <div className="w-full md:w-2/3 h-1/2 md:h-full relative">
          <MapView
            recommendations={filteredRecommendations}
            onMarkerClick={handleMarkerClick}
            selectedRecommendation={selectedRecommendation}
          />
          
          {/* Map Controls */}
          <MapControls
            filters={filters}
            onFilterChange={handleFilterChange}
            vibeOptions={VIBE_OPTIONS}
            categoryOptions={CATEGORY_OPTIONS}
          />
        </div>
        
        {/* Recommendations List */}
        <div className="w-full md:w-1/3 h-1/2 md:h-full overflow-y-auto bg-gray-50 p-4">
          <h2 className="text-xl font-bold mb-4">
            {isLoading ? 'Loading recommendations...' : 
              `${filteredRecommendations.length} Trending Spots`}
          </h2>
          
          <div className="space-y-4">
            {filteredRecommendations.map(recommendation => (
              <RecommendationCard
                key={recommendation.recommendationId}
                recommendation={recommendation}
                variant={selectedRecommendation === recommendation.recommendationId ? 'expanded' : 'collapsed'}
                onSave={handleSaveRecommendation}
                isSaved={savedRecommendations.includes(recommendation.recommendationId)}
                onClick={() => {
                  setSelectedRecommendation(recommendation.recommendationId);
                  setSelectedCard(recommendation.recommendationId);
                }}
              />
            ))}
            
            {filteredRecommendations.length === 0 && !isLoading && (
              <div className="text-center py-8">
                <p className="text-gray-500">No recommendations found with the current filters.</p>
                <button
                  onClick={() => handleFilterChange({})}
                  className="mt-2 text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

