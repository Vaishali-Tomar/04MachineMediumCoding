import React, {useState} from "react";
import "./Feedback.css";

const FeedbackForm = () => {
  const [selectedFeedback, setSelectedFeedback] = useState("");

  const [serverResponse, setServerResponse] = useState("");

  const handleFeedbackClick = (feedback) => {
    setSelectedFeedback(feedback);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(selectedFeedback){
      setServerResponse("thank you Your feedback");
      setSelectedFeedback('');
    }
  }
  return (
    <div>
      <h1>User Feedback</h1>
      <div>
        <button onClick={() => handleFeedbackClick("Happy")}>Happy</button>
        <button onClick={() => handleFeedbackClick("sad")}>Sad</button>
        <button onClick={() => handleFeedbackClick("Unhappy")}>Unhappy</button>
        <button onClick={() => handleFeedbackClick("Excited")}>Excited</button>
      </div>
      {selectedFeedback && (
        <div>
          <h2>Feedback form</h2>
          <form action="" onSubmit={handleSubmit}>
            <div>
            <label htmlFor="">Your Feedback:</label>
            <textarea
              value={selectedFeedback}
              readOnly
              rows={4}
              placeholder="Type your feedback"
            />
            </div>
            <button type='submit'>Submit Feedback</button>
          </form>

        </div>
      )}
      {serverResponse && (
        <div>
          <p>{serverResponse}</p>
          </div>
      )}
    </div>
  );
};

export default FeedbackForm;
