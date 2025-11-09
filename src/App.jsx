// src/App.jsx
import React, { useEffect } from "react";
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

// ✅ Proper scroll-to-top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => {
  return (
    <Router>
      <div className="relative">
        <ScrollToTop />
        <Navbar />
        <StickyCTA />

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
                  <DownloadBrochure />
                  <Footer />
                </>
              }
            />
            <Route path="/events" element={<><Events /><Footer /></>} />
            <Route path="/gallery" element={<><Gallery /><Footer /></>} />
            <Route path="/contact" element={<><Contact /><Footer /></>} />
            <Route path="/register" element={<><RegistrationPage /><Footer /></>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
