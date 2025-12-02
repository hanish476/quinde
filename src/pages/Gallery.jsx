// components/Gallery.jsx
import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LazyImage = ({ src, alt, delay = 0, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Trigger image load after delay
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
        {...props}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-500">Image not found</span>
        </div>
      )}
    </div>
  );
};

const Gallery = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Color theme variables
  const bgColor = "#eeeee4";
  const fgColor = "#572a01";
  const accentLight = "#c8b8a8";
  const accentDark = "#3d1a00";

  // Gallery images data - update paths as needed
  const images = [
    '/gallery/1.jpg',
    '/gallery/2.jpg',
    '/gallery/3.jpg',
    '/gallery/4.jpg',
    '/gallery/5.jpg',
    '/gallery/6.jpg',
    '/gallery/7.jpg',
    '/gallery/8.jpg',
    '/gallery/9.jpg',
    '/gallery/10.jpg',
    '/gallery/11.jpg',
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  // Animation for gallery items
  const galleryOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0, 1, 1]);
  const galleryScale = useTransform(scrollYProgress, [0, 0.3, 1], [0.8, 1, 1]);

  const handleImageClick = useCallback((index) => {
    setSelectedImage({ id: index, src: images[index] });
  }, [images]);

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor: bgColor }}
      className="w-full relative z-30 py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#572a01] tracking-widest uppercase">
            Gallery
          </h1>
          <div className="mt-4 w-24 h-1 mx-auto" style={{ backgroundColor: fgColor }} />
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          style={{
            opacity: galleryOpacity,
            scale: galleryScale
          }}
        >
          {images.map((img, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-lg shadow-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "100px" }}
              onClick={() => handleImageClick(index)}
            >
              <div className="aspect-[3/4] w-full overflow-hidden"> {/* A4 aspect ratio (3:4) */}
                <LazyImage
                  src={img}
                  alt={`Gallery item ${index + 1}`}
                  className="transition-opacity duration-300"
                  delay={index * 50} // Sequential delay for each image
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal for selected image */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 text-white rounded-full p-2 hover:bg-opacity-30 transition-all"
                onClick={() => setSelectedImage(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="aspect-[3/4] w-full max-h-[80vh] overflow-hidden rounded-lg">
                <LazyImage
                  src={selectedImage.src}
                  alt={`Gallery item ${selectedImage.id + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Gallery;