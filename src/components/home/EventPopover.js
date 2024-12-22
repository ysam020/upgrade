import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Popover, Box } from "@mui/material";
import axios from "axios";

function EventPopover(props) {
  const deleteEvent = async (_id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_STRING}/delete-calendar-event/${_id}`,
        { withCredentials: true }
      );
      props.setEvents(props.events.filter((event) => event._id !== _id));
      props.getEvents();
      props.handlePopoverClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Popover
      open={props.openPopover}
      anchorEl={props.popoverAnchorEl}
      onClose={props.handlePopoverClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Box>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <strong>{props.selectedEvent?.title}</strong>
            <br />
            <span>
              {props.selectedEvent?.date}, {props.selectedEvent?.startTime}-
              {props.selectedEvent?.endTime}
            </span>
            <br />
            <span>{props.selectedEvent?.description}</span>
          </div>
          <IconButton onClick={() => deleteEvent(props.selectedEvent._id)}>
            <DeleteIcon sx={{ color: "#F15C6D" }} />
          </IconButton>
        </div>
      </Box>
    </Popover>
  );
}

export default EventPopover;
