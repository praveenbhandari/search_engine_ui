
import "./styles.css";
import React, { useState, useEffect, useCallback, useRef } from "react";
// import { RemoteRunnable } from "langchain/runnables/remote";
import PropTypes from "prop-types";
import axios from 'axios';
// import Switch from '@mui/material/Switch';
import Highlighter from "react-highlight-words";
import LoginModal from "./login";
import imag from './HRD.png'
// import Lottie from "lottie-react";
import { ClipLoader } from 'react-spinners';
import ReactGA from 'react-ga4';
ReactGA.initialize('G-CBKKVT259T');
import { FocusOn } from 'react-focus-on';
// import PayPalButton from "./Pay_button";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import AboutUs from './aboutus';
// import PayPalBtn from "./payPalBtn";
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import button from 'react-bootstrap/Button';
// import RazorpayCheckout from 'react-native-razorpay';
// or less ideally
import { Button } from 'react-bootstrap';
import { ReactComponent as FeedbackIcon } from './feedback-icon.svg';
// import feed from "./"
// import Container from 'react-bootstrap/Container';
// import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
// import 'nextui/dist/index.css';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormGroup from '@mui/material/FormGroup';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';


// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
// import nopage from "./lottie/nopg.json";

import DesktopViewPrompt from './Desktopprompt';
import Feedback from "./feedback";
import Search_content from "./search";

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
    const get = backend_url + `/get_index/${url}`
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
            <strong><h3 style={{ margin: 0 }}>{metadata["Case Name"]}</h3></strong>
            {
              metadata["Date"] && metadata["Date"].trim() !== "" && ( // Check if Date is not empty or null
                <p>
                  <strong>Date:</strong> {formatDate(metadata["Date"])}
                </p>
              )
            }
          </div>

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
                <div className="result-content"><strong>Parties Involved:</strong> {keyword}</div>
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
                  // onClick={() => handleKeywordClick(keyword)}
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
                  {{ 'page': page_content, 'meta': metadata }}
                  {/* <Highlighter
                    highlightClassName="highlighted-text"
                    searchWords={searchRegexes}
                    // autoEscape={true}
                    textToHighlight={page_content + "\n\nDocument Type: " + metadata["Document Type"] + "\n\nJudges Involved: " + metadata["Judges"] + "\n\nKeywords: " + metadata["keywords"] + "\n\nPDF URL: " + metadata["pdf_url"] + "\n\nCase URL: " + metadata["case_url"]}
                  // textToHighlight={Object.entries(metadata).map(([key, value]) => `${key}: ${value}`).join('\n\n')}
                  /> */}
                  {/* <div>
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
                  </div> */}
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
                  {/* <br /><br />
                  <a href={metadata["case_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '100%', textAlign: 'left' }}><strong>Case URL: {metadata["case_url"].substring(0, 100)}</strong></button></a>
                  <br /><br />

                  <a href={metadata["pdf_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '100%', textAlign: 'left' }}><strong>Pdf URL: {metadata["pdf_url"].substring(0, 100)}</strong></button></a>
                  <br /><br />

                  <a href={metadata["url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '100%', textAlign: 'left' }}><strong>URL: {metadata["url"].substring(0, 100)}</strong></button></a>
                  <br /> */}

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
            {/* <h4 style={{ margin: 0 }}>{score.includes("Relevant") ? "Relevant" : score + "%"}</h4> */}
            {
              metadata["Date"] && metadata["Date"].trim() !== "" && ( // Check if Date is not empty or null
                <h4 style={{ margin: 0, marginTop: 0, paddingBottom: '15px' }}>
                  <center> <strong>Date:</strong> {formatDate(metadata["Date"])}</center>
                </h4>
              )
            }
          </div>

          {

            Array.isArray(metadata["Parties Involved"]) && metadata["Parties Involved"].length > 0 && (
              <div className="result-content">
                <strong>Parties Involved:</strong> {metadata["Parties Involved"].filter(keyword => keyword.trim() !== "").join(", ")}
              </div>

            )

          }


          {

            metadata["CourtName"] === "" ? <></> :
              <p>
                <div className="result-content">   <strong>Court:</strong> {metadata["Court Name"]}</div>
              </p>}


          {/* {metadata["Document Type"] &&
            metadata["Document Type"].map((keyword, index) => (
            keyword === "" ? <p>
            <strong>Document Type:</strong> {keyword}
            </p> : <></>
            ))} */
          }
          {
            <div className="result-content">
              <strong> Short Summary:</strong>
              {["Not found", "Not mentioned", "Not provided"].includes(metadata["Case Summary"]) ? (
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
              )}</div>
          }
          {/* <br /> */}
          {metadata["case_url"] && (
            <div style={{ display: 'flex' }}>
              <a href={metadata["case_url"]} target="_blank" style={{ background: "#ffff", color: "blue", textDecoration: "underline" }}>
                <button
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    userSelect: 'none', /* Prevent text selection */
                    MozUserSelect: 'none',
                    WebkitUserSelect: 'none',
                    msUserSelect: 'none'
                  }}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default link behavior
                    setModalOpen(true)// Call your custom function
                  }}
                >
                  <strong>Case URL: {metadata["case_url"].substring(0, 100)}</strong>
                </button>
              </a>
            </div>

          )}
          {metadata["pdf_url"] && (
            <div style={{ display: "inline-flex" }}>
              <a href={metadata["pdf_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}>
                <button
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    userSelect: 'none', /* Prevent text selection */
                    MozUserSelect: 'none',
                    WebkitUserSelect: 'none',
                    msUserSelect: 'none'
                  }}
                >
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
          <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
            <div className="keywords-container" style={{ flexWrap: 'wrap', maxWidth: '80%' }}>
              {metadata.Keywords && Array.isArray(metadata.Keywords) && metadata.Keywords.length > 0 && (
                metadata.Keywords.map((keyword, index) => (
                  keyword === "" ? null : (
                    <button
                      key={index}
                      className="keyword-button"
                    // onClick={() => handleKeywordClick(keyword)}
                    >
                      {/* {keyword} */}
                      <Highlighter
                        highlightClassName="highlighted-text"
                        searchWords={[firstword]}
                        textToHighlight={keyword}
                      />
                    </button>
                  )
                ))
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', height: '40px' }}>
              <button
                onClick={() => setModalOpen(true)}
                className="view-document"
                style={{
                  height: '100%',
                  fontSize: '16px', // Adjust the font size as needed
                  lineHeight: '40px', // Match the height of the container
                  padding: '0 16px', // Add horizontal padding as needed
                }}
              >
                Continue Reading
              </button>
            </div>
          </div>
          {isModalOpen && (
            <DocumentModal
              content={
                <>
                  {{ 'page': page_content, 'meta': metadata }}
                  {/* <Highlighter
                    highlightClassName="highlighted-text"
                    searchWords={searchRegexes}
                    // autoEscape={true}
                    textToHighlight= {{ 'page': page_content, 'meta': metadata }}
                    // textToHighlight={page_content + "\n\nDocument Type: " + metadata["Document Type"] + "\n\nJudges Involved: " + metadata["Judges"] + "\n\nKeywords: " + metadata["keywords"]}
                  // textToHighlight={Object.entries(metadata).map(([key, value]) => `${key}: ${value}`).join('\n\n')}
                  /> */}
                  {/* <div>
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
                  </div> */}
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
                  {/* <br /><br />
                  <a href={metadata["case_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '100%', textAlign: 'left' }}><strong>Case URL: {metadata["case_url"].substring(0, 100)}</strong></button></a>
                  <br /><br />

                  <a href={metadata["pdf_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '100%', textAlign: 'left' }}><strong>Pdf URL: {metadata["pdf_url"].substring(0, 100)}</strong></button></a>
                  <br /><br />

                  <a href={metadata["url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '100%', textAlign: 'left' }}><strong>URL: {metadata["url"].substring(0, 100)}</strong></button></a>
                  <br /> */}

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
  let parsedData, parsedMeta;
  // const content1='{\"Court/Tribunal\": \"International Court of Justice (ICJ)\", \"Judges Involved\": \"President Manfred LACHS, Registrar S. AQUARONE\", \"Legal Principles\": \"Article 48 of the Statute of the Court, Article 40 of the Rules of Court\", \"Full Case Overview\": \"- In May 1973, Pakistan instituted proceedings against India concerning 195 Pakistani prisoners of war whom, according to Pakistan, India proposed to hand over to Bangladesh, which was said to intend trying them for acts of genocide and crimes against humanity. India stated that there was no legal basis for the Court\'s jurisdiction in the matter and that Pakistan\'s Application was without legal effect. Pakistan having also filed a Request for the indication of provisional measures, the Court held public sittings to hear observations on this subject; India was not represented at the hearings. In July 1973, Pakistan asked the Court to postpone further consideration of its Request in order to facilitate the negotiations which were due to begin. Before any written pleadings had been filed, Pakistan informed the Court that negotiations had taken place, and requested the Court to record discontinuance of the proceedings. Accordingly, the case was removed from the List by an Order of 15 December 1973.\", \"Case Summary\": \"- Introduction: The ICJ issued an order regarding the trial of Pakistani prisoners of war in a case between Pakistan and India.\\n- Laws: The order extended the time limits for filing memorials by both governments.\\n-\", \"Conclusion\": \"The subsequent procedure was reserved for further decision.\", \"Document Summary\": \"The ICJ issued an order on 29 September 1973 in the case concerning the trial of Pakistani prisoners of war between Pakistan and India, extending filing deadlines for memorials.\", \"Decision\": \"The Court extended the time limits for filing memorials by the governments of Pakistan and India.\\nConclusion: The ICJ granted an extension for filing memorials in the case between Pakistan and India regarding the trial of Pakistani prisoners of war.\", \"Document Type\": \"Press Release (Unofficial)\", \"Date\": \"29 September 1973\", \"Case No.\": \"Not Found\", \"History of Proceedings\": \"The ICJ extended the filing deadlines for memorials by the governments of Pakistan and India in the case concerning the trial of Pakistani prisoners of war.\", \"Coram Composition\": \"President Manfred LACHS, Registrar S. AQUARONE\", \"Citation\": \"Trial of Pakistani Prisoners of War, Order of 29 September 1973, Z.C.J. Reports 1973, p. 344.\", \"Document type\": \"Summary of Judgement- Unofficial\", \"Document No.\": \"Summary 1973/1\", \"Keywords\": \"International Court of Justice, Pakistani prisoners of war, filing deadlines, memorials\", \"Case Details\": \"- Introduction\\n    A. Factual background: The ICJ issued an order regarding the trial of Pakistani prisoners of war in a case between Pakistan and India.\\n    B. The court\'s appellate function and the scope of the right of appeal to the court: Not Found\\n- Grounds of Appeal\\n    A. The second ground of appeal: rejection by the ICAO Council of the first preliminary objection.\\n        1. Whether the dispute between the Parties relates to the interpretation or application of the IASTA: Not Found\", \"Separate Opinion of Judge\": \"Not Found\", \"Articles Involved\": \"Article 48 of the Statute of the Court, Article 40 of the Rules of Court\"}'

  console.log(content)
  try {
    parsedData = JSON.parse(content.props.children.page);

    console.log("parsee....", parsedData)
    parsedMeta = content.props.children.meta;

    // console.log(parsedMeta)
    // console.log("resss ... : ", parsedData)
  } catch (error) {
    console.error('Error parsing JSON:', error);
    parsedData = { error: 'Invalid JSON' };
  }

  const formatValue = (value) => {
    if (typeof value === 'string') {
      return value.split('\n').map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ));
    }
    return JSON.stringify(value, null, 4);
  };
  const [expanded, setExpanded] = useState(false);

  // const handleScroll = (event) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  // };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (document && document.addEventListener) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (document && document.removeEventListener) {
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop">
      <FocusOn enabled={true}>
        <div className="modal-content">
          <button onClick={onClose} className="close-modal">
            Close
          </button>
          <div className="summary-header">
            <strong>Summary</strong>
          </div>
          <div className="modal-body">
            {Object.keys(parsedData).map((key) => (
              <div key={key} className="key-value-pair">
                <div className="key" style={{ fontWeight: 'bold' }}>{key}:</div>
                <div className="value">
                  {key === 'Full Case Overview' && !expanded ? (
                    <button onClick={() => setExpanded(true)}>Expand</button>
                  ) : (
                    <span>{formatValue(parsedData[key])}</span>
                  )}
                </div>
              </div>
            ))}
            {expanded && (
              <button onClick={() => setExpanded(false)}>Collapse</button>
            )}
            <div className="meta-section">
              {parsedMeta.case_url && (
                <div className="key-value-pair">
                  <div className="key" style={{ fontWeight: 'bold' }}>Case URL:</div>
                  <div className="value"><a href={parsedMeta.case_url} target="_blank" rel="noopener noreferrer">{parsedMeta.case_url}</a></div>
                </div>
              )}
              {parsedMeta.pdf_url && (
                <div className="key-value-pair">
                  <div className="key" style={{ fontWeight: 'bold' }}>PDF URL:</div>
                  <div className="value"><a href={parsedMeta.pdf_url} target="_blank" rel="noopener noreferrer">{parsedMeta.pdf_url}</a></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </FocusOn>
    </div>

  );
}

// DocumentModal.propTypes = {
//   content: PropTypes.string.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

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
const paypalSubscribe = (data, actions) => {
  return actions.subscription.create({
    'plan_id': 'P-8R920298L5863443KMZMWUMI',
  });
};
const paypalOnError = (err) => {
  console.log("Error")
}
const paypalOnApprove = (data, detail) => {
  // call the backend api to store transaction details
  console.log("Payapl approved")
  console.log(data.subscriptionID)
};
function App() {

  // import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

  // export default function App() {
  const initialOptions = {
    clientId: "AbCLixrKCGX9mnyIbzWDdSfagpOl4nJ1JtepgdrhybJd53GoIVCcIQuTARiQhmuiyAC49S164GvNXHsz",
    // Add other options as needed
  };
  //     return (
  //         <div className="App">
  //             <PayPalScriptProvider options={initialOptions}>
  //                 <PayPalButtons />
  //             </PayPalScriptProvider>
  //         </div>
  //     );
  // }

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
  const [searchPerformed, setSearchPerformed] = useState(false);
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

  const [modalShow, setModalShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [s_name, sets_Name] = useState('');
  const [s_email, sets_Email] = useState('');
  const [s_phone, sets_Phone] = useState('');
  const [s_location, sets_Location] = useState('location');
  const [s_user_id, setUserid] = useState();
  const [feedback_data, setFeedback_data] = useState(null);

  const handleModalOpen = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);
  // const backend_url = "http://127.0.0.1:8000"
  const backend_url = "https://api.humanrightsdossier.com"


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
  }, []);

  const login = (userData) => {
    // sessionStorage.setItem('user', JSON.stringify(userData));
    // const login = (userData) => {
    console.log("dfghjkjhgfgdx : ", userData)
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
    setResults(null)
    // extractUniqueMonths(null);
    // extractUniqueYears(null);
    // extractUniqueCourts(null);
    // extractUniqueParties(null);
    // extractUniqueJudges(null);
    // extractUniqueDocumentTypes(null);
    // extractUniqueKeywords(null);
    ReactGA.event({
      category: 'User',
      action: 'User Logged out'
    });
    // setModalShow(true)
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
  const TextFormatter = ({ text }) => {
    const formatText = (text) => {
      return text.split(/\*\*(.*?)\*\*/g).map((part, index) => {
        if (index % 2 === 0) {
          return part.split('\n').map((line, index) => <span key={index}>{line}<br /></span>);
        } else {
          return <strong key={index}>{part}</strong>;
        }
      });
    };

    return <div>{formatText(text)}</div>;
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
    setSortByDate(true)
    setSortDirection(sortDirection === "newer" ? "older" : "newer");
  };

  // initialize maximum free searches
  // const MAX_FREE_SEARCHES = 5;

  const handleSearch = async () => {
    if (user == null) {

      setModalShow(true)
    }
    else if (user != null) {
      // setSelectedMonth(results);
      // setSelectedYear(results);
      // setSelectedParty(results);
      // setSelectedCourt(results);
      // setSelectedJudge(results);
      // setSelectedDocumentType(results);
      // setSelectedKeyword(results);

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
        console.log({ user_id: s_user_id, query: searchQuery, ip: ip, location: location })
        const response = await axios.post(backend_url + '/search', { user_id: s_user_id, query: searchQuery, ip: ip, location: location });
        // const quer = await axios.post(backend_url+'/add_query', {query: searchQuery, ip:ipp});
        setLoading(true);
        setSearchPerformed(true)
        // s
        ReactGA.event({
          category: 'User',
          action: 'searched for ' + searchQuery
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
    fetch(backend_url + '/suggest', {
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
    // console.log(months)
    setUniqueMonths([...months]);
  };

  const extractUniqueYears = (results) => {
    const years = new Set(results.map((item) => {
      const date = new Date(item[1].metadata.Date);
      return date.getFullYear();
    })
      .filter(year => !isNaN(year))
    );

    // console.log(years)
    setUniqueYears([...years]);
  };

  const extractUniqueCourts = () => {
    const courts = new Set(results.map((item) => item[1].metadata["Court Name"])
      .filter(court => court !== "")
    );

    // console.log(courts)
    setUniqueCourts([...courts]);
  };

  const extractUniqueParties = () => {
    const parties = new Set(results.flatMap((item) => item[1].metadata["Parties Involved"] || [])
      .filter(party => party !== "")
    );

    // console.log(parties)
    setUniqueParties(Array.from(parties));
  };


  const extractUniqueJudges = () => {
    const judges = new Set(results.map((item) => item[1].metadata["Judges"]).flat());

    // console.log(judges)
    setUniqueJudges(Array.from(judges));
  };

  // Fetch unique document types
  const extractUniqueDocumentTypes = () => {
    const documentTypes = new Set(results
      .filter(item => Array.isArray(item[1].metadata["Document Type"]) && item[1].metadata["Document Type"].length > 0)
      .flatMap(item => item[1].metadata["Document Type"])
      .filter(type => typeof type === 'string' && type.trim() !== "")
    );

    // console.log(documentTypes)
    setUniqueDocumentTypes(Array.from(documentTypes)); // Convert Set to Array
  };

  // Fetch unique keywords
  const extractUniqueKeywords = () => {
    const keywords = new Set(results.flatMap((item) => item[1].metadata.Keywords || [])
      .filter(keyword => keyword !== "")
    );

    // console.log(keywords)
    setUniqueKeywords(Array.from(keywords)); // Convert Set to Array
  };

  useEffect(() => {
    console.log(results)
    if (results) {
      extractUniqueMonths(results);
      extractUniqueYears(results);
      extractUniqueCourts(results);
      extractUniqueParties(results);
      extractUniqueJudges(results);
      extractUniqueDocumentTypes(results);
      extractUniqueKeywords(results);
    }
  }, [results]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Prevent the default behavior of form submission
      event.preventDefault();
      // Call the onSearch function with the current query
      handleSearch()
    }
  }; const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const avatarRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  // const [feedback_data, setFeedback_data] = useState('');

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      avatarRef.current &&
      !avatarRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      const rect = avatarRef.current.getBoundingClientRect();
      const dropdownWidth = 160; // approximate width of the dropdown
      const dropdownHeight = 100; // approximate height of the dropdown

      let newPosition = {};

      if (rect.left + dropdownWidth > window.innerWidth) {
        newPosition.left = window.innerWidth - dropdownWidth - 10; // 10px for padding
      } else {
        newPosition.left = rect.left;
      }

      if (rect.top + dropdownHeight + 40 > window.innerHeight) { // 40px for the avatar height and padding
        newPosition.top = rect.top - dropdownHeight - 10;
      } else {
        newPosition.top = rect.top + 40;
      }

      setDropdownPosition(newPosition);

      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);
  // const [isCollapsed, setIsCollapsed] = useState(true);
  // const [feedbackData, setFeedbackData] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const feedback = async () => {
    await axios.post(backend_url + '/feedback', { user_id: s_user_id, query: feedback_data, ip: ip, location: location }).then(handleFeedback);

  }
  // var instance = new Razorpay({ key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_SECRET' })

  // const pay=()=>{
  // //   <TouchableHighlight onPress={() => {
  // //     var options = {
  // //     description: 'Credits towards consultation',
  // //     image: 'https://i.imgur.com/3g7nmJC.jpg',
  // //     currency: 'INR',
  // //     key: '<YOUR_KEY_ID>',
  // //     amount: '5000',
  // //     name: 'Acme Corp',
  // //     order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
  // //     prefill: {
  // //       email: 'gaurav.kumar@example.com',
  // //       contact: '9191919191',
  // //       name: 'Gaurav Kumar'
  // //     },
  // //     theme: {color: '#53a20e'}
  // //   }
  // //   RazorpayCheckout.open(options).then((data) => {
  // //     // handle success
  // //     alert(`Success: ${data.razorpay_payment_id}`);
  // //   }).catch((error) => {
  // //     // handle failure
  // //     alert(`Error: ${error.code} | ${error.description}`);
  // //   });
  // // }}/>
  // }
  const handleFeedback = () => {
    // Handle the feedback submission logic here
    setIsSubmitted(true);
    setTimeout(() => {
      setIsCollapsed(true); // Collapse the form after a short delay
      setIsSubmitted(false); // Reset submission status
      setFeedback_data(''); // Clear feedback data
    }, 2000); // Display message for 2 seconds
  };


  const createOrder = async () => {
    try {
      const response = await fetch("/my-server/create-paypal-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: [{ id: "11", quantity: "21" }],
        }),
      });

      const orderData = await response.json();

      if (!orderData.id) {
        const errorDetail = orderData.details[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : "Unexpected error occurred, please try again.";

        throw new Error(errorMessage);
      }

      return orderData.id;

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const onApprove = async (data) => {
    // Capture the funds from the transaction.
    const response = await fetch("/my-server/capture-paypal-order", {
      method: "POST",
      body: JSON.stringify({
        orderID: data.orderID
      })
    });

    const details = await response.json();

    // Show success message to buyer
    console.log(details)
    // console.log()
    alert(`Transaction completed by ${details.payer.name.given_name}`);
  }


  // const pay_s=(){

  // }



  return (
    <BrowserRouter>
      <div>
        <div>
          <DesktopViewPrompt />
        </div>

        <header className="text-gray-400 bg-#EBEBEB body-font" style={{ position: 'fixed', width: '100%', justifyContent: 'space-between', padding: '0 20px', backgroundColor: '#ebebeb', zIndex: 9999 }}>
          <div className="mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center justify-between" style={{ zIndex: 9999 }}>
            {/* Logo */}
            {results && (
              <div className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                <img src={imag} alt="My Image" style={{ width: 'auto', height: '50px' }} onClick={() => { setResults(null) }} />
              </div>
            )}

            {/* Menu or User Actions */}
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-gray-700 flex flex-wrap items-center text-base justify-center">
              {/* Add menu items here if needed */}
            </nav>

            {/* User Login/Logout */}
            {/* <div style={{ display: 'flex', alignItems: 'center' }}>
            {user ? (
              <div className="text-gray-900 mr-2">Welcome, {user.name}!</div>
            ) : (
              <button onClick={handleModalOpen} className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-green-700 rounded text-base mt-4 md:mt-0">
                Login
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            )}

            {user && (
              <button onClick={logoutUser} className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-red-700 rounded text-white mt-2 md:mt-0">
                Logout
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            )}
          </div> */}

            <div style={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 9999 }}>
              {user ? (
                <div className="relative">
                  <div
                    ref={avatarRef}
                    className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  {dropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="fixed w-40 bg-white border rounded-lg shadow-lg"
                      style={{ top: dropdownPosition.top, left: dropdownPosition.left, zIndex: 1000 }}
                    >
                      <div>
                        <div className="text-gray-900 p-2">Welcome {user.name}</div>
                      </div>
                      <div >
                        <button
                          onClick={logoutUser}
                          className=" px-2 py-1 flex items-center justify-between border rounded-b-lg bg-red-600 focus:outline-none hover:bg-red-700 text-white w-full"
                        //  style={{ padding: '0', borderRadius: '0 0 10px 10px' }}
                        >
                          Logout
                          <div >
                            <svg width="26" height="15" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M18.5478 19.2357C18.5527 18.6014 18.138 18.1612 17.5628 18.1676C16.9974 18.174 16.6008 18.6092 16.5979 19.2328C16.5949 19.8021 16.5979 20.3719 16.5969 20.9412C16.5949 22.2245 15.7743 23.0461 14.4909 23.0466C11.3261 23.0476 8.16081 23.0476 4.996 23.0466C3.6975 23.0466 2.87781 22.2274 2.87781 20.9289C2.87732 15.308 2.87732 9.68702 2.87781 4.06606C2.87781 2.78272 3.69995 1.9601 4.98279 1.95961C8.15592 1.95863 11.329 1.95814 14.5022 1.95961C15.7689 1.9601 16.5935 2.78615 16.5969 4.05188C16.5984 4.66175 16.5881 5.27212 16.6018 5.882C16.614 6.42732 17.0449 6.83912 17.5741 6.83863C18.1032 6.83863 18.5366 6.42683 18.5449 5.88102C18.5561 5.14105 18.5693 4.39961 18.5361 3.66061C18.4632 2.02319 17.2498 0.550088 15.6569 0.15198C15.3209 0.0678586 14.9678 0.0135711 14.6225 0.0125929C11.3682 0.00232233 8.11337 -0.00990459 4.85906 0.013082C3.2006 0.025798 1.99552 0.824949 1.27853 2.3181C1.10637 2.67708 1.03986 3.08693 0.924927 3.4733V21.5344C1.05013 21.9413 1.1274 22.3712 1.30983 22.7507C1.90846 23.9993 2.91009 24.7354 4.28293 24.9565C4.32058 24.9623 4.35531 24.9853 4.3915 25H15.0837C15.1282 24.9843 15.1712 24.9604 15.2172 24.9535C16.9373 24.6948 18.3013 23.3474 18.495 21.6234C18.5835 20.8355 18.5424 20.0324 18.5483 19.2357H18.5478Z" fill="white" />
                              <path d="M25.1592 10.7723C24.4534 10.1106 23.7863 9.40775 23.1011 8.72353C23.0551 8.67756 23.0087 8.6311 22.9583 8.59051C22.6453 8.33912 22.2995 8.27896 21.9322 8.44623C21.5664 8.613 21.3737 8.90987 21.359 9.31091C21.3473 9.62295 21.4872 9.87189 21.7063 10.0876C22.1914 10.5644 22.6712 11.0466 23.2019 11.5753H22.8546C19.1372 11.5753 15.4192 11.5753 11.7017 11.5753C11.5961 11.5753 11.4895 11.57 11.3848 11.5822C10.9867 11.6291 10.7001 11.838 10.5592 12.2131C10.4213 12.5794 10.4966 12.9208 10.7568 13.2113C10.9852 13.4661 11.2865 13.5302 11.6191 13.5297C15.3693 13.5263 19.1195 13.5272 22.8698 13.5272H23.2033C22.6712 14.0569 22.1841 14.5245 21.72 15.014C21.5747 15.1671 21.4451 15.3662 21.3898 15.5662C21.2725 15.9907 21.4818 16.4123 21.8574 16.6211C22.2447 16.8363 22.6874 16.783 23.0229 16.4529C23.7418 15.7457 24.4363 15.0126 25.1689 14.32C26.1256 13.4162 26.127 11.6785 25.1592 10.7708V10.7723Z" fill="white" />
                            </svg>
                          </div>

                        </button>
                      </div>
                    </div>

                  )}
                </div>
              ) : (
                <button
                  onClick={handleModalOpen}
                  className="inline-flex items-center bg-[#343434] border-0 py-1 px-3 focus:outline-none hover:bg-green-700 rounded text-white mt-4 md:mt-0"
                >
                  Login
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              )}
            </div>

          </div>
        </header>
        <footer>
          <span>
            <Link to="/about-us">About us</Link>
            
            <Link to="/contact-us">Contact us</Link>
            <Link to="/terms&ondition">Terms & Condition</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/cancelation&refund">Cancellation & Refund</Link>
          </span>
        </footer>
        <div>
          <Feedback 
          results={results} 
          isCollapsed={isCollapsed} 
          toggleCollapse={toggleCollapse} 
          feedback_data={feedback_data} 
          feedback={feedback} 
          isSubmitted={isSubmitted} 
          setFeedback_data={setFeedback_data} />
          {/* <Search_content openAccordion={openAccordion} sortDirection={sortDirection} setSelectedParty={setSelectedParty} setSelectedKeyword={setSelectedKeyword} toggleAccordion={toggleAccordion} setSelectedJudge={setSelectedJudge} setSelectedMonth={setSelectedMonth} toggleSortDirection={toggleSortDirection} keywo={keywo} isLoggedIn={isLoggedIn} results={results} searchQuery={searchQuery} setSelectedCourt={setSelectedCourt} searchPerformed={searchPerformed} setSelectedYear={setSelectedYear} handleKeyDown={handleKeyDown} handleSearch={handleSearch} loading={loading} showSuggestions={showSuggestions} modalShow={modalShow} setShowSuggestions={setShowSuggestions} suggestions={suggestions} setSearchQuery={setSearchQuery} ClipLoader={ClipLoader} selectedParty={selectedParty} uniqueCourts={uniqueCourts} uniqueDocumentTypes={uniqueDocumentTypes} uniqueJudges={uniqueJudges} uniqueKeywords={uniqueKeywords} uniqueMonths={uniqueMonths} uniqueParties={uniqueParties} uniqueYears={uniqueYears} selectedJudge={selectedJudge} selectedDocumentType={selectedDocumentType} selectedKeyword={selectedKeyword} selectedCourt={selectedCourt} selectedYear={selectedYear} LoginModal={LoginModal} sortByDate={sortByDate} toggleSortMode={toggleSortMode} sortByCaseName={sortByCaseName} login={login} toggleSortByCaseName={toggleSortByCaseName} groupedResults={groupedResults} ResultCard={ResultCard} /> */}
        
        </div>
        <Routes>
          <Route path="/" element={
          <Search_content 
          results={results} 
          sortDirection={sortDirection}
          setSelectedDocumentType={setSelectedDocumentType}
          // toggleCollapse={toggleCollapse} 
          // feedback_data={feedback_data} 
          // feedback={feedback} 
          // isSubmitted={isSubmitted} 
          // setFeedback_data={setFeedback_data} 
          openAccordion={openAccordion} 
          setSelectedParty={setSelectedParty} 
          setSelectedYear={setSelectedYear}
          setSelectedKeyword={setSelectedKeyword} 
          toggleAccordion={toggleAccordion} 
          setSelectedJudge={setSelectedJudge} 
          setSelectedMonth={setSelectedMonth} 
          toggleSortDirection={toggleSortDirection} 
          keywo={keywo} 
          isLoggedIn={isLoggedIn} 
          searchQuery={searchQuery} 
          setSelectedCourt={setSelectedCourt} 
          // searchPerformed={searchPerformed} 
          handleKeyDown={handleKeyDown} 
          handleSearch={handleSearch} 
          loading={loading} 
          showSuggestions={showSuggestions} 
          modalShow={modalShow} 
          setShowSuggestions={setShowSuggestions} 
          suggestions={suggestions} 
          setSearchQuery={setSearchQuery} 
          // ClipLoader={Cli}
          selectedParty={selectedParty} 
          uniqueCourts={uniqueCourts} 
          uniqueDocumentTypes={uniqueDocumentTypes} 
          uniqueJudges={uniqueJudges} 
          uniqueKeywords={uniqueKeywords} 
          uniqueMonths={uniqueMonths} 
          uniqueParties={uniqueParties} 
          uniqueYears={uniqueYears} 
          selectedJudge={selectedJudge} 
          selectedDocumentType={selectedDocumentType} 
          selectedKeyword={selectedKeyword} 
          selectedCourt={selectedCourt} 
          selectedYear={selectedYear} 
          selectedMonth={selectedMonth} 
          sortByDate={sortByDate} 
          toggleSortMode={toggleSortMode} 
          sortByCaseName={sortByCaseName} 
          login={login} 
          toggleSortByCaseName={toggleSortByCaseName} 
          groupedResults={groupedResults} 
          ResultCard={ResultCard}
          />} />


          <Route path="/about-us" element={
          <AboutUs 
          dropdownPosition={dropdownPosition}
          // results={results} 
          // isCollapsed={isCollapsed} 
          user={user} 
          toggleCollapse={toggleCollapse} 
          // feedback_data={feedback_data}  
          toggleDropdown={toggleDropdown} 
          dropdownOpen={dropdownOpen}   
          avatarRef={avatarRef}  
          dropdownRef={dropdownRef}
          // isSubmitted={isSubmitted} 
          // setFeedback_data={setFeedback_data} 
          // openAccordion={openAccordion} 
          // sortDirection={sortDirection} 
          // setSelectedParty={setSelectedParty} 
          // setSelectedKeyword={setSelectedKeyword} 
          // toggleAccordion={toggleAccordion} 
          // setSelectedJudge={setSelectedJudge}
          // setSelectedMonth={setSelectedMonth} 
          // toggleSortDirection={toggleSortDirection} 
          // keywo={keywo} 
          // isLoggedIn={isLoggedIn} 
          // searchQuery={searchQuery} 
          // setSelectedCourt={setSelectedCourt} 
          // searchPerformed={searchPerformed} 
          // handleKeyDown={handleKeyDown} 
          // handleSearch={handleSearch} 
          // loading={loading} 
          // showSuggestions={showSuggestions} 
          // modalShow={modalShow} 
          // setShowSuggestions={setShowSuggestions} 
          // suggestions={suggestions} 
          // setSearchQuery={setSearchQuery} 
          // selectedParty={selectedParty} 
          // uniqueCourts={uniqueCourts} 
          // uniqueDocumentTypes={uniqueDocumentTypes} 
          // uniqueJudges={uniqueJudges} 
          // uniqueKeywords={uniqueKeywords} 
          // uniqueMonths={uniqueMonths} 
          // uniqueParties={uniqueParties} 
          // uniqueYears={uniqueYears} 
          // selectedJudge={selectedJudge} 
          // selectedDocumentType={selectedDocumentType} 
          // selectedKeyword={selectedKeyword} 
          // selectedCourt={selectedCourt} 
          // selectedYear={selectedYear} 
          // sortByDate={sortByDate} 
          // toggleSortMode={toggleSortMode} 
          // sortByCaseName={sortByCaseName} 
          // login={login} 
          // toggleSortByCaseName={toggleSortByCaseName} 
          // groupedResults={groupedResults} 
          // ResultCard={ResultCard} 
           />
          
          } />
          {/* Add other routes here */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
