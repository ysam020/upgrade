import { useEffect } from "react";

const useOnlineStatus = (setOffline) => {
  useEffect(() => {
    const handleOnline = () => {
      setOffline(false);
    };

    const handleOffline = () => {
      setOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
    // eslint-disable-next-line
  }, []);
};

export default useOnlineStatus;
