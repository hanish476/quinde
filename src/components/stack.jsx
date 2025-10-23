import React, { useState, useEffect } from 'react';

const StackingScrollPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate overlay position for second section
  const getOverlayPosition = () => {
    const scrollProgress = Math.min(scrollY / window.innerHeight, 1);
    return {
      transform: `translateY(${-scrollProgress * 100}%)`,
      opacity: Math.min(1, scrollProgress * 2)  // Fade in gradually
    };
  };

  return (
    <div className="overflow-x-hidden">
      {/* First Section - Fixed position */}
      <section 
        className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 text-white fixed top-0 z-0"
      >
        <div className="text-center p-8 bg-black bg-opacity-30 rounded-xl backdrop-blur-sm">
          <h1 className="text-5xl font-bold mb-4">Base Section</h1>
          <p className="text-xl max-w-2xl">Scroll down to see the next section stack on top</p>
        </div>
      </section>

      {/* Second Section - Overlays first section on scroll */}
      <section 
        className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-rose-600 to-pink-800 text-white relative z-10"
        style={getOverlayPosition()}
      >
        <div className="text-center p-8 bg-black bg-opacity-30 rounded-xl backdrop-blur-sm">
          <h1 className="text-5xl font-bold mb-4">Stacking Section</h1>
          <p className="text-xl max-w-2xl">This section moves on top as you scroll</p>
        </div>
      </section>

      {/* Dummy content to enable scrolling */}
      <section className="h-screen flex items-center justify-center bg-gray-100 text-gray-800 mt-screen">
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold mb-4">End Content</h2>
          <p className="text-lg">Scroll back up to see the stacking effect again</p>
        </div>
      </section>
    </div>
  );
};

export default StackingScrollPage;