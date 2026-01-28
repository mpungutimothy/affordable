import { useState, useEffect } from 'react';
import { Grid, List, Eye, Heart, Scale } from 'lucide-react';
import { supabase, Property } from '../lib/supabase';
import { useApp } from '../context/AppContext';
import PropertyModal from '../components/PropertyModal';
import ComparisonSidebar from '../components/ComparisonSidebar';
import PropertyCard from '../components/PropertyCard';

type SortOption = 'default' | 'price-low' | 'price-high' | 'date-old' | 'date-new';
type ViewMode = 'grid' | 'list';

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const { compareList } = useApp();

  useEffect(() => {
    loadProperties();
  }, [sortBy]);

  const loadProperties = async () => {
    setLoading(true);
    let query = supabase.from('properties').select('*');

    switch (sortBy) {
      case 'price-low':
        query = query.order('price', { ascending: true });
        break;
      case 'price-high':
        query = query.order('price', { ascending: false });
        break;
      case 'date-old':
        query = query.order('created_at', { ascending: true });
        break;
      case 'date-new':
        query = query.order('created_at', { ascending: false });
        break;
      default:
        query = query.order('sort_order', { ascending: true });
    }

    const { data } = await query;
    if (data) setProperties(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif text-[#FFD700] mb-4">
            Our Properties
          </h1>
          <p className="text-gray-400">
            Discover your dream home from our collection of premium properties
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <label className="text-gray-300 text-sm">Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 bg-[#1a1a1a] border border-[#FFD700]/20 rounded-lg text-white focus:outline-none focus:border-[#FFD700] transition-colors"
            >
              <option value="default">Default</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="date-old">Date (Old to New)</option>
              <option value="date-new">Date (New to Old)</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#FFD700] text-[#0a0a0a]'
                  : 'bg-[#1a1a1a] text-gray-400 hover:text-[#FFD700]'
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#FFD700] text-[#0a0a0a]'
                  : 'bg-[#1a1a1a] text-gray-400 hover:text-[#FFD700]'
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-6'
            }
          >
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                viewMode={viewMode}
                onPreview={() => setSelectedProperty(property)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {compareList.length > 0 && <ComparisonSidebar properties={properties} />}
    </div>
  );
};

export default Properties;
