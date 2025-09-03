'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiMapPin, FiClock, FiHeart, FiShare2, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import VibeTag from './VibeTag';
import { Recommendation } from '@/types';

interface RecommendationCardProps {
  recommendation: Recommendation;
  variant?: 'collapsed' | 'expanded';
  onSave?: (id: string) => void;
  isSaved?: boolean;
  onClick?: () => void;
}

export default function RecommendationCard({
  recommendation,
  variant = 'collapsed',
  onSave,
  isSaved = false,
  onClick,
}: RecommendationCardProps) {
  const [isExpanded, setIsExpanded] = useState(variant === 'expanded');
  
  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSave) {
      onSave(recommendation.recommendationId);
    }
  };
  
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: recommendation.title,
        text: recommendation.description,
        url: `/recommendations/${recommendation.recommendationId}`,
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.origin + `/recommendations/${recommendation.recommendationId}`);
      // You could show a toast notification here
    }
  };
  
  // Format the timestamp
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <div 
      className={`recommendation-card bg-white rounded-lg overflow-hidden shadow-card transition-all ${
        onClick ? 'cursor-pointer hover:shadow-lg' : ''
      } ${isExpanded ? 'border-2 border-primary' : 'border border-gray-200'}`}
      onClick={onClick}
    >
      {/* Card Image */}
      <div className="relative h-48">
        <Image
          src={recommendation.image_url}
          alt={recommendation.title}
          fill
          className="object-cover"
        />
        
        {/* Trend Score Badge */}
        <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
          Trending {recommendation.trend_score}%
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex space-x-1">
          <button 
            onClick={handleSave}
            className={`p-2 rounded-full ${
              isSaved 
                ? 'bg-accent text-white' 
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
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
      </div>
      
      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1 line-clamp-2">{recommendation.title}</h3>
        
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <FiMapPin className="mr-1 flex-shrink-0" />
          <span className="truncate">{recommendation.venue_name}</span>
        </div>
        
        <div className="flex items-center justify-between text-gray-500 text-xs mb-3">
          <div className="flex items-center">
            <FiClock className="mr-1" />
            <span>{formatDate(recommendation.timestamp)}</span>
          </div>
          
          {/* Price Level */}
          {recommendation.price_level && (
            <div>
              {'$'.repeat(recommendation.price_level)}
            </div>
          )}
        </div>
        
        {/* Vibe Tags */}
        <div className="flex flex-wrap mb-3 -m-1">
          {recommendation.vibe_tags.slice(0, isExpanded ? undefined : 3).map((tag) => (
            <VibeTag key={tag} tag={tag} />
          ))}
          {!isExpanded && recommendation.vibe_tags.length > 3 && (
            <span className="text-xs text-gray-500 m-1">+{recommendation.vibe_tags.length - 3} more</span>
          )}
        </div>
        
        {/* Description */}
        <p className={`text-gray-700 text-sm ${isExpanded ? '' : 'line-clamp-2'}`}>
          {recommendation.description}
        </p>
        
        {/* Expand/Collapse Button */}
        <button
          onClick={handleToggleExpand}
          className="mt-3 text-primary text-sm font-medium flex items-center hover:underline"
        >
          {isExpanded ? (
            <>
              <FiChevronUp className="mr-1" />
              Show less
            </>
          ) : (
            <>
              <FiChevronDown className="mr-1" />
              Show more
            </>
          )}
        </button>
      </div>
    </div>
  );
}

