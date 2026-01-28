import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Property = {
  id: string;
  slug: string;
  name: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  property_type: string;
  status: string;
  description: string;
  featured: boolean;
  featured_image: string;
  images: string[];
  amenities: string[];
  floor_plans: Record<string, unknown>;
  mortgage_eligible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Review = {
  id: string;
  property_id: string;
  email: string;
  rating: number;
  message: string;
  created_at: string;
};

export type TourBooking = {
  tour_type: 'In Person' | 'Video Chat';
  tour_date: string;
  tour_time: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
};

export type SupportTicket = {
  name: string;
  phone: string;
  email: string;
  question: string;
};

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
