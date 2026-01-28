import { useState } from 'react';
import { ChevronLeft, ChevronRight, Bed, Bath } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Property } from '../../lib/supabase';

const FeaturedProperties = ({ properties }: { properties: Property[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const next = () => {
    if (currentIndex + itemsPerPage < properties.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(Math.max(0, currentIndex - itemsPerPage));
    }
  };

  const visibleProperties = properties.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#FFD700] mb-2">
              Featured Properties
            </h2>
            <p className="text-gray-400">
              Explore our handpicked selection of premium homes
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="w-10 h-10 bg-[#1a1a1a] border border-[#FFD700]/20 rounded-lg flex items-center justify-center text-[#FFD700] hover:bg-[#FFD700]/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              disabled={currentIndex + itemsPerPage >= properties.length}
              className="w-10 h-10 bg-[#1a1a1a] border border-[#FFD700]/20 rounded-lg flex items-center justify-center text-[#FFD700] hover:bg-[#FFD700]/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProperties.map((property) => (
            <Link
              key={property.id}
              to={`/property/${property.slug}`}
              className="group relative bg-[#0a0a0a] border border-[#FFD700]/20 rounded-xl overflow-hidden hover:border-[#FFD700]/50 transition-all hover:shadow-lg hover:shadow-[#FFD700]/10"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={property.featured_image || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'}
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {property.status === 'Hot Offer' && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white rounded text-xs font-bold">
                    HOT
                  </div>
                )}

                <div className="absolute bottom-2 right-2 flex space-x-2">
                  <div className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs text-white flex items-center space-x-1">
                    <Bed className="w-3 h-3" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs text-white flex items-center space-x-1">
                    <Bath className="w-3 h-3" />
                    <span>{property.bathrooms}</span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#FFD700] transition-colors truncate">
                  {property.name}
                </h3>
                <p className="text-sm text-gray-400 mb-2 truncate">
                  {property.location}
                </p>
                <div className="text-xl font-bold text-[#FFD700]">
                  UGX {(property.price / 1_000_000).toFixed(0)}M
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
