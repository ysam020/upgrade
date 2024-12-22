import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import useTabs from "../../../hooks/useTabs";
import TrainingForm from "./TrainingForm";
import ViewTrainings from "./ViewTrainings";

function TrainingAndDevelopment() {
  const [value, setValue] = React.useState(
    Number(localStorage.getItem("training_tab_value")) || 0
  );
  const { a11yProps, CustomTabPanel } = useTabs();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("training_tab_value", newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Training Form" {...a11yProps(0)} key={0} />
          <Tab label="View Trainings" {...a11yProps(1)} key={1} />
        </Tabs>
      </Box>

      <Box>
        <CustomTabPanel value={value} index={0}>
          <TrainingForm />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ViewTrainings />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}

export default React.memo(TrainingAndDevelopment);
