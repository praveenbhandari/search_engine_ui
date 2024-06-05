import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
// import Search_content from './search';
import img from './HRD.png'

import mumbai_maps from "./mumbai_11.png"
import "./styles.css";
function AboutUs
    (
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
        <div style={{ paddingTop: '70px', overflowY: 'auto', maxHeight: 'calc(130vh - 100px)', paddingLeft: '20px', paddingRight: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                {/* About Us Section */}
                <div style={{ flex: 2, padding: '20px', marginRight: '20px',height:'85vh', backgroundColor: '#f8f8f8', borderRadius: '10px' }}>
                    <div>
                        {/* <center> */}
                        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '50px' }}>About Us</h1>
                        
                        {/* </center> */}
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>Welcome to Human Rights Dossier!</h2>
                        <p style={{ fontSize: '1rem', marginBottom: '40px' }}>
                            Human Rights Dossier is a cutting-edge legal research platform powered by advanced AI, large language models, and optimized search techniques. Created by a team of engineers and legal experts, our platform revolutionizes the way lawyers access and analyze legal information in the field of human rights.
                        </p>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>Our Technological Innovation</h2>
                        <p style={{ fontSize: '1rem', marginBottom: '20px' }}>
                            At Human Rights Dossier, we leverage the latest advancements in artificial intelligence and natural language processing to deliver a state-of-the-art legal research experience. Our proprietary algorithms enable users to conduct complex searches, analyze legal documents, and extract valuable insights with unparalleled accuracy and efficiency.
                        </p>
                    </div>
                </div>



                {/* Contact Us Section */}
                <div style={{ flex: 1, padding: '20px', height:'85vh',backgroundColor: '#f8f8f8', borderRadius: '10px' }}>
                    {/* <center> */}
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '10px' }}>Contact Us</h1>
                    {/* </center> */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                        <div style={{ paddingBottom: '16px', }}>
                            <div style={{ display:'flex',justifyContent: 'center' }}>
                               <center> <img src={mumbai_maps} alt="Contact" style={{ marginTop:"5px",width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover', borderRadius: '10px' }} /></center>
                            </div>
                            <div style={{ marginBottom: '18px' }}>
                                <h2 style={{marginTop:'10px', fontSize: '1.2rem', marginBottom: '10px', fontWeight: 'bold', }}>Address</h2>
                                <p style={{ fontSize: '1rem' }}>EMPIRILEX PRIVATE LIMITED, 904, C-Wing,</p>
                                <p style={{ fontSize: '1rem' }}>Trace Center, Kamala Mills</p>
                                <p style={{ fontSize: '1rem' }}>Lower Parel, Mumbai - 400013</p>
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', }}>Email</h2>
                                <p><a href="mailto:contact-us@humanrightsdossier.com" style={{ color: '#007bff', textDecoration: 'none' }}>contact-us@humanrightsdossier.com</a></p>
                            </div>
                            <div>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', }}>Phone</h2>
                                <p style={{ fontSize: '1rem' }}>+91 93203 12014</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
