
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  altText: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, altText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main image */}
        <div 
          className="rounded-lg overflow-hidden h-[300px] md:h-[400px] cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <img 
            src={images[0]} 
            alt={`${altText} - imagem principal`} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Side images grid */}
        <div className="grid grid-cols-2 gap-4">
          {images.slice(1, 5).map((image, index) => (
            <div 
              key={index} 
              className="rounded-lg overflow-hidden h-[140px] md:h-[190px] cursor-pointer"
              onClick={() => {
                setCurrentIndex(index + 1);
                setShowModal(true);
              }}
            >
              <img 
                src={image} 
                alt={`${altText} - imagem ${index + 2}`} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for fullscreen view */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <X size={24} />
          </button>
          
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 focus:outline-none"
            onClick={prevSlide}
          >
            <ChevronLeft size={24} />
          </button>
          
          <img 
            src={images[currentIndex]} 
            alt={`${altText} - imagem em tela cheia`} 
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-70 focus:outline-none"
            onClick={nextSlide}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
