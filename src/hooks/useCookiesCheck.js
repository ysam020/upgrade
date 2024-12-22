import { useContext, useEffect } from "react";
import { AlertContext } from "../contexts/AlertContext";

const useCookiesCheck = () => {
  const { setAert } = useContext(AlertContext);
  useEffect(() => {
    if (!navigator.cookieEnabled) {
      setAert({
        open: true,
        message:
          "Cookies are disabled in your browser. Please enable cookies to use this application.",
        severity: "error",
      });
    }
  }, []);
};

export default useCookiesCheck;
