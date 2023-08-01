import { useEffect, useState } from "react";

const useDetectChangeOnoriention = () => {
  const [changeOrientation, setchangeOrientation] = useState(false);

  useEffect(() => {
    const handleOrientationChange = (event) => {
      if (event.type === "resize" && changeOrientation) {
        return window.location.reload();
      } else if (event.type === "orientationchange") {
        if (
          window.matchMedia("(orientation: portrait), (orientation: landscape)")
            .matches
        ) {
          setchangeOrientation(true);
        }
      }
    };

    window.addEventListener(
      "orientationchange",
      handleOrientationChange,
      false
    );
    window.addEventListener("resize", handleOrientationChange, false);

    return () => {
      window.removeEventListener(
        "orientationchange",
        handleOrientationChange,
        false
      );
      window.removeEventListener("resize", handleOrientationChange, false);
    };
  }, [changeOrientation]);
};

export default useDetectChangeOnoriention;
