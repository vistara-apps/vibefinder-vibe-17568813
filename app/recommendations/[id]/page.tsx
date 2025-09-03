'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiMapPin, FiClock, FiDollarSign, FiHeart, FiShare2, FiExternalLink, FiPhone, FiGlobe } from 'react-icons/fi';
import AppHeader from '@/components/ui/AppHeader';
import VibeTag from '@/components/ui/VibeTag';
import { Recommendation } from '@/types';

// Mock data for initial development
const MOCK_RECOMMENDATIONS: Record<string, Recommendation> = {
  '1': {
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
    video_url: 'https://example.com/video.mp4',
    timestamp: new Date().toISOString(),
    price_level: 2,
    category: 'markets',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  '2': {
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
  '3': {
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
};

export default function RecommendationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    setIsLoading(true);
    
    try {
      const mockRecommendation = MOCK_RECOMMENDATIONS[id];
      
      if (mockRecommendation) {
        setRecommendation(mockRecommendation);
      } else {
        setError('Recommendation not found');
      }
    } catch (err) {
      setError('Error loading recommendation');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);
  
  const handleSave = () => {
    setIsSaved(!isSaved);
    // In a real app, this would call an API to save/unsave
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recommendation?.title || 'VibeFinder Recommendation',
        text: recommendation?.description || '',
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };
  
  const handleGetDirections = () => {
    if (!recommendation) return;
    
    const { latitude, longitude } = recommendation.location;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, '_blank');
  };
  
  // Format the price level
  const renderPriceLevel = () => {
    if (!recommendation?.price_level) return null;
    
    const priceLevel = recommendation.price_level;
    return (
      <div className="flex items-center text-gray-600">
        {[...Array(priceLevel)].map((_, i) => (
          <FiDollarSign key={i} className="text-accent" />
        ))}
        {[...Array(4 - priceLevel)].map((_, i) => (
          <FiDollarSign key={i + priceLevel} className="text-gray-300" />
        ))}
      </div>
    );
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse">Loading recommendation...</div>
        </div>
      </div>
    );
  }
  
  if (error || !recommendation) {
    return (
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h2 className="text-xl font-bold text-red-500 mb-4">
            {error || 'Recommendation not found'}
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the recommendation you're looking for.
          </p>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      
      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={recommendation.image_url}
            alt={recommendation.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 bg-white/80 text-gray-800 p-2 rounded-full hover:bg-white"
            aria-label="Go back"
          >
            <FiArrowLeft />
          </button>
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button 
              onClick={handleSave}
              className={`p-2 rounded-full ${isSaved ? 'bg-accent text-white' : 'bg-white/80 text-gray-700 hover:bg-white'}`}
              aria-label={isSaved ? 'Unsave' : 'Save'}
            >
              <FiHeart className={isSaved ? 'fill-current' : ''} />
            </button>
            <button 
              onClick={handleShare}
              className="p-2 rounded-full bg-white/80 text-gray-700 hover:bg-white"
              aria-label="Share"
            >
              <FiShare2 />
            </button>
          </div>
          
          {/* Trend Score Badge */}
          <div className="absolute top-4 left-16 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
            Trending {recommendation.trend_score}%
          </div>
        </div>
        
        {/* Content */}
        <div className="container-fluid py-6">
          <div className="max-w-3xl mx-auto">
            {/* Title and Location */}
            <h1 className="text-3xl font-bold">{recommendation.title}</h1>
            <div className="flex items-center mt-2 text-gray-600">
              <FiMapPin className="mr-1" />
              <span>{recommendation.venue_name}</span>
            </div>
            <p className="text-gray-500 mt-1">{recommendation.location.address}</p>
            
            {/* Vibe Tags */}
            <div className="mt-4 flex flex-wrap">
              {recommendation.vibe_tags.map((tag) => (
                <VibeTag key={tag} tag={tag} />
              ))}
            </div>
            
            {/* Price and Time */}
            <div className="mt-4 flex justify-between items-center">
              {renderPriceLevel()}
              <div className="flex items-center text-gray-600 text-sm">
                <FiClock className="mr-1" />
                <span>
                  {new Date(recommendation.timestamp).toLocaleDateString(undefined, {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
            
            {/* Description */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="text-gray-700">{recommendation.description}</p>
            </div>
            
            {/* Video Preview (if available) */}
            {recommendation.video_url && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Video Preview</h2>
                <div className="aspect-video relative rounded-md overflow-hidden">
                  <video 
                    src={recommendation.video_url} 
                    controls 
                    poster={recommendation.image_url}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            
            {/* Social Media Source */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Source</h2>
              <a 
                href={recommendation.social_media_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:underline"
              >
                <FiExternalLink className="mr-2" />
                View original post on {recommendation.social_media_url.includes('tiktok') ? 'TikTok' : 'Instagram'}
              </a>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={handleGetDirections}
                className="btn-primary"
              >
                Get Directions
              </button>
              <button 
                onClick={handleSave}
                className={`${isSaved ? 'btn-accent' : 'btn-outline'}`}
              >
                {isSaved ? 'Saved' : 'Save for Later'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

