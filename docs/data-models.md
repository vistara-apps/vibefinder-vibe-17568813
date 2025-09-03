# VibeFinder Data Models

This document provides detailed information about the data models used in the VibeFinder application, including their structure, relationships, and usage.

## Core Entities

### User

The User entity represents a registered user of the VibeFinder application.

| Field | Type | Description |
|-------|------|-------------|
| userId | string | Unique identifier for the user |
| email | string | User's email address (unique) |
| name | string | User's display name |
| avatar_url | string | URL to the user's profile picture |
| preferences | UserPreferences | User's preference settings |
| saved_locations | string[] | Array of saved recommendation IDs |
| onboarding_complete | boolean | Whether the user has completed onboarding |
| created_at | string | Timestamp of user creation (ISO format) |
| updated_at | string | Timestamp of last update (ISO format) |
| subscription_tier | string | User's subscription tier ('free' or 'premium') |
| subscription_status | string | Status of subscription (null, 'active', 'canceled', 'past_due') |
| subscription_expires | string | Expiration date of subscription (ISO format) |

### UserPreferences

The UserPreferences entity represents a user's preference settings for personalized recommendations.

| Field | Type | Description |
|-------|------|-------------|
| vibes | string[] | Array of preferred vibes/atmospheres |
| categories | string[] | Array of preferred venue categories |
| max_distance | number | Maximum distance in kilometers |
| price_range | [number, number] | Min and max price range (1-4) |
| favorite_locations | GeoLocation[] | Array of favorite locations |
| connected_social_accounts | object | Connected social media accounts |

### Recommendation

The Recommendation entity represents a venue recommendation generated from social media content.

| Field | Type | Description |
|-------|------|-------------|
| recommendationId | string | Unique identifier for the recommendation |
| title | string | Catchy title for the recommendation |
| description | string | Detailed description of the venue |
| venue_name | string | Name of the venue |
| location | GeoLocation | Geographic location of the venue |
| social_media_url | string | URL to the source social media post |
| trend_score | number | Score indicating how trending the venue is (0-100) |
| vibe_tags | string[] | Array of vibe/atmosphere tags |
| image_url | string | URL to the main image |
| video_url | string | URL to the video preview (optional) |
| timestamp | string | Timestamp of the recommendation (ISO format) |
| price_level | number | Price level (1-4) |
| hours | BusinessHours | Operating hours of the venue (optional) |
| user_ratings | UserRating[] | Array of user ratings (optional) |
| category | string | Primary category of the venue |
| created_at | string | Timestamp of creation (ISO format) |
| updated_at | string | Timestamp of last update (ISO format) |

### Venue

The Venue entity represents a physical location or establishment.

| Field | Type | Description |
|-------|------|-------------|
| venueId | string | Unique identifier for the venue |
| name | string | Name of the venue |
| address | string | Street address of the venue |
| latitude | number | Latitude coordinate |
| longitude | number | Longitude coordinate |
| categories | string[] | Array of venue categories |
| description | string | Description of the venue (optional) |
| website | string | Website URL (optional) |
| phone | string | Contact phone number (optional) |
| price_level | number | Price level (1-4) (optional) |
| hours | BusinessHours | Operating hours (optional) |
| photos | string[] | Array of photo URLs (optional) |
| rating | number | Average rating (0-5) (optional) |
| created_at | string | Timestamp of creation (ISO format) |
| updated_at | string | Timestamp of last update (ISO format) |

## Supporting Types

### GeoLocation

The GeoLocation type represents a geographic location with coordinates and address information.

| Field | Type | Description |
|-------|------|-------------|
| latitude | number | Latitude coordinate |
| longitude | number | Longitude coordinate |
| address | string | Full address (optional) |
| city | string | City name (optional) |
| state | string | State or province (optional) |
| country | string | Country name (optional) |
| postal_code | string | Postal or ZIP code (optional) |

### BusinessHours

The BusinessHours type represents the operating hours of a venue for each day of the week.

| Field | Type | Description |
|-------|------|-------------|
| monday | DayHours | Hours for Monday |
| tuesday | DayHours | Hours for Tuesday |
| wednesday | DayHours | Hours for Wednesday |
| thursday | DayHours | Hours for Thursday |
| friday | DayHours | Hours for Friday |
| saturday | DayHours | Hours for Saturday |
| sunday | DayHours | Hours for Sunday |

### DayHours

The DayHours type represents the opening and closing hours for a specific day.

| Field | Type | Description |
|-------|------|-------------|
| open | string | Opening time (24-hour format, e.g., "09:00") |
| close | string | Closing time (24-hour format, e.g., "17:00") |
| is_closed | boolean | Whether the venue is closed on this day |

### UserRating

The UserRating type represents a user's rating and review of a venue.

| Field | Type | Description |
|-------|------|-------------|
| userId | string | ID of the user who submitted the rating |
| rating | number | Rating value (1-5 stars) |
| comment | string | Review comment (optional) |
| timestamp | string | Timestamp of the rating (ISO format) |

### SocialMediaContent

The SocialMediaContent type represents content from social media platforms.

| Field | Type | Description |
|-------|------|-------------|
| platform | string | Social media platform ('instagram' or 'tiktok') |
| url | string | URL to the content |
| content_type | string | Type of content ('video' or 'image') |
| caption | string | Caption or description (optional) |
| hashtags | string[] | Array of hashtags (optional) |
| engagement | object | Engagement metrics (likes, comments, shares) |
| timestamp | string | Timestamp of the content (ISO format) |
| location | GeoLocation | Location information (optional) |
| author | object | Author information (username, profile_url) |

### VideoAnalysisResult

The VideoAnalysisResult type represents the result of analyzing a video for content and sentiment.

| Field | Type | Description |
|-------|------|-------------|
| summary | string | Summary of the video content |
| keywords | string[] | Array of keywords extracted from the video |
| sentiment | string | Overall sentiment ('positive', 'neutral', 'negative') |
| detected_vibes | string[] | Array of vibes detected in the video |
| crowd_density | string | Crowd density level (optional) |
| noise_level | string | Noise level (optional) |
| detected_activities | string[] | Array of activities detected (optional) |
| confidence_score | number | Confidence score of the analysis (0-1) |

### Subscription

The Subscription type represents a user's subscription plan.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier for the subscription |
| user_id | string | ID of the user |
| plan_id | string | ID of the subscription plan |
| status | string | Status of the subscription |
| current_period_start | string | Start date of current period (ISO format) |
| current_period_end | string | End date of current period (ISO format) |
| cancel_at_period_end | boolean | Whether the subscription will cancel at period end |
| created_at | string | Timestamp of creation (ISO format) |
| updated_at | string | Timestamp of last update (ISO format) |
| stripe_subscription_id | string | Stripe subscription ID (optional) |
| stripe_customer_id | string | Stripe customer ID (optional) |

### SubscriptionPlan

The SubscriptionPlan type represents a subscription plan offered by the application.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier for the plan |
| name | string | Name of the plan |
| description | string | Description of the plan |
| price | number | Price of the plan |
| interval | string | Billing interval ('month' or 'year') |
| features | string[] | Array of features included in the plan |
| is_popular | boolean | Whether the plan is marked as popular |
| created_at | string | Timestamp of creation (ISO format) |
| updated_at | string | Timestamp of last update (ISO format) |
| stripe_price_id | string | Stripe price ID (optional) |
| stripe_product_id | string | Stripe product ID (optional) |

### Notification

The Notification type represents a notification sent to a user.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier for the notification |
| user_id | string | ID of the user |
| type | string | Type of notification |
| title | string | Title of the notification |
| message | string | Message content |
| read | boolean | Whether the notification has been read |
| created_at | string | Timestamp of creation (ISO format) |
| action_url | string | URL to navigate to when clicked (optional) |
| recommendation_id | string | ID of the related recommendation (optional) |

## Database Schema

The database schema is implemented in Supabase with the following tables:

### users

Stores user account information and preferences.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{"vibes": [], "categories": [], "max_distance": 10}',
  saved_locations TEXT[] DEFAULT '{}',
  onboarding_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subscription_tier TEXT DEFAULT 'free',
  subscription_status TEXT,
  subscription_expires TIMESTAMP WITH TIME ZONE
);
```

### user_preferences

Stores detailed user preferences for recommendations.

```sql
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  vibes TEXT[] DEFAULT '{}',
  categories TEXT[] DEFAULT '{}',
  max_distance INTEGER DEFAULT 10,
  price_range INTEGER[] DEFAULT '{1, 4}',
  favorite_locations JSONB DEFAULT '[]',
  connected_social_accounts JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### recommendations

Stores venue recommendations generated from social media content.

```sql
CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  venue_name TEXT NOT NULL,
  location JSONB NOT NULL,
  social_media_url TEXT NOT NULL,
  trend_score INTEGER NOT NULL,
  vibe_tags TEXT[] NOT NULL,
  image_url TEXT NOT NULL,
  video_url TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  price_level INTEGER,
  hours JSONB,
  user_ratings JSONB DEFAULT '[]',
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### venues

Stores information about physical venues.

```sql
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  categories TEXT[] NOT NULL,
  description TEXT,
  website TEXT,
  phone TEXT,
  price_level INTEGER,
  hours JSONB,
  photos TEXT[],
  rating NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### user_saved_recommendations

Stores the relationship between users and their saved recommendations.

```sql
CREATE TABLE user_saved_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recommendation_id UUID REFERENCES recommendations(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, recommendation_id)
);
```

### user_ratings

Stores user ratings and reviews for recommendations.

```sql
CREATE TABLE user_ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recommendation_id UUID REFERENCES recommendations(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, recommendation_id)
);
```

### notifications

Stores notifications sent to users.

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  action_url TEXT,
  recommendation_id UUID REFERENCES recommendations(id) ON DELETE SET NULL
);
```

### subscriptions

Stores user subscription information.

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT
);
```

### subscription_plans

Stores information about available subscription plans.

```sql
CREATE TABLE subscription_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  interval TEXT NOT NULL,
  features TEXT[] NOT NULL,
  is_popular BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  stripe_price_id TEXT,
  stripe_product_id TEXT
);
```

## Entity Relationships

- A **User** can have many **Saved Recommendations** (one-to-many)
- A **User** can have one **Subscription** (one-to-one)
- A **User** can have one set of **User Preferences** (one-to-one)
- A **User** can have many **Notifications** (one-to-many)
- A **User** can have many **User Ratings** (one-to-many)
- A **Recommendation** can be saved by many **Users** (many-to-many through user_saved_recommendations)
- A **Recommendation** can have many **User Ratings** (one-to-many)
- A **Recommendation** is associated with one **Venue** (many-to-one)
- A **Subscription** is associated with one **Subscription Plan** (many-to-one)

## Data Flow

1. **Social Media Content Collection**:
   - EnsembleData API scrapes TikTok and Instagram for trending content
   - Content is filtered by location and relevance

2. **Video Analysis**:
   - SocialKit API analyzes video content to extract information
   - OpenAI processes text data to categorize venues and generate descriptions

3. **Recommendation Generation**:
   - System combines social media content, video analysis, and venue information
   - Trend scores are calculated based on engagement metrics and recency
   - Recommendations are stored in the database

4. **Personalization**:
   - User preferences are compared with recommendation attributes
   - Personalized recommendations are generated based on vibe matching
   - User behavior (saves, views) further refines the personalization algorithm

5. **User Interaction**:
   - Users view, save, and rate recommendations
   - User feedback is used to improve future recommendations
   - Notifications are sent for new relevant recommendations

## Data Retention and Privacy

- User data is retained as long as the account is active
- Deleted accounts have their personal data removed within 30 days
- Social media content is processed but not stored permanently
- Location data is used only for recommendation purposes
- User preferences are stored securely and not shared with third parties

## Data Backup and Recovery

- Database is backed up daily
- Point-in-time recovery is available for up to 30 days
- Disaster recovery plan includes geographic redundancy

## Data Validation

- Email addresses must be valid and unique
- Passwords must meet minimum security requirements
- Geographic coordinates must be valid (latitude: -90 to 90, longitude: -180 to 180)
- Ratings must be between 1 and 5
- Trend scores must be between 0 and 100
- Price levels must be between 1 and 4

