import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SpellingBeeResultCTA = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section
      id="resultCta"
      className="relative z-20 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-xl"
      aria-labelledby="result-cta-heading"
    >
      {/* Subtle background — not overpowering */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8a4b07]/5 to-[#6c3602]/5 rounded-3xl blur-sm -z-10"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h4 
         id="result-cta-heading"
          variants={itemVariants}
          className="text-sm md:text-base leading-0 tracking-widest font-bold text-[#572a01] mb-2"
        >All Kerala</motion.h4>
        <motion.h2
          id="result-cta-heading"
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold text-[#572a01] mb-2"
        >
          Spelling Bee 2025
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-[#6d4c41] mb-6 max-w-2xl mx-auto"
        >
          Elimination Round Results Are Out!
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="inline-block"
        >
          <Link
            to="/spelling-bee-results"
            className="group relative inline-flex items-center justify-center px-8 py-3 
                       bg-gradient-to-r from-[#8a4b07] to-[#6c3602] 
                       text-cream font-medium rounded-xl shadow-md 
                       hover:shadow-lg hover:from-[#7a4005] hover:to-[#5c2e01]
                       focus:outline-none focus:ring-2 focus:ring-[#8a4b07]/50 focus:ring-offset-2
                       transition-all duration-300"
            aria-label="View selected candidates for Spelling Bee elimination round"
          >
            <span>Check  Results</span>
            <ArrowRight
              size={18}
              className="ml-2 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-sm text-[#8a4b07]/70"
        >
          Results announced on 30 Nov 2025 • 120 candidates selected
        </motion.p>
      </motion.div>
    </section>
  );
};

export default SpellingBeeResultCTA;