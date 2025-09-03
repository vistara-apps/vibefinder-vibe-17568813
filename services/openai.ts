import OpenAI from 'openai';
import { VideoAnalysisResult } from '@/types';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.warn('OpenAI API key is missing');
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

/**
 * Generate a recommendation description based on video analysis
 */
export async function generateRecommendationDescription(
  venueName: string,
  videoAnalysis: VideoAnalysisResult,
  maxLength: number = 150
): Promise<string> {
  try {
    const prompt = `
      Create a concise and engaging description for a venue called "${venueName}" based on the following video analysis:
      
      Summary: ${videoAnalysis.summary}
      Keywords: ${videoAnalysis.keywords.join(', ')}
      Sentiment: ${videoAnalysis.sentiment}
      Vibes: ${videoAnalysis.detected_vibes.join(', ')}
      Crowd: ${videoAnalysis.crowd_density}
      Noise Level: ${videoAnalysis.noise_level}
      Activities: ${videoAnalysis.detected_activities.join(', ')}
      
      The description should be engaging, highlight the venue's atmosphere, and be approximately ${maxLength} characters long.
      Focus on what makes this place special and why someone would want to visit.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that creates engaging venue descriptions based on video analysis.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    return response.choices[0].message.content?.trim() || '';
  } catch (error) {
    console.error('Error generating recommendation description:', error);
    throw error;
  }
}

/**
 * Categorize venue by vibe based on video analysis
 */
export async function categorizeVenueVibes(
  videoAnalysis: VideoAnalysisResult
): Promise<string[]> {
  try {
    // If the video analysis already has detected vibes, use those
    if (videoAnalysis.detected_vibes && videoAnalysis.detected_vibes.length > 0) {
      return videoAnalysis.detected_vibes;
    }

    // Otherwise, use OpenAI to categorize the vibes
    const prompt = `
      Based on the following video analysis of a venue, categorize the venue's vibe into 3-5 categories from this list:
      chill, energetic, romantic, cozy, elegant, trendy, artsy, hipster, family-friendly, foodie, outdoor, live-music, quiet, bustling, historic, modern, sporty, pet-friendly, scenic, late-night
      
      Summary: ${videoAnalysis.summary}
      Keywords: ${videoAnalysis.keywords.join(', ')}
      Sentiment: ${videoAnalysis.sentiment}
      Crowd: ${videoAnalysis.crowd_density}
      Noise Level: ${videoAnalysis.noise_level}
      Activities: ${videoAnalysis.detected_activities.join(', ')}
      
      Return only the vibe categories as a comma-separated list, nothing else.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that categorizes venues based on their vibe.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 50,
      temperature: 0.3,
    });

    const vibes = response.choices[0].message.content?.trim().split(',').map(vibe => vibe.trim()) || [];
    return vibes;
  } catch (error) {
    console.error('Error categorizing venue vibes:', error);
    throw error;
  }
}

/**
 * Generate a title for a recommendation based on video analysis
 */
export async function generateRecommendationTitle(
  venueName: string,
  videoAnalysis: VideoAnalysisResult
): Promise<string> {
  try {
    const prompt = `
      Create a short, catchy title for a recommendation for "${venueName}" based on the following video analysis:
      
      Summary: ${videoAnalysis.summary}
      Keywords: ${videoAnalysis.keywords.join(', ')}
      Vibes: ${videoAnalysis.detected_vibes.join(', ')}
      Activities: ${videoAnalysis.detected_activities.join(', ')}
      
      The title should be attention-grabbing, under 60 characters, and highlight what makes this place special.
      Don't include the venue name in the title.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that creates catchy titles for venue recommendations.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 30,
      temperature: 0.7,
    });

    return response.choices[0].message.content?.trim() || '';
  } catch (error) {
    console.error('Error generating recommendation title:', error);
    throw error;
  }
}

/**
 * Match user preferences with venue vibes
 */
export async function matchUserPreferencesWithVenue(
  userPreferences: string[],
  venueVibes: string[]
): Promise<number> {
  // Calculate a simple match score based on overlap
  const matchingVibes = venueVibes.filter(vibe => userPreferences.includes(vibe));
  const matchScore = (matchingVibes.length / Math.max(userPreferences.length, 1)) * 100;
  
  return Math.round(matchScore);
}

