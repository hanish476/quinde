import React, { useState, useEffect } from 'react';

const ScrollZoomOutPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate zoom-out factor based on scroll position
  const getZoomLevel = (sectionTop, sectionHeight) => {
    const scrollPos = scrollY - sectionTop;
    if (scrollPos < 0) return 1;  // No zoom before section
    if (scrollPos > sectionHeight) return 1;  // Max zoom-out after section
    
    // Zoom out as user scrolls through section (range: 1 to 0.8)
    const progress = Math.min(scrollPos / sectionHeight, 1);
    return 1 - (progress * 0.7);
  };

  return (
    <div className="overflow-x-hidden bg-gradient-to-tr from-amber-500 to-orange-600">
      {/* First Section - Zooms out when scrolling through it */}
      <section 
        className="h-screen flex items-center justify-center  text-white"
        style={{
          transform: `scale(${getZoomLevel(0, window.innerHeight)})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="text-center p-8 bg-black bg-opacity-20 rounded-xl backdrop-blur-sm max-w-4xl w-full">
          <h1 className="text-5xl font-bold mb-4">Zoom-Out Section 1</h1>
          <p className="text-xl">Watch the content shrink as you scroll</p>
        </div>
      </section>

      {/* Free space between sections */}
      <div className="h-[50vh] bg-gradient-to-b from-amber-500/20 to-emerald-500/20"></div>

      {/* Second Section - Zooms out when scrolling through it */}
      <section 
        className="h-screen flex items-center justify-center bg-gradient-to-tr from-emerald-500 to-cyan-600 text-white"
        style={{
          transform: `scale(${getZoomLevel(window.innerHeight * 1.5, window.innerHeight)})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="text-center p-8 bg-black bg-opacity-20 rounded-xl backdrop-blur-sm max-w-4xl w-full">
          <h1 className="text-5xl font-bold mb-4">Zoom-Out Section 2</h1>
          <p className="text-xl">This section shrinks as you scroll down</p>
        </div>
      </section>

      {/* Free space after second section */}
      <div className="h-[50vh] bg-gradient-to-b from-emerald-500/20 to-gray-100"></div>

      {/* Additional content to enable scrolling */}
      <section className="h-screen flex items-center justify-center bg-gray-100 text-gray-800">
        <div className="text-center p-8 max-w-4xl w-full">
          <h2 className="text-3xl font-bold mb-4">Normal Scale</h2>
          <p className="text-lg">Scroll back up to see zoom-out effects again</p>
        </div>
      </section>
    </div>
  );
};

export default ScrollZoomOutPage;