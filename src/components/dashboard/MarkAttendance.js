import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import CustomCalendar from "../customComponents/Calendar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { AlertContext } from "../../contexts/AlertContext";

function MarkAttendance() {
  const [attendances, setAttendances] = useState([]);
  const [disableFields, setDisableFields] = useState({
    timeIn: false,
    timeOut: false,
  });
  const [todayTimeIn, setTodayTimeIn] = useState(""); // State for today's timeIn
  const [todayTimeOut, setTodayTimeOut] = useState(""); // State for today's timeOut
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  const { setAlert } = useContext(AlertContext);

  async function getAttendances() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_STRING}/get-attendances/${
          month + 1
        }/${year}`,
        { withCredentials: true }
      );
      setAttendances(res.data);

      // Get the current date in ISO format (start of the day)
      const currentDate = new Date().setHours(0, 0, 0, 0);

      // Find attendance for today
      const todayAttendance = res.data?.find((attendance) => {
        const attendanceDate = new Date(attendance.date).setHours(0, 0, 0, 0);
        return attendanceDate === currentDate;
      });

      if (todayAttendance) {
        // Function to convert UTC time to readable format
        const convertToReadableTime = (time) => {
          if (!time) return "";
          const date = new Date(time);
          return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }); // Format as HH:mm
        };

        // Update today's timeIn and timeOut
        setTodayTimeIn(convertToReadableTime(todayAttendance.timeIn));
        setTodayTimeOut(convertToReadableTime(todayAttendance.timeOut));

        // Update disableFields based on today's attendance data
        setDisableFields({
          timeIn: !!todayAttendance.timeIn, // Disable timeIn if present
          timeOut: !!todayAttendance.timeOut, // Disable timeOut if present
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    getAttendances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  const addAttendance = async (field) => {
    try {
      // Get the current position (coordinates)
      const position = await new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => resolve(position),
            (error) => reject(error),
            {
              timeout: 10000, // Timeout for location retrieval
              maximumAge: 0, // Don't use cached location
            }
          );
        } else {
          reject(new Error("Geolocation is not supported by this browser."));
        }
      });

      const { latitude, longitude } = position.coords; // Extract coordinates

      // Make the POST request to add attendance
      await axios.post(
        `${process.env.REACT_APP_API_STRING}/add-attendance`,
        { field, latitude, longitude }, // Send coordinates with the field
        { withCredentials: true }
      );

      // Refresh attendance data after adding
      getAttendances();
    } catch (error) {
      // Handle errors
      if (error.response) {
        setAlert({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      } else if (error.message === "User denied Geolocation") {
        setAlert({
          open: true,
          message:
            "Location permission denied. Please enable location permission to punch in.",
          severity: "error",
        });
      } else if (error.code === error.PERMISSION_DENIED) {
        setAlert({
          open: true,
          message:
            "Location permission is denied. Please enable location access.",
          severity: "error",
        });
      } else if (error.message) {
        setAlert({
          open: true,
          message: error.message,
          severity: "error",
        });
      } else {
        setAlert({
          open: true,
          message: "An unknown error occurred.",
          severity: "error",
        });
      }
    }
  };

  return (
    <Container className="dashboard-container">
      <h5>
        <strong>My Attendances</strong>
      </h5>
      <Row>
        <Col sx={5}>
          {!disableFields.timeIn && (
            <>
              <button
                onClick={() => addAttendance("timeIn")}
                className="btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AccessTimeIcon sx={{ fontSize: "20px", marginRight: "5px" }} />
                Punch In
              </button>
              <br />
              <br />
            </>
          )}
          {disableFields.timeIn && !disableFields.timeOut && (
            <>
              <button onClick={() => addAttendance("timeOut")} className="btn">
                <AccessTimeIcon sx={{ fontSize: "20px", marginRight: "5px" }} />
                Punch Out
              </button>
              <br />
              <br />
            </>
          )}

          <p>
            <strong>Time In:</strong> {todayTimeIn || "Not recorded yet"}
          </p>
          <p>
            <strong>Time Out:</strong> {todayTimeOut || "Not recorded yet"}
          </p>
        </Col>

        <Col xs={7}>
          <CustomCalendar
            attendances={attendances}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
            currentDate={currentDate}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default React.memo(MarkAttendance);
