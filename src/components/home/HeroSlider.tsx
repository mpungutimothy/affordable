import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Property } from '../../lib/supabase';
import { Link } from 'react-router-dom';

const HeroSlider = ({ properties }: { properties: Property[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (properties.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % properties.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [properties.length]);

  if (properties.length === 0) {
    return (
      <div className="h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading properties...</p>
        </div>
      </div>
    );
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % properties.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + properties.length) % properties.length
    );
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {properties.map((property, index) => (
        <div
          key={property.id}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${property.featured_image || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>

          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <div className="inline-block px-4 py-2 bg-[#FFD700]/20 backdrop-blur-sm rounded-full border border-[#FFD700]/30 mb-4">
                  <span className="text-[#FFD700] text-sm font-semibold">
                    {property.status}
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-serif text-white mb-4 leading-tight">
                  {property.name}
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 mb-6">
                  {property.location}
                </p>

                <p className="text-lg text-gray-400 mb-8 line-clamp-3">
                  {property.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                    <div className="text-sm text-gray-400">Price</div>
                    <div className="text-xl font-bold text-[#FFD700]">
                      UGX {(property.price / 1_000_000).toFixed(0)}M
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                    <div className="text-sm text-gray-400">Bedrooms</div>
                    <div className="text-xl font-bold text-white">
                      {property.bedrooms}
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                    <div className="text-sm text-gray-400">Bathrooms</div>
                    <div className="text-xl font-bold text-white">
                      {property.bathrooms}
                    </div>
                  </div>
                </div>

                <Link
                  to={`/property/${property.slug}`}
                  className="inline-block px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#50C878] text-[#0a0a0a] font-semibold rounded-lg hover:shadow-2xl hover:shadow-[#FFD700]/30 transition-all hover:scale-105"
                >
                  View Property Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/3 md:top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
      >
        <ChevronLeft size={20} className="md:w-6 md:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/3 md:top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
      >
        <ChevronRight size={20} className="md:w-6 md:h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-[#FFD700] w-8'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
