
import "./styles.css";
import React, { useState, useEffect, useCallback } from "react";
import { RemoteRunnable } from "langchain/runnables/remote";
import PropTypes from "prop-types";
import axios from 'axios';
import Switch from '@mui/material/Switch';
import Highlighter from "react-highlight-words";
import LoginModal from "./login";
import { ClipLoader } from 'react-spinners';
import ReactGA from 'react-ga4';
ReactGA.initialize('G-CBKKVT259T');

import DesktopViewPrompt from './Desktopprompt';

function formatDate(dateString) {
  if (!dateString || isNaN(Date.parse(dateString))) {
    return dateString;
  }

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}


// const [keywo, setkeywo] = useState(null);
function ResultCard({ item, searchWords, scores, sortByCaseName }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [is1ModalOpen, set1ModalOpen] = useState(false);
  const [data, setData] = useState("");
  // const [words, setData] = useState("");
  // console.log(item)

  const { metadata } = item[1];
  // console.log(metadata)
  const { page_content } = item[1];
  // console.log(metadata)
  const score = item[0];
  // console.log("Score:", score);
  const [selectedReference, setSelectedReference] = useState('');
  // console.log("**********");
  // console.log(metadata);
  const partiesInvolved = Array.isArray(metadata["Parties Involved"])
    ? metadata["Parties Involved"].join(" vs. ")
    : metadata["Parties Involved"];
  // console.log(searchWords)

  const handleChange = (event) => {

    const url = event.target.value;
    const get = backend_url+`/get_index/${url}`
    // const get = `https://search-engine.lawyantra.com/get_index/${url}`


    // console.log(url)
    // console.log(get)
    // useEffect(() => {
    // Replace 'your-api-url' with the actual API URL you want to call
    axios.get(get)
      .then((response) => {
        setData(response.data);
        set1ModalOpen(true)
        // console.log(response.data)
      })
    // .catch((error) => {
    // setError(error); // Handle error
    // })
    // .finally(() => {
    // setLoading(false); // Always executed
    // });
    // }, []); 

    // setSelectedReference(url);
    // if (url) {
    // // Open the selected reference in a new tab
    // window.open(url, '_blank', 'noopener,noreferrer');
    // }
  };


  // function highlightText(text, wordsToHighlight) {
  // const regex = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');
  // const parts = text.split(regex);

  // return parts.map((part, i) => 
  // wordsToHighlight.includes(part.toLowerCase()) ? 
  // <span key={i} style={{ backgroundColor: 'yellow' }}>{part}</span> : 
  // part
  // );
  // }
  // console.log(score)
  // console.log(searchWords)
  // const searchRegex = new RegExp("\\b(" + searchWords.join("|") + ")\\b", "gi");
  const searchRegexes = searchWords.map(word => new RegExp(`\\b${word}\\b`, "gi"));
  // console.log(searchRegexes)
  const [firstword, ...others] = searchRegexes;
  // Check if both case summary and document summary are "Not found"
  if (metadata["Case Summary"] === "Not found" && metadata["Document Summary"] === "Not found") {
    return null; // Don't render the card
  }


  return (
    <div className="result-card">
      {sortByCaseName ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <h3 style={{ margin: 0 }}>{metadata["Case Name"]}</h3>
            {/* <h4 style={{ margin: 0 }}>{score + "%"}</h4> */}
            {/* <h4 style={{ margin: 0 }}>{score.includes("Relevant") ? "Relevant" : score + "%"}</h4> */}
          </div>
          {
            metadata["Date"] && metadata["Date"].trim() !== "" && ( // Check if Date is not empty or null
              <p>
                <strong>Date:</strong> {formatDate(metadata["Date"])}
              </p>
            )
          }
          {/* {
 (!metadata["Date"] || metadata["Date"].trim() === "") ? ( // Check if Date is null or empty
 <p>
 <strong>Date:</strong> {formatDate(metadata["Document Date"])}
 </p>
 ) : (
 <p>
 <strong>Date:</strong> {formatDate(metadata["Date"])}
 </p>
 )
 } */}
          {metadata["Parties Involved"] &&
            metadata["Parties Involved"].map((keyword, index) => (
              keyword === "" ? <p>
                <strong>Parties Involved:</strong> {keyword}
              </p> : <></>
            ))}

          {
            metadata["CourtName"] === "" ? <></> :
              <p>
                <strong>Court:</strong> {metadata["Court Name"]}
              </p>
          }

          {/* {metadata["Document Type"] &&
 metadata["Document Type"].map((keyword, index) => (
 keyword === "" ? <p>
 <strong>Document Type:</strong> {keyword}
 </p> : <></>
 ))} */}
          {/* {
 metadata["Case Summary"] === "Not found" ? (
 <div>
 <Highlighter
 highlightClassName="highlighted-text"
 searchWords={searchRegexes}
 textToHighlight={String(metadata["Document Summary"])}
 />
 </div>
 ) : (
 <Highlighter
 highlightClassName="highlighted-text"
 searchWords={searchRegexes}
 textToHighlight={String(metadata["Case Summary"])}
 />
 )
 } */}
          {
            ["Not found", "Not mentioned", "Not provided"].includes(metadata["Case Summary"]) ? (
              <div>
                <Highlighter
                  highlightClassName="highlighted-text"
                  searchWords={searchRegexes}
                  textToHighlight={String(metadata["Document Summary"])}
                />
              </div>
            ) : (
              <Highlighter
                highlightClassName="highlighted-text"
                searchWords={searchRegexes}
                textToHighlight={String(metadata["Case Summary"])}
              />
            )
          }
          <br />
          {metadata["case_url"] && (
            <div style={{ display: 'flex' }}>
              <a href={metadata["case_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}>
                <button style={{ width: '100%', textAlign: 'left' }}>
                  <strong>Case URL: {metadata["case_url"].substring(0, 100)}</strong>
                </button>
              </a>
            </div>
          )}
          {metadata["pdf_url"] && (
            <div style={{ display: "inline-flex" }}>
              <a href={metadata["pdf_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}>
                <button style={{ width: '100%', textAlign: 'left' }}>
                  <strong>Pdf URL: {metadata["pdf_url"].substring(0, 100)}</strong>
                </button>
              </a>
            </div>
          )}
          {metadata["url"] && (
            <div style={{ display: "inline-flex" }}>
              <a href={metadata["url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}>
                <button style={{ width: '100%', textAlign: 'left' }}>
                  <strong>URL: {metadata["url"].substring(0, 100)}</strong>
                </button>
              </a>
            </div>
          )}

          {metadata.Keywords && Array.isArray(metadata.Keywords) && metadata.Keywords.length > 0 && (
            <div className="keywords-container">
              {metadata.Keywords.map((keyword, index) => (
                keyword === "" ? null : (
                  <button
                    key={index}
                    className="keyword-button"
                    onClick={() => handleKeywordClick(keyword)}
                  >
                    {keyword}
                  </button>
                )
              ))}
            </div>
          )}


          {/* <div className="keywords-container">
 <select 
 className="reference-dropdown" 
 value={selectedReference} 
 onChange={handleChange}
 >
 <option value="">Select a Reference</option>
 {metadata.reference && metadata.reference.map((reference, index) => (
 reference !== "" && (
 <option key={index} value={reference}>
 {reference}
 </option>
 )
 ))}
 </select>
 </div> */}

          <br />

          <button onClick={() => setModalOpen(true)} className="view-document">
            View Summary
          </button>
          {isModalOpen && (
            <DocumentModal
              content={
                <>
                  {/* {page_content} */}
                  <Highlighter
                    highlightClassName="highlighted-text"
                    searchWords={searchRegexes}
                    // autoEscape={true}
                    textToHighlight={page_content + "\n\nDocument Type: " + metadata["Document Type"] + "\n\nJudges Involved: " + metadata["Judges"] + "\n\nKeywords: " + metadata["keywords"] + "\n\nPDF URL: " + metadata["pdf_url"] + "\n\nCase URL: " + metadata["case_url"]}
                  // textToHighlight={Object.entries(metadata).map(([key, value]) => `${key}: ${value}`).join('\n\n')}
                  />
                  <div>
                    {metadata.reference && metadata.reference.length > 0 && (
                      <select onChange={handleChange} value={selectedReference}>
                        <option value="">Select a reference</option>
                        {metadata.reference.map((referenceItem, index) => (
                          <option key={index} value={referenceItem}>
                            {referenceItem}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </>
              }
              onClose={() => setModalOpen(false)}
            />
          )}
          {is1ModalOpen && (

            <DocumentModal
              content={
                <>
                  {data.context}
                  <br /><br />
                  <a href={metadata["case_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '100%', textAlign: 'left' }}><strong>Case URL: {metadata["case_url"].substring(0, 100)}</strong></button></a>
                  <br /><br />

                  <a href={metadata["pdf_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '100%', textAlign: 'left' }}><strong>Pdf URL: {metadata["pdf_url"].substring(0, 100)}</strong></button></a>
                  <br /><br />

                  <a href={metadata["url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '100%', textAlign: 'left' }}><strong>URL: {metadata["url"].substring(0, 100)}</strong></button></a>
                  <br />

                </>
              }
              onClose={() => set1ModalOpen(false)}
            />
          )}
        </>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <h3 style={{ margin: 0 }}>{metadata["Case Name"]}</h3>
            {/* <h4 style={{ margin: 0 }}>{score + "%"}</h4> */}
            <h4 style={{ margin: 0 }}>{score.includes("Relevant") ? "Relevant" : score + "%"}</h4>
          </div>
          {
            metadata["Date"] && metadata["Date"].trim() !== "" && ( // Check if Date is not empty or null
              <p>
                <strong>Date:</strong> {formatDate(metadata["Date"])}
              </p>
            )
          }
          {
            // Check if "Parties Involved" is truly an array, has valid entries, and render them in a single line
            Array.isArray(metadata["Parties Involved"]) && metadata["Parties Involved"].length > 0 && (
              <p>
                <strong>Parties Involved:</strong> {metadata["Parties Involved"].filter(keyword => keyword.trim() !== "").join(", ")}
              </p>
            )
          }


          {
            metadata["CourtName"] === "" ? <></> :
              <p>
                <strong>Court:</strong> {metadata["Court Name"]}
              </p>
          }

          {/* {metadata["Document Type"] &&
            metadata["Document Type"].map((keyword, index) => (
            keyword === "" ? <p>
            <strong>Document Type:</strong> {keyword}
            </p> : <></>
            ))} */
          }
          {
            ["Not found", "Not mentioned", "Not provided"].includes(metadata["Case Summary"]) ? (
              <div>
                <Highlighter
                  highlightClassName="highlighted-text"
                  searchWords={searchRegexes}
                  textToHighlight={String(metadata["Document Summary"])}
                />
              </div>
            ) : (
              <Highlighter
                highlightClassName="highlighted-text"
                searchWords={searchRegexes}
                textToHighlight={String(metadata["Case Summary"])}
              />
            )
          }
          <br />
          {metadata["case_url"] && (
            <div style={{ display: 'flex' }}>
              <a href={metadata["case_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}>
                <button style={{ width: '100%', textAlign: 'left' }}>
                  <strong>Case URL: {metadata["case_url"].substring(0, 100)}</strong>
                </button>
              </a>
            </div>
          )}
          {metadata["pdf_url"] && (
            <div style={{ display: "inline-flex" }}>
              <a href={metadata["pdf_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}>
                <button style={{ width: '100%', textAlign: 'left' }}>
                  <strong>PDF URL: {metadata["pdf_url"].substring(0, 100)}</strong>
                </button>
              </a>
            </div>
          )}
          {metadata["url"] && (
            <div style={{ display: "inline-flex" }}>
              <a href={metadata["url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}>
                <button style={{ width: '100%', textAlign: 'left' }}>
                  <strong>URL: {metadata["url"].substring(0, 100)}</strong>
                </button>
              </a>
            </div>
          )}

          {metadata.Keywords && Array.isArray(metadata.Keywords) && metadata.Keywords.length > 0 && (
            <div className="keywords-container">
              {metadata.Keywords.map((keyword, index) => (
                keyword === "" ? null : (
                  <button
                    key={index}
                    className="keyword-button"
                    onClick={() => handleKeywordClick(keyword)}
                  >
                    {/* {keyword}
                     */}
                    <Highlighter
                      highlightClassName="highlighted-text"
                      searchWords={[firstword]}
                      textToHighlight={keyword}
                    />
                  </button>
                )
              ))}
            </div>
          )}


          {/* <div className="keywords-container">
 <select 
 className="reference-dropdown" 
 value={selectedReference} 
 onChange={handleChange}
 >
 <option value="">Select a Reference</option>
 {metadata.reference && metadata.reference.map((reference, index) => (
 reference !== "" && (
 <option key={index} value={reference}>
 {reference}
 </option>
 )
 ))}
 </select>
 </div> */}

          <br />

          <button onClick={() => setModalOpen(true)} className="view-document">
            View Summary
          </button>
          {isModalOpen && (
            <DocumentModal
              content={
                <>
                  {/* {page_content} */}
                  <Highlighter
                    highlightClassName="highlighted-text"
                    searchWords={searchRegexes}
                    // autoEscape={true}
                    textToHighlight={page_content + "\n\nDocument Type: " + metadata["Document Type"] + "\n\nJudges Involved: " + metadata["Judges"] + "\n\nKeywords: " + metadata["keywords"]}
                  // textToHighlight={Object.entries(metadata).map(([key, value]) => `${key}: ${value}`).join('\n\n')}
                  />
                  <div>
                    {metadata.reference && metadata.reference.length > 0 && (
                      <select onChange={handleChange} value={selectedReference}>
                        <option value="">Select a reference</option>
                        {metadata.reference.map((referenceItem, index) => (
                          <option key={index} value={referenceItem}>
                            {referenceItem}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </>
              }
              onClose={() => setModalOpen(false)}
            />
          )}
          {is1ModalOpen && (

            <DocumentModal
              content={
                <>
                  {data.context}
                  <br /><br />
                  <a href={metadata["case_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '100%', textAlign: 'left' }}><strong>Case URL: {metadata["case_url"].substring(0, 100)}</strong></button></a>
                  <br /><br />

                  <a href={metadata["pdf_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '100%', textAlign: 'left' }}><strong>Pdf URL: {metadata["pdf_url"].substring(0, 100)}</strong></button></a>
                  <br /><br />

                  <a href={metadata["url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '100%', textAlign: 'left' }}><strong>URL: {metadata["url"].substring(0, 100)}</strong></button></a>
                  <br />

                </>
              }
              onClose={() => set1ModalOpen(false)}
            />
          )}
        </>
      )}




    </div>


  );

}


function handleKeywordClick(keyword) {
  // console.log("Keyword clicked:", keyword);
  const newReference = event.target.value;
  setSelectedReference(newReference); // Update the selected reference state
  handleKeywordClick(newReference); // Trigger the desired action with the new reference

  // Add your logic here for what happens when a keyword is clicked
}

function DocumentModal({ content, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={onClose} className="close-modal">
          Close
        </button>
        <p>{content}</p>
      </div>
    </div>
  );
}

DocumentModal.propTypes = {
  content: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

ResultCard.propTypes = {
  item: PropTypes.shape({
    page_content: PropTypes.string.isRequired,
    metadata: PropTypes.shape({
      Date: PropTypes.string,
      "Parties Involved": PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]),
      "Case Name": PropTypes.string,
      "Court Name": PropTypes.string,
      "Document Type": PropTypes.string,
      "Case Summary": PropTypes.string,
      // "scores": PropTypes.string,
      Keywords: PropTypes.arrayOf(PropTypes.string), // Add this line
    }).isRequired,
  }).isRequired,

  // searchWords: PropTypes.shape({
  // Keywords: PropTypes.arrayOf(PropTypes.string), 
  // })
};

function App() {
  const [searchQuery, setSearchQuery] = useState(null);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [filters, setFilters] = useState({
  // icj: false,
  // un: false,
  // hudoc: false,
  // });
  // const [yearFilter, setYearFilter] = useState("all");
  const [uniqueKeywords, setUniqueKeywords] = useState([]);

  const [keywo, setkeywo] = useState("null");
  // console.log(uniqueKeywords);

  // const [selectedKeywords, setSelectedKeywords] = useState(new Set());
  const [results, setResults] = useState(null);
  const [originalResults, setOriginalResults] = useState(null); // Store the original results
  const [loading, setLoading] = useState();
  // const [score1, setScores] = useState(0);

  // const [inputValue, setInputValue] = useState('');
  const [uniqueDates, setUniqueDates] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [uniqueMonths, setUniqueMonths] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  // const [ipp, setIP] = useState("");

  const [uniqueParties, setUniqueParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);

  const [uniqueCourts, setUniqueCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);

  const [uniqueJudges, setUniqueJudges] = useState([]);
  const [selectedJudge, setSelectedJudge] = useState(null);

  const [uniqueDocumentTypes, setUniqueDocumentTypes] = useState([]);
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);


  const [selectedKeyword, setSelectedKeyword] = useState(null);

  const [suggestions, setSuggestions] = useState([]);
  const [sortByDate, setSortByDate] = useState(false); // State to track sorting mode
  const [groupedResults, setGroupedResults] = useState(null); // State to store grouped results

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [group, setGroup] = useState(null);
  const [gbyScore, setgbyscore] = useState(null);
  const [sortByCaseName, setSortByCaseName] = useState(false);

  const [sortDirection, setSortDirection] = useState("newer"); // Default to newer

  const [searchCount, setSearchCount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [location, setLocation] = useState("");
  const [ip, setIp] = useState("");

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || null);
    
  const [isVisible, setIsVisible] = useState(false);

  const [modalShow, setModalShow] = useState(true);

  const [s_name, sets_Name] = useState('');
  const [s_email, sets_Email] = useState('');
  const [s_phone, sets_Phone] = useState('');
  const [s_location, sets_Location] = useState('location');
  const [s_user_id, setUserid] = useState();

  const handleModalOpen = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);
  const backend_url= "https://bayvion.cloud"

//   const handleModalOpen = () => {
//     setModalShow(true);
//     document.body.classList.add('modal-open'); // Add the class to body
// };

// // Function to close the modal and re-enable background interaction
// const handleModalClose = () => {
//     // setModalShow(false);
//     document.body.classList.remove('modal-open'); // Remove the class from body
// };
  // function check(val){
  // if (val !== selectedDocumentType) {
  // const filteredVal = val.filter(item => item !== " ");

  // setSelectedDocumentType(filteredVal);
  // }

  // }

  // setShowLoginModal(true);
  // useEffect hook for sorting and filtering

  // const getData = async () => {
  //   const res = await axios.get("https://api.ipify.org/?format=json");
  //   console.log(res.data);
  //   setIP(res.data.ip);
  // };


  // useEffect(() => {
  //   //passing getData method to the lifecycle method
  //   getData();
  // }, []);
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);
  
  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      setModalShow(false)
      setUser(JSON.parse(userData));
      // if (userData) {
        sets_Name(userData.name)
        sets_Email(userData.email)
        sets_Phone(userData.phone)
        sets_Location(userData.location)
        setUserid(userData.user_id)
        // console.log(s_user_id, s_name, s_email, s_phone, s_location);
      }
      // setUser()
    // }
  },[]);

  const login = (userData) => {
    // sessionStorage.setItem('user', JSON.stringify(userData));
    // const login = (userData) => {
      console.log("dfghjkjhgfgdx : ",userData)
      sessionStorage.setItem('user', JSON.stringify(userData));
      ReactGA.event({
        category: 'User',
        action: 'User login'
      });
      // setUser(userData);
    
      setUser(userData);
  // 
    if (userData) {
      sets_Name(userData.name)
      sets_Email(userData.email)
      sets_Phone(userData.phone)
      sets_Location(userData.location)
      setUserid(userData.user_id)
      // setUserid(user.user_id)
      console.log(s_user_id, s_name, s_email, s_phone, s_location);
    }  
    handleModalClose();
  };

  const logoutUser = () => {
    sessionStorage.clear();
    setUser(null);

    ReactGA.event({
      category: 'User',
      action: 'User Logged out'
    });
    setModalShow(true)
    // setUser(true)
  };
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
    
    const user = JSON.parse(sessionStorage.getItem('user'));
    // console.log("usseerrrr: ", user);
    if (user) {
      sets_Name(user.name)
      sets_Email(user.email)
      sets_Phone(user.phone)
      sets_Location(user.location)
      setUserid(user.user_id)
      // console.log(s_user_id, s_name, s_email, s_phone, s_location);
    }
  }, []);


  useEffect(() => {

    // setShowLoginModal(true);
    if (originalResults) {
      const filteredResults = originalResults.filter(
        (item) =>
          (!selectedMonth || new Date(item[1].metadata.Date).toLocaleString('default', { month: 'long' }) === selectedMonth) &&
          (!selectedYear || item[1].metadata.Date.includes(selectedYear)) &&
          (!selectedParty || (item[1].metadata["Parties Involved"] && item[1].metadata["Parties Involved"].includes(selectedParty))) &&
          (!selectedCourt || (item[1].metadata["Court Name"] && item[1].metadata["Court Name"] === selectedCourt)) &&
          (!selectedJudge || item[1].metadata["Judges"] && item[1].metadata["Judges"].includes(selectedJudge)) &&
          (!selectedDocumentType || (Array.isArray(item[1].metadata["Document Type"]) && item[1].metadata["Document Type"].some(type => type === selectedDocumentType))) &&
          (!selectedKeyword || (item[1].metadata.Keywords && item[1].metadata.Keywords.includes(selectedKeyword)))
      );

      filteredResults.sort((a, b) => {
        const caseNameA = a[1].metadata["Case Name"] || '';
        const caseNameB = b[1].metadata["Case Name"] || '';

        if (sortByCaseName) {
          // Sort primarily by case name
          const countA = filteredResults.filter(item => item[1].metadata["Case Name"] === caseNameA).length;
          const countB = filteredResults.filter(item => item[1].metadata["Case Name"] === caseNameB).length;

          // If the counts are different, sort by count
          if (countA !== countB) {
            return countB - countA; // Descending order based on count
          }

          // If counts are the same, sort by case name
          return caseNameA.localeCompare(caseNameB);
        } else if (sortByDate) {
          // Sort by date based on sortDirection
          const dateA = new Date(a[1].metadata.Date);
          const dateB = new Date(b[1].metadata.Date);
          const sortFactor = sortDirection === "newer" ? -1 : 1; // Adjusts the sorting order based on the selected direction
          return sortFactor * (dateB - dateA);
        } else {
          // Sort by score if sortByDate and sortByCaseName are both false
          return Math.floor(b[0]) - Math.floor(a[0]);
        }
      });

      setResults(filteredResults);

      if (group) {
        const grouped = {};
        filteredResults.forEach((result) => {
          const score = Math.floor(result[0]);
          if (!grouped[score]) {
            grouped[score] = [];
          }
          grouped[score].push(result);
        });
        setGroupedResults(grouped);
      } else {
        setGroupedResults(null);
      }
    }
  }, [originalResults, selectedMonth, selectedYear, selectedParty, selectedCourt, selectedJudge, selectedDocumentType, selectedKeyword, sortByDate, sortByCaseName, group, sortDirection]);


  // useEffect(() => {

  // }, []);
  // Function to toggle sorting mode

  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth <= 768) {
            setIsVisible(true);  // Show prompt on mobile devices
        } else {
            setIsVisible(false);  // Hide prompt on desktops
        }
    };

    // Call the function on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
}, []);


  useEffect(() => {
    if (results && results.length > 0) {
      const allCaseNames = results.map(item => item[1].metadata["Case Name"] || "Not Available");
      setOpenAccordion(allCaseNames);
    }
  }, [results]);
  const toggleSortMode = () => {
    // If Group toggle is active, deactivate it
    if (group) {
      setGroup(false);
    }
    setSortByDate((prev) => !prev);
    // Reset the sort direction when toggling the sort mode
    setSortDirection("newer"); // Set the default sort direction
  };
  const togglegroupedMode = () => {
    setgroup((prev) => !prev);
    // If sortByDate toggle is active, deactivate it
    if (sortByDate) {
      setSortByDate(false);
    }
    // If sortByCaseName toggle is active, deactivate it
    else if (sortByCaseName) {
      setSortByCaseName(false);
    }
    setGroup((prev) => !prev);
  };
  const togglegroupedscoreMode = () => {
    setg((prev) => !prev);
  }
  const toggleSortByCaseName = () => {
    // If Group toggle is active, deactivate it
    if (group) {
      setGroup(false);
    }
    setSortByCaseName((prev) => !prev);
    setGroupedResults(null);
    // console.log("asasasasa",results)
    // results.forEach((item)=>{console.log("qwqw",item[1].metadata["Case Name"])})
  };

  const [openAccordion, setOpenAccordion] = useState([]);

  const toggleAccordion = (caseName) => {
    if (openAccordion.includes(caseName)) {
      setOpenAccordion(openAccordion.filter((item) => item !== caseName));
    } else {
      setOpenAccordion([...openAccordion, caseName]);
    }
  };

  // Modify the sorting logic based on the selected sort direction
  const sortDirectionFactor = sortDirection === "newer" ? 1 : -1; // Adjusts the sorting order based on the selected direction

  // Add a function to toggle the sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "newer" ? "older" : "newer");
  };

  // initialize maximum free searches
  // const MAX_FREE_SEARCHES = 5;

  const handleSearch = async () => {
    setSelectedMonth(null);
    setSelectedYear(null);
    setSelectedParty(null);
    setSelectedCourt(null);
    setSelectedJudge(null);
    setSelectedDocumentType(null);
    setSelectedKeyword(null);

    // Uncomment if need this function 
    // Check if the user has exceeded the allowed number of searches
    //  if (searchCount >= MAX_FREE_SEARCHES) {
    // //   // Open the login modal
    //   setShowLoginModal(true);
    //   return;
    // }

    setLoading(true);

    // Increment the search count
    // setSearchCount(prevCount => prevCount + 1);

    // Initialize the RemoteRunnable with your LangChain API endpoint
    // const chain = new RemoteRunnable({
    //   // url: `https://de7e-110-226-176-227.ngrok-free.app/chat`, // Replace with your actual API endpoint http://localhost:8081/chat
    //   // url: `https://yantra-api-gcp-image-fxhbdhovha-el.a.run.app/chat`
    //   // url: `https://search-engine.lawyantra.com/chat`
    //   url: `http://localhost:8000/chat`
    // });

    try {
      // const response = await axios.post('http://3.108.219.46/search', {
      const response = await axios.post(backend_url+'/search', { user_id: s_user_id, query: searchQuery, ip: ip, location: location });
      // const quer = await axios.post(backend_url+'/add_query', {query: searchQuery, ip:ipp});
      setLoading(true);
      // s
      ReactGA.event({
        category: 'User',
        action: 'searched for '+ searchQuery
      });
      // console.log("session :", s_name, s_email, s_phone, s_location);
      // console.log(response.data);
      // console.log("---------------------------");
      setResults(response.data[0]);
      setOriginalResults(response.data[0]); // Store the original results
      setkeywo(response.data[1]);
      if (results) {
        extractUniqueMonths(results);
        extractUniqueYears(results);
        extractUniqueCourts(results);
        extractUniqueParties(results);
        extractUniqueJudges(results);
        extractUniqueDocumentTypes(results);
        extractUniqueKeywords(results);
      }

    } catch (error) {
      setResults(null);
      setOriginalResults(null); // Reset original results
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false); // Stop loading

      // const resultsData = response.data[0]; // Assuming data structure matches your results
    }
  };

  // const handleLoginSuccess = () => {
  //   // Reset the search count after successful login
  //   setSearchCount(0);

  //   // Close the login modal
  //   setShowLoginModal(false);
  // };
  // useEffect(()=>{
  // if (results){
  // extractUniqueMonths(results);
  // extractUniqueYears(results);
  // extractUniqueCourts(results);
  // extractUniqueParties(results);
  // extractUniqueJudges(results);
  // extractUniqueDocumentTypes(results);
  // extractUniqueKeywords(results);
  // }
  // }, []);

  // useEffect(() => {
  //   handleSearch();
  // }, []);

  // const extractFilterValues = (results) => {
  // const dates = new Set(results.map((item) => item.Date));
  // setUniqueDates([...dates]);
  // const years = new Set(results.map((item) => item.Date.split('-')[0]));
  // // console.log(years)
  // setUniqueYears([...years]);

  // const parties = new Set(
  // results.flatMap((item) => item["Parties Involved"] || [])
  // );
  // setUniqueParties([...parties]);
  // const keywords = new Set(
  // results.flatMap((item) => item.Keywords || [])
  // );
  // setUniqueKeywords([...keywords]);
  // // ...Similarly extract values for other filters...
  // };

  // Fetch suggestions from the server

  function debounce(func, timeout = 10) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  const fetchSuggestions = useCallback((query) => {
    // Perform the fetch operation
    fetch(backend_url+'/suggest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: query }),
    })
      .then(response => response.json())
      .then(data => {
        // Assume the server response has a structure similar to the provided JSON and contains an array of suggestions
        // console.log(data);
        setSuggestions(data.next_words); // Update the state with the fetched suggestions
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  // Debounced version of fetchSuggestions
  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 10), []);

  // useEffect(() => {
  //   if (searchQuery.length > 2) {
  //     debouncedFetchSuggestions(searchQuery);
  //   } else {
  //     setSuggestions([]);
  //   }
  // }, [searchQuery, debouncedFetchSuggestions]);

  const extractUniqueMonths = (results) => {
    const months = new Set();
    results.forEach((item) => {
      let dateString = item[1].metadata["Date"]; // Initialize dateString with metadata["Date"]
      if (!dateString || dateString.trim() === "") { // If metadata["Date"] is null or empty
        dateString = item[1].metadata["Document Date"]; // Use metadata["Document Date"] instead
      }
      if (dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        months.add(month);
      }
    });
    setUniqueMonths([...months]);
  };

  const extractUniqueYears = (results) => {
    const years = new Set(results.map((item) => {
      const date = new Date(item[1].metadata.Date);
      return date.getFullYear();
    })
      .filter(year => !isNaN(year))
    );
    setUniqueYears([...years]);
  };

  const extractUniqueCourts = () => {
    const courts = new Set(results.map((item) => item[1].metadata["Court Name"])
      .filter(court => court !== "")
    );
    setUniqueCourts([...courts]);
  };

  const extractUniqueParties = () => {
    const parties = new Set(results.flatMap((item) => item[1].metadata["Parties Involved"] || [])
      .filter(party => party !== "")
    );
    setUniqueParties(Array.from(parties));
  };


  const extractUniqueJudges = () => {
    const judges = new Set(results.map((item) => item[1].metadata["Judges"]).flat());
    setUniqueJudges(Array.from(judges));
  };

  // Fetch unique document types
  const extractUniqueDocumentTypes = () => {
    const documentTypes = new Set(results
      .filter(item => Array.isArray(item[1].metadata["Document Type"]) && item[1].metadata["Document Type"].length > 0)
      .flatMap(item => item[1].metadata["Document Type"])
      .filter(type => typeof type === 'string' && type.trim() !== "")
    );
    setUniqueDocumentTypes(Array.from(documentTypes)); // Convert Set to Array
  };

  // Fetch unique keywords
  const extractUniqueKeywords = () => {
    const keywords = new Set(results.flatMap((item) => item[1].metadata.Keywords || [])
      .filter(keyword => keyword !== "")
    );
    setUniqueKeywords(Array.from(keywords)); // Convert Set to Array
  };

  // useEffect(() => {
  // if (results) {
  // extractUniqueMonths(results);
  // extractUniqueYears(results);
  // extractUniqueCourts(results);
  // extractUniqueParties(results);
  // extractUniqueJudges(results);
  // extractUniqueDocumentTypes(results);
  // extractUniqueKeywords(results);
  // }
  // }, [results]);



  return (
    <div className="main-container">
        <div>
      <DesktopViewPrompt />
      {/* Other components */}
    </div>

      {/* login */}
      {/* <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginSuccess}
      /> */}
      <div className="left-filters">
        <div>
        {user ? (
                <div>
                    <h1>Welcome, {user.name}!</h1>
                    <button onClick={logoutUser}>Logout</button>
                    {/* <LoginModal show={modalShow}  handleLogin={login} /> */}
       
                </div>
            ) : (
                <button onClick={handleModalOpen}>Open Login</button>
            )}
            {modalShow && <LoginModal show={modalShow}  handleLogin={login} />}
       
        </div>

        <div className="filter-title">Month</div>
        {/* Date Filters */}
        <select
          value={selectedMonth || ""}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Select Month</option>
          {uniqueMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        {/* ...other left-side filters if any... */}
        <div className="filter-title">Year</div>
        {/* Date Filters */}
        <select
          value={selectedYear || ""}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Select Year</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <div className="filter-title">Court Name</div>
        <select
          value={selectedCourt || ""}
          onChange={(e) => setSelectedCourt(e.target.value)}
        >
          <option value="">Select Court</option>
          {uniqueCourts.map((court) => (
            <option key={court} value={court}>
              {court}
            </option>
          ))}
        </select>

      </div>

      <div className="central-content">
        <div className="search-container">
          <h1>Human Rights Search</h1>
          {/* <p>ICC, ICJ, HUDOC/ECHR, UN</p> */}
          {/* Filter UI for Keywords */}
          <input id="querr"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 10)}
            // onChange={fetchSuggestions((e) => setSearchQuery(e.target.value))}. (Score: {suggestion.score})
            placeholder="Enter search query..."
            className="search-query"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSearchQuery(searchQuery + " " + suggestion.token);
                    // setShowSuggestions(true);
                  }}
                  onMouseDown={(e) => e.preventDefault()} // Prevent onBlur from firing on click
                >
                  {suggestion.token}
                </li>
              ))}
            </ul>
          )}

          {/* <ul>
 {suggestions.map((suggestion, index) => (<li key={index}>{suggestion.token}</li>))}
 </ul> */}
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
        {/* <div>Related Items: {keywo}</div> */}
        <div className="search-results">
          {loading ? (
            <div className='spinner'>
              <ClipLoader size={150} color={"#123abc"} loading={loading} />
            </div>
            // <div className="loading-bar">
            //   Loading...
            // </div>
          ) : (
            <div>
              {/* <button onClick={toggleSortMode} className="toggle-button">
 {sortByDate ? 'Sort by Score' : 'Sort by Date'}
 </button>
 <button onClick={togglegroupedMode} className="toggle-button">
 {group ? "Normal" : 'Sort by group'}
 </button> */}
              <div className="toggle">
                <div>
                  <label className="switch-label">Sort by Date</label>
                  <label className="switch">
                    <input type="checkbox" checked={sortByDate} onChange={toggleSortMode} />
                    <span className="slider round"></span>
                  </label>
                  {sortByDate && (
                    <div>
                      <button onClick={toggleSortDirection}>
                        {sortDirection === "newer" ? "Newer to Older" : "Older to Newer"}
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="switch-label">Sort by Case Name</label>
                  <label className="switch">
                    <input type="checkbox" checked={sortByCaseName} onChange={toggleSortByCaseName} />
                    <span className="slider round"></span>
                  </label>
                </div>
                {/* <div>
                  <label className="switch-label">Group by Score</label>
                  <label className="switch">
                    <input type="checkbox" checked={group} onChange={togglegroupedMode} />
                    <span className="slider round"></span>
                  </label>
                </div>*/}
              </div>

              {/* <Switch {...label} disabled defaultChecked >{sortByDate ? 'Sort by Score' : 'Sort by Date'}</Switch> */}

              {sortByCaseName ? (
                Object.values(
                  results.reduce((acc, item) => {
                    // const caseName = item[1].metadata["Case Name"] || "Not Available";
                    const caseName = (item[1].metadata["Case Name"] || "Not Available").replace(/\d+/g, '');
                    if (!acc[caseName]) {
                      acc[caseName] = {
                        caseName,
                        items: [],
                        isOpen: true,
                      };
                    }
                    acc[caseName].items.push(item);
                    return acc;
                  }, {})
                ).map((group, index) => (
                  <div key={group.caseName} style={{ backgroundColor: index % 2 === 0 ? '#db9797' : '#bbcb7f', marginBottom: index !== group.length - 1 ? '10px' : '0' }}>
                    <div className="accordion-header" onClick={() => toggleAccordion(group.caseName)} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                      <h4>{group.caseName}</h4>
                      <span className="accordion-toggle" style={{ fontSize: '3.5em', padding: '5' }}>
                        {openAccordion.includes(group.caseName) ? "-" : "+"}
                      </span>
                    </div>
                    {openAccordion.includes(group.caseName) && (
                      <div>
                        {group.items
                          .sort((a, b) => {
                            if (sortByDate) {
                              const dateA = new Date(a[1].metadata.Date);
                              const dateB = new Date(b[1].metadata.Date);
                              return sortDirectionFactor * (dateB - dateA); // Apply the sort direction factor
                            } else {
                              return 0; // No sorting if only sorting by case name
                            }
                          })
                          .map((iitem, iindex) => (
                            <div key={`${group.caseName}_${iindex}`} style={{ padding: '10px' }}>
                              <ResultCard
                                key={`${group.caseName}_${iindex}`}
                                item={iitem}
                                searchWords={keywo}
                                sortByCaseName={sortByCaseName}
                              />
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ))
              ) : groupedResults ? (
                Object.keys(groupedResults)
                  .sort((a, b) => parseInt(b) - parseInt(a))
                  .map((scoreGroup) => (
                    <div key={scoreGroup}>
                      <p>Score: {scoreGroup}%</p>
                      {groupedResults[scoreGroup]
                        .sort((a, b) => {
                          const dateA = new Date(a[1].metadata.Date);
                          const dateB = new Date(b[1].metadata.Date);
                          return dateB - dateA;
                        })
                        .map((item, index) => (
                          // <ResultCard key={index} item={item} searchWords={keywo} />
                          <ResultCard key={`${scoreGroup}_${index}`} item={item} searchWords={keywo} sortByCaseName={sortByCaseName} />
                        ))}
                    </div>
                  ))
              ) : (
                results &&
                (results.length > 0 ? (
                  results
                    .sort((a, b) => {
                      // Custom sorting function to place cards with case name "Not Available" at the bottom
                      const caseNameA = a[1].metadata["Case Name"] || '';
                      const caseNameB = b[1].metadata["Case Name"] || '';

                      // Compare case names
                      if (
                        (caseNameA === "Not Available" && caseNameB !== "Not Available") ||
                        (caseNameA === "" && caseNameB !== "") ||
                        (caseNameA === "Not found" && caseNameB !== "Not found") ||
                        (caseNameA === "Not mentioned" && caseNameB !== "Not mentioned")
                      ) {
                        return 1; // Place case name "Not Available" at the bottom
                      } else if (
                        (caseNameA !== "Not Available" && caseNameB === "Not Available") ||
                        (caseNameA !== "" && caseNameB === "") ||
                        (caseNameA !== "Not found" && caseNameB === "Not found") ||
                        (caseNameA !== "Not mentioned" && caseNameB === "Not mentioned")
                      ) {
                        return -1; // Place case name "Not Available" at the bottom
                      }

                      // Compare empty fields count
                      const getEmptyFieldsCount = (item) => {
                        let count = 0;
                        if (!item[1].metadata["Case Name"] || item[1].metadata["Case Name"] === "Not Available") count++;
                        if (!item[1].metadata["Case Summary"] || item[1].metadata["Case Summary"] === "Not Available") count++;
                        if (!item[1].metadata["Document Summary"] || item[1].metadata["Document Summary"] === "Not Available") count++;
                        if (!item[1].metadata["Case URL"]) count++;
                        if (!item[1].metadata["PDF URL"]) count++;
                        if (!item[1].metadata["URL"]) count++;
                        return count;
                      };

                      const emptyFieldsCountA = getEmptyFieldsCount(a);
                      const emptyFieldsCountB = getEmptyFieldsCount(b);

                      if (emptyFieldsCountA > emptyFieldsCountB) {
                        return 1; // Place item with more empty fields at the bottom
                      } else if (emptyFieldsCountA < emptyFieldsCountB) {
                        return -1; // Place item with fewer empty fields at the top
                      }

                      return 0; // Maintain original order if everything else is equal
                    })
                    .map((item, index) => (
                      <ResultCard
                        key={index}
                        item={item}
                        searchWords={keywo}
                        sortByCaseName={sortByCaseName}
                      />
                    ))
                ) : (
                  <p>
                    No cases found.
                  </p>
                ))
              )}
              {!groupedResults && !results && (
                <p>
                  No cases found.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="right-filters">
        <div className="filter-title">Parties Involved</div>
        <select
          value={selectedParty || ""}
          onChange={(e) => setSelectedParty(e.target.value)}
        >
          <option value="">Select Party</option>
          {uniqueParties.map((party) => (
            <option key={party} value={party}>
              {party}
            </option>
          ))}
        </select>
        {/* ...other right-side filters if any... */}
        {/* <div className="right-filters"> */}

        <div className="filter-title">Judge</div>
        <select
          value={selectedJudge || ""}
          onChange={(e) => setSelectedJudge(e.target.value)}
        >
          <option value="">Select Judge</option>
          {uniqueJudges.map((judge) => (
            <option key={judge} value={judge}>
              {judge}
            </option>
          ))}
        </select>

        <div className="filter-title">Document Type</div>
        <select
          value={selectedDocumentType || ""}
          onChange={(e) => setSelectedDocumentType(e.target.value)}
        >
          <option value="">Select Document Type</option>
          {uniqueDocumentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <div className="filter-title">Keyword</div>
        <select
          value={selectedKeyword || ""}
          onChange={(e) => setSelectedKeyword(e.target.value)}
        >
          <option value="">Select Keyword</option>
          {uniqueKeywords.map((keyword) => (
            <option key={keyword} value={keyword}>
              {keyword}
            </option>
          ))}
        </select>
        {/* ...other right-side filters if any... */}
        {/* </div> */}
      </div>


    </div>
  );
}

export default App;
