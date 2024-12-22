import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Row, Col } from "react-bootstrap";
import Switch from "@mui/material/Switch";
import { initiateWebauthnRegistration } from "../../utils/webAuthn/initiateWebauthnRegistration";
import { disableWebAuthn } from "../../utils/webAuthn/disableWebAuthn";
import { enableTwoFactor } from "../../utils/auth/enableTwoFactor";
import { disableTwoFactor } from "../../utils/auth/disableTwoFactor";
import Divider from "@mui/material/Divider";
import { AlertContext } from "../../contexts/AlertContext";

function TwoFactorAuthentication() {
  const { user, setUser } = useContext(UserContext);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [qr, setQr] = useState(null);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (user) {
      setIsTwoFactorEnabled(user.isTwoFactorEnabled || false);
      setQr(user.qrCodeImage || null);
    }
  }, [user]);

  const handleTwoFASwitchChange = (e) => {
    if (e.target.checked) {
      enableTwoFactor(user, setIsTwoFactorEnabled, setQr, setUser);
    } else {
      disableTwoFactor(setIsTwoFactorEnabled, setAlert);
    }
  };

  return (
    <Row>
      <Col>
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <List
              sx={{
                width: "100%",
              }}
            >
              <ListItem alignItems="flex-start">
                <ListItemText primary="WebAuthn Registration (for password-less login)" />
                <ListItemText
                  secondary={
                    <>
                      <button
                        style={{ marginTop: 0 }}
                        className="btn"
                        onClick={() => initiateWebauthnRegistration(setAlert)}
                      >
                        Enable on this device
                      </button>
                      <button
                        style={{ marginTop: 0, marginLeft: "10px" }}
                        className="btn"
                        onClick={() => disableWebAuthn(setAlert)}
                      >
                        Disable
                      </button>
                    </>
                  }
                />
              </ListItem>
              <Divider variant="fullWidth" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText primary="Google Authenticator (2FA)" />
                <ListItemText
                  secondary={
                    <Switch
                      checked={isTwoFactorEnabled}
                      onChange={handleTwoFASwitchChange}
                    />
                  }
                />
              </ListItem>
              {isTwoFactorEnabled && (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemText primary="Scan the QR code below to enable 2FA using Google Authenticator App" />
                    <ListItemText />
                  </ListItem>
                  <img src={qr} alt="QR code" />
                </>
              )}
            </List>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default React.memo(TwoFactorAuthentication);
