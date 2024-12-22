import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import useTabs from "../../../hooks/useTabs";
import AppraisalForm from "./AppraisalForm";
import ViewAppraisals from "./ViewAppraisals";

function Appraisal() {
  const [value, setValue] = React.useState(
    Number(localStorage.getItem("appraisal_tab_value")) || 0
  );
  const { a11yProps, CustomTabPanel } = useTabs();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("appraisal_tab_value", newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Appraisal Form" {...a11yProps(0)} key={0} />
          <Tab label="View Appraisals" {...a11yProps(1)} key={1} />
        </Tabs>
      </Box>

      <Box>
        <CustomTabPanel value={value} index={0}>
          <AppraisalForm />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ViewAppraisals />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}

export default React.memo(Appraisal);
