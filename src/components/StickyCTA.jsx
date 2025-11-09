// src/components/StickyCTA.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const StickyCTA = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  const shouldHide = location.pathname === "/register";

  useEffect(() => {
    if (shouldHide) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldHide]);

  if (shouldHide || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-18 z-40 w-full px-4 sm:px-6"
        style={{ pointerEvents: "none" }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Shimmer Wrapper */}
          <div className="relative overflow-hidden rounded-xl">
            {/* Shimmer layer (behind content) */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              style={{
                transform: 'translateX(-100%)',
                animation: 'shimmer 2.5s infinite',
              }}
            />
            
            {/* Content */}
            <motion.div
              layout
              className="relative bg-[#7d3d05ef] backdrop-blur-sm shadow-lg p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3"
              style={{ pointerEvents: "auto" }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
                <span className="text-cream font-bold text-lg flex items-center gap-1">
                  <span className="text-yellow-300">🐝</span>
                  <span className="hidden sm:inline">All Kerala</span> Spelling Bee
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 ml-1 text-cream flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
                <span className="text-cream/80 text-xs sm:text-sm whitespace-nowrap">
                  Register by Nov 16, 2025
                </span>
              </div>

              <Link
                to="/register"
                className="hidden sm:flex px-5 py-2.5 bg-brrown text-cream font-semibold rounded-lg hover:bg-brrown/90 transition-all shadow-md hover:shadow-lg active:scale-[0.98] whitespace-nowrap"
              >
                Register Now
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Shimmer Keyframes (inject via style tag) */}
        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default StickyCTA;