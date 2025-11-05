// import React from "react";
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

// // Scroll to top on every route change
// function ScrollToTop() {
//   const { pathname } = useLocation();

//   React.useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// }

// const App = () => {
//   return (
//     <Router>
//       <ScrollToTop />
//       <div className="">
//         <Navbar />
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <>
//                 <ScrollShowcase />
//                 <div id="about" className="relative z-[20] mt-[-5vh]">
//                   <About />
//                 </div>
//                 <ProgramDetail />
//                 <DownloadBrochure />
//               </>
//             }
//           />
//           <Route path="/events" element={<Events />} />
//           <Route path="/gallery" element={<Gallery />} />
//           <Route path="/contact" element={<Contact />} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;
import React, { useState } from 'react';

function App() {
  const [submittedData, setSubmittedData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const nameValue = form.name.value;
    const desValue = form.des.value;

    // Trim trailing spaces from URL (critical fix)
    const sheetUrl = 'https://script.google.com/macros/s/AKfycbzR7RrWVTKXB-OfnmsjDxTbUd_gFVR7iX7jv57SgXFossx12XwDpwEOwDr0Naj9DPAn/exec';

    setIsSubmitting(true); // Disable button + show loading state

    fetch(sheetUrl, {
      method: 'POST',
      body: `Name=${encodeURIComponent(nameValue)}&Des=${encodeURIComponent(desValue)}`
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        console.log('App Script Response:', data);

        if (data.status === 'success') {
          setSubmittedData(prev => [...prev, { name: nameValue, des: desValue }]);
          form.reset();
        } else {
          console.error('Submission Error from Server:', data.message);
          alert('Submission failed: ' + (data.message || 'Unknown error'));
        }
      })
      .catch(error => {
        console.error('Error with fetch:', error);
        alert('An error occurred while submitting. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false); // Re-enable button regardless of success/failure
      });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-white">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">React to Google Form</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            className="px-4 py-2 text-base border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <input
            type="text"
            name="des"
            placeholder="Enter description"
            className="px-4 py-2 text-base border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting} // Disable during submission
            className={`py-2 px-4 rounded text-white font-medium transition-colors ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Add Data'}
          </button>
        </form>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Submitted Entries:</h2>
          {submittedData.length > 0 ? (
            <ul className="space-y-2">
              {submittedData.map((data, index) => (
                <li key={index} className="p-2 bg-white rounded border">
                  <strong>Name:</strong> {data.name} • <strong>Description:</strong> {data.des}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No data submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;