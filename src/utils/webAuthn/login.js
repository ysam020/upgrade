import axios from "axios";
import { getGeolocation } from "../auth/getGeolocation";

// Step 7: Finalize login and update user state
export async function login(username, serializedCredential, setUser, setAlert) {
  const geolocation = await getGeolocation(setAlert);
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_STRING}/webauthn-login`,
      {
        username,
        geolocation,
        userAgent: navigator.userAgent,
        credential: serializedCredential,
      },
      { withCredentials: true }
    );

    if (response.data.message === "Login successful") {
      setUser(response.data.user);
    } else {
      setAlert({
        open: true,
        message: response.data.message,
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
}
