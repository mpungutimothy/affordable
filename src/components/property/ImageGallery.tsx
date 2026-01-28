import { useState } from 'react';

const ImageGallery = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const fallbackImage = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg';

  if (images.length === 0) {
    return (
      <div className="w-full h-96 bg-[#1a1a1a] border border-[#FFD700]/20 rounded-2xl flex items-center justify-center">
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  const handleImageError = (index: number) => {
    setImgErrors(prev => ({ ...prev, [index]: true }));
  };

  const getImageSrc = (index: number) => {
    return imgErrors[index] ? fallbackImage : (images[index] || fallbackImage);
  };

  return (
    <div className="space-y-4">
      <div className="relative h-96 md:h-[32rem] overflow-hidden rounded-2xl border border-[#FFD700]/20">
        <img
          src={getImageSrc(selectedImage)}
          alt="Property"
          onError={() => handleImageError(selectedImage)}
          className="w-full h-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative h-24 overflow-hidden rounded-lg border-2 transition-all ${
                index === selectedImage
                  ? 'border-[#FFD700] shadow-lg shadow-[#FFD700]/20'
                  : 'border-[#FFD700]/20 hover:border-[#FFD700]/50'
              }`}
            >
              <img
                src={getImageSrc(index)}
                alt={`Thumbnail ${index + 1}`}
                onError={() => handleImageError(index)}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
