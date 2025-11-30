// src/pages/SelectedCandidatesPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const SelectedCandidatesPage = () => {
  // Mock data - Replace this with actual data from your database or API
  const [selectedCandidates, setSelectedCandidates] = useState([
    {
      name: "Aarav Mehta",
      institution: "St. Mary's High School, Thrissur",
      district: "Thrissur",
      mobile: "9876543210",
      rank: 1,
    },
    {
      name: "Neha Sharma",
      institution: "Government Model School, Kottayam",
      district: "Kottayam",
      mobile: "9876501234",
      rank: 2,
    },
    {
      name: "Rohan Patel",
      institution: "Holy Cross Higher Secondary School, Ernakulam",
      district: "Ernakulam",
      mobile: "9876543211",
      rank: 3,
    },
    {
      name: "Priya Nair",
      institution: "Sacred Heart School, Palakkad",
      district: "Palakkad",
      mobile: "9876543212",
      rank: 4,
    },
    {
      name: "Ananya Joseph",
      institution: "Lourdes Central School, Alappuzha",
      district: "Alappuzha",
      mobile: "9876543213",
      rank: 5,
    },
    {
      name: "Vikram Kumar",
      institution: "Sree Narayana Memorial School, Kannur",
      district: "Kannur",
      mobile: "9876543214",
      rank: 6,
    },
    {
      name: "Diya Thomas",
      institution: "St. George's School, Kozhikode",
      district: "Kozhikode",
      mobile: "9876543215",
      rank: 7,
    },
    {
      name: "Arjun Menon",
      institution: "Govt. Higher Secondary School, Pathanamthitta",
      district: "Pathanamthitta",
      mobile: "9876543216",
      rank: 8,
    },
    {
      name: "Sneha Raj",
      institution: "Little Flower School, Thiruvananthapuram",
      district: "Thiruvananthapuram",
      mobile: "9876543217",
      rank: 9,
    },
    {
      name: "Dhruv Singh",
      institution: "St. Paul's School, Wayanad",
      district: "Wayanad",
      mobile: "9876543218",
      rank: 10,
    },
  ]);

  return (
    <div className="mt-10 sm:mt-0 min-h-screen flex items-center justify-center bg-gradient-to-b from-cream to-brrown/80 p-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-cream shadow-2xl rounded-3xl p-6 md:p-8 border border-brrown relative"
      >
        <h1 className="text-3xl font-bold text-center mb-2 text-brrown">
          🏆 Selected Candidates for All Kerala Spelling Bee
        </h1>
        <p className="text-center text-brrown/80 mb-6">
          Congratulations to all the selected participants! The final list of candidates who qualified for the competition is displayed below.
        </p>

        {/* Candidate List */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-brrown/30 rounded-lg overflow-hidden">
            <thead className="bg-brrown text-cream">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Rank</th>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Institution</th>
                <th className="px-4 py-3 text-left font-semibold">District</th>
                <th className="px-4 py-3 text-left font-semibold">Contact</th>
              </tr>
            </thead>
            <tbody>
              {selectedCandidates.map((candidate, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-cream" : "bg-brrown/5"
                  } hover:bg-brrown/10 transition-colors`}
                >
                  <td className="px-4 py-3 font-medium text-brrown">{candidate.rank}</td>
                  <td className="px-4 py-3 text-brrown font-medium">{candidate.name}</td>
                  <td className="px-4 py-3 text-brrown">{candidate.institution}</td>
                  <td className="px-4 py-3 text-brrown">{candidate.district}</td>
                  <td className="px-4 py-3 text-brrown">
                    <a
                      href={`tel:${candidate.mobile}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {candidate.mobile}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-brrown/70">
          <p>
            This list is subject to change based on official verification. For any queries, please contact the event coordinator.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SelectedCandidatesPage;