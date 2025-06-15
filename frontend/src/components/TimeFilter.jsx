import React from "react";

const TimeFilter = ({ selected, onChange }) => (
  <div className="time-filter">
    <button
      className={selected === "day" ? "active" : ""}
      onClick={() => onChange("day")}
    >
      Day
    </button>
    <button
      className={selected === "week" ? "active" : ""}
      onClick={() => onChange("week")}
    >
      Week
    </button>
    <button
      className={selected === "month" ? "active" : ""}
      onClick={() => onChange("month")}
    >
      Month
    </button>
    <button
      className={selected === "year" ? "active" : ""}
      onClick={() => onChange("year")}
    >
      Year
    </button>
  </div>
);

export default TimeFilter;
