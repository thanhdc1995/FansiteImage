import { useEffect } from "react";

const useDetectChangeOnoriention = () => {
  useEffect(() => {
    let countChanging = 0;
    let timer;

    const handleOrientationChange = () => {
      countChanging = countChanging + 1;

      clearTimeout(timer);
      timer = setTimeout(() => {
        if (countChanging === 1) {
          countChanging = 0;
          window.location.reload();
        } else {
          countChanging = 0;
        }
      }, 1000);
    };

    window.addEventListener(
      "orientationchange",
      handleOrientationChange,
      false
    );

    return () => {
      window.removeEventListener(
        "orientationchange",
        handleOrientationChange,
        false
      );
    };
  }, []);
};

export default useDetectChangeOnoriention;
