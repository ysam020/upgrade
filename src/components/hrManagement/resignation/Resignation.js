import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import useTabs from "../../../hooks/useTabs";
import ResignationForm from "./ResignationForm";
import ViewResignations from "./ViewResignations";

function Resignation() {
  const [value, setValue] = React.useState(
    Number(localStorage.getItem("resignation_tab_value")) || 0
  );
  const { a11yProps, CustomTabPanel } = useTabs();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("resignation_tab_value", newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Resignation Form" {...a11yProps(0)} key={0} />
          <Tab label="View Resignations" {...a11yProps(1)} key={1} />
        </Tabs>
      </Box>

      <Box>
        <CustomTabPanel value={value} index={0}>
          <ResignationForm />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ViewResignations />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}

export default React.memo(Resignation);
