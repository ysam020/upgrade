import axios from "axios";

export async function disableTwoFactor(setIsTwoFactorEnabled, setAlert) {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_STRING}/disable-two-factor`,
      { withCredentials: true }
    );
    if (res.data.message === "Two factor authentication disabled") {
      setIsTwoFactorEnabled(false);
    } else {
      setAlert({
        open: true,
        message: res.data.message,
        severity: "success",
      });
    }
  } catch (error) {
    setAlert({
      open: true,
      message: error.response.data.message,
      severity: "error",
    });
  }
}
