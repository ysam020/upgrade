import axios from "axios";

// Step 1: Check if WebAuthn credentials exist
export async function checkCredentials(username) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_STRING}/webauthn-credential-check`,
      { username },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error("Credential check error:", error);
    return false;
  }
}
