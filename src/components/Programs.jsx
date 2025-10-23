import React from "react";
import { motion } from "framer-motion";

const ProgramDetails = () => {
  // Main programs data
  const mainPrograms = [
    {
      id: 1,
      title: "Main Program 1",
      description: "Detailed description of the main program",
      date: "Date/Time",
      location: "Location",
      icon: "/path-to-icon.svg", // Optional icon
    },
    {
      id: 2,
      title: "Main Program 2", 
      description: "Detailed description of the second main program",
      date: "Date/Time",
      location: "Location",
      icon: "/path-to-icon.svg",
    },
  ];

  // Other programs data
  const otherPrograms = [
    {
      id: 3,
      title: "Program 3",
      description: "Description of other program",
      date: "Date/Time",
      location: "Location",
    },
    {
      id: 4,
      title: "Program 4",
      description: "Description of other program",
      date: "Date/Time", 
      location: "Location",
    },
    {
      id: 5,
      title: "Program 5",
      description: "Description of other program",
      date: "Date/Time",
      location: "Location",
    },
   
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream to-[#f5f5f0] relative z-20">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#572a01] mb-4">
            Program Details
          </h2>
          <p className="text-lg text-[#844C37] max-w-3xl mx-auto">
            Explore our exciting lineup of events and activities for the celebration
          </p>
        </motion.div>

        {/* Main Programs Section */}
        <div className="mb-20">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-[#572a01] mb-8 text-center border-l-4 border-[#844C37] pl-4 inline-block mx-auto"
          >
            Main Programs
          </motion.h3>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {mainPrograms.map((program) => (
              <motion.div
                key={program.id}
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-[#d4c9b8] hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  {program.icon && (
                    <div className="flex-shrink-0">
                      <img 
                        src={program.icon} 
                        alt={program.title}
                        className="h-12 w-12 object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-[#572a01] mb-3">
                      {program.title}
                    </h4>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {program.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-[#844C37]">
                      {program.date && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {program.date}
                        </div>
                      )}
                      {program.location && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {program.location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Other Programs Section */}
        <div>
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-[#572a01] mb-8 text-center border-l-4 border-[#844C37] pl-4 inline-block mx-auto"
          >
            Additional Programs
          </motion.h3>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {otherPrograms.map((program) => (
              <motion.div
                key={program.id}
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-[#d4c9b8] hover:shadow-lg transition-all duration-300"
              >
                <h4 className="text-xl font-semibold text-[#572a01] mb-3">
                  {program.title}
                </h4>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {program.description}
                </p>
                <div className="space-y-2 text-xs text-[#844C37]">
                  {program.date && (
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {program.date}
                    </div>
                  )}
                  {program.location && (
                    <div className="flex items-center">
                      <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {program.location}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProgramDetails;