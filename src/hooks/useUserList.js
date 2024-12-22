import { useState, useEffect } from "react";
import axios from "axios";

function useUserList() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await axios(
          `${process.env.REACT_APP_API_STRING}/get-all-users`,
          {
            withCredentials: true,
          }
        );
        setUserList(res.data.map((user) => user.username));
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    }

    getUsers();
  }, []);
  return userList;
}

export default useUserList;
