import axios from 'axios';
import { VideoAnalysisResult } from '@/types';

const SOCIALKIT_API_KEY = process.env.SOCIALKIT_API_KEY;
const SOCIALKIT_API_URL = process.env.SOCIALKIT_API_URL || 'https://www.socialkit.dev';

if (!SOCIALKIT_API_KEY) {
  console.warn('SocialKit API key is missing');
}

/**
 * SocialKit API service for video content analysis
 */
const socialKitApi = axios.create({
  baseURL: SOCIALKIT_API_URL,
  headers: {
    'Authorization': `Bearer ${SOCIALKIT_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

/**
 * Get video summary
 */
export async function getVideoSummary(videoUrl: string): Promise<string> {
  try {
    const response = await socialKitApi.post('/video/summary', {
      video_url: videoUrl,
    });

    return response.data.summary;
  } catch (error) {
    console.error('Error getting video summary:', error);
    throw error;
  }
}

/**
 * Get video transcript
 */
export async function getVideoTranscript(videoUrl: string): Promise<string> {
  try {
    const response = await socialKitApi.post('/video/transcript', {
      video_url: videoUrl,
    });

    return response.data.transcript;
  } catch (error) {
    console.error('Error getting video transcript:', error);
    throw error;
  }
}

/**
 * Get video analytics
 */
export async function getVideoAnalytics(videoUrl: string): Promise<any> {
  try {
    const response = await socialKitApi.post('/video/analytics', {
      video_url: videoUrl,
    });

    return response.data;
  } catch (error) {
    console.error('Error getting video analytics:', error);
    throw error;
  }
}

/**
 * Analyze video content
 */
export async function analyzeVideoContent(videoUrl: string): Promise<VideoAnalysisResult> {
  try {
    // Get transcript, summary, and analytics in parallel
    const [transcriptResponse, summaryResponse, analyticsResponse] = await Promise.all([
      getVideoTranscript(videoUrl),
      getVideoSummary(videoUrl),
      getVideoAnalytics(videoUrl),
    ]);

    // Extract keywords from analytics
    const keywords = analyticsResponse.keywords || [];

    // Determine sentiment
    const sentiment = analyticsResponse.sentiment?.overall || 'neutral';

    // Extract vibes from analytics
    const detectedVibes = analyticsResponse.vibes || [];

    // Extract crowd density and noise level
    const crowdDensity = analyticsResponse.crowd_density || 'moderate';
    const noiseLevel = analyticsResponse.noise_level || 'moderate';

    // Extract activities
    const detectedActivities = analyticsResponse.activities || [];

    // Calculate confidence score
    const confidenceScore = analyticsResponse.confidence || 0.8;

    return {
      summary: summaryResponse,
      keywords,
      sentiment: sentiment as 'positive' | 'neutral' | 'negative',
      detected_vibes: detectedVibes,
      crowd_density: crowdDensity as 'empty' | 'sparse' | 'moderate' | 'crowded' | 'packed',
      noise_level: noiseLevel as 'quiet' | 'moderate' | 'loud',
      detected_activities: detectedActivities,
      confidence_score: confidenceScore,
    };
  } catch (error) {
    console.error('Error analyzing video content:', error);
    throw error;
  }
}

