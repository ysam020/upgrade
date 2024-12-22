import { useEffect, useState } from "react";
import axios from "axios";

function useEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getEvents() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_STRING}/get-events`,
          { withCredentials: true }
        );
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    getEvents();
  }, []);

  return events;
}

export default useEvents;
