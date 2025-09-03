/**
 * Core entity types for the VibeFinder application
 */

/**
 * User entity representing a registered user
 */
export interface User {
  userId: string;
  email: string;
  name: string;
  avatar_url?: string;
  preferences: UserPreferences;
  saved_locations: string[];
  onboarding_complete: boolean;
  created_at: string;
  updated_at: string;
  subscription_tier: 'free' | 'premium';
  subscription_status?: 'active' | 'canceled' | 'past_due' | null;
  subscription_expires?: string | null;
}

/**
 * User preferences for personalized recommendations
 */
export interface UserPreferences {
  vibes: string[];
  categories: string[];
  max_distance: number;
  price_range?: [number, number];
  favorite_locations?: GeoLocation[];
  connected_social_accounts?: {
    instagram?: string;
    tiktok?: string;
  };
}

/**
 * Recommendation entity representing a venue recommendation
 */
export interface Recommendation {
  recommendationId: string;
  title: string;
  description: string;
  venue_name: string;
  location: GeoLocation;
  social_media_url: string;
  trend_score: number;
  vibe_tags: string[];
  image_url: string;
  video_url?: string;
  timestamp: string;
  price_level?: number;
  hours?: BusinessHours;
  user_ratings?: UserRating[];
  category: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Venue entity representing a physical location
 */
export interface Venue {
  venueId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  categories: string[];
  description?: string;
  website?: string;
  phone?: string;
  price_level?: number;
  hours?: BusinessHours;
  photos?: string[];
  rating?: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Geographic location with coordinates and address information
 */
export interface GeoLocation {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
}

/**
 * Business hours for a venue
 */
export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

/**
 * Opening and closing hours for a specific day
 */
export interface DayHours {
  open: string;
  close: string;
  is_closed: boolean;
}

/**
 * User rating and review for a venue
 */
export interface UserRating {
  userId: string;
  rating: number;
  comment?: string;
  timestamp: string;
}

/**
 * Content from social media platforms
 */
export interface SocialMediaContent {
  platform: 'instagram' | 'tiktok';
  url: string;
  content_type: 'video' | 'image';
  caption?: string;
  hashtags?: string[];
  engagement: {
    likes: number;
    comments: number;
    shares?: number;
  };
  timestamp: string;
  location?: GeoLocation;
  author: {
    username: string;
    profile_url: string;
  };
}

/**
 * Result of analyzing a video for content and sentiment
 */
export interface VideoAnalysisResult {
  summary: string;
  keywords: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  detected_vibes: string[];
  crowd_density?: 'empty' | 'sparse' | 'moderate' | 'crowded' | 'packed';
  noise_level?: 'quiet' | 'moderate' | 'loud';
  detected_activities?: string[];
  confidence_score: number;
}

/**
 * Subscription plan
 */
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  is_popular: boolean;
  created_at?: string;
  updated_at?: string;
  stripe_price_id?: string;
  stripe_product_id?: string;
}

/**
 * User subscription
 */
export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'canceled' | 'past_due';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at?: string;
  updated_at?: string;
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
}

/**
 * Notification for a user
 */
export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  action_url?: string;
  recommendation_id?: string;
}

/**
 * Filters for recommendations
 */
export interface RecommendationFilters {
  vibes?: string[];
  categories?: string[];
  price_level?: number[];
  distance?: number;
  sort_by?: 'trending' | 'distance' | 'rating';
  search?: string;
}

/**
 * Map view settings
 */
export interface MapViewSettings {
  center: GeoLocation;
  zoom: number;
  showLabels: boolean;
  mapType: 'roadmap' | 'satellite';
}

/**
 * API response with pagination
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    items_per_page: number;
  };
}

/**
 * API error response
 */
export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

/**
 * API success response
 */
export interface ApiSuccess<T> {
  success: true;
  data: T;
}

/**
 * API response (success or error)
 */
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

