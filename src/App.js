import React, { useEffect, useState } from "react";

const App = () => {
  const [orientation, setOrientation] = useState(0);

  const handleOrientationChange = (e) => {
    setOrientation(e.target.screen.orientation.angle);
    // switch (e.target.screen.orientation.angle) {
    //   case 0:
    //     return window.location.reload();
    //   case -90:
    //     break;
    //   case 90:
    //     return window.location.reload();
    //   case 180:
    //     break;
    //   default:
    //     break;
    // }
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
    </div>
  );
};

export default App;
