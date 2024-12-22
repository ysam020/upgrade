import { useEffect } from "react";

const useInactivityTimeout = (handleLogout) => {
  useEffect(() => {
    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        handleLogout(); // Log out user after 1 hour of inactivity
      }, 3600000);
    };

    // Add event listeners for activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("touchstart", resetTimer);

    // Initialize timer on mount
    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      // Cleanup event listeners
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, [handleLogout]);
};

export default useInactivityTimeout;
