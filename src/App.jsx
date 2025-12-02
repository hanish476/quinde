// src/App.jsx
// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import ScrollShowcase from "./components/scrollShowcase";
// import About from "./components/About";
// import ProgramDetail from "./components/Programs";
// import Footer from "./components/Footer";
// import DownloadBrochure from "./components/DownloadBrochure";
// import Events from "./pages/Events";
// import Gallery from "./pages/Gallery";
// import Contact from "./pages/Contact";
// import RegistrationPage from "./pages/RegistrationPage";
// import StickyCTA from "./components/StickyCTA"; // ✅ NEW IMPORT
// import SelectedCandidatesPage from "./pages/SelectedCandidatesPage";
// import SpellingBeeResultCTA from "./components/SpellingBeeResultCTA";

// import { ArrowBigDown } from "lucide-react";

// // ✅ Proper scroll-to-top on route change
// function ScrollToTop() {
//   const { pathname } = useLocation();
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);
//   return null;
// }

// // Custom smooth scroll function with adjustable duration and callback
// function scrollToDivId(id, duration = 1000, onComplete = null) {
//   const element = document.getElementById(id);
//   if (element) {
//     const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
//     const startPosition = window.pageYOffset;
//     const distance = elementPosition - startPosition;
//     let startTime = null;

//     function animation(currentTime) {
//       if (startTime === null) startTime = currentTime;
//       const timeElapsed = currentTime - startTime;
//       const run = ease(timeElapsed, startPosition, distance, duration);
//       window.scrollTo(0, run);
//       if (timeElapsed < duration) {
//         requestAnimationFrame(animation);
//       } else {
//         // Call the completion callback when scrolling is done
//         if (onComplete) onComplete();
//       }
//     }

//     // Easing function (easeInOutCubic)
//     function ease(t, b, c, d) {
//       t /= d / 2;
//       if (t < 1) return c / 2 * t * t * t + b;
//       t -= 2;
//       return c / 2 * (t * t * t + 2) + b;
//     }

//     requestAnimationFrame(animation);
//   }
// }

// const App = () => {
//   const [showScrollButton, setShowScrollButton] = useState(true);

//   const handleScrollToSection = () => {
//     scrollToDivId('resultCta', 2000, () => {
//       // Hide the button after scrolling is complete
//       setShowScrollButton(false);
//     });
//   };

//   return (
//     <Router>
//       <div className="relative">
//         <ScrollToTop />
//         <Navbar />
//         {/* <StickyCTA /> */}
        
//         {/* Only show the button if showScrollButton is true */}
//         {showScrollButton && (
//           <div className="h-15 w-md px-3 fixed bottom-10 right-10 z-50 bg-brrown/90 flex justify-between items-center">
//             <div className="text-white">
//               <h1>Spelling Bee </h1>
//               <h1>Elimination Round Result</h1>
//             </div>
//             <button 
//               className="bg-white rounded-2xl flex px-8 py-3 gap-3"  
//               onClick={handleScrollToSection}
//             >
//               <p className="font-bold">go to </p>
//               <ArrowBigDown className="text-brrown" />
//             </button>
//           </div>
//         )}  
        
//         <div>
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <>
//                   <ScrollShowcase/>
//                   <div id="about" className="relative z-[20] mt-[-5vh]">
//                     <About />
//                   </div>
//                   <ProgramDetail />
//                   <SpellingBeeResultCTA id="resultCta"/>
//                   <DownloadBrochure />
//                   <Footer />
//                 </>
//               }
//             />
//             <Route path="/events" element={<><Events /><Footer /></>} />
//             <Route path="/gallery" element={<><Gallery /><Footer /></>} />
//             <Route path="/contact" element={<><Contact /><Footer /></>} />
//              <Route path="/register" element={<><RegistrationPage /><Footer /></>}  />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;

// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollShowcase from "./components/scrollShowcase";
import About from "./components/About";
import ProgramDetail from "./components/Programs";
import Footer from "./components/Footer";
import DownloadBrochure from "./components/DownloadBrochure";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import RegistrationPage from "./pages/RegistrationPage";
import StickyCTA from "./components/StickyCTA"; // ✅ NEW IMPORT
import SelectedCandidatesPage from "./pages/SelectedCandidatesPage";
import SpellingBeeResultCTA from "./components/SpellingBeeResultCTA";
import EliminationResults from "./pages/EliminationResults";

import { ArrowBigDown } from "lucide-react";

// ✅ Proper scroll-to-top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Custom smooth scroll function with adjustable duration and callback
// Custom smooth scroll to center an element vertically
function scrollToDivId(id, duration = 1000, onComplete = null) {
  const element = document.getElementById(id);
  if (!element) return;

  // Get element position relative to viewport
  const rect = element.getBoundingClientRect();
  const elementTop = rect.top + window.pageYOffset;
  const elementHeight = rect.height;

  // Calculate scroll target so element is centered vertically
  const targetScrollY = elementTop + elementHeight / 2 - window.innerHeight / 2;

  const startPosition = window.pageYOffset;
  const distance = targetScrollY - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      if (onComplete) onComplete();
    }
  }

  // Easing function: easeInOutCubic
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  }

  requestAnimationFrame(animation);
}

const App = () => {
  const [showScrollButton, setShowScrollButton] = useState(true);

  const handleScrollToSection = () => {
    scrollToDivId('resultCta', 2000, () => {
      // Hide the button after scrolling is complete
      setShowScrollButton(false);
    });
  };
useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
  return (
    <Router>
      <div className="relative">
        <ScrollToTop />
        <Navbar />
        {/* <StickyCTA /> */}
        
        {/* Only show the button if showScrollButton is true */}
 {/* Floating scroll button: Only on homepage */}
{showScrollButton && location.pathname === '/' && (
  <div className="fixed bottom-6 md:bottom-8 right-4 md:right-6 z-50 w-[90vw] max-w-xs md:max-w-sm">
    <button
      onClick={handleScrollToSection}
      className="w-full px-5 py-2.5 rounded-xl 
                 backdrop-blur-sm bg-brrown/80 border border-white/50 shadow-sm
                 text-white font-medium text-sm tracking-wide
                 flex items-center justify-center gap-2
                 hover:bg-brrown hover:shadow-md
                 active:scale-[0.98] transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-white/40 animate-bounce"
      aria-label="Scroll to Spelling Bee results section"
    >
      <span>Spelling Bee Results Link</span>
      <ArrowBigDown size={16} className="text-white" />
    </button>
  </div>
)}
        
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ScrollShowcase/>
                  <div id="about" className="relative z-[20] mt-[-5vh]">
                    <About />
                  </div>
                  <ProgramDetail />
                  <SpellingBeeResultCTA id="resultCta"/>
                  <DownloadBrochure />
                  <Footer />
                </>
              }
            />
            <Route path="/events" element={<><Events /><Footer /></>} />
            <Route path="/gallery" element={<><Gallery /><Footer /></>} />
            <Route path="/contact" element={<><Contact /><Footer /></>} />
             <Route path="/register" element={<><RegistrationPage /><Footer /></>}  />
              <Route path="/spelling-bee-results" element={<><EliminationResults /><Footer /></>}  />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

// import React from 'react'
// import ExcelToJsonConverter from './pages/ExceltoJson'

// const App = () => {
//   return (
//     <ExcelToJsonConverter/>
//   )
// }

// export default App