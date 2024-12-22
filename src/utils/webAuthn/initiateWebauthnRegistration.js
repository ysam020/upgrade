import axios from "axios";
import { urlBase64ToUint8Array } from "./urlBase64ToUint8Array";
import { verifyWebauthnRegistration } from "./verifyWebauthnRegistration";

// Initiate WebAuthn Registration
export async function initiateWebauthnRegistration(setAlert) {
  try {
    const registrationOptionsRes = await axios(
      `${process.env.REACT_APP_API_STRING}/webauthn-register`,
      { withCredentials: true }
    );

    const challenge = urlBase64ToUint8Array(
      registrationOptionsRes.data.challenge
    );
    const userId = urlBase64ToUint8Array(registrationOptionsRes.data.user.id);

    const publicKeyOptions = {
      ...registrationOptionsRes.data,
      challenge,
      user: {
        ...registrationOptionsRes.data.user,
        id: userId,
      },
    };

    // Create credentials using WebAuthn API
    const credential = await navigator.credentials.create({
      publicKey: publicKeyOptions,
    });

    // Send the generated credential to verify and finalize registration
    await verifyWebauthnRegistration(credential, setAlert);
  } catch (error) {
    console.error("Registration error:", error);
  }
}
