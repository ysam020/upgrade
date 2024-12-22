import React, { useState, useEffect } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLefttIcon from "@mui/icons-material/ChevronLeft";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import AddEventModal from "../../modals/AddEventModal";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { months } from "../../assets/data/months";
import { weekdays } from "../../assets/data/weekdays";
import { calculateMonthDetails } from "../../utils/calculateMonthDetails";
import { handleCalendarNavigation } from "../../utils/handleCalendarNavigation";
import EventPopover from "./EventPopover";

const CustomCalendar = () => {
  const [daysInMonth, setDaysInMonth] = useState([]);
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    calculateMonthDetails(year, month, currentDate, setDaysInMonth);
    // eslint-disable-next-line
  }, [month, year]);

  async function getEvents() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_STRING}/get-calendar-events`,
        { withCredentials: true }
      );

      const now = new Date();
      const todayUTC = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
      );
      const todayFormatted = todayUTC.toISOString().split("T")[0];

      const upcomingEvents = res.data.filter((event) => {
        const eventDate = event.date;
        return eventDate >= todayFormatted;
      });

      setEvents(res.data);
      setUpcomingEvents(upcomingEvents);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  // Helper function to check if an event exists for a particular day
  const getEventsForDay = (day) => {
    // Ensure the day is valid (i.e., the day is within the current month and year)
    if (day.isCurrentMonth) {
      const dayString = `${year}-${(month + 1)
        .toString()
        .padStart(2, "0")}-${day.day.toString().padStart(2, "0")}`;

      // Filter events to find those matching the current day
      const filteredEvents = events.filter((event) => {
        return event.date === dayString;
      });

      return filteredEvents;
    }
    return []; // No events for non-current month days
  };

  // Handle popover open on event click
  const handleEventClick = (event, eventElement) => {
    setSelectedEvent(event);
    setPopoverAnchorEl(eventElement); // Set the anchor for the popover
  };

  // Close the popover
  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
    setSelectedEvent(null);
  };

  const openPopover = Boolean(popoverAnchorEl);

  return (
    <Row>
      <Col xs={3}>
        <div className="upcoming-events">
          <h5>Upcoming Events</h5>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, id) => {
              return (
                <div className="upcoming-event" key={id}>
                  <p>{event.title}</p>
                  <span>
                    <CalendarMonthIcon
                      style={{
                        color: "#6C5DFC",
                        fontSize: "18px",
                        marginRight: "5px",
                      }}
                    />
                    {event.date}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="upcoming-event">
              <p>No upcoming events</p>
            </div>
          )}
        </div>
      </Col>

      <Col>
        <div className="calendar-container">
          <header className="calendar-header">
            <p className="calendar-current-date">{`${months[month]} ${year}`}</p>
            <div className="calendar-navigation">
              <IconButton
                onClick={() =>
                  handleCalendarNavigation(-1, month, year, setMonth, setYear)
                }
              >
                <ChevronLefttIcon />
              </IconButton>
              <IconButton
                onClick={() =>
                  handleCalendarNavigation(1, month, year, setMonth, setYear)
                }
              >
                <ChevronRightIcon />
              </IconButton>
              <IconButton onClick={handleOpen}>
                <AddIcon />
              </IconButton>
            </div>
          </header>

          <div className="calendar-body">
            <ul className="calendar-weekdays">
              {weekdays.map((weekday, index) => (
                <li key={index}>{weekday}</li>
              ))}
            </ul>
            <ul className="calendar-dates">
              {daysInMonth.map((day, index) => {
                const eventsForDay = getEventsForDay(day);
                return (
                  <li
                    key={index}
                    style={{
                      border: "1px solid #E5E7EB",
                      margin: 0,
                      padding: "25px 5px",
                    }}
                  >
                    <span
                      className={`calendar-day ${
                        day.isCurrentMonth ? "" : "inactive"
                      } ${day.isToday ? "active" : ""}`}
                    >
                      {day.day}
                    </span>
                    {eventsForDay.length > 0 && (
                      <div className="event-indicator">
                        {eventsForDay.map((event, idx) => (
                          <div
                            key={idx}
                            className="event-item"
                            onClick={(e) =>
                              handleEventClick(event, e.currentTarget)
                            }
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Col>

      <AddEventModal
        open={open}
        handleClose={handleClose}
        getEvents={getEvents}
      />

      {/* Popover for event details */}
      <EventPopover
        openPopover={openPopover}
        popoverAnchorEl={popoverAnchorEl}
        handlePopoverClose={handlePopoverClose}
        selectedEvent={selectedEvent}
        events={events}
        setEvents={setEvents}
        getEvents={getEvents}
      />
    </Row>
  );
};

export default CustomCalendar;
