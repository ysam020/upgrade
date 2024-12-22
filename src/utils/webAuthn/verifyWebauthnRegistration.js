import axios from "axios";

export const verifyWebauthnRegistration = async (credential, setAlert) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_STRING}/webauthn-verify-registration`,
      { credential },
      { withCredentials: true }
    );
    if (res.data.verified) {
      setAlert({
        open: true,
        message: "Registration successful!",
        severity: "success",
      });
    } else {
      setAlert({
        open: true,
        message: "Registration failed. Please try again.",
        severity: "error",
      });
    }
  } catch (error) {
    setAlert({
      open: true,
      message: error.response.data.message,
      severity: "error",
    });
  }
};
