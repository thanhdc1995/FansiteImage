import { useEffect } from "react";

const useDetectChangeOnoriention = () => {
  useEffect(() => {
    let isChanging = 0;

    const handleOrientationChange = () => {
        isChanging = isChanging + 1;
      
        setTimeout(() => {
          if (isChanging === 1){
            window.location.reload();
            isChanging = 0;
          } else{
            isChanging = 0;
          }
        }, 500);
    };

    window.addEventListener("orientationchange", handleOrientationChange, false);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange, false);
    };
  }, []);
};

export default useDetectChangeOnoriention;
