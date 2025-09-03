import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

/**
 * Create a Supabase client with the provided URL and anon key
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * Get the current user from Supabase auth
 */
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Error getting current user:', error);
    throw error;
  }
  
  return user;
};

/**
 * Sign up a new user with email and password
 */
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) {
    console.error('Error signing up:', error);
    throw error;
  }
  
  return data;
};

/**
 * Sign in a user with email and password
 */
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    console.error('Error signing in:', error);
    throw error;
  }
  
  return data;
};

/**
 * Sign in a user with a third-party provider
 */
export const signInWithProvider = async (provider: 'google' | 'apple') => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  
  if (error) {
    console.error(`Error signing in with ${provider}:`, error);
    throw error;
  }
  
  return data;
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Reset password for a user
 */
export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });
  
  if (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
  
  return data;
};

/**
 * Update user password
 */
export const updatePassword = async (password: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });
  
  if (error) {
    console.error('Error updating password:', error);
    throw error;
  }
  
  return data;
};

/**
 * Update user profile
 */
export const updateProfile = async (profile: { name?: string; avatar_url?: string }) => {
  const { data, error } = await supabase.auth.updateUser({
    data: profile,
  });
  
  if (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
  
  return data;
};

/**
 * Get user profile from the database
 */
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
  
  return data;
};

/**
 * Update user preferences
 */
export const updateUserPreferences = async (userId: string, preferences: any) => {
  const { data, error } = await supabase
    .from('user_preferences')
    .upsert({
      user_id: userId,
      ...preferences,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error updating user preferences:', error);
    throw error;
  }
  
  return data;
};

/**
 * Get recommendations with filters
 */
export const getRecommendations = async (filters: any = {}, page = 1, pageSize = 10) => {
  let query = supabase
    .from('recommendations')
    .select('*', { count: 'exact' });
  
  // Apply filters
  if (filters.vibes && filters.vibes.length > 0) {
    query = query.contains('vibe_tags', filters.vibes);
  }
  
  if (filters.categories && filters.categories.length > 0) {
    query = query.in('category', filters.categories);
  }
  
  if (filters.price_level && filters.price_level.length > 0) {
    query = query.in('price_level', filters.price_level);
  }
  
  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,venue_name.ilike.%${filters.search}%`);
  }
  
  // Apply sorting
  if (filters.sort_by === 'trending') {
    query = query.order('trend_score', { ascending: false });
  } else if (filters.sort_by === 'rating') {
    query = query.order('rating', { ascending: false });
  }
  
  // Apply pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);
  
  const { data, error, count } = await query;
  
  if (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
  
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

/**
 * Get a recommendation by ID
 */
export const getRecommendationById = async (id: string) => {
  const { data, error } = await supabase
    .from('recommendations')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error getting recommendation:', error);
    throw error;
  }
  
  return data;
};

/**
 * Save a recommendation for a user
 */
export const saveRecommendation = async (userId: string, recommendationId: string) => {
  const { data, error } = await supabase
    .from('user_saved_recommendations')
    .insert({
      user_id: userId,
      recommendation_id: recommendationId
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error saving recommendation:', error);
    throw error;
  }
  
  return data;
};

/**
 * Unsave a recommendation for a user
 */
export const unsaveRecommendation = async (userId: string, recommendationId: string) => {
  const { error } = await supabase
    .from('user_saved_recommendations')
    .delete()
    .match({
      user_id: userId,
      recommendation_id: recommendationId
    });
  
  if (error) {
    console.error('Error unsaving recommendation:', error);
    throw error;
  }
  
  return true;
};

/**
 * Get saved recommendations for a user
 */
export const getSavedRecommendations = async (userId: string, page = 1, pageSize = 10) => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  
  const { data, error, count } = await supabase
    .from('user_saved_recommendations')
    .select('recommendation_id, recommendations(*)', { count: 'exact' })
    .eq('user_id', userId)
    .range(from, to);
  
  if (error) {
    console.error('Error getting saved recommendations:', error);
    throw error;
  }
  
  return {
    data: data.map(item => item.recommendations),
    pagination: {
      current_page: page,
      total_pages: Math.ceil((count || 0) / pageSize),
      total_items: count || 0,
      items_per_page: pageSize
    }
  };
};

/**
 * Check if a recommendation is saved by a user
 */
export const isRecommendationSaved = async (userId: string, recommendationId: string) => {
  const { data, error } = await supabase
    .from('user_saved_recommendations')
    .select('*')
    .match({
      user_id: userId,
      recommendation_id: recommendationId
    })
    .single();
  
  if (error && error.code !== 'PGRST116') { // PGRST116 is the error code for "no rows returned"
    console.error('Error checking if recommendation is saved:', error);
    throw error;
  }
  
  return !!data;
};

/**
 * Get subscription plans
 */
export const getSubscriptionPlans = async () => {
  const { data, error } = await supabase
    .from('subscription_plans')
    .select('*')
    .order('price', { ascending: true });
  
  if (error) {
    console.error('Error getting subscription plans:', error);
    throw error;
  }
  
  return data;
};

/**
 * Get current subscription for a user
 */
export const getCurrentSubscription = async (userId: string) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  
  if (error && error.code !== 'PGRST116') { // PGRST116 is the error code for "no rows returned"
    console.error('Error getting current subscription:', error);
    throw error;
  }
  
  return data;
};

