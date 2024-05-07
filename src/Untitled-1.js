import "./styles.css";
import React, { useState, useEffect, useCallback } from "react";
import { RemoteRunnable } from "langchain/runnables/remote";
import PropTypes from "prop-types";
import axios from 'axios';

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

function ResultCard({ item, searchWords, scores }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [is1ModalOpen, set1ModalOpen] = useState(false);
  const [data, setData] = useState("");

  const { metadata } = item[1];
  const { page_content } = item[1];
  const score = item[0];
  const [selectedReference, setSelectedReference] = useState('');
  const partiesInvolved = Array.isArray(metadata["Parties Involved"])
    ? metadata["Parties Involved"].join(" vs. ")
    : metadata["Parties Involved"];

  const handleChange = (event) => {
    const url = event.target.value;
    const get = `http://localhost:8000/get_index/${url}`
    axios.get(get)
      .then((response) => {
        setData(response.data);
        set1ModalOpen(true)
        console.log(response.data)
      })
  };

  return (
    // ... (ResultCard component remains the same)
  );
}

function handleKeywordClick(keyword) {
  const newReference = event.target.value;
  setSelectedReference(newReference);
  handleKeywordClick(newReference);
}

function DocumentModal({ content, onClose }) {
  // ... (DocumentModal component remains the same)
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
      Keywords: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  }).isRequired,
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [uniqueKeywords, setUniqueKeywords] = useState([]);
  const [keywo, setkeywo] = useState("null");
  const [results, setResults] = useState(null);
  const [originalResults, setOriginalResults] = useState(null); // Store the original results
  const [loading, setLoading] = useState(false);
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
  const [sortByDate, setSortByDate] = useState(false);
  const [groupedResults, setGroupedResults] = useState(null);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [group, setgroup] = useState(null);

  useEffect(() => {
    if (originalResults) {
      const filteredResults = originalResults.filter(
        (item) =>
          (!selectedMonth || new Date(item[1].metadata.Date).toLocaleString('default', { month: 'long' }) === selectedMonth) &&
          (!selectedYear || item[1].metadata.Date.includes(selectedYear)) &&
          (!selectedParty || (item[1].metadata["Parties Involved"] && item[1].metadata["Parties Involved"].includes(selectedParty))) &&
          (!selectedCourt || (item[1].metadata["Court Name"] && item[1].metadata["Court Name"] === selectedCourt)) &&
          (!selectedJudge || (item[1].metadata["Judges"] && item[1].metadata["Judges"] === selectedJudge)) &&
          (!selectedDocumentType || (item[1].metadata["Document Type"] && item[1].metadata["Document Type"] === selectedDocumentType)) &&
          (!selectedKeyword || (item[1].metadata.Keywords && item[1].metadata.Keywords.includes(selectedKeyword)))
      );
      if (sortByDate) {
        filteredResults.sort((a, b) => new Date(a[1].metadata.Date) - new Date(b[1].metadata.Date));
        setResults(filteredResults)
      } else {
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
        setGroupedResults(null);
        setResults(filteredResults);
      }
    }
  }, [originalResults, selectedMonth, selectedYear, selectedParty, selectedCourt, selectedJudge, selectedDocumentType, selectedKeyword, sortByDate, group]);

  const toggleSortMode = () => {
    setSortByDate((prev) => !prev);
  };
  const togglegroupedMode = () => {
    setgroup((prev) => !prev);
  }

  const handleSearch = async () => {
    setSelectedMonth(null);
    setSelectedYear(null);
    setSelectedParty(null);
    setSelectedCourt(null);
    setSelectedJudge(null);
    setSelectedDocumentType(null);
    setSelectedKeyword(null);

    setLoading(true);
    const chain = new RemoteRunnable({
      url: `http://localhost:8000/chat`
    });

    try {
      const response = await axios.post('http://localhost:8000/search', {
        query: searchQuery
      });

      console.log(response.data);
      console.log("---------------------------");
      setResults(response.data[0]);
      setOriginalResults(response.data[0]); // Store the original results
      setkeywo(response.data[1]);
    } catch (error) {
      setResults(null);
      setOriginalResults(null); // Reset original results
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  function debounce(func, timeout = 10) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  const fetchSuggestions = useCallback((query) => {
    fetch('http://localhost:8000/suggest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: query }),
    })
      .then(response => response.json())
      .then(data => {
        setSuggestions(data.next_words);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 10), []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      debouncedFetchSuggestions(searchQuery);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, debouncedFetchSuggestions]);

  const extractUniqueMonths = (results) => {
    const months = new Set();
    results.forEach((item) => {
      const dateString = item[1].metadata["Date"];
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

  const extractUniqueDocumentTypes = () => {
    const documentTypes = new Set(results.map((item) => item[1].metadata["Document Type"])
      .filter(type => type !== "")
    );
    setUniqueDocumentTypes(Array.from(documentTypes));
  };

  const extractUniqueKeywords = () => {
    const keywords = new Set(results.flatMap((item) => item[1].metadata.Keywords || [])
      .filter(keyword => keyword !== "")
    );
    setUniqueKeywords(Array.from(keywords));
  };

  useEffect(() => {
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

  return (
    // ... (App component remains the same)
  );
}

export default App;