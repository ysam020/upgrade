import axios from "axios";

export const logOutFromAllSessions = async (setUser, navigate, setAlert) => {
  try {
    const res = await axios(
      `${process.env.REACT_APP_API_STRING}/logout-from-all-sessions`,
      { withCredentials: true }
    );

    if (res.data.message === "Success") {
      setUser(null);
      navigate("/");
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
};
