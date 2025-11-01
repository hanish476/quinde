// components/Gallery.jsx
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

  // Gallery images data
  const galleryItems = [
    { id: 1, title: "Opening Ceremony", description: "Grand opening of the 15th anniversary celebration" },
    { id: 2, title: "Cultural Performance", description: "Traditional dance performance by students" },
    { id: 3, title: "Academic Symposium", description: "Students presenting their research" },
    { id: 4, title: "Alumni Gathering", description: "Reunion of past students" },
    { id: 5, title: "Sports Tournament", description: "Competitive sports events" },
    { id: 6, title: "Cultural Gala", description: "Evening of music and dance" },
    { id: 7, title: "Award Ceremony", description: "Recognition of outstanding achievements" },
    { id: 8, title: "Closing Ceremony", description: "Grand finale with fireworks" },
    { id: 9, title: "Group Photo", description: "Memorable group picture" },
    { id: 10, title: "Workshop Session", description: "Interactive learning sessions" },
    { id: 11, title: "Cultural Exhibition", description: "Showcasing local heritage" },
    { id: 12, title: "Food Festival", description: "Traditional cuisine from the region" }
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  // Animation for gallery items
  const galleryOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);
  const galleryScale = useTransform(scrollYProgress, [0, 0.3, 1], [0.8, 1, 1]);

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor: bgColor }}
      className="h-[200vh] w-full relative z-30"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden pt-20">
        {/* Top section title */}
        <motion.div
          className="absolute top-20 left-5 md:left-24 z-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold text-brrown tracking-widest uppercase">
            Gallery
          </h1>
          <div className="mt-2 w-12 h-0.5" style={{ backgroundColor: fgColor }} />
        </motion.div>

      <div className="absolute top-1/2 left-1/4 text-brrown text-4xl font-medium">
        <h1>we will update it soon</h1>
      </div>
        {/* Background logo on the right */}
        <div
          className="absolute top-0 right-0 w-5/12 h-full opacity-5 md:opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url('/logo.svg')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center right',
            backgroundSize: 'contain',
          }}
        />
        <div
          className="h-full w-2/4 absolute top-0 right-0 bg-linear-to-l from-brrown opacity-15 blur-2xl md:opacity-20 pointer-events-none"
        />

        {/* Modal for selected image */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white p-8 rounded-lg max-w-2xl max-h-[80vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="w-full h-64 bg-cover bg-center rounded-lg mb-4"
                style={{
                  backgroundImage: `url('/gallery-${selectedImage.id}.jpg')`,
                  backgroundColor: accentLight
                }}
              />
              <h2 className="text-2xl font-bold mb-2" style={{ color: fgColor }}>{selectedImage.title}</h2>
              <p className="text-gray-600">{selectedImage.description}</p>
              <button
                className="mt-4 px-4 py-2 bg-brrown text-cream rounded hover:bg-opacity-80 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Gallery;