// components/ProgramsSection.jsx
import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProgramsSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const navigate = useNavigate();

  // Color theme - maintaining your professional palette
  const bgColor = "#eeeee4";
  const fgColor = "#572a01";
  const accentLight = "#c8b8a8";
  const accentDark = "#3d1a00";

  const programs = [
    {
      title: "Opening Ceremony",
      date: "March 15, 2025",
      time: "10:00 AM",
      description: "Join us for the grand opening of our 15th anniversary celebration with distinguished guests and cultural performances.",
      details: "The opening ceremony will feature speeches from prominent leaders, cultural performances by students, and a historical presentation about HISAN's journey over the past 15 years."
    },
    {
      title: "Academic Symposium",
      date: "March 15, 2025",
      time: "2:00 PM",
      description: "A day of intellectual discourse and academic excellence showcasing student research and innovations.",
      details: "The symposium will include paper presentations, panel discussions, and workshops led by esteemed faculty and industry professionals."
    },
    {
      title: "Cultural Gala",
      date: "March 15, 2025",
      time: "7:00 PM",
      description: "An evening of music, dance, and cultural performances celebrating the rich heritage of Nahjurashad.",
      details: "The gala will feature traditional and contemporary performances, student talent showcases, and special guest artists in a grand celebration of culture."
    }
  ];

  const programCount = programs.length;

  // Scroll-based opacity for each program
  const programRanges = programs.map((_, index) => {
    const start = index / programCount;
    const end = (index + 1) / programCount;
    return [start, (start + end) / 2, end];
  });

  const programOpacities = programs.map((_, index) =>
    useTransform(scrollYProgress, programRanges[index], [0, 1, 0])
  );

  // Scale animation for featured content
  const contentScale = useTransform(scrollYProgress, [0.8, 0.9, 1], [1, 1, 1]);

  // Timeline progress
  const timelineProgress = useTransform(scrollYProgress, [0, 1], ["70%", "100%"]);

  // Calculate when to show the "More" button with gradual appearance
  // Start showing gradually when reaching the second program (index 1)
  const showMoreButton = useTransform(
    scrollYProgress,
    [0.3, 0.33, 0.4], // Start appearing at 30% scroll, fully visible by 40%
    [0, 0.3, 1]       // Start invisible, gradually become fully visible
  );

  const handleMoreClick = () => {
    navigate('/events');
  };

  // Effect to disable smooth scrolling for this component
  useEffect(() => {
    // Add style to disable smooth scrolling for this component
    const style = document.createElement('style');
    style.id = 'program-section-smooth-scroll';
    style.textContent = `
      #program-section-container {
        scroll-behavior: auto !important;
      }
      #program-section-container * {
        scroll-behavior: auto !important;
      }
    `;
    document.head.appendChild(style);

    // Clean up the style when component unmounts
    return () => {
      const existingStyle = document.getElementById('program-section-smooth-scroll');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  return (
    <motion.div
      id="program-section-container" // Add ID for targeting
      ref={containerRef}
      style={{ backgroundColor: bgColor }}
      className="h-[400vh] w-full relative z-30"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Decorative background line - desktop only */}
        <div className="hidden md:block absolute left-12 top-0 bottom-0 w-1" style={{ backgroundColor: accentLight }} />

        {/* Main content container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-4xl px-8 md:px-16">

            {/* Programs content - stacked and animated */}
            {programs.map((program, index) => (
              <motion.div
                key={index}
                style={{ opacity: programOpacities[index], scale: contentScale }}
                className="absolute inset-0 flex flex-col justify-center px-8 md:px-24"
              >
                {/* Program number indicator */}
                <motion.div
                  className="flex items-baseline gap-4 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span
                    className="text-5xl font-bold text-brrown "
                    
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div style={{ borderBottomColor: accentLight }} className="flex-grow border-b" />
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="text-6xl md:text-6xl font-medium mb-6 tracking-tight"
                  style={{ color: fgColor }}
                >
                  {program.title}
                </motion.h2>

                {/* Metadata badges */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <span style={{ color: accentLight }} className="text-sm font-medium uppercase tracking-wider">Date</span>
                    <span style={{ color: fgColor }} className="text-lg">{program.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span style={{ color: accentLight }} className="text-sm font-medium uppercase tracking-wider">Time</span>
                    <span style={{ color: fgColor }} className="text-lg">{program.time}</span>
                  </div>
                </div>

                {/* Description */}
                <motion.p
                  className="text-xl mb-6 leading-relaxed"
                  style={{ color: fgColor }}
                >
                  {program.description}
                </motion.p>

                {/* Details */}
                <motion.p
                  className="text-base leading-relaxed"
                  style={{ color: accentDark }}
                >
                  {program.details}
                </motion.p>
              </motion.div>
            ))}

            {/* More Button - appears gradually as user scrolls */}
            <motion.div
              style={{ opacity: showMoreButton }}
              className="absolute bottom-20 right-8 md:right-24 z-30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={handleMoreClick}
                className="px-6 py-3 bg-brrown text-cream rounded-lg font-medium hover:bg-opacity-80 transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                More Events
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Bottom horizontal progress bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-11/12 md:w-80">
          <div className="relative flex items-center justify-between">
            {/* Background track */}
            <div
              className="absolute left-0 right-0 h-1"
              style={{ backgroundColor: accentLight }}
            />

            {/* Progress fill */}
            <motion.div
              className="absolute left-0 h-1"
              style={{
                width: timelineProgress,
                backgroundColor: fgColor,
              }}
            />

            {/* Bullet points */}
            {programs.map((_, index) => (
              <motion.div
                key={index}
                className="w-5 h-5 rounded-full border-2 relative z-10"
                style={{
                  backgroundColor: index < Math.ceil(scrollYProgress.get() * programCount) ? fgColor : bgColor,
                  borderColor: fgColor,
                }}
              />
            ))}
          </div>
        </div>

        {/* Top section title */}
        <motion.div
          className="absolute top-20 left-5 md:left-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold text-brrown tracking-widest uppercase">
            Events
          </h1>
          <div className="mt-2 w-12 h-0.5" style={{ backgroundColor: fgColor }} />
        </motion.div>

        {/* Background logo on the right */}
        <div
          className="absolute top-0 right-0 w-5/12 h-full opacity-5  md:opacity-20 pointer-events-none"
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
      </div>
    </motion.div>
  );
};

export default ProgramsSection;