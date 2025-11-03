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

  // 🔹 Updated Programs List (no date/time)
  const programs = [
    {
      title: "Madh Rav",
      description:
        "An enchanting poetic gathering where eloquence and rhythm intertwine — celebrating classical and contemporary verses of devotion, wisdom, and culture.",
      details:
        "Students showcase their poetic flair through original compositions and classical recitations, reflecting the harmony of intellect and art that defines HISAN’s cultural spirit.",
    },
    {
      title: "Varsity Talent",
      description:
        "A vibrant stage for the young stars of Nahjurashad to express their multifaceted talents across music, arts, and performance.",
      details:
        "From soulful melodies to captivating performances, this platform highlights the creative excellence and enthusiasm of the HISAN community.",
    },
    {
      title: "Spelling Bee",
      description:
        "A thrilling contest of words, wit, and wisdom testing the linguistic prowess and composure of participants under pressure.",
      details:
        "Students compete through rounds of increasing difficulty, showcasing their command over vocabulary, memory, and quick thinking — a hallmark of academic discipline and confidence.",
    },
    {
      title: "Little Muhaddith",
      description:
        "A unique platform nurturing the spirit of hadith learning among young scholars through memorization and articulation.",
      details:
        "Participants deliver narrations with precision and reverence, fostering a deep connection with the prophetic tradition and the values it upholds.",
    },
  ];

  const programCount = programs.length;
  const segmentSize = 1 / programCount;

  const programOpacities = programs.map((_, index) => {
    const segmentStart = index * segmentSize;
    const segmentEnd = (index + 1) * segmentSize;
    const center = (segmentStart + segmentEnd) / 2;

    if (index === 0) {
      return useTransform(scrollYProgress, [0, center, segmentEnd], [1, 1, 0]);
    } else if (index === programCount - 1) {
      return useTransform(scrollYProgress, [segmentStart, center, 1], [0, 1, 1]);
    } else {
      return useTransform(scrollYProgress, [segmentStart, center, segmentEnd], [0, 1, 0]);
    }
  });

  const contentScale = useTransform(scrollYProgress, [0.8, 0.9, 1], [1, 1, 1]);
  const timelineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const showMoreButton = useTransform(scrollYProgress, [0.3, 0.33, 0.4], [0, 0.3, 1]);

  const handleMoreClick = () => navigate("/events");

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "program-section-smooth-scroll";
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
      const existingStyle = document.getElementById("program-section-smooth-scroll");
      if (existingStyle) document.head.removeChild(existingStyle);
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
        <div
          className="hidden md:block absolute left-12 top-0 bottom-0 w-1"
          style={{ backgroundColor: accentLight }}
        />

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
                  className="text-5xl md:text-6xl font-medium mb-6 tracking-tight"
                  style={{ color: fgColor }}
                >
                  {program.title}
                </h2>

                {/* Description */}
                <p className="text-xl mb-6 leading-relaxed" style={{ color: fgColor }}>
                  {program.description}
                </p>

                {/* Details */}
                <p className="text-base leading-relaxed" style={{ color: accentDark }}>
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
                  backgroundColor:
                    index < Math.ceil(scrollYProgress.get() * programCount)
                      ? fgColor
                      : bgColor,
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
          <h1
            className="text-3xl font-bold tracking-widest uppercase"
            style={{ color: fgColor }}
          >
            Key Programs
          </h1>
          <div className="mt-2 w-12 h-0.5" style={{ backgroundColor: fgColor }} />
        </motion.div>

        {/* Background logo and gradient */}
        <div
          className="absolute top-0 right-0 md:w-5/12 h-full opacity-5 md:opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url('/logo.svg')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center right",
            backgroundSize: "contain",
          }}
        />
        <div
          className="h-full w-2/4 absolute top-0 right-0 bg-gradient-to-l from-brrown opacity-15 blur-2xl md:opacity-20 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #572a01, transparent)",
          }}
        />
      </div>
    </motion.div>
  );
};

export default ProgramsSection;
