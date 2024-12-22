import { getToken } from "firebase/messaging";
import { saveToken } from "./saveToken";
import { messaging } from "../../firebase";

// Generate FCM token
export const generateToken = async (setAlert) => {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    try {
      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY,
      });

      await saveToken(token, setAlert);
    } catch (error) {
      console.error("Error generating token:", error);
    }
  }
};
