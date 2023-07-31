import React, { useState, useEffect } from "react";
import "./App.css";

const useDetectChangeOnoriention = () => {
  const updateOrientation = (e) => {
    switch (e.target.screen.orientation.angle) {
      case 0:
        break;
      case -90:
        return window.location.reload();
      case 90:
        return window.location.reload();
      default:
        break;
    }
  };

  useEffect(() => {
    if ("onorientationchange" in window) {
      window.addEventListener("orientationchange", updateOrientation, false);
    }

    return () => {
      window.removeEventListener("orientationchange", updateOrientation, false);
    };
  }, []);
};

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  useDetectChangeOnoriention();

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <h1>Orientation Change Popup</h1>
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
