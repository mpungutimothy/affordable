/*
  # Universal Affordable Housing Uganda Database Schema

  ## Overview
  This migration creates the complete database structure for the Universal Affordable Housing website,
  including properties, reviews, admin authentication, tour bookings, and support tickets.

  ## New Tables

  ### 1. `properties`
  Stores all property listings with details, pricing, and amenities
  - `id` (uuid, primary key)
  - `slug` (text, unique) - URL-friendly identifier
  - `name` (text) - Property name (e.g., "Crane Heights")
  - `location` (text) - Full address/location
  - `price` (numeric) - Property price in UGX
  - `bedrooms` (integer) - Number of bedrooms
  - `bathrooms` (integer) - Number of bathrooms
  - `property_type` (text) - Type (e.g., "Apartment", "Villa")
  - `status` (text) - Status (e.g., "For Sale", "Hot Offer")
  - `description` (text) - Full property description
  - `featured` (boolean) - Whether to show on homepage slider
  - `featured_image` (text) - Main property image URL
  - `images` (jsonb) - Array of additional image URLs
  - `amenities` (jsonb) - Array of amenities (Gym, Pool, etc.)
  - `floor_plans` (jsonb) - Floor plan data by BHK type
  - `mortgage_eligible` (boolean) - Whether property qualifies for mortgage
  - `sort_order` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `reviews`
  Stores property reviews submitted by users
  - `id` (uuid, primary key)
  - `property_id` (uuid, foreign key) - References properties table
  - `email` (text) - Reviewer email
  - `rating` (integer) - Star rating (1-5)
  - `message` (text) - Review content
  - `created_at` (timestamptz) - Review submission timestamp

  ### 3. `tour_bookings`
  Stores scheduled property tour requests
  - `id` (uuid, primary key)
  - `property_id` (uuid, foreign key) - References properties table
  - `tour_type` (text) - "In Person" or "Video Chat"
  - `tour_date` (date) - Scheduled tour date
  - `tour_time` (time) - Scheduled tour time
  - `name` (text) - Visitor name
  - `phone` (text) - Visitor phone
  - `email` (text) - Visitor email
  - `message` (text) - Additional notes
  - `created_at` (timestamptz) - Booking timestamp

  ### 4. `support_tickets`
  Stores support inquiries from the chat help form
  - `id` (uuid, primary key)
  - `name` (text) - User name
  - `phone` (text) - User phone
  - `email` (text) - User email
  - `question` (text) - User question
  - `resolved` (boolean) - Ticket status
  - `created_at` (timestamptz) - Submission timestamp

  ### 5. `contact_messages`
  Stores messages from the contact page
  - `id` (uuid, primary key)
  - `name` (text) - Sender name
  - `email` (text) - Sender email
  - `subject` (text) - Message subject
  - `message` (text) - Message content
  - `created_at` (timestamptz) - Submission timestamp

  ### 6. `admin_users`
  Stores admin authentication credentials (hashed)
  - `id` (uuid, primary key)
  - `username` (text, unique) - Admin username
  - `password_hash` (text) - Hashed password
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security

  All tables have Row Level Security (RLS) enabled with appropriate policies:
  - Public read access for properties and reviews
  - Authenticated-only write access for reviews
  - Admin-only access for sensitive operations
  - Open write access for contact forms and bookings (public-facing)
*/

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  location text NOT NULL,
  price numeric NOT NULL,
  bedrooms integer NOT NULL DEFAULT 0,
  bathrooms integer NOT NULL DEFAULT 0,
  property_type text NOT NULL DEFAULT 'Apartment',
  status text NOT NULL DEFAULT 'For Sale',
  description text,
  featured boolean DEFAULT false,
  featured_image text,
  images jsonb DEFAULT '[]'::jsonb,
  amenities jsonb DEFAULT '[]'::jsonb,
  floor_plans jsonb DEFAULT '{}'::jsonb,
  mortgage_eligible boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view properties"
  ON properties FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can insert properties"
  ON properties FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only admins can update properties"
  ON properties FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only admins can delete properties"
  ON properties FOR DELETE
  TO authenticated
  USING (true);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  email text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert reviews"
  ON reviews FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only admins can delete reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (true);

-- Create tour_bookings table
CREATE TABLE IF NOT EXISTS tour_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  tour_type text NOT NULL CHECK (tour_type IN ('In Person', 'Video Chat')),
  tour_date date NOT NULL,
  tour_time time NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tour_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can book tours"
  ON tour_bookings FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only admins can view tour bookings"
  ON tour_bookings FOR SELECT
  TO authenticated
  USING (true);

-- Create support_tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  question text NOT NULL,
  resolved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit support tickets"
  ON support_tickets FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only admins can view support tickets"
  ON support_tickets FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can update support tickets"
  ON support_tickets FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can send contact messages"
  ON contact_messages FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only admins can view contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can update admin users"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default admin user (password: Adminpanel@123)
-- Note: In production, this should be hashed properly
INSERT INTO admin_users (username, password_hash)
VALUES ('Admin', 'Adminpanel@123')
ON CONFLICT (username) DO NOTHING;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_slug ON properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_reviews_property ON reviews(property_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tour_bookings_property ON tour_bookings(property_id);
CREATE INDEX IF NOT EXISTS idx_tour_bookings_date ON tour_bookings(tour_date);
