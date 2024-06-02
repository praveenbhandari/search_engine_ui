import React from "react";

import { ReactComponent as FeedbackIcon } from './feedback-icon.svg';

function Feedback ({results,isCollapsed,toggleCollapse,feedback_data,feedback,isSubmitted, setFeedback_data}){
  return (<div>
    {!results && (<div className="feedback-wrapper">
            {isCollapsed ? (
              <div className="chatbot-icon" onClick={toggleCollapse}>
              
                <FeedbackIcon style={{ width: '50px', height: '50px' }} />
              </div>
            ) : (
              <div className="close-icon" style={{ fontWeight: '20px' }} onClick={toggleCollapse}>
                &#x2715; 
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
          </div>)}

          {results && (<div className="feedback-wrapper-l">
            {isCollapsed ? (
              <div className="chatbot-icon-l" onClick={toggleCollapse}>
                Feedback
                {/* <FeedbackIcon style={{ width: '50px', height: '50px' }} /> */}
              </div>
            ) : (
              <div className="close-icon" style={{ fontWeight: '20px' }} onClick={toggleCollapse}>
                &#x2715; {/* Unicode character for the cross icon */}
              </div>
            )}
            <div className={`card-container ${isCollapsed ? 'collapsed' : ''}`}>
              <div className="card-body">
                {/* <div className="collapsible-header" onClick={toggleCollapse}> */}
                {/* <span className={`collapse-icon ${isCollapsed ? 'collapsed' : ''}`}>&#9660;</span> */}
                {/* </div> */}
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
          </div>)}
  </div>)
};
export default Feedback;