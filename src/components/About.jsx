// About.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgColor = useTransform(scrollYProgress, [0, 1], ["#572a01", "#572a01"]);
  const textColor = useTransform(scrollYProgress, [0, 1], ["#eeeee4", "#eeeee4"]);

  return (
    <motion.section
      ref={containerRef}
      className="relative flex justify-center items-center w-full py-16 px-6 sm:px-10 md:px-16 lg:px-20 overflow-hidden"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* Large faint heading in background */}
      <motion.h1
        className="absolute text-[5rem] sm:text-[8rem] md:text-[10rem] font-black opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-cream select-none"
      >
        ABOUT
      </motion.h1>

      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 max-w-7xl mx-auto">
        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left space-y-5">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cream">
            15 Years of Leadership & Legacy
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed font-medium opacity-90">
            For fifteen remarkable years, <span className="font-semibold">HISAN</span> — the Students’ Union of Nahjurashad — has stood as a vibrant symbol of
            student leadership, creativity, and collective progress.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed font-medium opacity-90">
            What began as a humble initiative to strengthen student unity has evolved into
            a dynamic community that nurtures intellect, faith, and social responsibility.
          </p>
        </div>

        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center items-center"
        >
          <img
            src="/logo-cream.svg"
            alt="HISAN Quindecennial Foundation"
            className="h-40 sm:h-48 md:h-56 lg:h-72 xl:h-80 w-auto drop-shadow-lg"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
