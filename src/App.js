import React, { useState, useEffect,useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './header';
import Home from './home_page';
// import AboutUs from './AboutUs';
import AboutUs from './aboutus';
import { ReactComponent as FeedbackIcon } from './feedback-icon.svg';
import Pricing from './Pricing';
import TermsnCondition from './terms';
import PrivacyPolicy from './privacy';
// import FeedbackIcon
import axios from 'axios';

import { ResultsContext } from "./resultContext";

import Search_content from './search'; // Import your Search_content component

function App() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [feedback_data, setFeedback_data] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const backend_url = "https://api.humanrightsdossier.com";
  const [s_name, sets_Name] = useState('');
  const [s_email, sets_Email] = useState('');
  const [s_phone, sets_Phone] = useState('');
  const [s_location, sets_Location] = useState('location');
  const [s_user_id, setUserid] = useState();
  // const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || null);
  const [ip, setIp] = useState("");
  
  const { results, setResults,user, setUser } = useContext(ResultsContext);
  const location = useLocation();
  const [showSearchContent, setShowSearchContent] = useState(true);

  const [location1, setLocation] = useState("");
  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      sets_Name(userData.name);
      sets_Email(userData.email);
      sets_Phone(userData.phone);
      sets_Location(userData.location);
      setUserid(userData.user_id);
    }
  }, []);
  useEffect(() => {
    // const userData = sessionStorage.getItem('user');
    if (user) {
      // setUser(JSON.parse(userData));
      console.log(user)
      sets_Name(user.name);
      sets_Email(user.email);
      sets_Phone(user.phone);
      sets_Location(user.location);
      setUserid(user.user_id);
    }
  }, []);
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('https://ipinfo.io?token=d30335213fcd76');
        setLocation(
          // ip: response.data.ip,
          response.data.city + " " + response.data.region + " " + response.data.country + " " + response.data.loc
        );
        setIp(response.data.ip)
      } catch (error) {
        setLocation(prevState => ({
          ...prevState,
          errorMessage: 'Error fetching IP information: ' + error.message
        }));
      }
    };

    fetchLocation();
    // console.log(location)

  }, []);
  useEffect(() => {
    if (location.pathname === '/') {
      setShowSearchContent(true);
    } else {
      setShowSearchContent(false);
    }
  }, [location.pathname]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const feedback = async () => {
    const userData = sessionStorage.getItem('user');
    if(userData){
       await axios.post(`${backend_url}/feedback`, { user_id: userData.user_id, query: feedback_data, ip: ip, location: location1 }).then(handleFeedback);
    }
    else{
      await axios.post(`${backend_url}/feedback`, { user_id: 99999999, query: feedback_data, ip: ip, location: location1 }).then(handleFeedback);
 
    }
    };

  const handleFeedback = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsCollapsed(true); // Collapse the form after a short delay
      setIsSubmitted(false); // Reset submission status
      setFeedback_data(''); // Clear feedback data
    }, 2000); // Display message for 2 seconds
  };

  return (
    <div>
      <Header />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<AboutUs />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="termsnconditions" element={<TermsnCondition />} />
        <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/*" element={<Home />} />
      </Routes>

      {showSearchContent && <Search_content />}

      {/* <footer>
        <span>
          <p>Lawyantra®</p>
        </span>
      </footer> */}
      <div className="feedback-wrapper">
        {isCollapsed ? (
          <div className="chatbot-icon" onClick={toggleCollapse}>
            <FeedbackIcon style={{ width: '50px', height: '50px' }} />
          </div>
        ) : (
          <div style={{ color: '#f8f8f8', backgroundColor: "#323232", width: "100%", borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }}>
            <div className="close-icon" style={{ padding: 5, alignContent: "start", borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }} onClick={toggleCollapse}>
              &#x2715;
            </div>
          </div>
        )}
        <div className={`card-container ${isCollapsed ? 'collapsed' : ''}`}>
          <div className="card-body">
            <div className={`collapsible-body ${isCollapsed ? 'collapsed' : ''}`}>
              <div className="bottom-input form-group">
                <textarea
                  className="form-control"
                  placeholder="Enter feedback..."
                  value={feedback_data}
                  onChange={(e) => setFeedback_data(e.target.value)}
                  rows="10"
                ></textarea>
              </div>
              <div style={{ paddingTop: '5px' }}>
                <button className="btn btn-primary submit-button" onClick={feedback}>
                  Submit
                </button>
                {isSubmitted && <div className="submission-message">Thanks for submission</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;