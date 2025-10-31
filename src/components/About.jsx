// About.jsx (No changes needed)
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgColor = useTransform(scrollYProgress, [0, 1], ["#eeeee4", "#eeeee4"]);
  const textColor = useTransform(scrollYProgress, [0, 1], ["#572a01", "#572a01"]);

  return (
    <motion.div
      ref={containerRef}
      className="h-fit w-full p-4 sm:p-6 md:p-8 lg:p-10 relative z-20 bg-linear-200 from-0% to-60% from-brrown/50"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="flex flex-col  items-center gap-6 max-w-7xl mx-auto m-30 sm:m-5">
        <motion.img
          src="/logo.svg"
          alt="Quindecennial Foundation"
          className="h-40 sm:h-48 md:h-56 lg:h-45 w-auto object-contain"
        />
        <div className="flex-1 text-center ">
          <p className="text-lg  md:text-3xl leading-normal max-w-4xl ">
            For fifteen remarkable years, HISAN — the Students’ Union of Nahjurashad — has stood as a vibrant symbol of student leadership, creativity, and collective progress.
            What began as a humble initiative to strengthen student unity has grown into a dynamic community that nurtures intellect, faith, and social responsibility.
          </p>
        </div>
      </div>
      {/* Decorative corner elements */}
{/* 
      <div className="absolute top-4 md:top-16 left-4 md:left-16 w-16 h-16 rotate-90 ">
        <img src="/round/brl.svg" alt="" />
      </div>
      <div className="absolute top-4 right-4 w-16 h-16 rotate-180 ">
         <img src="/round/brl.svg" alt="" />
      </div>
      <div className="absolute bottom-4 left-4 w-16 h-16 ">
        <img src="/round/brl.svg" alt="" />
      </div>
      <div className="absolute bottom-4 right-4 w-16 h-16">
        <img src="/round/brr.svg" alt="" />
      </div> */}

    </motion.div>
  );
};

export default About;