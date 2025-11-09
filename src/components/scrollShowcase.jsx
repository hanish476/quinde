// components/ScrollShowcase.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const ScrollShowcase = () => {
  const containerRef = useRef(null);
  const autoScrollRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [autoScrollSpeed, setAutoScrollSpeed] = useState(2); // pixels per 16ms

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fixed cream background color - no longer changing
  const bgColor = "#eeeee4";
  const textColor = useTransform(scrollYProgress, [0, 0, 1], ["#eeeee4", "#572a01", "#572a01"]);

  // SVG filter - inverts based on scroll for better visibility
  const svgFilter = useTransform(scrollYProgress, [0, 1], ["invert(0)", "invert(1)"]);

  // Quindecennial animation: starts visible, scales up, then fades out
  const quindScale = useTransform(scrollYProgress, [0, 0.3, 0.3], [1, 1.4, 1.4]);
  const quindOpacity = useTransform(scrollYProgress, [0.25, 0.4], [1, 0]);

  // Combined text and logo section animation
  // Text appears after Quindecennial fades, scales up, then fades out
  const combinedTextScale = useTransform(scrollYProgress, [1, 2, -3], [0.2, 0.8, 3]);
  const combinedTextOpacity = useTransform(scrollYProgress, [0.4, 0.8, 0.7], [0, 3, 1]);

  // HISAN logo animation: appears after text fades, scales up
  const combinedLogoScale = useTransform(scrollYProgress, [0.7, 0.75, 0.85], [0.8, 0.8, 0.8]);
  const combinedLogoOpacity = useTransform(scrollYProgress, [0.5, 0.7, 1], [0, 1, 1]);

  // Sidebar indicator (MotionValues)
  const indicatorHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const indicatorColor = useTransform(scrollYProgress, [0, 1], ["#572a01", "#eeeee4"]);

  // --- IMPORTANT: Convert the MotionValue to a plain number for rendering ---
  const scrollPercentMv = useTransform(scrollYProgress, (p) => Math.round(p * 100));
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    // subscribe to MotionValue changes and update local state
    const unsubscribe = scrollPercentMv.onChange((v) => {
      // Safety: ensure it's a finite number
      const n = Number.isFinite(v) ? Math.round(v) : 0;
      setScrollPercent(n);
    });

    // initialize immediately (in case there is already a value)
    setScrollPercent(Number.isFinite(scrollPercentMv.get()) ? Math.round(scrollPercentMv.get()) : 0);

    return () => unsubscribe();
  }, [scrollPercentMv]);

  // Function to start auto-scrolling
  const startAutoScroll = useCallback(() => {
    if (isAutoScrolling) return;

    setIsAutoScrolling(true);

    const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;

    autoScrollRef.current = setInterval(() => {
      const currentScrollY = window.scrollY;

      // Check if we've reached the bottom
      if (currentScrollY >= maxScrollY) {
        stopAutoScroll();
        return;
      }

      // Scroll by the speed amount
      window.scrollTo(0, currentScrollY + autoScrollSpeed);
    }, 16); // ~60fps
  }, [isAutoScrolling, autoScrollSpeed]);

  // Function to stop auto-scrolling
  const stopAutoScroll = useCallback(() => {
    setIsAutoScrolling(false);
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }, []);

  // Toggle auto-scroll
  const toggleAutoScroll = () => {
    if (isAutoScrolling) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  };

  // Handle speed change
  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    setAutoScrollSpeed(newSpeed);
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor: bgColor }}
      className="h-[270vh] w-full flex flex-col justify-center items-center overflow-hidden relative"
    >
      {/* ==== Scroll Progress Sidebar (hidden on small screens) ==== */}


      {/* ==== Quindecennial Section ==== */}
      <motion.div
        style={{
          opacity: quindOpacity,
        }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none"
      >


        <div className="w-[100rem]">
          <motion.img
            src="/qm.svg"
            alt="Quindecennial"
            className=" sm:hidden h-[25rem]  mx-auto mt-20 sm:mb-4"
            style={{
              filter: svgFilter,
              opacity: quindOpacity,
              scale: quindScale,
              color: textColor,
            }} />


          <motion.img
            src="/log o quin.svg"
            alt="Quindecennial"
            className="hidden sm:block h-[15rem] sm:h-[25rem] mx-auto mt-30 sm:mb-4"
            style={{
              filter: svgFilter,
              opacity: quindOpacity,
              scale: quindScale,
              color: textColor,
            }}


          />
          {/* ✅ Premium All Kerala Spelling Bee CTA — Scroll-Synced & Shimmering */}
          <motion.div
            style={{
              opacity: quindOpacity,
              scale: quindScale,
              y: useTransform(scrollYProgress, [0.2, 0.35], [20, 0]),
            }}
            className="mt-8 sm:-mt-15"
          >
            {/* Decorative top accent */}
            <div className="relative flex justify-center mb-4">
              <div className="w-16 h-0.5 bg-brrown/30"></div>
              <span className="mx-2 text-cream/60 font-mono text-xs">🐝</span>
              <div className="w-16 h-0.5 bg-brrown/30"></div>
            </div>

            {/* Shimmer CTA Card */}
            <div className="relative max-w-xs sm:max-w-md mx-auto">
              {/* Shimmer Layer (Tailwind v4 — safe & fast) */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cream/15 to-transparent rounded-2xl -z-10
                    translate-x-[-100%] animate-[shimmer_2000ms_infinite]"></div>

              {/* Main CTA Card */}
              <a href="/register" className="block sticky z-50 ">
                <motion.div
                  layout
                  whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(87, 42, 1, 0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  className="relative bg-brrown rounded-2xl overflow-hidden border border-brrown/20
                   shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {/* Subtle diagonal accent stripe (optional but elegant) */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>

                  <div className="p-5 sm:p-6 text-center">
                    {/* Top Tag */}
                    <span className="inline-block px-3 py-1 mb-3 bg-cream/20 text-cream text-xs font-bold rounded-full tracking-wide uppercase">
                      🏆 All Kerala
                    </span>

                    {/* Main Headline */}
                    <h3 className="font-avigea text-2xl sm:text-3xl font-normal text-cream mb-1 tracking-tight">
                      Spelling Bee
                    </h3>

                    {/* Subtitle */}
                    <p className="text-cream/80 text-sm font-mono mb-4">
                      Celebrating Excellence in Language
                    </p>

                    {/* Button-like CTA */}
                 <Link 
                 to="/register">
                     <div className="flex items-center justify-center gap-2 mt-2 group">
                      <span className="font-mono font-semibold text-cream text-lg group-hover:text-yellow-100 transition-colors">
                        Register Now
                      </span>
                      <svg
                        className="w-5 h-5 text-yellow-200 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                 </Link>
                  </div>

                  {/* Subtle inner glow on hover (pseudo-element alternative) */}
                  <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 hover:opacity-100
                        bg-gradient-to-t from-brrown/0 via-brrown/0 to-cream/5 transition-opacity duration-300"></div>
                </motion.div>
              </a>

              {/* Deadline badge */}
              <motion.div
                style={{ opacity: quindOpacity }}
                className="mt-4 flex items-center justify-center gap-2"
              >
                <div className="flex items-center gap-1.5 bg-cream/10 text-cream px-3 py-1.5 rounded-full border border-cream/10">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                  <span className="text-xs font-mono font-medium">
                    Ends Nov 16, 2025
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        {/* <p className="text-3xl md:text-4xl font-medium">Quindecennial Celebration</p> */}
      </motion.div>

      {/* ==== Combined Text and Logo Section (appears after Quindecennial fades) ==== */}
      <motion.div
        className="bg-gradient-to-t from-brrown/40  fixed top-[90%] w-full left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none flex flex-col items-center justify-center gap-6"
      >
        {/* Text appears first, scales up, then fades out */}


        {/* HISAN Logo appears after text fades, scales up */}
        <div className=" opacity-50  w-[50rem] h-55 md:h-10 rounded-b-2xl sm:flex sm:justify-between">
          <div className="hidden sm:block">
            <img src="/logo.svg" alt="" className="h-[20rem] sm:h-[60rem] opacity-20 rotate-90 blur-md" />
          </div>
          <div className="hidden sm:block">
            <img src="/logo.svg" alt="" className="hidden sm:block sm:h-[60rem] opacity-20 blur-md" />
          </div>
          <div className="sm:hidden ">
            <img src="/logo.svg" alt="" className="block sm:hidden mx-auto  h-[70rem] opacity-20 " />
          </div>

        </div>
        <div>
          {/* Foreground HISAN logo */}
          <motion.img
            src="/hisan.svg"
            alt="Hisan Logo"
            style={{
              opacity: combinedLogoOpacity,
              scale: combinedLogoScale,
            }}
            className="relative z-10 h-[23rem] sm:h-[30rem] mb-[50rem] md:mb-[40rem] object-contain"
          />
          <div className="w-10 h-10 bg-black  top-0 left-0 z-20">
            hanish
          </div>
        </div>


        {/* <motion.p
          style={{
            opacity: combinedTextOpacity,
            scale: combinedTextScale,
            color: textColor,
          }}
          className="text-xl md:text-2xl font-light font-mono mb-52"
        >
          <span className="text-6xl  font-bold">HISAN</span> <br /> students union of NRIC

        </motion.p> */}
      </motion.div>
      <div className="sticky flex justify-center bottom-0 w-full h-[70vh] mt-90 md:mt-70 bg-brrown z-10">
        <h1 className=" uppercase text-center text-cream text-4xl lg:text-7xl my-auto font-bold"> 15th <br /> Anniversary <br /> Celebration  </h1>
        <div className="hidden absolute opacity-5 sm:flex gap-6">
          <div className="space-y-1">
            <h1 className=" opacity-10 uppercase text-center text-cream text-2xl lg:text-7xl my-auto font-bold">  Anniversary <br /> Celebration  </h1>
            <h1 className=" opacity-10 uppercase text-center text-cream text-2xl lg:text-7xl my-auto font-bold">  Anniversary <br /> Celebration  </h1>
            <h1 className=" opacity-10 uppercase text-center text-cream text-2xl lg:text-7xl my-auto font-bold">  Anniversary <br /> Celebration  </h1>
            <h1 className=" opacity-10 uppercase text-center text-cream text-2xl lg:text-7xl my-auto font-bold">  Anniversary <br /> Celebration  </h1>
            <h1 className=" opacity-10 uppercase text-center text-cream text-2xl lg:text-7xl my-auto font-bold">  Anniversary <br /> Celebration  </h1>

          </div>
          <div>
            <h1 className=" opacity-10 uppercase text-center text-cream text-2xl lg:text-7xl my-auto font-bold">  Anniversary <br /> Celebration  </h1>
            <h1 className=" opacity-10 uppercase text-center text-cream text-2xl lg:text-7xl my-auto font-bold">  Anniversary <br /> Celebration  </h1>
            <h1 className=" opacity-10 uppercase text-center text-cream text-2xl lg:text-7xl my-auto font-bold">  Anniversary <br /> Celebration  </h1>
            <h1 className=" opacity-10 uppercase text-center text-cream text-2xl lg:text-7xl my-auto font-bold">  Anniversary <br /> Celebration  </h1>
            <h1 className=" opacity-10 uppercase text-center text-cream text-2xl lg:text-7xl my-auto font-bold">  Anniversary <br /> Celebration  </h1>
          </div>
          <div>
            <h1 className=" opacity-10 uppercase text-center text-cream text-2xl lg:text-7xl my-auto font-bold">  Anniversary <br /> Celebration  </h1>
            <h1 className=" opacity-10 uppercase text-center text-cream text-2xl lg:text-7xl my-auto font-bold">  Anniversary <br /> Celebration  </h1>
            <h1 className=" opacity-10 uppercase text-center text-cream text-2xl lg:text-7xl my-auto font-bold">  Anniversary <br /> Celebration  </h1>
            <h1 className=" opacity-10 uppercase text-center text-cream text-2xl lg:text-7xl my-auto font-bold">  Anniversary <br /> Celebration  </h1>
            <h1 className=" opacity-10 uppercase text-center text-cream text-2xl lg:text-7xl my-auto font-bold">  Anniversary <br /> Celebration  </h1>
          </div>
          <div>
            <h1 className=" opacity-10 uppercase text-center text-cream text-2xl lg:text-7xl my-auto font-bold">  Anniversary <br /> Celebration  </h1>
            <h1 className=" opacity-10 uppercase text-center text-cream text-2xl lg:text-7xl my-auto font-bold">  Anniversary <br /> Celebration  </h1>
            <h1 className=" opacity-10 uppercase text-center text-cream text-2xl lg:text-7xl my-auto font-bold">  Anniversary <br /> Celebration  </h1>
            <h1 className=" opacity-10 uppercase text-center text-cream text-2xl lg:text-7xl my-auto font-bold">  Anniversary <br /> Celebration  </h1>
            <h1 className=" opacity-10 uppercase text-center text-cream text-2xl lg:text-7xl my-auto font-bold">  Anniversary <br /> Celebration  </h1>

          </div>
        </div>


      </div>
      {/* Spacer to ensure the section ends before About section starts */}
      <div className="h-[40vh]"></div>
    </motion.div>
  );
};

export default ScrollShowcase;