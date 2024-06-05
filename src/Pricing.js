import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
// import Search_content from './search';
import imag from './HRD.png'

import "./styles.css";
function Pricing({ user, avatarRef, toggleDropdown, toggleCollapse, feedback_data, feedback, isSubmitted, setFeedback_data, isCollapsed, dropdownOpen, searchPerformed, setSelectedYear, setSelectedCourt, setSelectedMonth, setSelectedDocumentType, setSelectedJudge, setSelectedParty, setSelectedKeyword, sortDirection, toggleAccordion, openAccordion, toggleSortDirection, isLoggedIn, results, searchQuery, handleKeyDown, handleSearch, loading, showSuggestions, modalShow, setShowSuggestions, suggestions, setSearchQuery, ClipLoader, selectedParty, uniqueParties, uniqueCourts, uniqueDocumentTypes, uniqueJudges, uniqueKeywords, uniqueMonths, uniqueYears, selectedJudge, selectedDocumentType, selectedKeyword, selectedMonth, selectedCourt, selectedYear, LoginModal, login, sortByDate, toggleSortMode, sortByCaseName, toggleSortByCaseName, groupedResults, ResultCard, keywo }) {
    return (
<div style={{ paddingTop: '70px', paddingLeft: '20px', paddingRight: '20px', overflowY: 'auto', maxHeight: 'calc(100vh - 80px)' }}>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
    <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', width: '600px' }}>
      <center>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>Pricing Details</h2>
      </center>
      <p style={{ marginBottom: '20px' }}>Join our beta testing program today and get early access to the actual product launch for just $5 per month!</p>
      
      <div style={{ lineHeight: '1.6', textAlign: 'justify' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Beta Testing Subscription</h3>
        <p style={{ marginBottom: '10px' }}><strong>Price:</strong> $4.99 per month</p>
        <p style={{ marginBottom: '10px' }}><strong>Benefits:</strong></p>
        <ul style={{ marginBottom: '20px' }}>
          <li>Early access to the actual product launch</li>
          <li>Exclusive access to beta features and updates</li>
          <li>Opportunity to provide feedback and shape the future of our platform</li>
        </ul>
        {/* <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>How to Subscribe</h3>
        <ol style={{ marginBottom: '20px' }}>
          <li>Visit our website and sign up for a beta testing subscription.</li>
          <li>Complete the payment process securely.</li>
          <li>Gain immediate access to our beta features and prepare for the official product launch.</li>
        </ol> */}
        <p style={{ marginBottom: '20px' }}><strong>Limited Time Offer:</strong> Hurry, this special beta testing offer won't last forever! Sign up now to secure your spot and be among the first to experience our innovative platform at the official launch.</p>
      <center><button style={{backgroundColor:'#0027B3',padding:'10px',color:"#f8f8f8",borderRadius:'10px'}}>Coming Soon</button></center> 
       </div>
    </div>
  </div>
</div>


    );
}

export default Pricing;
