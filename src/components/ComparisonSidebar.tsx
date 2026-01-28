import { X, Bed, Bath, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Property } from '../lib/supabase';
import { Link } from 'react-router-dom';

const ComparisonSidebar = ({ properties }: { properties: Property[] }) => {
  const { compareList, toggleCompare, clearCompare } = useApp();

  const compareProperties = properties.filter((p) =>
    compareList.includes(p.id)
  );

  if (compareProperties.length === 0) return null;

  return (
    <div className="fixed right-0 top-24 bottom-0 w-80 md:w-96 bg-[#0a0a0a] border-l border-[#FFD700]/30 shadow-2xl z-30 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-white">
            Compare ({compareProperties.length})
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearCompare}
              className="text-gray-400 hover:text-red-500 transition-colors text-sm"
            >
              Clear
            </button>
            <button
              onClick={clearCompare}
              className="text-gray-400 hover:text-white transition-colors"
              title="Close comparison"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {compareProperties.length < 2 && (
          <div className="mb-4 p-3 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-lg text-sm text-gray-300">
            Add at least 2 properties to compare
          </div>
        )}

        <div className="space-y-4 mb-6">
          {compareProperties.map((property) => (
            <div
              key={property.id}
              className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-lg p-4 relative"
            >
              <button
                onClick={() => toggleCompare(property.id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={16} />
              </button>

              <Link
                to={`/property/${property.slug}`}
                className="block hover:opacity-80 transition-opacity"
              >
                <img
                  src={property.featured_image || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'}
                  alt={property.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="text-white font-semibold mb-2 text-sm">
                  {property.name}
                </h4>
                <div className="space-y-1 text-xs text-gray-400">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-1">
                      <DollarSign className="w-3 h-3" />
                      <span>Price</span>
                    </span>
                    <span className="text-[#FFD700] font-semibold">
                      {(property.price / 1_000_000).toFixed(0)}M
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-1">
                      <Bed className="w-3 h-3" />
                      <span>Bedrooms</span>
                    </span>
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-1">
                      <Bath className="w-3 h-3" />
                      <span>Bathrooms</span>
                    </span>
                    <span>{property.bathrooms}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {compareProperties.length >= 2 && (
          <div className="bg-[#1a1a1a] border border-[#FFD700]/20 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3 text-sm">
              Quick Comparison
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <div className="text-gray-400 mb-1">Price Range</div>
                <div className="text-[#FFD700]">
                  {Math.min(...compareProperties.map((p) => p.price / 1_000_000)).toFixed(0)}M -{' '}
                  {Math.max(...compareProperties.map((p) => p.price / 1_000_000)).toFixed(0)}M
                </div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Bedrooms</div>
                <div className="text-white">
                  {Math.min(...compareProperties.map((p) => p.bedrooms))} -{' '}
                  {Math.max(...compareProperties.map((p) => p.bedrooms))}
                </div>
              </div>
              <div>
                <div className="text-gray-400 mb-1">Bathrooms</div>
                <div className="text-white">
                  {Math.min(...compareProperties.map((p) => p.bathrooms))} -{' '}
                  {Math.max(...compareProperties.map((p) => p.bathrooms))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonSidebar;
