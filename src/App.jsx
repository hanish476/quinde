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

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const form = event.target;
  //   const formData = new FormData(form);

  //   const formJson = Object.fromEntries(formData.entries());

  //   console.log('Form Submitted:', formJson);

  //   setSubmittedData(prevData => [...prevData, formJson]);

  //   form.reset();
  // };
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    // CRITICAL: Ensure form element names match the data you expect in App Script
    const nameValue = form.name.value;
    const desValue = form.des.value;

    const sheetUrl = 'https://script.google.com/macros/s/AKfycbzR7RrWVTKXB-OfnmsjDxTbUd_gFVR7iX7jv57SgXFossx12XwDpwEOwDr0Naj9DPAn/exec'

    fetch(sheetUrl, {
      method: "POST",
      // IMPORTANT: Use encodeURIComponent for data that might contain special characters (like spaces)
      body: `Name=${encodeURIComponent(nameValue)}&Des=${encodeURIComponent(desValue)}`
    })
      .then(response => {
        // App Script should return JSON now
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('App Script Response:', data);

        // CRITICAL FIX: Only add the data if the submission was successful
        if (data.status === 'success') {
          // Add the original data to the local state for display
          setSubmittedData(prevData => [...prevData, { name: nameValue, des: desValue }]);
          form.reset();
        } else {
          console.error('Submission Error from Server:', data.message);
        }
      })
      .catch(error => console.error('Error with fetch operation:', error.message));
  }

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div>
        <h1 className='text-2xl mb-4'>React to Form</h1>

        {/* Attach the handleSubmit function to the onSubmit event */}
        <form onSubmit={handleSubmit} className='flex gap-2 p-4 font-mono'>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            className='p-2 text-base ring-1 ring-blue-500 rounded'
            required
          />
          <input
            type="text"
            name="des"
            placeholder="Enter description"
            className='p-2 text-base ring-1 ring-blue-500 rounded'
            required
          />
          <button
            type='submit'
            className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
          >
            Add data
          </button>
        </form>

        {/* Display the submitted data */}
        <div className='mt-4 p-4 bg-gray-100 rounded'>
          <h2 className='text-xl'>Submitted Entries:</h2>
          {submittedData.length > 0 ? (
            <ul>
              {submittedData.map((data, index) => (
                <li key={index} className='mt-2'>
                  <strong>Name:</strong> {data.name}, <strong>Description:</strong> {data.des}
                </li>
              ))}
            </ul>
          ) : (
            <p>No data submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;