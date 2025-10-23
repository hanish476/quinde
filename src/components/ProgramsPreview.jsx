import React from "react";
import { useInView } from "react-intersection-observer"; // Optional: for fade-in effect

// Define the first 5 programs data
const previewPrograms = [
  { id: 1, title: "Quran Recitation", description: "A soulful recitation contest encouraging tajweed and fluency." },
  { id: 2, title: "Debate Competition", description: "Engaging discussions on relevant Islamic and social topics." },
  { id: 3, title: "Islamic Quiz", description: "Test your knowledge of Islamic history, faith, and culture." },
  { id: 4, title: "Essay Writing", description: "A platform to express ideas and reflections through writing." },
  { id: 5, title: "Poetry Recitation", description: "Celebrating the beauty of Islamic poetry and literature." },
];

export default function ProgramsPreview({ setShowFull }) { // Accept a function prop


  return (
    // Optional: Add ref for animation
    // <div ref={ref} className={`bg-cream p-8 transition-opacity duration-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
    <div className="bg-cream p-8">
      <h2 className="text-3xl font-bold text-brrown mb-6 text-center">Event Programs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {previewPrograms.map((program) => (
          <div
            key={program.id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full border border-brrown/20"
          >
            <h3 className="text-xl font-semibold text-brrown mb-2">{program.title}</h3>
            <p className="text-brrown/80 flex-grow">{program.description}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        {/* Button to trigger scroll to full programs section */}
        <button
          onClick={()=>{setShowFull(true)}}
          className="bg-brrown text-cream px-6 py-3 rounded-full font-semibold shadow-md hover:bg-brrown/90 transition-colors"
        >
          View All Programs
        </button>
      </div>
    </div>
  );
}