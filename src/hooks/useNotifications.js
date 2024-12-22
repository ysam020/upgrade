import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io(process.env.REACT_APP_SERVER_URL, {
  transports: ["websocket", "polling"],
});

function useNotifications(user) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios(
          `${process.env.REACT_APP_API_STRING}/get-notifications`,
          { withCredentials: true }
        );
        setNotifications(res.data);
      } catch (err) {
        console.error(err);
        setNotifications([]);
      }
    }

    getData();

    socket.on("notification", (data) => {
      if (data.department === user.department && data.rank <= user.rank) {
        setNotifications([data, ...notifications]);
      }
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  return { notifications, setNotifications };
}

export default useNotifications;
