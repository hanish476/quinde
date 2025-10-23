// App.jsx (No changes needed)
import React from "react";
import Navbar from "./components/Navbar";
import ScrollShowcase from "./components/scrollShowcase";
import About from "./components/About";
import ProgramDetail from "./components/Programs";
import Footer from "./components/Footer";
import DownloadBrochure from "./components/DownloadBrochure";
const App = () => {
  return (
    <>
      <Navbar />
      <ScrollShowcase />
      <About />
      <ProgramDetail />
      <DownloadBrochure/>
      <Footer />

    </>
  );
};

export default App;



