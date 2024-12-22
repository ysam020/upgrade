import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import axios from "axios";
import { AlertContext } from "../../../contexts/AlertContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function ScheduleInterviewModal(props) {
  const [dateTime, setDateTime] = useState(null);
  const { setAlert } = useContext(AlertContext);

  const handleSubmit = async () => {
    if (!dateTime) {
      setAlert({
        open: "true",
        message: "Please select date and time",
        severity: "warning",
      });
      return;
    }

    const startDate = dateTime.toDate();
    const endDate = new Date(startDate.getTime() + 1 * 60 * 60000); // Add 1 hour duration

    // Format start and end times in the required format for the ICS calendar
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      return `${year}${month}${day}T${hours}${minutes}00`;
    };

    const startFormatted = formatDate(startDate);
    const endFormatted = formatDate(endDate);

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_STRING}/schedule-interview`,
        {
          jobTitle: props.jobTitle,
          email: props.email,
          name: props.name,
          interviewDateTime: startDate,
          interviewStartTime: startFormatted,
          interviewEndTime: endFormatted,
        },
        { withCredentials: true }
      );

      props.handleClose();

      setAlert({
        open: true,
        message: res.data.message,
        severity: "success",
      });
    } catch (err) {
      setAlert({
        open: true,
        message: err.response.data.message,
        severity: "error",
      });
    }
  };

  const getMinTime = (date) => {
    return date.set("hour", 9).set("minute", 0).set("second", 0); // 9:00 AM
  };

  const getMaxTime = (date) => {
    return date.set("hour", 19).set("minute", 0).set("second", 0); // 7:00 PM
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h5>Select date and time for interview</h5>
          <br />
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            sx={{ width: "100%" }}
          >
            <DateTimePicker
              label="Select interview date and time"
              value={dateTime}
              onChange={(newValue) => setDateTime(newValue)}
              disablePast
              closeOnSelect={false}
              ampm={false}
              // 15 minute intervals
              minutesStep={15}
              // Disable selecting sundays
              shouldDisableDate={(date) => date.day() === 0}
              // Time should be between 9 AM and 7 PM
              minTime={dateTime ? getMinTime(dateTime) : getMinTime(dayjs())}
              maxTime={dateTime ? getMaxTime(dateTime) : getMaxTime(dayjs())}
            />
          </LocalizationProvider>

          <br />
          <button className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </Box>
      </Modal>
    </div>
  );
}

export default React.memo(ScheduleInterviewModal);
