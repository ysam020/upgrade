import React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Tooltip } from "@mui/material";

const drawerWidth = 60;

function AppbarComponent(props) {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: {
          lg: props.showSidebar ? `calc(100% - ${drawerWidth}px)` : "100%",
        },
        ml: { lg: `${drawerWidth}px` },
        backgroundColor: "rgba(249, 250, 251, 0.3)",
        backdropFilter: "blur(6px) !important",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => props.setMobileOpen(!props.mobileOpen)}
          sx={{ mr: 2, display: { lg: "none" } }}
        >
          <MenuIcon sx={{ color: "#000" }} />
        </IconButton>

        {window.location.pathname !== "/" && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => navigate(-1)}
            sx={{ mr: 1 }}
          >
            <ArrowBackIcon sx={{ color: "#000" }} />
          </IconButton>
        )}

        <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <img
              src={require("../../assets/images/logo.webp")}
              alt="logo"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer", width: "120px", height: "60px" }}
            />
          </div>
          <Tooltip title="Show/Hide Sidebar">
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={() => props.setShowSidebar(!props.showSidebar)}
              sx={{ height: "50px", width: "50px" }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default React.memo(AppbarComponent);
