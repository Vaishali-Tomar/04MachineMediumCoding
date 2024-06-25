import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [attempts, setAttempts] = useState(0);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    const correctOtp = "123456"; // This would come from the backend in a real application

    setAttempts(attempts + 1);
    setIsOtpValid(enteredOtp === correctOtp);
  };

  return (
    <div className="App">
      <h1>OTP Verification</h1>
      <form onSubmit={handleSubmit}>
        {otp.map((data, index) => (
          <input
            className={`otp-input ${!isOtpValid && "invalid"}`}
            type="text"
            name="otp"
            maxLength="1"
            key={index}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onFocus={(e) => e.target.select()}
          />
        ))}
        <button type="submit">Verify OTP</button>
      </form>
      {!isOtpValid && <p className="error">Invalid OTP. Please try again.</p>}
      <p>Attempts: {attempts}</p>
    </div>
  );
};

export default App;
