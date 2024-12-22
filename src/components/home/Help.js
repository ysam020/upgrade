import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import { Container, Row, Col } from "react-bootstrap";

function Help() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Use userAgent to detect macOS
    const userAgent = navigator.userAgent.toLowerCase();
    setIsMac(userAgent.includes("mac"));
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <div>
            <br />
            <h5>Keyboard Shortcuts</h5>
            <br />
            <div style={{ display: "flex", alignItems: "center" }}>
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Toggle Fullscreen" />
                  <ListItemText
                    secondary={
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        {isMac ? (
                          <span className="key">Cmd</span>
                        ) : (
                          <span className="key">Ctrl</span>
                        )}
                        <span className="key">Shift</span>
                        <span className="key">F</span>
                      </span>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Show/Hide Sidebar" />
                  <ListItemText
                    secondary={
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        {isMac ? (
                          <span className="key">Cmd</span>
                        ) : (
                          <span className="key">Ctrl</span>
                        )}
                        <span className="key">Shift</span>
                        <span className="key">S</span>
                      </span>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Route Query" />
                  <ListItemText
                    secondary={
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        <span className="key">Shift</span>
                        <span className="key">Space</span>
                      </span>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Navigate Between Pages" />
                  <ListItemText
                    secondary={
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        {isMac ? (
                          <span className="key">Cmd</span>
                        ) : (
                          <span className="key">Ctrl</span>
                        )}
                        <span className="key">Shift</span>
                        <span className="key">&larr; &rarr;</span>
                      </span>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Chatbot" />
                  <ListItemText
                    secondary={
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        {isMac ? (
                          <span className="key">Cmd</span>
                        ) : (
                          <span className="key">Ctrl</span>
                        )}
                        <span className="key">Shift</span>
                        <span className="key">A</span>
                      </span>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Logout" />
                  <ListItemText
                    secondary={
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        {isMac ? (
                          <span className="key">Cmd</span>
                        ) : (
                          <span className="key">Ctrl</span>
                        )}
                        <span className="key">Shift</span>
                        <span className="key">L</span>
                      </span>
                    }
                  />
                </ListItem>
              </List>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default React.memo(Help);
