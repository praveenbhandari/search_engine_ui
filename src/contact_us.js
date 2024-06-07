import React from 'react';
// import { Link, Routes, Route } from 'react-router-dom';
// import Search_content from './search';
import imag from './HRD.png'
import GoogleMapReact from 'google-map-react';
import img from "./mumbai_maps.png"
const AnyReactComponent = ({ text }) => <div style={{ color: 'red' }}>{text}</div>;

import "./styles.css";


function ContactUs() {
  
  return (
<div style={{ paddingTop: '70px', overflowY: 'auto', maxHeight: 'calc(100vh - 80px)' }}>
  <center>
    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>Contact Us</h1>
  </center>

  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
    <div style={{ flex: 1, padding: '20px', maxWidth: '500px', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Address</h2>
        {/* <p>904, C-Wing, Trade Center,</p>
        <p>Kamala Mills, Lower parel,</p>
        <p> Mumbai-400013, India</p> */}
        <p>EMPIRILEX PRIVATE LIMITED, 111-B,</p>
        <p>MITTAL TOWER, 210 NARIMAN POINT</p>
        <p>Nariman Point Mumbai - 400021</p>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Email</h2>
        <p><a href="mailto:contact-us@humanrightsdossier.com" style={{ color: '#007bff', textDecoration: 'none' }}>contact-us@humanrightsdossier.com</a></p>
    
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Phone</h2>
        <p>+91 93203 12014</p>
      </div>
    </div>
    <div style={{ flex: 1, padding: '20px', maxWidth: '500px', boxSizing: 'border-box' }}>
      <img src={img} alt="Contact" style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover', borderRadius: '10px' }} />
    </div>
  </div>
</div>

  );
}

export default ContactUs;
