// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from "react-router-dom";
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

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Floating Announcement Box Component
function FloatingAnnouncement() {
  const { pathname } = useLocation(); // useLocation is now correctly inside Router context
  const showRegisterLink = pathname !== '/register';

  if (!showRegisterLink) {
    return null; // Don't render if on /register
  }

  return (
    <div className="fixed z-40 animate-bounce bottom-10 w-full max-w-xs sm:max-w-md md:w-1/3 lg:w-1/4 h-auto rounded-2xl bg-brrown/30 right-4 sm:right-6 md:right-10 flex flex-col items-center justify-center shadow-lg backdrop-blur-md p-4">
      <div className="text-cream text-center mb-2">
       <div className="flex  items-center gap-4">  
         <p className="font-bold text-lg sm:text-xl">Spelling Bee</p>
        <p className="text-sm">All Kerala Contest</p>
       </div>
      </div>
      <Link
        to="/register"
        className="px-4 py-2 rounded bg-brrown text-cream font-semibold text-sm sm:text-base"
      >
        Register Now
      </Link>
    </div>
  );
}


const App = () => {
  return (
    <Router>
      <div className="relative"> {/* Container for notification bar positioning */}
        <ScrollToTop /> {/* Add the scroll to top logic here */}
        <FloatingAnnouncement /> {/* Add the announcement component here */}
        <div className=""> {/* Add top padding to account for the fixed notification bar */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <ScrollShowcase />
                  <div id="about" className="relative z-[20] mt-[-5vh]">
                    <About />
                  </div>
                  <ProgramDetail />
                  <DownloadBrochure />
                  <Footer />
                </>
              }
            />
            <Route path="/events" element={<><Navbar /><Events /><Footer /></>} />
            <Route path="/gallery" element={<><Navbar /><Gallery /><Footer /></>} />
            <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
            {/* Route for the new Registration Page */}
            <Route path="/register" element={<><Navbar /><RegistrationPage /><Footer /></>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;