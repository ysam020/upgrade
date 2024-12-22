import React, { useState } from "react";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import AssignModule from "./AssignModule";
import useUserList from "../../hooks/useUserList";

function Assign() {
  const userList = useUserList();
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <Autocomplete
          value={selectedUser}
          onChange={(event, newValue) => {
            setSelectedUser(newValue);
          }}
          options={userList}
          getOptionLabel={(option) => option}
          sx={{ width: 200, marginBottom: "20px" }}
          renderInput={(params) => (
            <TextField {...params} size="small" label="Select User" />
          )}
        />
      </div>

      <AssignModule selectedUser={selectedUser} />
    </>
  );
}

export default React.memo(Assign);
