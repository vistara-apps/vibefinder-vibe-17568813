'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppHeader from '@/components/ui/AppHeader';
import RecommendationCard from '@/components/ui/RecommendationCard';
import VibeTag from '@/components/ui/VibeTag';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
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
  {
    recommendationId: '4',
    title: 'Tranquil Garden Oasis in the City',
    description: 'Escape the urban hustle at this peaceful garden sanctuary. Featuring exotic plants, quiet reading nooks, and a charming tea house. Perfect for relaxation and reflection.',
    venue_name: 'Serenity Gardens',
    location: {
      latitude: 37.7800,
      longitude: -122.4300,
      address: '321 Park Ave, San Francisco, CA',
    },
    social_media_url: 'https://www.instagram.com/p/987654321/',
    trend_score: 72,
    vibe_tags: ['quiet', 'scenic', 'outdoor', 'cozy'],
    image_url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae',
    timestamp: new Date().toISOString(),
    price_level: 2,
    category: 'outdoors',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    recommendationId: '5',
    title: 'Interactive Art Installation Experience',
    description: 'Immerse yourself in this cutting-edge interactive art exhibit that combines technology and creativity. Touch, play, and become part of the art in this unique sensory experience.',
    venue_name: 'Future Gallery',
    location: {
      latitude: 37.7820,
      longitude: -122.4150,
      address: '555 Art St, San Francisco, CA',
    },
    social_media_url: 'https://www.tiktok.com/@user/video/567891234',
    trend_score: 88,
    vibe_tags: ['artsy', 'modern', 'trendy', 'interactive'],
    image_url: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04',
    timestamp: new Date().toISOString(),
    price_level: 3,
    category: 'galleries',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Mock vibe options
const VIBE_OPTIONS = [
  'chill', 'energetic', 'romantic', 'cozy', 'elegant', 'trendy', 'artsy', 
  'hipster', 'family-friendly', 'foodie', 'outdoor', 'live-music', 'quiet', 
  'bustling', 'historic', 'modern', 'sporty', 'pet-friendly', 'scenic', 'late-night'
];

// Mock category options
const CATEGORY_OPTIONS = [
  'restaurants', 'cafes', 'bars', 'clubs', 'parks', 'museums', 'galleries',
  'shops', 'markets', 'theaters', 'fitness', 'outdoors', 'events'
];

export default function DiscoverPage() {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState<Recommendation[]>([]);
  const [savedRecommendations, setSavedRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<RecommendationFilters>({
    sort_by: 'trending',
  });
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);
  
  // Fetch recommendations
  useEffect(() => {
    // In a real app, this would fetch from an API
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setRecommendations(MOCK_RECOMMENDATIONS);
      setFilteredRecommendations(MOCK_RECOMMENDATIONS);
      setIsLoading(false);
    }, 500);
  }, []);
  
  // Apply filters and search
  useEffect(() => {
    if (recommendations.length === 0) return;
    
    let filtered = [...recommendations];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(rec => 
        rec.title.toLowerCase().includes(query) ||
        rec.description.toLowerCase().includes(query) ||
        rec.venue_name.toLowerCase().includes(query) ||
        rec.vibe_tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply vibe filters
    if (selectedVibes.length > 0) {
      filtered = filtered.filter(rec => 
        selectedVibes.some(vibe => rec.vibe_tags.includes(vibe))
      );
    }
    
    // Apply category filters
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(rec => 
        selectedCategories.includes(rec.category)
      );
    }
    
    // Apply price filters
    if (selectedPrices.length > 0) {
      filtered = filtered.filter(rec => 
        rec.price_level && selectedPrices.includes(rec.price_level)
      );
    }
    
    // Apply sorting
    if (filters.sort_by) {
      if (filters.sort_by === 'trending') {
        filtered.sort((a, b) => b.trend_score - a.trend_score);
      }
      // Add other sorting options as needed
    }
    
    setFilteredRecommendations(filtered);
  }, [recommendations, searchQuery, selectedVibes, selectedCategories, selectedPrices, filters]);
  
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
  
  // Handle vibe tag selection
  const handleVibeToggle = (vibe: string) => {
    if (selectedVibes.includes(vibe)) {
      setSelectedVibes(selectedVibes.filter(v => v !== vibe));
    } else {
      setSelectedVibes([...selectedVibes, vibe]);
    }
  };
  
  // Handle category selection
  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  // Handle price selection
  const handlePriceToggle = (price: number) => {
    if (selectedPrices.includes(price)) {
      setSelectedPrices(selectedPrices.filter(p => p !== price));
    } else {
      setSelectedPrices([...selectedPrices, price]);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedVibes([]);
    setSelectedCategories([]);
    setSelectedPrices([]);
    setFilters({ sort_by: 'trending' });
  };
  
  // Count active filters
  const activeFilterCount = 
    selectedVibes.length + 
    selectedCategories.length + 
    selectedPrices.length;
  
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      
      <main className="flex-1 container-fluid py-6">
        <h1 className="text-3xl font-bold mb-6">Discover</h1>
        
        {/* Search and Filter Bar */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search venues, vibes, or locations..."
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
            
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="btn-outline flex items-center"
            >
              <FiFilter className="mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
          
          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="mt-4 p-4 bg-white rounded-lg border shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-primary text-sm hover:underline"
                >
                  Clear All
                </button>
              </div>
              
              {/* Vibes Filter */}
              <div className="mb-4">
                <h4 className="text-md font-medium mb-2">Vibes</h4>
                <div className="flex flex-wrap gap-2">
                  {VIBE_OPTIONS.map(vibe => (
                    <VibeTag
                      key={vibe}
                      tag={vibe}
                      onClick={handleVibeToggle}
                      selected={selectedVibes.includes(vibe)}
                    />
                  ))}
                </div>
              </div>
              
              {/* Categories Filter */}
              <div className="mb-4">
                <h4 className="text-md font-medium mb-2">Categories</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {CATEGORY_OPTIONS.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="mr-2"
                      />
                      <label htmlFor={`category-${category}`} className="text-sm capitalize">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Filter */}
              <div className="mb-4">
                <h4 className="text-md font-medium mb-2">Price Level</h4>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4].map(price => (
                    <button
                      key={price}
                      onClick={() => handlePriceToggle(price)}
                      className={`flex-1 py-2 border rounded-md ${
                        selectedPrices.includes(price)
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {'$'.repeat(price)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sort By */}
              <div className="mb-4">
                <h4 className="text-md font-medium mb-2">Sort By</h4>
                <select
                  value={filters.sort_by || 'trending'}
                  onChange={(e) => setFilters({ ...filters, sort_by: e.target.value as any })}
                  className="input"
                >
                  <option value="trending">Trending</option>
                  <option value="distance">Distance</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
              
              {/* Apply Button */}
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full btn-primary"
              >
                Apply Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Results */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            {isLoading ? 'Loading recommendations...' : 
              `${filteredRecommendations.length} ${
                searchQuery ? 'Search Results' : 'Recommendations'
              }`}
          </h2>
          
          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecommendations.map(recommendation => (
              <RecommendationCard
                key={recommendation.recommendationId}
                recommendation={recommendation}
                onSave={handleSaveRecommendation}
                isSaved={savedRecommendations.includes(recommendation.recommendationId)}
                onClick={() => handleCardClick(recommendation)}
              />
            ))}
          </div>
          
          {/* Empty State */}
          {filteredRecommendations.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No recommendations found with the current filters.</p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

