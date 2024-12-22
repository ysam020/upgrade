import axios from "axios";

export async function disableWebAuthn(setAlert) {
  try {
    const res = await axios(
      `${process.env.REACT_APP_API_STRING}/disable-webauthn`,
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
}
