'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppHeader from '@/components/ui/AppHeader';
import RecommendationCard from '@/components/ui/RecommendationCard';
import { FiSearch, FiX, FiInfo } from 'react-icons/fi';
import { Recommendation } from '@/types';

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
];

export default function SavedPage() {
  const router = useRouter();
  const [savedRecommendations, setSavedRecommendations] = useState<Recommendation[]>([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock authentication state
  
  // Fetch saved recommendations
  useEffect(() => {
    // In a real app, this would fetch from an API based on the user's saved items
    setIsLoading(true);
    
    // Simulate API call and authentication check
    setTimeout(() => {
      // Mock authentication check
      setIsLoggedIn(true);
      
      // Mock saved recommendations
      setSavedRecommendations(MOCK_RECOMMENDATIONS);
      setFilteredRecommendations(MOCK_RECOMMENDATIONS);
      setIsLoading(false);
    }, 500);
  }, []);
  
  // Apply search filter
  useEffect(() => {
    if (savedRecommendations.length === 0) return;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = savedRecommendations.filter(rec => 
        rec.title.toLowerCase().includes(query) ||
        rec.description.toLowerCase().includes(query) ||
        rec.venue_name.toLowerCase().includes(query) ||
        rec.vibe_tags.some(tag => tag.toLowerCase().includes(query))
      );
      setFilteredRecommendations(filtered);
    } else {
      setFilteredRecommendations(savedRecommendations);
    }
  }, [savedRecommendations, searchQuery]);
  
  // Handle recommendation card click
  const handleCardClick = (recommendation: Recommendation) => {
    router.push(`/recommendations/${recommendation.recommendationId}`);
  };
  
  // Handle unsaving a recommendation
  const handleUnsaveRecommendation = (id: string) => {
    // In a real app, this would call an API to unsave
    const updatedRecommendations = savedRecommendations.filter(
      rec => rec.recommendationId !== id
    );
    setSavedRecommendations(updatedRecommendations);
  };
  
  // Render login prompt if not logged in
  if (!isLoading && !isLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        
        <main className="flex-1 container-fluid py-6 flex flex-col items-center justify-center">
          <div className="max-w-md w-full text-center p-6 bg-white rounded-lg shadow-sm">
            <FiInfo className="mx-auto text-4xl text-primary mb-4" />
            <h1 className="text-2xl font-bold mb-2">Sign In to View Saved Items</h1>
            <p className="text-gray-600 mb-6">
              Please sign in to view and manage your saved recommendations.
            </p>
            <button
              onClick={() => router.push('/auth/login')}
              className="btn-primary w-full"
            >
              Sign In
            </button>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      
      <main className="flex-1 container-fluid py-6">
        <h1 className="text-3xl font-bold mb-6">Saved Recommendations</h1>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search your saved recommendations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FiX />
              </button>
            )}
          </div>
        </div>
        
        {/* Results */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            {isLoading ? 'Loading saved recommendations...' : 
              `${filteredRecommendations.length} Saved ${
                filteredRecommendations.length === 1 ? 'Recommendation' : 'Recommendations'
              }`}
          </h2>
          
          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecommendations.map(recommendation => (
              <RecommendationCard
                key={recommendation.recommendationId}
                recommendation={recommendation}
                onSave={handleUnsaveRecommendation}
                isSaved={true}
                onClick={() => handleCardClick(recommendation)}
              />
            ))}
          </div>
          
          {/* Empty State */}
          {!isLoading && filteredRecommendations.length === 0 && (
            <div className="text-center py-12">
              {searchQuery ? (
                <>
                  <p className="text-gray-500 mb-4">No saved recommendations match your search.</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="btn-primary"
                  >
                    Clear search
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-500 mb-4">You haven't saved any recommendations yet.</p>
                  <button
                    onClick={() => router.push('/discover')}
                    className="btn-primary"
                  >
                    Discover Recommendations
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

