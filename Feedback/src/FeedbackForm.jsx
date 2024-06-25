import React, { useState } from 'react';
import './Feedback.css'; // Assuming you have a separate CSS file

const FeedbackForm = () => {
  const [selectedFeedback, setSelectedFeedback] = useState('');
  
  const [serverResponse, setServerResponse] = useState('');

  const handleFeedbackClick = (feedback) => {
    setSelectedFeedback(feedback);
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate submitting feedback to a server (for demonstration purposes)
    if (selectedFeedback) {
     
      setServerResponse('Thank you for your feedback and suggestions!');
      setSelectedFeedback('');
     
    }
  };

  return (
    <div className="feedback-container">
      <h1>User Feedback</h1>
      <div className="feedback-buttons">
        <button onClick={() => handleFeedbackClick('Happy')} className="feedback-button">
          Happy
        </button>
        <button onClick={() => handleFeedbackClick('Sad')} className="feedback-button">
          Sad
        </button>
        <button onClick={() => handleFeedbackClick('Unhappy')} className="feedback-button">
          Unhappy
        </button>
        <button onClick={() => handleFeedbackClick('Excited')} className="feedback-button">
          Excited
        </button>
      </div>
      {selectedFeedback && (
        <div className="feedback-form">
          <h2>Feedback Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Feedback:</label>
              <textarea
                value={selectedFeedback}
                readOnly
                rows={4}
                placeholder="Type your feedback here..."
              />
            </div>
            
            <button type="submit">Submit Feedback</button>
          </form>
        </div>
      )}
      {serverResponse && (
        <div className= "server-response">
          <p>{serverResponse}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
