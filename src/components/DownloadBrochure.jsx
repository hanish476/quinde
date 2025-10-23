import React from "react";
import { motion } from "framer-motion";

const DownloadBrochure = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="relative z-20 h-[60vh] w-full overflow-hidden bg-gradient-to-br from-[#572a01] to-[#844C37]/10">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#572a01] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-[#844C37] rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center flex items-center "
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#572a01] mb-4">
              Download Event Brochure
            </h2>
            <p className="text-lg md:text-xl text-[#844C37] max-w-2xl mx-auto leading-relaxed">
              Get all the details about our 15th Anniversary Celebration, including programs, schedules, and more.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-[#d4c9b8] max-w-md mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-20 bg-[#572a01]/10 rounded-lg flex items-center justify-center border-2 border-dashed border-[#844C37]/50">
                  <svg className="w-8 h-8 text-[#572a01]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-[#572a01] mb-2">
                Event Brochure 2025
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                PDF • 2.4 MB • 12 pages
              </p>
              
              <motion.a
                href="/path-to-your-brochure.pdf" // Replace with your actual brochure path
                download="quindecennial-celebration-brochure.pdf"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#572a01] text-white font-semibold rounded-lg hover:bg-[#844C37] hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#572a01]/50 focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Brochure
              </motion.a>
            </div>

            <motion.p 
              variants={itemVariants}
              className="text-sm text-[#844C37]/70 mt-4"
            >
              By downloading, you agree to receive updates about the event
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-[#572a01]/20"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-[#572a01]/20"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-[#572a01]/20"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-[#572a01]/20"></div>
    </section>
  );
};

export default DownloadBrochure;