import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./App.js";
import AboutUs from "./aboutus";
import ContactUs from "./contact_us";
// import Layout from "./l";
import Footer from "./l";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App; // Ensure that App component is exported as default

