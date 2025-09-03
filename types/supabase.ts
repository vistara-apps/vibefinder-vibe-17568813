export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          id: string
          message: string
          read: boolean
          recommendation_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          id?: string
          message: string
          read?: boolean
          recommendation_id?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          recommendation_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_recommendation_id_fkey"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "recommendations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      recommendations: {
        Row: {
          category: string
          created_at: string
          description: string
          hours: Json | null
          id: string
          image_url: string
          location: Json
          price_level: number | null
          social_media_url: string
          timestamp: string
          title: string
          trend_score: number
          updated_at: string
          user_ratings: Json | null
          venue_name: string
          vibe_tags: string[]
          video_url: string | null
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          hours?: Json | null
          id?: string
          image_url: string
          location: Json
          price_level?: number | null
          social_media_url: string
          timestamp?: string
          title: string
          trend_score: number
          updated_at?: string
          user_ratings?: Json | null
          venue_name: string
          vibe_tags: string[]
          video_url?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          hours?: Json | null
          id?: string
          image_url?: string
          location?: Json
          price_level?: number | null
          social_media_url?: string
          timestamp?: string
          title?: string
          trend_score?: number
          updated_at?: string
          user_ratings?: Json | null
          venue_name?: string
          vibe_tags?: string[]
          video_url?: string | null
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          created_at: string
          description: string
          features: string[]
          id: string
          interval: string
          is_popular: boolean
          name: string
          price: number
          stripe_price_id: string | null
          stripe_product_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          features: string[]
          id: string
          interval: string
          is_popular?: boolean
          name: string
          price: number
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          features?: string[]
          id?: string
          interval?: string
          is_popular?: boolean
          name?: string
          price?: number
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string
          current_period_start: string
          id: string
          plan_id: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end: string
          current_period_start: string
          id?: string
          plan_id: string
          status: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string
          current_period_start?: string
          id?: string
          plan_id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_preferences: {
        Row: {
          categories: string[]
          connected_social_accounts: Json | null
          created_at: string
          favorite_locations: Json | null
          id: string
          max_distance: number
          price_range: number[] | null
          updated_at: string
          user_id: string
          vibes: string[]
        }
        Insert: {
          categories?: string[]
          connected_social_accounts?: Json | null
          created_at?: string
          favorite_locations?: Json | null
          id?: string
          max_distance?: number
          price_range?: number[] | null
          updated_at?: string
          user_id: string
          vibes?: string[]
        }
        Update: {
          categories?: string[]
          connected_social_accounts?: Json | null
          created_at?: string
          favorite_locations?: Json | null
          id?: string
          max_distance?: number
          price_range?: number[] | null
          updated_at?: string
          user_id?: string
          vibes?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_ratings: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          rating: number
          recommendation_id: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          recommendation_id: string
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          recommendation_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_ratings_recommendation_id_fkey"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "recommendations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_saved_recommendations: {
        Row: {
          created_at: string
          id: string
          recommendation_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          recommendation_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          recommendation_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_saved_recommendations_recommendation_id_fkey"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "recommendations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_saved_recommendations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          name: string | null
          onboarding_complete: boolean
          preferences: Json
          saved_locations: string[]
          subscription_expires: string | null
          subscription_status: string | null
          subscription_tier: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id: string
          name?: string | null
          onboarding_complete?: boolean
          preferences?: Json
          saved_locations?: string[]
          subscription_expires?: string | null
          subscription_status?: string | null
          subscription_tier?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          onboarding_complete?: boolean
          preferences?: Json
          saved_locations?: string[]
          subscription_expires?: string | null
          subscription_status?: string | null
          subscription_tier?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      venues: {
        Row: {
          address: string
          categories: string[]
          created_at: string
          description: string | null
          hours: Json | null
          id: string
          latitude: number
          longitude: number
          name: string
          phone: string | null
          photos: string[] | null
          price_level: number | null
          rating: number | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address: string
          categories: string[]
          created_at?: string
          description?: string | null
          hours?: Json | null
          id?: string
          latitude: number
          longitude: number
          name: string
          phone?: string | null
          photos?: string[] | null
          price_level?: number | null
          rating?: number | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string
          categories?: string[]
          created_at?: string
          description?: string | null
          hours?: Json | null
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          phone?: string | null
          photos?: string[] | null
          price_level?: number | null
          rating?: number | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

