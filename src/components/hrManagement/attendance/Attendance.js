import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import useTabs from "../../../hooks/useTabs";
import LeaveApplication from "./LeaveApplication";
import ViewAttendances from "./ViewAttendances";
import ViewLeaveApplications from "./ViewLeaveApplications";
import WeekOffForm from "./WeekOffForm";
import AttendanceCorrection from "./AttendanceCorrection";
import ViewWeekOffs from "./ViewWeekOffs";
import { UserContext } from "../../../contexts/UserContext";

function Attendance() {
  const { user } = React.useContext(UserContext);
  const [value, setValue] = React.useState(
    Number(localStorage.getItem("attendance_tab_value")) || 0
  );
  const { a11yProps, CustomTabPanel } = useTabs();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("attendance_tab_value", newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {user.rank <= 2 ? (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="View All Attendances" {...a11yProps(0)} key={0} />
              <Tab label="Leave Application" {...a11yProps(1)} key={1} />
              <Tab label="View Leave Applications" {...a11yProps(2)} key={2} />
              <Tab label="Week Off" {...a11yProps(3)} key={3} />
              <Tab label="View Week Offs" {...a11yProps(3)} key={4} />
              <Tab label="Attendance Correction" {...a11yProps(4)} key={5} />
            </Tabs>
          </Box>

          <Box>
            <CustomTabPanel value={value} index={0}>
              <ViewAttendances />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <LeaveApplication />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <ViewLeaveApplications />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <WeekOffForm />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
              <ViewWeekOffs />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={5}>
              <AttendanceCorrection />
            </CustomTabPanel>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Leave Application" {...a11yProps(0)} key={0} />
              <Tab label="Week Off" {...a11yProps(1)} key={1} />
            </Tabs>
          </Box>

          <Box>
            <CustomTabPanel value={value} index={0}>
              <LeaveApplication />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <WeekOffForm />
            </CustomTabPanel>
          </Box>
        </>
      )}
    </Box>
  );
}

export default React.memo(Attendance);
