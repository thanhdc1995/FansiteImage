import React, { useEffect, useState } from "react";

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [orientation, setOrientation] = useState(0);
  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleOrientationChange = (e) => {
    if (window.matchMedia("(orientation: portrait), (orientation: landscape)").matches) {
      return window.location.reload();
    }
  };

  useEffect(() => {
    if ("onorientationchange" in window) {
      window.addEventListener("orientationchange", handleOrientationChange);
    }

    window.addEventListener("resize", handleOrientationChange);

    return () => {
      if ("onorientationchange" in window) {
        window.removeEventListener(
          "orientationchange",
          handleOrientationChange
        );
      }

      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  return (
    <div>
      <h1>Orientation Change Detection</h1>
      <p>Current Orientation: {orientation}</p>
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
