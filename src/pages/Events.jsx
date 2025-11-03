// components/Events.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";

const Events = () => {
   
     useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

 const bgColor = "#eeeee4";
    const fgColor = "#572a01";
    const accentLight = "#c8b8a8";
    const accentDark = "#3d1a00";
    const events = [
       
        {
            title: "Mr. English",
            date: "March 15, 2025",
            time: "10:30 AM",
            description: "A competitive platform to crown the best English language student of Nahjurrashad, through multiple rounds covering fluency, grammar, writing, and public speaking.",
            details: "Mr. English reflects the spirit of excellence in language under the Quindecennial celebration. Winners receive certificates and prizes."
        },
        {
            title: "Allame Urdu",
            date: "March 15, 2025",
            time: "11:00 AM",
            description: "A vibrant competition to discover the best Urdu language student of Nahjurrashad, through a series of rounds in reading, writing, speaking, and comprehension.",
            details: "Allama Urdu stands as a tribute to linguistic heritage under the Quindecennial celebration."
        },
        {
            title: "Al Adeeb",
            date: "March 15, 2025",
            time: "11:30 AM",
            description: "An intensive Arabic language competition for Nahjurrashad students, designed to identify the best Arabic talent through multiple challenging rounds.",
            details: "From grammar to eloquence, speech to script, Al Adeeb celebrates linguistic excellence."
        },
        {
            title: "Spelling Bee",
            date: "March 15, 2025",
            time: "12:00 PM",
            description: "A language mastery contest held exclusively for students of Darul Huda, its affiliates, and Arabic colleges across Kerala, aiming to enhance English proficiency and confidence.",
            details: "Winners receive certificates and prizes. Total expense allocated was 40,000 OT."
        },
        {
            title: "Tech Tangle",
            date: "March 15, 2025",
            time: "1:00 PM",
            description: "A competitive platform to identify the best coding talent among Nahjurrashad students, through challenges in programming, problem-solving, and logic-building.",
            details: "Tech Tangle celebrates innovation and digital skill under the spirit of Quindecennial."
        },
        {
            title: "Robotics Expo",
            date: "March 15, 2025",
            time: "1:30 PM",
            description: "A futuristic showcase of robotics and AI innovations, held in collaboration with professional AI teams within the college.",
            details: "This expo offers students a hands-on glimpse into the world of intelligent machines, creativity in motion, and the exciting edge of modern technology."
        },
        {
            title: "Novel Contest",
            date: "March 15, 2025",
            time: "2:00 PM",
            description: "A prestigious competition encouraging students to author and publish Islamic novels (100+ pages) through established publishers.",
            details: "Celebrating creativity, depth, and literary contribution, the winner is awarded 5001 with a certificate under the Quindecennial celebration."
        },
        {
            title: "Journal Publishing",
            date: "March 15, 2025",
            time: "2:30 PM",
            description: "An academic publishing venture under the Quindecennial, showcasing well-researched articles on various Hadith themes.",
            details: "This journal reflects the scholarly spirit of Nahjurrashad, encouraging writing, reflection, and deeper engagement with prophetic knowledge."
        },
        {
            title: "Ahlus Sufa",
            date: "March 15, 2025",
            time: "3:00 PM",
            description: "A Hadith-based fest to identify the best performing degree class among 8, 9, and 10, inspired by the learning spirit of the Ashabus-Suffa.",
            details: "The program includes competitions and activities rooted in Hadith knowledge, application, and collective performance."
        },
        {
            title: "Little Muhaddith",
            date: "March 15, 2025",
            time: "3:30 PM",
            description: "An outreach program focused on a fixed Hadith syllabus, featuring a competitive exam and on-stage performance to identify the best Hadith learner.",
            details: "Held under the Quindecennial, the program aims to nurture a generation rooted in prophetic knowledge and expression."
        },
        {
            title: "Book Fair",
            date: "March 15, 2025",
            time: "4:00 PM",
            description: "An inspiring book fair held in collaboration with leading publishers, offering a curated collection of Islamic, academic, literary, and cultural books.",
            details: "Aiming to foster a vibrant reading culture and intellectual spirit among students."
        },
        {
            title: "Karate Championship",
            date: "March 15, 2025",
            time: "4:30 PM",
            description: "A focused Shorin-Ryu Karate competition named Kamikaze held under Quindecennial, featuring students grouped into four divisions.",
            details: "The event promotes discipline, self-defense, and physical excellence through structured challenges and demonstrations."
        },
        {
            title: "Smaranika",
            date: "March 15, 2025",
            time: "5:00 PM",
            description: "A heartfelt tribute to SMK Thangal, the visionary founder of Nahjurashad. This memorial publication reflects on his life, values, and legacy.",
            details: "Enriched with biographical notes, writings, and reflections from those inspired by his path. To be released before December."
        },
        {
            title: "Campus Magazine",
            date: "March 15, 2025",
            time: "5:30 PM",
            description: "A creative reflection of student voices, compiling the best of literature, art, thought, and campus life.",
            details: "Published as part of the Quindecennial, it captures the spirit, talent, and intellectual vibrance of Nahjurra-shad."
        },
        {
            title: "Muhammad Quiz",
            date: "March 16, 2025",
            time: "10:00 AM",
            description: "A Seerah-based quiz competition for Nahjurrashad students, grounded in scholarly works.",
            details: "Organized under the Quindecennial, the quiz aims to enrich students' understanding of the Prophet's life through profound scholarly works like 'Muhammad: His Life Based on the Earliest Sources' by Martin Lings and 'And Muhammad Is His Messenger' by Annemarie Schimmel."
        },
        {
            title: "Rabi' al-Awwal Conference",
            date: "March 16, 2025",
            time: "10:30 AM",
            description: "An academic conference focusing on non-Muslim perspectives and writings on Prophet Muhammad (s).",
            details: "As part of the Quindecennial, the event features paper presentations primarily by non-Muslim scholars and students, promoting interfaith understanding and a broader appreciation of the Prophet's legacy through diverse lenses."
        },
        {
            title: "Madh Ravu",
            date: "March 16, 2025",
            time: "11:00 AM",
            description: "A soulful mehfil of Ishq, Sama, and Islamic cultural expressions, held as part of the Quindecennial.",
            details: "The event revived spiritual artistry and collective harmony. Prizes were awarded (1st: 10,001, 2nd: 7001, 3rd: 5001). Total expense was 45,000 OT."
        },
        {
            title: "Mou Varsity Talent",
            date: "March 16, 2025",
            time: "11:30 AM",
            description: "A comprehensive talent hunt for students of classes 6 to 10, featuring syllabus mastery, general knowledge, history, and practical assessments.",
            details: "As part of the Quindecennial, Varsity Talent aims to crown the finest all-rounder minds from among the rising generation."
        },
        {
            title: "Smaranika (Little Talent)",
            date: "March 16, 2025",
            time: "12:00 PM",
            description: "An engaging academic contest for students of classes 1 to 5, designed to spark young minds.",
            details: "Held under Quindecennial, this event seeks to spot the brightest early talents and nurture curiosity from the roots through syllabus-based questions, GK, history, and interactive sessions."
        },
        {
            title: "Alumni Meet",
            date: "March 16, 2025",
            time: "2:00 PM",
            description: "Reconnect with fellow alumni and share memories from your time at Nahjurashad.",
            details: "An exclusive gathering for past students to network, share experiences, and contribute to the future of our institution."
        },
        {
            title: "Sports Tournament",
            date: "March 16, 2025",
            time: "3:00 PM",
            description: "Compete in various sports events representing your departments and win exciting prizes.",
            details: "A full day of sports activities including football, basketball, volleyball, and traditional games with professional referees and awards ceremony."
        },
       
    ];

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center py-12" style={{ backgroundColor: bgColor }}>
            {/* Hero Section - Inspired by PDF */}
            <div className="w-full max-w-6xl px-4 md:px-8 mb-16 relative overflow-hidden">
                {/* Background Text - 15 YEARS */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[12rem] md:text-[18rem] font-bold leading-none opacity-5" style={{ color: fgColor }}>
                        15 YEARS
                    </span>
                </div>

                {/* Foreground Content */}
                <div className="relative z-10 text-center py-20">
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
                        style={{ color: fgColor }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Quindecennial
                    </motion.h1>
                    <motion.div
                        className="w-32 h-1 mx-auto mb-6"
                        style={{ backgroundColor: fgColor }}
                        initial={{ width: 0 }}
                        animate={{ width: "8rem" }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    />
                    <motion.p
                        className="text-lg md:text-xl max-w-2xl mx-auto"
                        style={{ color: accentDark }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        Celebrating 15 Years of HISAN - Home for Islamic Sensible Activities of Nahjurra-shad
                    </motion.p>
                </div>
            </div>

            {/* Programs Section */}
            <div className="w-full max-w-6xl px-4 md:px-8 mb-16">
                <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold" style={{ color: fgColor }}>PROGRAMS</h2>
                    <div className="flex-grow h-0.5" style={{ backgroundColor: accentLight }} />
                </div>

                {/* Grid Layout for Events */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            className="p-5 rounded-lg shadow-sm border"
                            style={{ backgroundColor: "#f9f8f5", borderColor: accentLight }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={itemVariants}
                        >
                            <h3 className="text-xl font-semibold mb-2" style={{ color: fgColor }}>
                                {event.title}
                            </h3>
                           <div className=" border border-b-2 border-brrown/45 mb-8">

                           </div>
                            <p className="text-sm" style={{ color: accentDark }}>
                                {event.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            
        </div>
    );
};

export default Events;