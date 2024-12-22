import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import useTabs from "../../../hooks/useTabs";
import NewJobOpening from "./NewJobOpening";
import ViewJobOpenings from "./ViewJobOpenings";

function JobOpenings() {
  const [tabValue, setTabValue] = React.useState(
    Number(localStorage.getItem("job_openings_tab_value")) || 0
  );
  const { a11yProps, CustomTabPanel } = useTabs();

  const handleChange = (event, newValue) => {
    localStorage.setItem("job_openings_tab_value", newValue);
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="New Job Opening" {...a11yProps(1)} key={0} />
          <Tab label="View Job Openings" {...a11yProps(0)} key={1} />
        </Tabs>
      </Box>

      <Box>
        <CustomTabPanel value={tabValue} index={0}>
          <NewJobOpening />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <ViewJobOpenings />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}

export default React.memo(JobOpenings);
