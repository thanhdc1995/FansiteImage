import React, { useEffect, useState } from "react";

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [changeOrientation, setchangeOrientation] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const handleOrientationChange = (event) => {
      if (event.type === "resize" && changeOrientation) {
        setchangeOrientation(false);
      } else if (event.type === "orientationchange") {
        setchangeOrientation(true);
      }
    };
  
    window.addEventListener('orientationchange', handleOrientationChange, false);
    window.addEventListener('resize', handleOrientationChange, false);
  
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange, false);
      window.removeEventListener('resize', handleOrientationChange, false);
    };
  }, [changeOrientation]);

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
