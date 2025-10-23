import React, { useState, useEffect } from 'react';

const ScrollZoomPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate zoom factor based on scroll position
  const getZoomLevel = (sectionTop, sectionHeight) => {
    const scrollPos = scrollY - sectionTop;
    if (scrollPos < 0) return 1.5;  // No zoom before section
    if (scrollPos > sectionHeight) return 1;  // No zoom after section
    
    // Zoom in as user scrolls through section (range: 1 to 1.2)
    const progress = Math.min(scrollPos / sectionHeight, 1);
    return 1 + (progress * 0.5);
  };

  return (
    <div className="overflow-x-hidden">
      {/* First Section - Zooms in when scrolling through it */}
      <section 
        className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white"
        style={{
          transform: `scale(${getZoomLevel(0, window.innerHeight)})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="text-center p-8 bg-black bg-opacity-30 rounded-xl backdrop-blur-sm">
          <h1 className="text-5xl font-bold mb-4">First Section</h1>
          <p className="text-xl max-w-2xl">Scroll down to see the zoom effect</p>
        </div>
      </section>

      {/* Second Section - Zooms in when scrolling through it */}
      <section 
        className="h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-teal-600 text-white"
        style={{
          transform: `scale(${getZoomLevel(window.innerHeight, window.innerHeight)})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="text-center p-8 bg-black bg-opacity-30 rounded-xl backdrop-blur-sm">
          <h1 className="text-5xl font-bold mb-4">Second Section</h1>
          <p className="text-xl max-w-2xl">This section also zooms as you scroll through it</p>
        </div>
      </section>

      {/* Additional dummy content to enable scrolling */}
      <section className="h-screen flex items-center justify-center bg-gray-100 text-gray-800">
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold mb-4">More Content</h2>
          <p className="text-lg">Keep scrolling to return to normal view</p>
        </div>
      </section>
    </div>
  );
};

export default ScrollZoomPage;