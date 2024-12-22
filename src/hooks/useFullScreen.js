import { useEffect } from "react";
import { toggleFullScreen } from "../utils/keyboard-shortcuts/toggleFullScreen";

function useFullScreen() {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check for Shift + S (Shift key and 'S' key)
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key === "f"
      ) {
        event.preventDefault();
        toggleFullScreen();
      }
    };

    // Attach event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}

export default useFullScreen;
