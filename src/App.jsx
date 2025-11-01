import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Add Router
import Navbar from "./components/Navbar";
import ScrollShowcase from "./components/scrollShowcase";
import About from "./components/About";
import ProgramDetail from "./components/Programs";
import Footer from "./components/Footer";
import DownloadBrochure from "./components/DownloadBrochure";

import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
  import Contact from "./pages/Contact";
const App = () => {
  return (
    <Router>
      <div className="">
        <Navbar />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <ScrollShowcase />
                <div id="about"><About /></div> 
                <ProgramDetail />
                <DownloadBrochure/>
              
              </>
            } 
          />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
         <Route path="/contact" element={<Contact />} />
        </Routes>
          <Footer />
      </div>
    </Router>
  );
};

export default App;