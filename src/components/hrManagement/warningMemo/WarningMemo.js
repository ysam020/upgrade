import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import useTabs from "../../../hooks/useTabs";
import TrainingForm from "./WarningMemoForm";
import ViewTrainings from "./ViewWarningMemos";

function WarningMemo() {
  const [value, setValue] = React.useState(
    Number(localStorage.getItem("warning_memo_tab_value")) || 0
  );
  const { a11yProps, CustomTabPanel } = useTabs();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("warning_memo_tab_value", newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Warning Memo Form" {...a11yProps(0)} key={0} />
          <Tab label="View Warning Memos" {...a11yProps(1)} key={1} />
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

export default React.memo(WarningMemo);
