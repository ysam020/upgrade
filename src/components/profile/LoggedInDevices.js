import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

function LoggedInDevices(props) {
  // Helper function to format date to dd-mm-yyyy hh:mm:ss
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  // Check if geolocation is an array and map over it
  return (
    Array.isArray(props.geolocation) &&
    props.geolocation?.map((location, id) => {
      if (location.locationError) {
        return (
          <div key={id}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <List sx={{ width: "100%" }}>
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Device Name" />
                  <ListItemText secondary={location.userAgent} />
                </ListItem>

                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Location" />
                  <ListItemText secondary={location.locationError} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText primary="Logged in at" />
                  <ListItemText secondary={formatDate(location.loginAt)} />
                </ListItem>
              </List>
            </div>
            <br />
            <Divider variant="fullWidth" sx={{ opacity: 1 }} />
            <br />
          </div>
        );
      }

      // Create an array of the values to display
      const valuesToDisplay = [
        location.village,
        location.suburb,
        location.stateDistrict,
        location.state,
        location.postcode,
        location.country,
      ];

      // Filter out empty or undefined values
      const filteredValues = valuesToDisplay.filter((value) => value);

      return (
        <div key={id} style={{ backgroundColor: "#fff", padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <List sx={{ width: "100%" }}>
              <ListItem alignItems="flex-start">
                <ListItemText primary="Device Name" />
                <ListItemText secondary={location.userAgent} />
              </ListItem>

              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText primary="Location" />
                <ListItemText secondary={filteredValues.join(", ")} />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemText primary="Logged in at" />
                <ListItemText secondary={formatDate(location.loginAt)} />
              </ListItem>
            </List>
          </div>
        </div>
      );
    })
  );
}

export default LoggedInDevices;
