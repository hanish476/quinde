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
import RegistrationPage from "./pages/RegistrationPage"; // Import the new component

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Notification Bar Component
function NotificationBar() {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null; // Don't render if dismissed
  }

  return (
       <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', action: () => scrollToSection('about') },
                { name: 'Events', path: '/events' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                 <a
                  key={item.name}
                  onClick={item.action ? item.action : () => handleNavigation(item.path)}
                  className="text-[#572a01] hover:text-[#844C37] font-medium transition-colors duration-200 cursor-pointer relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#572a01] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              {/* Option B: Add Register as a separate button */}
              <a
                  onClick={() => handleNavigation('/register')}
                  className="bg-brrown text-cream px-4 py-1 rounded-full font-medium transition-colors duration-200 cursor-pointer hover:bg-opacity-90"
              >
                  Register
              </a>
            </div>
          </div>
  );
}


const App = () => {
  return (
    <Router>
      <div className="relative"> {/* Container for notification bar positioning */}
        <NotificationBar /> {/* Add the notification bar here */}
        <ScrollToTop />
        <div className="pt-12"> {/* Add top padding to account for the fixed notification bar */}
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
            <Route path="/events" element={<><Navbar/><Events/><Footer/></>} />
            <Route path="/gallery" element={<><Navbar/><Gallery/><Footer/></>} />
            <Route path="/contact" element={<><Navbar/><Contact/><Footer/></>} />
            {/* Route for the new Registration Page */}
            <Route path="/register" element={<><Navbar/><RegistrationPage/><Footer/></>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
