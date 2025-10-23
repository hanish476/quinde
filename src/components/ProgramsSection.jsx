import React, { useState, useEffect, useRef } from "react";

const programs = [
  { id: 1, title: "Quran Recitation", description: "A soulful recitation contest encouraging tajweed and fluency." },
  { id: 2, title: "Debate Competition", description: "Engaging discussions on relevant Islamic and social topics." },
  { id: 3, title: "Islamic Quiz", description: "Test your knowledge of Islamic history, faith, and culture." },
  { id: 4, title: "Essay Writing", description: "A platform to express ideas and reflections through writing." },
  { id: 5, title: "Poetry Recitation", description: "Celebrating the beauty of Islamic poetry and literature." },
  { id: 6, title: "Calligraphy Workshop", description: "Learn the art of beautiful Islamic calligraphy." },
  { id: 7, title: "Storytelling Session", description: "Inspirational stories from Islamic history and tradition." },
  { id: 8, title: "Art & Craft Exhibition", description: "Showcasing creative works inspired by Islamic themes." },
  { id: 9, title: "Dua & Supplication", description: "A guided session on the power and significance of Dua." },
  { id: 10, title: "Islamic Games", description: "Fun and educational games based on Islamic knowledge." },
  { id: 11, title: "Community Service", description: "Initiatives for giving back to the community." },
  { id: 12, title: "Lecture Series", description: "Insightful lectures by renowned scholars." },
  { id: 13, title: "Youth Engagement", description: "Activities designed to engage and inspire the youth." },
  { id: 14, title: "Cultural Night", description: "A celebration of diverse Islamic cultures and traditions." },
  { id: 15, title: "Closing Ceremony", description: "A grand finale to commemorate 15 years of achievements." },
];

export default function ProgramsSection() {
  const [activeId, setActiveId] = useState(programs[0].id);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // find the section with the greatest visibility
        const visibleEntry = entries.reduce((max, entry) =>
          entry.intersectionRatio > (max?.intersectionRatio || 0) ? entry : max,
        null);

        if (visibleEntry?.isIntersecting) {
          const id = Number(visibleEntry.target.dataset.id);
          setActiveId(id);
        }
      },
      { threshold: [0.3, 0.6, 0.9] } // smoother detection
    );

    // Observe each section once refs are filled
    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => observer.disconnect();
  }, []);

  const scrollToProgram = (id) => {
    const targetIndex = programs.findIndex((p) => p.id === id);
    const targetRef = sectionRefs.current[targetIndex];
    if (targetRef) {
      targetRef.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleNext = () => {
    const currentIndex = programs.findIndex((p) => p.id === activeId);
    const nextIndex = (currentIndex + 1) % programs.length;
    scrollToProgram(programs[nextIndex].id);
  };

  return (
    <section className="flex flex-col md:flex-row">
      {/* Left index */}
      <div className="md:w-1/3 relative">
        <div className="sticky top-0 min-h-screen md:h-auto bg-cream border-b md:border-b-0 md:border-r border-brrown/20 z-10">
          <div className="overflow-x-auto md:overflow-y-auto flex md:flex-col">
            {programs.map((program) => (
              <button
                key={program.id}
                onClick={() => scrollToProgram(program.id)}
                className={`flex-shrink-0 text-sm md:text-lg font-semibold px-4 py-3 md:px-6 md:py-4 text-left transition-all
                  ${activeId === program.id
                    ? "bg-brrown text-cream"
                    : "hover:bg-brrown/10 text-brrown"}
                `}
              >
                <span className="mr-2 text-xs opacity-70">
                  {String(program.id).padStart(2, "0")}.</span>
                {program.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right content */}
      <div className="flex-1">
        {programs.map((program, i) => (
          <div
            key={program.id}
            ref={(el) => (sectionRefs.current[i] = el)}
            data-id={program.id}
            className="min-h-screen flex flex-col justify-center items-center p-8 bg-cream"
          >
            <div className="max-w-2xl text-center md:text-left space-y-6">
              <h2 className="text-3xl font-bold text-brrown">{program.title}</h2>
              <p className="text-lg text-brrown/80 leading-relaxed">{program.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Skip button for mobile */}
      <div className="fixed bottom-0 left-0 w-full md:hidden p-4 bg-cream/80 backdrop-blur-md flex justify-center border-t border-brrown/20">
        <button
          onClick={handleNext}
          className="bg-brrown text-cream px-6 py-2 rounded-full font-semibold shadow-md"
        >
          Skip →
        </button>
      </div>
    </section>
  );
}
