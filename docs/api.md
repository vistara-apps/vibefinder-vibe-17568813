# VibeFinder API Documentation

This document provides comprehensive documentation for the VibeFinder API, including endpoints, authentication, data models, and integration points.

## Base URL

```
https://api.vibefinder.com/v1
```

## Authentication

All API requests require authentication using a JWT token. To authenticate, include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Obtaining a Token

Tokens can be obtained by authenticating through the `/auth/login` endpoint:

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your_password"
}
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "userId": "123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

## Endpoints

### Recommendations

#### Get Recommendations

```http
GET /recommendations
```

Query Parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| latitude | number | User's current latitude |
| longitude | number | User's current longitude |
| radius | number | Search radius in kilometers (default: 10) |
| vibes | string[] | Filter by vibe tags (comma-separated) |
| categories | string[] | Filter by categories (comma-separated) |
| price_level | number[] | Filter by price level (comma-separated, 1-4) |
| sort_by | string | Sort by "trending", "distance", or "rating" |
| page | number | Page number for pagination (default: 1) |
| limit | number | Number of results per page (default: 10) |

Response:

```json
{
  "data": [
    {
      "recommendationId": "123",
      "title": "Vibrant Night Market Experience",
      "description": "Explore this bustling night market...",
      "venue_name": "Downtown Night Market",
      "location": {
        "latitude": 37.7749,
        "longitude": -122.4194,
        "address": "123 Market St, San Francisco, CA"
      },
      "social_media_url": "https://www.tiktok.com/@user/video/123456789",
      "trend_score": 92,
      "vibe_tags": ["bustling", "foodie", "trendy", "night-life"],
      "image_url": "https://example.com/image.jpg",
      "video_url": "https://example.com/video.mp4",
      "timestamp": "2023-08-01T12:00:00Z",
      "price_level": 2,
      "category": "markets"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_items": 42,
    "items_per_page": 10
  }
}
```

#### Get Recommendation by ID

```http
GET /recommendations/{id}
```

Response:

```json
{
  "recommendationId": "123",
  "title": "Vibrant Night Market Experience",
  "description": "Explore this bustling night market...",
  "venue_name": "Downtown Night Market",
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194,
    "address": "123 Market St, San Francisco, CA"
  },
  "social_media_url": "https://www.tiktok.com/@user/video/123456789",
  "trend_score": 92,
  "vibe_tags": ["bustling", "foodie", "trendy", "night-life"],
  "image_url": "https://example.com/image.jpg",
  "video_url": "https://example.com/video.mp4",
  "timestamp": "2023-08-01T12:00:00Z",
  "price_level": 2,
  "category": "markets"
}
```

### User

#### Get User Profile

```http
GET /users/me
```

Response:

```json
{
  "userId": "123",
  "email": "user@example.com",
  "name": "John Doe",
  "avatar_url": "https://example.com/avatar.jpg",
  "preferences": {
    "vibes": ["trendy", "foodie", "outdoor"],
    "categories": ["restaurants", "cafes", "parks"],
    "max_distance": 15
  },
  "saved_locations": ["123", "456"],
  "onboarding_complete": true,
  "subscription_tier": "free",
  "subscription_status": null,
  "subscription_expires": null
}
```

#### Update User Profile

```http
PATCH /users/me
Content-Type: application/json

{
  "name": "John Smith",
  "avatar_url": "https://example.com/new-avatar.jpg"
}
```

Response:

```json
{
  "userId": "123",
  "email": "user@example.com",
  "name": "John Smith",
  "avatar_url": "https://example.com/new-avatar.jpg",
  "preferences": {
    "vibes": ["trendy", "foodie", "outdoor"],
    "categories": ["restaurants", "cafes", "parks"],
    "max_distance": 15
  },
  "saved_locations": ["123", "456"],
  "onboarding_complete": true,
  "subscription_tier": "free",
  "subscription_status": null,
  "subscription_expires": null
}
```

#### Update User Preferences

```http
PATCH /users/me/preferences
Content-Type: application/json

{
  "vibes": ["trendy", "foodie", "outdoor", "cozy"],
  "categories": ["restaurants", "cafes", "parks", "markets"],
  "max_distance": 20
}
```

Response:

```json
{
  "vibes": ["trendy", "foodie", "outdoor", "cozy"],
  "categories": ["restaurants", "cafes", "parks", "markets"],
  "max_distance": 20
}
```

### Saved Recommendations

#### Get Saved Recommendations

```http
GET /users/me/saved
```

Query Parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number for pagination (default: 1) |
| limit | number | Number of results per page (default: 10) |

Response:

```json
{
  "data": [
    {
      "recommendationId": "123",
      "title": "Vibrant Night Market Experience",
      "description": "Explore this bustling night market...",
      "venue_name": "Downtown Night Market",
      "location": {
        "latitude": 37.7749,
        "longitude": -122.4194,
        "address": "123 Market St, San Francisco, CA"
      },
      "social_media_url": "https://www.tiktok.com/@user/video/123456789",
      "trend_score": 92,
      "vibe_tags": ["bustling", "foodie", "trendy", "night-life"],
      "image_url": "https://example.com/image.jpg",
      "video_url": "https://example.com/video.mp4",
      "timestamp": "2023-08-01T12:00:00Z",
      "price_level": 2,
      "category": "markets"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 1,
    "total_items": 2,
    "items_per_page": 10
  }
}
```

#### Save a Recommendation

```http
POST /users/me/saved/{recommendationId}
```

Response:

```json
{
  "success": true,
  "message": "Recommendation saved successfully"
}
```

#### Unsave a Recommendation

```http
DELETE /users/me/saved/{recommendationId}
```

Response:

```json
{
  "success": true,
  "message": "Recommendation removed from saved"
}
```

### Subscription

#### Get Subscription Plans

```http
GET /subscription/plans
```

Response:

```json
{
  "data": [
    {
      "id": "free",
      "name": "Free",
      "price": 0,
      "interval": "month",
      "description": "Basic access to trending local spots",
      "features": [
        "View trending recommendations",
        "Basic map view",
        "Save up to 5 places",
        "Limited filtering options"
      ],
      "is_popular": false
    },
    {
      "id": "premium",
      "name": "Premium",
      "price": 5,
      "interval": "month",
      "description": "Enhanced experience with personalized recommendations",
      "features": [
        "All Free features",
        "Personalized vibe matching",
        "Advanced filtering options",
        "No advertisements",
        "Unlimited saved places",
        "Priority updates for new features"
      ],
      "is_popular": true
    }
  ]
}
```

#### Get Current Subscription

```http
GET /subscription/current
```

Response:

```json
{
  "plan_id": "premium",
  "status": "active",
  "current_period_start": "2023-08-01T00:00:00Z",
  "current_period_end": "2023-09-01T00:00:00Z",
  "cancel_at_period_end": false
}
```

#### Create Subscription

```http
POST /subscription
Content-Type: application/json

{
  "plan_id": "premium",
  "payment_method_id": "pm_123456789"
}
```

Response:

```json
{
  "success": true,
  "subscription": {
    "plan_id": "premium",
    "status": "active",
    "current_period_start": "2023-08-01T00:00:00Z",
    "current_period_end": "2023-09-01T00:00:00Z",
    "cancel_at_period_end": false
  }
}
```

#### Cancel Subscription

```http
POST /subscription/cancel
```

Response:

```json
{
  "success": true,
  "message": "Subscription will be canceled at the end of the current billing period",
  "subscription": {
    "plan_id": "premium",
    "status": "active",
    "current_period_start": "2023-08-01T00:00:00Z",
    "current_period_end": "2023-09-01T00:00:00Z",
    "cancel_at_period_end": true
  }
}
```

## Error Handling

All API errors follow a standard format:

```json
{
  "success": false,
  "error": {
    "code": "invalid_credentials",
    "message": "Invalid email or password"
  }
}
```

Common error codes:

| Code | Description |
|------|-------------|
| unauthorized | Authentication required or token invalid |
| forbidden | User does not have permission to access the resource |
| not_found | Resource not found |
| validation_error | Invalid request parameters |
| internal_error | Server error |

## Rate Limiting

API requests are rate-limited to 100 requests per minute per user. When the rate limit is exceeded, the API will return a 429 Too Many Requests response with a Retry-After header indicating when to retry.

## Webhooks

VibeFinder provides webhooks for real-time notifications of events. To set up a webhook, contact support.

Available webhook events:

- `recommendation.created` - New recommendation created
- `user.subscription.updated` - User subscription status changed
- `user.preferences.updated` - User preferences updated

## External API Integrations

VibeFinder integrates with the following external APIs:

### EnsembleData API

Used for scraping social media content from TikTok and Instagram.

- Base URL: `https://ensembledata.com`
- Authentication: API key in request header
- Key endpoints:
  - `/apis/tt/hashtag_search` - Search TikTok by hashtag
  - `/apis/ig/hashtag_search` - Search Instagram by hashtag
  - `/apis/tt/location_search` - Search TikTok by location
  - `/apis/ig/location_search` - Search Instagram by location

### SocialKit Video Analysis API

Used for analyzing video content to extract summaries, keywords, and sentiment.

- Base URL: `https://www.socialkit.dev`
- Authentication: API key in request header
- Key endpoints:
  - `/video/summary` - Get video summary
  - `/video/transcript` - Get video transcript
  - `/video/analytics` - Get video analytics

### OpenAI API

Used for natural language processing to categorize venues by vibe and generate recommendation descriptions.

- Base URL: `https://api.openai.com/v1`
- Authentication: API key in request header
- Key endpoints:
  - `/chat/completions` - Generate text completions

### Google Maps API

Used for geocoding and location-based services.

- Base URL: `https://maps.googleapis.com/maps/api`
- Authentication: API key in query parameter
- Key endpoints:
  - `/geocode/json` - Convert addresses to coordinates
  - `/place/details/json` - Get place details
  - `/place/nearbysearch/json` - Search for places nearby

## Changelog

### v1.0.0 (2023-08-01)
- Initial API release

### v1.1.0 (2023-09-01)
- Added support for filtering by multiple vibes and categories
- Improved recommendation algorithm
- Added pagination to all list endpoints

