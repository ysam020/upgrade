import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Attendance() {
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios(
          `${process.env.REACT_APP_API_STRING}/get-attendance-summary`,
          {
            withCredentials: true,
          }
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching attendance summary:", error);
      }
    }

    getData();
  }, []);

  return (
    <div
      onClick={() => navigate("/attendance")}
      style={{ cursor: "pointer" }}
      className="dashboard-container"
    >
      <h5>
        <strong>Attendance and Leaves</strong>
      </h5>
      <Row className="attendance-row attendance-row-1">
        <Col>
          <span className="leaves-taken">{data?.workingDays}</span>
          <p>Working Days</p>
        </Col>
        <Col>
          <span className="total-leaves">{data?.presentCount}</span>
          <p>Presents</p>
        </Col>
        <Col>
          <span className="leaves-absent">{data?.totalLeaves}</span>
          <p>Leaves</p>
        </Col>
      </Row>
      <Row className="attendance-row attendance-row-2">
        <Col>
          <span className="pending-approval">{data?.paidLeaves}</span>
          <p>Paid Leaves</p>
        </Col>
        <Col>
          <span className="working-days">{data?.unpaidLeaves}</span>
          <p>Unpaid Leaves</p>
        </Col>
        <Col>
          <span className="loss-of-pay">{data?.weekOffsCount}</span>
          <p>Week Offs</p>
        </Col>
      </Row>
    </div>
  );
}

export default React.memo(Attendance);
