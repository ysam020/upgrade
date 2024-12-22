import axios from "axios";

// Save FCM token
export const saveToken = async (token, setAlert) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_STRING}/save-fcm-token`,
      { fcmToken: token },
      { withCredentials: true }
    );

    setAlert({
      open: true,
      message: res.data.message,
      severity: "success",
    });
  } catch (error) {
    setAlert({
      open: true,
      message: error.response.data.message,
      severity: "error",
    });
  }
};
