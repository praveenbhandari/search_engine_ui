
import "./styles.css";
import React, { useState, useEffect, useCallback } from "react";
import { RemoteRunnable } from "langchain/runnables/remote";
import PropTypes from "prop-types";
import axios from 'axios';

import Switch from '@mui/material/Switch';
import Highlighter from "react-highlight-words";

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
function ResultCard({ item, searchWords, scores }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [is1ModalOpen, set1ModalOpen] = useState(false);
  const [data, setData] = useState("");
  // const [words, setData] = useState("");
  console.log(item)

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
    const get = `http://localhost:8000/get_index/${url}`
    // const get = `https://search-engine.lawyantra.com/get_index/${url}`


    // console.log(url)
    // console.log(get)
    // useEffect(() => {
    // Replace 'your-api-url' with the actual API URL you want to call
    axios.get(get)
      .then((response) => {
        setData(response.data);
        set1ModalOpen(true)
        console.log(response.data)
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

  return (
    <div className="result-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
        <h3 style={{ margin: 0 }}>{metadata["Case Name"]}</h3>
        {/* <h4 style={{ margin: 0 }}>{score + "%"}</h4> */}
        <h4 style={{ margin: 0 }}>{score.includes("Relevant") ? "Relevant" : score + "%"}</h4>
      </div>
      {
        metadata["Date"] === "" ?
          <></> : <p>
            <strong>Date:</strong> {formatDate(metadata["Date"])}
            {/* <strong>Date:</strong> {metadata["Date"]} */}
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
          // metadata["Case Summary"]
          <Highlighter
            highlightClassName="highlighted-text"
            searchWords={searchWords}
            autoEscape={true}
            textToHighlight={String(metadata["Case Summary"])}
          />
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
                searchWords={searchWords}
                // autoEscape={true}
                textToHighlight={page_content+"\n\nDocument Type: "+metadata["Document Type"]+"\n\nJudges Involved: "+metadata["Judges"]+"\n\nKeywords: "+metadata["keywords"]}
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

              <a href={metadata["case_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '800px', textAlign: 'left' }}><strong>Case URL: {metadata["case_url"].substring(0, 100)}</strong></button></a>

              <br /><br />

              <a href={metadata["pdf_url"]} target="_blank" style={{ background: "#f9f9f9", color: "blue", textDecoration: "underline" }}><button style={{ width: '800px', textAlign: 'left' }}><strong>Pdf URL: {metadata["pdf_url"].substring(0, 100)}</strong></button></a>

              <br />

            </>
          }
          onClose={() => set1ModalOpen(false)}
        />
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
  const [searchQuery, setSearchQuery] = useState("");
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
  const [loading, setLoading] = useState(false);
  // const [score1, setScores] = useState(0);

  // const [inputValue, setInputValue] = useState('');
  const [uniqueDates, setUniqueDates] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [uniqueMonths, setUniqueMonths] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

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
  const [group, setgroup] = useState(null);
  const [gbyScore, setgbyscore] = useState(null);

  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  // function check(val){
  //   if (val !== selectedDocumentType) {
  //     const filteredVal = val.filter(item => item !== " ");
    
  //     setSelectedDocumentType(filteredVal);
  //   }

  // }
  // const [uniqueScores, setUniqueScores] = useState([]);
  // const [selectedScore, setSelectedScore] = useState(null);

  // const [groupedResults, setGroupedResults] = useState(null);

  // const [sortByScore, setSortByScore] = useState(false);
  // const [sortByDate, setSortByDate] = useState(false);

  // const handleSortByScoreChange = () => {
  // setSortByScore(!sortByScore);
  // };

  // const handleSortByDateChange = () => {
  // setSortByDate(!sortByDate);
  // };

  // useEffect hook for sorting and filtering
  useEffect(() => {
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
      // setResults(filteredResults)
      // Sorting logic based on sortByDate state
      if (sortByDate) {
        filteredResults.sort((a, b) => new Date(b[1].metadata.Date) - new Date(a[1].metadata.Date));
        setResults(filteredResults)
      } else {
        // Sorting by score if sortByDate is false
        filteredResults.sort((a, b) => Math.floor(b[0]) - Math.floor(a[0]));
        setResults(filteredResults)
      }
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
        // Otherwise, treat the filtered results as regular results
        setGroupedResults(null);
        setResults(filteredResults);
      }
      if(gbyScore){
        const grouped = {};
        const sortedGrouped = Object.keys(grouped)
        .sort((a, b) => b - a) // Sort scores from highest to lowest
        .reduce((acc, key) => {
          acc[key] = grouped[key].sort((a, b) => new Date(b[1].metadata.Date) - new Date(a[1].metadata.Date)); // Sort by date
          return acc;
        }, {});
      setGroupedResults(sortedGrouped);}
      else {
        // Otherwise, treat the filtered results as regular results
        setGroupedResults(null);
        setResults(filteredResults);
      }
    }
  }, [originalResults, selectedMonth, selectedYear, selectedParty, selectedCourt, selectedJudge, selectedDocumentType, selectedKeyword, sortByDate, group]);




  // useEffect(() => {

  // }, []);
  // Function to toggle sorting mode
  const toggleSortMode = () => {
    setSortByDate((prev) => !prev);
  };
  const togglegroupedMode = () => {
    setgroup((prev) => !prev);
  }
  const togglegroupedscoreMode = () => {
    setgbyscore((prev) => !prev);
  }
  // Function to group results by score
  // const groupResultsByScore = (results) => {
  // const grouped = {};
  // results.forEach((item) => {
  // const score = Math.floor(item[0]); // Round down the score to the nearest whole number
  // if (grouped[score]) {
  // grouped[score].push(item);
  // } else {
  // grouped[score] = [item];
  // }
  // });
  // return grouped;
  // };

  // Update grouped results whenever results change
  // useEffect(() => {
  // if (results) {
  // const filteredResults = results.filter(
  // (item) =>
  // (!selectedMonth || new Date(item[1].metadata.Date).toLocaleString('default', { month: 'long' }) === selectedMonth) &&
  // (!selectedYear || item[1].metadata.Date.includes(selectedYear)) &&
  // (!selectedParty || (item[1].metadata["Parties Involved"] && item[1].metadata["Parties Involved"].includes(selectedParty))) &&
  // (!selectedCourt || (item[1].metadata["Court Name"] && item[1].metadata["Court Name"] === selectedCourt)) &&
  // (!selectedJudge || (item[1].metadata["Judges"] && item[1].metadata["Judges"] === selectedJudge)) &&
  // (!selectedDocumentType || (item[1].metadata["Document Type"] && item[1].metadata["Document Type"] === selectedDocumentType)) &&
  // (!selectedKeyword || (item[1].metadata.Keywords && item[1].metadata.Keywords.includes(selectedKeyword)))
  // );

  // const sortedResults = [...filteredResults];

  // if (sortByScore) {
  // sortedResults.sort((a, b) => b[0] - a[0]);
  // }

  // if (sortByDate) {
  // sortedResults.sort((a, b) => {
  // const dateA = new Date(a[1].metadata.Date);
  // const dateB = new Date(b[1].metadata.Date);
  // return dateB - dateA;
  // });
  // }

  // const grouped = {};
  // filteredResults.forEach((result) => {
  // const score = Math.floor(result[0]);
  // if (!grouped[score]) {
  // grouped[score] = [];
  // }
  // grouped[score].push(result);
  // });
  // setGroupedResults(grouped);
  // }
  // }, [results, selectedMonth, selectedYear, selectedParty, selectedCourt, selectedJudge, selectedDocumentType, selectedKeyword, sortByScore, sortByDate]);

  const handleSearch = async () => {
    setSelectedMonth(null);
    setSelectedYear(null);
    setSelectedParty(null);
    setSelectedCourt(null);
    setSelectedJudge(null);
    setSelectedDocumentType(null);
    setSelectedKeyword(null);
    // setSelectedScore(null);

    setLoading(true);
    // Initialize the RemoteRunnable with your LangChain API endpoint
    const chain = new RemoteRunnable({
      // url: `https://de7e-110-226-176-227.ngrok-free.app/chat`, // Replace with your actual API endpoint http://localhost:8081/chat
      // url: `https://yantra-api-gcp-image-fxhbdhovha-el.a.run.app/chat`
      // url: `https://search-engine.lawyantra.com/chat`
      url: `http://localhost:8000/chat`
    });

    try {
      const response = await axios.post('http://localhost:8000/search', {
        query: searchQuery
      });
      // s
      console.log(response.data);
      console.log("---------------------------");
      setResults(response.data[0]);
      setOriginalResults(response.data[0]); // Store the original results
      setkeywo(response.data[1]);
      if (results){
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
  // useEffect(()=>{
  //   if (results){
  //     extractUniqueMonths(results);
  //     extractUniqueYears(results);
  //     extractUniqueCourts(results);
  //     extractUniqueParties(results);
  //     extractUniqueJudges(results);
  //     extractUniqueDocumentTypes(results);
  //     extractUniqueKeywords(results);
  //   }
  // }, []);

  useEffect(() => {
    handleSearch();
  }, []);

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
    fetch('http://localhost:8000/suggest', {
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

  useEffect(() => {
    if (searchQuery.length > 2) {
      debouncedFetchSuggestions(searchQuery);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, debouncedFetchSuggestions]);

  // const extractUniqueMonths = (results) => {
  // const months = new Set(results.map((item) => {
  // // console.log(item)
  // const date = new Date(item[1].metadata["Date"]);
  // return date.toLocaleString('default', { month: 'long' });
  // })
  // // .filter(month => month !== 'Invalid Date')
  // );
  // setUniqueMonths([...months]);
  // };

  const extractUniqueMonths = (results) => {
    const months = new Set();
    results.forEach((item) => {
      const dateString = item[1].metadata["Date"];
      if (dateString) {
        // const [month, day, year] = dateString.split('-').map(Number);
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        months.add(month);
      }
    });
    setUniqueMonths([...months]);
  };

  // const extractUniqueMonths = (results) => {
  // const months = new Set();
  // results.forEach((item) => {
  // const dateString = item[1].metadata["Date"];
  // if (dateString) {
  // const [month, day, year] = dateString.split('-').map(Number);
  // const date = new Date(year, month - 1, day); // Adjust month index since JavaScript months are 0-indexed
  // const monthName = date.toLocaleString('default', { month: 'long' });
  // months.add(monthName);
  // }
  // });
  // setUniqueMonths([...months]);
  // };

  // const extractUniqueMonths = (results) => {
  // const months = new Set();
  // results.forEach((item) => {
  // const dateString = item[1].metadata["Date"];
  // if (dateString && !isNaN(new Date(dateString))) {
  // const [month, day, year] = dateString.split('-').map(Number);
  // const date = new Date(year, month - 1, day); // Adjust month index since JavaScript months are 0-indexed
  // const monthName = date.toLocaleString('default', { month: 'long' });
  // months.add(monthName);
  // }
  // });
  // setUniqueMonths([...months]);
  // };

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

  // const extractUniqueScores = () => {
  // const scores = new Set(results.map((item) => item[0])); // Assuming scores are stored at index 0 of each result
  // setUniqueScores(Array.from(scores)); // Convert Set to Array
  // };

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
  //   extractUniqueMonths(results);
  //   extractUniqueYears(results);
  //   extractUniqueCourts(results);
  //   extractUniqueParties(results);
  //   extractUniqueJudges(results);
  //   extractUniqueDocumentTypes(results);
  //   extractUniqueKeywords(results);
  // }
  // }, [results]);



  return (
    <div className="main-container">
      <div className="left-filters">
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

        {/* <div className="sort-options">
 <div className="toggle-switch">
 <input
 type="checkbox"
 id="sort-by-score"
 checked={sortByScore}
 onChange={handleSortByScoreChange}
 />
 <label htmlFor="sort-by-score" className="toggle-switch-label">
 <span className="toggle-switch-inner" />
 <span className="toggle-switch-switch" />
 </label>
 <label htmlFor="sort-by-score" className="toggle-switch-label-text">
 Sort by Score
 </label>
 </div>
 <div className="toggle-switch">
 <input
 type="checkbox"
 id="sort-by-date"
 checked={sortByDate}
 onChange={handleSortByDateChange}
 />
 <label htmlFor="sort-by-date" className="toggle-switch-label">
 <span className="toggle-switch-inner" />
 <span className="toggle-switch-switch" />
 </label>
 <label htmlFor="sort-by-date" className="toggle-switch-label-text">
 Sort by Date
 </label>
 </div>
 </div> */}
        {/* <div>Related Items: {keywo}</div> */}
        <div className="search-results">
          {!loading && (
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
                </div>
                <div>
                  <label className="switch-label">Group by Scores</label>
                  <label className="switch">
                    <input type="checkbox" checked={group} onChange={togglegroupedMode} />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

              {/* <Switch {...label} disabled defaultChecked >{sortByDate ? 'Sort by Score' : 'Sort by Date'}</Switch> */}

              {groupedResults ? (
                Object.keys(groupedResults)
                  .sort((a, b) => parseInt(b) - parseInt(a))
                  .map((scoreGroup) => (
                    <div key={scoreGroup}>
                      <p>Score Group: {scoreGroup}%</p>
                      {groupedResults[scoreGroup]
                        .sort((a, b) => {
                          const dateA = new Date(a[1].metadata.Date);
                          const dateB = new Date(b[1].metadata.Date);
                          return dateB - dateA;
                        })
                        .map((item, index) => (
                          // <ResultCard key={index} item={item} searchWords={keywo} />
                          <ResultCard key={`${scoreGroup}_${index}`} item={item} searchWords={keywo} />

                        ))}
                    </div>
                  ))
              ) : (
                results && (
                  results.length > 0 ? (
                    results
              .sort((a, b) => {
                // Custom sorting function to place cards with case name "Not Available" at the bottom
                const caseNameA = a[1].metadata["Case Name"] || ''; // Handle case name being null
                const caseNameB = b[1].metadata["Case Name"] || ''; // Handle case name being null
                if (caseNameA === "Not Available" && caseNameB !== "Not Available" || caseNameA === "Not found" && caseNameB !== "Not found" )  {
                  return 1; // Place case name "Not Available" at the bottom
                } else if (caseNameA !== "Not Available" && caseNameB === "Not Available" || caseNameA !== "Not found" && caseNameB === "Not found") {
                  return -1; // Place case name "Not Available" at the bottom
                } else {
                  return 0; // Maintain original order
                }
              })
                  .map((item, index) => (
                      <ResultCard key={index} item={item} searchWords={keywo} />
                    ))
                  ) : (
                    <p>
                      No cases found for the selected filters. Please adjust your filters.
                    </p>
                  )
                )
              )}
              {/* {!groupedResults && !results && (
                <p>
                  No cases found for the selected filters. Please adjust your filters.
                </p>
              )} */}
            </div>
          )}
          {/* 
 {loading && <div className="loading-indicator">Loading...</div>}
 <button onClick={toggleSortMode}>
 {sortByDate ? 'Sort by Score' : 'Sort by Date'}
 </button>
 <button onClick={togglegroupedMode}>
 {group ? 'Sort by group' : 'normal'}
 </button>
 {!loading &&
 results &&

 (results.length > 0 ? (
 results
 // .filter(
 // (item) =>
 // // console.log(item)
 // (!selectedMonth || new Date(item[1].metadata.Date).toLocaleString('default', { month: 'long' }) === selectedMonth) &&
 // (!selectedYear || item[1].metadata.Date.includes(selectedYear)) &&
 // (!selectedParty ||
 // (item[1].metadata["Parties Involved"] &&
 // item[1].metadata["Parties Involved"].includes(selectedParty))) &&
 // (!selectedCourt ||
 // (item[1].metadata["Court Name"] &&
 // item[1].metadata["Court Name"] === selectedCourt)) &&
 // (!selectedJudge ||
 // (item[1].metadata["Judges"] && item[1].metadata["Judges"] === selectedJudge)) &&
 // (!selectedDocumentType ||
 // (item[1].metadata["Document Type"] && item[1].metadata["Document Type"] === selectedDocumentType)) &&
 // (!selectedKeyword ||
 // (item[1].metadata.Keywords && item[1].metadata.Keywords.includes(selectedKeyword)))



 // // (!selectedDate || item.Date === selectedDate) &&
 // // (!selectedYear || (
 // // item["Date"] && item["Date"].includes(
 // // selectedYear
 // // )
 // // ))
 // // &&
 // // (!selectedKeywords ||
 // // (item["Keywords"] &&
 // // item["Keywords"].includes(
 // // selectedKeywords
 // // )))&&
 // // (!selectedKeywords ||
 // // (item["Keywords"] &&
 // // item["Keywords"].includes(
 // // selectedKeywords
 // // )))
 // )
 .map((item, index) => <ResultCard key={index} item={item} searchWords={keywo} />)
 ) : (
 <p>
 No cases found for the selected filters. Please adjust your
 filters.
 </p>
 ))} */}
          {/* {!loading && groupedResults && Object.keys(groupedResults)
 .sort((a, b) => parseInt(b) - parseInt(a)) // Sort keys in descending order
 .map((scoreGroup) => (
 <div key={scoreGroup}>
 <h2>Score Group: {scoreGroup}</h2>
 {groupedResults[scoreGroup]
 // Sort items within each score group based on their date
 .sort((a, b) => {
 const dateA = new Date(a[1].metadata.Date);
 const dateB = new Date(b[1].metadata.Date);
 return dateB - dateA; // Sorting in descending order
 })
 .map((item, index) => (
 <ResultCards
 key={index}
 item={item}
 searchWords={keywo}
 />
 ))}
 </div>
 ))}
 {!loading && !groupedResults && <div>No grouped results available.</div>} */}
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


