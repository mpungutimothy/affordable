import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Eye, Heart, Scale } from 'lucide-react';
import { Property } from '../lib/supabase';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

type PropertyCardProps = {
  property: Property;
  viewMode: 'grid' | 'list';
  onPreview: () => void;
};

const PropertyCard = ({ property, viewMode, onPreview }: PropertyCardProps) => {
  const { favorites, toggleFavorite, compareList, toggleCompare } = useApp();
  const isFavorite = favorites.includes(property.id);
  const isComparing = compareList.includes(property.id);
  const [imgError, setImgError] = useState(false);

  const fallbackImage = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg';
  const imageSrc = imgError ? fallbackImage : (property.featured_image || fallbackImage);

  if (viewMode === 'list') {
    return (
      <div className="group bg-[#0a0a0a] border border-[#FFD700]/20 rounded-xl overflow-hidden hover:border-[#FFD700]/50 transition-all flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-64 h-48 flex-shrink-0 overflow-hidden">
          <img
            src={imageSrc}
            alt={property.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {property.status === 'Hot Offer' && (
            <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white rounded text-xs font-bold">
              HOT
            </div>
          )}
        </div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <Link
              to={`/property/${property.slug}`}
              className="text-2xl font-serif text-white mb-2 hover:text-[#FFD700] transition-colors inline-block"
            >
              {property.name}
            </Link>

            <div className="flex items-center space-x-2 text-gray-400 mb-3">
              <MapPin className="w-4 h-4 text-[#50C878]" />
              <span className="text-sm">{property.location}</span>
            </div>

            <p className="text-gray-400 text-sm line-clamp-2 mb-4">
              {property.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-[#FFD700]">
              UGX {(property.price / 1_000_000).toFixed(0)}M
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-gray-400">
                <Bed className="w-4 h-4" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-400">
                <Bath className="w-4 h-4" />
                <span>{property.bathrooms}</span>
              </div>

              <button
                onClick={onPreview}
                className="p-2 bg-[#1a1a1a] rounded-lg text-[#FFD700] hover:bg-[#FFD700]/10 transition-colors"
                title="Quick Preview"
              >
                <Eye size={18} />
              </button>
              <button
                onClick={() => toggleFavorite(property.id)}
                className={`p-2 bg-[#1a1a1a] rounded-lg transition-colors ${
                  isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                }`}
                title="Add to Favorites"
              >
                <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={() => toggleCompare(property.id)}
                className={`p-2 bg-[#1a1a1a] rounded-lg transition-colors ${
                  isComparing ? 'text-[#50C878]' : 'text-gray-400 hover:text-[#50C878]'
                }`}
                title="Add to Compare"
              >
                <Scale size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-[#0a0a0a] border border-[#FFD700]/20 rounded-xl overflow-hidden hover:border-[#FFD700]/50 transition-all hover:shadow-xl hover:shadow-[#FFD700]/10">
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageSrc}
          alt={property.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {property.status === 'Hot Offer' && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white rounded text-xs font-bold">
            HOT
          </div>
        )}

        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onPreview}
            className="p-2 bg-black/70 backdrop-blur-sm rounded-lg text-[#FFD700] hover:bg-[#FFD700] hover:text-[#0a0a0a] transition-colors"
            title="Quick Preview"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => toggleFavorite(property.id)}
            className={`p-2 bg-black/70 backdrop-blur-sm rounded-lg transition-colors ${
              isFavorite
                ? 'text-red-500'
                : 'text-white hover:text-red-500'
            }`}
            title="Add to Favorites"
          >
            <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => toggleCompare(property.id)}
            className={`p-2 bg-black/70 backdrop-blur-sm rounded-lg transition-colors ${
              isComparing
                ? 'text-[#50C878]'
                : 'text-white hover:text-[#50C878]'
            }`}
            title="Add to Compare"
          >
            <Scale size={16} />
          </button>
        </div>
      </div>

      <div className="p-5">
        <Link
          to={`/property/${property.slug}`}
          className="text-xl font-serif text-white mb-2 hover:text-[#FFD700] transition-colors inline-block"
        >
          {property.name}
        </Link>

        <div className="flex items-center space-x-2 text-gray-400 mb-4">
          <MapPin className="w-4 h-4 text-[#50C878]" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-[#FFD700]">
            UGX {(property.price / 1_000_000).toFixed(0)}M
          </div>

          <div className="flex items-center space-x-3 text-gray-400">
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
      </div>
    </div>
  );
};

export default PropertyCard;
