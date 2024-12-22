import axios from "axios";

// Step 6: Verify the credential with backend
export async function verifyCredential(username, serializedCredential) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_STRING}/webauthn-verify-login`,
      { username, credential: serializedCredential },
      { withCredentials: true }
    );
    return response.data.success;
  } catch (error) {
    console.error("Credential verification error:", error);
    return false;
  }
}
