// components/Events.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Events = () => {
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

  const events = [
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
    },
    {
      title: "Alumni Meet",
      date: "March 16, 2025",
      time: "11:00 AM",
      description: "Reconnect with fellow alumni and share memories from your time at Nahjurashad.",
      details: "An exclusive gathering for past students to network, share experiences, and contribute to the future of our institution."
    },
    {
      title: "Sports Tournament",
      date: "March 16, 2025",
      time: "2:00 PM",
      description: "Compete in various sports events representing your departments and win exciting prizes.",
      details: "A full day of sports activities including football, basketball, volleyball, and traditional games with professional referees and awards ceremony."
    },
    {
      title: "Closing Ceremony",
      date: "March 16, 2025",
      time: "6:00 PM",
      description: "Join us for the grand finale of our 15th anniversary celebration.",
      details: "The closing ceremony will feature award presentations, cultural performances, and a memorable fireworks display to conclude our celebration."
    }
  ];

  const eventCount = events.length;

  // Scroll-based opacity for each event
  const eventRanges = events.map((_, index) => {
    const start = index / eventCount;
    const end = (index + 1) / eventCount;
    return [start, (start + end) / 2, end];
  });

  const eventOpacities = events.map((_, index) =>
    useTransform(scrollYProgress, eventRanges[index], [0, 1, 0])
  );

  // Scale animation for featured content
  const contentScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Timeline progress
  const timelineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor: bgColor }}
      className="h-[600vh] w-full relative z-30"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden pt-20">
        {/* Decorative background line - desktop only */}
        <div className="hidden md:block absolute left-12 top-0 bottom-0 w-1" style={{ backgroundColor: accentLight }} />

        {/* Main content container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-4xl px-8 md:px-16">

            {/* Events content - stacked and animated */}
            {events.map((event, index) => (
              <motion.div
                key={index}
                style={{ opacity: eventOpacities[index], scale: contentScale }}
                className="absolute inset-0 flex flex-col justify-center px-8 md:px-24"
              >
                {/* Event number indicator */}
                <motion.div
                  className="flex items-baseline gap-4 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span
                    className="text-6xl font-light"
                    style={{ color: accentLight }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div style={{ borderBottomColor: accentLight }} className="flex-grow border-b" />
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="text-4xl md:text-5xl font-light mb-6 tracking-tight"
                  style={{ color: fgColor }}
                >
                  {event.title}
                </motion.h2>

                {/* Metadata badges */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <span style={{ color: accentLight }} className="text-sm font-medium uppercase tracking-wider">Date</span>
                    <span style={{ color: fgColor }} className="text-lg">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span style={{ color: accentLight }} className="text-sm font-medium uppercase tracking-wider">Time</span>
                    <span style={{ color: fgColor }} className="text-lg">{event.time}</span>
                  </div>
                </div>

                {/* Description */}
                <motion.p
                  className="text-xl mb-6 leading-relaxed"
                  style={{ color: fgColor }}
                >
                  {event.description}
                </motion.p>

                {/* Details */}
                <motion.p
                  className="text-base leading-relaxed"
                  style={{ color: accentDark }}
                >
                  {event.details}
                </motion.p>
              </motion.div>
            ))}
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
            {events.map((_, index) => (
              <motion.div
                key={index}
                className="w-5 h-5 rounded-full border-2 relative z-10"
                style={{
                  backgroundColor: index < Math.ceil(scrollYProgress.get() * eventCount) ? fgColor : bgColor,
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
      </div>
    </motion.div>
  );
};

export default Events;