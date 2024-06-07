import React from "react";

import { ReactComponent as FeedbackIcon } from './feedback-icon.svg';

function Feedback (
  // {results,isCollapsed,toggleCollapse,feedback_data,feedback,isSubmitted, setFeedback_data}
){
  return (
    <div className="feedback-wrapper">
    {isCollapsed ? (
      <div className="chatbot-icon" onClick={toggleCollapse}>

        <FeedbackIcon style={{ width: '50px', height: '50px' }} />
      </div>
    ) : (
      <div style={{ color: '#f8f8f8', backgroundColor: "#323232", width: "100%", borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }}>
        <div className="close-icon" style={{ fontWeight: '20px', fontWeight: '20', padding: 5, alignContent: "start", borderTopRightRadius: '10px', borderTopLeftRadius: '10px' }} onClick={toggleCollapse}>
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
  )
};
export default Feedback;