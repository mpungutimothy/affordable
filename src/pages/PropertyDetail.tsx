import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase, Property, Review } from '../lib/supabase';
import { MapPin, Bed, Bath, Home, Calendar, Clock } from 'lucide-react';
import ImageGallery from '../components/property/ImageGallery';
import ScheduleTourForm from '../components/property/ScheduleTourForm';
import MortgageCalculator from '../components/property/MortgageCalculator';
import ReviewSection from '../components/property/ReviewSection';

const PropertyDetail = () => {
  const { slug } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadProperty(slug);
    }
  }, [slug]);

  const loadProperty = async (slug: string) => {
    const { data } = await supabase
      .from('properties')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (data) setProperty(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-[#FFD700] mb-4">
            Property Not Found
          </h1>
          <p className="text-gray-400">
            The property you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const allImages = [
    property.featured_image,
    ...(property.images as string[]),
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">
                {property.name}
              </h1>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-5 h-5 text-[#50C878]" />
                <span className="text-lg">{property.location}</span>
              </div>
            </div>
            <div className="px-4 py-2 bg-[#FFD700]/20 border border-[#FFD700]/30 rounded-full">
              <span className="text-[#FFD700] font-semibold">
                {property.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-xl p-4">
              <div className="text-[#FFD700] text-sm mb-1">Price</div>
              <div className="text-2xl font-bold text-white">
                UGX {(property.price / 1_000_000).toFixed(0)}M
              </div>
            </div>
            <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-xl p-4">
              <Bed className="w-6 h-6 text-[#FFD700] mb-2" />
              <div className="text-xl font-bold text-white">
                {property.bedrooms} Bedrooms
              </div>
            </div>
            <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-xl p-4">
              <Bath className="w-6 h-6 text-[#FFD700] mb-2" />
              <div className="text-xl font-bold text-white">
                {property.bathrooms} Bathrooms
              </div>
            </div>
            <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-xl p-4">
              <Home className="w-6 h-6 text-[#FFD700] mb-2" />
              <div className="text-sm text-gray-400">{property.property_type}</div>
            </div>
          </div>
        </div>

        <ImageGallery images={allImages} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-2xl p-8">
              <h2 className="text-2xl font-serif text-[#FFD700] mb-4">
                Description
              </h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {property.amenities && (property.amenities as string[]).length > 0 && (
              <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-serif text-[#FFD700] mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(property.amenities as string[]).map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-gray-300"
                    >
                      <div className="w-2 h-2 bg-[#50C878] rounded-full" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {property.mortgage_eligible && (
              <MortgageCalculator property={property} />
            )}

            <ReviewSection propertyId={property.id} propertyName={property.name} />
          </div>

          <div className="space-y-6">
            <ScheduleTourForm propertyId={property.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
