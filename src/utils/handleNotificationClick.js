export const handleNotificationClick = (title, navigate) => {
  switch (title) {
    case "Leave Request":
      navigate("/attendance");
      break;
    case "Week Off Request":
      navigate("/attendance");
      break;
    case "Resignation":
      navigate("/resignation-process");
      break;
    default:
      break;
  }
};
