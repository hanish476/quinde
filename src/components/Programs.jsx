import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ProgramsSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- Colors ---
  const bgColor = "#eeeee4"; // Cream background
  const fgColor = "#572a01"; // Brown foreground (text, progress)
  const badgeBgColorStart = "#c8b8a8"; // Badge bg color at start
  const badgeBgColorEnd = "#d4c9b8"; // Badge bg color at end

  // --- Program Data ---
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

  // --- Scroll Animations ---
  const programCount = programs.length;

  // Calculate scroll ranges for each program's fade in/out
  const programRanges = programs.map((_, index) => {
    const start = index / programCount;
    const end = (index + 1) / programCount;
    // [startFadeIn, fullOpacity, startFadeOut]
    return [start, (start + end) / 2, end];
  });

  // Create opacity transforms for each program
  const programOpacities = programs.map((_, index) =>
    useTransform(scrollYProgress, programRanges[index], [0, 1, 0])
  );

  // Text color transform (brown to cream)
  // Text is brown for the first half, then fades to cream
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [fgColor, fgColor, bgColor]
  );

  // Badge background color transform (fixes the .get() issue)
  // Badges change color in the second half of the scroll
  const badgeBgColor = useTransform(
    scrollYProgress,
    [0.5, 1],
    [badgeBgColorStart, badgeBgColorEnd]
  );

  // --- Progress Bar Animations ---

  // Height of the progress fill line
  const progressBarHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // An array of background color transforms for each bullet
  const bulletBgColors = programRanges.map(range =>
    useTransform(
      scrollYProgress,
      // [startFadeIn, fullOpacity]
      [range[0], range[1]],
      [bgColor, fgColor],
      { clamp: true }
    )
  );

  // An array of border color transforms for each bullet
  const bulletBorderColors = programRanges.map(range =>
    useTransform(
      scrollYProgress,
      [range[0], range[1]],
      [fgColor, bgColor],
      { clamp: true }
    )
  );

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor: bgColor }}
      // Add z-index to stack correctly with other sections
      className="h-[500vh] w-full relative z-20"
    >
      <motion.div className="relative w-full ">

      </motion.div>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.p
        className="absolute top-3/6 text-brrown/10 text-9xl font-bold left-[10%] rotate-90">Programs </motion.p>
        <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center z-10 pointer-events-none">
          <div className="w-11/12 md:w-8/12 max-w-4xl p-8 relative h-full">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                style={{ opacity: programOpacities[index] }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
              >
                {/* Program Title */}
                <motion.h3
                  className="text-3xl md:text-4xl font-bold mb-4"
                  style={{ color: textColor }}
                >
                  {program.title}
                </motion.h3>

                {/* Date & Time Badges */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <motion.span
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: badgeBgColor,
                      color: fgColor // Badge text is always brown
                    }}
                  >
                    {program.date}
                  </motion.span>
                  <motion.span
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: badgeBgColor,
                      color: fgColor // Badge text is always brown
                    }}
                  >
                    {program.time}
                  </motion.span>
                </div>

                {/* Program Description */}
                <motion.p
                  className="text-lg md:text-xl mb-6"
                  style={{ color: textColor }}
                >
                  {program.description}
                </motion.p>

                {/* Program Details */}
                <motion.p
                  className="text-base md:text-lg"
                  style={{ color: textColor }}
                >
                  {program.details}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Side Progress Bar --- 
            Changed from 'fixed' to 'absolute' to be contained by the sticky parent.
            Increased z-index to appear above content if needed.
        */}
        <div className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-20 h-64">
          <div className="relative h-full flex flex-col justify-between items-center">
            {/* Background Track */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-black/10 rounded-full" />

            {/* Progress Fill */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full rounded-full"
              style={{
                height: progressBarHeight,
                backgroundColor: fgColor
              }}
            />

            {/* Bullets */}
            {programs.map((_, index) => (
              <motion.div
                key={index}
                className="w-5 h-5 rounded-full border-2 z-10"
                style={{
                  backgroundColor: bulletBgColors[index],
                  borderColor: bulletBorderColors[index]
                }}
              />
            ))}
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default ProgramsSection;