import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { handleNotificationClick } from "../../utils/handleNotificationClick";
import { deleteNotification } from "../../utils/deleteNotification";
import useUpdateFavicon from "../../hooks/useUpdateFavicon";
import { NotificationContext } from "../../contexts/NotificationContext";

function Notifications() {
  const { notifications, setNotifications } = useContext(NotificationContext);
  const navigate = useNavigate();
  useUpdateFavicon(notifications);

  return (
    <div className="dashboard-container">
      <h5>
        <strong>Notifications</strong>
      </h5>
      {notifications.length > 0 ? (
        notifications.map((item, id) => (
          <div
            key={id}
            className="notification-container"
            onClick={() => handleNotificationClick(item.title, navigate)}
          >
            <div style={{ flex: 1 }}>
              <span>{item.title}</span>
              <p>{item.message}</p>
            </div>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                deleteNotification(item._id, notifications, setNotifications);
              }}
            >
              <DeleteIcon sx={{ color: "#F15C6D" }} />
            </IconButton>
          </div>
        ))
      ) : (
        <div className="notification-container">
          <p>No notifications</p>
        </div>
      )}
    </div>
  );
}

export default React.memo(Notifications);
