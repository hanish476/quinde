// components/Contact.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  // Color theme variables
  const bgColor = "#eeeee4";
  const fgColor = "#572a01";
  const accentLight = "#c8b8a8";
  const accentDark = "#3d1a00";

  const contactInfo = [
    // {
    //   title: "Address",
    //   value: "Nahjurashad Institute of Technology\nEducational District, Campus Road\nCity, State - 123456",

    // },
    // {
    //   title: "Phone",
    //   value: "+91 98765 43210\n+91 91234 56789",
   
    // },
    // {
    //   title: "Email",
    //   value: "info@quindecennial.com\ncontact@hisan.org",
 
    // },
    
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
        type: "spring",
        stiffness: 100
      }
    }
  };

  const formItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.4
      }
    }
  };

  return (
    <div 
      className="min-h-screen w-full pt-20"
      style={{ backgroundColor: bgColor }}
    >
      {/* Top section title */}
      <motion.div
        className="px-5 md:px-24 py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 
          className="text-3xl font-bold tracking-widest uppercase"
          style={{ color: fgColor }}
        >
          Contact
        </h1>
        <div 
          className="mt-2 w-12 h-0.5"
          style={{ backgroundColor: fgColor }}
        />
      </motion.div>

      {/* Main content container */}
      <div className="max-w-6xl mx-auto px-8 md:px-16 pb-20">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Contact Information */}
          <motion.div className="space-y-8">
            <motion.h2 
              className="text-3xl md:text-4xl font-light mb-8"
              style={{ color: fgColor }}
              variants={itemVariants}
            >
              Get in Touch
            </motion.h2>
            
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg"
                style={{ backgroundColor: accentLight }}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-2xl">{info.icon}</span>
                <div>
                  <h3 
                    className="font-semibold text-lg"
                    style={{ color: fgColor }}
                  >
                    {info.title}
                  </h3>
                  <p 
                    className="mt-1 whitespace-pre-line"
                    style={{ color: accentDark }}
                  >
                    {info.value}
                  </p>
                </div>
              </motion.div>
            ))}

          
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg"
            variants={formItemVariants}
          >
            <motion.h2 
              className="text-2xl font-light mb-6"
              style={{ color: fgColor }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Send us a Message
            </motion.h2>
            <motion.form 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: fgColor }}
                >
                  Name
                </label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brrown"
                  style={{ color: fgColor, borderColor: accentLight }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: fgColor }}
                >
                  Email
                </label>
                <input 
                  type="email" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brrown"
                  style={{ color: fgColor, borderColor: accentLight }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: fgColor }}
                >
                  Subject
                </label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brrown"
                  style={{ color: fgColor, borderColor: accentLight }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: fgColor }}
                >
                  Message
                </label>
                <textarea 
                  rows="5"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brrown"
                  style={{ color: fgColor, borderColor: accentLight }}
                ></textarea>
              </motion.div>
              <motion.button 
                type="submit" 
                className="w-full bg-brrown text-cream py-3 px-6 rounded-md hover:bg-opacity-80 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>

      {/* Background logo on the right */}
      <div
        className="fixed top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url('/logo.svg')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top right',
          backgroundSize: 'contain',
        }}
      />
      <div
        className="fixed top-0 right-0 h-full w-2/4 bg-gradient-to-l from-brrown opacity-15 blur-2xl pointer-events-none"
      />
    </div>
  );
};

export default Contact;