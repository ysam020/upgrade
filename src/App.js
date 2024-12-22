import "./App.scss";
import { UserContext } from "./contexts/UserContext";
import { AlertContext } from "./contexts/AlertContext";
import React, { useState, useMemo, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import useInactivityTimeout from "./hooks/useInactivityTimeout";
import useUserVerification from "./hooks/useUserVerification";
import useOnlineStatus from "./hooks/useOnlineStatus";
import useLogout from "./hooks/useLogout";
import SpotlightModal from "./modals/SpotlightModal";
import useSpotlightModal from "./hooks/useSpotlightModal";
import useNavigateWithKeyboard from "./hooks/useNavigateWithKeyboard";
import useFullScreen from "./hooks/useFullScreen.js";
import useModuleAssignedAlert from "./hooks/useModuleAssignedAlert.js";
import OfflineModal from "./modals/OfflineModal.js";
import BroadcastModal from "./modals/BroadcastModal.js";
import useToggleSidebar from "./hooks/useToggleSidebar.js";
import useBroadcastApi from "./hooks/useBroadcastApi.js";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Alert from "@mui/material/Alert";

function App() {
  const [user, setUser] = useState();
  const [alert, setAlert] = React.useState({
    open: false,
    message: "",
    severity: "",
  });
  const [offline, setOffline] = useState(false);
  const handleLogout = useLogout(setUser);
  const [showSidebar, setShowSidebar] = useState(true);
  const [broadcastModal, setBroadcastModal] = useState(false);
  const channel = useMemo(() => new BroadcastChannel("app-tabs"), []);
  const { open, handleOpen, handleClose } = useSpotlightModal(user);
  const loading = useUserVerification(setUser);
  useInactivityTimeout(handleLogout);
  useModuleAssignedAlert(user, setUser, setAlert);
  useOnlineStatus(setOffline);
  useNavigateWithKeyboard();
  useFullScreen();
  useToggleSidebar(setShowSidebar);
  const handleUseInThisTab = useBroadcastApi(channel, setBroadcastModal);

  useEffect(() => {
    if (alert.open) {
      const timer = setTimeout(() => {
        setAlert({ ...alert, open: false });
      }, 2000);

      return () => clearTimeout(timer); // Cleanup on component unmount
    }
  }, [alert]);

  return (
    <UserContext value={{ user, setUser, handleLogout }}>
      <AlertContext value={{ alert, setAlert }}>
        <div className="App">
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </div>
          ) : user ? (
            <HomePage
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
            />
          ) : (
            <LoginPage />
          )}
        </div>

        <SpotlightModal
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
        <OfflineModal
          open={offline}
          handleClose={(event, reason) => {
            if (reason !== "backdropClick") {
              setOffline(false);
            }
          }}
        />
        <BroadcastModal
          open={broadcastModal}
          handleUseInThisTab={handleUseInThisTab}
          handleClose={(event, reason) => {
            if (reason !== "backdropClick") {
              setBroadcastModal(false);
            }
          }}
        />

        {alert.open && <Alert severity={alert.severity}>{alert.message}</Alert>}
      </AlertContext>
    </UserContext>
  );
}

export default React.memo(App);
