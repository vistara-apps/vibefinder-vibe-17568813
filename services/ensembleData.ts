import axios from 'axios';
import { SocialMediaContent } from '@/types';

const ENSEMBLE_DATA_API_KEY = process.env.ENSEMBLE_DATA_API_KEY;
const ENSEMBLE_DATA_API_URL = process.env.ENSEMBLE_DATA_API_URL || 'https://ensembledata.com';

if (!ENSEMBLE_DATA_API_KEY) {
  console.warn('EnsembleData API key is missing');
}

/**
 * EnsembleData API service for scraping social media content
 */
const ensembleDataApi = axios.create({
  baseURL: ENSEMBLE_DATA_API_URL,
  headers: {
    'Authorization': `Bearer ${ENSEMBLE_DATA_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

/**
 * Search for TikTok videos by hashtag
 */
export async function searchTikTokByHashtag(
  hashtag: string,
  limit: number = 20
): Promise<SocialMediaContent[]> {
  try {
    const response = await ensembleDataApi.get(`/apis/tt/hashtag_search`, {
      params: {
        hashtag,
        token: ENSEMBLE_DATA_API_KEY,
        limit,
      },
    });

    // Transform the response to our SocialMediaContent type
    return response.data.data.map((item: any) => ({
      platform: 'tiktok',
      url: item.share_url,
      content_type: 'video',
      caption: item.desc,
      hashtags: extractHashtags(item.desc),
      engagement: {
        likes: item.statistics.digg_count,
        comments: item.statistics.comment_count,
        shares: item.statistics.share_count,
      },
      timestamp: new Date(item.create_time * 1000).toISOString(),
      location: item.location ? {
        latitude: item.location.latitude,
        longitude: item.location.longitude,
        address: item.location.address,
      } : undefined,
      author: {
        username: item.author.unique_id,
        profile_url: `https://www.tiktok.com/@${item.author.unique_id}`,
      },
    }));
  } catch (error) {
    console.error('Error searching TikTok by hashtag:', error);
    throw error;
  }
}

/**
 * Search for Instagram posts by hashtag
 */
export async function searchInstagramByHashtag(
  hashtag: string,
  limit: number = 20
): Promise<SocialMediaContent[]> {
  try {
    const response = await ensembleDataApi.get(`/apis/ig/hashtag_search`, {
      params: {
        hashtag,
        token: ENSEMBLE_DATA_API_KEY,
        limit,
      },
    });

    // Transform the response to our SocialMediaContent type
    return response.data.data.map((item: any) => ({
      platform: 'instagram',
      url: item.permalink,
      content_type: item.media_type === 'VIDEO' ? 'video' : 'image',
      caption: item.caption,
      hashtags: extractHashtags(item.caption),
      engagement: {
        likes: item.like_count,
        comments: item.comments_count,
      },
      timestamp: new Date(item.timestamp).toISOString(),
      location: item.location ? {
        latitude: item.location.latitude,
        longitude: item.location.longitude,
        address: item.location.name,
      } : undefined,
      author: {
        username: item.username,
        profile_url: `https://www.instagram.com/${item.username}`,
      },
    }));
  } catch (error) {
    console.error('Error searching Instagram by hashtag:', error);
    throw error;
  }
}

/**
 * Search for social media content by location
 */
export async function searchByLocation(
  latitude: number,
  longitude: number,
  radius: number = 5000, // meters
  limit: number = 20
): Promise<SocialMediaContent[]> {
  try {
    // Combine results from both platforms
    const [tiktokResults, instagramResults] = await Promise.all([
      ensembleDataApi.get(`/apis/tt/location_search`, {
        params: {
          latitude,
          longitude,
          radius,
          token: ENSEMBLE_DATA_API_KEY,
          limit,
        },
      }),
      ensembleDataApi.get(`/apis/ig/location_search`, {
        params: {
          latitude,
          longitude,
          radius,
          token: ENSEMBLE_DATA_API_KEY,
          limit,
        },
      }),
    ]);

    // Transform and combine the results
    const tiktokContent = tiktokResults.data.data.map((item: any) => ({
      platform: 'tiktok',
      url: item.share_url,
      content_type: 'video',
      caption: item.desc,
      hashtags: extractHashtags(item.desc),
      engagement: {
        likes: item.statistics.digg_count,
        comments: item.statistics.comment_count,
        shares: item.statistics.share_count,
      },
      timestamp: new Date(item.create_time * 1000).toISOString(),
      location: item.location ? {
        latitude: item.location.latitude,
        longitude: item.location.longitude,
        address: item.location.address,
      } : undefined,
      author: {
        username: item.author.unique_id,
        profile_url: `https://www.tiktok.com/@${item.author.unique_id}`,
      },
    }));

    const instagramContent = instagramResults.data.data.map((item: any) => ({
      platform: 'instagram',
      url: item.permalink,
      content_type: item.media_type === 'VIDEO' ? 'video' : 'image',
      caption: item.caption,
      hashtags: extractHashtags(item.caption),
      engagement: {
        likes: item.like_count,
        comments: item.comments_count,
      },
      timestamp: new Date(item.timestamp).toISOString(),
      location: item.location ? {
        latitude: item.location.latitude,
        longitude: item.location.longitude,
        address: item.location.name,
      } : undefined,
      author: {
        username: item.username,
        profile_url: `https://www.instagram.com/${item.username}`,
      },
    }));

    // Combine and sort by engagement (likes + comments)
    return [...tiktokContent, ...instagramContent]
      .sort((a, b) => {
        const engagementA = a.engagement.likes + a.engagement.comments;
        const engagementB = b.engagement.likes + b.engagement.comments;
        return engagementB - engagementA;
      })
      .slice(0, limit);
  } catch (error) {
    console.error('Error searching by location:', error);
    throw error;
  }
}

/**
 * Search for trending content in a city
 */
export async function searchTrendingInCity(
  city: string,
  limit: number = 20
): Promise<SocialMediaContent[]> {
  try {
    // Search for city-related hashtags
    const cityHashtag = city.toLowerCase().replace(/\s+/g, '');
    const [tiktokResults, instagramResults] = await Promise.all([
      searchTikTokByHashtag(cityHashtag, limit),
      searchInstagramByHashtag(cityHashtag, limit),
    ]);

    // Combine and sort by engagement (likes + comments)
    return [...tiktokResults, ...instagramResults]
      .sort((a, b) => {
        const engagementA = a.engagement.likes + a.engagement.comments;
        const engagementB = b.engagement.likes + b.engagement.comments;
        return engagementB - engagementA;
      })
      .slice(0, limit);
  } catch (error) {
    console.error('Error searching trending in city:', error);
    throw error;
  }
}

/**
 * Extract hashtags from text
 */
function extractHashtags(text: string): string[] {
  if (!text) return [];
  const hashtagRegex = /#(\w+)/g;
  const matches = text.match(hashtagRegex);
  return matches ? matches.map(tag => tag.substring(1)) : [];
}

