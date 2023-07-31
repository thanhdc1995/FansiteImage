import React, {useState } from "react";
import useDetectChangeOnoriention from "./useDetectChangeOnoriention";

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useDetectChangeOnoriention();

  return (
    <div>
      <h1>Orientation Change Detection</h1>
      <button onClick={handleShowPopup}>Show Popup</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Popup Content</h2>
            <p>This is the popup that appears when orientation changes.</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
