import React from "react";

import { ClipLoader } from 'react-spinners';
import imag from './HRD.png'

import LoginModal from "./login";

import nopage from "./lottie/nopg.json";
function Search_content({
//   searchPerformed,
  setSelectedYear,
  setSelectedCourt,
  setSelectedMonth,
  setSelectedDocumentType,
  setSelectedJudge,
  setSelectedParty,
  setSelectedKeyword, 
  sortDirection,
  toggleAccordion,
  openAccordion,
  toggleSortDirection,
  isLoggedIn,
  results,
  searchQuery,
  handleKeyDown,
  handleSearch,
  loading,
  showSuggestions,
  modalShow,
  setShowSuggestions,
  suggestions,
  setSearchQuery,
  // ClipLoader,
  selectedParty,
  uniqueParties,
  uniqueCourts,
  uniqueDocumentTypes,
  uniqueJudges,
  uniqueKeywords,
  uniqueMonths,
  uniqueYears,
  selectedJudge,
  selectedDocumentType,
  selectedKeyword,
  selectedMonth,
  selectedCourt,
  selectedYear,
  // LoginModal,
  login,
  sortByDate,
  toggleSortMode,
  sortByCaseName,
  toggleSortByCaseName,
  groupedResults,
  ResultCard,
  keywo 
}){
    return(
        <div className="main-container">
        {isLoggedIn ? (
          <>
            {!results && (<div className="full-page-container">
              <div className="centered-content">
                <center>
                  <div style={{ paddingTop: "200px", paddingBottom: "30px" }}>
                    <img src={imag} alt="My Image" style={{ width: '221px', height: '102p' }} />
                  </div></center>
                <input
                  id="querr"
                  type="text"
                  value={searchQuery}
                  onKeyDown={handleKeyDown}
                  style={{ borderRadius: '10px', }}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 10)}
                  placeholder="Enter search query..."
                  className="search-query"
                />
                <button onClick={handleSearch} className="search-button">
                  Search
                </button>

                {/* <button  className="search-button">
              pay
            </button> */}
                {/* <PayPalScriptProvider options={initialOptions} createOrder={createOrder} onApprove={onApprove}><PayPalButtons/></PayPalScriptProvider> */}
                {/* <PayPalButton>pay</PayPalButton> */}
                {/* <PayPalBtn
              amount="5"
              currency="USD"
              createSubscription={paypalSubscribe}
              onApprove={paypalOnApprove}
              catchError={paypalOnError}
              onError={paypalOnError}
              onCancel={paypalOnError}
            /> */}
                {loading && (
                  <div className="spinner-overlay">
                    <div className='spinner'>

                      {/* <Lottie animationData={nopage} loop={true} renderer={'svg'} /> */}
                      <ClipLoader size={150} color={"#123abc"} loading={loading} />
                    </div>
                  </div>
                  // <div className="loading-bar">
                  //   Loading...
                  // </div>
                )}

                {showSuggestions && suggestions.length > 0 && (
                  <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setSearchQuery(searchQuery + " " + suggestion.token);
                        }}
                        onMouseDown={(e) => e.preventDefault()} // Prevent onBlur from firing on click
                      >
                        {suggestion.token}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            )}

            {results && (
              <div className="left-filters">
                {/* style={  {marginTop:'70px',width:'200px', position: 'fixed', top: '10px', left:'10px'}} */}
                <div >
                  {/* <div>
            <img src={imag} alt="My Image" style={{ width: '150px', height: 'auto' }} />
          </div> */}
                  {results && (
                    <div >
                      {/* <div className="filter-title">Parties Involved</div> */}
                      <select
                        style={{ border: "1px solid", borderColor: '#343434', color: '#343434', borderRadius: "10px" }}
                        value={selectedParty || ""}
                        onChange={(e) => setSelectedParty(e.target.value)}
                      >
                        <option value="">Parties Involved</option>
                        {uniqueParties.map((party) => (
                          <option key={party} value={party}>
                            {party}
                          </option>
                        ))}
                      </select>

                      <select
                        style={{ border: "1px solid ", borderColor: '#343434', color: '#343434', borderRadius: "10px" }}
                        value={selectedJudge || ""}
                        onChange={(e) => setSelectedJudge(e.target.value)}
                      >
                        <option value="">Judge Involved</option>
                        {uniqueJudges.map((judge) => (
                          <option key={judge} value={judge}>
                            {judge}
                          </option>
                        ))}
                      </select>

                      {/* <div className="filter-title">Document Type</div> */}
                      <select
                        style={{ border: "1px solid black", borderColor: '#343434', color: '#343434', borderRadius: "10px" }}
                        value={selectedDocumentType || ""}
                        onChange={(e) => setSelectedDocumentType(e.target.value)}
                      >
                        <option value="">Document Type</option>
                        {uniqueDocumentTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>

                      {/* <div className="filter-title">Keyword</div> */}
                      <select
                        style={{ border: "1px solid black", borderColor: '#343434', color: '#343434', borderRadius: "10px" }}
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
                      {/* <div className="filter-title">Month</div> */}
                      {/* Date Filters */}
                      <select
                        style={{ border: "1px solid black", borderColor: '#343434', color: '#343434', borderRadius: "10px" }}
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
                      {/* <div className="filter-title">Year</div> */}
                      {/* Date Filters */}
                      <select
                        style={{ border: "1px solid black", borderColor: '#343434', color: '#343434', borderRadius: "10px" }}
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
                      {/* <div className="filter-title">Court Name</div> */}
                      <select
                        style={{ border: "1px solid black", borderColor: '#343434', color: '#343434', borderRadius: "10px" }}
                        value={selectedCourt || ""}
                        onChange={(e) => setSelectedCourt(e.target.value)}
                      >
                        <option value="">Select Court Name</option>
                        {uniqueCourts.map((court) => (
                          <option key={court} value={court}>
                            {court}
                          </option>
                        ))}
                      </select>



                      {/* ...other right-side filters if any... */}
                      {/* </div> */}
                    </div>)
                  }


                </div>
              </div>)}

            {results && (
              <div  >
                <div style={{ justifyContent: 'space-around' }}>
                  <div className="search-bar">
                    {/* <h1>Human Rights Dossier</h1> */}
                    {/* <p>ICC, ICJ, HUDOC/ECHR, UN</p> */}
                    {/* Filter UI for Keywords */}

                    <input id="querr"
                      type="text"
                      value={searchQuery}
                      style={{ borderRadius: '10px', }}

                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}

                      onKeyDown={handleKeyDown}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 10)}
                      // onChange={fetchSuggestions((e) => setSearchQuery(e.target.value))}. (Score: {suggestion.score})
                      placeholder="Enter search query..."
                      className="search-query1"
                    />
                    <div style={{ justifyItems: 'center', paddingBottom: '8px' }}>
                      <center><button onClick={handleSearch} className="search-button">
                        Search
                      </button></center> </div>
                  </div>
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


                </div>

                <div className="central-content">
                  {!results && <center>
                    <div style={{ paddingTop: "140px" }}>
                      <img src={imag} alt="My Image" style={{ width: '221px', height: '102p' }} />
                    </div></center>}

                  {/* <div>Related Items: {keywo}</div> */}
                  <div>
                    {results && (<div className="toggle">
                      <div>
                        {/* <label className="switch-label">Sort by Date</label>
                          <label className="switch">
                            <input type="checkbox" checked={sortByDate} onChange={toggleSortMode} />
                            <span className="slider round"></span>
                          </label> */}
                        {/* {sortByDate && ( */}
                        {/* <div>
                            <button onClick={toggleSortDirection} onChange={toggleSortMode}>
                              {sortDirection === "newer" ? "Oldest to Newest ⬇️" : "Newest to Oldest ⬆️"}
                            </button>
                          </div> */}
                        <div className="toggle">
                          {sortByDate && (
                            <div>
                              <button onClick={toggleSortDirection}>
                                {sortDirection === "newer" ? "Newest to Oldest ⬇️" : "Oldest to Newest ⬆️"}
                              </button>
                            </div>
                          )}
                          <div>
                            <label className="switch-label">Sort by Date</label>
                            <label className="switch">
                              <input type="checkbox" checked={sortByDate} onChange={toggleSortMode} />
                              <span className="slider round"></span>
                            </label>

                          </div>
                          {/* <div>
                <label className="switch-label">Sort by Case Name</label>
                <label className="switch">
                  <input type="checkbox" checked={sortByCaseName} onChange={toggleSortByCaseName} />
                  <span className="slider round"></span>
                </label>
              </div> */}
                          {/* <div>
              <label className="switch-label">Group by Score</label>
              <label className="switch">
                <input type="checkbox" checked={group} onChange={togglegroupedMode} />
                <span className="slider round"></span>
              </label>
            </div> */}
                        </div>
                        {/* )} */}
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
                    </div>)}
                  </div>
                  <div className="search-results-container">

                    <div className="search-results">
                      {loading ? (
                        <div className="spinner-overlay">
                          <div className='spinner'>

                            {/* <Lottie animationData={nopage} loop={true} renderer={'svg'} /> */}
                            <ClipLoader size={150} color={"#123abc"} loading={loading} />
                          </div>
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
                              <div key={group.caseName} style={{ borderRadius: '5px', borderWidth: '0.5px', borderColor: 'black', backgroundColor: index % 2 === 0 ? '#e7e3e3' : '#c3c3c6', marginBottom: index !== group.length - 1 ? '20px' : '0' }}>
                                <div className="accordion-header" onClick={() => toggleAccordion(group.caseName)} style={{ display: 'flex', justifyContent: 'space-between', padding: '5', textAlign: "center" }}>
                                  <div style={{ fontSize: '1.2em', padding: '10px' }}><strong>{group.caseName}</strong></div>
                                  <span className="accordion-toggle" style={{ fontSize: '2em', paddingRight: '10px', textAlign: "center" }}>
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
                              // setSearchPerformed(true),
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
                              searchPerformed && <p>No cases found.</p>
                            ))
                          )}
                          {!groupedResults && !results && (
                            searchPerformed && <p>No cases found.</p>
                          )}
                        </div>
                      )}
                    </div></div>
                </div>
              </div>
            )}


            {/* {results && (<div className="right-filters">
              <div>
            {user ? (
              <div style={{ position: 'relative' }}>
                { <div style={{ position: 'relative', left: '70px', bottom: '10px' }}>
                  <button onClick={logoutUser} style={{ top: 0, right: 0, backgroundColor: '#24272a', color: 'red', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
                </div>
            { <div style={{ marginTop: '30px' }}>
                  <p style={{ fontSize: '15px', fontWeight: 'bold' }}>Welcome,</p>
                  <p style={{ fontSize: '15px', fontWeight: 'bold' }}>{user.name}!</p>
                </div> }
              </div>
            ) : (
              // <button onClick={handleModalOpen}>Open Login</button>
              <div onClick={handleModalOpen} style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer', padding: '20px' }}>
                LoginLogin <FontAwesomeIcon icon={faRightToBracket} size="2x" />
              </div>
            )} }

            {modalShow && <LoginModal show={modalShow} handleLogin={login} />}
          </div>
          </div>)} */}
            {modalShow && <LoginModal show={modalShow} handleLogin={login} />}
          </>
        ) : (
          <div className="parent-div">
            {/* <div className="central-content">
        
        <div className="search-container">
          <h1>Human Rights Dossier</h1>
          <input id="querr"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 10)}
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
                    
                  }}
                  onMouseDown={(e) => e.preventDefault()} 
                >
                  {suggestion.token}
                </li>
              ))}
            </ul>
          )}

          
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
          {loading && (
            <div className="spinner-overlay">
              <div className='spinner'>

                <Lottie animationData={nopage} loop={true} renderer={'svg'} />
                
              </div>
            </div>
            
          )}
        </div>
        </div> */}
            <div className="search-results">
              {loading ? (
                <div className='spinner'>

                  {/* <Lottie animationData={nopage} loop={true} renderer={'svg'} /> */}
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
                  <div>
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
                        {sortByCaseName && (
                          <div>
                            <button onClick={setOpenAccordion(true)}>
                              {openAccordion ? "Expand All" : "Collapse All"}
                            </button>
                          </div>
                        )}
                      </div>
                      {/* <div>
                  <label className="switch-label">Group by Score</label>
                  <label className="switch">
                    <input type="checkbox" checked={group} onChange={togglegroupedMode} />
                    <span className="slider round"></span>
                  </label>
                </div>*/}
                    </div></div>

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
                      // setSearchPerformed(true),
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

        )}

      </div>
  )
};
export default Search_content;