import "./styles.css";
import React, { useState,useEffect } from "react";
import { RemoteRunnable } from "langchain/runnables/remote";
import PropTypes from "prop-types";
import axios from 'axios';

import Highlighter from "react-highlight-words";

// const [keywo, setkeywo] = useState(null);
function ResultCard({ item, searchWords}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [is1ModalOpen, set1ModalOpen] = useState(false);
  const [data, setData] = useState("");

  
  const metadata  = item;
  const [selectedReference, setSelectedReference] = useState('');
  // console.log("**********");
  // console.log(metadata);
  const partiesInvolved = Array.isArray(metadata["Parties Involved"])
    ? metadata["Parties Involved"].join(" vs. ")
    : metadata["Parties Involved"];
// console.log(searchWords)

    const handleChange = (event) => {

      const url = event.target.value;
      const get = `http://localhost:8000/get_index/${url}`
      // const get = `https://search-engine.lawyantra.com/get_index/${url}`
      
  
      console.log(url)
      console.log(get)
      // useEffect(() => {
        // Replace 'your-api-url' with the actual API URL you want to call
        axios.get(get)
          .then((response) => {
            setData(response.data);
            set1ModalOpen(true)
            console.log(response.data)
          })
          // .catch((error) => {
          //   setError(error); // Handle error
          // })
          // .finally(() => {
          //   setLoading(false); // Always executed
          // });
      // }, []); 
        
      // setSelectedReference(url);
      // if (url) {
      //   // Open the selected reference in a new tab
      //   window.open(url, '_blank', 'noopener,noreferrer');
      // }
    };

    // function highlightText(text, wordsToHighlight) {
    //   const regex = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');
    //   const parts = text.split(regex);
    
    //   return parts.map((part, i) => 
    //     wordsToHighlight.includes(part.toLowerCase()) ? 
    //     <span key={i} style={{ backgroundColor: 'yellow' }}>{part}</span> : 
    //     part
    //   );
    // }
  return (
    <div className="result-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <h3 style={{ margin: 0 }}>{metadata["Case Name"]}</h3>
          <h4 style={{ margin: 0 }}>{metadata["score"]+"%"}</h4>
        </div>
      {
        metadata["Date"] === "" ?
          <></> : <p>
            <strong>Date:</strong> {metadata["Date"]}
          </p>
      }
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
      {
        metadata["Case Summary"] === "" ? <></> :
        metadata["Case Summary"]
        // <Highlighter
        //   highlightClassName="highlighted-text"
        //   searchWords={searchWords}
        //   autoEscape={true}
        //   textToHighlight= {String(metadata["Case Summary"])}
        // />
      }
      {metadata["case_url"] && (
  <div style={{ display: 'flex' }}>
    <a href={metadata["case_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}>
      <button style={{ width: '800px', textAlign: 'left' }}>
        <strong>Case URL: {metadata["case_url"].substring(0, 100)}</strong>
      </button>
    </a>
  </div>
)}
{metadata["pdf_url"] && (
  <div style={{ display: "inline-flex", whiteSpace: "nowrap" }}>
    <a href={metadata["pdf_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}>
      <button style={{ width: '800px', textAlign: 'left' }}>
        <strong>Pdf URL: {metadata["pdf_url"].substring(0, 100)}</strong>
      </button>
    </a>
  </div>
)}
                
      <div className="keywords-container">
        {metadata.Keywords &&
          metadata.Keywords.map((keyword, index) => (
            keyword === "" ? <></> :
              <button
                key={index}
                className="keyword-button"
                onClick={() => handleKeywordClick(keyword)}
              >
                {keyword}
              </button>
          ))}
      </div>
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


      <button onClick={() => setModalOpen(true)} className="view-document">
        View Summary
      </button>
      {isModalOpen && (
        <DocumentModal
          content={
            <>
              {item.context}
              {/* <Highlighter
                  highlightClassName="highlighted-text"
                  searchWords={searchWords}
                  // autoEscape={true}
                  textToHighlight= {item.page_content}
              /> */}
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
            
            <br/><br/>
            
            <a href={metadata["case_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '800px', textAlign: 'left' }}><strong>Case URL: {metadata["case_url"].substring(0, 100)}</strong></button></a>
            
            <br/><br/>
          
            <a href={metadata["pdf_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '800px', textAlign: 'left' }}><strong>Pdf URL: {metadata["pdf_url"].substring(0, 100)}</strong></button></a>
          
            <br/>
              
            </>
          }
          onClose={() => set1ModalOpen(false)}
        />
      )}




    </div>
  
  
  );

}
 

function handleKeywordClick(keyword) {
  console.log("Keyword clicked:", keyword);
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
    pageContent: PropTypes.string.isRequired,
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
      "scores": PropTypes.string,
      Keywords: PropTypes.arrayOf(PropTypes.string), // Add this line
    }).isRequired,
  }).isRequired,

  // searchWords: PropTypes.shape({
  //   Keywords: PropTypes.arrayOf(PropTypes.string), 
  // })
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  // const [searchQuery, setSearchQuery] = useState("");
  // const [filters, setFilters] = useState({
  //   icj: false,
  //   un: false,
  //   hudoc: false,
  // });
  // const [yearFilter, setYearFilter] = useState("all");
  const [uniqueKeywords, setUniqueKeywords] = useState([]);

const [keywo, setkeywo] = useState("null");
  console.log(uniqueKeywords);
  // const [selectedKeywords, setSelectedKeywords] = useState(new Set());
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const [uniqueDates, setUniqueDates] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const [uniqueParties, setUniqueParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [selectedKeywords, setSelectedKeywords] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    // Initialize the RemoteRunnable with your LangChain API endpoint
    const chain = new RemoteRunnable({
      // url: `https://de7e-110-226-176-227.ngrok-free.app/chat`, // Replace with your actual API endpoint http://localhost:8081/chat
      // url: `https://yantra-api-gcp-image-fxhbdhovha-el.a.run.app/chat`
      // url: `https://search-engine.lawyantra.com/chat`
      url: `http://localhost:8000/chat`

    });
    // const url="http://localhost:8000/search"


    try {
      // Invoke the LangChain API with the search query
      // axios.post('http://localhost:8000/add_query', {
      //   query: searchQuery
      // })
      // .then(response => {
      //   console.log(response.data);
      // })
      // .catch(error => {
      //   console.error('There was an error!', error);
      // });


      // const result = await chain.invoke(searchQuery);
      axios.post('http://localhost:8001/search1', {
        query: searchQuery
      })
      .then(response => {

        console.log(response.data);
        console.log("---------------------------");
        setResults(response.data[1])
        setkeywo(response.data[1])
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

    } catch (error) {
      setResults(null);
      console.error("Error fetching data: ", error); // Handle any errors
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const extractFilterValues = (results) => {
    const dates = new Set(results.map((item) => item.Date));
    setUniqueDates([...dates]);
    const years = new Set(results.map((item) => item.Date.split('-')[0]));
    // console.log(years)
    setUniqueYears([...years]);

    const parties = new Set(
      results.flatMap((item) => item["Parties Involved"] || [])
    );
    setUniqueParties([...parties]);
    const keywords = new Set(
      results.flatMap((item) => item.Keywords || [])
    );
    setUniqueKeywords([...keywords]);
    // ...Similarly extract values for other filters...
  };

  return (
    <div className="main-container">
      <div className="left-filters">
        <div className="filter-title">Date</div>
        {/* Date Filters */}
        <select
          value={selectedDate || ""}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">Select Date</option>
          {uniqueDates.map((date) => (
            <option key={date} value={date}>
              {date}
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

      </div>

      <div className="central-content">
        <div className="search-container">
          <h1>Human Rights Search</h1>
          {/* Filter UI for Keywords */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter search query..."
            className="search-query"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
            {/* <div>Related Items: {keywo}</div> */}
        <div className="search-results">
          {loading && <div className="loading-indicator">Loading...</div>}
          {!loading &&
            results &&
            (results.length > 0 ? (
              results
                .filter(
                  (item) =>
                    (!selectedDate || item.Date === selectedDate) &&
                    (!selectedYear || (
                      item["Date"] && item["Date"].includes(
                        selectedYear
                      )
                    ))
                    &&
                    (!selectedKeywords ||
                      (item["Keywords"] &&
                        item["Keywords"].includes(
                          selectedKeywords
                        )))&&
                        (!selectedKeywords ||
                          (item["Keywords"] &&
                            item["Keywords"].includes(
                              selectedKeywords
                            )))
                )
                .map((item, index) => <ResultCard key={index} item={item} searchWords={keywo} />)
            ) : (
              <p>
                No cases found for the selected filters. Please adjust your
                filters.
              </p>
            ))}
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
              {party.length > 15 ? `${party.substring(0, 15)}...` : party}
            </option>
          ))}
        </select>
        {/* ...other right-side filters if any... */}
        {/* <div className="right-filters"> */}

        
        <div className="filter-title">Keywords</div>
        <select
          value={selectedKeywords || ""}
          onChange={(e) => setSelectedKeywords(e.target.value)}
        >
          <option value="">Select Keyword</option>
          {uniqueKeywords.map((keyword) => (
            <option key={keyword} value={keyword}>
              {keyword.length > 15 ? `${keyword.substring(0, 15)}...` : keyword}
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
