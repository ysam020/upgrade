import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Route, Routes } from "react-router-dom";
import { TabValueContext } from "../contexts/TabValueContext.js";
import AppbarComponent from "../components/home/AppbarComponent.js";
import DrawerComponent from "../components/home/DrawerComponent.js";
import ProtectedRoute from "../routes/ProtectedRoute.js";
import UnAuthorisedRoute from "../routes/UnAuthorisedRoute.js";
import routesConfig from "../routes/routesConfig.js";
import EventStrip from "../components/home/EventStrip.js";
import { UserContext } from "../contexts/UserContext";
import { NotificationContext } from "../contexts/NotificationContext";
import useNotifications from "../hooks/useNotifications.js";
import useEvents from "../hooks/useEvents.js";
import Chatbot from "../components/home/Chatbot.js";

const drawerWidth = 60;

function HomePage(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { user } = useContext(UserContext);
  const { notifications, setNotifications } = useNotifications(user);
  const events = useEvents();

  // Pass user to routesConfig to get filtered routes
  const filteredRoutes = routesConfig(user);

  return (
    <NotificationContext value={{ notifications, setNotifications }}>
      <TabValueContext value={{ tabValue, setTabValue }}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppbarComponent
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            showSidebar={props.showSidebar}
            setShowSidebar={props.setShowSidebar}
          />

          {props.showSidebar && (
            <DrawerComponent
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
            />
          )}

          {/* Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: {
                lg: `calc(100% - ${drawerWidth}px)`,
              },
              backgroundColor: "#F9FAFB",
              height: "100vh",
              overflow: "scroll",
              padding: events.length === 0 ? "20px" : "50px 20px",
              paddingTop: 0,
            }}
          >
            <Toolbar />
            <Routes>
              {filteredRoutes.map(
                ({ path, element, allowedModules }, index) => (
                  <Route
                    key={index}
                    path={path}
                    element={
                      allowedModules.length === 0 ? (
                        element
                      ) : (
                        <ProtectedRoute allowedModules={allowedModules}>
                          {element}
                        </ProtectedRoute>
                      )
                    }
                  />
                )
              )}
              <Route path="/not-authorized" element={<UnAuthorisedRoute />} />
              <Route path="*" element={<UnAuthorisedRoute />} />
            </Routes>

            {events.length > 0 && <EventStrip events={events} />}
          </Box>
        </Box>

        {/* Chatbot Widget */}
        <Chatbot />
      </TabValueContext>
    </NotificationContext>
  );
}

export default React.memo(HomePage);
