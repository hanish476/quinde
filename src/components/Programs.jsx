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

  // Color theme
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
const segmentSize = 1 / programCount;

const programOpacities = programs.map((_, index) => {
  const segmentStart = index * segmentSize;
  const segmentEnd = (index + 1) * segmentSize;
  const center = (segmentStart + segmentEnd) / 2;

  if (index === 0) {
    // First program: start fully visible, fade out after its center
    return useTransform(scrollYProgress, [0, center, segmentEnd], [1, 1, 0]);
  } else if (index === programCount - 1) {
    // Last program: fade in before center, stay visible
    return useTransform(scrollYProgress, [segmentStart, center, 1], [0, 1, 1]);
  } else {
    // Middle programs
    return useTransform(scrollYProgress, [segmentStart, center, segmentEnd], [0, 1, 0]);
  }
});
  // Scale animation (unchanged)
  const contentScale = useTransform(scrollYProgress, [0.8, 0.9, 1], [1, 1, 1]);

  // Timeline progress for bottom bar
  const timelineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // "More" button appears gradually after first program
  const showMoreButton = useTransform(
    scrollYProgress,
    [0.3, 0.33, 0.4],
    [0, 0.3, 1]
  );

  const handleMoreClick = () => {
    navigate('/events');
  };

  // Disable smooth scroll for this container
  useEffect(() => {
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

    return () => {
      const existingStyle = document.getElementById('program-section-smooth-scroll');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  return (
    <motion.div
      id="program-section-container"
      ref={containerRef}
      style={{ backgroundColor: bgColor }}
      className="h-[400vh] w-full relative z-30"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Decorative line - desktop only */}
        <div className="hidden md:block absolute left-12 top-0 bottom-0 w-1" style={{ backgroundColor: accentLight }} />

        {/* Main content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-4xl px-8 md:px-16">

            {programs.map((program, index) => (
              <motion.div
                key={index}
                style={{ opacity: programOpacities[index], scale: contentScale }}
                className="absolute inset-0 flex flex-col justify-center px-8 md:px-24"
              >
                {/* Program number */}
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-5xl font-bold" style={{ color: fgColor }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div style={{ borderBottomColor: accentLight }} className="flex-grow border-b" />
                </div>

                {/* Title */}
                <h2
                  className="text-6xl md:text-6xl font-medium mb-6 tracking-tight"
                  style={{ color: fgColor }}
                >
                  {program.title}
                </h2>

                {/* Metadata */}
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
                <p
                  className="text-xl mb-6 leading-relaxed"
                  style={{ color: fgColor }}
                >
                  {program.description}
                </p>

                {/* Details */}
                <p
                  className="text-base leading-relaxed"
                  style={{ color: accentDark }}
                >
                  {program.details}
                </p>
              </motion.div>
            ))}

            {/* More Button */}
            <motion.div
              style={{ opacity: showMoreButton }}
              className="absolute bottom-20 right-8 md:right-24 z-30"
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

        {/* Bottom progress bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-11/12 md:w-80">
          <div className="relative flex items-center justify-between">
            <div
              className="absolute left-0 right-0 h-1"
              style={{ backgroundColor: accentLight }}
            />
            <motion.div
              className="absolute left-0 h-1"
              style={{
                width: timelineProgress,
                backgroundColor: fgColor,
              }}
            />
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

        {/* Top title */}
        <motion.div
          className="absolute top-20 left-5 md:left-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold tracking-widest uppercase" style={{ color: fgColor }}>
            Key Events
          </h1>
          <div className="mt-2 w-12 h-0.5" style={{ backgroundColor: fgColor }} />
        </motion.div>

        {/* Background logo */}
        <div
          className="absolute top-0 right-0 md:w-5/12 h-full opacity-5 md:opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url('/logo.svg')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center right',
            backgroundSize: 'contain',
          }}
        />
        <div
          className="h-full w-2/4 absolute top-0 right-0 bg-gradient-to-l from-brrown opacity-15 blur-2xl md:opacity-20 pointer-events-none"
          style={{ 
            // Note: corrected "bg-linear-to-l" → actual gradient handled via Tailwind or inline
            background: 'linear-gradient(to left, #572a01, transparent)'
          }}
        />
      </div>
    </motion.div>
  );
};

export default ProgramsSection;