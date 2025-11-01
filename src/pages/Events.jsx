// components/Events.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Events = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Color theme variables
    const bgColor = "#eeeee4";
    const fgColor = "#572a01";
    const accentLight = "#c8b8a8";
    const accentDark = "#3d1a00";

    const events = [
        {
            title: "Opening Ceremony",
            date: "March 15, 2025", // Example date from original data
            time: "10:00 AM",      // Example time from original data
            description: "Join us for the grand opening of our 15th anniversary celebration with distinguished guests and cultural performances.",
            details: "The opening ceremony will feature speeches from prominent leaders, cultural performances by students, and a historical presentation about HISAN's journey over the past 15 years."
        },
        {
            title: "Mr. English",
            date: "March 15, 2025",
            time: "10:30 AM", // Example time
            description: "A competitive platform to crown the best English language student of Nahjurrashad, through multiple rounds covering fluency, grammar, writing, and public speaking.",
            details: "Mr. English reflects the spirit of excellence in language under the Quindecennial celebration. Winners receive certificates and prizes."
        },
        {
            title: "Allame Urdu",
            date: "March 15, 2025",
            time: "11:00 AM", // Example time
            description: "A vibrant competition to discover the best Urdu language student of Nahjurrashad, through a series of rounds in reading, writing, speaking, and comprehension.",
            details: "Allama Urdu stands as a tribute to linguistic heritage under the Quindecennial celebration."
        },
        {
            title: "Al Adeeb",
            date: "March 15, 2025",
            time: "11:30 AM", // Example time
            description: "An intensive Arabic language competition for Nahjurrashad students, designed to identify the best Arabic talent through multiple challenging rounds.",
            details: "From grammar to eloquence, speech to script, Al Adeeb celebrates linguistic excellence."
        },
        {
            title: "Spelling Bee",
            date: "March 15, 2025",
            time: "12:00 PM", // Example time
            description: "A language mastery contest held exclusively for students of Darul Huda, its affiliates, and Arabic colleges across Kerala, aiming to enhance English proficiency and confidence.",
            details: "Winners receive certificates and prizes. Total expense allocated was 40,000 OT."
        },
        {
            title: "Tech Tangle",
            date: "March 15, 2025",
            time: "1:00 PM", // Example time
            description: "A competitive platform to identify the best coding talent among Nahjurrashad students, through challenges in programming, problem-solving, and logic-building.",
            details: "Tech Tangle celebrates innovation and digital skill under the spirit of Quindecennial."
        },
        {
            title: "Robotics Expo",
            date: "March 15, 2025",
            time: "1:30 PM", // Example time
            description: "A futuristic showcase of robotics and AI innovations, held in collaboration with professional AI teams within the college.",
            details: "This expo offers students a hands-on glimpse into the world of intelligent machines, creativity in motion, and the exciting edge of modern technology."
        },
        {
            title: "Novel Contest",
            date: "March 15, 2025",
            time: "2:00 PM", // Example time
            description: "A prestigious competition encouraging students to author and publish Islamic novels (100+ pages) through established publishers.",
            details: "Celebrating creativity, depth, and literary contribution, the winner is awarded 5001 with a certificate under the Quindecennial celebration."
        },
        {
            title: "Journal Publishing",
            date: "March 15, 2025",
            time: "2:30 PM", // Example time
            description: "An academic publishing venture under the Quindecennial, showcasing well-researched articles on various Hadith themes.",
            details: "This journal reflects the scholarly spirit of Nahjurrashad, encouraging writing, reflection, and deeper engagement with prophetic knowledge."
        },
        {
            title: "Ahlus Sufa",
            date: "March 15, 2025",
            time: "3:00 PM", // Example time
            description: "A Hadith-based fest to identify the best performing degree class among 8, 9, and 10, inspired by the learning spirit of the Ashabus-Suffa.",
            details: "The program includes competitions and activities rooted in Hadith knowledge, application, and collective performance."
        },
        {
            title: "Little Muhaddith",
            date: "March 15, 2025",
            time: "3:30 PM", // Example time
            description: "An outreach program focused on a fixed Hadith syllabus, featuring a competitive exam and on-stage performance to identify the best Hadith learner.",
            details: "Held under the Quindecennial, the program aims to nurture a generation rooted in prophetic knowledge and expression."
        },
        {
            title: "Book Fair",
            date: "March 15, 2025",
            time: "4:00 PM", // Example time
            description: "An inspiring book fair held in collaboration with leading publishers, offering a curated collection of Islamic, academic, literary, and cultural books.",
            details: "Aiming to foster a vibrant reading culture and intellectual spirit among students."
        },
        {
            title: "Karate Championship",
            date: "March 15, 2025",
            time: "4:30 PM", // Example time
            description: "A focused Shorin-Ryu Karate competition named Kamikaze held under Quindecennial, featuring students grouped into four divisions.",
            details: "The event promotes discipline, self-defense, and physical excellence through structured challenges and demonstrations."
        },
        {
            title: "Smaranika",
            date: "March 15, 2025",
            time: "5:00 PM", // Example time
            description: "A heartfelt tribute to SMK Thangal, the visionary founder of Nahjurashad. This memorial publication reflects on his life, values, and legacy.",
            details: "Enriched with biographical notes, writings, and reflections from those inspired by his path. To be released before December."
        },
        {
            title: "Campus Magazine",
            date: "March 15, 2025",
            time: "5:30 PM", // Example time
            description: "A creative reflection of student voices, compiling the best of literature, art, thought, and campus life.",
            details: "Published as part of the Quindecennial, it captures the spirit, talent, and intellectual vibrance of Nahjurra-shad."
        },
        {
            title: "Muhammad Quiz",
            date: "March 16, 2025", // Example date
            time: "10:00 AM",      // Example time
            description: "A Seerah-based quiz competition for Nahjurrashad students, grounded in scholarly works.",
            details: "Organized under the Quindecennial, the quiz aims to enrich students' understanding of the Prophet's life through profound scholarly works like 'Muhammad: His Life Based on the Earliest Sources' by Martin Lings and 'And Muhammad Is His Messenger' by Annemarie Schimmel."
        },
        {
            title: "Rabi' al-Awwal Conference",
            date: "March 16, 2025",
            time: "10:30 AM", // Example time
            description: "An academic conference focusing on non-Muslim perspectives and writings on Prophet Muhammad (s).",
            details: "As part of the Quindecennial, the event features paper presentations primarily by non-Muslim scholars and students, promoting interfaith understanding and a broader appreciation of the Prophet's legacy through diverse lenses."
        },
        {
            title: "Madh Ravu",
            date: "March 16, 2025",
            time: "11:00 AM", // Example time
            description: "A soulful mehfil of Ishq, Sama, and Islamic cultural expressions, held as part of the Quindecennial.",
            details: "The event revived spiritual artistry and collective harmony. Prizes were awarded (1st: 10,001, 2nd: 7001, 3rd: 5001). Total expense was 45,000 OT."
        },
        {
            title: "Mou Varsity Talent",
            date: "March 16, 2025",
            time: "11:30 AM", // Example time
            description: "A comprehensive talent hunt for students of classes 6 to 10, featuring syllabus mastery, general knowledge, history, and practical assessments.",
            details: "As part of the Quindecennial, Varsity Talent aims to crown the finest all-rounder minds from among the rising generation."
        },
        {
            title: "Smaranika (Little Talent)",
            date: "March 16, 2025",
            time: "12:00 PM", // Example time
            description: "An engaging academic contest for students of classes 1 to 5, designed to spark young minds.",
            details: "Held under Quindecennial, this event seeks to spot the brightest early talents and nurture curiosity from the roots through syllabus-based questions, GK, history, and interactive sessions."
        },
        {
            title: "Alumni Meet",
            date: "March 16, 2025",
            time: "2:00 PM", // Example time, slightly adjusted from original
            description: "Reconnect with fellow alumni and share memories from your time at Nahjurashad.",
            details: "An exclusive gathering for past students to network, share experiences, and contribute to the future of our institution."
        },
        {
            title: "Sports Tournament",
            date: "March 16, 2025",
            time: "3:00 PM", // Example time, slightly adjusted from original
            description: "Compete in various sports events representing your departments and win exciting prizes.",
            details: "A full day of sports activities including football, basketball, volleyball, and traditional games with professional referees and awards ceremony."
        },
        {
            title: "Closing Ceremony",
            date: "March 16, 2025",
            time: "6:00 PM", // Example time from original data
            description: "Join us for the grand finale of our 15th anniversary celebration.",
            details: "The closing ceremony will feature award presentations, cultural performances, and a memorable fireworks display to conclude our celebration."
        }
    ];

    const eventCount = events.length;

    // Scroll-based opacity for each event
    const eventRanges = events.map((_, index) => {
        const start = index / eventCount;
        const end = (index + 1) / eventCount;
        return [start, (start + end) / 2, end];
    });

    const eventOpacities = events.map((_, index) =>
        useTransform(scrollYProgress, eventRanges[index], [0, 1, 0])
    );

    // Scale animation for featured content
    const contentScale = useTransform(scrollYProgress, [0.5, 0.7, 1], [1, 1, 1]);

    // Timeline progress
    const timelineProgress = useTransform(scrollYProgress, [0, 1], ["40%", "100%"]);

    return (
        <motion.div
            ref={containerRef}
            style={{ backgroundColor: bgColor }}
            className="h-[600vh] w-full relative z-30"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden pt-20">
                {/* Decorative background line - desktop only */}
                <div className="hidden md:block absolute left-12 top-0 bottom-0 w-1" style={{ backgroundColor: accentLight }} />

                {/* Main content container */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full max-w-4xl px-8 md:px-16">

                        {/* Events content - stacked and animated */}
                        {events.map((event, index) => (
                            <motion.div
                                key={index}
                                style={{ opacity: eventOpacities[index], scale: contentScale }}
                                className="absolute inset-0 flex flex-col justify-center px-8 md:px-24"
                            >
                                {/* Event number indicator */}
                                <motion.div
                                    className="flex items-baseline gap-4 mb-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <span
                                        className="text-6xl font-light"
                                        style={{ color: accentLight }}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div style={{ borderBottomColor: accentLight }} className="flex-grow border-b" />
                                </motion.div>

                                {/* Title */}
                                <motion.h2
                                    className="text-4xl md:text-5xl font-light mb-6 tracking-tight"
                                    style={{ color: fgColor }}
                                >
                                    {event.title}
                                </motion.h2>

                                {/* Metadata badges */}
                                <div className="flex flex-wrap gap-6 mb-8">
                                    <div className="flex items-center gap-3">
                                        <span style={{ color: accentLight }} className="text-sm font-medium uppercase tracking-wider">Date</span>
                                        <span style={{ color: fgColor }} className="text-lg">{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span style={{ color: accentLight }} className="text-sm font-medium uppercase tracking-wider">Time</span>
                                        <span style={{ color: fgColor }} className="text-lg">{event.time}</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <motion.p
                                    className="text-xl mb-6 leading-relaxed"
                                    style={{ color: fgColor }}
                                >
                                    {event.description}
                                </motion.p>

                                {/* Details */}
                                <motion.p
                                    className="text-base leading-relaxed"
                                    style={{ color: accentDark }}
                                >
                                    {event.details}
                                </motion.p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom horizontal progress bar */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-11/12 md:w-80">
                    <div className="relative flex items-center justify-between">
                        {/* Background track */}
                        <div
                            className="absolute left-0 right-0 h-1"
                            style={{ backgroundColor: accentLight }}
                        />

                        {/* Progress fill */}
                        <motion.div
                            className="absolute left-0 h-1"
                            style={{
                                width: timelineProgress,
                                backgroundColor: fgColor,
                            }}
                        />

                        {/* Bullet points */}
                        {events.map((_, index) => (
                            <motion.div
                                key={index}
                                className="w-5 h-5 rounded-full border-2 relative z-10"
                                style={{
                                    backgroundColor: index < Math.ceil(scrollYProgress.get() * eventCount) ? fgColor : bgColor,
                                    borderColor: fgColor,
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Top section title */}
                <motion.div
                    className="absolute top-20 left-5 md:left-24"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-3xl font-bold text-brrown tracking-widest uppercase">
                        Events
                    </h1>
                    <div className="mt-2 w-12 h-0.5" style={{ backgroundColor: fgColor }} />
                </motion.div>

                {/* Background logo on the right */}
                <div
                    className="absolute top-0 right-0 w-5/12 h-full opacity-5 md:opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: `url('/logo.svg')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center right',
                        backgroundSize: 'contain',
                    }}
                />
                <div
                    className="h-full w-2/4 absolute top-0 right-0 bg-linear-to-l from-brrown opacity-15 blur-2xl md:opacity-20 pointer-events-none"
                />
            </div>
        </motion.div>
    );
};

export default Events;