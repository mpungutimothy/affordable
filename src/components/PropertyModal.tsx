import { X, MapPin, Bed, Bath, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Property } from '../lib/supabase';

const PropertyModal = ({
  property,
  onClose,
}: {
  property: Property;
  onClose: () => void;
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0a0a0a] border border-[#FFD700]/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={property.featured_image || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'}
            alt={property.name}
            className="w-full h-72 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#FFD700] hover:text-[#0a0a0a] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-serif text-white mb-2">
                {property.name}
              </h2>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4 text-[#50C878]" />
                <span>{property.location}</span>
              </div>
            </div>
            <div className="px-3 py-1 bg-[#FFD700]/20 border border-[#FFD700]/30 rounded-full text-[#FFD700] text-sm font-semibold">
              {property.status}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-lg p-4">
              <div className="text-[#FFD700] mb-1">Price</div>
              <div className="text-lg font-bold text-white">
                {(property.price / 1_000_000).toFixed(0)}M
              </div>
            </div>
            <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-lg p-4">
              <Bed className="w-5 h-5 text-[#FFD700] mb-1" />
              <div className="text-lg font-bold text-white">
                {property.bedrooms}
              </div>
            </div>
            <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-lg p-4">
              <Bath className="w-5 h-5 text-[#FFD700] mb-1" />
              <div className="text-lg font-bold text-white">
                {property.bathrooms}
              </div>
            </div>
            <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-lg p-4">
              <Home className="w-5 h-5 text-[#FFD700] mb-1" />
              <div className="text-xs text-gray-400">{property.property_type}</div>
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed mb-6 line-clamp-4">
            {property.description}
          </p>

          <Link
            to={`/property/${property.slug}`}
            className="block w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#50C878] text-[#0a0a0a] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#FFD700]/20 transition-all text-center"
          >
            View Full Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
