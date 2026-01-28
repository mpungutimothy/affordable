import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath } from 'lucide-react';
import { Property } from '../../lib/supabase';

const PropertyLocations = ({ properties }: { properties: Property[] }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[#FFD700] mb-4">
            Affordable Housing Uganda
          </h2>
          <p className="text-xl text-gray-400">
            Homes from as low as 88M
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.slice(0, 6).map((property) => (
            <Link
              key={property.id}
              to={`/property/${property.slug}`}
              className="group relative bg-[#0a0a0a] border border-[#FFD700]/20 rounded-2xl overflow-hidden hover:border-[#FFD700]/50 transition-all hover:shadow-2xl hover:shadow-[#FFD700]/10 hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.featured_image || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'}
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute top-4 right-4 px-3 py-1 bg-[#FFD700] text-[#0a0a0a] rounded-full text-xs font-bold">
                  {property.status}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-[#FFD700] transition-colors">
                  {property.name}
                </h3>

                <div className="flex items-center space-x-2 text-gray-400 mb-4">
                  <MapPin className="w-4 h-4 text-[#50C878]" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-[#FFD700]">
                    UGX {(property.price / 1_000_000).toFixed(0)}M
                  </div>

                  <div className="flex items-center space-x-4 text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Bed className="w-4 h-4" />
                      <span className="text-sm">{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Bath className="w-4 h-4" />
                      <span className="text-sm">{property.bathrooms}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#FFD700]/10">
                  <span className="text-[#50C878] text-sm font-semibold group-hover:underline">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/properties"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#50C878] text-[#0a0a0a] font-semibold rounded-lg hover:shadow-2xl hover:shadow-[#FFD700]/30 transition-all hover:scale-105"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PropertyLocations;
