import React from "react";
import Avatar from "@mui/material/Avatar";
import { Container, Row, Col } from "react-bootstrap";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

function BasicInfo(props) {
  return (
    <Container style={{ backgroundColor: "white", padding: "20px" }}>
      <Row>
        <Col>
          <div>
            <h5>Profile Info</h5>
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <Avatar
                src={props.user.employee_photo}
                style={{ width: 80, height: 80 }}
              />

              <List sx={{ width: "100%" }}>
                <ListItem>
                  <ListItemText primary="Username" />
                  <ListItemText secondary={props.user.username} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Name" />
                  <ListItemText secondary={props.user.fullName} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Birth Date" />
                  <ListItemText secondary={props.user.dob} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Blood Group" />
                  <ListItemText secondary={props.user.blood_group} />
                </ListItem>
              </List>
            </div>
          </div>
        </Col>

        <Col>
          <div>
            <h5>Contact Info</h5>
            <div style={{ display: "flex", alignItems: "center" }}>
              <List sx={{ width: "100%" }}>
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Email" />
                  <ListItemText secondary={props.user.email} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Official Email" />
                  <ListItemText secondary={props.user.official_email} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Mobile" />
                  <ListItemText secondary={props.user.mobile} />
                </ListItem>
              </List>
            </div>
          </div>
        </Col>
      </Row>

      <Divider variant="fullWidth" sx={{ opacity: 1 }} />
      <br />
      <Row>
        <Col>
          <div>
            <h5>Address Info</h5>
            <div style={{ display: "flex", alignItems: "center" }}>
              <List sx={{ width: "100%" }}>
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Communication Address" />
                  <ListItemText
                    secondary={[
                      props.user.communication_address_line_1,
                      props.user.communication_address_line_2,
                      props.user.communication_address_city,
                      props.user.communication_address_area,
                      props.user.communication_address_state,
                      props.user.communication_address_pincode,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Permanent Address" />
                  <ListItemText
                    secondary={[
                      props.user.permanent_address_line_1,
                      props.user.permanent_address_line_2,
                      props.user.permanent_address_city,
                      props.user.permanent_address_area,
                      props.user.permanent_address_state,
                      props.user.permanent_address_pincode,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  />
                </ListItem>
              </List>
            </div>
          </div>
        </Col>

        <Col>
          <div>
            <h5>Bank Info</h5>
            <div style={{ display: "flex", alignItems: "center" }}>
              <List sx={{ width: "100%" }}>
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Bank Account Number" />
                  <ListItemText secondary={props.user.bank_account_no} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Bank Name" />
                  <ListItemText secondary={props.user.bank_name} />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemText primary="IFSC" />
                  <ListItemText secondary={props.user.ifsc_code} />
                </ListItem>
              </List>
            </div>
          </div>
        </Col>
      </Row>

      <Divider variant="fullWidth" sx={{ opacity: 1 }} />
      <br />

      <Row>
        <Col>
          <div>
            <h5>Employment Info</h5>
            <div style={{ display: "flex", alignItems: "center" }}>
              <List sx={{ width: "100%" }}>
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Designation" />
                  <ListItemText secondary={props.user.designation} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Department" />
                  <ListItemText secondary={props.user.department} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Joining Date" />
                  <ListItemText secondary={props.user.joining_date} />
                </ListItem>
              </List>
            </div>
          </div>
        </Col>
        <Col>
          <div>
            <h5>Documents</h5>
            <div style={{ display: "flex", alignItems: "center" }}>
              <List sx={{ width: "100%" }}>
                <ListItem alignItems="flex-start">
                  <ListItemText primary="AADHAR Number" />
                  <a href={props.user.aadhar_photo_front}>
                    <ListItemText
                      sx={{ color: "blue !important" }}
                      secondary={props.user.aadhar_no}
                    />
                  </a>
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText primary="PAN Number" />
                  <a href={props.user.pan_photo}>
                    <ListItemText secondary={props.user.pan_no} />
                  </a>
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText primary="PF Number" />
                  <ListItemText secondary={props.user.pf_no} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText primary="ESIC Number" />
                  <ListItemText secondary={props.user.esic_no} />
                </ListItem>
              </List>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default React.memo(BasicInfo);
