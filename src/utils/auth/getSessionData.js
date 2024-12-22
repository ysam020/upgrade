import axios from "axios";

export const getSessionData = async (setGeolocation) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_STRING}/get-session-data`,
      { withCredentials: true }
    );
    setGeolocation(res.data || []);
  } catch (error) {
    console.error("Error fetching geolocation", error);
    setGeolocation([]);
  }
};
