import React from "react";
import "../../styles/dashboard.scss";
import { Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import Info from "./Info";
import Attendance from "./Attendance";
import HrActivities from "./HrActivities";
import MarkAttendance from "./MarkAttendance";
import Notifications from "./Notifications";
import StickyNotes from "./StickyNotes";

function Dashboard() {
  const { user } = React.useContext(UserContext);

  return (
    <>
      <Container fluid className="dashboard">
        <Row>
          <Col xs={12} md={6} lg={8}>
            <Row>
              <Col xs={12} lg={5}>
                <Info user={user} />
              </Col>
              <Col xs={12} lg={7}>
                <Attendance />
              </Col>
            </Row>
            <Row>
              <Col>
                <HrActivities />
              </Col>
            </Row>
            <Row>
              <Col>
                <MarkAttendance />
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Row>
              <Notifications />
            </Row>
            <Row>
              <Col style={{ padding: 0 }}>
                <StickyNotes />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default React.memo(Dashboard);
