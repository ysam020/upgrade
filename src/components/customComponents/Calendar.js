import React, { useState, useEffect } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLefttIcon from "@mui/icons-material/ChevronLeft";
import { IconButton, Tooltip } from "@mui/material";
import { months } from "../../assets/data/months";
import { weekdays } from "../../assets/data/weekdays";
import { calculateMonthDetails } from "../../utils/calculateMonthDetails";
import { handleCalendarNavigation } from "../../utils/handleCalendarNavigation";

const CustomCalendar = (props) => {
  const [daysInMonth, setDaysInMonth] = useState([]);

  const getStatusClass = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return "";

    const date = new Date(props.year, props.month, day);
    const dateString = date.toISOString().split("T")[0];

    const status = props.attendances.find(
      (entry) => entry.date.split("T")[0] === dateString
    );

    if (status) {
      return status?.status?.toLowerCase();
    }
    return "";
  };

  useEffect(() => {
    calculateMonthDetails(
      props.year,
      props.month,
      props.currentDate,
      setDaysInMonth
    );
    // eslint-disable-next-line
  }, [props.month, props.year]);

  const getTooltipTitle = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return ""; // No tooltip for inactive days

    const date = new Date(props.year, props.month, day);

    // Check if the date is the current date
    const currentDate = new Date();
    if (
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    ) {
      return ""; // No tooltip for the current date
    }

    const dateString = date.toISOString().split("T")[0];

    // Find the matching attendance entry for the date
    const status = props.attendances.find((entry) => {
      const entryDateString = new Date(entry.date).toISOString().split("T")[0];

      return entryDateString === dateString;
    });

    // Return appropriate tooltip based on the status
    if (status) {
      switch (status?.status?.toLowerCase()) {
        case "present":
          return "Present";
        case "halfday":
          return "Half Day";
        case "leave":
          return "Leave";
        case "week off":
          return "Week Off";
        default:
          return "Unknown Status";
      }
    }

    return ""; // No tooltip for dates without status
  };

  // Disable navigation to the next month if it's the current month
  const isNextButtonDisabled = () => {
    const currentDate = new Date();
    return (
      props.year === currentDate.getFullYear() &&
      props.month === currentDate.getMonth()
    );
  };

  return (
    <div>
      <header
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <p className="calendar-current-date">{`${months[props.month]} ${
          props.year
        }`}</p>
        <div className="calendar-navigation">
          <IconButton
            onClick={() =>
              handleCalendarNavigation(
                -1,
                props.month,
                props.year,
                props.setMonth,
                props.setYear
              )
            }
          >
            <ChevronLefttIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              handleCalendarNavigation(
                1,
                props.month,
                props.year,
                props.setMonth,
                props.setYear
              )
            }
            disabled={isNextButtonDisabled()}
          >
            <ChevronRightIcon />
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
          {daysInMonth.map((day, index) => (
            <Tooltip
              key={index}
              title={getTooltipTitle(day.day, day.isCurrentMonth)}
              arrow
            >
              <li
                className={`calendar-day ${
                  day.isCurrentMonth ? "" : "inactive"
                } ${day.isToday ? "active" : ""} ${getStatusClass(
                  day.day,
                  day.isCurrentMonth
                )}`}
              >
                {day.day}
              </li>
            </Tooltip>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomCalendar;
