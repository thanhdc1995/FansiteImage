import React, { useEffect, useState } from "react";

const debounce = (func, delay) => {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, arguments), delay);
  };
};

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

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

  // Sử dụng debounce với hàm handleOrientationChange
  const debouncedHandleOrientationChange = debounce(handleOrientationChange, 300);

  useEffect(() => {
    if ('onorientationchange' in window) {
      window.addEventListener('orientationchange', debouncedHandleOrientationChange, false);
    }

    return () => {
      window.removeEventListener('orientationchange', debouncedHandleOrientationChange, false);
    };
  }, [debouncedHandleOrientationChange]);

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
