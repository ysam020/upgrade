import axios from "axios";

export const disablePushNotifications = async (setAlert) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_STRING}/disable-push-notifications`,
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
