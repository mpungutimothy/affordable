/*
  # Insert Sample Property Data

  This migration adds sample properties based on the project requirements:
  1. Crane Heights (Mbuya)
  2. Stork Elegance (Naalya)
  3. Swan Paradise (Nsasa)
  4. Pelican Heights (Nakwero)
  5. Heron Gardens (Kira)
  6. Eagle Nest (Mbuya)

  All properties include:
  - Complete property details (bedrooms, bathrooms, price)
  - Featured images from Pexels
  - Full descriptions
  - Amenities
  - Proper status flags
*/

-- Insert properties
INSERT INTO properties (
  slug,
  name,
  location,
  price,
  bedrooms,
  bathrooms,
  property_type,
  status,
  description,
  featured,
  featured_image,
  images,
  amenities,
  mortgage_eligible,
  sort_order
) VALUES
(
  'crane-heights-mbuya',
  'Crane Heights',
  'Mbuya, Kampala',
  88000000,
  3,
  2,
  'Apartment',
  'Hot Offer',
  'Experience luxury living at Crane Heights, nestled in the prestigious Mbuya neighborhood. This stunning 3-bedroom apartment offers modern finishes, spacious rooms, and breathtaking views of Kampala. Perfect for families seeking comfort and convenience in one of the city''s most sought-after locations.

Features include:
- Spacious open-plan living and dining area
- Modern fully-fitted kitchen
- Master bedroom with en-suite bathroom
- Two additional bedrooms
- Guest bathroom
- Ample parking space
- 24/7 security

Located near top schools, shopping centers, and major transport routes, Crane Heights offers the perfect blend of urban convenience and residential tranquility.',
  true,
  'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
  '["https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg", "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg", "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg"]'::jsonb,
  '["Swimming Pool", "Gym", "24/7 Security", "Parking", "Backup Generator", "Water Tank", "Children Play Area", "Landscaped Gardens"]'::jsonb,
  false,
  1
),
(
  'stork-elegance-naalya',
  'Stork Elegance',
  'Naalya, Kampala',
  120000000,
  4,
  3,
  'Villa',
  'For Sale',
  'Stork Elegance presents an exceptional 4-bedroom villa in the serene Naalya suburb. This property embodies sophistication with its contemporary design and premium finishes throughout. Ideal for discerning buyers seeking a harmonious blend of elegance and functionality.

Property Highlights:
- 4 spacious bedrooms (master en-suite)
- 3 modern bathrooms
- Large living room with fireplace
- Separate dining area
- Modern kitchen with island
- Study/home office
- Servant quarters
- Large compound with tropical gardens
- Double garage

Naalya offers excellent infrastructure, proximity to Namugongo Road, and easy access to schools, hospitals, and shopping facilities.',
  true,
  'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
  '["https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg", "https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg", "https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg"]'::jsonb,
  '["Swimming Pool", "Gym", "24/7 Security", "Parking", "Backup Generator", "Water Tank", "Study Room", "Servant Quarters", "Garden", "CCTV"]'::jsonb,
  true,
  2
),
(
  'swan-paradise-nsasa',
  'Swan Paradise',
  'Nsasa, Kampala',
  95000000,
  3,
  2,
  'Apartment',
  'For Sale',
  'Welcome to Swan Paradise, your gateway to affordable luxury in the rapidly developing Nsasa area. This 3-bedroom apartment combines modern design with practical living spaces, making it perfect for young families and professionals.

Key Features:
- 3 well-proportioned bedrooms
- 2 contemporary bathrooms (master en-suite)
- Open-plan living and dining
- Fitted kitchen with appliances
- Balcony with scenic views
- Designated parking bay
- Round-the-clock security

Nsasa benefits from excellent road networks, proximity to Kira Road, and easy access to the Northern Bypass. The area is experiencing rapid development with new schools, shopping centers, and healthcare facilities.',
  true,
  'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
  '["https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg", "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg"]'::jsonb,
  '["24/7 Security", "Parking", "Backup Generator", "Water Tank", "CCTV", "Balcony"]'::jsonb,
  false,
  3
),
(
  'pelican-heights-nakwero',
  'Pelican Heights',
  'Nakwero, Kampala',
  105000000,
  3,
  3,
  'Townhouse',
  'Hot Offer',
  'Pelican Heights offers modern townhouse living in the peaceful Nakwero neighborhood. This 3-bedroom property features contemporary architecture and thoughtful design, perfect for families who value both style and substance.

Property Details:
- 3 generous bedrooms (all en-suite)
- Guest powder room
- Spacious living area
- Modern kitchen with pantry
- Private patio/garden
- Parking for 2 vehicles
- Communal swimming pool
- Secure gated community

Located in a well-established residential area with excellent schools, shopping facilities, and healthcare services nearby. Nakwero offers the perfect balance of suburban tranquility and urban accessibility.',
  true,
  'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
  '["https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg", "https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg"]'::jsonb,
  '["Swimming Pool", "24/7 Security", "Parking", "Backup Generator", "Gated Community", "Garden", "CCTV"]'::jsonb,
  false,
  4
),
(
  'heron-gardens-kira',
  'Heron Gardens',
  'Kira, Kampala',
  98000000,
  3,
  2,
  'Apartment',
  'For Sale',
  'Heron Gardens presents an affordable yet luxurious living option in the vibrant Kira municipality. This 3-bedroom apartment is designed for modern living with emphasis on space, light, and functionality.

Apartment Features:
- 3 bedrooms (master with walk-in closet)
- 2 bathrooms (master en-suite)
- Large living/dining area
- Fitted kitchen
- Laundry area
- Balcony
- Secure parking
- 24-hour security

Kira is one of Kampala''s fastest-growing suburbs, offering excellent value for money with improving infrastructure, good schools, and convenient access to the city center via Kira Road.',
  true,
  'https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg',
  '["https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg", "https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg"]'::jsonb,
  '["24/7 Security", "Parking", "Backup Generator", "Water Tank", "Balcony", "CCTV"]'::jsonb,
  false,
  5
),
(
  'eagle-nest-mbuya',
  'Eagle Nest',
  'Mbuya, Kampala',
  150000000,
  5,
  4,
  'Villa',
  'For Sale',
  'Eagle Nest represents the pinnacle of luxury living in Mbuya. This exquisite 5-bedroom villa offers unparalleled comfort, style, and space for families who demand the very best.

Villa Specifications:
- 5 spacious bedrooms (3 en-suite)
- 4 modern bathrooms
- Grand living room
- Formal dining room
- Family room/entertainment area
- Gourmet kitchen with island
- Study/home office
- Servant quarters with separate entrance
- Landscaped gardens
- Swimming pool
- Triple garage
- Generator house

Located in prime Mbuya with stunning views, this property offers the ultimate in prestigious living. Close to international schools, embassies, and premium shopping facilities.',
  true,
  'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg',
  '["https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg", "https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg", "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg"]'::jsonb,
  '["Swimming Pool", "Gym", "24/7 Security", "Parking", "Backup Generator", "Water Tank", "Study Room", "Servant Quarters", "Garden", "CCTV", "Fireplace", "Jacuzzi"]'::jsonb,
  true,
  6
)
ON CONFLICT (slug) DO NOTHING;
