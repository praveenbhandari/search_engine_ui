import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
// import Search_content from './search';
import imag from './HRD.png'

import "./styles.css";
function AboutUs(
//     { 
//     user, 
//     avatarRef, 
//     toggleDropdown, 
//     toggleCollapse, 
//     dropdownRef,
//     dropdownPosition,
//     // feedback_data, 
//     // feedback, 
//     // isSubmitted, 
//     // setFeedback_data, 
//     // isCollapsed, 
//     dropdownOpen, 
//     // searchPerformed, 
//     // setSelectedYear, 
//     // setSelectedCourt, 
//     // setSelectedMonth, 
//     // setSelectedDocumentType, 
//     // setSelectedJudge, 
//     // setSelectedParty, 
//     // setSelectedKeyword, 
//     // sortDirection, 
//     // toggleAccordion, 
//     // openAccordion, 
//     // toggleSortDirection, 
//     // isLoggedIn, 
//     // results, 
//     // searchQuery, 
//     // handleKeyDown, 
//     // handleSearch, 
//     // loading, 
//     // showSuggestions, 
//     // modalShow, 
//     // setShowSuggestions, 
//     // suggestions, 
//     // setSearchQuery, 
//     // ClipLoader, 
//     // selectedParty, 
//     // uniqueParties, 
//     // uniqueCourts, 
//     // uniqueDocumentTypes, 
//     // uniqueJudges, 
//     // uniqueKeywords, 
//     // uniqueMonths, 
//     // uniqueYears, 
//     // selectedJudge, 
//     // selectedDocumentType, 
//     // selectedKeyword, 
//     // selectedMonth, 
//     // selectedCourt, 
//     // selectedYear, 
//     // LoginModal, 
//     // login, 
//     // sortByDate, 
//     // toggleSortMode, 
//     // sortByCaseName, 
//     // toggleSortByCaseName, 
//     // groupedResults, 
//     // ResultCard, 
//     // keywo 
// }
) {
    return (

        <div>
       



            <div style={{ paddingTop: '15px', overflowY: 'auto', maxHeight: 'calc(100vh - 80px)' }}>
                <div style={{ padding: '40px' }}>
                    <center>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '80px' }}>About Us</h1>
                    </center>
                    <h2 style={{ fontSize: '2rem',paddingLeft:'40px', paddingRight:'40px', fontWeight: 'bold', marginBottom: '20px' }}>Welcome to Human Rights Dossier!</h2>
                    <p style={{ fontSize: '1.2rem',paddingLeft:'40px', paddingRight:'40px', lineHeight: '1.6', marginBottom: '30px' }}>
                        Human Rights Dossier is a cutting-edge legal research platform powered by advanced AI, large language models, and optimized search techniques. Created by a team of engineers and legal experts, our platform revolutionizes the way lawyers access and analyze legal information in the field of human rights.
                    </p>

                    <h2 style={{ fontSize: '2rem',paddingLeft:'40px', paddingRight:'40px', fontWeight: 'bold', marginBottom: '20px' }}>Our Technological Innovation</h2>
                    <p style={{ fontSize: '1.2rem',paddingLeft:'40px', paddingRight:'40px', lineHeight: '1.6', marginBottom: '40px' }}>
                        At Human Rights Dossier, we leverage the latest advancements in artificial intelligence and natural language processing to deliver a state-of-the-art legal research experience. Our proprietary algorithms enable users to conduct complex searches, analyze legal documents, and extract valuable insights with unparalleled accuracy and efficiency.
                    </p>
                </div>
            </div>




            {/* <footer>
                <span>
                <Link to="/about-us">About us</Link> 
            <Link to="/contact-us">Contact us</Link>
            <Link to="/terms&ondition">Terms & Condition</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/cancelation&refund">Cancellation & Refund</Link>
                </span>
            </footer> */}


        </div>
    );
}

export default AboutUs;
