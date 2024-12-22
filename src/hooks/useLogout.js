import { useCallback, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function useLogout(setUser) {
  const navigate = useNavigate();
  const handleLogout = useCallback(async () => {
    try {
      await axios(`${process.env.REACT_APP_API_STRING}/logout`, {
        withCredentials: true,
      });
      setUser(null);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }, [navigate, setUser]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key === "l"
      ) {
        event.preventDefault();
        handleLogout();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleLogout]);
  return handleLogout;
}

export default useLogout;
