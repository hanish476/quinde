// About.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgColor = useTransform(scrollYProgress, [1, 1], ["#572a01", "#572a01"]);
  const textColor = useTransform(scrollYProgress, [0, 1], ["#eeeee4", "#eeeee4"]);

  return (
    <motion.div
      ref={containerRef}
      className="bg-brrown h-fit w-full flex justify-center p-2 sm:p-6 md:p-8 lg:p-10 relative z-30"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <h1 className="absolute opacity-10 max-w-full text-cream sm:opacity-20 sm:top-5/12 sm:-left-30 sm:rotate-270 font-black text-8xl sm:text-9xl">
        About
      </h1>
      <div className="py-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 max-w-7xl mx-auto px-4 sm:px-0">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left max-w-4xl">
         
          <p className="text-lg md:text-[1.75rem] leading-normal font-medium opacity-90 lg:pl-40">
            For fifteen remarkable years, HISAN — the Students’ Union of Nahjurashad — has stood as a vibrant symbol of student leadership, creativity, and collective progress.
            What began as a humble initiative to strengthen student unity has grown into a dynamic community that nurtures intellect, faith, and social responsibility.
          </p>
        </div>

        {/* Logo: centered on mobile, right-aligned on large screens */}
        <motion.img
          src="/logo-cream.svg"
          alt="Quindecennial Foundation"
          className="h-44 sm:h-48 md:h-56 lg:h-[400px] w-auto object-contain order-first lg:order-last"
        />
      </div>
    </motion.div>
  );
};

export default About;