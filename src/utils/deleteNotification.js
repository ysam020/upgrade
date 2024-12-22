import axios from "axios";

export const deleteNotification = async (
  _id,
  notifications,
  setNotifications
) => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_API_STRING}/delete-notification/${_id}`,
      { withCredentials: true }
    );
    setNotifications(
      [...notifications].filter((notification) => notification._id !== _id)
    );
  } catch (err) {
    console.error(err);
  }
};
