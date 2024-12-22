import axios from "axios";

// Step 2: Retrieve WebAuthn login options
export async function getLoginOptions(username) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_STRING}/webauthn-login-options`,
      { username },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Login options error:", error);
    return null;
  }
}
