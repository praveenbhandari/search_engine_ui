// Routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import AboutUs from "./aboutus";
import Pricing from "./Pricing";
import TermsnCondition from "./TermsnCondition";
import PrivacyPolicy from "./PrivacyPolicy";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="contact-us" element={<AboutUs />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="termsnconditions" element={<TermsnCondition />} />
      <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;
