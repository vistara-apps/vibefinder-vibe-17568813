# VibeFinder Integration Guide

This document provides comprehensive guidance for integrating with the external APIs and services used by VibeFinder.

## Table of Contents

1. [EnsembleData API Integration](#ensembledata-api-integration)
2. [SocialKit Video Analysis API Integration](#socialkit-video-analysis-api-integration)
3. [OpenAI API Integration](#openai-api-integration)
4. [Google Maps API Integration](#google-maps-api-integration)
5. [Supabase Integration](#supabase-integration)
6. [Stripe Integration](#stripe-integration)
7. [Authentication Flow](#authentication-flow)
8. [Error Handling](#error-handling)
9. [Rate Limiting](#rate-limiting)
10. [Security Best Practices](#security-best-practices)

## EnsembleData API Integration

EnsembleData API is used for scraping social media content from TikTok and Instagram.

### Setup

1. Sign up for an EnsembleData account at [https://ensembledata.com](https://ensembledata.com)
2. Generate an API key from the dashboard
3. Add the API key to your environment variables:
   ```
   ENSEMBLE_DATA_API_KEY=your_api_key
   ENSEMBLE_DATA_API_URL=https://ensembledata.com
   ```

### Key Endpoints

#### Search TikTok by Hashtag

```javascript
// Example usage
import axios from 'axios';

const searchTikTokByHashtag = async (hashtag, limit = 20) => {
  try {
    const response = await axios.get('https://ensembledata.com/apis/tt/hashtag_search', {
      params: {
        hashtag,
        token: process.env.ENSEMBLE_DATA_API_KEY,
        limit,
      },
    });
    
    return response.data.data;
  } catch (error) {
    console.error('Error searching TikTok by hashtag:', error);
    throw error;
  }
};
```

#### Search Instagram by Hashtag

```javascript
// Example usage
const searchInstagramByHashtag = async (hashtag, limit = 20) => {
  try {
    const response = await axios.get('https://ensembledata.com/apis/ig/hashtag_search', {
      params: {
        hashtag,
        token: process.env.ENSEMBLE_DATA_API_KEY,
        limit,
      },
    });
    
    return response.data.data;
  } catch (error) {
    console.error('Error searching Instagram by hashtag:', error);
    throw error;
  }
};
```

#### Search by Location

```javascript
// Example usage
const searchByLocation = async (latitude, longitude, radius = 5000, limit = 20) => {
  try {
    // Combine results from both platforms
    const [tiktokResults, instagramResults] = await Promise.all([
      axios.get('https://ensembledata.com/apis/tt/location_search', {
        params: {
          latitude,
          longitude,
          radius,
          token: process.env.ENSEMBLE_DATA_API_KEY,
          limit,
        },
      }),
      axios.get('https://ensembledata.com/apis/ig/location_search', {
        params: {
          latitude,
          longitude,
          radius,
          token: process.env.ENSEMBLE_DATA_API_KEY,
          limit,
        },
      }),
    ]);
    
    return {
      tiktok: tiktokResults.data.data,
      instagram: instagramResults.data.data,
    };
  } catch (error) {
    console.error('Error searching by location:', error);
    throw error;
  }
};
```

### Rate Limits

- 1000 requests per day
- 100 requests per hour
- 10 requests per minute

### Error Handling

EnsembleData API returns standard HTTP status codes:

- 200: Success
- 400: Bad request (invalid parameters)
- 401: Unauthorized (invalid API key)
- 429: Too many requests (rate limit exceeded)
- 500: Server error

## SocialKit Video Analysis API Integration

SocialKit API is used for analyzing video content to extract summaries, keywords, and sentiment.

### Setup

1. Sign up for a SocialKit account at [https://www.socialkit.dev](https://www.socialkit.dev)
2. Generate an API key from the dashboard
3. Add the API key to your environment variables:
   ```
   SOCIALKIT_API_KEY=your_api_key
   SOCIALKIT_API_URL=https://www.socialkit.dev
   ```

### Key Endpoints

#### Get Video Summary

```javascript
// Example usage
import axios from 'axios';

const getVideoSummary = async (videoUrl) => {
  try {
    const response = await axios.post('https://www.socialkit.dev/video/summary', {
      video_url: videoUrl,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.SOCIALKIT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    
    return response.data.summary;
  } catch (error) {
    console.error('Error getting video summary:', error);
    throw error;
  }
};
```

#### Get Video Transcript

```javascript
// Example usage
const getVideoTranscript = async (videoUrl) => {
  try {
    const response = await axios.post('https://www.socialkit.dev/video/transcript', {
      video_url: videoUrl,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.SOCIALKIT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    
    return response.data.transcript;
  } catch (error) {
    console.error('Error getting video transcript:', error);
    throw error;
  }
};
```

#### Get Video Analytics

```javascript
// Example usage
const getVideoAnalytics = async (videoUrl) => {
  try {
    const response = await axios.post('https://www.socialkit.dev/video/analytics', {
      video_url: videoUrl,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.SOCIALKIT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error getting video analytics:', error);
    throw error;
  }
};
```

### Rate Limits

- 500 requests per day
- 50 requests per hour
- 5 requests per minute

### Error Handling

SocialKit API returns standard HTTP status codes with detailed error messages in the response body.

## OpenAI API Integration

OpenAI API is used for natural language processing to categorize venues by vibe and generate recommendation descriptions.

### Setup

1. Sign up for an OpenAI account at [https://platform.openai.com](https://platform.openai.com)
2. Generate an API key from the dashboard
3. Add the API key to your environment variables:
   ```
   OPENAI_API_KEY=your_api_key
   ```

### Key Endpoints

#### Generate Recommendation Description

```javascript
// Example usage
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateRecommendationDescription = async (venueName, videoAnalysis, maxLength = 150) => {
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
};
```

#### Categorize Venue Vibes

```javascript
// Example usage
const categorizeVenueVibes = async (videoAnalysis) => {
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
};
```

### Rate Limits

- Rate limits depend on your OpenAI account tier
- Default tier: 3 requests per minute, 200 requests per day

### Error Handling

OpenAI API returns detailed error messages with error codes. Common errors include:

- Authentication errors (invalid API key)
- Rate limit errors
- Invalid request errors (malformed input)
- Server errors

## Google Maps API Integration

Google Maps API is used for geocoding, location-based services, and the interactive map interface.

### Setup

1. Create a Google Cloud Platform account at [https://cloud.google.com](https://cloud.google.com)
2. Create a new project
3. Enable the following APIs:
   - Maps JavaScript API
   - Geocoding API
   - Places API
4. Create an API key with appropriate restrictions
5. Add the API key to your environment variables:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
   ```

### Key Endpoints

#### Geocode Address

```javascript
// Example usage
import axios from 'axios';

const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );

    if (response.data.status !== 'OK') {
      throw new Error(`Geocoding error: ${response.data.status}`);
    }

    const result = response.data.results[0];
    const { lat, lng } = result.geometry.location;
    
    return {
      latitude: lat,
      longitude: lng,
      address: result.formatted_address,
    };
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
};
```

#### Reverse Geocode

```javascript
// Example usage
const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );

    if (response.data.status !== 'OK') {
      throw new Error(`Reverse geocoding error: ${response.data.status}`);
    }

    const result = response.data.results[0];
    
    return {
      latitude,
      longitude,
      address: result.formatted_address,
    };
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    throw error;
  }
};
```

#### Search Nearby Places

```javascript
// Example usage
const searchNearbyPlaces = async (latitude, longitude, radius = 1500, type, keyword) => {
  try {
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    
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
};
```

### Maps JavaScript API Integration

```javascript
// Example usage in a React component
import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const MapComponent = ({ center, zoom, markers }) => {
  const mapRef = useRef(null);
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });
    
    loader.load().then(() => {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: center.latitude, lng: center.longitude },
        zoom: zoom,
      });
      
      // Add markers
      markers.forEach(marker => {
        new google.maps.Marker({
          position: { lat: marker.latitude, lng: marker.longitude },
          map,
          title: marker.title,
        });
      });
    });
  }, [center, zoom, markers]);
  
  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};
```

### Rate Limits

- Depends on your Google Cloud Platform billing account
- Free tier includes:
  - Maps JavaScript API: 28,000 loads per month
  - Geocoding API: 40,000 requests per month
  - Places API: 1,000 requests per day

### Error Handling

Google Maps API returns status codes in the response:

- OK: Request was successful
- ZERO_RESULTS: The geocode was successful but returned no results
- OVER_QUERY_LIMIT: You are over your quota
- REQUEST_DENIED: The request was denied
- INVALID_REQUEST: The request was invalid
- UNKNOWN_ERROR: Server error

## Supabase Integration

Supabase is used as the backend database and authentication service.

### Setup

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new project
3. Set up the database schema according to the data models
4. Enable authentication providers (email, Google, Apple)
5. Add the Supabase URL and anon key to your environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Key Functionality

#### Initialize Supabase Client

```javascript
// Example usage
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

#### Authentication

```javascript
// Sign up
const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

// Sign in
const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

// Sign out
const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Get current user
const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};
```

#### Database Operations

```javascript
// Get recommendations
const getRecommendations = async (filters = {}, page = 1, pageSize = 10) => {
  let query = supabase
    .from('recommendations')
    .select('*', { count: 'exact' });
  
  // Apply filters
  if (filters.vibes && filters.vibes.length > 0) {
    query = query.contains('vibe_tags', filters.vibes);
  }
  
  // Apply pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);
  
  const { data, error, count } = await query;
  
  if (error) throw error;
  
  return {
    data,
    pagination: {
      current_page: page,
      total_pages: Math.ceil((count || 0) / pageSize),
      total_items: count || 0,
      items_per_page: pageSize
    }
  };
};

// Save a recommendation
const saveRecommendation = async (userId, recommendationId) => {
  const { data, error } = await supabase
    .from('user_saved_recommendations')
    .insert({
      user_id: userId,
      recommendation_id: recommendationId
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
```

### Error Handling

Supabase operations return an object with `data` and `error` properties. Always check for errors before using the data.

## Stripe Integration

Stripe is used for subscription management and payment processing.

### Setup

1. Create a Stripe account at [https://stripe.com](https://stripe.com)
2. Set up products and prices for subscription plans
3. Add the Stripe API keys to your environment variables:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
   STRIPE_SECRET_KEY=your_secret_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   ```

### Key Functionality

#### Initialize Stripe

```javascript
// Server-side
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Client-side
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
```

#### Create Subscription

```javascript
// Server-side API route
import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { customerId, priceId } = req.body;
    
    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
    
    return res.status(200).json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return res.status(500).json({ error: error.message });
  }
}
```

#### Handle Webhook Events

```javascript
// Server-side API route
import Stripe from 'stripe';
import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const signature = req.headers['stripe-signature'];
  const buf = await buffer(req);
  
  try {
    const event = stripe.webhooks.constructEvent(
      buf.toString(),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    // Handle the event
    switch (event.type) {
      case 'customer.subscription.created':
        // Handle subscription created
        break;
      case 'customer.subscription.updated':
        // Handle subscription updated
        break;
      case 'customer.subscription.deleted':
        // Handle subscription deleted
        break;
      case 'invoice.payment_succeeded':
        // Handle successful payment
        break;
      case 'invoice.payment_failed':
        // Handle failed payment
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(400).json({ error: error.message });
  }
}
```

### Error Handling

Stripe operations can throw various errors. Always wrap Stripe API calls in try-catch blocks and handle errors appropriately.

## Authentication Flow

VibeFinder uses Supabase for authentication. Here's the complete authentication flow:

### Sign Up Flow

1. User enters email and password
2. Client calls Supabase Auth signUp method
3. Supabase sends confirmation email
4. User clicks confirmation link
5. User is redirected to the app
6. Client checks for authenticated session
7. If authenticated, user is directed to onboarding
8. User completes onboarding
9. User preferences are saved to the database
10. User is directed to the main app

### Sign In Flow

1. User enters email and password
2. Client calls Supabase Auth signInWithPassword method
3. If successful, client receives session
4. Client stores session in local storage
5. User is directed to the main app

### Social Sign In Flow

1. User clicks social sign in button (Google, Apple)
2. Client calls Supabase Auth signInWithOAuth method
3. User is redirected to OAuth provider
4. User authenticates with provider
5. Provider redirects back to app with token
6. Supabase validates token and creates session
7. Client receives session
8. If new user, directed to onboarding
9. If existing user, directed to main app

### Session Management

1. On app load, client checks for existing session
2. If session exists, validate with Supabase
3. If session is valid, user remains signed in
4. If session is invalid or expired, user is directed to sign in

### Password Reset Flow

1. User requests password reset
2. Client calls Supabase Auth resetPasswordForEmail method
3. Supabase sends password reset email
4. User clicks reset link
5. User is redirected to password reset page
6. User enters new password
7. Client calls Supabase Auth updateUser method
8. User is directed to sign in

## Error Handling

Implement consistent error handling across all integrations:

```javascript
// Example error handling middleware for API routes
export const withErrorHandling = (handler) => async (req, res) => {
  try {
    return await handler(req, res);
  } catch (error) {
    console.error('API error:', error);
    
    // Determine status code based on error
    let statusCode = 500;
    if (error.statusCode) {
      statusCode = error.statusCode;
    } else if (error.code === 'auth/invalid-credentials') {
      statusCode = 401;
    } else if (error.code === 'auth/insufficient-permissions') {
      statusCode = 403;
    } else if (error.code === 'not-found') {
      statusCode = 404;
    }
    
    return res.status(statusCode).json({
      success: false,
      error: {
        code: error.code || 'internal_error',
        message: error.message || 'An unexpected error occurred',
      },
    });
  }
};
```

## Rate Limiting

Implement rate limiting for your API endpoints:

```javascript
// Example rate limiting middleware using Express
import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: {
        code: 'rate_limit_exceeded',
        message: 'Too many requests, please try again later',
      },
    });
  },
});
```

## Security Best Practices

1. **API Keys**: Never expose API keys in client-side code
   - Use environment variables for server-side code
   - Use Next.js API routes to proxy requests to external APIs

2. **Authentication**: Implement proper authentication for all endpoints
   - Use Supabase Auth for user authentication
   - Validate session tokens for all protected routes

3. **CORS**: Configure CORS to allow only trusted domains
   ```javascript
   // Example CORS configuration
   import Cors from 'cors';
   
   const cors = Cors({
     origin: process.env.NODE_ENV === 'production'
       ? 'https://vibefinder.com'
       : 'http://localhost:3000',
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   });
   ```

4. **Input Validation**: Validate all user input
   ```javascript
   // Example input validation using Zod
   import { z } from 'zod';
   
   const userSchema = z.object({
     email: z.string().email(),
     password: z.string().min(8),
   });
   
   const validateUser = (data) => {
     try {
       return userSchema.parse(data);
     } catch (error) {
       throw new Error('Invalid user data');
     }
   };
   ```

5. **HTTPS**: Always use HTTPS in production
   - Configure SSL certificates for your domain
   - Redirect HTTP to HTTPS

6. **Content Security Policy**: Implement CSP headers
   ```javascript
   // Example CSP configuration in Next.js
   const securityHeaders = [
     {
       key: 'Content-Security-Policy',
       value: "default-src 'self'; script-src 'self' https://maps.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.googleapis.com https://*.gstatic.com; connect-src 'self' https://*.supabase.co https://api.stripe.com;",
     },
   ];
   
   module.exports = {
     async headers() {
       return [
         {
           source: '/(.*)',
           headers: securityHeaders,
         },
       ];
     },
   };
   ```

7. **Error Handling**: Never expose sensitive information in error messages
   - Sanitize error messages before sending to clients
   - Log detailed errors server-side only

8. **Dependency Management**: Regularly update dependencies
   - Use `npm audit` to check for vulnerabilities
   - Keep all packages up to date

