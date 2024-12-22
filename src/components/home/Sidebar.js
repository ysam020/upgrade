import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/sidebar.scss";
import { Avatar, IconButton, ListItemButton, Tooltip } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function Sidebar() {
  const navigate = useNavigate();
  const { user, handleLogout } = useContext(UserContext);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const navItems = [
    { title: "Dashboard", icon: <SpaceDashboardIcon />, path: "/" },
    { title: "Calendar", icon: <CalendarMonthIcon />, path: "/calendar" },
    { title: "Modules", icon: <ViewModuleIcon />, path: "/modules" },
    // Conditionally render "Assign Module" based on user.rank
    ...(user.rank <= 2
      ? [
          {
            title: "Assign Module",
            icon: <AssignmentIndIcon />,
            path: "/assign",
          },
        ]
      : []),
    { title: "Help", icon: <LiveHelpIcon />, path: "/help" },
  ];

  return (
    <div className="sidebar">
      <Tooltip
        title={`Welcome ${user.first_name}`}
        enterDelay={0}
        placement="right"
      >
        <IconButton onClick={() => handleNavigation("/profile")}>
          <Avatar src={user.employee_photo} alt="Employee Photo" />
        </IconButton>
      </Tooltip>

      {navItems.map((item, index) => (
        <Tooltip title={item.title} placement="right" key={index}>
          <ListItemButton
            className="appbar-links"
            aria-label="list-item"
            onClick={() => handleNavigation(item.path)}
          >
            <IconButton sx={{ color: "#ffffff9f" }} aria-label="icon">
              {item.icon}
            </IconButton>
          </ListItemButton>
        </Tooltip>
      ))}

      <Tooltip title="Logout" enterDelay={0} placement="right">
        <ListItemButton
          sx={{ textAlign: "left" }}
          className="appbar-links"
          aria-label="list-item"
          onClick={handleLogout}
        >
          <IconButton sx={{ color: "#ffffff9f" }} aria-label="icon">
            <LogoutRoundedIcon />
          </IconButton>
        </ListItemButton>
      </Tooltip>
    </div>
  );
}

export default React.memo(Sidebar);
